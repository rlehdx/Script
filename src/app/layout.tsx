import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ScriptFlow AI — Turn Any Idea Into a High-Converting Script in Seconds",
  description:
    "AI-powered script generator for YouTubers, TikTok creators, ad agencies, and solopreneurs. Generate YouTube scripts, ad copy, VSL scripts, and more.",
  keywords: "AI script generator, YouTube script, TikTok script, ad copy, video script, AI copywriting",
  authors: [{ name: "ScriptFlow AI" }],
  openGraph: {
    title: "ScriptFlow AI — Turn Any Idea Into a Script in Seconds",
    description:
      "Generate high-converting scripts for YouTube, TikTok, ads, VSL, podcasts, and more with GPT-4o.",
    url: process.env.NEXT_PUBLIC_APP_URL ?? "",
    siteName: "ScriptFlow AI",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "ScriptFlow AI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ScriptFlow AI — Turn Any Idea Into a Script in Seconds",
    description: "Generate high-converting scripts with GPT-4o.",
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.variable}>
        <head>
          {/* Google Analytics — replace GA_MEASUREMENT_ID with your ID */}
          {/*
          <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
          <script dangerouslySetInnerHTML={{ __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}} />
          */}
        </head>
        <body className="bg-bg-primary text-white antialiased font-sans">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
