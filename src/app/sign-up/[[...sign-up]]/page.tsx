import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-bg-primary flex flex-col items-center justify-center px-6">
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-accent-gradient flex items-center justify-center shadow-lg shadow-purple-500/30">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-bold">Script<span className="gradient-text">Flow</span></span>
          </Link>
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-slate-500 text-sm mt-1">5 free scripts per month — no credit card required</p>
        </div>
        <SignUp />
      </div>
    </main>
  );
}
