import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Scriva's refund and cancellation policy for paid subscriptions.",
  alternates: { canonical: "/refund" },
};

const LAST_UPDATED = "April 4, 2025";

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

export default function RefundPage() {
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
              Refund Policy
            </h1>
            <p style={{ color: "rgba(192,192,200,0.4)", fontSize: "0.85rem", fontFamily: "var(--font-body)" }}>
              Last updated: {LAST_UPDATED}
            </p>
          </div>

          {/* Promise card */}
          <div style={{ ...cardStyle, border: "1px solid rgba(212,175,55,0.2)" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1.25rem" }}>
              <span style={{ fontSize: "1.75rem", flexShrink: 0 }}>✦</span>
              <div>
                <h2 style={{ ...h2Style, marginBottom: "0.5rem" }}>Our Promise</h2>
                <p style={bodyStyle}>
                  We want you to be completely satisfied with Scriva. If the Service doesn&apos;t work for you, we&apos;ll make it right. Our refund policy is designed to be fair and straightforward.
                </p>
              </div>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>1. Free Plan</h2>
            <p style={bodyStyle}>The free plan is available at no cost and requires no payment information. No refunds are applicable to the free plan as no charges are made.</p>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>2. 7-Day Money-Back Guarantee</h2>
            <p style={{ ...bodyStyle, marginBottom: "0.85rem" }}>
              New paid subscribers are eligible for a full refund within <strong style={{ color: "#E8E8F0" }}>7 days</strong> of their first payment, provided:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1rem" }}>
              {[
                "This is your first paid subscription with Scriva",
                "Your request is submitted within 7 calendar days of the initial charge",
                "You have not previously received a refund from Scriva",
              ].map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", ...bodyStyle }}>
                  <span style={{ color: "#D4AF37", flexShrink: 0 }}>◆</span>
                  {item}
                </li>
              ))}
            </ul>
            <p style={{ ...bodyStyle, fontSize: "0.82rem" }}>
              To request a refund, email{" "}
              <a href="mailto:support@scriva.app" style={linkStyle}>support@scriva.app</a>{" "}
              with your account email and reason for the refund. We will process it within 3–5 business days.
            </p>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>3. Renewals</h2>
            <p style={bodyStyle}>
              Subscription renewals (monthly or annual) are generally non-refundable. However, if you contact us within <strong style={{ color: "#E8E8F0" }}>48 hours</strong> of a renewal charge and have not used the Service during that billing period, we will consider a refund at our discretion.
            </p>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>4. Annual Plans</h2>
            <p style={bodyStyle}>Annual plans are discounted and intended for the full year. Partial refunds for unused months are not offered after the 7-day money-back guarantee window has passed.</p>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>5. Cancellation</h2>
            <p style={{ ...bodyStyle, marginBottom: "0.75rem" }}>
              You can cancel your subscription at any time from your{" "}
              <Link href="/settings" style={linkStyle}>Settings page</Link>.
              {" "}Cancellation stops future billing and takes effect at the end of your current billing period.
            </p>
            <p style={bodyStyle}>After cancellation, you retain access to your paid features until the end of the paid period. Your script history remains accessible on the free plan (last 5 scripts).</p>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>6. Non-Refundable Situations</h2>
            <p style={{ ...bodyStyle, marginBottom: "0.75rem" }}>Refunds will not be issued in the following cases:</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                "Account termination due to Terms of Service violations",
                "Requests made after the eligible refund window",
                "Dissatisfaction with AI output quality after extensive use",
                "Failure to cancel before a renewal you were notified about",
              ].map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", ...bodyStyle }}>
                  <span style={{ color: "#C41E3A", flexShrink: 0 }}>✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>7. Processing Refunds</h2>
            <p style={bodyStyle}>Approved refunds are processed back to your original payment method via Stripe. Processing time is typically 3–5 business days, though your bank may take additional time to reflect the credit.</p>
          </div>

          <div style={{ ...cardStyle, border: "1px solid rgba(212,175,55,0.2)" }}>
            <h2 style={h2Style}>8. Contact Us</h2>
            <p style={{ ...bodyStyle, marginBottom: "1.5rem" }}>Have a question about a charge or need to request a refund? We&apos;re happy to help.</p>
            <a href="mailto:support@scriva.app" className="btn-gold" style={{ display: "inline-flex" }}>
              Contact Support
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ marginLeft: "0.5rem" }}>
                <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
