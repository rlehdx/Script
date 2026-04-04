import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Scriva's refund and cancellation policy for paid subscriptions.",
  alternates: { canonical: "/refund" },
};

const LAST_UPDATED = "April 4, 2025";

export default function RefundPage() {
  return (
    <main className="min-h-screen bg-bg-primary text-white">
      <Navbar />

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">Legal</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Refund Policy</h1>
            <p className="text-slate-400 text-sm">Last updated: {LAST_UPDATED}</p>
          </div>

          <div className="space-y-6">

            <div className="bezel-card p-8 border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent">
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0">💜</div>
                <div>
                  <h2 className="text-xl font-bold mb-2">Our Promise</h2>
                  <p className="text-slate-300 leading-relaxed">
                    We want you to be completely satisfied with Scriva. If the Service doesn't work for you, we'll make it right. Our refund policy is designed to be fair and straightforward.
                  </p>
                </div>
              </div>
            </div>

            <div className="bezel-card p-8">
              <h2 className="text-xl font-bold mb-4">1. Free Plan</h2>
              <p className="text-slate-300 leading-relaxed">
                The free plan is available at no cost and requires no payment information. No refunds are applicable to the free plan as no charges are made.
              </p>
            </div>

            <div className="bezel-card p-8">
              <h2 className="text-xl font-bold mb-4">2. 7-Day Money-Back Guarantee</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                New paid subscribers are eligible for a full refund within <strong className="text-white">7 days</strong> of their first payment, provided:
              </p>
              <ul className="space-y-2 text-slate-300">
                {[
                  "This is your first paid subscription with Scriva",
                  "Your request is submitted within 7 calendar days of the initial charge",
                  "You have not previously received a refund from Scriva",
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
              <p className="text-slate-400 text-sm mt-4">
                To request a refund, email <a href="mailto:support@scriva.app" className="text-purple-400 hover:text-purple-300">support@scriva.app</a> with your account email and reason for the refund. We will process it within 3–5 business days.
              </p>
            </div>

            <div className="bezel-card p-8">
              <h2 className="text-xl font-bold mb-4">3. Renewals</h2>
              <p className="text-slate-300 leading-relaxed">
                Subscription renewals (monthly or annual) are generally non-refundable. However, if you contact us within <strong className="text-white">48 hours</strong> of a renewal charge and have not used the Service during that billing period, we will consider a refund at our discretion.
              </p>
            </div>

            <div className="bezel-card p-8">
              <h2 className="text-xl font-bold mb-4">4. Annual Plans</h2>
              <p className="text-slate-300 leading-relaxed">
                Annual plans are discounted and intended for the full year. Partial refunds for unused months are not offered after the 7-day money-back guarantee window has passed. If you downgrade to a monthly plan, the change takes effect at the next renewal date.
              </p>
            </div>

            <div className="bezel-card p-8">
              <h2 className="text-xl font-bold mb-4">5. Cancellation</h2>
              <div className="space-y-3 text-slate-300 leading-relaxed">
                <p>You can cancel your subscription at any time from your <Link href="/settings" className="text-purple-400 hover:text-purple-300">Settings page</Link>. Cancellation stops future billing and takes effect at the end of your current billing period.</p>
                <p>After cancellation, you retain access to your paid features until the end of the paid period. Your script history remains accessible on the free plan (last 5 scripts).</p>
              </div>
            </div>

            <div className="bezel-card p-8">
              <h2 className="text-xl font-bold mb-4">6. Non-Refundable Situations</h2>
              <div className="space-y-2 text-slate-300">
                <p className="mb-3">Refunds will not be issued in the following cases:</p>
                <ul className="space-y-2">
                  {[
                    "Account termination due to Terms of Service violations",
                    "Requests made after the eligible refund window",
                    "Dissatisfaction with AI output quality after extensive use",
                    "Failure to cancel before a renewal you were notified about",
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
              <h2 className="text-xl font-bold mb-4">7. Processing Refunds</h2>
              <p className="text-slate-300 leading-relaxed">
                Approved refunds are processed back to your original payment method via Stripe. Processing time is typically 3–5 business days, though your bank may take additional time to reflect the credit.
              </p>
            </div>

            <div className="bezel-card p-8 border-purple-500/20">
              <h2 className="text-xl font-bold mb-4">8. Contact Us</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                Have a question about a charge or need to request a refund? We're happy to help.
              </p>
              <a
                href="mailto:support@scriva.app"
                className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm"
              >
                Contact Support
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
