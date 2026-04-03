import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getOrCreateUser } from "@/lib/user";

/* eslint-disable @typescript-eslint/no-explicit-any */
const db = supabaseAdmin as any;

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const clerkUser = await currentUser();
  if (!clerkUser) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }

  const email = clerkUser.emailAddresses[0]?.emailAddress ?? "";
  const user = await getOrCreateUser(userId, email);

  return NextResponse.json({ user });
}

export async function DELETE(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await db
    .from("users")
    .delete()
    .eq("clerk_user_id", userId);

  if (error) {
    return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
