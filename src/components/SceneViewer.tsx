"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Scene {
  id: number;
  label: string;
  narration: string;
  visual: string;
  duration_hint: string;
}

interface SceneViewerProps {
  title: string;
  script: string;
  scenes: Scene[];
}

const LABEL_COLORS: Record<string, string> = {
  HOOK:       "bg-red-500/20 text-red-300 border-red-500/30",
  INTRO:      "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "RE-HOOK":  "bg-orange-500/20 text-orange-300 border-orange-500/30",
  CTA:        "bg-green-500/20 text-green-300 border-green-500/30",
  OUTRO:      "bg-green-500/20 text-green-300 border-green-500/30",
  DEFAULT:    "bg-purple-500/20 text-purple-300 border-purple-500/30",
};

function getLabelColor(label: string) {
  const key = Object.keys(LABEL_COLORS).find((k) => label.toUpperCase().includes(k));
  return LABEL_COLORS[key ?? "DEFAULT"];
}

type ViewMode = "script" | "scenes";

export default function SceneViewer({ title, script, scenes }: SceneViewerProps) {
  const [view, setView] = useState<ViewMode>(scenes.length > 0 ? "scenes" : "script");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {/* Title */}
      {title && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 uppercase tracking-widest">Title</span>
          <p className="text-sm font-semibold text-white">{title}</p>
        </div>
      )}

      {/* View toggle */}
      {scenes.length > 0 && (
        <div className="flex gap-1 p-1 bg-white/5 rounded-lg w-fit">
          <button
            onClick={() => setView("scenes")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              view === "scenes"
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                : "text-slate-500 hover:text-white"
            }`}
          >
            Scenes ({scenes.length})
          </button>
          <button
            onClick={() => setView("script")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              view === "script"
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                : "text-slate-500 hover:text-white"
            }`}
          >
            Full Script
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {view === "scenes" && scenes.length > 0 ? (
          <motion.div
            key="scenes"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {scenes.map((scene) => (
              <motion.div
                key={scene.id}
                layout
                className="bezel-card-inner rounded-xl overflow-hidden"
              >
                {/* Scene header */}
                <button
                  onClick={() => setExpandedId(expandedId === scene.id ? null : scene.id)}
                  className="w-full flex items-center gap-3 p-4 text-left hover:bg-white/3 transition-colors"
                >
                  <span className="text-xs font-bold text-slate-600 w-5">{scene.id}</span>
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getLabelColor(scene.label)}`}>
                    {scene.label}
                  </span>
                  <p className="flex-1 text-sm text-slate-300 truncate">{scene.narration}</p>
                  <span className="text-xs text-slate-600 shrink-0">{scene.duration_hint}</span>
                  <svg
                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                    className={`shrink-0 text-slate-600 transition-transform duration-200 ${expandedId === scene.id ? "rotate-180" : ""}`}
                  >
                    <path d="M2 5L7 10L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {/* Expanded scene detail */}
                <AnimatePresence>
                  {expandedId === scene.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-3 border-t border-white/5 pt-3">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-slate-600 block mb-1">Narration</span>
                          <p className="text-sm text-slate-300 leading-relaxed">{scene.narration}</p>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-slate-600 block mb-1">Visual / B-Roll</span>
                          <p className="text-sm text-slate-400 leading-relaxed">{scene.visual}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="script"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bezel-card-inner p-4 max-h-96 overflow-y-auto"
          >
            <pre className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-mono">
              {script}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
