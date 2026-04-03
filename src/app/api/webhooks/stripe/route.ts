import { NextRequest, NextResponse } from "next/server";
import { stripe, STRIPE_ENABLED, PLANS, type PlanType } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import Stripe from "stripe";

/* eslint-disable @typescript-eslint/no-explicit-any */
const db = supabaseAdmin as any;

/** Derive plan_type from the Stripe subscription metadata or price ID */
function resolvePlanType(sub: Stripe.Subscription): PlanType {
  const metaPlan = sub.metadata?.plan as PlanType | undefined;
  if (metaPlan === "agency" || metaPlan === "creator") return metaPlan;

  // Fallback: match price ID against known plans
  const priceId = sub.items.data[0]?.price?.id;
  if (
    priceId &&
    (priceId === PLANS.agency.monthlyPriceId || priceId === PLANS.agency.annualPriceId)
  ) {
    return "agency";
  }
  return "creator";
}

export async function POST(req: NextRequest) {
  if (!STRIPE_ENABLED) {
    return NextResponse.json(
      { error: "Stripe is not configured. Set STRIPE_SECRET_KEY to enable payments." },
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
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      const clerkUserId = sub.metadata?.clerkUserId;
      if (!clerkUserId) break;

      const isActive = sub.status === "active" || sub.status === "trialing";
      const planType: PlanType = isActive ? resolvePlanType(sub) : "starter";

      await db
        .from("users")
        .update({
          plan_type: planType,
          stripe_subscription_id: sub.id,
        })
        .eq("clerk_user_id", clerkUserId);
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      const clerkUserId = sub.metadata?.clerkUserId;
      if (!clerkUserId) break;

      await db
        .from("users")
        .update({
          plan_type: "starter",
          stripe_subscription_id: null,
        })
        .eq("clerk_user_id", clerkUserId);
      break;
    }

    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const clerkUserId = session.metadata?.clerkUserId;
      const plan = (session.metadata?.plan ?? "creator") as PlanType;

      if (!clerkUserId || !session.customer) break;

      await db
        .from("users")
        .update({
          stripe_customer_id: session.customer as string,
          plan_type: plan,
        })
        .eq("clerk_user_id", clerkUserId);
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
