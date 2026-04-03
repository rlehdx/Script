"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PlanType } from "@/lib/stripe";

export interface HistoryScript {
  id: string;
  title: string;
  script_type: string;
  tone: string;
  language: string;
  tokens_used: number;
  created_at: string;
}

interface ScriptHistoryProps {
  scripts: HistoryScript[];
  loading: boolean;
  planType: PlanType;
  /** Called when user clicks Regenerate — passes back the original params */
  onRegenerate: (params: {
    scriptType: string;
    topic: string;
    tone: string;
    language: string;
  }) => void;
}

export default function ScriptHistory({
  scripts,
  loading,
  planType,
  onRegenerate,
}: ScriptHistoryProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [localScripts, setLocalScripts] = useState<HistoryScript[] | null>(null);

  const displayed = localScripts ?? scripts;

  async function handleDelete(id: string) {
    setDeletingId(id);
    const res = await fetch(`/api/scripts/${id}`, { method: "DELETE" });
    if (res.ok) {
      setLocalScripts((displayed).filter((s) => s.id !== id));
    }
    setDeletingId(null);
  }

  if (loading) {
    return (
      <div className="bezel-card p-8 text-center text-sm text-slate-600 animate-pulse">
        Loading history...
      </div>
    );
  }

  if (displayed.length === 0) {
    return (
      <div className="bezel-card p-10 text-center">
        <p className="text-slate-500 text-sm">No scripts yet.</p>
        <p className="text-slate-600 text-xs mt-1">Generate your first script above.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence initial={false}>
        {displayed.map((script) => (
          <motion.div
            key={script.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="bezel-card p-4 flex flex-col sm:flex-row sm:items-center gap-3"
          >
            {/* Type badge */}
            <span className="shrink-0 text-xs text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-full px-2.5 py-0.5 whitespace-nowrap">
              {script.script_type}
            </span>

            {/* Title */}
            <p className="flex-1 text-sm text-slate-300 truncate" title={script.title}>
              {script.title}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-3 shrink-0 text-xs text-slate-500">
              <span>{script.tone}</span>
              <span>{script.language}</span>
              {script.tokens_used > 0 && (
                <span className="hidden md:inline">{script.tokens_used} tokens</span>
              )}
              <span className="hidden sm:inline">
                {new Date(script.created_at).toLocaleDateString()}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() =>
                  onRegenerate({
                    scriptType: script.script_type,
                    topic: script.title,
                    tone: script.tone,
                    language: script.language,
                  })
                }
                className="text-xs px-3 py-1.5 rounded-lg font-medium border border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 transition-colors"
              >
                Regenerate
              </button>

              <button
                onClick={() => handleDelete(script.id)}
                disabled={deletingId === script.id}
                className="text-xs px-3 py-1.5 rounded-lg font-medium border border-white/5 bg-white/3 text-slate-500 hover:text-red-400 hover:border-red-500/30 transition-colors disabled:opacity-40"
              >
                {deletingId === script.id ? "..." : "Delete"}
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {planType === "starter" && displayed.length >= 5 && (
        <p className="text-xs text-slate-600 text-center pt-1">
          Showing last 5 scripts.{" "}
          <a href="/pricing" className="text-purple-400 hover:text-purple-300">
            Upgrade for full history →
          </a>
        </p>
      )}
    </div>
  );
}
