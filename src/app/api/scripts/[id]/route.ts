import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const db = supabaseAdmin as any;

async function resolveDbUserId(clerkUserId: string): Promise<string | null> {
  const { data } = await db
    .from("users")
    .select("id")
    .eq("clerk_user_id", clerkUserId)
    .maybeSingle();
  return data?.id ?? null;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dbUserId = await resolveDbUserId(userId);
  if (!dbUserId) {
    return NextResponse.json({ error: "Script not found" }, { status: 404 });
  }

  const { data, error } = await db
    .from("scripts")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", dbUserId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Script not found" }, { status: 404 });
  }

  return NextResponse.json({ script: data });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dbUserId = await resolveDbUserId(userId);
  if (!dbUserId) {
    return NextResponse.json({ error: "Script not found" }, { status: 404 });
  }

  const { error } = await db
    .from("scripts")
    .delete()
    .eq("id", params.id)
    .eq("user_id", dbUserId);

  if (error) {
    return NextResponse.json({ error: "Failed to delete script" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
