"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function NavbarAuth() {
  return (
    <>
      <SignedOut>
        <Link
          href="/sign-in"
          style={{
            fontSize: "0.8rem",
            fontWeight: 400,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "rgba(192,192,200,0.55)",
            textDecoration: "none",
            padding: "0.45rem 0.75rem",
            transition: "color 0.2s ease",
            fontFamily: "var(--font-body)",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#D4AF37")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(192,192,200,0.55)")}
        >
          Sign In
        </Link>
        <Link href="/sign-up" className="btn-gold" style={{ padding: "0.5rem 1.25rem", fontSize: "0.75rem" }}>
          Get Started Free
        </Link>
      </SignedOut>
      <SignedIn>
        <Link
          href="/dashboard"
          style={{
            fontSize: "0.8rem",
            fontWeight: 400,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "rgba(192,192,200,0.55)",
            textDecoration: "none",
            padding: "0.45rem 0.75rem",
            transition: "color 0.2s ease",
            fontFamily: "var(--font-body)",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#D4AF37")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(192,192,200,0.55)")}
        >
          Dashboard
        </Link>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </>
  );
}
