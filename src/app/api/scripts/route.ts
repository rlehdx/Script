import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

/* eslint-disable @typescript-eslint/no-explicit-any */
const db = supabaseAdmin as any;

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const limit = Math.min(parseInt(url.searchParams.get("limit") ?? "20"), 100);

  const { data, error } = await db
    .from("scripts")
    .select("id, title, script_type, tone, language, tokens_used, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    return NextResponse.json({ error: "Failed to fetch scripts" }, { status: 500 });
  }

  return NextResponse.json({ scripts: data });
}
