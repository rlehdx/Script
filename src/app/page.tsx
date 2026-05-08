"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GuestGenerator from "@/components/GuestGenerator";
import HeroSection from "@/components/HeroSection";

/* ── Scroll reveal wrapper ── */
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
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Data ── */
const SCRIPT_TYPES = [
  { label: "YouTube",     code: "YT",    desc: "Hook-first long-form scripts with scene labels, transitions, and CTAs built in." },
  { label: "TikTok",      code: "TT",    desc: "Under-60-second hooks engineered for the scroll-stop moment and loop retention." },
  { label: "VSL",         code: "VSL",   desc: "Video sales letters structured for conversion — problem, agitation, solution." },
  { label: "Facebook Ad", code: "FB",    desc: "Pattern-interrupt opens, social proof, and single-minded call-to-action." },
  { label: "Podcast",     code: "POD",   desc: "Warm intros, guest framings, and episode breakdowns with natural voice flow." },
  { label: "Cold Email",  code: "EMAIL", desc: "Subject + 3-sentence body with a clear ask. No fluff, high reply rate." },
  { label: "Product Demo",code: "DEMO",  desc: "Feature-first walkthroughs that convert curious visitors into buyers." },
  { label: "Webinar",     code: "WEB",   desc: "Full webinar scripts with rapport-building, content, and pitch sequences." },
];

const STEPS = [
  { num: "01", title: "Describe",  detail: "Pick script type. Paste your topic, niche, or talking points. Choose tone and duration." },
  { num: "02", title: "Generate", detail: "GPT-4.1 processes your brief and outputs a fully labeled, section-structured script in under 10 seconds." },
  { num: "03", title: "Ship",     detail: "Copy to clipboard, download .txt, or regenerate with different settings. Zero friction." },
];

const TESTIMONIALS = [
  {
    name: "Marcus Webb",
    role: "YouTube Creator — 280k subs",
    text: "I used to spend 3–4 hours scripting each video. Now I generate a full draft in 30 seconds. My last three videos hit 100k+ views using Scriva scripts.",
  },
  {
    name: "Priya Nair",
    role: "Freelance Copywriter",
    text: "I charge $500 per VSL. Scriva lets me produce a polished first draft in minutes. My output has tripled and clients can't tell the difference.",
  },
  {
    name: "Jake Thornton",
    role: "E-commerce Founder",
    text: "Our Facebook ROAS went from 1.8× to 4.2× after we started using Scriva scripts. The Urgent tone template is dialed in for conversion.",
  },
];

const FAQS = [
  { q: "What AI model powers Scriva?",   a: "OpenAI GPT-4.1 — the same model professional agencies use. You get that quality at a fraction of the cost." },
  { q: "How is the Free plan limited?",  a: "5 scripts per month. Resets on the 1st. Enough to test every script type before committing." },
  { q: "Can I cancel anytime?",          a: "Yes. Cancel from Settings. You keep Pro access until the billing period ends. No questions asked." },
  { q: "What languages are supported?",  a: "Pro users: English, Spanish, Korean, Japanese, French. More on the roadmap." },
  { q: "Can I use scripts commercially?",a: "Yes — everything you generate is yours. Ads, YouTube, client work, anything." },
];

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

/* ── FAQ Item ── */
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
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
        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 500, color: "var(--silver-bright)" }}>
          {question}
        </span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.2rem",
            color: open ? "var(--champagne)" : "var(--silver-dim)",
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
        <p style={{ paddingBottom: "1.25rem", fontFamily: "var(--font-body)", fontSize: "0.82rem", lineHeight: 1.8, color: "var(--silver)" }}>
          {answer}
        </p>
      </motion.div>
    </div>
  );
}

/* ── Section header ── */
function SectionHeader({ tag, label }: { tag: string; label: string }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "1.5rem",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      paddingBlock: "1.25rem",
    }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--champagne)" }}>
        {tag}
      </span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--silver)" }}>
        {label}
      </span>
    </div>
  );
}

/* ── Page ── */
export default function HomePage() {
  return (
    <main style={{ background: "var(--obsidian)", minHeight: "100svh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <Navbar />
      <HeroSection />

      {/* ══ LIVE DEMO ══ */}
      <section
        id="try-free"
        aria-labelledby="try-free-heading"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "var(--charcoal)" }}
      >
        <div style={{ maxWidth: "1200px", marginInline: "auto", paddingInline: "2rem" }}>
          <SectionHeader tag="Live Demo" label="3 free scripts per day · No account required" />
          <div style={{ paddingBlock: "3rem 4rem" }}>
            <Reveal>
              <h2 id="try-free-heading" style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "var(--silver-bright)",
                marginBottom: "2.5rem",
                lineHeight: 1.05,
              }}>
                Generate a script<br />
                <span style={{
                  background: "linear-gradient(135deg, #8A6E2A 0%, #C9A84C 45%, #EDD078 55%, #C9A84C 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>in seconds</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <GuestGenerator />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ BENTO: SCRIPT TYPES ══ */}
      <section
        id="features"
        aria-labelledby="features-heading"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "var(--obsidian)" }}
      >
        <div style={{ maxWidth: "1200px", marginInline: "auto", paddingInline: "2rem" }}>
          <SectionHeader tag="Formats" label="8 script types — all included" />
          <div style={{ paddingBlock: "3rem 4rem" }}>
            <Reveal>
              <h2 id="features-heading" style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "var(--silver-bright)",
                marginBottom: "2.5rem",
                lineHeight: 1.05,
              }}>
                Every format<br />you need
              </h2>
            </Reveal>

            {/* Bento grid */}
            <div className="bento-grid-4" style={{
              gap: "1px",
              background: "rgba(255,255,255,0.04)",
            }}>
              {SCRIPT_TYPES.map((type, i) => (
                <Reveal key={type.code} delay={i * 0.04}>
                  <div
                    className="bento-cell"
                    style={{ minHeight: "160px", cursor: "default" }}
                  >
                    <div style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.55rem",
                      fontWeight: 600,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--champagne)",
                      marginBottom: "0.75rem",
                    }}>
                      [{type.code}]
                    </div>
                    <div style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.3rem",
                      fontWeight: 700,
                      letterSpacing: "-0.01em",
                      color: "var(--silver-bright)",
                      marginBottom: "0.6rem",
                      lineHeight: 1.1,
                    }}>
                      {type.label}
                    </div>
                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.72rem",
                      lineHeight: 1.65,
                      color: "var(--silver-dim)",
                    }}>
                      {type.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section
        id="how-it-works"
        aria-labelledby="how-it-works-heading"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "var(--charcoal)" }}
      >
        <div style={{ maxWidth: "1200px", marginInline: "auto", paddingInline: "2rem" }}>
          <SectionHeader tag="Process" label="Three steps" />
          <div style={{ paddingBlock: "3rem 4rem" }}>
            <Reveal>
              <h2 id="how-it-works-heading" style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "var(--silver-bright)",
                marginBottom: "3rem",
                lineHeight: 1.05,
              }}>
                How it works
              </h2>
            </Reveal>

            <div className="bento-grid-3" style={{
              gap: "1px",
              background: "rgba(255,255,255,0.04)",
            }}>
              {STEPS.map((step, i) => (
                <Reveal key={step.num} delay={i * 0.1}>
                  <div className="bento-cell" style={{ padding: "2.5rem" }}>
                    <div style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.58rem",
                      fontWeight: 600,
                      letterSpacing: "0.16em",
                      color: "var(--champagne)",
                      marginBottom: "1.5rem",
                      textTransform: "uppercase",
                    }}>
                      Step {step.num}
                    </div>
                    <h3 style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "2.5rem",
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                      color: "var(--silver-bright)",
                      marginBottom: "1rem",
                      lineHeight: 1,
                    }}>
                      {step.title}
                    </h3>
                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8rem",
                      lineHeight: 1.8,
                      color: "var(--silver-dim)",
                      maxWidth: "280px",
                    }}>
                      {step.detail}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ PRICING ══ */}
      <section
        aria-labelledby="pricing-heading"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "var(--obsidian)" }}
      >
        <div style={{ maxWidth: "1200px", marginInline: "auto", paddingInline: "2rem" }}>
          <SectionHeader tag="Pricing" label="Start free. Upgrade when you need more." />
          <div style={{ paddingBlock: "3rem 4rem" }}>
            <Reveal>
              <h2 id="pricing-heading" style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "var(--silver-bright)",
                marginBottom: "3rem",
                lineHeight: 1.05,
              }}>
                Simple,<br />honest pricing
              </h2>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(255,255,255,0.04)" }} className="grid-cols-1 md:grid-cols-2">
              {/* Free */}
              <Reveal>
                <div className="bento-cell" style={{ padding: "2.5rem" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--silver-dim)", marginBottom: "0.75rem" }}>Free</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "4rem", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--silver-bright)", lineHeight: 1, marginBottom: "0.25rem" }}>$0</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "var(--silver-dim)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>per month</div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "2rem" }}>
                    {["5 scripts per month", "All 8 script types", "4 tones", "Copy & download (.txt)", "Script history (last 10)"].map((f) => (
                      <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--silver)" }}>
                        <span style={{ width: 16, height: 1, background: "var(--champagne-dim)", display: "inline-block", flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/sign-up" className="btn-glass" style={{ width: "100%", justifyContent: "center" }}>Get started free</Link>
                </div>
              </Reveal>

              {/* Pro */}
              <Reveal delay={0.1}>
                <div className="bento-cell" style={{ padding: "2.5rem", background: "rgba(201,168,76,0.04)", position: "relative" }}>
                  <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "var(--champagne)", color: "var(--obsidian)", fontFamily: "var(--font-mono)", fontSize: "0.52rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.3rem 0.75rem", borderRadius: "2px" }}>
                    Most Popular
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--champagne)", marginBottom: "0.75rem" }}>Pro</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "0.25rem" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "4rem", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--silver-bright)", lineHeight: 1 }}>$19</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "var(--silver-dim)", letterSpacing: "0.1em", textTransform: "uppercase" }}>per month</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "var(--champagne)", letterSpacing: "0.06em" }}>$149/yr — save $79</span>
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "2rem" }}>
                    {["200 scripts per month", "All script types + tones", "5 languages (EN ES KO JA FR)", "Unlimited script history", "Priority generation speed"].map((f) => (
                      <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--silver)" }}>
                        <span style={{ width: 16, height: 1, background: "var(--champagne)", display: "inline-block", flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/pricing" className="btn-champagne" style={{ width: "100%", justifyContent: "center" }}>Upgrade to Pro</Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section
        aria-labelledby="testimonials-heading"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "var(--charcoal)" }}
      >
        <div style={{ maxWidth: "1200px", marginInline: "auto", paddingInline: "2rem" }}>
          <SectionHeader tag="Testimonials" label="From real creators" />
          <div style={{ paddingBlock: "3rem 4rem" }}>
            <Reveal>
              <h2 id="testimonials-heading" style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "var(--silver-bright)",
                marginBottom: "3rem",
                lineHeight: 1.05,
              }}>
                Creators<br />love Scriva
              </h2>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(255,255,255,0.04)", alignItems: "start" }} className="grid-cols-1 md:grid-cols-3">
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={t.name} delay={i * 0.1}>
                  <div className="bento-cell" style={{ padding: "2rem" }}>
                    <div role="img" aria-label="5 out of 5 stars" style={{ display: "flex", gap: "2px", marginBottom: "1.25rem" }}>
                      {[...Array(5)].map((_, j) => (
                        <span key={j} style={{ color: "var(--champagne)", fontSize: "0.7rem" }} aria-hidden="true">★</span>
                      ))}
                    </div>
                    <blockquote style={{ margin: 0, fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "0.88rem", lineHeight: 1.75, color: "var(--silver)", marginBottom: "1.5rem" }}>
                      "{t.text}"
                    </blockquote>
                    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1rem" }}>
                      <cite style={{ display: "block", fontStyle: "normal", fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 600, color: "var(--silver-bright)", letterSpacing: "0.02em" }}>
                        {t.name}
                      </cite>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--silver-dim)", letterSpacing: "0.06em" }}>
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

      {/* ══ FAQ ══ */}
      <section
        aria-labelledby="faq-heading"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "var(--obsidian)" }}
      >
        <div style={{ maxWidth: "1200px", marginInline: "auto", paddingInline: "2rem" }}>
          <SectionHeader tag="FAQ" label="Common questions" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", paddingBlock: "3rem 4rem", alignItems: "start" }} className="grid-cols-1 md:grid-cols-2">
            <Reveal>
              <h2 id="faq-heading" style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "var(--silver-bright)",
                lineHeight: 1.05,
              }}>
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

      {/* ══ FINAL CTA ══ */}
      <section
        aria-labelledby="cta-heading"
        style={{
          borderTop: "1px solid rgba(201,168,76,0.2)",
          background: "var(--charcoal)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow */}
        <div aria-hidden="true" style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(201,168,76,0.08) 0%, transparent 60%)",
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", marginInline: "auto", paddingInline: "2rem", paddingBlock: "5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="grid-cols-1 md:grid-cols-2">
          <Reveal>
            <h2 id="cta-heading" style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "var(--silver-bright)",
              lineHeight: 1.0,
            }}>
              Start<br />
              <span style={{
                background: "linear-gradient(135deg, #8A6E2A 0%, #C9A84C 45%, #EDD078 55%, #C9A84C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>Today.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", lineHeight: 1.8, color: "var(--silver)" }}>
                Join 3,400+ creators already generating production-ready scripts in seconds.
                No credit card required. 5 free scripts every month, forever.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <Link href="/sign-up" className="btn-champagne">
                  Generate your first script
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <a href="#try-free" className="btn-glass">Try without an account</a>
              </div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "var(--silver-dim)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                No credit card required · 5 free scripts/month
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
