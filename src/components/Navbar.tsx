"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const NavbarAuth = dynamic(() => import("@/components/NavbarAuth"), { ssr: false });
const NavbarAuthMobile = dynamic(() => import("@/components/NavbarAuthMobile"), { ssr: false });

const NAV_LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "Process" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      role="banner"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "var(--paper)",
        borderBottom: scrolled ? "1px solid var(--ink)" : "1px solid transparent",
        transition: "border-color 0.3s ease",
      }}
    >
      {/* Top ticker strip */}
      <div
        style={{
          background: "var(--ink)",
          overflow: "hidden",
          height: "28px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "0",
            animation: "ticker 28s linear infinite",
            whiteSpace: "nowrap",
            willChange: "transform",
          }}
        >
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.6rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(244,241,235,0.55)",
                paddingInline: "3rem",
              }}
            >
              GPT-4o Powered&nbsp;&nbsp;·&nbsp;&nbsp;
              YouTube Scripts&nbsp;&nbsp;·&nbsp;&nbsp;
              TikTok Hooks&nbsp;&nbsp;·&nbsp;&nbsp;
              VSL Scripts&nbsp;&nbsp;·&nbsp;&nbsp;
              Cold Email&nbsp;&nbsp;·&nbsp;&nbsp;
              Podcast Intros&nbsp;&nbsp;·&nbsp;&nbsp;
              Facebook Ads&nbsp;&nbsp;·&nbsp;&nbsp;
              3,400+ Creators&nbsp;&nbsp;·&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Main nav row */}
      <div
        style={{
          maxWidth: "1200px",
          marginInline: "auto",
          paddingInline: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "56px",
          borderBottom: "1px solid rgba(13,13,13,0.12)",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Scriva home"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "baseline",
            gap: "0.3rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.6rem",
              letterSpacing: "0.06em",
              color: "var(--ink)",
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            Scriva
          </span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.55rem",
              color: "var(--red)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 500,
              paddingBottom: "2px",
            }}
          >
            ™
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex"
          style={{ alignItems: "center", gap: "0" }}
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "0 1.25rem",
                height: "56px",
                display: "flex",
                alignItems: "center",
                fontFamily: "var(--font-body)",
                fontSize: "0.65rem",
                fontWeight: 400,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--ink-faint)",
                textDecoration: "none",
                borderRight: "1px solid rgba(13,13,13,0.08)",
                transition: "color 0.15s ease, background 0.15s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "var(--ink)";
                el.style.background = "var(--paper-dark)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "var(--ink-faint)";
                el.style.background = "transparent";
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex" style={{ alignItems: "center", gap: "0" }}>
          <NavbarAuth />
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          style={{
            padding: "0.5rem",
            background: "transparent",
            border: "1px solid rgba(13,13,13,0.2)",
            cursor: "pointer",
            color: "var(--ink)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            {mobileOpen ? (
              <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
            ) : (
              <>
                <path d="M2 4H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                <path d="M2 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                <path d="M2 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: mobileOpen ? "24rem" : "0",
          transition: "max-height 0.3s ease",
          background: "var(--paper)",
          borderBottom: mobileOpen ? "1px solid var(--ink)" : "none",
        }}
        aria-hidden={!mobileOpen}
      >
        <nav
          style={{ display: "flex", flexDirection: "column" }}
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                padding: "1rem 2rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--ink)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(13,13,13,0.1)",
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ padding: "1rem 2rem" }}>
            <NavbarAuthMobile onClose={() => setMobileOpen(false)} />
          </div>
        </nav>
      </div>
    </header>
  );
}
