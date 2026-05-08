"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  scriptsUsed: number;
}

export default function UpgradeModal({ isOpen, onClose, scriptsUsed }: UpgradeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bezel-card max-w-md w-full p-8 pointer-events-auto relative overflow-hidden">
              {/* Glow */}
              <div className="absolute -top-20 -right-20 w-56 h-56 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">🚀</div>
                <h2 className="text-xl font-bold text-slate-100">
                  You've used all your scripts this month
                </h2>
                <p className="text-sm text-slate-400 mt-2">
                  Upgrade to Creator for 100 scripts/month + more powerful models
                </p>
              </div>

              {/* Plan comparison */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-white/4 rounded-xl p-4 border border-white/8">
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Current (Starter)</p>
                  <p className="text-2xl font-bold text-slate-100">{scriptsUsed}<span className="text-sm font-normal text-slate-400">/mo</span></p>
                  <div className="mt-3 space-y-1.5">
                    <p className="text-[11px] text-slate-500">gpt-4.1-mini</p>
                    <p className="text-[11px] text-slate-500">English only</p>
                    <p className="text-[11px] text-slate-500">30s / 60s</p>
                  </div>
                </div>
                <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30">
                  <p className="text-[10px] text-purple-400 uppercase tracking-widest mb-2">Creator</p>
                  <p className="text-2xl font-bold text-slate-100">100<span className="text-sm font-normal text-slate-400">/mo</span></p>
                  <div className="mt-3 space-y-1.5">
                    <p className="text-[11px] text-purple-300">gpt-4.1</p>
                    <p className="text-[11px] text-purple-300">5 languages</p>
                    <p className="text-[11px] text-purple-300">Up to 10 min</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href="/pricing"
                  className="btn-primary justify-center text-center py-3"
                  onClick={onClose}
                >
                  Upgrade to Creator — $19/mo
                </Link>
                <button
                  onClick={onClose}
                  className="text-sm text-slate-500 hover:text-slate-400 transition-colors py-2"
                >
                  Wait until next month
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
