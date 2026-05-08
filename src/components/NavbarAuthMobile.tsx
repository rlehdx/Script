"use client";

import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function NavbarAuthMobile({ onClose }: { onClose: () => void }) {
  return (
    <>
      <SignedOut>
        <Link
          href="/sign-in"
          onClick={onClose}
          style={{
            display: "block",
            padding: "0.6rem 0",
            fontSize: "0.82rem",
            fontWeight: 400,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "rgba(192,192,200,0.55)",
            textDecoration: "none",
            fontFamily: "var(--font-body)",
          }}
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          onClick={onClose}
          className="btn-gold"
          style={{ marginTop: "0.5rem", width: "100%", justifyContent: "center", fontSize: "0.75rem" }}
        >
          Get Started Free
        </Link>
      </SignedOut>
      <SignedIn>
        <Link
          href="/dashboard"
          onClick={onClose}
          style={{
            display: "block",
            padding: "0.6rem 0",
            fontSize: "0.82rem",
            fontWeight: 400,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "rgba(192,192,200,0.55)",
            textDecoration: "none",
            fontFamily: "var(--font-body)",
          }}
        >
          Dashboard
        </Link>
      </SignedIn>
    </>
  );
}
