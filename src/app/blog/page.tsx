import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Script Writing Guides & Tips",
  description:
    "Free guides on writing YouTube scripts, TikTok hooks, VSL copy, and ad scripts. Learn proven frameworks used by top creators.",
};

const POSTS = [
  {
    slug: "youtube-script-template",
    title: "The Ultimate YouTube Script Template (That Actually Gets Views)",
    desc: "A battle-tested 7-part framework used by 100k+ creators to hook viewers in 3 seconds and keep them watching.",
    tag: "YouTube",
    tagColor: "text-red-300 bg-red-500/10 border-red-500/20",
    readTime: "6 min read",
    date: "Apr 2, 2025",
  },
  {
    slug: "tiktok-hook-examples",
    title: "50 TikTok Hook Examples That Stop the Scroll",
    desc: "Swipe-worthy opening lines across every niche — from finance to fitness. Copy, adapt, and go viral.",
    tag: "TikTok",
    tagColor: "text-pink-300 bg-pink-500/10 border-pink-500/20",
    readTime: "8 min read",
    date: "Mar 28, 2025",
  },
  {
    slug: "how-to-write-vsl-script",
    title: "How to Write a VSL Script That Converts (Step-by-Step)",
    desc: "The exact structure behind VSLs that convert at 3–8%. Includes a fill-in-the-blank template you can use today.",
    tag: "VSL",
    tagColor: "text-amber-300 bg-amber-500/10 border-amber-500/20",
    readTime: "10 min read",
    date: "Mar 20, 2025",
  },
  {
    slug: "ai-script-generator-guide",
    title: "How to Use AI to Write Scripts 10x Faster (Without Sounding Robotic)",
    desc: "The prompting strategies that separate generic AI output from scripts that actually convert.",
    tag: "AI Tools",
    tagColor: "text-purple-300 bg-purple-500/10 border-purple-500/20",
    readTime: "7 min read",
    date: "Mar 14, 2025",
  },
  {
    slug: "podcast-script-outline",
    title: "Podcast Script Outline: How to Sound Natural & Keep Listeners Hooked",
    desc: "Most podcasters wing it — here's how to script episodes that feel spontaneous but never boring.",
    tag: "Podcast",
    tagColor: "text-blue-300 bg-blue-500/10 border-blue-500/20",
    readTime: "5 min read",
    date: "Mar 7, 2025",
  },
  {
    slug: "facebook-ad-script",
    title: "Facebook & Instagram Ad Scripts: The 3-Part Formula That Sells",
    desc: "Hook → Problem → Solution. Why this works for cold traffic and how to write it in under 10 minutes.",
    tag: "Paid Ads",
    tagColor: "text-cyan-300 bg-cyan-500/10 border-cyan-500/20",
    readTime: "6 min read",
    date: "Feb 28, 2025",
  },
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-primary pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-5">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-3">
              Script Writing <span className="gradient-text">Guides</span>
            </h1>
            <p className="text-slate-400 text-lg">
              Free frameworks, templates, and tips used by 1,000+ creators and agencies.
            </p>
          </div>

          {/* Posts grid */}
          <div className="grid gap-5">
            {POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bezel-card p-6 hover:border-white/15 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[11px] border rounded-full px-2.5 py-0.5 font-medium ${post.tagColor}`}>
                        {post.tag}
                      </span>
                      <span className="text-[11px] text-slate-600">{post.readTime}</span>
                      <span className="text-[11px] text-slate-600">·</span>
                      <span className="text-[11px] text-slate-600">{post.date}</span>
                    </div>
                    <h2 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors mb-2 leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-sm text-slate-500 leading-relaxed">{post.desc}</p>
                  </div>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="flex-shrink-0 text-slate-600 group-hover:text-purple-400 transition-colors mt-1"
                  >
                    <path
                      d="M5 10h10M10 5l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 bezel-card p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">
              Stop writing scripts manually
            </h2>
            <p className="text-slate-400 mb-6">
              Generate a professional script in 10 seconds with Scriva AI.
            </p>
            <Link href="/sign-up" className="btn-primary inline-flex">
              Try Scriva Free — 5 scripts/month
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
