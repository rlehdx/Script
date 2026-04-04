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

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-3 py-1 mb-6">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
                <span className="text-xs text-purple-300 font-medium">Limit reached</span>
              </div>

              <h2 className="text-2xl font-bold mb-3">
                You've used all {scriptsUsed} free scripts
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Upgrade to Scriva Pro and get unlimited script generation, all tones,
                5 languages, and priority generation — for less than a coffee a day.
              </p>

              {/* Pro features */}
              <div className="bezel-card-inner p-4 mb-6 space-y-2.5">
                {[
                  "Unlimited scripts every month",
                  "All 8 script types + all tones",
                  "5 languages including Korean & Japanese",
                  "Unlimited script history",
                  "Priority generation speed",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent-gradient flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-sm text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href="/pricing"
                  className="btn-primary justify-center text-center"
                  onClick={onClose}
                >
                  Upgrade to Pro — $19/mo
                </Link>
                <button
                  onClick={onClose}
                  className="text-sm text-slate-500 hover:text-slate-400 transition-colors py-2"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
