"use client";

import { useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import type { PlanType } from "@/lib/stripe";

interface UsageStatus {
  planType: PlanType;
  scriptsUsed: number;
  limit: number; // -1 = unlimited
  hasSubscription: boolean;
}

const PLAN_BADGE: Record<PlanType, { label: string; className: string }> = {
  starter: { label: "Starter", className: "bg-slate-700/50 text-slate-400 border-slate-600/50" },
  creator: { label: "Creator", className: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
  agency:  { label: "Agency",  className: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
};

export default function SettingsPage() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const [usage, setUsage] = useState<UsageStatus | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch("/api/subscription/status")
      .then((r) => r.json())
      .then((d) => setUsage(d));
  }, []);

  async function handleBillingPortal() {
    setPortalLoading(true);
    const res = await fetch("/api/subscription/portal", { method: "POST" });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("No billing account found. Subscribe first.");
      setPortalLoading(false);
    }
  }

  async function handleDeleteAccount() {
    if (deleteConfirm !== "DELETE") return;
    setDeleting(true);
    await fetch("/api/user", { method: "DELETE" });
    await signOut();
    router.push("/");
  }

  const planType: PlanType = usage?.planType ?? "starter";
  const badge = PLAN_BADGE[planType];
  const isUnlimited = usage?.limit === -1;
  const usagePct = isUnlimited ? 100 : usage ? Math.min((usage.scriptsUsed / usage.limit) * 100, 100) : 0;
  const isPaid = planType === "creator" || planType === "agency";

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="border-b border-white/5 px-6 py-4 flex items-center gap-4">
        <Link href="/dashboard" className="text-slate-500 hover:text-white transition-colors text-sm">
          ← Dashboard
        </Link>
        <span className="text-white/10">|</span>
        <span className="text-sm font-medium">Settings</span>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10 space-y-6">
        {/* Profile */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="bezel-card p-6"
        >
          <h2 className="text-base font-semibold mb-5">Profile</h2>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent-gradient flex items-center justify-center text-lg font-bold">
              {user?.firstName?.[0] ?? user?.emailAddresses[0]?.emailAddress[0]?.toUpperCase() ?? "U"}
            </div>
            <div>
              <p className="font-medium">
                {user?.firstName && user?.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user?.firstName ?? "User"}
              </p>
              <p className="text-sm text-slate-500">{user?.emailAddresses[0]?.emailAddress}</p>
            </div>
            <div className="ml-auto">
              <span className={`text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full border ${badge.className}`}>
                {badge.label}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="bezel-card p-6"
        >
          <h2 className="text-base font-semibold mb-5">Subscription</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Current plan</span>
              <span className={`text-sm font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full border ${badge.className}`}>
                {badge.label}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Scripts used this month</span>
              <span className="text-sm font-medium">
                {usage
                  ? isUnlimited
                    ? `${usage.scriptsUsed} / ∞`
                    : `${usage.scriptsUsed} / ${usage.limit}`
                  : "..."}
              </span>
            </div>

            {usage && (
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    isUnlimited
                      ? "bg-gradient-to-r from-amber-500 to-orange-400 w-full"
                      : "bg-accent-gradient"
                  }`}
                  style={isUnlimited ? undefined : { width: `${usagePct}%` }}
                />
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              {isPaid ? (
                <button
                  onClick={handleBillingPortal}
                  disabled={portalLoading}
                  className="btn-secondary text-sm py-2.5 px-5 disabled:opacity-50"
                >
                  {portalLoading ? "Opening..." : "Manage Subscription (Stripe)"}
                </button>
              ) : (
                <Link href="/pricing" className="btn-primary text-sm py-2.5 px-5">
                  Upgrade Plan
                </Link>
              )}
              {planType === "creator" && (
                <Link href="/pricing" className="btn-secondary text-sm py-2.5 px-5">
                  Upgrade to Agency
                </Link>
              )}
            </div>
          </div>
        </motion.div>

        {/* API Usage */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="bezel-card p-6"
        >
          <h2 className="text-base font-semibold mb-5">API Usage</h2>
          <p className="text-sm text-slate-400 mb-4">
            Scriva uses OpenAI's API. Usage is metered at the app level — you are not directly billed by OpenAI.
          </p>
          <div className="bezel-card-inner p-4 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-slate-300">
              {planType === "starter"
              ? "OpenAI gpt-4.1-mini"
              : planType === "creator"
              ? "OpenAI gpt-4.1"
              : "OpenAI o3"} — operational
            </span>
          </div>
        </motion.div>

        {/* Danger zone */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.21, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="bezel-card p-6 border-red-500/20"
        >
          <h2 className="text-base font-semibold text-red-400 mb-2">Danger Zone</h2>
          <p className="text-sm text-slate-500 mb-5">
            Deleting your account is permanent. All scripts and data will be removed immediately.
          </p>
          <div className="space-y-3">
            <input
              type="text"
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              placeholder='Type "DELETE" to confirm'
              className="w-full bg-bg-secondary border border-white/8 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-red-500/40 transition-colors"
            />
            <button
              onClick={handleDeleteAccount}
              disabled={deleteConfirm !== "DELETE" || deleting}
              className="w-full py-2.5 px-5 text-sm font-medium rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {deleting ? "Deleting account..." : "Delete My Account"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
