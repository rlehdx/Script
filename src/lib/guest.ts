/**
 * Guest usage tracking (unauthenticated users)
 * - Stored in Supabase guest_usage table by IP + date
 * - Daily limit of 3 scripts
 * - Falls back to in-memory store if Supabase is not configured (resets on restart)
 */

import { supabaseAdmin, SUPABASE_ENABLED } from "./supabase";

export const GUEST_DAILY_LIMIT = 3;

// In-memory fallback when Supabase is not configured
const memoryStore = new Map<string, number>();

function getTodayKey(ip: string) {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  return `${ip}:${today}`;
}

export async function getGuestUsage(ip: string): Promise<number> {
  if (!SUPABASE_ENABLED || !supabaseAdmin) {
    return memoryStore.get(getTodayKey(ip)) ?? 0;
  }

  const today = new Date().toISOString().slice(0, 10);
  const db = supabaseAdmin as any;
  const { data } = await db
    .from("guest_usage")
    .select("count")
    .eq("ip", ip)
    .eq("date", today)
    .maybeSingle();

  return data?.count ?? 0;
}

export async function incrementGuestUsage(ip: string): Promise<number> {
  if (!SUPABASE_ENABLED || !supabaseAdmin) {
    const key = getTodayKey(ip);
    const next = (memoryStore.get(key) ?? 0) + 1;
    memoryStore.set(key, next);
    return next;
  }

  const today = new Date().toISOString().slice(0, 10);
  const db = supabaseAdmin as any;
  // Atomic upsert: increment count in a single DB round-trip to avoid race conditions
  const { data } = await db.rpc("increment_guest_usage", { p_ip: ip, p_date: today });

  // Fallback to read-then-write if RPC not available
  if (data === null || data === undefined) {
    const current = await getGuestUsage(ip);
    const next = current + 1;
    await db.from("guest_usage").upsert(
      { ip, date: today, count: next },
      { onConflict: "ip,date" }
    );
    return next;
  }

  return data as number;
}
