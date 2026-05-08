"use client";

import Link from "next/link";

const PRODUCT_LINKS = [
  { href: "/#features",    label: "Formats" },
  { href: "/#how-it-works",label: "Process" },
  { href: "/pricing",      label: "Pricing" },
  { href: "/dashboard",    label: "Dashboard" },
  { href: "/blog",         label: "Blog" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms",   label: "Terms" },
  { href: "/refund",  label: "Refunds" },
];

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(13,13,13,0.15)",
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
        {/* Main footer grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "0",
            borderBottom: "1px solid rgba(13,13,13,0.1)",
          }}
          className="grid-cols-1 md:grid-cols-[2fr_1fr_1fr]"
        >
          {/* Brand column */}
          <div
            style={{
              padding: "3rem 3rem 3rem 0",
              borderRight: "1px solid rgba(13,13,13,0.1)",
            }}
          >
            <div style={{ marginBottom: "1.5rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2rem",
                  letterSpacing: "0.06em",
                  color: "var(--ink)",
                  textTransform: "uppercase",
                  display: "block",
                  lineHeight: 1,
                }}
              >
                Scriva
              </span>
            </div>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.78rem",
                lineHeight: 1.75,
                color: "var(--ink-muted)",
                maxWidth: "260px",
                marginBottom: "1.5rem",
              }}
            >
              Turn any idea into a high-converting script in seconds.
              Built for creators, marketers, and solopreneurs who move fast.
            </p>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--ink-faint)",
                border: "1px solid rgba(13,13,13,0.15)",
                padding: "0.4rem 0.85rem",
              }}
            >
              <span style={{ color: "var(--red)", fontSize: "0.5rem" }}>●</span>
              Powered by OpenAI GPT-4o
            </div>
          </div>

          {/* Product column */}
          <div
            style={{
              padding: "3rem 2rem",
              borderRight: "1px solid rgba(13,13,13,0.1)",
            }}
          >
            <h4
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--ink-faint)",
                marginBottom: "1.25rem",
              }}
            >
              Product
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
            >
              {PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.78rem",
                      color: "var(--ink-muted)",
                      textDecoration: "none",
                      letterSpacing: "0.02em",
                      transition: "color 0.15s ease",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--red)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--ink-muted)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal column */}
          <div style={{ padding: "3rem 2rem" }}>
            <h4
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--ink-faint)",
                marginBottom: "1.25rem",
              }}
            >
              Legal
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
            >
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.78rem",
                      color: "var(--ink-muted)",
                      textDecoration: "none",
                      letterSpacing: "0.02em",
                      transition: "color 0.15s ease",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--red)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--ink-muted)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBlock: "1.25rem",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.65rem",
              color: "var(--ink-faint)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            © {new Date().getFullYear()} Scriva. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.65rem",
              color: "var(--ink-faint)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Made for creators who move fast.
          </p>
        </div>
      </div>
    </footer>
  );
}
