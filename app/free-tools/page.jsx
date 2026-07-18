import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  Code2,
  CreditCard,
  FileCode2,
  ExternalLink,
  KeyRound,
  Layers,
  Lightbulb,
  Megaphone,
  Rocket,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "Free SaaS Tools | Pricing, Stripe & Launch Tools",
  description:
    "Browse free SaaS tools from SassyPack, including pricing calculators, landing page copy, Stripe tools, SaaS idea validation, Next.js architecture, auth flow diagrams, and deployment checklists.",
  alternates: {
    canonical: "https://sassypack.collabtower.com/free-tools",
  },
};

const tools = [
  {
    title: "SaaS Pricing Page Generator",
    desc: "Generate SaaS pricing tiers, feature breakdowns, and CTA copy from your SaaS type, audience, and pricing model.",
    href: "/free-tools/saas-pricing-page-generator",
    icon: Sparkles,
    color: "bg-[#C6F6D5]",
    tags: ["Pricing tiers", "Feature breakdown", "CTA copy"],
    seo: "SaaS pricing page generator",
  },
  {
    title: "Stripe Subscription Setup Checker",
    desc: "Paste a Stripe setup snippet to find missing webhooks, common subscription misconfigurations, and a recommended Next.js flow.",
    href: "/free-tools/stripe-subscription-setup-checker",
    icon: CreditCard,
    color: "bg-[#9EDCF5]",
    tags: ["Webhook checker", "Checkout setup", "Next.js flow"],
    seo: "Stripe webhook checker",
  },
  {
    title: "SaaS Idea Validator",
    desc: "Enter a SaaS idea to generate an MVP feature list, a build-in-two-weeks scope, and a complexity risk level.",
    href: "/free-tools/saas-idea-validator",
    icon: Lightbulb,
    color: "bg-[#FFE37E]",
    tags: ["MVP features", "2-week scope", "Risk level"],
    seo: "SaaS idea validator",
  },
  {
    title: "Next.js SaaS Folder Structure Generator",
    desc: "Generate a scalable Next.js SaaS boilerplate structure for auth, billing, dashboard pages, API routes, and shared code.",
    href: "/free-tools/nextjs-saas-folder-structure-generator",
    icon: Code2,
    color: "bg-[#FEBBCE]",
    tags: ["Auth folders", "Billing routes", "API structure"],
    seo: "Next.js project structure generator",
  },
  {
    title: "Auth Flow Visualizer",
    desc: "Generate a JWT or session auth diagram with Google/GitHub OAuth and a step-by-step Next.js request lifecycle.",
    href: "/auth-flow-visualizer",
    icon: KeyRound,
    color: "bg-[#C6F6D5]",
    tags: ["JWT diagram", "OAuth flow", "Request lifecycle"],
    seo: "JWT authentication flow diagram",
  },
  {
    title: "SaaS Deployment Checklist Generator",
    desc: "Select Next.js, Node, MongoDB, PostgreSQL, and hosting options to generate deploy tasks, environment variables, and production checks.",
    href: "/free-tools/saas-deployment-checklist-generator",
    icon: Rocket,
    color: "bg-[#9EDCF5]",
    tags: ["Env vars", "Deploy tasks", "Launch checklist"],
    seo: "deploy SaaS checklist",
  },
  {
    title: "Stripe Pricing Calculator",
    desc: "Model API-call costs, expected usage, Stripe fees, and margins to calculate break-even points and usage-based pricing recommendations.",
    href: "/free-tools/stripe-pricing-calculator",
    icon: Calculator,
    color: "bg-[#FFE37E]",
    tags: ["Break-even", "Usage pricing", "Margins"],
    seo: "SaaS pricing calculator",
  },
  {
    title: "SaaS Landing Page Copy Generator",
    desc: "Enter product name, niche, and audience to generate hero copy, benefits, CTA copy, and FAQ content.",
    href: "/free-tools/saas-landing-page-copy-generator",
    icon: Megaphone,
    color: "bg-[#C6F6D5]",
    tags: ["Hero copy", "Benefits", "FAQ"],
    seo: "SaaS landing page generator",
  },
  {
    title: "Environment Variables Generator",
    desc: "Select Next.js, Stripe, auth, and database options to generate a ready .env template with clear notes for every variable.",
    href: "/free-tools/saas-environment-variables-generator",
    icon: FileCode2,
    color: "bg-[#9EDCF5]",
    tags: [".env template", "Stripe keys", "Auth secrets"],
    seo: "Next.js environment variables template",
  },
  {
    title: "SaaS Tech Stack Recommender",
    desc: "Choose budget, complexity, and audience to get a Nextjs vs Next.js recommendation with database and deployment guidance.",
    href: "/free-tools/saas-tech-stack-recommender",
    icon: Layers,
    color: "bg-[#FEBBCE]",
    tags: ["Nextjs vs Next.js", "Database choice", "Deployment setup"],
    seo: "best tech stack for SaaS",
  },
];

const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF7F4A] px-5 py-3 text-sm font-semibold text-[#111827] transition hover:bg-[#FF7F4A]";
const secondaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-5 py-3 text-sm font-semibold text-[#111827] transition hover:border-[#111827]";
const cardClass = "rounded-lg border border-[#E5E7EB] bg-white shadow-sm";

export default function FreeToolsPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#111827]">
      <section className="px-6 pb-16 pt-28 lg:pb-20 lg:pt-36">
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-semibold text-[#4B5563] shadow-sm">
            <CheckCircle2 size={16} /> Free founder tools
          </div>
          <h1 className="mt-7 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
            Free SaaS tools for faster launch decisions.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4B5563] md:text-xl">
            Pick a focused tool, open its dedicated page, and get a practical output you can use while building or launching your SaaS.
          </p>
          <Link href="/use-cases" className={`${primaryButtonClass} mt-8`}>
            Explore use cases <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section className="border-t border-[#E5E7EB] bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6366F1]">Tool library</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">Choose a tool</h2>
            </div>
            <Link href="/use-cases" className={secondaryButtonClass}>
              Explore use cases <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={`${cardClass} group p-6 transition hover:-translate-y-1 hover:shadow-md`}
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${tool.color} text-[#111827]`}>
                    <tool.icon size={22} />
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2 text-xs font-semibold text-[#4B5563] transition group-hover:border-[#CBD5E1] group-hover:bg-white">
                    Open <ExternalLink size={13} />
                  </span>
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6366F1]">{tool.seo}</p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight text-[#111827]">{tool.title}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#4B5563]">{tool.desc}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {tool.tags.map((tag) => (
                    <span key={tag} className="rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-1.5 text-xs font-medium text-[#6B7280]">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#E5E7EB] bg-[#F8FAFC] px-6 py-20">
        <div className={`${cardClass} mx-auto flex max-w-6xl flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between`}>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6366F1]">Next step</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Match the tools to a launch use case.</h2>
          </div>
          <Link href="/use-cases" className={primaryButtonClass}>
            View use cases <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
