import Stripe from "stripe";

export const STRIPE_ENABLED = !!process.env.STRIPE_SECRET_KEY;

export const stripe = STRIPE_ENABLED
  ? new Stripe(process.env.STRIPE_SECRET_KEY!)
  : (null as unknown as Stripe);

export type PlanType = "starter" | "creator" | "agency";

export const PLANS = {
  starter: {
    name: "Starter",
    label: "Free",
    scriptsPerMonth: 5,
    unlimited: false,
    priceMonthly: 0,
    model: "gpt-4.1-mini" as const,
    languages: ["English"],
    brandVoice: false,
    priorityGeneration: false,
  },
  creator: {
    name: "Creator",
    label: "Pro",
    scriptsPerMonth: 100,
    unlimited: false,
    priceMonthly: 19,
    priceAnnual: 190,
    model: "gpt-4.1" as const,
    languages: ["English", "Spanish", "Korean", "Japanese", "French"],
    brandVoice: false,
    priorityGeneration: false,
    monthlyPriceId: process.env.STRIPE_CREATOR_MONTHLY_PRICE_ID!,
    annualPriceId: process.env.STRIPE_CREATOR_ANNUAL_PRICE_ID!,
  },
  agency: {
    name: "Agency",
    label: "Elite",
    scriptsPerMonth: Infinity,
    unlimited: true,
    priceMonthly: 49,
    priceAnnual: 490,
    model: "o3" as const,
    languages: ["English", "Spanish", "Korean", "Japanese", "French"],
    brandVoice: true,
    priorityGeneration: true,
    monthlyPriceId: process.env.STRIPE_AGENCY_MONTHLY_PRICE_ID!,
    annualPriceId: process.env.STRIPE_AGENCY_ANNUAL_PRICE_ID!,
  },
} as const;

export function getPlan(planType: PlanType) {
  return PLANS[planType] ?? PLANS.starter;
}
