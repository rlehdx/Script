"use client";

import Link from "next/link";

const TOOLS = [
  {
    name: "TubeBuddy",
    desc: "YouTube SEO & growth",
    url: "https://www.tubebuddy.com/pricing?a=scriva",
    badge: "Popular",
    badgeColor: "text-green-300 bg-green-500/10 border-green-500/20",
    icon: "📈",
  },
  {
    name: "VidIQ",
    desc: "Video analytics & ideas",
    url: "https://vidiq.com/?ref=scriva",
    badge: null,
    icon: "🎯",
  },
  {
    name: "Descript",
    desc: "Edit video with text",
    url: "https://www.descript.com/?lmref=scriva",
    badge: "Best value",
    badgeColor: "text-purple-300 bg-purple-500/10 border-purple-500/20",
    icon: "✂️",
  },
  {
    name: "Epidemic Sound",
    desc: "Royalty-free music",
    url: "https://www.epidemicsound.com/referral/scriva/",
    badge: null,
    icon: "🎵",
  },
];

export default function AffiliateWidget() {
  return (
    <div className="bezel-card-inner p-3 mt-3">
      <p className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wider">
        Recommended Tools
      </p>
      <div className="space-y-1.5">
        {TOOLS.map((tool) => (
          <Link
            key={tool.name}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors group"
          >
            <span className="text-base leading-none">{tool.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[12px] font-medium text-slate-300 group-hover:text-white transition-colors truncate">
                  {tool.name}
                </span>
                {tool.badge && (
                  <span className={`text-[9px] border rounded-full px-1.5 py-0.5 font-medium ${tool.badgeColor}`}>
                    {tool.badge}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-600 truncate">{tool.desc}</p>
            </div>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-slate-600 group-hover:text-slate-400 flex-shrink-0 transition-colors">
              <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        ))}
      </div>
      <p className="text-[9px] text-slate-700 mt-2 px-1">
        *Affiliate links — we earn a small commission at no cost to you
      </p>
    </div>
  );
}
