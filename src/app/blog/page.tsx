import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

interface Post {
  slug: string;
  title: string;
  desc: string;
  tag: string;
  date: string;
  readTime: string;
}

export const metadata: Metadata = {
  title: "Script Writing Guides & Templates",
  description:
    "Free guides on writing YouTube scripts, TikTok hooks, VSL copy, podcast outlines, and ad scripts. Templates, examples, and frameworks used by 3,400+ creators.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Script Writing Guides & Templates | Scriva",
    description:
      "Free guides on writing YouTube scripts, TikTok hooks, VSL copy, podcast outlines, and ad scripts.",
    url: "https://scriva.online/blog",
    type: "website",
  },
};

const POSTS: Post[] = [
  {
    slug: "youtube-script-template",
    title: "The Ultimate YouTube Script Template (That Actually Gets Views)",
    desc: "A battle-tested 7-part framework used by 100k+ creators to hook viewers in 3 seconds and keep them watching.",
    tag: "YouTube",
    date: "Apr 2, 2026",
    readTime: "6 min read",
  },
  {
    slug: "tiktok-hook-examples",
    title: "50 TikTok Hook Examples That Stop the Scroll",
    desc: "Swipe-worthy opening lines across every niche — from finance to fitness. Copy, adapt, and go viral.",
    tag: "TikTok",
    date: "Mar 28, 2026",
    readTime: "8 min read",
  },
  {
    slug: "how-to-write-vsl-script",
    title: "How to Write a VSL Script That Converts (Step-by-Step)",
    desc: "The exact structure behind VSLs that convert at 3–8%. Includes a fill-in-the-blank template you can use today.",
    tag: "VSL",
    date: "Mar 20, 2026",
    readTime: "10 min read",
  },
  {
    slug: "ai-script-generator-guide",
    title: "How to Use AI to Write Scripts 10x Faster (Without Sounding Robotic)",
    desc: "The prompting strategies that separate generic AI output from scripts that actually convert.",
    tag: "AI Tools",
    date: "Mar 14, 2026",
    readTime: "7 min read",
  },
  {
    slug: "podcast-script-outline",
    title: "Podcast Script Outline: How to Sound Natural & Keep Listeners Hooked",
    desc: "Most podcasters wing it — here's how to script episodes that feel spontaneous but never boring.",
    tag: "Podcast",
    date: "Mar 7, 2026",
    readTime: "5 min read",
  },
  {
    slug: "facebook-ad-script",
    title: "Facebook & Instagram Ad Scripts: The 3-Part Formula That Sells",
    desc: "Hook → Problem → Solution. Why this works for cold traffic and how to write it in under 10 minutes.",
    tag: "Paid Ads",
    date: "Feb 28, 2026",
    readTime: "6 min read",
  },
  {
    slug: "youtube-script-length",
    title: "How Long Should a YouTube Script Be? (By Video Type)",
    desc: "The exact word counts and time targets for different YouTube formats — explainers, vlogs, tutorials, and shorts.",
    tag: "YouTube",
    date: "Apr 10, 2026",
    readTime: "5 min read",
  },
  {
    slug: "youtube-shorts-script",
    title: "YouTube Shorts Script Template: Hook in 2 Seconds or Lose Them",
    desc: "The exact 3-part Shorts formula top creators use to hit 500k+ views. Includes 10 fill-in-the-blank templates.",
    tag: "YouTube",
    date: "Apr 15, 2026",
    readTime: "5 min read",
  },
  {
    slug: "youtube-channel-growth-scripts",
    title: "How Top YouTubers Use Scripts to Grow Faster (With Examples)",
    desc: "Why scripted videos outperform unscripted across every metric — and the exact frameworks used by channels with 100k+ subscribers.",
    tag: "YouTube",
    date: "Apr 20, 2026",
    readTime: "7 min read",
  },
  {
    slug: "how-to-hook-viewers-youtube",
    title: "YouTube Hook Examples: 40 Openings That Keep Viewers Watching",
    desc: "Copy-paste hooks for every niche and video type. Organized by psychological trigger — curiosity, fear, desire, and social proof.",
    tag: "YouTube",
    date: "Apr 25, 2026",
    readTime: "8 min read",
  },
  {
    slug: "tiktok-script-template",
    title: "TikTok Script Template: The Exact Formula for Any Niche",
    desc: "A reusable TikTok script structure that works across finance, fitness, beauty, business, and education content.",
    tag: "TikTok",
    date: "May 1, 2026",
    readTime: "6 min read",
  },
  {
    slug: "tiktok-viral-formula",
    title: "The TikTok Viral Formula: What Makes Videos Blow Up (And How to Replicate It)",
    desc: "Data-backed breakdown of what the TikTok algorithm rewards — and how to engineer your scripts to hit every signal.",
    tag: "TikTok",
    date: "May 5, 2026",
    readTime: "7 min read",
  },
  {
    slug: "tiktok-for-business-script",
    title: "TikTok for Business: Script Templates That Drive Sales Without Being Salesy",
    desc: "How to write TikTok scripts that convert viewers into customers — without the cringey hard sell.",
    tag: "TikTok",
    date: "May 8, 2026",
    readTime: "6 min read",
  },
  {
    slug: "vsl-script-examples",
    title: "VSL Script Examples: 3 Real Scripts That Convert at 4%+",
    desc: "Annotated VSL scripts with conversion commentary — showing exactly why each section works.",
    tag: "VSL",
    date: "May 12, 2026",
    readTime: "10 min read",
  },
  {
    slug: "google-ads-script",
    title: "Google Ads Video Script: The Formula for In-Stream and Discovery Ads",
    desc: "How to write scripts for YouTube pre-roll, in-stream, and Discovery ads — with skip-proof opening lines.",
    tag: "Paid Ads",
    date: "May 15, 2026",
    readTime: "7 min read",
  },
  {
    slug: "instagram-reel-script",
    title: "Instagram Reel Script Template: Hook, Deliver, Convert in 30 Seconds",
    desc: "How to write Reels scripts that stop the scroll, get shared, and drive profile visits — with 10 fill-in-the-blank templates.",
    tag: "Paid Ads",
    date: "May 18, 2026",
    readTime: "6 min read",
  },
  {
    slug: "ugc-ad-script",
    title: "UGC Ad Script Template: How to Write Scripts That Feel Authentic (And Convert)",
    desc: "The formula behind UGC ads that outperform polished brand videos — with 5 complete script examples.",
    tag: "Paid Ads",
    date: "May 20, 2026",
    readTime: "7 min read",
  },
  {
    slug: "podcast-intro-script",
    title: "Podcast Intro Script: How to Hook Listeners in the First 60 Seconds",
    desc: "The exact formula for podcast intros that hook listeners, set expectations, and reduce early drop-off.",
    tag: "Podcast",
    date: "May 22, 2026",
    readTime: "5 min read",
  },
  {
    slug: "podcast-sponsorship-script",
    title: "Podcast Sponsorship Script: How to Read Ads That Don't Kill Listener Drop-Off",
    desc: "The ad read format used by top podcasters that keeps listeners engaged — and sponsors coming back.",
    tag: "Podcast",
    date: "May 25, 2026",
    readTime: "5 min read",
  },
  {
    slug: "chatgpt-script-prompts",
    title: "ChatGPT Prompts for YouTube Scripts: What Works (And What Doesn't)",
    desc: "The exact prompts that generate usable YouTube scripts from ChatGPT — plus the common mistakes that produce generic garbage.",
    tag: "AI Tools",
    date: "May 28, 2026",
    readTime: "7 min read",
  },
  {
    slug: "best-ai-script-tools",
    title: "Best AI Script Generator Tools in 2026 (Compared)",
    desc: "An honest comparison of the top AI script tools for YouTube, TikTok, and ads — what each does well and where they fall short.",
    tag: "AI Tools",
    date: "May 30, 2026",
    readTime: "8 min read",
  },
  {
    slug: "sales-video-script",
    title: "Sales Video Script Template: The 7-Step Formula That Converts Cold Traffic",
    desc: "How to write a sales video that converts viewers who've never heard of you — with a complete fill-in-the-blank template.",
    tag: "Conversion",
    date: "Jun 2, 2026",
    readTime: "9 min read",
  },
  {
    slug: "explainer-video-script",
    title: "Explainer Video Script: How to Make Complex Ideas Instantly Clear",
    desc: "The 5-part explainer script formula used by SaaS companies and educators to convert confused visitors into engaged users.",
    tag: "Conversion",
    date: "Jun 5, 2026",
    readTime: "6 min read",
  },
  {
    slug: "webinar-script-template",
    title: "Webinar Script Template: How to Fill 60 Minutes and Close Sales",
    desc: "The complete webinar script structure used by course creators and coaches — from welcome to pitch.",
    tag: "Conversion",
    date: "Jun 8, 2026",
    readTime: "10 min read",
  },
  {
    slug: "ai-vs-human-copywriting",
    title: "AI Copywriting vs. Human: When to Use Each (And When to Combine)",
    desc: "An honest breakdown of what AI does better than humans, what humans do better than AI, and how to get the best of both.",
    tag: "AI Tools",
    date: "Jun 10, 2026",
    readTime: "6 min read",
  },
  {
    slug: "scriva-vs-chatgpt",
    title: "Scriva vs ChatGPT for Script Writing: An Honest Comparison",
    desc: "Both use GPT-4.1 under the hood — so why does Scriva produce better scripts? Here's the honest breakdown.",
    tag: "AI Tools",
    date: "May 10, 2026",
    readTime: "6 min read",
  },
  {
    slug: "cold-email-script-template",
    title: "Cold Email Script Template: The 3-Sentence Formula That Gets Replies",
    desc: "The exact cold email script structure used by top sales teams — short, specific, and built for replies, not pitches.",
    tag: "Conversion",
    date: "May 9, 2026",
    readTime: "6 min read",
  },
  {
    slug: "youtube-algorithm-2025",
    title: "YouTube Algorithm 2026: What Actually Gets Videos Recommended",
    desc: "The signals that matter in 2026 — and how to write scripts that hit every one of them.",
    tag: "YouTube",
    date: "May 6, 2026",
    readTime: "7 min read",
  },
  {
    slug: "script-writing-tips-beginners",
    title: "Script Writing Tips for Beginners: 10 Rules That Separate Good Scripts from Bad",
    desc: "The fundamentals that professional scriptwriters follow — and that beginners skip. Master these before anything else.",
    tag: "YouTube",
    date: "May 3, 2026",
    readTime: "6 min read",
  },
  {
    slug: "how-to-make-money-youtube-scripts",
    title: "How Better Scripts Help You Make More Money on YouTube",
    desc: "The direct link between script quality, retention, ad revenue, and sponsorship rates — with the data to back it up.",
    tag: "YouTube",
    date: "Apr 28, 2026",
    readTime: "7 min read",
  },
];

const TAG_COLORS: Record<string, string> = {
  YouTube: "text-red-400 bg-red-500/10 border-red-500/20",
  TikTok: "text-pink-400 bg-pink-500/10 border-pink-500/20",
  VSL: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  "AI Tools": "text-green-400 bg-green-500/10 border-green-500/20",
  Podcast: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  "Paid Ads": "text-purple-400 bg-purple-500/10 border-purple-500/20",
  Conversion: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
};

const jsonLdCollection = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Script Writing Guides & Templates",
  description:
    "Free guides on writing YouTube scripts, TikTok hooks, VSL copy, podcast outlines, and ad scripts.",
  url: "https://scriva.online/blog",
  publisher: { "@type": "Organization", name: "Scriva", url: "https://scriva.online" },
};

export default function BlogIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCollection) }}
      />
      <Navbar />
      <main className="min-h-screen bg-bg-primary pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-5">
          <header className="mb-12">
            <p className="text-xs font-mono uppercase tracking-widest text-slate-600 mb-3">
              Resources
            </p>
            <h1 className="text-4xl font-bold text-white mb-3 leading-snug">
              Script Writing Guides
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
              Free frameworks, templates, and examples for YouTube, TikTok, VSL, podcasts, and ads.
              Written by creators, for creators.
            </p>
          </header>

          <div className="flex flex-col gap-px bg-white/5 rounded-sm overflow-hidden">
            {POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-[#0A0A0F] hover:bg-white/[0.03] transition-colors p-6 flex flex-col gap-2"
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-xs border rounded-full px-2.5 py-0.5 font-medium ${
                      TAG_COLORS[post.tag] ?? "text-purple-300 bg-purple-500/10 border-purple-500/20"
                    }`}
                  >
                    {post.tag}
                  </span>
                  <span className="text-xs text-slate-600">{post.readTime}</span>
                  <span className="text-xs text-slate-600">·</span>
                  <span className="text-xs text-slate-600">{post.date}</span>
                </div>
                <h2 className="text-base font-semibold text-white group-hover:text-slate-200 transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed">{post.desc}</p>
                <span className="text-xs text-purple-400 group-hover:text-purple-300 transition-colors mt-1">
                  Read guide →
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500 mb-4">
              Skip the manual work — generate any script in 10 seconds.
            </p>
            <Link href="/sign-up" className="btn-primary inline-flex">
              Try Scriva Free →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
