import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read the terms and conditions governing your use of Scriva.",
  alternates: { canonical: "/terms" },
};

const LAST_UPDATED = "April 10, 2026";

const cardStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, rgba(20,20,32,0.95) 0%, rgba(12,12,20,0.98) 100%)",
  border: "1px solid rgba(212,175,55,0.1)",
  borderRadius: "2px",
  padding: "2rem",
  marginBottom: "1rem",
};

const h2Style: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "1.35rem",
  fontWeight: 400,
  color: "#E8E8F0",
  letterSpacing: "-0.02em",
  marginBottom: "1rem",
};

const bodyStyle: React.CSSProperties = {
  color: "rgba(192,192,200,0.6)",
  fontSize: "0.9rem",
  lineHeight: 1.8,
  fontFamily: "var(--font-body)",
};

const linkStyle: React.CSSProperties = {
  color: "#D4AF37",
  textDecoration: "none",
};

export default function TermsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0A0A0F", color: "#E8E8F0" }}>
      <Navbar />

      <section style={{ paddingTop: "7rem", paddingBottom: "5rem", paddingInline: "1.5rem" }}>
        <div style={{ maxWidth: "48rem", marginInline: "auto" }}>

          {/* Header */}
          <div style={{ marginBottom: "3rem" }}>
            <span style={{
              display: "inline-block",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#D4AF37",
              borderBottom: "1px solid rgba(212,175,55,0.3)",
              paddingBottom: "4px",
              marginBottom: "1rem",
              fontFamily: "var(--font-body)",
            }}>
              Legal
            </span>
            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 400,
              color: "#E8E8F0",
              letterSpacing: "-0.02em",
              marginBottom: "0.75rem",
            }}>
              Terms of Service
            </h1>
            <p style={{ color: "rgba(192,192,200,0.4)", fontSize: "0.85rem", fontFamily: "var(--font-body)" }}>
              Last updated: {LAST_UPDATED}
            </p>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>1. Acceptance of Terms</h2>
            <p style={bodyStyle}>By accessing or using Scriva ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the Service. These Terms apply to all users, including free and paid subscribers.</p>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>2. Description of Service</h2>
            <p style={bodyStyle}>Scriva is an AI-powered script generation platform that helps creators, marketers, and agencies write scripts for YouTube, TikTok, VSL, podcasts, ads, and more. The Service uses OpenAI&apos;s language models to generate content based on your inputs.</p>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>3. User Accounts</h2>
            <p style={{ ...bodyStyle, marginBottom: "0.75rem" }}>You must create an account to use most features of the Service. You are responsible for:</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "0.75rem" }}>
              {[
                "Maintaining the confidentiality of your account credentials",
                "All activity that occurs under your account",
                "Providing accurate and complete registration information",
                "Notifying us immediately of any unauthorized account access",
              ].map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", ...bodyStyle }}>
                  <span style={{ color: "#D4AF37", flexShrink: 0 }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
            <p style={bodyStyle}>We reserve the right to suspend or terminate accounts that violate these Terms.</p>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>4. Acceptable Use</h2>
            <p style={{ ...bodyStyle, marginBottom: "0.75rem" }}>You agree not to use the Service to:</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                "Generate content that is illegal, harmful, threatening, abusive, or harassing",
                "Create spam, phishing content, or deceptive materials",
                "Produce content that infringes third-party intellectual property rights",
                "Attempt to reverse-engineer, scrape, or abuse the Service's API",
                "Share or resell account access to others",
                "Circumvent usage limits or subscription restrictions",
                "Generate content involving minors in harmful contexts",
              ].map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", ...bodyStyle }}>
                  <span style={{ color: "#C41E3A", flexShrink: 0 }}>✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>5. Intellectual Property</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { title: "5.1 Your Content", body: "You retain ownership of the scripts and content you generate using the Service. By using Scriva, you grant us a limited license to store and display your generated scripts solely for the purpose of providing the Service." },
                { title: "5.2 Our Platform", body: "The Scriva platform, including its interface, branding, prompts, and underlying technology, is owned by Scriva and protected by intellectual property laws." },
                { title: "5.3 AI-Generated Content", body: "AI-generated outputs may not always be eligible for copyright protection under applicable law. You are responsible for reviewing generated scripts before use." },
              ].map((item) => (
                <div key={item.title}>
                  <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.9rem", color: "#E8E8F0", marginBottom: "0.4rem" }}>{item.title}</h3>
                  <p style={bodyStyle}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>6. Subscription & Billing</h2>
            <p style={{ ...bodyStyle, marginBottom: "0.75rem" }}>Paid plans are billed on a monthly or annual basis through Stripe. By subscribing, you authorize us to charge your payment method on a recurring basis.</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                "Subscriptions auto-renew unless cancelled before the renewal date",
                "You can cancel anytime from your Settings page — cancellation takes effect at the end of the billing period",
                "We reserve the right to change pricing with 30 days' notice",
                "Failed payments may result in service suspension",
              ].map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", ...bodyStyle }}>
                  <span style={{ color: "#D4AF37", flexShrink: 0 }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>7. Disclaimer of Warranties</h2>
            <p style={bodyStyle}>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. We do not warrant that the Service will be uninterrupted, error-free, or that AI-generated content will be accurate, complete, or suitable for your purposes.</p>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>8. Limitation of Liability</h2>
            <p style={bodyStyle}>TO THE FULLEST EXTENT PERMITTED BY LAW, SCRIVA SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES arising from your use of the Service. Our total liability to you for any claims shall not exceed the amount you paid us in the 12 months preceding the claim.</p>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>9. Termination</h2>
            <p style={bodyStyle}>We may suspend or terminate your access to the Service at any time, with or without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.</p>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>10. Governing Law</h2>
            <p style={bodyStyle}>These Terms are governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions.</p>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>11. Changes to Terms</h2>
            <p style={bodyStyle}>We reserve the right to modify these Terms at any time. We will provide notice of material changes by updating the "Last updated" date and, where appropriate, notifying you by email.</p>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>12. Contact</h2>
            <p style={bodyStyle}>
              For questions about these Terms, contact us at:{" "}
              <a href="mailto:legal@scriva.app" style={linkStyle}>legal@scriva.app</a>
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
