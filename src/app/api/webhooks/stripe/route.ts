import { NextRequest, NextResponse } from "next/server";
import { stripe, STRIPE_ENABLED, PLANS, type PlanType } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import Stripe from "stripe";

/* eslint-disable @typescript-eslint/no-explicit-any */
const db = supabaseAdmin as any;

/** Derive plan_type from subscription metadata or price ID */
function resolvePlanType(sub: Stripe.Subscription): PlanType {
  const metaPlan = sub.metadata?.plan as PlanType | undefined;
  if (metaPlan === "agency" || metaPlan === "creator") return metaPlan;

  const priceId = sub.items.data[0]?.price?.id;
  if (
    priceId &&
    (priceId === PLANS.agency.monthlyPriceId || priceId === PLANS.agency.annualPriceId)
  ) {
    return "agency";
  }
  return "creator";
}

/** Update plan_type in Supabase using supabaseAdmin (bypasses RLS) */
async function updateUserPlan(clerkUserId: string, planType: PlanType) {
  console.log(`[stripe-webhook] Updating plan: clerk_user_id=${clerkUserId} plan_type=${planType}`);

  const { data, error } = await db
    .from("users")
    .update({ plan_type: planType })
    .eq("clerk_user_id", clerkUserId)
    .select("clerk_user_id, plan_type");

  if (error) {
    console.error("[stripe-webhook] Supabase update error:", JSON.stringify(error));
    return false;
  }

  if (!data || data.length === 0) {
    console.error(`[stripe-webhook] No user found with clerk_user_id=${clerkUserId}`);
    return false;
  }

  console.log("[stripe-webhook] Plan updated successfully:", data[0]);
  return true;
}

export async function POST(req: NextRequest) {
  if (!STRIPE_ENABLED) {
    return NextResponse.json(
      { error: "Stripe is not configured." },
      { status: 503 }
    );
  }

  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("[stripe-webhook] Signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  console.log(`[stripe-webhook] Received event: ${event.type}`);

  switch (event.type) {

    // ── Subscription created / updated ──────────────────────────────
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      const clerkUserId = sub.metadata?.clerkUserId;

      if (!clerkUserId) {
        console.warn("[stripe-webhook] No clerkUserId in subscription metadata, skipping");
        break;
      }

      const isActive = sub.status === "active" || sub.status === "trialing";
      const planType: PlanType = isActive ? resolvePlanType(sub) : "starter";

      await updateUserPlan(clerkUserId, planType);

      await db
        .from("users")
        .update({ stripe_subscription_id: sub.id })
        .eq("clerk_user_id", clerkUserId);
      break;
    }

    // ── Subscription cancelled ───────────────────────────────────────
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      const clerkUserId = sub.metadata?.clerkUserId;
      if (!clerkUserId) break;

      await updateUserPlan(clerkUserId, "starter");
      await db
        .from("users")
        .update({ stripe_subscription_id: null })
        .eq("clerk_user_id", clerkUserId);
      break;
    }

    // ── Checkout completed ───────────────────────────────────────────
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      // Try multiple sources for clerkUserId (CLI test vs real checkout)
      const clerkUserId =
        session.client_reference_id ??       // set via client_reference_id param
        session.metadata?.clerkUserId ??     // set via session.metadata
        session.metadata?.userId;            // fallback alias

      const plan = (session.metadata?.plan ?? "creator") as PlanType;

      console.log("[stripe-webhook] checkout.session.completed", {
        sessionId: session.id,
        clerkUserId,
        plan,
        customer: session.customer,
      });

      if (!clerkUserId) {
        console.error("[stripe-webhook] Could not determine clerkUserId from session — skipping DB update");
        break;
      }

      // Update stripe_customer_id + plan_type
      const { error } = await db
        .from("users")
        .update({
          stripe_customer_id: session.customer as string,
          plan_type: plan,
        })
        .eq("clerk_user_id", clerkUserId);

      if (error) {
        console.error("[stripe-webhook] Failed to update user after checkout:", JSON.stringify(error));
      } else {
        console.log(`[stripe-webhook] User ${clerkUserId} upgraded to ${plan}`);
      }
      break;
    }

    default:
      console.log(`[stripe-webhook] Unhandled event type: ${event.type}`);
      break;
  }

  return NextResponse.json({ received: true });
}
