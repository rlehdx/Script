import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Scriva collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "April 4, 2025";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-bg-primary text-white">
      <Navbar />

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">Legal</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Privacy Policy</h1>
            <p className="text-slate-400 text-sm">Last updated: {LAST_UPDATED}</p>
          </div>

          <div className="prose prose-invert prose-slate max-w-none space-y-10">

            <div className="bezel-card p-8">
              <h2 className="text-xl font-bold mb-4">1. Introduction</h2>
              <p className="text-slate-300 leading-relaxed">
                Scriva ("we", "our", or "us") operates the website scriva.app and the Scriva AI script generation service (the "Service"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service. By using Scriva, you agree to the collection and use of information in accordance with this policy.
              </p>
            </div>

            <div className="bezel-card p-8">
              <h2 className="text-xl font-bold mb-4">2. Information We Collect</h2>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <div>
                  <h3 className="font-semibold text-white mb-2">2.1 Account Information</h3>
                  <p>When you create an account via Clerk, we collect your email address, name, and profile information you provide. We do not store your password — authentication is handled entirely by Clerk.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">2.2 Usage Data</h3>
                  <p>We collect information about how you use the Service, including scripts you generate (topic, type, tone, language, output), the number of generations, timestamps, and feature interactions. This data is stored in our database to power your script history and analytics.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">2.3 Payment Information</h3>
                  <p>All payment processing is handled by Stripe. We do not store your credit card numbers or banking details. We receive and store subscription status, plan type, and Stripe customer/subscription IDs.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">2.4 Log Data</h3>
                  <p>Our servers automatically record standard log data including your IP address, browser type, pages visited, and access times. This data is used for security monitoring and service improvement.</p>
                </div>
              </div>
            </div>

            <div className="bezel-card p-8">
              <h2 className="text-xl font-bold mb-4">3. How We Use Your Information</h2>
              <ul className="space-y-2 text-slate-300">
                {[
                  "Provide, operate, and maintain the Service",
                  "Process transactions and manage your subscription",
                  "Generate AI scripts based on your inputs using OpenAI's API",
                  "Maintain your script history and account preferences",
                  "Send transactional emails (receipts, subscription updates)",
                  "Monitor and analyze usage patterns to improve the Service",
                  "Detect and prevent fraud or abuse",
                  "Comply with legal obligations",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
                      <circle cx="8" cy="8" r="7" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
                      <path d="M5 8L7 10L11 6" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bezel-card p-8">
              <h2 className="text-xl font-bold mb-4">4. Third-Party Services</h2>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>We share data with the following third-party providers only as necessary to operate the Service:</p>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { name: "Clerk", purpose: "User authentication and account management", url: "https://clerk.com/privacy" },
                    { name: "Stripe", purpose: "Payment processing and subscription management", url: "https://stripe.com/privacy" },
                    { name: "OpenAI", purpose: "AI script generation (your prompts are sent to OpenAI's API)", url: "https://openai.com/privacy" },
                    { name: "Supabase", purpose: "Database storage for your account data and scripts", url: "https://supabase.com/privacy" },
                  ].map((provider) => (
                    <div key={provider.name} className="bezel-card-inner p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-white text-sm">{provider.name}</p>
                          <p className="text-xs text-slate-400 mt-1">{provider.purpose}</p>
                        </div>
                        <a href={provider.url} target="_blank" rel="noopener noreferrer" className="text-xs text-purple-400 hover:text-purple-300 flex-shrink-0">
                          Privacy Policy ↗
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm">We do not sell your personal data to third parties.</p>
              </div>
            </div>

            <div className="bezel-card p-8">
              <h2 className="text-xl font-bold mb-4">5. Data Retention</h2>
              <p className="text-slate-300 leading-relaxed">
                We retain your account data and script history for as long as your account is active. If you delete your account, we will delete your personal data and scripts within 30 days, except where we are required to retain it for legal or compliance purposes. Anonymized, aggregated usage data may be retained indefinitely.
              </p>
            </div>

            <div className="bezel-card p-8">
              <h2 className="text-xl font-bold mb-4">6. Your Rights</h2>
              <div className="space-y-3 text-slate-300 leading-relaxed">
                <p>Depending on your location, you may have the following rights regarding your personal data:</p>
                <ul className="space-y-2">
                  {[
                    "Access — request a copy of the data we hold about you",
                    "Correction — request correction of inaccurate data",
                    "Deletion — request deletion of your account and associated data",
                    "Portability — request your data in a machine-readable format",
                    "Objection — object to certain processing activities",
                  ].map((right) => (
                    <li key={right} className="flex items-start gap-3">
                      <span className="text-purple-400 mt-0.5 flex-shrink-0">→</span>
                      {right}
                    </li>
                  ))}
                </ul>
                <p className="text-sm">To exercise any of these rights, email us at <a href="mailto:privacy@scriva.app" className="text-purple-400 hover:text-purple-300">privacy@scriva.app</a>.</p>
              </div>
            </div>

            <div className="bezel-card p-8">
              <h2 className="text-xl font-bold mb-4">7. Security</h2>
              <p className="text-slate-300 leading-relaxed">
                We implement industry-standard security measures including HTTPS encryption, secure authentication via Clerk, and access controls on our database. However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security of your data.
              </p>
            </div>

            <div className="bezel-card p-8">
              <h2 className="text-xl font-bold mb-4">8. Children's Privacy</h2>
              <p className="text-slate-300 leading-relaxed">
                The Service is not directed to individuals under the age of 13. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal data, please contact us immediately.
              </p>
            </div>

            <div className="bezel-card p-8">
              <h2 className="text-xl font-bold mb-4">9. Changes to This Policy</h2>
              <p className="text-slate-300 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page and updating the "Last updated" date. Continued use of the Service after changes constitutes your acceptance of the updated policy.
              </p>
            </div>

            <div className="bezel-card p-8">
              <h2 className="text-xl font-bold mb-4">10. Contact Us</h2>
              <p className="text-slate-300 leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at:<br />
                <a href="mailto:privacy@scriva.app" className="text-purple-400 hover:text-purple-300">privacy@scriva.app</a>
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
