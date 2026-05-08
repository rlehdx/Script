import { MetadataRoute } from "next";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://scriva.online";

const BLOG_SLUGS: { slug: string; date: string }[] = [
  { slug: "youtube-script-template",    date: "2025-04-02" },
  { slug: "tiktok-hook-examples",       date: "2025-03-28" },
  { slug: "how-to-write-vsl-script",    date: "2025-03-20" },
  { slug: "ai-script-generator-guide",  date: "2025-03-14" },
  { slug: "podcast-script-outline",     date: "2025-03-07" },
  { slug: "facebook-ad-script",         date: "2025-02-28" },
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
      lastModified: "2025-01-01",
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${APP_URL}/sign-up`,
      lastModified: "2025-01-01",
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${APP_URL}/privacy`,
      lastModified: "2025-01-01",
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${APP_URL}/terms`,
      lastModified: "2025-01-01",
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${APP_URL}/refund`,
      lastModified: "2025-01-01",
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
  ];
}
