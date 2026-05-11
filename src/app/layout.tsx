import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://scriva.online";

export const metadata: Metadata = {
  title: {
    default: "Scriva — AI Script Generator for YouTube, TikTok & Ads",
    template: "%s | Scriva",
  },
  description:
    "Generate high-converting YouTube scripts, TikTok hooks, VSL copy, and ad scripts in seconds. Powered by GPT-4.1. Used by 3,400+ creators and agencies worldwide.",
  keywords: [
    "AI script generator",
    "YouTube script generator",
    "TikTok script",
    "VSL script generator",
    "ad copy generator",
    "video script AI",
    "GPT-4.1 scriptwriter",
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
      "Generate high-converting scripts for YouTube, TikTok, VSL, podcasts, and ads in seconds. Powered by GPT-4.1.",
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
      "Generate high-converting scripts in seconds. Powered by GPT-4.1.",
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
      name: "Starter Plan",
      description: "5 scripts per month, all 8 script types, 4 tones, copy & download",
    },
    {
      "@type": "Offer",
      price: "19",
      priceCurrency: "USD",
      name: "Creator Plan",
      billingIncrement: "month",
      description: "100 scripts per month, all script types, 5 languages (EN ES KO JA FR), full script history, priority speed",
    },
    {
      "@type": "Offer",
      price: "49",
      priceCurrency: "USD",
      name: "Agency Plan",
      billingIncrement: "month",
      description: "Unlimited scripts, custom brand voice, all languages, dedicated support",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: 3400,
    reviewCount: 3400,
    bestRating: "5",
    worstRating: "1",
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;

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
          <CookieBanner />
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
                  gtag('config', '${GA_ID}', {
                    'anonymize_ip': true
                  });
                `}
              </Script>
            </>
          )}
          {META_PIXEL_ID && (
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${META_PIXEL_ID}');
                fbq('track', 'PageView');
              `}
            </Script>
          )}
          {TIKTOK_PIXEL_ID && (
            <Script id="tiktok-pixel" strategy="afterInteractive">
              {`
                !function (w, d, t) {
                  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
                  ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
                  ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
                  for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
                  ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
                  ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;
                  ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=r;ttq._t=ttq._t||{};ttq._t[e]=+new Date;
                  ttq._o=ttq._o||{};ttq._o[e]=n||{};
                  n=document.createElement("script");n.type="text/javascript";n.async=!0;
                  n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];
                  e.parentNode.insertBefore(n,e)};
                  ttq.load('${TIKTOK_PIXEL_ID}');
                  ttq.page();
                }(window, document, 'ttq');
              `}
            </Script>
          )}
        </body>
      </html>
    </ClerkProvider>
  );
}
