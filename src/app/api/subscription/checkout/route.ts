import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { stripe, STRIPE_ENABLED, PLANS, type PlanType } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { getOrCreateUser } from "@/lib/user";

/* eslint-disable @typescript-eslint/no-explicit-any */
const db = supabaseAdmin as any;

export async function POST(req: NextRequest) {
  if (!STRIPE_ENABLED) {
    return NextResponse.json(
      { error: "Stripe is not configured. Set STRIPE_SECRET_KEY to enable payments." },
      { status: 503 }
    );
  }

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const clerkUser = await currentUser();
  if (!clerkUser) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }

  const body = await req.json();
  const { billingCycle, plan } = body as {
    billingCycle: "monthly" | "annual";
    plan: "creator" | "agency";
  };

  const targetPlan = plan === "agency" ? PLANS.agency : PLANS.creator;

  const email = clerkUser.emailAddresses[0]?.emailAddress ?? "";
  const dbUser = await getOrCreateUser(userId, email);

  // Reuse or create Stripe customer
  let customerId = dbUser.stripe_customer_id;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email,
      metadata: { clerkUserId: userId },
    });
    customerId = customer.id;
    await db
      .from("users")
      .update({ stripe_customer_id: customerId })
      .eq("clerk_user_id", userId);
  }

  const priceId =
    billingCycle === "annual"
      ? targetPlan.annualPriceId
      : targetPlan.monthlyPriceId;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "subscription",
    success_url: `${appUrl}/dashboard?upgraded=true`,
    cancel_url: `${appUrl}/pricing?cancelled=true`,
    allow_promotion_codes: true,
    // client_reference_id: easiest way to get clerkUserId in webhook
    client_reference_id: userId,
    // session.metadata: available on checkout.session.completed
    metadata: { clerkUserId: userId, plan: plan ?? "creator" },
    // subscription_data.metadata: available on subscription.created/updated
    subscription_data: {
      metadata: { clerkUserId: userId, plan: plan ?? "creator" },
    },
  });

  return NextResponse.json({ url: session.url });
}
