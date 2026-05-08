import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0A0A0F",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        position: "relative",
      }}
    >
      {/* Gold radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(212,175,55,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "28rem" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              textDecoration: "none",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "1px",
                background: "linear-gradient(135deg, #D4AF37, #8B7322)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 12px rgba(212,175,55,0.3)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7L5.5 10.5L12 3.5" stroke="#0A0A0F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "1.15rem",
                letterSpacing: "0.02em",
                color: "#E8E8F0",
              }}
            >
              Scriva
            </span>
          </Link>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.75rem",
              fontWeight: 400,
              color: "#E8E8F0",
              letterSpacing: "-0.02em",
              marginBottom: "0.5rem",
            }}
          >
            Create your account
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "rgba(192,192,200,0.45)" }}>
            5 free scripts per month — no credit card required
          </p>
        </div>

        <SignUp
          appearance={{
            elements: {
              socialButtonsBlockButton: "w-full",
              socialButtonsProviderIcon__google: "w-5 h-5",
            },
          }}
        />
      </div>
    </main>
  );
}
