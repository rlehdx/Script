"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

const ICONS: Record<ToastType, string> = {
  success: "✓",
  error: "✕",
  info: "ℹ",
};

const COLORS: Record<ToastType, string> = {
  success: "bg-green-500/10 border-green-500/20 text-green-300",
  error: "bg-red-500/10 border-red-500/20 text-red-300",
  info: "bg-purple-500/10 border-purple-500/20 text-purple-300",
};

function ToastItem({ toast, onRemove }: { toast: ToastMessage; onRemove: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium shadow-lg ${COLORS[toast.type]}`}
    >
      <span className="text-base">{ICONS[toast.type]}</span>
      <span>{toast.message}</span>
      <button
        onClick={() => onRemove(toast.id)}
        className="ml-2 opacity-60 hover:opacity-100 transition-opacity text-xs"
      >
        ✕
      </button>
    </motion.div>
  );
}

export default function Toast({ toasts, onRemove }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
        ))}
      </AnimatePresence>
    </div>
  );
}

export function createToastId() {
  return Math.random().toString(36).slice(2);
}
