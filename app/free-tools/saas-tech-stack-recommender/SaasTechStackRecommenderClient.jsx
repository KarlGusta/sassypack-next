"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Copy,
  Cpu,
  Database,
  Gauge,
  Layers,
  Rocket,
  Server,
  Users,
} from "lucide-react";

const budgetOptions = [
  { value: "lean", label: "Lean MVP" },
  { value: "balanced", label: "Balanced startup" },
  { value: "funded", label: "Funded growth" },
];

const complexityOptions = [
  { value: "simple", label: "Simple SaaS" },
  { value: "standard", label: "Standard SaaS" },
  { value: "complex", label: "Complex platform" },
];

const audienceOptions = [
  { value: "founders", label: "Startup founders" },
  { value: "business", label: "B2B teams" },
  { value: "developers", label: "Developers" },
  { value: "enterprise", label: "Enterprise buyers" },
];

const SelectField = ({ label, icon: Icon, value, onChange, options }) => (
  <label className="block">
    <span className="mb-2 flex items-center gap-2 text-sm font-black text-[#111827]/70">
      <Icon size={17} /> {label}
    </span>
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="min-h-[52px] w-full rounded-2xl border-2 border-black bg-white px-4 text-base font-black text-[#111827] shadow-[3px_3px_0px_0px_black] outline-none"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
);

const getStackRecommendation = ({ budget, complexity, audience }) => {
  const needsSeo = audience === "founders" || audience === "business" || audience === "enterprise";
  const needsStructure = complexity === "complex" || audience === "enterprise";
  const isLeanPrototype = budget === "lean" && complexity === "simple" && audience !== "enterprise";
  const isDeveloperTool = audience === "developers";

  const useNext = needsSeo || needsStructure || !isLeanPrototype;
  const stack = useNext
    ? {
        name: "Next.js SaaS stack",
        verdict: "Choose Next.js",
        why: "It gives you marketing pages, app routes, API routes, auth callbacks, and server-rendered SEO content in one codebase.",
        frontend: "Next.js App Router, React, Tailwind CSS",
        backend: "Next.js route handlers for simple APIs, dedicated Node workers when background jobs grow",
        auth: audience === "enterprise" ? "Auth.js or Clerk with SSO-ready account modeling" : "Auth.js, Clerk, or custom JWT cookies",
      }
    : {
        name: "MERN SaaS stack",
        verdict: "Choose MERN",
        why: "It is fast to prototype when the product is mostly an authenticated dashboard and you do not need a large SEO content surface on day one.",
        frontend: "React with Vite or a lightweight SPA shell",
        backend: "Node.js and Express API with clear auth, billing, and dashboard modules",
        auth: "JWT sessions with HTTP-only cookies or a managed auth provider",
      };

  const database = (() => {
    if (audience === "enterprise" || complexity === "complex") {
      return {
        name: "PostgreSQL",
        why: "Use PostgreSQL for relational billing, team permissions, audit trails, reporting, and durable account data.",
        addon: "Add Redis for queues, rate limits, and short-lived cache.",
      };
    }

    if (!useNext && isDeveloperTool) {
      return {
        name: "MongoDB",
        why: "Use MongoDB when the core product stores flexible documents, logs, snippets, or fast-changing developer data.",
        addon: "Add PostgreSQL later only if billing, permissions, or reporting become relationally heavy.",
      };
    }

    if (budget === "lean" && complexity === "simple") {
      return {
        name: useNext ? "PostgreSQL" : "MongoDB",
        why: useNext
          ? "Use PostgreSQL so billing, users, subscriptions, and teams stay clean as the MVP grows."
          : "Use MongoDB for a quick dashboard MVP with flexible product data.",
        addon: "Skip extra infrastructure until users prove the workflow.",
      };
    }

    return {
      name: "PostgreSQL",
      why: "Use PostgreSQL as the default SaaS database because subscriptions, teams, roles, invoices, and analytics usually become relational.",
      addon: "Add object storage for uploads and Redis once you have async jobs.",
    };
  })();

  const deployment = (() => {
    if (budget === "lean") {
      return useNext
        ? "Deploy Next.js on Vercel, use managed Postgres, Stripe Checkout, and a simple email provider."
        : "Deploy the React app on Vercel or Netlify and the Express API on Render or Railway with managed MongoDB.";
    }

    if (budget === "funded" || complexity === "complex") {
      return "Use Vercel for Next.js, managed Postgres, background workers on Render/Fly/AWS, object storage, monitoring, and separate preview and production environments.";
    }

    return useNext
      ? "Deploy Next.js on Vercel with managed Postgres, Stripe webhooks, email, analytics, and error monitoring."
      : "Deploy the frontend separately from the Node API, use managed MongoDB or Postgres, and add logs before launch.";
  })();

  const architecture = [
    {
      title: "Public site",
      desc: useNext ? "Use Next.js pages for landing pages, pricing, docs, and SEO content." : "Keep a small marketing site separate from the authenticated React dashboard.",
    },
    {
      title: "App core",
      desc: `${stack.frontend} with account, billing, onboarding, and dashboard routes grouped by product workflow.`,
    },
    {
      title: "API layer",
      desc: stack.backend,
    },
    {
      title: "Data layer",
      desc: `${database.name} as the primary store. ${database.addon}`,
    },
    {
      title: "Revenue layer",
      desc: "Stripe Checkout, customer portal, webhook verification, and subscription status synced into your database.",
    },
  ];

  const tradeoffs = useNext
    ? [
        "Better for SEO pages, pricing pages, server rendering, and full-stack SaaS routes.",
        "Can feel heavier than MERN if you only need a private dashboard MVP.",
        "Works best when you keep server actions, route handlers, and background jobs clearly separated.",
      ]
    : [
        "Simple mental model for a dashboard-first MVP with a separate API.",
        "Less ideal when SEO, public content, and server-rendered product pages matter early.",
        "You will need more deployment plumbing because frontend and backend usually ship separately.",
      ];

  const alternate = useNext
    ? "Pick MERN instead if this is a private internal dashboard, budget is very tight, and SEO is not important yet."
    : "Pick Next.js instead if marketing pages, docs, pricing SEO, or server-rendered onboarding become important.";

  return {
    stack,
    database,
    deployment,
    architecture,
    tradeoffs,
    alternate,
  };
};

export default function SaasTechStackRecommenderClient() {
  const [budget, setBudget] = useState("balanced");
  const [complexity, setComplexity] = useState("standard");
  const [audience, setAudience] = useState("business");
  const [copied, setCopied] = useState(false);

  const recommendation = useMemo(
    () => getStackRecommendation({ budget, complexity, audience }),
    [budget, complexity, audience]
  );

  const copyRecommendation = async () => {
    const text = [
      "SaaS tech stack recommendation",
      "",
      `${recommendation.stack.verdict}: ${recommendation.stack.name}`,
      recommendation.stack.why,
      "",
      `Frontend: ${recommendation.stack.frontend}`,
      `Backend: ${recommendation.stack.backend}`,
      `Auth: ${recommendation.stack.auth}`,
      "",
      `Database: ${recommendation.database.name}`,
      recommendation.database.why,
      recommendation.database.addon,
      "",
      `Deployment: ${recommendation.deployment}`,
      "",
      "Architecture guide:",
      ...recommendation.architecture.map((item) => `- ${item.title}: ${item.desc}`),
      "",
      "Tradeoffs:",
      ...recommendation.tradeoffs.map((item) => `- ${item}`),
      "",
      `Alternative: ${recommendation.alternate}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#111827]">
      <section className="bg-[#FDFCF6] px-6 pb-14 pt-32">
        <div className="mx-auto max-w-7xl">
          <Link href="/free-tools" className="mb-8 inline-flex items-center gap-2 text-sm font-black text-[#6366F1]">
            <ArrowRight size={16} className="rotate-180" /> Free tools
          </Link>
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#FFE711] px-4 py-2 text-sm font-black shadow-[3px_3px_0px_0px_black]">
              <Layers size={16} /> SaaS architecture guide
            </div>
            <h1 className="text-5xl font-black leading-none tracking-tight md:text-7xl">
              Find the best tech stack for your SaaS.
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-bold leading-relaxed text-[#111827]/70">
              Pick your budget, product complexity, and audience to compare MERN vs Next.js and get a practical database and deployment recommendation.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="h-fit rounded-3xl border-2 border-black bg-[#FDFCF6] p-6 shadow-[6px_6px_0px_0px_black]">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-black bg-[#C6F6D5]">
                <Cpu size={22} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.12em] text-[#6366F1]">Stack input</p>
                <h2 className="text-2xl font-black">Describe the SaaS</h2>
              </div>
            </div>

            <div className="space-y-5">
              <SelectField label="Budget" icon={Gauge} value={budget} onChange={setBudget} options={budgetOptions} />
              <SelectField label="Complexity" icon={Layers} value={complexity} onChange={setComplexity} options={complexityOptions} />
              <SelectField label="Audience" icon={Users} value={audience} onChange={setAudience} options={audienceOptions} />
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_black]">
              <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="mb-2 text-xs font-black uppercase tracking-[0.12em] text-[#6366F1]">Recommendation</p>
                  <h2 className="text-4xl font-black leading-tight">{recommendation.stack.verdict}</h2>
                  <p className="mt-3 max-w-2xl text-base font-bold leading-relaxed text-[#111827]/65">
                    {recommendation.stack.why}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={copyRecommendation}
                  className="inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 rounded-2xl border-2 border-black bg-[#9EDCF5] px-5 font-black shadow-[3px_3px_0px_0px_black] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                >
                  <Copy size={18} /> {copied ? "Copied" : "Copy"}
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border-2 border-black bg-[#FDFCF6] p-4">
                  <div className="mb-2 flex items-center gap-2 font-black">
                    <Layers size={18} /> Stack
                  </div>
                  <p className="text-sm font-bold leading-relaxed text-[#111827]/65">{recommendation.stack.name}</p>
                </div>
                <div className="rounded-2xl border-2 border-black bg-[#FDFCF6] p-4">
                  <div className="mb-2 flex items-center gap-2 font-black">
                    <Database size={18} /> Database
                  </div>
                  <p className="text-sm font-bold leading-relaxed text-[#111827]/65">{recommendation.database.name}</p>
                </div>
                <div className="rounded-2xl border-2 border-black bg-[#FDFCF6] p-4">
                  <div className="mb-2 flex items-center gap-2 font-black">
                    <Rocket size={18} /> Deployment
                  </div>
                  <p className="text-sm font-bold leading-relaxed text-[#111827]/65">{recommendation.deployment}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <div className="rounded-3xl border-2 border-black bg-[#FDFCF6] p-6 shadow-[6px_6px_0px_0px_black]">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-black bg-[#FEBBCE]">
                    <Server size={21} />
                  </div>
                  <h2 className="text-2xl font-black">Architecture guide</h2>
                </div>
                <div className="space-y-4">
                  {recommendation.architecture.map((item) => (
                    <div key={item.title} className="rounded-2xl border-2 border-[#111827]/10 bg-white p-4">
                      <p className="text-sm font-black">{item.title}</p>
                      <p className="mt-1 text-sm font-bold leading-relaxed text-[#111827]/60">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border-2 border-black bg-[#FDFCF6] p-6 shadow-[6px_6px_0px_0px_black]">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-black bg-[#C6F6D5]">
                    <CheckCircle2 size={21} />
                  </div>
                  <h2 className="text-2xl font-black">MERN vs Next.js notes</h2>
                </div>
                <div className="space-y-3">
                  {recommendation.tradeoffs.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border-2 border-[#111827]/10 bg-white p-4">
                      <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-[#6366F1]" />
                      <p className="text-sm font-black leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border-2 border-black bg-[#FFE711] p-4">
                  <div className="mb-2 flex items-center gap-2 font-black">
                    <Database size={18} /> Database choice
                  </div>
                  <p className="text-sm font-bold leading-relaxed">
                    {recommendation.database.why}
                  </p>
                  <p className="mt-3 text-sm font-black leading-relaxed">
                    {recommendation.alternate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
