"use client";

import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function NavbarAuthMobile({ onClose }: { onClose: () => void }) {
  return (
    <>
      <SignedOut>
        <Link href="/sign-in" onClick={onClose} className="py-2 text-sm text-slate-400">
          Sign in
        </Link>
        <Link href="/sign-up" onClick={onClose} className="btn-primary text-sm text-center justify-center">
          Get started free
        </Link>
      </SignedOut>
      <SignedIn>
        <Link href="/dashboard" onClick={onClose} className="py-2 text-sm text-slate-400">
          Dashboard
        </Link>
      </SignedIn>
    </>
  );
}
