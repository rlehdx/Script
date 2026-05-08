"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      aria-label="Hero"
      style={{
        background: "var(--paper)",
        paddingTop: "84px", /* navbar height: 28px ticker + 56px nav */
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Top metadata row ── */}
      <div
        style={{
          borderBottom: "1px solid rgba(13,13,13,0.15)",
          paddingInline: "2rem",
          maxWidth: "1200px",
          marginInline: "auto",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "36px",
          gap: "1rem",
        }}
      >
        <span className="issue-number">Vol. 01 — AI Script Studio</span>
        <div style={{ height: "100%", width: "1px", background: "rgba(13,13,13,0.12)" }} />
        <span className="issue-number" style={{ flex: 1 }}>Est. 2024</span>
        <span className="issue-number">GPT-4o</span>
      </div>

      {/* ── Hero content ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          maxWidth: "1200px",
          marginInline: "auto",
          width: "100%",
          paddingInline: "2rem",
        }}
      >
        {/* Big headline block */}
        <div
          style={{
            borderBottom: "1px solid rgba(13,13,13,0.15)",
            paddingBlock: "3rem 2rem",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "0",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Kicker */}
            <div style={{ marginBottom: "1.25rem" }}>
              <span className="kicker">Script Generation — Instant</span>
            </div>

            {/* Main headline */}
            <h1 className="text-hero" style={{ color: "var(--ink)", marginBottom: "0" }}>
              Your Scripts.
              <br />
              <span style={{ color: "var(--red)", WebkitTextStroke: "0px" }}>
                Written
              </span>
              <br />
              <span style={{ color: "var(--ink)" }}>
                In Seconds.
              </span>
            </h1>
          </motion.div>
        </div>

        {/* ── Two-column lower block ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0",
            flex: 1,
          }}
          className="grid-cols-1 md:grid-cols-2"
        >
          {/* Left — description + CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            style={{
              borderRight: "1px solid rgba(13,13,13,0.15)",
              padding: "2.5rem 2.5rem 3rem 0",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "2rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                lineHeight: 1.8,
                color: "var(--ink-muted)",
                maxWidth: "380px",
              }}
            >
              Drop your topic. Pick a format. GPT-4o writes a fully structured,
              section-labeled script — YouTube, TikTok, VSL, cold email, podcast —
              ready for production in under 10 seconds.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", alignItems: "flex-start" }}>
              <Link href="/sign-up" className="btn-ink">
                Start for free
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
                </svg>
              </Link>
              <a
                href="#try-free"
                className="btn-outline"
              >
                Try without signing up
              </a>
            </div>
          </motion.div>

          {/* Right — stats table */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ padding: "2.5rem 0 3rem 2.5rem" }}
          >
            {/* Stat grid */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {[
                { n: "12,000+", label: "Scripts Generated", sub: "Since launch" },
                { n: "3,400+",  label: "Active Creators",   sub: "Using Scriva daily" },
                { n: "4.9/5",   label: "Average Rating",    sub: "User satisfaction" },
                { n: "<10s",    label: "Generation Speed",  sub: "From input to output" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    alignItems: "center",
                    borderBottom: i < 3 ? "1px solid rgba(13,13,13,0.1)" : "none",
                    paddingBlock: "1rem",
                    gap: "1rem",
                  }}
                >
                  <span className="stat-num">{stat.n}</span>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.72rem",
                        fontWeight: 500,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: "var(--ink)",
                      }}
                    >
                      {stat.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.65rem",
                        color: "var(--ink-faint)",
                        marginTop: "0.15rem",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {stat.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Small footnote */}
            <p
              style={{
                marginTop: "1.5rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.62rem",
                color: "var(--ink-faint)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              No credit card required · 5 free scripts/month
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
