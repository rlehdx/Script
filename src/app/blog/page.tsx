import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

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

const POSTS = [
  {
    slug: "youtube-script-template",
    title: "The Ultimate YouTube Script Template (That Actually Gets Views)",
    desc: "A battle-tested 7-part framework used by 100k+ creators to hook viewers in 3 seconds and keep them watching.",
    tag: "YouTube",
    date: "Apr 2, 2025",
    readTime: "6 min read",
  },
  {
    slug: "tiktok-hook-examples",
    title: "50 TikTok Hook Examples That Stop the Scroll",
    desc: "Swipe-worthy opening lines across every niche — from finance to fitness. Copy, adapt, and go viral.",
    tag: "TikTok",
    date: "Mar 28, 2025",
    readTime: "8 min read",
  },
  {
    slug: "how-to-write-vsl-script",
    title: "How to Write a VSL Script That Converts (Step-by-Step)",
    desc: "The exact structure behind VSLs that convert at 3–8%. Includes a fill-in-the-blank template you can use today.",
    tag: "VSL",
    date: "Mar 20, 2025",
    readTime: "10 min read",
  },
  {
    slug: "ai-script-generator-guide",
    title: "How to Use AI to Write Scripts 10x Faster (Without Sounding Robotic)",
    desc: "The prompting strategies that separate generic AI output from scripts that actually convert.",
    tag: "AI Tools",
    date: "Mar 14, 2025",
    readTime: "7 min read",
  },
  {
    slug: "podcast-script-outline",
    title: "Podcast Script Outline: How to Sound Natural & Keep Listeners Hooked",
    desc: "Most podcasters wing it — here's how to script episodes that feel spontaneous but never boring.",
    tag: "Podcast",
    date: "Mar 7, 2025",
    readTime: "5 min read",
  },
  {
    slug: "facebook-ad-script",
    title: "Facebook & Instagram Ad Scripts: The 3-Part Formula That Sells",
    desc: "Hook → Problem → Solution. Why this works for cold traffic and how to write it in under 10 minutes.",
    tag: "Paid Ads",
    date: "Feb 28, 2025",
    readTime: "6 min read",
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
