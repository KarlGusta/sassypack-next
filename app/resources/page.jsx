"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  CheckSquare,
  Code2,
  FileText,
  FolderTree,
  GitCompare,
  Layers,
  ListChecks,
  Rocket,
  Search,
  Settings2,
  Sparkles,
  Wrench,
} from "lucide-react";

const sectionLabelClass = "text-sm font-semibold uppercase tracking-[0.18em] text-[#6366F1]";
const sectionTitleClass = "mt-3 text-3xl font-semibold tracking-tight text-[#111827] md:text-5xl";
const sectionTextClass = "mt-4 text-base leading-7 text-[#4B5563] md:text-lg";
const cardClass =
  "rounded-lg border border-[#E5E7EB] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md";
const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF7F4A] px-6 py-3 text-sm font-semibold text-[#111827] transition hover:bg-[#FF7F4A]";
const secondaryButtonClass =
  "inline-flex items-center justify-center rounded-lg border border-[#D1D5DB] bg-white px-6 py-3 text-sm font-semibold text-[#111827] transition hover:border-[#111827]";

const freeTools = [
  {
    name: "SaaS Pricing Page Generator",
    desc: "Generate a pricing page structure in seconds.",
    href: "/free-tools/saas-pricing-page-generator",
    icon: Layers,
  },
  {
    name: "Stripe Pricing Calculator",
    desc: "Model plans, fees, and take-home revenue.",
    href: "/free-tools/stripe-pricing-calculator",
    icon: Calculator,
  },
  {
    name: "Stripe Subscription Setup Checker",
    desc: "Catch gaps before you go live with billing.",
    href: "/free-tools/stripe-subscription-setup-checker",
    icon: CheckSquare,
  },
  {
    name: "SaaS Deployment Checklist Generator",
    desc: "A tailored checklist before you ship to prod.",
    href: "/free-tools/saas-deployment-checklist-generator",
    icon: ListChecks,
  },
  {
    name: "SaaS Environment Variables Generator",
    desc: "Scaffold a clean .env for your stack.",
    href: "/free-tools/saas-environment-variables-generator",
    icon: Settings2,
  },
  {
    name: "Next.js SaaS Folder Structure Generator",
    desc: "Get a sensible project layout instantly.",
    href: "/free-tools/nextjs-saas-folder-structure-generator",
    icon: FolderTree,
  },
  {
    name: "SaaS Idea Validator",
    desc: "Stress-test your idea before you build.",
    href: "/free-tools/saas-idea-validator",
    icon: Sparkles,
  },
  {
    name: "SaaS Landing Page Copy Generator",
    desc: "Draft landing page copy that converts.",
    href: "/free-tools/saas-landing-page-copy-generator",
    icon: FileText,
  },
  {
    name: "SaaS Tech Stack Recommender",
    desc: "Get a stack recommendation for your project.",
    href: "/free-tools/saas-tech-stack-recommender",
    icon: Code2,
  },
];

const guides = [
  {
    title: "Next.js Starter Kit Guide",
    desc: "Everything to know before choosing a SaaS starter.",
    href: "/nextjs-saas-starter-kit",
  },
  {
    title: "SaaS Launch Guide",
    desc: "A complete roadmap from idea to paying customers.",
    href: "/saas-launch-guide",
  },
  {
    title: "SaaS Authentication Boilerplate",
    desc: "Auth patterns that hold up in production.",
    href: "/saas-authentication-boilerplate",
  },
  {
    title: "Stripe SaaS Payments Integration",
    desc: "Wire up subscriptions and billing the right way.",
    href: "/stripe-saas-payments-integration",
  },
];

const comparisons = [
  { title: "Compare Next.js Starter Kits", href: "/vs" },
  { title: "Nextjs Stack SaaS Boilerplate", href: "/Nextjs-stack-saas-boilerplate" },
  { title: "Nextjs SaaS Starter Kit", href: "/Nextjs-saas-starter-kit" },
];

const learningPaths = [
  { level: "Beginner", desc: "Build your first SaaS with Next.js." },
  { level: "Intermediate", desc: "Authentication, payments, and production deployment." },
  { level: "Advanced", desc: "Scaling, analytics, SEO, and monetization." },
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#111827]">
      <section className="px-6 pb-16 pt-28 lg:pb-20 lg:pt-36">
        <div className="mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-semibold text-[#4B5563] shadow-sm">
            <BookOpen size={16} /> Resources
          </div>
          <h1 className="mx-auto mt-7 max-w-3xl text-5xl font-semibold tracking-tight text-[#111827] md:text-6xl">
            Everything you need to build, launch, and grow a SaaS.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#4B5563]">
            Free guides, tools, and templates for developers and indie founders shipping with Next.js.
          </p>
          <div className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 shadow-sm">
            <Search size={18} className="text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF]"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-[#E5E7EB] bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className={sectionLabelClass}>Featured Guides</p>
          <h2 className={sectionTitleClass}>Start here.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {guides.map((guide) => (
              <Link key={guide.title} href={guide.href} className={cardClass}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EEF2FF] text-[#4F46E5]">
                  <BookOpen size={20} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#111827]">{guide.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#4B5563]">{guide.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#6366F1]">
                  Read Guide <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#E5E7EB] bg-[#F8FAFC] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className={sectionLabelClass}>Free Tools</p>
          <h2 className={sectionTitleClass}>Ship faster with instant generators.</h2>
          <p className={sectionTextClass}>No signup required. Built for developers and founders.</p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {freeTools.map((tool) => (
              <Link key={tool.name} href={tool.href} className={cardClass}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F9FAFB] text-[#111827]">
                  <tool.icon size={20} />
                </div>
                <h3 className="mt-5 text-base font-semibold text-[#111827]">{tool.name}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6B7280]">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#E5E7EB] bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className={sectionLabelClass}>Comparisons</p>
          <h2 className={sectionTitleClass}>See how SassyPack stacks up.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {comparisons.map((item) => (
              <Link key={item.title} href={item.href} className={cardClass}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EEF2FF] text-[#4F46E5]">
                  <GitCompare size={20} />
                </div>
                <h3 className="mt-5 text-base font-semibold text-[#111827]">{item.title}</h3>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#6366F1]">
                  Compare <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#E5E7EB] bg-[#F8FAFC] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className={sectionLabelClass}>Learning Paths</p>
          <h2 className={sectionTitleClass}>Pick your starting point.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {learningPaths.map((path) => (
              <div key={path.level} className={cardClass}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F9FAFB] text-[#111827]">
                  <Rocket size={20} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#111827]">{path.level}</h3>
                <p className="mt-2 text-sm leading-6 text-[#4B5563]">{path.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#E5E7EB] bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div>
              <p className={sectionLabelClass}>Latest Articles</p>
              <h2 className={sectionTitleClass}>From the blog.</h2>
            </div>
            <Link href="/blog" className={secondaryButtonClass}>
              View all posts
            </Link>
          </div>
          <p className={sectionTextClass}>
            Guides and write-ups on building, launching, and growing SaaS products with Next.js.
          </p>
        </div>
      </section>

      <section className="border-t border-[#E5E7EB] bg-[#F8FAFC] px-6 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <p className={sectionLabelClass}>Ready to launch</p>
          <h2 className={sectionTitleClass}>Stop configuring. Start building.</h2>
          <p className={`${sectionTextClass} mx-auto max-w-2xl`}>
            One-time purchase. Lifetime updates. Source code included.
          </p>
          <Link href="/pricing" className={`${primaryButtonClass} mt-8`}>
            Get SassyPack <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
