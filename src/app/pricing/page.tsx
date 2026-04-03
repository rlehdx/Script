"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const STARTER_FEATURES = [
  "5 scripts / month",
  "All 8 script types",
  "4 tones",
  "English only",
  "GPT-4o mini model",
  "Copy & download as .txt",
  "Script history (last 5)",
];

const CREATOR_FEATURES = [
  "100 scripts / month",
  "All 8 script types",
  "All 4 tones",
  "5 languages (EN, ES, KO, JA, FR)",
  "GPT-4o model",
  "Full script history",
  "Priority generation speed",
  "Early access to new features",
];

const AGENCY_FEATURES = [
  "Unlimited scripts",
  "All 8 script types",
  "All 4 tones",
  "5 languages (EN, ES, KO, JA, FR)",
  "GPT-4o model",
  "Custom brand voice",
  "Priority generation speed",
  "Dedicated support",
];

type BillingCycle = "monthly" | "annual";
type UpgradePlan = "creator" | "agency";

function CheckIcon({ highlight }: { highlight?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
      <circle
        cx="8" cy="8" r="7"
        fill={highlight ? "rgba(124,58,237,0.15)" : "none"}
        stroke={highlight ? "rgba(124,58,237,0.4)" : "rgba(255,255,255,0.1)"}
        strokeWidth="1.5"
      />
      <path
        d="M5 8L7 10L11 6"
        stroke={highlight ? "#c4b5fd" : "#a78bfa"}
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PricingPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [loading, setLoading] = useState<UpgradePlan | null>(null);

  async function handleUpgrade(plan: UpgradePlan) {
    if (!isSignedIn) {
      router.push("/sign-up");
      return;
    }
    setLoading(plan);
    const res = await fetch("/api/subscription/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ billingCycle, plan }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      setLoading(null);
      alert("Failed to open checkout. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-bg-primary">
      <Navbar />

      <section className="pt-40 pb-24 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 glass border border-purple-500/20 rounded-full px-4 py-2 mb-6">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-xs text-purple-300 font-medium">Stripe TEST MODE — no real charges</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
              Simple, honest pricing
            </h1>
            <p className="text-slate-400 max-w-xl mx-auto text-lg">
              Start free. Scale as you grow.
            </p>

            {/* Billing toggle */}
            <div className="mt-8 inline-flex items-center glass border border-white/8 rounded-xl p-1 gap-1">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  billingCycle === "monthly"
                    ? "bg-accent-gradient text-white shadow-lg shadow-purple-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  billingCycle === "annual"
                    ? "bg-accent-gradient text-white shadow-lg shadow-purple-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Annual
                <span className="text-[10px] bg-green-500/20 text-green-300 border border-green-500/20 rounded-full px-2 py-0.5">
                  Save 20%
                </span>
              </button>
            </div>
          </motion.div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Starter (Free) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bezel-card p-8 flex flex-col"
            >
              <div className="mb-8">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Starter</span>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-5xl font-bold">$0</span>
                  <span className="text-slate-500">/month</span>
                </div>
                <p className="text-sm text-slate-500 mt-2">Forever free. No credit card required.</p>
              </div>
              <ul className="space-y-3.5 mb-8 flex-1">
                {STARTER_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => router.push(isSignedIn ? "/dashboard" : "/sign-up")}
                className="btn-secondary w-full justify-center py-3"
              >
                {isSignedIn ? "Go to Dashboard" : "Get started free"}
              </button>
            </motion.div>

            {/* Creator (Pro) — highlighted */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bezel-card p-8 relative overflow-hidden border-purple-500/30 flex flex-col"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/5 pointer-events-none" />
              <div className="absolute -top-16 -right-16 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute top-4 right-4 bg-accent-gradient text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg shadow-purple-500/30">
                Most popular
              </div>

              <div className="mb-8">
                <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">Creator</span>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-5xl font-bold">
                    {billingCycle === "annual" ? "$15" : "$19"}
                  </span>
                  <span className="text-slate-500">/month</span>
                </div>
                {billingCycle === "annual" ? (
                  <p className="text-sm text-slate-500 mt-2">Billed $190/year — <span className="text-green-400">save $38</span></p>
                ) : (
                  <p className="text-sm text-slate-500 mt-2">or{" "}
                    <button onClick={() => setBillingCycle("annual")} className="text-purple-400 hover:underline">
                      $190/year and save 20%
                    </button>
                  </p>
                )}
              </div>

              <ul className="space-y-3.5 mb-8 flex-1">
                {CREATOR_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckIcon highlight />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleUpgrade("creator")}
                disabled={loading === "creator"}
                className="btn-primary w-full justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === "creator" ? (
                  <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>Opening checkout...</>
                ) : (
                  `Upgrade to Creator — ${billingCycle === "annual" ? "$190/yr" : "$19/mo"}`
                )}
              </button>
              <p className="text-[11px] text-slate-600 text-center mt-3">Cancel anytime.</p>
            </motion.div>

            {/* Agency (Elite) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bezel-card p-8 relative overflow-hidden border-amber-500/20 flex flex-col"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/8 to-orange-500/4 pointer-events-none" />
              <div className="absolute -top-16 -right-16 w-40 h-40 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

              <div className="mb-8">
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">Agency</span>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-5xl font-bold">
                    {billingCycle === "annual" ? "$39" : "$49"}
                  </span>
                  <span className="text-slate-500">/month</span>
                </div>
                {billingCycle === "annual" ? (
                  <p className="text-sm text-slate-500 mt-2">Billed $490/year — <span className="text-green-400">save $98</span></p>
                ) : (
                  <p className="text-sm text-slate-500 mt-2">or{" "}
                    <button onClick={() => setBillingCycle("annual")} className="text-amber-400 hover:underline">
                      $490/year and save 20%
                    </button>
                  </p>
                )}
              </div>

              <ul className="space-y-3.5 mb-8 flex-1">
                {AGENCY_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleUpgrade("agency")}
                disabled={loading === "agency"}
                className="w-full justify-center py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90 shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === "agency" ? (
                  <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>Opening checkout...</>
                ) : (
                  `Upgrade to Agency — ${billingCycle === "annual" ? "$490/yr" : "$49/mo"}`
                )}
              </button>
              <p className="text-[11px] text-slate-600 text-center mt-3">Cancel anytime.</p>
            </motion.div>
          </div>

          {/* Guarantee */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-3 bezel-card px-6 py-4">
              <span className="text-2xl">🛡</span>
              <div className="text-left">
                <p className="text-sm font-semibold">30-day money-back guarantee</p>
                <p className="text-xs text-slate-500">Not happy? Email us within 30 days for a full refund.</p>
              </div>
            </div>
          </motion.div>

          {/* FAQ */}
          <div className="mt-20 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Pricing FAQ</h2>
            <div className="space-y-3">
              {[
                {
                  q: "What is the difference between Creator and Agency?",
                  a: "Creator gives you 100 scripts/month with GPT-4o. Agency adds unlimited scripts, a custom brand voice feature, and dedicated support.",
                },
                {
                  q: "What is the custom brand voice feature?",
                  a: "Agency users can define a brand voice prompt (tone, style, persona) that is automatically injected into every script generation.",
                },
                {
                  q: "Can I switch plans at any time?",
                  a: "Yes. Upgrade or downgrade at any time from your Settings page. Stripe prorates the difference automatically.",
                },
                {
                  q: "Do I need a credit card for the free Starter plan?",
                  a: "No. The Starter plan is completely free with no card required.",
                },
                {
                  q: "What happens when I hit my monthly limit?",
                  a: "Generation is paused until your next billing cycle. You'll see a clear message before that happens.",
                },
              ].map((item) => (
                <div key={item.q} className="bezel-card p-5">
                  <p className="text-sm font-medium mb-2">{item.q}</p>
                  <p className="text-sm text-slate-400">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
