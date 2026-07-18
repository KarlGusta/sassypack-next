"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Copy,
  Database,
  Rocket,
  Server,
  ShieldCheck,
} from "lucide-react";

const frontendOptions = [
  { value: "nextjs", label: "Next.js" },
  { value: "node", label: "Node app/API" },
];

const databaseOptions = [
  { value: "mongodb", label: "MongoDB" },
  { value: "postgresql", label: "PostgreSQL" },
];

const hostOptions = [
  { value: "vercel", label: "Vercel" },
  { value: "railway", label: "Railway" },
  { value: "render", label: "Render" },
  { value: "docker", label: "Docker/VPS" },
];

const baseEnvVars = [
  "NODE_ENV=production",
  "APP_URL=https://yourdomain.com",
  "AUTH_SECRET=...",
  "STRIPE_SECRET_KEY=...",
  "STRIPE_WEBHOOK_SECRET=...",
  "EMAIL_FROM=hello@yourdomain.com",
  "SMTP_HOST=...",
  "SMTP_USER=...",
  "SMTP_PASSWORD=...",
  "NEXT_PUBLIC_ANALYTICS_KEY=...",
];

const getDeploymentPlan = ({ frontend, database, host }) => {
  const isNext = frontend === "nextjs";
  const isMongo = database === "mongodb";

  const envVars = [
    ...baseEnvVars,
    isNext ? "NEXT_PUBLIC_APP_URL=https://yourdomain.com" : "PORT=3000",
    isMongo ? "MONGODB_URI=mongodb+srv://..." : "DATABASE_URL=postgresql://...",
    isMongo ? "MONGODB_DB=production" : "DIRECT_URL=postgresql://...",
  ];

  const deploymentChecklist = [
    "Connect the production Git branch to your hosting provider.",
    "Set all production environment variables in the host dashboard.",
    isNext
      ? "Run next build locally and confirm there are no server/client boundary errors."
      : "Run the Node production build or start command locally with production env values.",
    "Configure your custom domain and force HTTPS.",
    "Add the production callback URLs for auth and OAuth providers.",
    "Create production Stripe products, prices, checkout URLs, and webhook endpoint.",
    isMongo
      ? "Create a dedicated MongoDB production cluster, database user, IP/network rule, and backup policy."
      : "Create a managed PostgreSQL production database, migration role, app role, and backup policy.",
    "Run database migrations or schema setup against production.",
    "Send a real transactional email from production.",
    "Deploy and verify health, auth, billing, and dashboard routes.",
  ];

  const productionChecklist = [
    "Smoke test signup, login, logout, password reset, and OAuth callback flow.",
    "Complete a test checkout with Stripe test mode or a low-value live plan.",
    "Confirm webhooks update subscription status in your database.",
    "Check protected routes cannot be accessed while logged out.",
    "Confirm error monitoring and analytics receive production events.",
    "Add robots.txt, sitemap, canonical tags, and social preview image.",
    "Verify cookies are HttpOnly, Secure, SameSite, and scoped correctly.",
    "Review rate limits on auth, checkout, contact, and public API routes.",
    "Document rollback steps and the last known good deployment.",
    "Invite 3-5 beta users and monitor logs during the first session.",
  ];

  const hostNotes = {
    vercel: [
      "Use Vercel environment groups for production and preview values.",
      "Check edge/runtime compatibility before using Node-only SDKs in route handlers.",
      "Set Stripe webhooks to the production Vercel domain, not a preview URL.",
    ],
    railway: [
      "Attach services through Railway variables instead of hardcoding connection strings.",
      "Set a healthcheck route for the web service.",
      "Review persistent storage requirements before storing files locally.",
    ],
    render: [
      "Set build and start commands explicitly.",
      "Enable auto deploy only for the branch you trust.",
      "Check free-tier sleep behavior before launching paid users.",
    ],
    docker: [
      "Build a production image with only runtime dependencies.",
      "Run behind a reverse proxy with HTTPS and gzip/brotli.",
      "Store secrets outside the image and rotate them after setup.",
    ],
  };

  const databaseChecks = isMongo
    ? [
        "Create indexes for user, subscription, and frequently filtered collections.",
        "Enable automated backups and test restore access.",
        "Use a least-privilege database user for the app.",
        "Set connection pooling limits for serverless or container deployments.",
      ]
    : [
        "Run migrations in a controlled deploy step.",
        "Enable automated backups and point-in-time recovery if available.",
        "Use connection pooling for serverless deployments.",
        "Check indexes for user, subscription, team, and audit tables.",
      ];

  return {
    title: `${isNext ? "Next.js" : "Node"} SaaS deployment checklist with ${isMongo ? "MongoDB" : "PostgreSQL"}`,
    envVars,
    deploymentChecklist,
    productionChecklist,
    hostNotes: hostNotes[host],
    databaseChecks,
  };
};

const SelectField = ({ label, value, onChange, options }) => (
  <label className="block">
    <span className="mb-2 block text-sm font-black text-[#111827]/70">{label}</span>
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

const ChecklistBlock = ({ title, icon: Icon, items, color = "bg-white" }) => (
  <div className={`rounded-3xl border-2 border-black p-5 shadow-[4px_4px_0px_0px_black] ${color}`}>
    <h2 className="mb-4 flex items-center gap-2 text-xl font-black">
      <Icon size={22} /> {title}
    </h2>
    <ul className="grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm font-bold leading-relaxed text-[#111827]/70">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#45AD94]" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default function SaasDeploymentChecklistGeneratorClient() {
  const [frontend, setFrontend] = useState("nextjs");
  const [database, setDatabase] = useState("postgresql");
  const [host, setHost] = useState("vercel");
  const [copied, setCopied] = useState(false);

  const plan = useMemo(
    () => getDeploymentPlan({ frontend, database, host }),
    [frontend, database, host]
  );

  const copyChecklist = async () => {
    const checklistText = [
      plan.title,
      "",
      "Environment variables:",
      ...plan.envVars.map((item) => `- ${item}`),
      "",
      "Deployment checklist:",
      ...plan.deploymentChecklist.map((item) => `- ${item}`),
      "",
      "Production checklist:",
      ...plan.productionChecklist.map((item) => `- ${item}`),
      "",
      "Database checks:",
      ...plan.databaseChecks.map((item) => `- ${item}`),
      "",
      "Host notes:",
      ...plan.hostNotes.map((item) => `- ${item}`),
    ].join("\n");

    try {
      await navigator.clipboard.writeText(checklistText);
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
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#9EDCF5] px-4 py-2 text-sm font-black shadow-[3px_3px_0px_0px_black]">
              <Rocket size={16} /> Deploy SaaS checklist
            </div>
            <h1 className="text-5xl font-black leading-none tracking-tight md:text-7xl">
              Generate your SaaS deployment checklist.
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-bold leading-relaxed text-[#111827]/70">
              Select your stack and get environment variables, database checks, deployment tasks, and a production launch checklist.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[360px_1fr]">
          <div className="rounded-3xl border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_black]">
            <p className="mb-5 text-sm font-bold leading-relaxed text-[#111827]/60">
              Choose the app stack, database, and deployment host. The generated checklist is written for a real launch, not just a demo deploy.
            </p>
            <div className="grid gap-4">
              <SelectField label="Stack" value={frontend} onChange={setFrontend} options={frontendOptions} />
              <SelectField label="Database" value={database} onChange={setDatabase} options={databaseOptions} />
              <SelectField label="Deployment host" value={host} onChange={setHost} options={hostOptions} />
              <button
                type="button"
                onClick={copyChecklist}
                className="mt-2 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border-2 border-black bg-[#9EDCF5] px-5 font-black shadow-[4px_4px_0px_0px_black] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
              >
                <Copy size={17} /> {copied ? "Copied" : "Copy checklist"}
              </button>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-3xl border-2 border-black bg-[#111827] p-6 text-white shadow-[4px_4px_0px_0px_black]">
              <p className="mb-2 text-xs font-black uppercase tracking-[0.12em] text-[#FFE711]">Next.js production checklist</p>
              <h2 className="text-3xl font-black leading-tight">{plan.title}</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-3xl font-black">{plan.envVars.length}</p>
                  <p className="text-xs font-black uppercase text-white/50">Env vars</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-3xl font-black">{plan.deploymentChecklist.length}</p>
                  <p className="text-xs font-black uppercase text-white/50">Deploy tasks</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-3xl font-black">{plan.productionChecklist.length}</p>
                  <p className="text-xs font-black uppercase text-white/50">Launch checks</p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <ChecklistBlock title="Deployment checklist" icon={Rocket} items={plan.deploymentChecklist} />
              <ChecklistBlock title="Production checklist" icon={ShieldCheck} items={plan.productionChecklist} />
            </div>

            <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
              <div className="rounded-3xl border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_black]">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-black">
                  <ClipboardCheck size={22} /> Environment variables
                </h2>
                <div className="grid gap-2 rounded-2xl bg-[#111827] p-4 font-mono text-sm font-bold leading-relaxed text-white/85">
                  {plan.envVars.map((item) => (
                    <div key={item}>{item}</div>
                  ))}
                </div>
              </div>

              <ChecklistBlock title="Database checks" icon={Database} items={plan.databaseChecks} color="bg-[#C6F6D5]" />
            </div>

            <ChecklistBlock title="Host-specific notes" icon={Server} items={plan.hostNotes} color="bg-[#FDFCF6]" />
          </div>
        </div>
      </section>
    </div>
  );
}
