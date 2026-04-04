"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const NEXT_STEP_TOOLS = [
  {
    name: "Descript",
    action: "Edit your video",
    desc: "Turn your script into a polished video — edit by text",
    url: "https://www.descript.com/?lmref=scriva",
    icon: "✂️",
    cta: "Try Descript Free →",
    color: "border-blue-500/20 hover:border-blue-500/40",
    ctaColor: "text-blue-400 hover:text-blue-300",
  },
  {
    name: "TubeBuddy",
    action: "Optimize for YouTube",
    desc: "Find the best tags, titles & thumbnails to rank faster",
    url: "https://www.tubebuddy.com/pricing?a=scriva",
    icon: "📈",
    cta: "Try TubeBuddy Free →",
    color: "border-green-500/20 hover:border-green-500/40",
    ctaColor: "text-green-400 hover:text-green-300",
  },
  {
    name: "Epidemic Sound",
    action: "Add background music",
    desc: "Royalty-free music that matches your video tone",
    url: "https://www.epidemicsound.com/referral/scriva/",
    icon: "🎵",
    cta: "Browse Music →",
    color: "border-orange-500/20 hover:border-orange-500/40",
    ctaColor: "text-orange-400 hover:text-orange-300",
  },
];

export default function AffiliateCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="mt-4"
    >
      <div className="bezel-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base">🚀</span>
          <h3 className="text-sm font-semibold text-slate-300">Next steps with your script</h3>
          <span className="ml-auto text-[10px] text-slate-600">sponsored</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {NEXT_STEP_TOOLS.map((tool) => (
            <Link
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className={`group p-3 rounded-lg border bg-white/2 transition-all duration-200 ${tool.color}`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-lg leading-none">{tool.icon}</span>
                <span className="text-xs font-semibold text-slate-300">{tool.action}</span>
              </div>
              <p className="text-[11px] text-slate-500 mb-2 leading-relaxed">{tool.desc}</p>
              <span className={`text-[11px] font-medium transition-colors ${tool.ctaColor}`}>
                {tool.cta}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
