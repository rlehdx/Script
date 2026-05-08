import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";
import "./globals.css";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://scriva.online";

export const metadata: Metadata = {
  title: {
    default: "Scriva — AI Script Generator for YouTube, TikTok & Ads",
    template: "%s | Scriva",
  },
  description:
    "Generate high-converting YouTube scripts, TikTok hooks, VSL copy, and ad scripts in seconds. Powered by GPT-4o. Used by 3,400+ creators and agencies worldwide.",
  keywords: [
    "AI script generator",
    "YouTube script generator",
    "TikTok script",
    "VSL script generator",
    "ad copy generator",
    "video script AI",
    "GPT-4o scriptwriter",
    "content creator tools",
    "script writing software",
    "Scriva",
    "AI copywriting",
    "YouTube automation",
  ],
  authors: [{ name: "Scriva", url: APP_URL }],
  creator: "Scriva",
  publisher: "Scriva",
  metadataBase: new URL(APP_URL),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Scriva — AI Script Generator for YouTube, TikTok & Ads",
    description:
      "Generate high-converting scripts for YouTube, TikTok, VSL, podcasts, and ads in seconds. Powered by GPT-4o.",
    url: APP_URL,
    siteName: "Scriva",
    images: [
      {
        url: `${APP_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Scriva — AI Script Generator for Creators",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scriva — AI Script Generator for YouTube, TikTok & Ads",
    description:
      "Generate high-converting scripts in seconds. Powered by GPT-4o.",
    images: [`${APP_URL}/og-image.png`],
    creator: "@scriva_app",
    site: "@scriva_app",
  },
  icons: {
    icon: "/android-chrome-512x512.png",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "4zc8hLWGKz7rSqKBZMR2IClZRNb_NS6TN1hU-0YnM2s",
  },
  category: "technology",
};

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Scriva",
  url: APP_URL,
  description: "AI-powered script generator for YouTube, TikTok, VSL, and ads.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${APP_URL}/blog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Scriva",
  url: APP_URL,
  logo: `${APP_URL}/logo.png`,
  sameAs: ["https://twitter.com/scriva_app"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    availableLanguage: ["English", "Spanish", "Korean", "Japanese", "French"],
  },
};

const jsonLdSoftwareApp = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Scriva",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: [
    {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      name: "Free Plan",
      description: "5 scripts per month, all script types",
    },
    {
      "@type": "Offer",
      price: "19",
      priceCurrency: "USD",
      name: "Pro Plan",
      billingIncrement: "month",
      description: "200 scripts per month, all features, 5 languages",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "3400",
    bestRating: "5",
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
            rel="stylesheet"
          />
          <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
          <link rel="dns-prefetch" href="https://clerk.scriva.online" />
          <link rel="dns-prefetch" href="https://challenges.cloudflare.com" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftwareApp) }}
          />
        </head>
        <body className="bg-obsidian text-silver-bright antialiased font-body">
          {children}
          {GA_ID && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                strategy="afterInteractive"
              />
              <Script id="ga-init" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}');
                `}
              </Script>
            </>
          )}
        </body>
      </html>
    </ClerkProvider>
  );
}
