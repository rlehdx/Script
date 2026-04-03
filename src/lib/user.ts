import { supabaseAdmin } from "./supabase";
import { getPlan, type PlanType } from "./stripe";

/* eslint-disable @typescript-eslint/no-explicit-any */
const db = supabaseAdmin as any;

export async function getOrCreateUser(clerkUserId: string, email: string) {
  const { data: existing } = await db
    .from("users")
    .select("*")
    .eq("clerk_user_id", clerkUserId)
    .single();

  if (existing) return existing;

  const { data: created, error } = await db
    .from("users")
    .insert({
      id: crypto.randomUUID(),
      clerk_user_id: clerkUserId,
      email,
      plan_type: "starter",
      scripts_used_this_month: 0,
      billing_cycle_start: new Date().toISOString(),
      stripe_customer_id: null,
      stripe_subscription_id: null,
      brand_voice: null,
    })
    .select()
    .single();

  if (error) throw new Error(`Failed to create user: ${error.message}`);
  return created;
}

export async function checkAndIncrementUsage(clerkUserId: string): Promise<{
  allowed: boolean;
  reason?: string;
  scriptsUsed: number;
  limit: number;
  planType: PlanType;
  model: string;
  brandVoice: string | null;
}> {
  const { data: user, error } = await db
    .from("users")
    .select("*")
    .eq("clerk_user_id", clerkUserId)
    .single();

  if (error || !user) {
    return {
      allowed: false,
      reason: "User not found",
      scriptsUsed: 0,
      limit: 5,
      planType: "starter",
      model: "gpt-4o-mini",
      brandVoice: null,
    };
  }

  const planType: PlanType = user.plan_type ?? "starter";
  const plan = getPlan(planType);
  const limit = plan.unlimited ? Infinity : plan.scriptsPerMonth;

  // Reset monthly counter if billing cycle rolled over
  const cycleStart = new Date(user.billing_cycle_start);
  const now = new Date();
  const monthsElapsed =
    (now.getFullYear() - cycleStart.getFullYear()) * 12 +
    (now.getMonth() - cycleStart.getMonth());

  let scriptsUsed = user.scripts_used_this_month;

  if (monthsElapsed >= 1) {
    await db
      .from("users")
      .update({
        scripts_used_this_month: 0,
        billing_cycle_start: new Date(now.getFullYear(), now.getMonth(), 1).toISOString(),
      })
      .eq("clerk_user_id", clerkUserId);
    scriptsUsed = 0;
  }

  // Unlimited check for Agency plan
  if (!plan.unlimited && scriptsUsed >= limit) {
    return {
      allowed: false,
      reason:
        planType === "starter"
          ? `You've used all ${plan.scriptsPerMonth} free scripts this month. Upgrade to Creator or Agency for more.`
          : `Monthly limit of ${plan.scriptsPerMonth} scripts reached. Upgrade to Agency for unlimited scripts.`,
      scriptsUsed,
      limit: plan.scriptsPerMonth,
      planType,
      model: plan.model,
      brandVoice: user.brand_voice ?? null,
    };
  }

  await db
    .from("users")
    .update({ scripts_used_this_month: scriptsUsed + 1 })
    .eq("clerk_user_id", clerkUserId);

  return {
    allowed: true,
    scriptsUsed: scriptsUsed + 1,
    limit: plan.unlimited ? -1 : plan.scriptsPerMonth,
    planType,
    model: plan.model,
    brandVoice: user.brand_voice ?? null,
  };
}
