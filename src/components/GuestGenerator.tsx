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

const selectStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(20,20,32,0.95)",
  border: "1px solid rgba(212,175,55,0.15)",
  borderRadius: "1px",
  padding: "0.6rem 0.85rem",
  fontSize: "0.85rem",
  color: "#E8E8F0",
  outline: "none",
  fontFamily: "var(--font-body)",
  appearance: "none",
  WebkitAppearance: "none",
  cursor: "pointer",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.7rem",
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  color: "rgba(192,192,200,0.45)",
  marginBottom: "0.5rem",
  fontFamily: "var(--font-body)",
};

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
    const resetTime = new Date();
    resetTime.setUTCHours(24, 0, 0, 0);
    const hoursLeft = Math.ceil((resetTime.getTime() - Date.now()) / 1000 / 60 / 60);

    return (
      <div className="cinema-card" style={{ padding: "3rem 2.5rem", textAlign: "center" }}>
        <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>✦</div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.5rem",
            fontWeight: 400,
            color: "#E8E8F0",
            marginBottom: "0.75rem",
            letterSpacing: "-0.02em",
          }}
        >
          You&apos;ve used your {guestUsed} free trials today
        </h3>
        <p style={{ color: "rgba(192,192,200,0.5)", fontSize: "0.875rem", marginBottom: "0.4rem", lineHeight: 1.7 }}>
          Free trials reset in{" "}
          <span style={{ color: "#E8E8F0", fontWeight: 500 }}>~{hoursLeft}h</span>{" "}
          — or create a free account for 5 scripts every month.
        </p>
        <p style={{ color: "rgba(192,192,200,0.25)", fontSize: "0.75rem", marginBottom: "2rem" }}>
          No credit card required.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", alignItems: "center" }}>
          <Link href="/sign-up" className="btn-gold" style={{ minWidth: 240, justifyContent: "center" }}>
            Create Free Account — 5 scripts/mo
          </Link>
          <Link href="/pricing" className="btn-ghost" style={{ minWidth: 240, justifyContent: "center" }}>
            View Plans
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cinema-card" style={{ padding: "1.75rem" }}>

      {/* Usage indicator */}
      {guestUsed > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "0.75rem",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(212,175,55,0.08)",
            borderRadius: "1px",
            padding: "0.5rem 0.85rem",
            marginBottom: "1.25rem",
          }}
        >
          <span style={{ color: "rgba(192,192,200,0.45)" }}>
            Today:{" "}
            <span style={{ color: "#E8E8F0", fontWeight: 500 }}>{guestUsed} / 3</span>
          </span>
          <Link
            href="/sign-up"
            style={{
              color: "#D4AF37",
              textDecoration: "none",
              fontSize: "0.72rem",
              letterSpacing: "0.04em",
            }}
          >
            Sign up for 5 free/mo →
          </Link>
        </div>
      )}

      {/* Form grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
        <div>
          <label style={labelStyle}>Script type</label>
          <select value={scriptType} onChange={(e) => setScriptType(e.target.value)} style={selectStyle}>
            {SCRIPT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Tone</label>
          <select value={tone} onChange={(e) => setTone(e.target.value)} style={selectStyle}>
            {TONES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* Duration */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={labelStyle}>
          Duration{" "}
          <span style={{ color: "rgba(192,192,200,0.25)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>
            (guest: 30s / 60s only)
          </span>
        </label>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {DURATIONS.map((d) => (
            <button
              key={d}
              onClick={() => setDuration(d)}
              style={{
                padding: "0.4rem 1rem",
                fontSize: "0.75rem",
                fontWeight: 500,
                fontFamily: "var(--font-body)",
                letterSpacing: "0.06em",
                border: duration === d
                  ? "1px solid rgba(212,175,55,0.5)"
                  : "1px solid rgba(255,255,255,0.06)",
                background: duration === d
                  ? "rgba(212,175,55,0.1)"
                  : "rgba(255,255,255,0.02)",
                color: duration === d ? "#D4AF37" : "rgba(192,192,200,0.4)",
                borderRadius: "1px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {d}
            </button>
          ))}
          {["3min", "5min", "10min"].map((d) => (
            <Link
              key={d}
              href="/sign-up"
              title="Sign up to unlock"
              style={{
                padding: "0.4rem 0.75rem",
                fontSize: "0.75rem",
                fontWeight: 500,
                fontFamily: "var(--font-body)",
                border: "1px solid rgba(255,255,255,0.04)",
                background: "transparent",
                color: "rgba(192,192,200,0.2)",
                borderRadius: "1px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                opacity: 0.7,
              }}
            >
              {d}
              <span style={{ fontSize: "0.6rem", color: "#D4AF37" }}>Pro</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Topic */}
      <div style={{ marginBottom: "1.25rem" }}>
        <label style={labelStyle}>Topic / Product / Goal</label>
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. Selling a $97 Notion productivity course to overwhelmed freelancers..."
          rows={3}
          style={{
            width: "100%",
            background: "rgba(20,20,32,0.95)",
            border: "1px solid rgba(212,175,55,0.12)",
            borderRadius: "1px",
            padding: "0.65rem 0.85rem",
            fontSize: "0.85rem",
            color: "#E8E8F0",
            fontFamily: "var(--font-body)",
            outline: "none",
            resize: "none",
            lineHeight: 1.6,
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.35)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.12)")}
        />
        {error && (
          <p style={{ fontSize: "0.75rem", color: "#C41E3A", marginTop: "0.4rem" }}>{error}</p>
        )}
      </div>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        disabled={generating || !topic.trim()}
        className="btn-gold"
        style={{
          width: "100%",
          justifyContent: "center",
          opacity: generating || !topic.trim() ? 0.45 : 1,
          cursor: generating || !topic.trim() ? "not-allowed" : "pointer",
        }}
      >
        {generating ? (
          <>
            <svg
              style={{ animation: "spin 1s linear infinite", width: 14, height: 14 }}
              viewBox="0 0 24 24" fill="none"
            >
              <circle opacity="0.25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path opacity="0.75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Generating…
          </>
        ) : (
          <>
            Generate Free Script
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7H11.5M8 3L11.5 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </>
        )}
      </button>

      {/* Output */}
      {output && (
        <div className="cinema-card" style={{ marginTop: "1.25rem", padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1rem",
                fontWeight: 400,
                color: "#E8E8F0",
                letterSpacing: "-0.01em",
              }}
            >
              {title || "Generated Script"}
            </h3>
            <button
              onClick={handleCopy}
              style={{
                padding: "0.35rem 0.85rem",
                fontSize: "0.72rem",
                fontWeight: 500,
                fontFamily: "var(--font-body)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                border: copied
                  ? "1px solid rgba(100,200,100,0.4)"
                  : "1px solid rgba(212,175,55,0.25)",
                background: copied
                  ? "rgba(100,200,100,0.08)"
                  : "transparent",
                color: copied ? "#6dc47c" : "#D4AF37",
                borderRadius: "1px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>

          <div
            className="cinema-surface"
            style={{
              padding: "1rem",
              fontSize: "0.82rem",
              color: "rgba(192,192,200,0.7)",
              lineHeight: 1.75,
              whiteSpace: "pre-wrap",
              maxHeight: "20rem",
              overflowY: "auto",
              fontFamily: "var(--font-mono)",
            }}
          >
            {output}
          </div>

          {scenes.length > 0 && (
            <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem", borderTop: "1px solid rgba(212,175,55,0.07)", paddingTop: "1rem" }}>
              {scenes.map((s) => (
                <div
                  key={s.id}
                  className="cinema-surface"
                  style={{ padding: "0.65rem 0.85rem", fontSize: "0.75rem" }}
                >
                  <span style={{ color: "#D4AF37", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    [{s.label}]
                  </span>
                  <span style={{ color: "rgba(192,192,200,0.55)", marginLeft: "0.5rem" }}>{s.narration}</span>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: "1.25rem", borderTop: "1px solid rgba(212,175,55,0.07)", paddingTop: "1.25rem" }}>
            <Link href="/sign-up" className="btn-gold" style={{ width: "100%", justifyContent: "center" }}>
              Save This Script — Sign Up Free
            </Link>
            <p style={{ textAlign: "center", fontSize: "0.72rem", color: "rgba(192,192,200,0.3)", marginTop: "0.75rem" }}>
              {guestUsed < 3
                ? `${3 - guestUsed} more free trial${3 - guestUsed === 1 ? "" : "s"} today · Sign up for 5 free/mo`
                : "You've used all free trials for today"}
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        select option { background: #141420; color: #E8E8F0; }
      `}</style>
    </div>
  );
}
