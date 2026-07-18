"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";

const faqItems = [
  {
    question: "What is SassyPack built with?",
    answer:
      "SassyPack is built using a modern stack: React, Tailwind CSS, and Next.js/Vite. It includes integrations for Clerk, Auth.js, and Stripe.",
  },
  {
    question: "Is this a one-time purchase?",
    answer: "Yes, SassyPack is a one-time purchase and includes lifetime updates. No recurring fees.",
  },
  {
    question: "What level of support is included?",
    answer:
      "Includes detailed documentation and access to a private Discord community. Dedicated 1:1 support can be purchased separately.",
  },
  {
    question: "Can I use SassyPack for multiple projects?",
    answer: "The Starter license is for one project. The Team license allows usage across multiple projects and team members.",
  },
  {
    question: "How long does setup take?",
    answer: "Initial setup takes less than 30 minutes to get from clone to a live development environment.",
  },
];

export const metadata = {
  title: "FAQ | SassyPack",
  description: "Answers to common questions about SassyPack before you buy.",
};

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-6 py-28 text-[#18181B] lg:py-36">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#18181B]">FAQ</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
            Answers before you buy.
          </h1>
          <p className="mt-5 text-base leading-7 text-[#52525B] md:text-lg">
            Everything you need to know about SassyPack. Can't find it here? Reach out directly.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {faqItems.map((item, index) => (
            <div
              key={item.question}
              className="overflow-hidden rounded-lg border border-[#E4E4E7] bg-white"
            >
              <button
                className="flex w-full items-center justify-between gap-4 p-5 text-left text-base font-semibold text-[#18181B]"
                onClick={() => toggleFAQ(index)}
                type="button"
                aria-expanded={openIndex === index}
              >
                {item.question}
                <Plus
                  className={`shrink-0 text-[#52525B] transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : ""
                  }`}
                  size={20}
                />
              </button>
              <div
                className={`transition-all duration-300 ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 overflow-hidden opacity-0"
                }`}
              >
                <div className="border-t border-[#E4E4E7] px-5 pb-5 pt-4 text-sm leading-6 text-[#52525B]">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-lg border border-[#E4E4E7] bg-white p-8 text-center">
          <p className="text-lg font-semibold text-[#18181B]">Still have questions?</p>
          <p className="mt-2 text-sm leading-6 text-[#52525B]">
            Get the full breakdown of what's included on the pricing page.
          </p>
          <Link
            href="/pricing"
            className="mt-5 inline-flex items-center justify-center gap-2 text-sm font-semibold text-[#18181B] underline underline-offset-4 decoration-[#A1A1AA]"
          >
            View pricing <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
