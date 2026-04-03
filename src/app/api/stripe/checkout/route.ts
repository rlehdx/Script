import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { stripe, STRIPE_ENABLED, PLANS } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  if (!STRIPE_ENABLED) {
    return NextResponse.json({ error: "Stripe is not configured." }, { status: 503 });
  }

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { plan, billingCycle } = await req.json() as {
    plan: "creator" | "agency";
    billingCycle?: "monthly" | "annual";
  };

  const targetPlan = plan === "agency" ? PLANS.agency : PLANS.creator;
  const priceId =
    billingCycle === "annual"
      ? targetPlan.annualPriceId
      : targetPlan.monthlyPriceId;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    client_reference_id: userId,
    metadata: { clerkUserId: userId, plan },
    subscription_data: {
      metadata: { clerkUserId: userId, plan },
    },
    success_url: `${appUrl}/dashboard?success=true`,
    cancel_url: `${appUrl}/dashboard?canceled=true`,
    allow_promotion_codes: true,
  });

  return NextResponse.json({ url: session.url });
}
