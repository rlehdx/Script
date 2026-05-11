import { MetadataRoute } from "next";

export const dynamic = "force-static";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://scriva.online";

const BLOG_SLUGS: { slug: string; date: string }[] = [
  { slug: "youtube-script-template",         date: "2026-04-02" },
  { slug: "tiktok-hook-examples",            date: "2026-03-28" },
  { slug: "how-to-write-vsl-script",         date: "2026-03-20" },
  { slug: "ai-script-generator-guide",       date: "2026-03-14" },
  { slug: "podcast-script-outline",          date: "2026-03-07" },
  { slug: "facebook-ad-script",              date: "2026-02-28" },
  { slug: "youtube-script-length",           date: "2026-04-10" },
  { slug: "youtube-shorts-script",           date: "2026-04-15" },
  { slug: "youtube-channel-growth-scripts",  date: "2026-04-20" },
  { slug: "how-to-hook-viewers-youtube",     date: "2026-04-25" },
  { slug: "tiktok-script-template",          date: "2026-05-01" },
  { slug: "tiktok-viral-formula",            date: "2026-05-05" },
  { slug: "tiktok-for-business-script",      date: "2026-05-08" },
  { slug: "vsl-script-examples",             date: "2026-05-12" },
  { slug: "google-ads-script",               date: "2026-05-15" },
  { slug: "instagram-reel-script",           date: "2026-05-18" },
  { slug: "ugc-ad-script",                   date: "2026-05-20" },
  { slug: "podcast-intro-script",            date: "2026-05-22" },
  { slug: "podcast-sponsorship-script",      date: "2026-05-25" },
  { slug: "chatgpt-script-prompts",          date: "2026-05-28" },
  { slug: "best-ai-script-tools",            date: "2026-05-30" },
  { slug: "sales-video-script",              date: "2026-06-02" },
  { slug: "explainer-video-script",          date: "2026-06-05" },
  { slug: "webinar-script-template",         date: "2026-06-08" },
  { slug: "ai-vs-human-copywriting",         date: "2026-06-10" },
  { slug: "scriva-vs-chatgpt",               date: "2026-05-10" },
  { slug: "cold-email-script-template",      date: "2026-05-09" },
  { slug: "youtube-algorithm-2025",          date: "2026-05-06" },
  { slug: "script-writing-tips-beginners",   date: "2026-05-03" },
  { slug: "how-to-make-money-youtube-scripts", date: "2026-04-28" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: APP_URL,
      lastModified: "2026-05-07",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${APP_URL}/pricing`,
      lastModified: "2026-05-07",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${APP_URL}/blog`,
      lastModified: "2026-05-07",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...BLOG_SLUGS.map(({ slug, date }) => ({
      url: `${APP_URL}/blog/${slug}`,
      lastModified: date,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${APP_URL}/sign-in`,
      lastModified: "2026-01-01",
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${APP_URL}/sign-up`,
      lastModified: "2026-01-01",
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${APP_URL}/privacy`,
      lastModified: "2026-04-10",
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${APP_URL}/terms`,
      lastModified: "2026-04-10",
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${APP_URL}/refund`,
      lastModified: "2026-04-10",
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
  ];
}
