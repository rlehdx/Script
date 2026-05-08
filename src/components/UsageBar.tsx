"use client";

import Link from "next/link";
import type { PlanType } from "@/lib/stripe";

interface UsageBarProps {
  planType: PlanType;
  scriptsUsed: number;
  limit: number; // -1 = unlimited (Agency)
}

const PLAN_LABELS: Record<PlanType, { label: string; color: string }> = {
  starter: { label: "STARTER", color: "bg-slate-700 text-slate-400" },
  creator: { label: "CREATOR", color: "bg-purple-500/20 text-purple-300" },
  agency:  { label: "AGENCY",  color: "bg-amber-500/20 text-amber-300" },
};

export default function UsageBar({ planType, scriptsUsed, limit }: UsageBarProps) {
  const isUnlimited = limit === -1;
  const pct = isUnlimited ? 0 : Math.min((scriptsUsed / limit) * 100, 100);
  const barColor =
    pct >= 100 ? "bg-red-500" : pct >= 80 ? "bg-amber-500" : "bg-gradient-to-r from-purple-500 to-indigo-500";
  const { label, color } = PLAN_LABELS[planType] ?? PLAN_LABELS.starter;

  return (
    <div className="bezel-card px-4 py-3 min-w-[200px]">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-slate-500">Scripts this month</span>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${color}`}>
          {label}
        </span>
      </div>

      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-xl font-bold">{scriptsUsed}</span>
        <span className="text-slate-500 text-sm">
          {isUnlimited ? "/ ∞" : `/ ${limit}`}
        </span>
      </div>

      {isUnlimited ? (
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full" />
        </div>
      ) : (
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${barColor}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      )}

      {planType === "starter" && (
        <Link href="/pricing" className="text-xs text-purple-400 hover:text-purple-300 mt-2 block">
          Upgrade for more scripts →
        </Link>
      )}
      {planType === "creator" && (
        <Link href="/pricing" className="text-xs text-amber-400 hover:text-amber-300 mt-2 block">
          Upgrade to Agency for unlimited →
        </Link>
      )}
    </div>
  );
}
