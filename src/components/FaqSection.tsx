"use client";

import { useState } from "react";

interface Faq {
  q: string;
  a: string;
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bezel-card overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/2 transition-colors"
      >
        <span className="font-medium text-sm pr-4">{question}</span>
        <span className={`text-purple-400 transition-transform duration-300 flex-shrink-0 ${open ? "rotate-45" : ""}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96" : "max-h-0"}`}>
        <p className="px-5 pb-5 text-sm text-slate-400 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function FaqSection({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <FaqItem key={faq.q} question={faq.q} answer={faq.a} />
      ))}
    </div>
  );
}
