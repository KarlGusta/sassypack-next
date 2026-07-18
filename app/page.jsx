"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Rocket,
  Clock,
  BookOpen,
  Settings2,
  ArrowRight,
  Plus,
  BarChart3,
  ShieldCheck,
  Layout,
  UserCircle,
  CreditCard,
  Search,
  Globe,
} from "lucide-react";

const features = [
  { title: "Saves Time", desc: "Skip weeks of setup with production-ready code.", icon: Clock },
  { title: "Beginner-Friendly", desc: "Readable, modular, and easy to extend.", icon: BookOpen },
  { title: "Easy to Customize", desc: "Change styling or logic without breaking structure.", icon: Settings2 },
  { title: "Scales Easily", desc: "Grow your app confidently from day one.", icon: Rocket },
  { title: "SEO Blog", desc: "Built-in content system for organic growth.", icon: Search },
  { title: "Lifetime Updates", desc: "Always improving with new integrations.", icon: Globe },
];

const insideItems = [
  { name: "Landing Page", icon: Layout },
  { name: "Auth System", icon: ShieldCheck },
  { name: "Protected Routes", icon: ShieldCheck },
  { name: "Navbar & Footer", icon: Layout },
  { name: "Profile Page", icon: UserCircle },
  { name: "Payments", icon: CreditCard },
  { name: "PostHog Analytics", icon: BarChart3 },
  { name: "OG Image Setup", icon: Globe },
  { name: "SEO-Ready Blog", icon: Search },
];

const plans = [
  { name: "Starter", price: "$49", desc: "For solo developers launching fast." },
  { name: "Pro", price: "$99", desc: "Best for serious indie founders." },
  { name: "Team / Extended", price: "$199", desc: "For teams and multiple products." },
  { name: "Done For You", price: "Custom", desc: "We set it up for you." },
];

const projects = [
  { name: "FurnishlyAI", desc: "AI interior design.", logo: "/logos/furnishlyai.png", link: "https://furnishlyai.collabtower.com/" },
  { name: "CollabTower", desc: "Creator matchmaking.", logo: "/logos/collabtower.jpg", link: "https://collabtower.com" },
  { name: "Zero to SaaS", desc: "SaaS development education.", logo: "/logos/zerotosaas.png", link: "https://zero-to-saas.collabtower.com/" },
  { name: "AdPurity", desc: "Ad fraud protection.", logo: "/logos/adpurity.png", link: "https://adpurity.collabtower.com/" },
  { name: "BankConvert", desc: "Financial data tools.", logo: "/logos/bankconvert.png", link: "https://bankconvert.collabtower.com/" },
  { name: "WP Stability", desc: "WordPress maintenance.", logo: "/logos/wpstability.png", link: "https://wpstability.collabtower.com" },
];

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

const sectionLabelClass = "text-sm font-semibold uppercase tracking-[0.18em] text-[#6366F1]";
const sectionTitleClass = "mt-3 text-3xl font-semibold tracking-tight text-[#111827] md:text-5xl";
const sectionTextClass = "mt-4 text-base leading-7 text-[#4B5563] md:text-lg";
const cardClass = "rounded-lg border border-[#E5E7EB] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md";
const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF7F4A] px-6 py-3 text-sm font-semibold text-[#111827] transition hover:bg-[#FF7F4A]";
const secondaryButtonClass =
  "inline-flex items-center justify-center rounded-lg border border-[#D1D5DB] bg-white px-6 py-3 text-sm font-semibold text-[#111827] transition hover:border-[#111827]";

export default function LandingPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#111827]">
      <section id="top" className="px-6 pb-16 pt-28 lg:pb-20 lg:pt-36">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex items-center rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-semibold text-[#4B5563] shadow-sm">
              Next.js starter kit
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-semibold tracking-tight text-[#111827] md:text-7xl">
              Launch SaaS faster. <span className="text-[#6366F1]">Skip the setup.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4B5563] md:text-xl">
              Auth, billing, dashboards, analytics, and blog are ready. Build what customers actually pay for today.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/pricing" className={primaryButtonClass}>
                Get the starter kit <ArrowRight size={18} />
              </Link>
              <a href="#inside" className={secondaryButtonClass}>
                See what's inside
              </a>
            </div>

            <p className="mt-5 text-sm font-medium text-[#6B7280]">
              One-time purchase · Lifetime updates · Source code included
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {[
              ["Setup time", "30 min", "From clone to local app"],
              ["Included modules", "9", "Auth, billing, SEO, analytics"],
              ["Used by", "6+", "Production SaaS projects"],
            ].map(([label, value, detail]) => (
              <div key={label} className={cardClass}>
                <p className="text-sm font-medium text-[#6B7280]">{label}</p>
                <p className="mt-3 text-4xl font-semibold tracking-tight text-[#111827]">{value}</p>
                <p className="mt-2 text-sm leading-6 text-[#4B5563]">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="why" className="scroll-mt-20 border-t border-[#E5E7EB] bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className={sectionLabelClass}>Why SassyPack</p>
            <h2 className={sectionTitleClass}>A focused foundation for building revenue features.</h2>
            <p className={sectionTextClass}>Save time, skip boilerplate, and focus on features that matter.</p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className={cardClass}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EEF2FF] text-[#4F46E5]">
                  <feature.icon size={20} />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-[#111827]">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#4B5563]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="inside" className="scroll-mt-20 border-t border-[#E5E7EB] bg-[#F8FAFC] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className={sectionLabelClass}>What's Inside</p>
              <h2 className={sectionTitleClass}>Production essentials, already wired together.</h2>
              <p className={sectionTextClass}>Everything you need for a clean SaaS launch surface.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {insideItems.map((item) => (
                <div key={item.name} className="flex items-start gap-4 rounded-lg border border-[#E5E7EB] bg-white p-5 shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F9FAFB] text-[#111827]">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#111827]">{item.name}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#6B7280]">Essential feature included out of the box.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-20 border-t border-[#E5E7EB] bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className={sectionLabelClass}>Pricing</p>
              <h2 className={sectionTitleClass}>Simple plans, no subscription math.</h2>
            </div>
            <p className="max-w-md text-base leading-7 text-[#4B5563]">Choose the plan that fits your launch path.</p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`rounded-lg border bg-white p-6 shadow-sm ${
                  index === 1 ? "border-[#6366F1] ring-2 ring-[#6366F1]/10" : "border-[#E5E7EB]"
                }`}
              >
                <div className="flex min-h-[168px] flex-col">
                  <h3 className="text-base font-semibold text-[#111827]">{plan.name}</h3>
                  <p className="mt-4 text-4xl font-semibold tracking-tight text-[#111827]">{plan.price}</p>
                  <p className="mt-4 text-sm leading-6 text-[#6B7280]">{plan.desc}</p>
                </div>
                <Link href="/pricing" className={`${primaryButtonClass} mt-6 w-full`}>
                  View {plan.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="usedby" className="border-t border-[#E5E7EB] bg-[#F8FAFC] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className={sectionLabelClass}>Proven in Production</p>
            <h2 className={sectionTitleClass}>Used to launch real products.</h2>
            <p className={`${sectionTextClass} mx-auto max-w-2xl`}>
              Trusted by serious SaaS teams to accelerate their launch.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <a
                key={project.name}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-[#E5E7EB] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#CBD5E1] hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-2">
                    <img src={project.logo} alt={project.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#111827]">{project.name}</h3>
                    <p className="mt-1 text-sm text-[#6B7280]">{project.desc}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-20 border-t border-[#E5E7EB] bg-white px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className={sectionLabelClass}>FAQ</p>
            <h2 className={sectionTitleClass}>Answers before you buy.</h2>
          </div>

          <div className="mt-10 space-y-3">
            {faqItems.map((item, index) => (
              <div key={item.question} className="overflow-hidden rounded-lg border border-[#E5E7EB] bg-white shadow-sm">
                <button
                  className="flex w-full items-center justify-between gap-4 p-5 text-left text-base font-semibold text-[#111827]"
                  onClick={() => toggleFAQ(index)}
                  type="button"
                >
                  {item.question}
                  <Plus
                    className={`shrink-0 text-[#6B7280] transition-transform duration-300 ${
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
                  <div className="px-5 pb-5 text-sm leading-6 text-[#4B5563]">{item.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#E5E7EB] bg-[#F8FAFC] px-6 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <p className={sectionLabelClass}>Ready to launch</p>
          <h2 className={sectionTitleClass}>Ship your SaaS today, the fast way.</h2>
          <p className={`${sectionTextClass} mx-auto max-w-2xl`}>
            Proven in real production environments used by serious SaaS teams.
          </p>
          <Link href="/pricing" className={`${primaryButtonClass} mt-8`}>
            Get SassyPack Now <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
