import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { stripe, STRIPE_ENABLED } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";

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

  const { data: user } = await db
    .from("users")
    .select("stripe_customer_id")
    .eq("clerk_user_id", userId)
    .single();

  if (!user?.stripe_customer_id) {
    return NextResponse.json({ error: "No billing account found" }, { status: 400 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripe_customer_id,
    return_url: `${appUrl}/settings`,
  });

  return NextResponse.json({ url: session.url });
}
