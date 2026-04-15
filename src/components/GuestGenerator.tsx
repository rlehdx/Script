"use client";

import { useState } from "react";
import Link from "next/link";

const SCRIPT_TYPES = [
  "YouTube Video Script",
  "TikTok/Reels Hook",
  "VSL Script",
  "Facebook Ad Script",
  "Podcast Intro",
  "Cold Email Script",
];

const TONES = ["Professional", "Casual", "Funny", "Urgent"];
const DURATIONS = ["30s", "60s"];

interface Scene {
  id: number;
  label: string;
  narration: string;
  visual: string;
  duration_hint: string;
}

export default function GuestGenerator() {
  const [scriptType, setScriptType] = useState(SCRIPT_TYPES[0]);
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState(TONES[0]);
  const [duration, setDuration] = useState(DURATIONS[1]);

  const [output, setOutput] = useState("");
  const [title, setTitle] = useState("");
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [guestUsed, setGuestUsed] = useState(0);
  const [limitReached, setLimitReached] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleGenerate() {
    if (!topic.trim() || generating) return;
    setGenerating(true);
    setError("");
    setOutput("");

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scriptType, topic, tone, duration, language: "English" }),
    });

    const data = await res.json();

    if (!res.ok) {
      if (data.code === "GUEST_LIMIT_REACHED") {
        setLimitReached(true);
        setGuestUsed(data.guestUsed ?? 3);
      } else {
        setError(data.error ?? "Generation failed. Please try again.");
      }
      setGenerating(false);
      return;
    }

    setOutput(data.output ?? data.script ?? "");
    setTitle(data.title ?? "");
    setScenes(data.scenes ?? []);
    setGuestUsed(data.guestUsed ?? 0);
    setGenerating(false);
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (limitReached) {
    return (
      <div className="bezel-card p-10 text-center">
        <div className="text-4xl mb-4">🎉</div>
        <h3 className="text-xl font-bold mb-2">오늘의 무료 체험 {guestUsed}개를 모두 사용했습니다!</h3>
        <p className="text-slate-400 text-sm mb-6">
          무료 계정을 만들면 매달 5개의 스크립트를 무료로 생성할 수 있어요.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/sign-up" className="btn-primary px-8 py-3">
            무료 계정 만들기 (월 5개 무료)
          </Link>
          <Link href="/pricing" className="btn-secondary px-8 py-3">
            플랜 보기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bezel-card p-6 space-y-5">
      {/* 게스트 사용량 뱃지 */}
      {guestUsed > 0 && (
        <div className="flex items-center justify-between text-xs text-slate-500 bg-white/3 rounded-lg px-3 py-2">
          <span>오늘 사용: <span className="text-white font-medium">{guestUsed} / 3</span></span>
          <Link href="/sign-up" className="text-purple-400 hover:text-purple-300 transition-colors">
            가입하면 매달 5개 무료 →
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full bg-bg-secondary border border-white/8 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors"
          >
            {TONES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Duration */}
      <div>
        <label className="block text-xs text-slate-500 mb-1.5">
          Duration <span className="text-slate-600">(guest: 30s / 60s only)</span>
        </label>
        <div className="flex gap-2">
          {DURATIONS.map((d) => (
            <button
              key={d}
              onClick={() => setDuration(d)}
              className={`py-1.5 px-4 rounded-lg text-xs font-medium transition-all duration-200 border ${
                duration === d
                  ? "bg-purple-500/20 border-purple-500/40 text-purple-300"
                  : "bg-bg-secondary border-white/5 text-slate-400 hover:border-white/15"
              }`}
            >
              {d}
            </button>
          ))}
          {["3min", "5min", "10min"].map((d) => (
            <Link
              key={d}
              href="/sign-up"
              className="py-1.5 px-3 rounded-lg text-xs font-medium border border-white/5 text-slate-600 opacity-60 hover:opacity-80 transition-opacity"
              title="Sign up to unlock"
            >
              {d} <span className="text-[9px] text-amber-500">Pro</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Topic */}
      <div>
        <label className="block text-xs text-slate-500 mb-1.5">Topic / Product / Goal</label>
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. Selling a $97 Notion productivity course to overwhelmed freelancers..."
          rows={3}
          className="w-full bg-bg-secondary border border-white/8 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
        />
        {error && <p className="text-xs text-red-400 mt-1.5">{error}</p>}
      </div>

      <button
        onClick={handleGenerate}
        disabled={generating || !topic.trim()}
        className="btn-primary w-full justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
      >
        {generating ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Generating...
          </>
        ) : (
          <>
            Generate Free Script
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L8 14M2 8L8 2L14 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </>
        )}
      </button>

      {/* Output */}
      {output && (
        <div className="bezel-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-300">{title || "Generated Script"}</h3>
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
          <div className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto">
            {output}
          </div>
          {scenes.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-white/5">
              {scenes.map((s) => (
                <div key={s.id} className="text-xs bg-white/3 rounded-lg p-3">
                  <span className="text-purple-400 font-semibold uppercase">[{s.label}]</span>
                  <span className="text-slate-400 ml-2">{s.narration}</span>
                </div>
              ))}
            </div>
          )}
          <div className="pt-3 border-t border-white/5 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              {guestUsed < 3
                ? `오늘 ${3 - guestUsed}개 더 체험 가능 · 가입하면 매달 5개 무료`
                : "오늘 무료 체험을 모두 사용했습니다"}
            </p>
            <Link href="/sign-up" className="text-xs text-purple-400 hover:text-purple-300 transition-colors font-medium">
              무료 가입 →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
