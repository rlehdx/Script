import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Scriva collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy" },
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

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p style={{ color: "rgba(192,192,200,0.4)", fontSize: "0.85rem", fontFamily: "var(--font-body)" }}>
              Last updated: {LAST_UPDATED}
            </p>
          </div>

          {/* Sections */}
          <div style={cardStyle}>
            <h2 style={h2Style}>1. Introduction</h2>
            <p style={bodyStyle}>
              Scriva ("we", "our", or "us") operates the website scriva.app and the Scriva AI script generation service (the "Service"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service. By using Scriva, you agree to the collection and use of information in accordance with this policy.
            </p>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>2. Information We Collect</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { title: "2.1 Account Information", body: "When you create an account via Clerk, we collect your email address, name, and profile information you provide. We do not store your password — authentication is handled entirely by Clerk." },
                { title: "2.2 Usage Data", body: "We collect information about how you use the Service, including scripts you generate (topic, type, tone, language, output), the number of generations, timestamps, and feature interactions." },
                { title: "2.3 Payment Information", body: "All payment processing is handled by Stripe. We do not store your credit card numbers or banking details. We receive and store subscription status, plan type, and Stripe customer/subscription IDs." },
                { title: "2.4 Log Data", body: "Our servers automatically record standard log data including your IP address, browser type, pages visited, and access times." },
              ].map((item) => (
                <div key={item.title}>
                  <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.9rem", color: "#E8E8F0", marginBottom: "0.4rem" }}>{item.title}</h3>
                  <p style={bodyStyle}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>3. How We Use Your Information</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                "Provide, operate, and maintain the Service",
                "Process transactions and manage your subscription",
                "Generate AI scripts based on your inputs using OpenAI's API",
                "Maintain your script history and account preferences",
                "Send transactional emails (receipts, subscription updates)",
                "Monitor and analyze usage patterns to improve the Service",
                "Detect and prevent fraud or abuse",
                "Comply with legal obligations",
              ].map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", ...bodyStyle }}>
                  <span style={{ color: "#D4AF37", flexShrink: 0, marginTop: "2px" }}>◆</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>4. Third-Party Services</h2>
            <p style={{ ...bodyStyle, marginBottom: "1rem" }}>We share data with the following third-party providers only as necessary to operate the Service:</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { name: "Clerk", purpose: "User authentication and account management", url: "https://clerk.com/privacy" },
                { name: "Stripe", purpose: "Payment processing and subscription management", url: "https://stripe.com/privacy" },
                { name: "OpenAI", purpose: "AI script generation (your prompts are sent to OpenAI's API)", url: "https://openai.com/privacy" },
                { name: "Supabase", purpose: "Database storage for your account data and scripts", url: "https://supabase.com/privacy" },
              ].map((provider) => (
                <div key={provider.name} style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "1px",
                  padding: "0.85rem 1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "1rem",
                }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "#E8E8F0", marginBottom: "0.25rem", fontFamily: "var(--font-body)" }}>{provider.name}</p>
                    <p style={{ fontSize: "0.78rem", color: "rgba(192,192,200,0.45)", fontFamily: "var(--font-body)" }}>{provider.purpose}</p>
                  </div>
                  <a href={provider.url} target="_blank" rel="noopener noreferrer" style={{ ...linkStyle, fontSize: "0.75rem", flexShrink: 0 }}>
                    Privacy ↗
                  </a>
                </div>
              ))}
            </div>
            <p style={{ ...bodyStyle, marginTop: "1rem", fontSize: "0.82rem" }}>We do not sell your personal data to third parties.</p>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>5. Data Retention</h2>
            <p style={bodyStyle}>We retain your account data and script history for as long as your account is active. If you delete your account, we will delete your personal data and scripts within 30 days, except where we are required to retain it for legal or compliance purposes.</p>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>6. Your Rights</h2>
            <p style={{ ...bodyStyle, marginBottom: "0.75rem" }}>Depending on your location, you may have the following rights regarding your personal data:</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1rem" }}>
              {[
                "Access — request a copy of the data we hold about you",
                "Correction — request correction of inaccurate data",
                "Deletion — request deletion of your account and associated data",
                "Portability — request your data in a machine-readable format",
                "Objection — object to certain processing activities",
              ].map((right) => (
                <li key={right} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", ...bodyStyle }}>
                  <span style={{ color: "#D4AF37", flexShrink: 0 }}>→</span>
                  {right}
                </li>
              ))}
            </ul>
            <p style={{ ...bodyStyle, fontSize: "0.82rem" }}>
              To exercise any of these rights, email us at{" "}
              <a href="mailto:privacy@scriva.app" style={linkStyle}>privacy@scriva.app</a>.
            </p>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>7. Security</h2>
            <p style={bodyStyle}>We implement industry-standard security measures including HTTPS encryption, secure authentication via Clerk, and access controls on our database. However, no method of transmission over the internet is 100% secure.</p>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>8. Children&apos;s Privacy</h2>
            <p style={bodyStyle}>The Service is not directed to individuals under the age of 13. We do not knowingly collect personal information from children.</p>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>9. Changes to This Policy</h2>
            <p style={bodyStyle}>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page and updating the "Last updated" date.</p>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>10. Contact Us</h2>
            <p style={bodyStyle}>
              If you have questions about this Privacy Policy, please contact us at:{" "}
              <a href="mailto:privacy@scriva.app" style={linkStyle}>privacy@scriva.app</a>
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
