import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock,
  Code2,
  CreditCard,
  Globe,
  Layout,
  Lightbulb,
  Rocket,
  Search,
  Settings2,
  ShieldCheck,
  TrendingUp,
  UserCircle,
  Zap,
} from "lucide-react";

export const metadata = {
  title: "Why SassyPack? | Ship Your SaaS Faster",
  description:
    "Save time, skip boilerplate, and focus on features that matter. See why founders choose SassyPack to ship production-ready SaaS faster.",
  alternates: {
    canonical: "https://sassypack.collabtower.com/why",
  },
};

const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF7F4A] px-6 py-3 text-sm font-semibold text-[#111827] transition hover:bg-[#FF7F4A]";
const secondaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-5 py-3 text-sm font-semibold text-[#111827] transition hover:border-[#111827]";
const cardClass = "rounded-lg border border-[#E5E7EB] bg-white shadow-sm";

const benefits = [
  {
    title: "Saves Time",
    desc: "Skip weeks of setup with production-ready code. What would normally take days to build is already done.",
    icon: Clock,
    details: "Pre-built authentication, payments, database setup, and deployment configuration.",
  },
  {
    title: "Beginner-Friendly",
    desc: "Readable, modular, and easy to extend. Learn best practices while building.",
    icon: BookOpen,
    details: "Clean code structure with inline comments and well-organized components.",
  },
  {
    title: "Easy to Customize",
    desc: "Change styling or logic without breaking structure. Built for flexibility.",
    icon: Settings2,
    details: "Modular components and clean separation of concerns make customization straightforward.",
  },
  {
    title: "Scales Easily",
    desc: "Grow your app confidently from day one. Architecture handles production loads.",
    icon: Rocket,
    details: "Optimized database queries, caching strategies, and scalable infrastructure setup.",
  },
  {
    title: "SEO Blog",
    desc: "Built-in content system for organic growth and long-term visibility.",
    icon: Search,
    details: "File-based blog architecture with automatic SEO optimization and sitemap generation.",
  },
  {
    title: "Lifetime Updates",
    desc: "Always improving with new integrations and features.",
    icon: Globe,
    details: "One-time purchase includes all future versions and security updates.",
  },
];

const problems = [
  {
    emoji: "⏳",
    title: "Weeks Lost to Setup",
    desc: "Building authentication, payments, database structure, and deployment takes weeks. With SassyPack, you get all of this in minutes.",
  },
  {
    emoji: "🐛",
    title: "Security and Compliance Issues",
    desc: "Implementing secure authentication, PCI compliance for payments, and data protection from scratch is error-prone. SassyPack follows industry best practices.",
  },
  {
    emoji: "🧩",
    title: "Integration Headaches",
    desc: "Connecting Stripe, analytics, email services, and SEO tools requires tedious debugging and configuration. Everything is pre-configured.",
  },
  {
    emoji: "📊",
    title: "Missed Growth Opportunities",
    desc: "Without a built-in blog or SEO foundation, you miss organic traffic and user engagement. SassyPack includes a production-ready content system.",
  },
];

const included = [
  { name: "Landing Page", icon: Layout },
  { name: "Auth System", icon: ShieldCheck },
  { name: "Protected Routes", icon: ShieldCheck },
  { name: "Navbar & Footer", icon: Layout },
  { name: "Profile Page", icon: UserCircle },
  { name: "Payments (Stripe)", icon: CreditCard },
  { name: "Analytics", icon: BarChart3 },
  { name: "SEO Optimization", icon: Globe },
  { name: "Blog System", icon: Search },
];

const comparisonRows = [
  { feature: "Authentication", sassypack: true, scratch: false },
  { feature: "Stripe Integration", sassypack: true, scratch: false },
  { feature: "Database Setup", sassypack: true, scratch: false },
  { feature: "Landing Page Template", sassypack: true, scratch: false },
  { feature: "Blog System", sassypack: true, scratch: false },
  { feature: "SEO Optimization", sassypack: true, scratch: false },
  { feature: "Email Transactional Setup", sassypack: true, scratch: false },
  { feature: "Production-Ready Code", sassypack: true, scratch: false },
  { feature: "Setup Time", sassypack: "30 mins", scratch: "2-4 weeks" },
];

const useCases = [
  {
    title: "Solo Founders",
    description: "Launch your idea fast without hiring a developer. Get to market weeks faster.",
    icon: Lightbulb,
  },
  {
    title: "Indie Hackers",
    description: "Build side projects that generate revenue. Focus on your unique idea.",
    icon: Zap,
  },
  {
    title: "Agency Owners",
    description: "Deliver client projects faster with less setup time. Increase profitability.",
    icon: TrendingUp,
  },
  {
    title: "Early-Stage Startups",
    description: "Save runway and get to product-market fit faster. Iterate on what matters.",
    icon: Rocket,
  },
  {
    title: "Junior Developers",
    description: "Learn production-best practices while shipping real products.",
    icon: BookOpen,
  },
  {
    title: "Teams Building SaaS",
    description: "Collaborate on a solid foundation. Spend time on differentiation.",
    icon: Code2,
  },
];

export default function WhyPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#111827]">
      {/* Hero */}
      <section className="px-6 pb-16 pt-32 lg:pt-40">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">Why SassyPack?</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#4B5563] md:text-xl">
            Save time, skip boilerplate, and focus on features that matter. Ship your SaaS
            faster with production-ready code.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
            Key Benefits
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className={`${cardClass} p-6`}>
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-[#E5E7EB] bg-[#F8FAFC]">
                  <benefit.icon size={22} className="text-[#6366F1]" />
                </div>
                <h3 className="text-lg font-semibold">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#4B5563]">{benefit.desc}</p>
                <p className="mt-3 text-xs leading-5 text-[#6B7280]">{benefit.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            The Problem with Starting from Scratch
          </h2>
          <div className="mt-10 grid gap-5">
            {problems.map((problem) => (
              <div key={problem.title} className={`${cardClass} p-6`}>
                <div className="flex gap-4">
                  <div className="text-2xl">{problem.emoji}</div>
                  <div>
                    <h3 className="text-lg font-semibold">{problem.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#4B5563]">{problem.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
            What&apos;s Inside
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {included.map((item) => (
              <div key={item.name} className={`${cardClass} flex items-start gap-4 p-5`}>
                <div className="mt-0.5">
                  <item.icon size={20} className="text-[#6366F1]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{item.name}</h3>
                  <p className="mt-1 text-xs text-[#6B7280]">Included out of the box</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
            SassyPack vs Starting from Scratch
          </h2>
          <div className={`${cardClass} mt-12 overflow-x-auto`}>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#F8FAFC]">
                  <th className="border-b border-[#E5E7EB] px-6 py-4 text-left font-semibold">Feature</th>
                  <th className="border-b border-[#E5E7EB] px-6 py-4 text-center font-semibold">SassyPack</th>
                  <th className="border-b border-[#E5E7EB] px-6 py-4 text-center font-semibold">From Scratch</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="border-b border-[#E5E7EB] last:border-0">
                    <td className="px-6 py-4 font-medium text-[#111827]">{row.feature}</td>
                    <td className="px-6 py-4 text-center">
                      {typeof row.sassypack === "boolean" ? (
                        row.sassypack ? (
                          <CheckCircle2 className="inline text-[#22C55E]" size={20} />
                        ) : (
                          <span className="text-[#9CA3AF]">—</span>
                        )
                      ) : (
                        <span className="font-semibold text-[#22C55E]">{row.sassypack}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {typeof row.scratch === "boolean" ? (
                        row.scratch ? (
                          <CheckCircle2 className="inline text-[#22C55E]" size={20} />
                        ) : (
                          <span className="text-[#9CA3AF]">—</span>
                        )
                      ) : (
                        <span className="font-semibold text-red-500">{row.scratch}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
            Who Should Use SassyPack?
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((useCase) => (
              <div key={useCase.title} className={`${cardClass} p-6`}>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#111827] text-white">
                  <useCase.icon size={18} />
                </div>
                <h3 className="text-lg font-semibold">{useCase.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#4B5563]">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#111827] px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Ready to Ship Faster?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Join hundreds of developers and founders building SaaS with SassyPack.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/pricing" className={primaryButtonClass}>
              View Pricing <ArrowRight size={18} />
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40"
            >
              See FAQ
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}