import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

/* eslint-disable @typescript-eslint/no-explicit-any */
const db = supabaseAdmin as any;

export async function PATCH(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check user is on agency plan
  const { data: user } = await db
    .from("users")
    .select("plan_type")
    .eq("clerk_user_id", userId)
    .maybeSingle();

  if (user?.plan_type !== "agency") {
    return NextResponse.json(
      { error: "Brand voice is an Agency plan feature. Please upgrade." },
      { status: 403 }
    );
  }

  const { brandVoice } = await req.json();

  if (typeof brandVoice !== "string") {
    return NextResponse.json({ error: "Invalid brand voice value" }, { status: 400 });
  }

  const { error } = await db
    .from("users")
    .update({ brand_voice: brandVoice.trim() || null })
    .eq("clerk_user_id", userId);

  if (error) {
    return NextResponse.json({ error: "Failed to update brand voice" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: user } = await db
    .from("users")
    .select("brand_voice, plan_type")
    .eq("clerk_user_id", userId)
    .maybeSingle();

  return NextResponse.json({
    brandVoice: user?.brand_voice ?? null,
    planType: user?.plan_type ?? "starter",
  });
}
