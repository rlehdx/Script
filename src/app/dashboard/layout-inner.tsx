"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";

interface UsageStatus {
  planType: "free" | "pro";
  scriptsUsed: number;
  limit: number;
}

const NAV_ITEMS = [
  {
    href: "/dashboard",
    label: "Generate",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 2L8 14M2 8L8 2L14 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    href: "/pricing",
    label: "Upgrade",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 10L8 4L14 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 4V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    proOnly: false,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 1.5V3M8 13V14.5M1.5 8H3M13 8H14.5M3.4 3.4L4.5 4.5M11.5 11.5L12.6 12.6M3.4 12.6L4.5 11.5M11.5 4.5L12.6 3.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function DashboardLayout({
  children,
  usage,
}: {
  children: React.ReactNode;
  usage: UsageStatus;
}) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-accent-gradient flex items-center justify-center shadow-lg shadow-purple-500/20">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-bold text-sm">Script<span className="gradient-text">Flow</span></span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                active
                  ? "bg-purple-500/15 text-purple-300 border border-purple-500/20"
                  : "text-slate-500 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className={active ? "text-purple-400" : ""}>{item.icon}</span>
              {item.label}
              {item.href === "/pricing" && usage.planType === "free" && (
                <span className="ml-auto text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/20 rounded-full px-2 py-0.5">
                  Upgrade
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Usage + User */}
      <div className="p-3 border-t border-white/5 space-y-3">
        {usage.planType === "free" && (
          <div className="bezel-card-inner p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[11px] text-slate-500">Free scripts used</span>
              <span className="text-[11px] font-bold text-slate-300">{usage.scriptsUsed}/{usage.limit}</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-gradient rounded-full transition-all duration-500"
                style={{ width: `${Math.min((usage.scriptsUsed / usage.limit) * 100, 100)}%` }}
              />
            </div>
            <Link href="/pricing" className="text-[11px] text-purple-400 hover:text-purple-300 mt-2 block">
              Upgrade for unlimited →
            </Link>
          </div>
        )}
        <div className="flex items-center gap-3 px-1">
          <UserButton afterSignOutUrl="/" />
          <div className="text-xs text-slate-500 truncate">Signed in</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-bg-primary overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 flex-shrink-0 flex-col bg-bg-secondary border-r border-white/5">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-40 bg-black/60"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden fixed inset-y-0 left-0 z-50 w-56 bg-bg-secondary border-r border-white/5"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between px-5 py-2.5 border-b border-white/5">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 4.5H16M2 9H16M2 13.5H16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <span className="font-bold text-sm">Script<span className="gradient-text">Flow</span></span>
          <UserButton afterSignOutUrl="/" />
        </div>

        {children}
      </div>
    </div>
  );
}
