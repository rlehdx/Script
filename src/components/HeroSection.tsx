"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

/* ── Stagger variants ── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function HeroSection() {
  return (
    <section
      aria-label="Hero"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        paddingTop: "84px",
        background: "var(--obsidian)",
        overflow: "hidden",
      }}
    >
      {/* Radial glow backdrop */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 55% at 60% 40%, rgba(201,168,76,0.08) 0%, transparent 65%), " +
            "radial-gradient(ellipse 50% 40% at 20% 80%, rgba(196,30,58,0.05) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Three.js canvas — right half, lazy-loaded to avoid blocking LCP */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "60%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <HeroCanvas />
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          maxWidth: "1200px",
          marginInline: "auto",
          width: "100%",
          paddingInline: "2rem",
          paddingBlock: "4rem 5rem",
          justifyContent: "center",
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: "640px" }}
        >
          {/* Kicker */}
          <motion.div variants={itemVariants} style={{ marginBottom: "1.5rem" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--champagne)",
                border: "1px solid rgba(201,168,76,0.25)",
                padding: "0.35rem 0.85rem",
                borderRadius: "2px",
                background: "rgba(201,168,76,0.06)",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--champagne)", display: "inline-block", boxShadow: "0 0 8px var(--champagne)" }} />
              GPT-4.1 · Script Generation · Instant
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.2rem, 9vw, 7.5rem)",
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              color: "var(--silver-bright)",
              marginBottom: "1.75rem",
            }}
          >
            Your Scripts.
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #8A6E2A 0%, #C9A84C 40%, #EDD078 55%, #C9A84C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Written
            </span>
            <br />
            In Seconds.
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              lineHeight: 1.75,
              color: "var(--silver)",
              maxWidth: "420px",
              marginBottom: "2.5rem",
            }}
          >
            Drop your topic. Pick a format. GPT-4.1 writes a fully structured,
            section-labeled script — YouTube, TikTok, VSL, cold email, podcast —
            ready for production in under 10 seconds.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}
          >
            <Link href="/sign-up" className="btn-champagne">
              Start for free
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <a href="#try-free" className="btn-glass">
              Try without signing up
            </a>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            variants={itemVariants}
            style={{
              marginTop: "3rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "2rem",
            }}
          >
            {[
              { n: "12,000+", label: "Scripts Generated" },
              { n: "3,400+",  label: "Active Creators" },
              { n: "4.9/5",   label: "Avg Rating" },
              { n: "<10s",    label: "Per Script" },
            ].map((stat) => (
              <div key={stat.label} style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.4rem, 3vw, 2rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    color: "var(--silver-bright)",
                    lineHeight: 1,
                  }}
                >
                  {stat.n}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--silver-dim)",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "120px",
          background: "linear-gradient(to bottom, transparent, var(--obsidian))",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
