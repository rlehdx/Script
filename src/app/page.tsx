import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqSection from "@/components/FaqSection";

const SCRIPT_TYPES = [
  {
    type: "YouTube Video Script",
    icon: "▶",
    sample: "[HOOK] You've been doing this wrong for years — and it's costing you views...\n\n[INTRO] Hey, I'm [Name], and today we're diving into the exact framework that took my channel from 0 to 100k subscribers...",
    color: "from-red-500/20 to-orange-500/10",
    border: "border-red-500/20",
  },
  {
    type: "TikTok/Reels Hook",
    icon: "♪",
    sample: "POV: You spent 3 hours writing a script... then found out AI can do it in 10 seconds.\n\n[Cut] Here's the exact prompt I use — and why it converts 5x better than generic copy...",
    color: "from-pink-500/20 to-purple-500/10",
    border: "border-pink-500/20",
  },
  {
    type: "VSL Script",
    icon: "◈",
    sample: "If you're still struggling to convert visitors into buyers, this might be the most important video you'll watch today.\n\nIn the next 7 minutes, I'll show you the exact system...",
    color: "from-purple-500/20 to-indigo-500/10",
    border: "border-purple-500/20",
  },
  {
    type: "Facebook Ad Script",
    icon: "◉",
    sample: "STOP scrolling if you're a coach who's tired of posting daily but getting zero clients.\n\nI used to be you. 90 days ago I had 23 followers and zero paid clients...",
    color: "from-blue-500/20 to-cyan-500/10",
    border: "border-blue-500/20",
  },
  {
    type: "Podcast Intro",
    icon: "◎",
    sample: "Welcome to The Founder's Edge — the show where we break down exactly how 7-figure entrepreneurs think, operate, and scale.\n\nI'm your host, [Name]. Today's episode...",
    color: "from-green-500/20 to-teal-500/10",
    border: "border-green-500/20",
  },
  {
    type: "Cold Email Script",
    icon: "✉",
    sample: "Subject: Quick question about [Company]'s onboarding\n\nHi [First Name],\n\nI noticed [Company] recently [specific trigger]. Most teams in your stage tell us they're losing 40% of new users in week one...",
    color: "from-yellow-500/20 to-amber-500/10",
    border: "border-yellow-500/20",
  },
];

const TESTIMONIALS = [
  {
    name: "Marcus Webb",
    role: "YouTube Creator, 280k subs",
    avatar: "MW",
    text: "I used to spend 3-4 hours scripting each video. Now I generate a full draft in 30 seconds and spend my time actually filming. My last 3 videos hit 100k+ views using Scriva scripts.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    name: "Priya Nair",
    role: "Freelance Copywriter",
    avatar: "PN",
    text: "I charge clients $500 per VSL script. Scriva lets me produce a polished first draft in minutes. My output has tripled and clients can't tell the difference — they just love the results.",
    color: "from-pink-500 to-rose-500",
  },
  {
    name: "Jake Thornton",
    role: "E-commerce Founder",
    avatar: "JT",
    text: "Our Facebook ad ROAS went from 1.8x to 4.2x after we started using Scriva scripts. The Urgent tone template specifically is absolutely dialed in for conversion.",
    color: "from-blue-500 to-cyan-500",
  },
];

const FAQS = [
  {
    q: "What AI model powers Scriva?",
    a: "Scriva uses OpenAI's GPT-4o — the most capable model available. You get the same AI that professional agencies use, without paying agency prices.",
  },
  {
    q: "How is the Free plan limited?",
    a: "Free users get 5 scripts per month. That's enough to test every script type. Counters reset on the 1st of each month. Pro users get up to 200 scripts/month.",
  },
  {
    q: "Can I cancel my Pro subscription anytime?",
    a: "Yes. Cancel anytime from your Settings page. You keep Pro access until the end of your billing period — no questions asked.",
  },
  {
    q: "What languages are supported?",
    a: "Pro users can generate scripts in English, Spanish, Korean, Japanese, and French. More languages are on the roadmap.",
  },
  {
    q: "Can I use the scripts commercially?",
    a: "Yes, all scripts you generate are yours to use commercially. Use them for ads, YouTube channels, client work, or anything else.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-bg-primary overflow-hidden">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative pt-40 pb-28 px-6">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 glass border border-purple-500/20 rounded-full px-4 py-2 mb-8">
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
            <span className="text-xs text-purple-300 font-medium">Powered by GPT-4o — the most capable AI model</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
            Turn Any Idea Into a<br />
            <span className="gradient-text">High-Converting Script</span><br />
            in Seconds
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Scriva AI generates YouTube scripts, TikTok hooks, VSL scripts, ad copy, and more —
            instantly. Stop staring at a blank page.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/sign-up" className="btn-primary text-base px-8 py-3.5">
              Generate Free Script
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="#how-it-works" className="btn-secondary text-base px-8 py-3.5">
              See how it works
            </Link>
          </div>

          <p className="mt-5 text-xs text-slate-600">No credit card required. 5 free scripts every month.</p>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
            {[
              { n: "12,000+", label: "scripts generated" },
              { n: "3,400+", label: "creators using Scriva" },
              { n: "4.9/5", label: "average rating" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <span className="font-bold text-white">{stat.n}</span>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-4">Why Scriva</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Everything you need to script faster</h2>
            <p className="text-slate-400 max-w-xl mx-auto">No more templates that sound like every other creator. Every script is unique, on-brand, and conversion-optimized.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bezel-card md:col-span-2 p-8 relative overflow-hidden group">
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-700" />
              <div className="inline-flex w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 items-center justify-center mb-5 text-2xl">⚡</div>
              <h3 className="text-xl font-bold mb-3">Generate in under 10 seconds</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                GPT-4o processes your brief and outputs a fully structured, section-labeled script instantly. No waiting. No loading spinners for minutes.
              </p>
              <div className="mt-6 bezel-card-inner p-3 font-mono text-xs text-green-400">
                <span className="text-slate-600">// Output</span><br />
                <span>[HOOK] Stop — you've been leaving money on the table...</span><br />
                <span>[INTRO] I'm going to show you exactly how to fix that...</span>
              </div>
            </div>

            <div className="bezel-card p-8 relative overflow-hidden group">
              <div className="absolute -top-10 -left-10 w-36 h-36 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-700" />
              <div className="inline-flex w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 items-center justify-center mb-5 text-2xl">🌍</div>
              <h3 className="text-xl font-bold mb-3">5 Languages</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">
                Generate scripts in English, Spanish, Korean, Japanese, and French. Reach global audiences without a translator.
              </p>
              <div className="space-y-2">
                {["English", "Spanish", "Korean", "Japanese", "French"].map((lang) => (
                  <div key={lang} className="bezel-card-inner px-3 py-2 text-xs text-slate-300">{lang}</div>
                ))}
              </div>
            </div>

            <div className="bezel-card p-8 relative overflow-hidden group">
              <div className="inline-flex w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 items-center justify-center mb-5 text-2xl">🎯</div>
              <h3 className="text-xl font-bold mb-3">8 Script Types</h3>
              <p className="text-slate-400 text-sm leading-relaxed">YouTube, TikTok, VSL, ads, cold email, podcast, product demo, webinar — one tool, all formats.</p>
            </div>

            <div className="bezel-card p-8 relative overflow-hidden group">
              <div className="inline-flex w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 items-center justify-center mb-5 text-2xl">🎙</div>
              <h3 className="text-xl font-bold mb-3">4 Tones</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Professional, Casual, Funny, or Urgent. Your brand voice, not a generic AI voice.</p>
            </div>

            <div className="bezel-card p-8 relative overflow-hidden group">
              <div className="inline-flex w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 items-center justify-center mb-5 text-2xl">📂</div>
              <h3 className="text-xl font-bold mb-3">Script History</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Every script you generate is saved. Copy, download as .txt, or regenerate with new settings anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/3 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-4">How it works</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Three steps to a finished script</h2>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Describe your topic", desc: "Pick a script type, paste your topic or product brief, choose tone, duration, and language.", icon: "✎" },
                { step: "02", title: "AI writes the script", desc: "GPT-4o generates a fully structured, section-labeled script in under 10 seconds.", icon: "◈" },
                { step: "03", title: "Copy, edit, and ship", desc: "Copy to clipboard, download as .txt, or regenerate with one click. Ready for production.", icon: "→" },
              ].map((item, i) => (
                <div key={item.step} className="text-center">
                  <div className="relative inline-flex w-14 h-14 rounded-2xl bg-accent-gradient items-center justify-center mb-6 shadow-lg shadow-purple-500/30 text-2xl">
                    {item.icon}
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-bg-primary border border-white/10 flex items-center justify-center text-[10px] font-bold text-purple-400">
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SCRIPT TYPE SHOWCASE ===== */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-4">Script types</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Every format you need</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Real sample outputs. These are actual scripts generated by Scriva.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SCRIPT_TYPES.map((item) => (
              <div key={item.type} className={`bezel-card p-6 relative overflow-hidden group hover:border-white/12 transition-all duration-500 bg-gradient-to-br ${item.color}`}>
                <div className={`inline-flex items-center gap-2 border ${item.border} rounded-full px-3 py-1 mb-4`}>
                  <span className="text-sm">{item.icon}</span>
                  <span className="text-xs font-medium text-slate-300">{item.type}</span>
                </div>
                <div className="bezel-card-inner p-4">
                  <p className="text-xs text-slate-400 leading-relaxed font-mono whitespace-pre-wrap line-clamp-5">{item.sample}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING (preview) ===== */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/3 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-4">Pricing</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Simple, honest pricing</h2>
            <p className="text-slate-400">Start free. Upgrade when you need more.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bezel-card p-8">
              <div className="mb-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Free</span>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-slate-500">/month</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {["5 scripts per month", "All 8 script types", "4 tones", "Copy & download (.txt)", "Script history (last 10)"].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                      <circle cx="8" cy="8" r="7" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
                      <path d="M5 8L7 10L11 6" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/sign-up" className="btn-secondary w-full justify-center">Get started free</Link>
            </div>

            <div className="bezel-card p-8 relative overflow-hidden border-purple-500/30">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/8 to-indigo-500/4 pointer-events-none" />
              <div className="absolute top-4 right-4 bg-accent-gradient text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">Most popular</div>
              <div className="mb-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">Pro</span>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">$19</span>
                  <span className="text-slate-500">/month</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">or $149/year (save $79)</p>
              </div>
              <ul className="space-y-3 mb-8">
                {["Unlimited scripts (200/mo)", "All script types + tones", "5 languages (EN, ES, KO, JA, FR)", "Unlimited script history", "Priority generation speed"].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                      <circle cx="8" cy="8" r="7" fill="rgba(124,58,237,0.2)" stroke="rgba(124,58,237,0.4)" strokeWidth="1"/>
                      <path d="M5 8L7 10L11 6" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/pricing" className="btn-primary w-full justify-center">Upgrade to Pro</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-4">Social proof</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Creators love Scriva</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bezel-card p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#7C3AED">
                      <path d="M7 1L8.8 5.1H13.1L9.6 7.7L11 12L7 9.3L3 12L4.4 7.7L0.9 5.1H5.2L7 1Z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-xs font-bold`}>{t.avatar}</div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-4">FAQ</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Common questions</h2>
          </div>
          <FaqSection faqs={FAQS} />
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bezel-card p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-indigo-500/10 pointer-events-none" />
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-4xl font-bold mb-4 relative">Ready to script faster?</h2>
            <p className="text-slate-400 mb-8 relative">Join 3,400+ creators. Start free — no credit card required.</p>
            <Link href="/sign-up" className="btn-primary text-base px-10 py-4">
              Generate Your First Script Free
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
