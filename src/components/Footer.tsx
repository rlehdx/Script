import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-bg-primary">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="Scriva"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Turn any idea into a high-converting script in seconds. Built for creators,
              marketers, and solopreneurs.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-xs text-slate-600 border border-white/5 rounded-full px-3 py-1.5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="#4ade80" strokeWidth="1.5"/>
                <path d="M4 6L5.5 7.5L8 4.5" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Powered by OpenAI GPT-4o
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Product</h4>
            <ul className="space-y-3">
              {[
                { href: "/#features", label: "Features" },
                { href: "/#how-it-works", label: "How it works" },
                { href: "/pricing", label: "Pricing" },
                { href: "/dashboard", label: "Dashboard" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-500 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Legal</h4>
            <ul className="space-y-3">
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/refund", label: "Refund Policy" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-500 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} Scriva. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
