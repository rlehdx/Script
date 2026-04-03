import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, SUPABASE_ENABLED } from "@/lib/supabase";
import { getPlan, type PlanType } from "@/lib/stripe";

/* eslint-disable @typescript-eslint/no-explicit-any */
const db = supabaseAdmin as any;

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!SUPABASE_ENABLED) {
    const plan = getPlan("starter");
    return NextResponse.json({
      planType: "starter",
      scriptsUsed: 0,
      limit: plan.scriptsPerMonth,
    });
  }

  const { data: user, error } = await db
    .from("users")
    .select("plan_type, scripts_used_this_month, billing_cycle_start, stripe_customer_id, stripe_subscription_id")
    .eq("clerk_user_id", userId)
    .single();

  if (error || !user) {
    const plan = getPlan("starter");
    return NextResponse.json({
      planType: "starter",
      scriptsUsed: 0,
      limit: plan.scriptsPerMonth,
    });
  }

  const planType: PlanType = user.plan_type ?? "starter";
  const plan = getPlan(planType);
  const limit = plan.unlimited ? -1 : plan.scriptsPerMonth;

  return NextResponse.json({
    planType,
    scriptsUsed: user.scripts_used_this_month,
    limit,
    hasStripeCustomer: !!user.stripe_customer_id,
    hasSubscription: !!user.stripe_subscription_id,
  });
}
