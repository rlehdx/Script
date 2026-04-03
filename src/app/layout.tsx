import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://scriva.app";

export const metadata: Metadata = {
  title: {
    default: "Scriva — AI Script Generator for YouTube, TikTok & Ads",
    template: "%s | Scriva",
  },
  description:
    "Generate high-converting YouTube scripts, TikTok hooks, VSL copy, and ad scripts in seconds. Powered by GPT-4.1 and o3. Used by 1,000+ creators and agencies.",
  keywords: [
    "AI script generator",
    "YouTube script generator",
    "TikTok script",
    "VSL script",
    "ad copy generator",
    "video script AI",
    "GPT-4 scriptwriter",
    "Scriva",
  ],
  authors: [{ name: "Scriva" }],
  metadataBase: new URL(APP_URL),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Scriva — AI Script Generator for YouTube, TikTok & Ads",
    description:
      "Generate high-converting scripts for YouTube, TikTok, VSL, podcasts, and ads in seconds. Powered by GPT-4.1 and o3.",
    url: APP_URL,
    siteName: "Scriva",
    images: [
      {
        url: `${APP_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Scriva — AI Script Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scriva — AI Script Generator for YouTube, TikTok & Ads",
    description:
      "Generate high-converting scripts in seconds. Powered by GPT-4.1 and o3.",
    images: [`${APP_URL}/og-image.png`],
    creator: "@scriva_app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: "4zc8hLWGKz7rSqKBZMR2IClZRNb_NS6TN1hU-0YnM2s",
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.variable}>
        <head>
          {GA_ID && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_ID}', { page_path: window.location.pathname });
                  `,
                }}
              />
            </>
          )}
        </head>
        <body className="bg-bg-primary text-white antialiased font-sans">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
