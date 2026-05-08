"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GuestGenerator from "@/components/GuestGenerator";
import HeroSection from "@/components/HeroSection";

/* ══════════════════════════════════════════════════════════════════════════
   REVEAL WRAPPER
   ══════════════════════════════════════════════════════════════════════════ */

function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════════════════ */

const SCRIPT_TYPES = [
  { label: "YouTube",    code: "YT",   desc: "Hook-first long-form scripts with scene labels, transitions, and CTAs built in." },
  { label: "TikTok",     code: "TT",   desc: "Under-60-second hooks engineered for the scroll-stop moment and loop retention." },
  { label: "VSL",        code: "VSL",  desc: "Video sales letters structured for conversion — problem, agitation, solution." },
  { label: "Facebook Ad",code: "FB",   desc: "Pattern-interrupt opens, social proof, and single-minded call-to-action." },
  { label: "Podcast",    code: "POD",  desc: "Warm intros, guest framings, and episode breakdowns with natural voice flow." },
  { label: "Cold Email", code: "EMAIL",desc: "Subject + 3-sentence body with a clear ask. No fluff, high reply rate." },
  { label: "Product Demo",code: "DEMO",desc: "Feature-first walkthroughs that convert curious visitors into buyers." },
  { label: "Webinar",    code: "WEB",  desc: "Full webinar scripts with rapport-building, content, and pitch sequences." },
];

const STEPS = [
  {
    num: "01",
    title: "Describe",
    detail: "Pick script type. Paste your topic, niche, or talking points. Choose tone and duration.",
  },
  {
    num: "02",
    title: "Generate",
    detail: "GPT-4o processes your brief and outputs a fully labeled, section-structured script in under 10 seconds.",
  },
  {
    num: "03",
    title: "Ship",
    detail: "Copy to clipboard, download .txt, or regenerate with different settings. Zero friction.",
  },
];

const TESTIMONIALS = [
  {
    name: "Marcus Webb",
    handle: "@marcuswebb",
    role: "YouTube Creator — 280k subs",
    text: "I used to spend 3–4 hours scripting each video. Now I generate a full draft in 30 seconds. My last three videos hit 100k+ views using Scriva scripts.",
  },
  {
    name: "Priya Nair",
    handle: "@priyanair",
    role: "Freelance Copywriter",
    text: "I charge $500 per VSL. Scriva lets me produce a polished first draft in minutes. My output has tripled and clients can't tell the difference.",
  },
  {
    name: "Jake Thornton",
    handle: "@jakethornton",
    role: "E-commerce Founder",
    text: "Our Facebook ROAS went from 1.8× to 4.2× after we started using Scriva scripts. The Urgent tone template is dialed in for conversion.",
  },
];

const FAQS = [
  { q: "What AI model powers Scriva?", a: "OpenAI GPT-4o — the same model professional agencies use. You get that quality at a fraction of the cost." },
  { q: "How is the Free plan limited?", a: "5 scripts per month. Resets on the 1st. Enough to test every script type before committing." },
  { q: "Can I cancel anytime?", a: "Yes. Cancel from Settings. You keep Pro access until the billing period ends. No questions asked." },
  { q: "What languages are supported?", a: "Pro users: English, Spanish, Korean, Japanese, French. More on the roadmap." },
  { q: "Can I use scripts commercially?", a: "Yes — everything you generate is yours. Ads, YouTube, client work, anything." },
];

/* ══════════════════════════════════════════════════════════════════════════
   FAQ ITEM
   ══════════════════════════════════════════════════════════════════════════ */

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(13,13,13,0.12)",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "center",
          gap: "1rem",
          padding: "1.25rem 0",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.82rem",
            fontWeight: 500,
            letterSpacing: "0.03em",
            color: "var(--ink)",
          }}
        >
          {question}
        </span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.4rem",
            color: open ? "var(--red)" : "var(--ink-faint)",
            lineHeight: 1,
            transform: open ? "rotate(45deg)" : "none",
            transition: "transform 0.25s ease, color 0.2s ease",
            display: "block",
          }}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: "hidden" }}
      >
        <p
          style={{
            paddingBottom: "1.25rem",
            fontFamily: "var(--font-body)",
            fontSize: "0.8rem",
            lineHeight: 1.8,
            color: "var(--ink-muted)",
          }}
        >
          {answer}
        </p>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════════════════════════ */

export default function HomePage() {
  return (
    <main style={{ background: "var(--paper)", minHeight: "100svh" }}>
      <Navbar />
      <HeroSection />

      {/* ══════════════════════════════════════
          LIVE DEMO
          ══════════════════════════════════════ */}
      <section
        id="try-free"
        aria-labelledby="try-free-heading"
        style={{
          borderTop: "1px solid var(--ink)",
          background: "var(--paper-warm)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            marginInline: "auto",
            paddingInline: "2rem",
          }}
        >
          {/* Section header row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              alignItems: "center",
              gap: "2rem",
              borderBottom: "1px solid rgba(13,13,13,0.15)",
              paddingBlock: "1.5rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.9rem",
                letterSpacing: "0.1em",
                color: "var(--red)",
              }}
            >
              LIVE DEMO
            </span>
            <span className="text-label">3 free scripts per day · No account required</span>
          </div>

          {/* Demo area */}
          <div style={{ paddingBlock: "3rem" }}>
            <Reveal>
              <h2
                id="try-free-heading"
                className="text-display-lg"
                style={{ color: "var(--ink)", marginBottom: "2.5rem" }}
              >
                Generate a script<br />in seconds
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <GuestGenerator />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SCRIPT TYPES — TYPOGRAPHIC TABLE
          ══════════════════════════════════════ */}
      <section
        id="features"
        aria-labelledby="features-heading"
        style={{ borderTop: "1px solid var(--ink)", background: "var(--paper)" }}
      >
        <div
          style={{
            maxWidth: "1200px",
            marginInline: "auto",
            paddingInline: "2rem",
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              alignItems: "center",
              gap: "2rem",
              borderBottom: "1px solid rgba(13,13,13,0.15)",
              paddingBlock: "1.5rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.9rem",
                letterSpacing: "0.1em",
                color: "var(--red)",
              }}
            >
              FORMATS
            </span>
            <span className="text-label">8 script types — all included</span>
          </div>

          <div style={{ paddingBlock: "3rem" }}>
            <Reveal>
              <h2
                id="features-heading"
                className="text-display-xl"
                style={{ color: "var(--ink)", marginBottom: "3rem" }}
              >
                Every format<br />you need
              </h2>
            </Reveal>

            {/* Table */}
            <div style={{ borderTop: "1px solid rgba(13,13,13,0.15)" }}>
              {SCRIPT_TYPES.map((type, i) => (
                <Reveal key={type.code} delay={i * 0.05}>
                  <div
                    className="ink-cell"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "80px 1fr 2fr",
                      alignItems: "center",
                      gap: "2rem",
                      padding: "1.25rem 1rem",
                      borderBottom: "1px solid rgba(13,13,13,0.1)",
                      cursor: "default",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.1em",
                        color: "var(--ink-faint)",
                        textTransform: "uppercase",
                      }}
                    >
                      [{type.code}]
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.5rem",
                        letterSpacing: "0.04em",
                        color: "inherit",
                        lineHeight: 1,
                      }}
                    >
                      {type.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.78rem",
                        lineHeight: 1.6,
                        color: "var(--ink-muted)",
                      }}
                    >
                      {type.desc}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          HOW IT WORKS — NUMBERED
          ══════════════════════════════════════ */}
      <section
        id="how-it-works"
        aria-labelledby="how-it-works-heading"
        style={{
          borderTop: "1px solid var(--ink)",
          background: "var(--ink)",
          color: "var(--paper)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            marginInline: "auto",
            paddingInline: "2rem",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              alignItems: "center",
              gap: "2rem",
              borderBottom: "1px solid rgba(244,241,235,0.12)",
              paddingBlock: "1.5rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.9rem",
                letterSpacing: "0.1em",
                color: "var(--red)",
              }}
            >
              PROCESS
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(244,241,235,0.35)",
              }}
            >
              Three steps
            </span>
          </div>

          {/* Steps */}
          <div style={{ paddingBlock: "3rem 4rem" }}>
            <Reveal>
              <h2
                id="how-it-works-heading"
                className="text-display-xl"
                style={{ color: "var(--paper)", marginBottom: "3rem" }}
              >
                How it<br />works
              </h2>
            </Reveal>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "0",
                borderTop: "1px solid rgba(244,241,235,0.1)",
              }}
              className="grid-cols-1 md:grid-cols-3"
            >
              {STEPS.map((step, i) => (
                <Reveal key={step.num} delay={i * 0.1}>
                  <div
                    style={{
                      padding: "2rem 2rem 2rem 0",
                      borderRight: i < 2 ? "1px solid rgba(244,241,235,0.1)" : "none",
                      paddingLeft: i > 0 ? "2rem" : "0",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.12em",
                        color: "var(--red)",
                        marginBottom: "1.5rem",
                        textTransform: "uppercase",
                      }}
                    >
                      Step {step.num}
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "3rem",
                        color: "var(--paper)",
                        marginBottom: "1rem",
                        lineHeight: 0.9,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.78rem",
                        lineHeight: 1.8,
                        color: "rgba(244,241,235,0.5)",
                        maxWidth: "280px",
                      }}
                    >
                      {step.detail}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PRICING
          ══════════════════════════════════════ */}
      <section
        aria-labelledby="pricing-heading"
        style={{
          borderTop: "1px solid var(--ink)",
          background: "var(--paper)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            marginInline: "auto",
            paddingInline: "2rem",
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              alignItems: "center",
              gap: "2rem",
              borderBottom: "1px solid rgba(13,13,13,0.15)",
              paddingBlock: "1.5rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.9rem",
                letterSpacing: "0.1em",
                color: "var(--red)",
              }}
            >
              PRICING
            </span>
            <span className="text-label">Start free. Upgrade when you need more.</span>
          </div>

          <div style={{ paddingBlock: "3rem 4rem" }}>
            <Reveal>
              <h2
                id="pricing-heading"
                className="text-display-xl"
                style={{ color: "var(--ink)", marginBottom: "3rem" }}
              >
                Simple,<br />honest pricing
              </h2>
            </Reveal>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem",
              }}
              className="grid-cols-1 md:grid-cols-2"
            >
              {/* Free */}
              <Reveal>
                <div
                  className="ink-card"
                  style={{ padding: "2.5rem" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "2rem",
                      borderBottom: "1px solid rgba(13,13,13,0.1)",
                      paddingBottom: "1.5rem",
                    }}
                  >
                    <div>
                      <div className="text-label" style={{ marginBottom: "0.5rem" }}>Free</div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "4rem",
                          lineHeight: 1,
                          color: "var(--ink)",
                          letterSpacing: "0.02em",
                        }}
                      >
                        $0
                      </div>
                    </div>
                    <span className="text-label">/ month</span>
                  </div>

                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.6rem",
                      marginBottom: "2rem",
                    }}
                  >
                    {[
                      "5 scripts per month",
                      "All 8 script types",
                      "4 tones",
                      "Copy & download (.txt)",
                      "Script history (last 10)",
                    ].map((f) => (
                      <li
                        key={f}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          fontFamily: "var(--font-body)",
                          fontSize: "0.78rem",
                          color: "var(--ink-muted)",
                        }}
                      >
                        <span style={{ color: "var(--ink)", fontSize: "0.6rem" }}>—</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link href="/sign-up" className="btn-outline" style={{ width: "100%", justifyContent: "center" }}>
                    Get started free
                  </Link>
                </div>
              </Reveal>

              {/* Pro */}
              <Reveal delay={0.1}>
                <div
                  style={{
                    background: "var(--ink)",
                    color: "var(--paper)",
                    padding: "2.5rem",
                    position: "relative",
                    border: "1px solid var(--ink)",
                  }}
                >
                  {/* Most popular tag */}
                  <div
                    style={{
                      position: "absolute",
                      top: "1.25rem",
                      right: "1.25rem",
                      background: "var(--red)",
                      color: "var(--paper)",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.55rem",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      padding: "0.3rem 0.75rem",
                    }}
                  >
                    Most Popular
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "2rem",
                      borderBottom: "1px solid rgba(244,241,235,0.12)",
                      paddingBottom: "1.5rem",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.65rem",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--red)",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Pro
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "4rem",
                          lineHeight: 1,
                          color: "var(--paper)",
                          letterSpacing: "0.02em",
                        }}
                      >
                        $19
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.65rem",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "rgba(244,241,235,0.4)",
                        }}
                      >
                        / month
                      </span>
                      <div
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.62rem",
                          color: "var(--red)",
                          marginTop: "0.4rem",
                          letterSpacing: "0.04em",
                        }}
                      >
                        $149/year — save $79
                      </div>
                    </div>
                  </div>

                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.6rem",
                      marginBottom: "2rem",
                    }}
                  >
                    {[
                      "200 scripts per month",
                      "All script types + tones",
                      "5 languages (EN ES KO JA FR)",
                      "Unlimited script history",
                      "Priority generation speed",
                    ].map((f) => (
                      <li
                        key={f}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          fontFamily: "var(--font-body)",
                          fontSize: "0.78rem",
                          color: "rgba(244,241,235,0.7)",
                        }}
                      >
                        <span style={{ color: "var(--red)", fontSize: "0.6rem" }}>—</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link href="/pricing" className="btn-red" style={{ width: "100%", justifyContent: "center" }}>
                    Upgrade to Pro
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TESTIMONIALS
          ══════════════════════════════════════ */}
      <section
        aria-labelledby="testimonials-heading"
        style={{
          borderTop: "1px solid var(--ink)",
          background: "var(--paper-warm)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            marginInline: "auto",
            paddingInline: "2rem",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              alignItems: "center",
              gap: "2rem",
              borderBottom: "1px solid rgba(13,13,13,0.15)",
              paddingBlock: "1.5rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.9rem",
                letterSpacing: "0.1em",
                color: "var(--red)",
              }}
            >
              TESTIMONIALS
            </span>
            <span className="text-label">From real creators</span>
          </div>

          <div style={{ paddingBlock: "3rem 4rem" }}>
            <Reveal>
              <h2
                id="testimonials-heading"
                className="text-display-xl"
                style={{ color: "var(--ink)", marginBottom: "3rem" }}
              >
                Creators<br />love Scriva
              </h2>
            </Reveal>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1.5rem",
                alignItems: "start",
              }}
              className="grid-cols-1 md:grid-cols-3"
            >
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={t.name} delay={i * 0.1}>
                  <div
                    className="ink-card"
                    style={{ padding: "2rem" }}
                  >
                    {/* Stars */}
                    <div
                      style={{
                        display: "flex",
                        gap: "2px",
                        marginBottom: "1.25rem",
                      }}
                    >
                      {[...Array(5)].map((_, j) => (
                        <span key={j} style={{ color: "var(--red)", fontSize: "0.7rem" }}>★</span>
                      ))}
                    </div>

                    <blockquote
                      style={{
                        margin: 0,
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontSize: "0.9rem",
                        lineHeight: 1.75,
                        color: "var(--ink)",
                        marginBottom: "1.5rem",
                      }}
                    >
                      "{t.text}"
                    </blockquote>

                    <footer
                      style={{
                        borderTop: "1px solid rgba(13,13,13,0.1)",
                        paddingTop: "1rem",
                      }}
                    >
                      <cite
                        style={{
                          display: "block",
                          fontStyle: "normal",
                          fontFamily: "var(--font-body)",
                          fontSize: "0.72rem",
                          fontWeight: 500,
                          color: "var(--ink)",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {t.name}
                      </cite>
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.65rem",
                          color: "var(--ink-faint)",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {t.role}
                      </span>
                    </footer>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FAQ
          ══════════════════════════════════════ */}
      <section
        aria-labelledby="faq-heading"
        style={{
          borderTop: "1px solid var(--ink)",
          background: "var(--paper)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            marginInline: "auto",
            paddingInline: "2rem",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              alignItems: "center",
              gap: "2rem",
              borderBottom: "1px solid rgba(13,13,13,0.15)",
              paddingBlock: "1.5rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.9rem",
                letterSpacing: "0.1em",
                color: "var(--red)",
              }}
            >
              FAQ
            </span>
            <span className="text-label">Common questions</span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              paddingBlock: "3rem 4rem",
              alignItems: "start",
            }}
            className="grid-cols-1 md:grid-cols-2"
          >
            <Reveal>
              <h2
                id="faq-heading"
                className="text-display-xl"
                style={{ color: "var(--ink)" }}
              >
                Questions<br />&amp; answers
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                {FAQS.map((faq, i) => (
                  <FaqItem key={i} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FINAL CTA
          ══════════════════════════════════════ */}
      <section
        aria-labelledby="cta-heading"
        style={{
          borderTop: "2px solid var(--red)",
          background: "var(--ink)",
          color: "var(--paper)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            marginInline: "auto",
            paddingInline: "2rem",
            paddingBlock: "5rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
          className="grid-cols-1 md:grid-cols-2"
        >
          <Reveal>
            <h2
              id="cta-heading"
              className="text-hero"
              style={{ color: "var(--paper)", marginBottom: "0" }}
            >
              Start<br />
              <span style={{ color: "var(--red)" }}>Today.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  lineHeight: 1.8,
                  color: "rgba(244,241,235,0.6)",
                }}
              >
                Join 3,400+ creators already generating production-ready scripts in seconds.
                No credit card required. 5 free scripts every month, forever.
              </p>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link
                  href="/sign-up"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.875rem 2rem",
                    background: "var(--paper)",
                    color: "var(--ink)",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.7rem",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    border: "1px solid var(--paper)",
                    textDecoration: "none",
                    transition: "background 0.2s ease, color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = "var(--red)";
                    el.style.borderColor = "var(--red)";
                    el.style.color = "var(--paper)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = "var(--paper)";
                    el.style.borderColor = "var(--paper)";
                    el.style.color = "var(--ink)";
                  }}
                >
                  Generate your first script
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
                  </svg>
                </Link>

                <a
                  href="#try-free"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.875rem 2rem",
                    background: "transparent",
                    color: "rgba(244,241,235,0.55)",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.7rem",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    border: "1px solid rgba(244,241,235,0.2)",
                    textDecoration: "none",
                    transition: "border-color 0.2s ease, color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = "rgba(244,241,235,0.6)";
                    el.style.color = "var(--paper)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = "rgba(244,241,235,0.2)";
                    el.style.color = "rgba(244,241,235,0.55)";
                  }}
                >
                  Try without an account
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
