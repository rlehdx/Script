"use client";

import { useState, useEffect } from "react";

const COOKIE_KEY = "scriva_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(COOKIE_KEY)) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        left: "1.5rem",
        right: "1.5rem",
        maxWidth: "480px",
        zIndex: 9999,
        background: "rgba(18,18,28,0.97)",
        border: "1px solid rgba(201,168,76,0.2)",
        borderRadius: "3px",
        padding: "1.25rem 1.5rem",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.78rem",
          lineHeight: 1.75,
          color: "var(--silver)",
          marginBottom: "1rem",
          margin: 0,
        }}
      >
        We use cookies for analytics and to improve your experience. By continuing, you agree to our{" "}
        <a
          href="/privacy"
          style={{ color: "var(--champagne)", textDecoration: "underline" }}
        >
          Privacy Policy
        </a>
        .
      </p>
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          marginTop: "1rem",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={accept}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            background: "var(--champagne)",
            color: "var(--obsidian)",
            border: "none",
            borderRadius: "2px",
            padding: "0.5rem 1.1rem",
            cursor: "pointer",
          }}
        >
          Accept
        </button>
        <button
          onClick={decline}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            background: "transparent",
            color: "var(--silver-dim)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "2px",
            padding: "0.5rem 1.1rem",
            cursor: "pointer",
          }}
        >
          Decline
        </button>
      </div>
    </div>
  );
}
