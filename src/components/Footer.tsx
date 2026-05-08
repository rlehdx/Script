"use client";

import Link from "next/link";

const PRODUCT_LINKS = [
  { href: "/#features",     label: "Formats" },
  { href: "/#how-it-works", label: "Process" },
  { href: "/pricing",       label: "Pricing" },
  { href: "/dashboard",     label: "Dashboard" },
  { href: "/blog",          label: "Blog" },
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
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "var(--charcoal)",
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
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
          className="grid-cols-1 md:grid-cols-[2fr_1fr_1fr]"
        >
          {/* Brand column */}
          <div
            style={{
              padding: "3rem 3rem 3rem 0",
              borderRight: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div style={{ marginBottom: "1.5rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.8rem",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "var(--silver-bright)",
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
                color: "var(--silver)",
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
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--champagne)",
                border: "1px solid rgba(201,168,76,0.2)",
                padding: "0.4rem 0.85rem",
                borderRadius: "2px",
                background: "rgba(201,168,76,0.05)",
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "var(--champagne)",
                  boxShadow: "0 0 6px var(--champagne)",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              Powered by OpenAI GPT-4.1
            </div>
          </div>

          {/* Product column */}
          <div
            style={{
              padding: "3rem 2rem",
              borderRight: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--silver)",
                marginBottom: "1.25rem",
              }}
            >
              Product
            </p>
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
                      color: "var(--silver)",
                      textDecoration: "none",
                      letterSpacing: "0.02em",
                      transition: "color 0.15s ease",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--champagne-light)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--silver)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal column */}
          <div style={{ padding: "3rem 2rem" }}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--silver)",
                marginBottom: "1.25rem",
              }}
            >
              Legal
            </p>
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
                      color: "var(--silver)",
                      textDecoration: "none",
                      letterSpacing: "0.02em",
                      transition: "color 0.15s ease",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--champagne-light)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--silver)")}
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
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "var(--silver)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            © {new Date().getFullYear()} Scriva. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "var(--silver)",
              letterSpacing: "0.08em",
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
