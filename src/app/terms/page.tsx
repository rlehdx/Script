import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read the terms and conditions governing your use of Scriva.",
  alternates: { canonical: "/terms" },
};

const LAST_UPDATED = "April 4, 2025";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-bg-primary text-white">
      <Navbar />

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">Legal</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Terms of Service</h1>
            <p className="text-slate-400 text-sm">Last updated: {LAST_UPDATED}</p>
          </div>

          <div className="space-y-6">

            <div className="bezel-card p-8">
              <h2 className="text-xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-slate-300 leading-relaxed">
                By accessing or using Scriva ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the Service. These Terms apply to all users, including free and paid subscribers.
              </p>
            </div>

            <div className="bezel-card p-8">
              <h2 className="text-xl font-bold mb-4">2. Description of Service</h2>
              <p className="text-slate-300 leading-relaxed">
                Scriva is an AI-powered script generation platform that helps creators, marketers, and agencies write scripts for YouTube, TikTok, VSL, podcasts, ads, and more. The Service uses OpenAI's language models to generate content based on your inputs.
              </p>
            </div>

            <div className="bezel-card p-8">
              <h2 className="text-xl font-bold mb-4">3. User Accounts</h2>
              <div className="space-y-3 text-slate-300 leading-relaxed">
                <p>You must create an account to use most features of the Service. You are responsible for:</p>
                <ul className="space-y-2">
                  {[
                    "Maintaining the confidentiality of your account credentials",
                    "All activity that occurs under your account",
                    "Providing accurate and complete registration information",
                    "Notifying us immediately of any unauthorized account access",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-purple-400 mt-0.5 flex-shrink-0">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p>We reserve the right to suspend or terminate accounts that violate these Terms.</p>
              </div>
            </div>

            <div className="bezel-card p-8">
              <h2 className="text-xl font-bold mb-4">4. Acceptable Use</h2>
              <div className="space-y-3 text-slate-300 leading-relaxed">
                <p>You agree not to use the Service to:</p>
                <ul className="space-y-2">
                  {[
                    "Generate content that is illegal, harmful, threatening, abusive, or harassing",
                    "Create spam, phishing content, or deceptive materials",
                    "Produce content that infringes third-party intellectual property rights",
                    "Attempt to reverse-engineer, scrape, or abuse the Service's API",
                    "Share or resell account access to others",
                    "Circumvent usage limits or subscription restrictions",
                    "Generate content involving minors in harmful contexts",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
                        <circle cx="8" cy="8" r="7" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
                        <path d="M6 6L10 10M10 6L6 10" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bezel-card p-8">
              <h2 className="text-xl font-bold mb-4">5. Intellectual Property</h2>
              <div className="space-y-3 text-slate-300 leading-relaxed">
                <div>
                  <h3 className="font-semibold text-white mb-2">5.1 Your Content</h3>
                  <p>You retain ownership of the scripts and content you generate using the Service. By using Scriva, you grant us a limited license to store and display your generated scripts solely for the purpose of providing the Service (e.g., your script history).</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">5.2 Our Platform</h3>
                  <p>The Scriva platform, including its interface, branding, prompts, and underlying technology, is owned by Scriva and protected by intellectual property laws. You may not copy, modify, or distribute our platform without written permission.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">5.3 AI-Generated Content</h3>
                  <p>AI-generated outputs may not always be eligible for copyright protection under applicable law. You are responsible for reviewing generated scripts and ensuring they meet your legal requirements before use.</p>
                </div>
              </div>
            </div>

            <div className="bezel-card p-8">
              <h2 className="text-xl font-bold mb-4">6. Subscription & Billing</h2>
              <div className="space-y-3 text-slate-300 leading-relaxed">
                <p>Paid plans are billed on a monthly or annual basis through Stripe. By subscribing, you authorize us to charge your payment method on a recurring basis.</p>
                <ul className="space-y-2">
                  {[
                    "Subscriptions auto-renew unless cancelled before the renewal date",
                    "You can cancel anytime from your Settings page — cancellation takes effect at the end of the billing period",
                    "We reserve the right to change pricing with 30 days' notice",
                    "Failed payments may result in service suspension",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-purple-400 mt-0.5 flex-shrink-0">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bezel-card p-8">
              <h2 className="text-xl font-bold mb-4">7. Disclaimer of Warranties</h2>
              <p className="text-slate-300 leading-relaxed">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. We do not warrant that the Service will be uninterrupted, error-free, or that AI-generated content will be accurate, complete, or suitable for your purposes. You use generated scripts at your own risk.
              </p>
            </div>

            <div className="bezel-card p-8">
              <h2 className="text-xl font-bold mb-4">8. Limitation of Liability</h2>
              <p className="text-slate-300 leading-relaxed">
                TO THE FULLEST EXTENT PERMITTED BY LAW, SCRIVA SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES arising from your use of the Service. Our total liability to you for any claims shall not exceed the amount you paid us in the 12 months preceding the claim.
              </p>
            </div>

            <div className="bezel-card p-8">
              <h2 className="text-xl font-bold mb-4">9. Termination</h2>
              <p className="text-slate-300 leading-relaxed">
                We may suspend or terminate your access to the Service at any time, with or without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties. Upon termination, your right to use the Service ceases immediately.
              </p>
            </div>

            <div className="bezel-card p-8">
              <h2 className="text-xl font-bold mb-4">10. Governing Law</h2>
              <p className="text-slate-300 leading-relaxed">
                These Terms are governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions. Any disputes shall be resolved through binding arbitration or in the courts of Delaware.
              </p>
            </div>

            <div className="bezel-card p-8">
              <h2 className="text-xl font-bold mb-4">11. Changes to Terms</h2>
              <p className="text-slate-300 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will provide notice of material changes by updating the "Last updated" date and, where appropriate, notifying you by email. Continued use of the Service after changes constitutes your acceptance of the new Terms.
              </p>
            </div>

            <div className="bezel-card p-8">
              <h2 className="text-xl font-bold mb-4">12. Contact</h2>
              <p className="text-slate-300 leading-relaxed">
                For questions about these Terms, contact us at:<br />
                <a href="mailto:legal@scriva.app" className="text-purple-400 hover:text-purple-300">legal@scriva.app</a>
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
