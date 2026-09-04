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
  { name: "Starter", price: "$49", desc: "For solo developers launching fast.", link: "https://karlgusta.gumroad.com/l/zgkhq?wanted=true" },
  { name: "Pro", price: "$99", desc: "Best for serious indie founders.", link: "https://karlgusta.gumroad.com/l/rqzmvd?wanted=true" },
  { name: "Team", price: "$249", desc: "For teams and multiple products.", link: "https://karlgusta.gumroad.com/l/txwnl?wanted=true" },
  { name: "Setup Assist", price: "$399", desc: "We set it up for you.", link: "https://karlgusta.gumroad.com/l/ewoxke?wanted=true" },
];

const projects = [
  { name: "FurnishlyAI", desc: "AI interior design.", logo: "/logos/furnishlyai.png", link: "https://furnishlyai.collabtower.com/" },
  { name: "CollabTower", desc: "Creator matchmaking.", logo: "/logos/collabtower.jpg", link: "https://collabtower.com" },
  { name: "Zero to SaaS", desc: "SaaS development education.", logo: "/logos/zerotosaas.png", link: "https://zero-to-saas.collabtower.com/" },
  { name: "AdPurity", desc: "Ad fraud protection.", logo: "/logos/adpurity.png", link: "https://adpurity.collabtower.com/" },
  { name: "BankConvert", desc: "Financial data tools.", logo: "/logos/bankconvert.png", link: "https://bankconvert.collabtower.com/" },
  { name: "WP Stability", desc: "WordPress maintenance.", logo: "/logos/wpstability.png", link: "https://wpstability.collabtower.com" },
];

const featuredOn = [
  {
    name: "Hacker News",
    link: "#",
    bg: "#FF6600",
    fg: "#111827",
    label: "Y",
  },
  {
    name: "Product Hunt",
    link: "#",
    bg: "#DA552F",
    fg: "#FFFFFF",
    label: "P",
  },
  {
    name: "X",
    link: "#",
    bg: "#000000",
    fg: "#FFFFFF",
    label: "X",
  },
  {
    name: "Reddit",
    link: "#",
    bg: "#FF4500",
    fg: "#FFFFFF",
    label: "r/",
  },
];

const faqItems = [
  {
    question: "What is SassyPack built with?",
    answer:
      "SassyPack is built using a modern stack: Tailwind CSS, and Next.js. It includes integrations for Clerk, Auth.js, and Stripe.",
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

const floatingCards = [
  {
    id: "auth",
    title: "Auth ready",
    subtitle: "Clerk · Auth.js",
    position: "hidden lg:flex top-[14%] left-[2%] xl:left-[5%] -rotate-3",
  },
  {
    id: "billing",
    title: "Stripe billing",
    subtitle: "Subscriptions wired",
    position: "hidden lg:flex top-[42%] left-[0%] xl:left-[2%] rotate-2",
  },
  {
    id: "setup",
    title: "Setup time",
    subtitle: "~30 minutes",
    position: "hidden lg:flex bottom-[20%] left-[3%] xl:left-[6%] -rotate-2",
  },
  {
    id: "seo",
    title: "SEO blog",
    subtitle: "OG · sitemap · meta",
    position: "hidden lg:flex top-[14%] right-[2%] xl:right-[5%] rotate-3",
  },
  {
    id: "analytics",
    title: "Analytics",
    subtitle: "PostHog included",
    position: "hidden lg:flex top-[42%] right-[0%] xl:right-[2%] -rotate-2",
  },
  {
    id: "ship",
    title: "Ship faster",
    subtitle: "Skip weeks of boilerplate",
    position: "hidden lg:flex bottom-[20%] right-[3%] xl:right-[6%] rotate-2",
  },
];

const tabletCards = [
  { id: "auth-t", title: "Auth ready", subtitle: "Clerk · Auth.js" },
  { id: "billing-t", title: "Stripe billing", subtitle: "Subscriptions wired" },
  { id: "setup-t", title: "Setup time", subtitle: "~30 minutes" },
];

const stackModules = [
  { label: "Auth", status: "Ready", color: "#22C55E" },
  { label: "Billing", status: "Ready", color: "#22C55E" },
  { label: "Dashboard", status: "Ready", color: "#22C55E" },
  { label: "Blog / SEO", status: "Ready", color: "#22C55E" },
  { label: "Analytics", status: "Ready", color: "#22C55E" },
  { label: "Protected routes", status: "Ready", color: "#22C55E" },
];

function FloatingCard({ title, subtitle, className = "" }) {
  return (
    <div
      className={`pointer-events-none absolute z-10 flex flex-col gap-0.5 rounded-xl border border-[#E5E7EB] bg-white/90 px-3.5 py-2.5 shadow-[0_8px_30px_rgba(17,24,39,0.06)] backdrop-blur-sm ${className}`}
    >
      <span className="text-[11px] font-bold tracking-tight text-[#111827]">{title}</span>
      <span className="text-[11px] font-medium text-[#6B7280]">{subtitle}</span>
    </div>
  );
}

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
      {/* ── Premium centered hero ── */}
      <section id="top" className="relative overflow-hidden px-6 pb-16 pt-28 lg:pb-24 lg:pt-36">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[16%] h-[420px] w-[min(90vw,720px)] -translate-x-1/2 rounded-full bg-[#6366F1]/[0.06] blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-6xl">
          {floatingCards.map((card) => (
            <FloatingCard
              key={card.id}
              title={card.title}
              subtitle={card.subtitle}
              className={card.position}
            />
          ))}

          <div className="relative z-20 mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#6366F1]">
              Next.js starter kit for indie founders
            </p>

            <h1 className="mt-5 text-[2.15rem] font-semibold leading-[1.12] tracking-tight text-[#111827] sm:text-5xl md:text-[3.5rem] md:leading-[1.08]">
              Launch SaaS faster.{" "}
              <span className="relative inline-block text-[#6366F1]">
                Skip the setup.
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#6366F1]/25 md:-bottom-1.5 md:h-1"
                />
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#4B5563] sm:text-lg sm:leading-8">
              Auth, billing, dashboards, analytics, and blog are ready. Build what
              customers actually pay for today — not another week of boilerplate.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/pricing"
                className={`${primaryButtonClass} w-full px-7 py-3.5 shadow-[0_10px_30px_rgba(255,127,74,0.28)] sm:w-auto`}
              >
                Get the starter kit <ArrowRight size={18} />
              </Link>
              <a href="#inside" className={`${secondaryButtonClass} w-full px-7 py-3.5 sm:w-auto`}>
                See what&apos;s inside
              </a>
            </div>

            <p className="mt-3 text-xs font-medium text-[#6B7280]">
              One-time purchase · Lifetime updates · Source code included
            </p>
          </div>

          {/* Product visual: starter kit readiness panel */}
          <div className="relative z-20 mx-auto mt-12 max-w-2xl md:mt-14">
            <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
              <div className="flex items-center gap-2 border-b border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#F87171]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FBBF24]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#34D399]" />
                <span className="ml-3 text-xs font-medium text-[#9CA3AF]">
                  sassypack · production modules
                </span>
              </div>

              <div className="grid gap-0 sm:grid-cols-2">
                {stackModules.map((mod) => (
                  <div
                    key={mod.label}
                    className="flex items-center justify-between border-b border-[#F3F4F6] px-5 py-4 last:border-b-0 sm:odd:border-r sm:[&:nth-last-child(-n+2)]:border-b-0"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#111827]">{mod.label}</p>
                      <p className="mt-0.5 text-xs text-[#6B7280]">Included out of the box</p>
                    </div>
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold"
                      style={{
                        backgroundColor: `${mod.color}18`,
                        color: mod.color,
                      }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: mod.color }}
                      />
                      {mod.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#E5E7EB] bg-[#F9FAFB] px-5 py-3.5">
                <p className="text-center text-xs font-medium text-[#6B7280]">
                  Clone → configure env → ship. No weeks of scaffolding.
                </p>
              </div>
            </div>
          </div>

          {/* Tablet: compact product signals */}
          <div className="relative z-20 mx-auto mt-8 hidden max-w-2xl grid-cols-3 gap-3 md:grid lg:hidden">
            {tabletCards.map((card) => (
              <div
                key={card.id}
                className="rounded-xl border border-[#E5E7EB] bg-white/90 px-3 py-2.5 text-center shadow-[0_4px_16px_rgba(17,24,39,0.04)]"
              >
                <p className="text-[11px] font-bold text-[#111827]">{card.title}</p>
                <p className="mt-0.5 text-[11px] font-medium text-[#6B7280]">{card.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="featured-on" className="border-t border-[#E5E7EB] bg-white px-6 py-10">
        <div className="mx-auto max-w-6xl" data-aos="fade-up">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#9CA3AF]">
            As Seen On
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {featuredOn.map((item) => (
              <a
                key={item.name}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-sm font-bold"
                  style={{ backgroundColor: item.bg, color: item.fg }}
                >
                  {item.label}
                </span>
                <span className="text-sm font-semibold text-[#111827]">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="why" className="scroll-mt-20 border-t border-[#E5E7EB] bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl" data-aos="fade-up">
            <p className={sectionLabelClass}>Why SassyPack</p>
            <h2 className={sectionTitleClass}>A focused foundation for building revenue features.</h2>
            <p className={sectionTextClass}>Save time, skip boilerplate, and focus on features that matter.</p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <div key={feature.title} className={cardClass} data-aos="fade-up" data-aos-delay={i * 80}>
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
            <div data-aos="fade-right">
              <p className={sectionLabelClass}>What&apos;s Inside</p>
              <h2 className={sectionTitleClass}>Production essentials, already wired together.</h2>
              <p className={sectionTextClass}>Everything you need for a clean SaaS launch surface.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {insideItems.map((item, i) => (
                <div
                  key={item.name}
                  className="flex items-start gap-4 rounded-lg border border-[#E5E7EB] bg-white p-5 shadow-sm"
                  data-aos="fade-up"
                  data-aos-delay={i * 60}
                >
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
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between" data-aos="fade-up">
            <div className="max-w-2xl">
              <p className={sectionLabelClass}>Pricing</p>
              <h2 className={sectionTitleClass}>SassyPack | Next.js starter kit</h2>
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
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex min-h-[168px] flex-col">
                  <h3 className="text-base font-semibold text-[#111827]">{plan.name}</h3>
                  <p className="mt-4 text-4xl font-semibold tracking-tight text-[#111827]">{plan.price}</p>
                  <p className="mt-4 text-sm leading-6 text-[#6B7280]">{plan.desc}</p>
                </div>
                <a
                  href={plan.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${primaryButtonClass} mt-6 w-full`}
                >
                  Get {plan.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="usedby" className="border-t border-[#E5E7EB] bg-[#F8FAFC] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center" data-aos="fade-up">
            <p className={sectionLabelClass}>Proven in Production</p>
            <h2 className={sectionTitleClass}>Used to launch real products.</h2>
            <p className={`${sectionTextClass} mx-auto max-w-2xl`}>
              Trusted by serious SaaS teams to accelerate their launch.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <a
                key={project.name}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-[#E5E7EB] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#CBD5E1] hover:shadow-md"
                data-aos="fade-up"
                data-aos-delay={i * 80}
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
          <div className="text-center" data-aos="fade-up">
            <p className={sectionLabelClass}>FAQ</p>
            <h2 className={sectionTitleClass}>Answers before you buy.</h2>
          </div>

          <div className="mt-10 space-y-3">
            {faqItems.map((item, index) => (
              <div
                key={item.question}
                className="overflow-hidden rounded-lg border border-[#E5E7EB] bg-white shadow-sm"
                data-aos="fade-up"
                data-aos-delay={index * 60}
              >
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
        <div className="mx-auto max-w-3xl" data-aos="fade-up">
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
