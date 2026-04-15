"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function NavbarAuth() {
  return (
    <>
      <SignedOut>
        <Link href="/sign-in" className="text-sm text-slate-400 hover:text-white transition-colors">
          Sign in
        </Link>
        <Link href="/sign-up" className="btn-primary text-sm py-2 px-4">
          Get started free
        </Link>
      </SignedOut>
      <SignedIn>
        <Link
          href="/dashboard"
          className="text-sm text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5 flex items-center"
        >
          Dashboard
        </Link>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </>
  );
}
