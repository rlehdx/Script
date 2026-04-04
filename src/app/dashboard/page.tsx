"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import DashboardLayout from "./layout-inner";
import UpgradeModal from "@/components/UpgradeModal";
import UsageBar from "@/components/UsageBar";
import ScriptHistory, { type HistoryScript } from "@/components/ScriptHistory";
import SceneViewer from "@/components/SceneViewer";
import AffiliateCTA from "@/components/AffiliateCTA";
import { SCRIPT_TYPES, TONES, DURATIONS, LANGUAGES } from "@/lib/openai";
import type { PlanType } from "@/lib/stripe";

const DURATION_PLAN_REQUIRED: Record<string, PlanType> = {
  "30s": "starter", "60s": "starter",
  "3min": "creator", "5min": "creator",
  "10min": "agency",
};

function canUseDuration(planType: PlanType, duration: string): boolean {
  const required = DURATION_PLAN_REQUIRED[duration] ?? "starter";
  const order: PlanType[] = ["starter", "creator", "agency"];
  return order.indexOf(planType) >= order.indexOf(required);
}

interface Scene {
  id: number;
  label: string;
  narration: string;
  visual: string;
  duration_hint: string;
}

interface UsageStatus {
  planType: PlanType;
  scriptsUsed: number;
  limit: number; // -1 = unlimited
}

function DashboardContent() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const justUpgraded = searchParams.get("upgraded") === "true";

  const [scriptType, setScriptType] = useState<string>(SCRIPT_TYPES[0]);
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<string>(TONES[0]);
  const [duration, setDuration] = useState<string>(DURATIONS[1]);
  const [language, setLanguage] = useState<string>(LANGUAGES[0]);

  const [output, setOutput] = useState("");
  const [scriptTitle, setScriptTitle] = useState("");
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [retryAfter, setRetryAfter] = useState(0);

  const [usage, setUsage] = useState<UsageStatus>({ planType: "starter", scriptsUsed: 0, limit: 5 });
  const [scripts, setScripts] = useState<HistoryScript[]>([]);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const fetchUsage = useCallback(async () => {
    const res = await fetch("/api/subscription/status");
    if (res.ok) {
      const data = await res.json();
      setUsage({ planType: data.planType, scriptsUsed: data.scriptsUsed, limit: data.limit });
    }
  }, []);

  const fetchHistory = useCallback(async () => {
    setLoadingHistory(true);
    const res = await fetch("/api/scripts?limit=20");
    if (res.ok) {
      const data = await res.json();
      setScripts(data.scripts ?? []);
    }
    setLoadingHistory(false);
  }, []);

  useEffect(() => {
    fetchUsage();
    fetchHistory();
  }, [fetchUsage, fetchHistory]);

  async function handleGenerate() {
    if (!topic.trim()) {
      setError("Please describe your topic or product.");
      return;
    }
    if (generating || retryAfter > 0) return;

    setGenerating(true);
    setError("");
    setOutput("");

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scriptType, topic, tone, duration, language }),
    });

    const data = await res.json();

    if (!res.ok) {
      if (res.status === 429 && data.code !== "LIMIT_REACHED") {
        // OpenAI RPM limit — show countdown
        const wait = 20;
        setError(`Too many requests. Please try again in ${wait} seconds.`);
        setRetryAfter(wait);
        const interval = setInterval(() => {
          setRetryAfter((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              setError("");
              return 0;
            }
            const next = prev - 1;
            setError(`Too many requests. Please try again in ${next} seconds.`);
            return next;
          });
        }, 1000);
      } else if (data.code === "LIMIT_REACHED") {
        setShowUpgradeModal(true);
      } else {
        setError(data.error ?? "Generation failed. Please try again.");
      }
      setGenerating(false);
      return;
    }

    setOutput(data.output ?? data.script ?? "");
    setScriptTitle(data.title ?? "");
    setScenes(data.scenes ?? []);
    setUsage({ planType: data.planType, scriptsUsed: data.scriptsUsed, limit: data.limit });
    fetchHistory();
    setGenerating(false);
  }

  function handleRegenerate(params: {
    scriptType: string;
    topic: string;
    tone: string;
    language: string;
  }) {
    setScriptType(params.scriptType);
    setTopic(params.topic);
    setTone(params.tone);
    setLanguage(params.language);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `scriva-${scriptType.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <DashboardLayout usage={usage}>
      <div className="flex-1 overflow-y-auto">
        {/* Upgrade success banner */}
        {justUpgraded && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-6 mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3"
          >
            <span className="text-green-400">✓</span>
            <p className="text-sm text-green-300">Plan upgraded successfully! Enjoy your new limits.</p>
          </motion.div>
        )}

        <div className="p-6 max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold">
                Welcome back{user?.firstName ? `, ${user.firstName}` : ""}
              </h1>
              <p className="text-sm text-slate-500 mt-1">Generate a new script below</p>
            </div>

            <UsageBar
              planType={usage.planType}
              scriptsUsed={usage.scriptsUsed}
              limit={usage.limit}
            />
          </div>

          {/* Generator form */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="bezel-card p-5 space-y-4">
                <h2 className="text-sm font-semibold text-slate-300 mb-1">Script settings</h2>

                {/* Script type */}
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Script type</label>
                  <select
                    value={scriptType}
                    onChange={(e) => setScriptType(e.target.value)}
                    className="w-full bg-bg-secondary border border-white/8 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                  >
                    {SCRIPT_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Tone */}
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Tone</label>
                  <div className="grid grid-cols-2 gap-2">
                    {TONES.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTone(t)}
                        className={`py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200 border ${
                          tone === t
                            ? "bg-purple-500/20 border-purple-500/40 text-purple-300"
                            : "bg-bg-secondary border-white/5 text-slate-400 hover:border-white/15"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Duration</label>
                  <div className="flex flex-wrap gap-2">
                    {DURATIONS.map((d) => {
                      const allowed = canUseDuration(usage.planType, d);
                      const required = DURATION_PLAN_REQUIRED[d];
                      return (
                        <button
                          key={d}
                          onClick={() => {
                            if (!allowed) { setShowUpgradeModal(true); return; }
                            setDuration(d);
                          }}
                          title={!allowed ? `Requires ${required} plan` : undefined}
                          className={`py-1.5 px-3 rounded-lg text-xs font-medium transition-all duration-200 border relative ${
                            !allowed
                              ? "border-white/5 text-slate-600 cursor-pointer opacity-60"
                              : duration === d
                              ? "bg-purple-500/20 border-purple-500/40 text-purple-300"
                              : "bg-bg-secondary border-white/5 text-slate-400 hover:border-white/15"
                          }`}
                        >
                          {d}
                          {!allowed && (
                            <span className="ml-1 text-[9px] uppercase tracking-wide text-amber-500">
                              {required === "agency" ? "Agency" : "Pro"}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">
                    Language
                    {usage.planType === "starter" && (
                      <span className="ml-1 text-purple-400 text-[10px]">Creator+ for non-English</span>
                    )}
                  </label>
                  <select
                    value={language}
                    onChange={(e) => {
                      if (usage.planType === "starter" && e.target.value !== "English") {
                        setShowUpgradeModal(true);
                        return;
                      }
                      setLanguage(e.target.value);
                    }}
                    className="w-full bg-bg-secondary border border-white/8 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                  >
                    {LANGUAGES.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Topic + output */}
            <div className="lg:col-span-3 space-y-4">
              <div className="bezel-card p-5">
                <label className="block text-xs text-slate-500 mb-1.5">Topic / Product / Goal</label>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Selling a $97 Notion productivity course to overwhelmed freelancers who can't manage their time..."
                  rows={4}
                  className="w-full bg-bg-secondary border border-white/8 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                />
                {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
                <button
                  onClick={handleGenerate}
                  disabled={generating || retryAfter > 0 || !topic.trim()}
                  className="btn-primary w-full justify-center mt-3 py-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
                >
                  {generating ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Generating script...
                    </>
                  ) : retryAfter > 0 ? (
                    `Retry in ${retryAfter}s...`
                  ) : (
                    <>
                      Generate Script
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 2L8 14M2 8L8 2L14 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {/* Output */}
              <AnimatePresence>
                {output && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="bezel-card p-5"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-slate-300">Generated Script</h3>
                      <div className="flex items-center gap-2">
                        <button onClick={handleGenerate} disabled={generating} className="btn-secondary py-1.5 px-3 text-xs">
                          Regenerate
                        </button>
                        <button onClick={handleDownload} className="btn-secondary py-1.5 px-3 text-xs">
                          Download .txt
                        </button>
                        <button
                          onClick={handleCopy}
                          className={`py-1.5 px-3 text-xs rounded-lg font-medium transition-all duration-200 border ${
                            copied
                              ? "bg-green-500/20 border-green-500/40 text-green-300"
                              : "btn-secondary"
                          }`}
                        >
                          {copied ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    </div>
                    <SceneViewer
                      title={scriptTitle}
                      script={output}
                      scenes={scenes}
                    />
                    <AffiliateCTA />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Script history */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-slate-300">Script History</h2>
              {usage.planType === "starter" && (
                <Link href="/pricing" className="text-xs text-purple-400 hover:text-purple-300">
                  Upgrade for full history →
                </Link>
              )}
            </div>
            <ScriptHistory
              scripts={scripts}
              loading={loadingHistory}
              planType={usage.planType}
              onRegenerate={handleRegenerate}
            />
          </div>
        </div>
      </div>

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        scriptsUsed={usage.scriptsUsed}
      />
    </DashboardLayout>
  );
}

export default function DashboardPage() {
  return (
    <Suspense>
      <DashboardContent />
    </Suspense>
  );
}
