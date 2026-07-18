"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Copy,
  CreditCard,
  FolderTree,
  KeyRound,
  LayoutDashboard,
  Route,
} from "lucide-react";

const routerOptions = [
  { value: "app", label: "App Router" },
  { value: "pages", label: "Pages Router" },
];

const authOptions = [
  { value: "authjs", label: "Auth.js" },
  { value: "clerk", label: "Clerk" },
  { value: "supabase", label: "Supabase Auth" },
  { value: "custom", label: "Custom JWT" },
];

const billingOptions = [
  { value: "stripe", label: "Stripe Billing" },
  { value: "lemonsqueezy", label: "Lemon Squeezy" },
  { value: "paddle", label: "Paddle" },
  { value: "none", label: "No billing yet" },
];

const databaseOptions = [
  { value: "postgres", label: "Postgres + Prisma" },
  { value: "mongo", label: "MongoDB + Mongoose" },
  { value: "supabase", label: "Supabase" },
  { value: "drizzle", label: "Postgres + Drizzle" },
];

const apiOptions = [
  { value: "route-handlers", label: "Route handlers" },
  { value: "server-actions", label: "Server actions" },
  { value: "trpc", label: "tRPC" },
];

const authFiles = {
  authjs: ["lib/auth/options.ts", "lib/auth/session.ts", "app/api/auth/[...nextauth]/route.ts"],
  clerk: ["middleware.ts", "lib/auth/clerk.ts", "app/(auth)/sign-in/[[...sign-in]]/page.tsx"],
  supabase: ["lib/auth/supabase-server.ts", "lib/auth/supabase-client.ts", "middleware.ts"],
  custom: ["lib/auth/jwt.ts", "lib/auth/password.ts", "app/api/auth/login/route.ts"],
};

const billingFiles = {
  stripe: ["lib/billing/stripe.ts", "lib/billing/plans.ts", "app/api/billing/checkout/route.ts", "app/api/webhooks/stripe/route.ts"],
  lemonsqueezy: ["lib/billing/lemonsqueezy.ts", "lib/billing/plans.ts", "app/api/billing/checkout/route.ts", "app/api/webhooks/lemonsqueezy/route.ts"],
  paddle: ["lib/billing/paddle.ts", "lib/billing/plans.ts", "app/api/billing/checkout/route.ts", "app/api/webhooks/paddle/route.ts"],
  none: ["lib/billing/plans.ts", "app/api/waitlist/route.ts"],
};

const databaseFiles = {
  postgres: ["prisma/schema.prisma", "lib/db/prisma.ts", "prisma/migrations/.gitkeep"],
  mongo: ["lib/db/mongoose.ts", "models/User.ts", "models/Subscription.ts"],
  supabase: ["lib/db/supabase.ts", "supabase/migrations/.gitkeep", "types/database.ts"],
  drizzle: ["db/schema.ts", "db/index.ts", "drizzle.config.ts"],
};

const apiFiles = {
  "route-handlers": ["app/api/users/route.ts", "app/api/account/route.ts", "app/api/health/route.ts"],
  "server-actions": ["actions/account.ts", "actions/billing.ts", "actions/onboarding.ts"],
  trpc: ["server/trpc/context.ts", "server/trpc/router.ts", "server/trpc/routers/account.ts", "app/api/trpc/[trpc]/route.ts"],
};

const sharedFiles = [
  "app/(marketing)/page.tsx",
  "app/(marketing)/pricing/page.tsx",
  "app/(dashboard)/dashboard/page.tsx",
  "app/(dashboard)/dashboard/settings/page.tsx",
  "app/(dashboard)/dashboard/billing/page.tsx",
  "components/ui/button.tsx",
  "components/ui/card.tsx",
  "components/layout/app-sidebar.tsx",
  "components/layout/top-nav.tsx",
  "lib/env.ts",
  "lib/config/site.ts",
  "lib/email/send.ts",
  "lib/analytics/events.ts",
  "types/index.ts",
];

const pagesRouterSharedFiles = [
  "pages/index.tsx",
  "pages/pricing.tsx",
  "pages/dashboard/index.tsx",
  "pages/dashboard/settings.tsx",
  "pages/dashboard/billing.tsx",
  "pages/api/users.ts",
  "pages/api/account.ts",
  "components/ui/button.tsx",
  "components/ui/card.tsx",
  "components/layout/app-sidebar.tsx",
  "components/layout/top-nav.tsx",
  "lib/env.ts",
  "lib/config/site.ts",
  "lib/email/send.ts",
  "lib/analytics/events.ts",
  "types/index.ts",
];

const normalizeForRouter = (files, routerStyle) => {
  if (routerStyle === "app") return files;

  return files.map((file) => {
    if (file === "app/api/auth/[...nextauth]/route.ts") return "pages/api/auth/[...nextauth].ts";
    if (file.includes("app/api/webhooks/")) return file.replace("app/api/", "pages/api/").replace("/route.ts", ".ts");
    if (file.includes("app/api/billing/checkout/route.ts")) return "pages/api/billing/checkout.ts";
    if (file.includes("app/api/auth/login/route.ts")) return "pages/api/auth/login.ts";
    if (file.includes("app/api/waitlist/route.ts")) return "pages/api/waitlist.ts";
    if (file.includes("app/api/trpc/[trpc]/route.ts")) return "pages/api/trpc/[trpc].ts";
    if (file.includes("app/(auth)/sign-in/")) return "pages/sign-in/[[...sign-in]].tsx";
    if (file.includes("app/api/")) return file.replace("app/api/", "pages/api/").replace("/route.ts", ".ts");
    return file;
  });
};

const buildTree = (files) => {
  const root = {};

  files.forEach((file) => {
    file.split("/").reduce((node, part, index, parts) => {
      if (!node[part]) {
        node[part] = index === parts.length - 1 ? null : {};
      }
      return node[part] || {};
    }, root);
  });

  const render = (node, depth = 0) =>
    Object.entries(node)
      .sort(([aName, aValue], [bName, bValue]) => {
        if (aValue === null && bValue !== null) return 1;
        if (aValue !== null && bValue === null) return -1;
        return aName.localeCompare(bName);
      })
      .flatMap(([name, child]) => {
        const prefix = "  ".repeat(depth);
        if (child === null) return [`${prefix}${name}`];
        return [`${prefix}${name}/`, ...render(child, depth + 1)];
      });

  return ["my-saas-app/", ...render(root, 1)].join("\n");
};

const getArchitecture = ({ routerStyle, authProvider, billingProvider, database, apiStyle }) => {
  const coreFiles = routerStyle === "app" ? sharedFiles : pagesRouterSharedFiles;
  const files = [
    ...coreFiles,
    ...normalizeForRouter(authFiles[authProvider], routerStyle),
    ...normalizeForRouter(billingFiles[billingProvider], routerStyle),
    ...databaseFiles[database],
    ...normalizeForRouter(apiFiles[apiStyle], routerStyle),
  ];

  const uniqueFiles = Array.from(new Set(files));
  const tree = buildTree(uniqueFiles);

  return {
    tree,
    sections: [
      {
        title: "Auth",
        icon: KeyRound,
        notes: [
          "Keep auth helpers in lib/auth so UI and API code share one session contract.",
          "Protect dashboard routes at the layout or middleware layer.",
          "Keep provider callbacks out of feature components.",
        ],
      },
      {
        title: "Billing",
        icon: CreditCard,
        notes: [
          "Keep provider SDK clients in lib/billing.",
          "Handle checkout and portal routes server-side.",
          "Update subscription access from verified webhook events.",
        ],
      },
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        notes: [
          "Group authenticated pages under a dashboard route group or folder.",
          "Share dashboard chrome through layout components.",
          "Keep settings and billing screens separate from the main product workflow.",
        ],
      },
      {
        title: "API Routes",
        icon: Route,
        notes: [
          "Keep public API routes thin and move business logic into lib or server modules.",
          "Use route handlers for webhooks and external integrations.",
          "Add a health endpoint for deployment checks.",
        ],
      },
    ],
    rules: [
      "Put reusable UI in components/ui and product-specific layout in components/layout.",
      "Put business logic in lib or server modules, not directly inside page components.",
      "Keep webhook handlers isolated because they need raw request handling and provider-specific verification.",
      "Store environment parsing in one file so missing keys fail early.",
      "Prefer route groups for marketing, auth, and dashboard surfaces in the App Router.",
    ],
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

export default function NextjsSaasFolderStructureGeneratorClient() {
  const [routerStyle, setRouterStyle] = useState("app");
  const [authProvider, setAuthProvider] = useState("authjs");
  const [billingProvider, setBillingProvider] = useState("stripe");
  const [database, setDatabase] = useState("postgres");
  const [apiStyle, setApiStyle] = useState("route-handlers");
  const [copied, setCopied] = useState(false);

  const architecture = useMemo(
    () => getArchitecture({ routerStyle, authProvider, billingProvider, database, apiStyle }),
    [routerStyle, authProvider, billingProvider, database, apiStyle]
  );

  const copyStructure = async () => {
    const structureText = [
      "Next.js SaaS boilerplate structure",
      "",
      architecture.tree,
      "",
      "Architecture rules:",
      ...architecture.rules.map((rule) => `- ${rule}`),
    ].join("\n");

    try {
      await navigator.clipboard.writeText(structureText);
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
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#FEBBCE] px-4 py-2 text-sm font-black shadow-[3px_3px_0px_0px_black]">
              <FolderTree size={16} /> Next.js project structure generator
            </div>
            <h1 className="text-5xl font-black leading-none tracking-tight md:text-7xl">
              Generate a scalable Next.js SaaS folder structure.
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-bold leading-relaxed text-[#111827]/70">
              Build a clean architecture for auth, billing, dashboard pages, API routes, database code, and shared components.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[380px_1fr]">
          <div className="rounded-3xl border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_black]">
            <p className="mb-5 text-sm font-bold leading-relaxed text-[#111827]/60">
              Pick the architecture choices for your app. The generated structure is optimized for a Next.js SaaS boilerplate with clear auth, billing, dashboard, and API boundaries.
            </p>
            <div className="grid gap-4">
              <SelectField label="Router style" value={routerStyle} onChange={setRouterStyle} options={routerOptions} />
              <SelectField label="Auth" value={authProvider} onChange={setAuthProvider} options={authOptions} />
              <SelectField label="Billing" value={billingProvider} onChange={setBillingProvider} options={billingOptions} />
              <SelectField label="Database" value={database} onChange={setDatabase} options={databaseOptions} />
              <SelectField label="API style" value={apiStyle} onChange={setApiStyle} options={apiOptions} />
              <button
                type="button"
                onClick={copyStructure}
                className="mt-2 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border-2 border-black bg-[#FEBBCE] px-5 font-black shadow-[4px_4px_0px_0px_black] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
              >
                <Copy size={17} /> {copied ? "Copied" : "Copy structure"}
              </button>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-3xl border-2 border-black bg-[#111827] p-6 text-white shadow-[4px_4px_0px_0px_black]">
              <p className="mb-2 text-xs font-black uppercase tracking-[0.12em] text-[#FFE711]">Scalable Next.js architecture</p>
              <pre className="max-h-[620px] overflow-auto whitespace-pre rounded-2xl bg-black/30 p-5 font-mono text-sm leading-relaxed text-white/85">
                {architecture.tree}
              </pre>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {architecture.sections.map((section) => (
                <div key={section.title} className="rounded-3xl border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_black]">
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-black">
                    <section.icon size={22} /> {section.title}
                  </h2>
                  <ul className="grid gap-3">
                    {section.notes.map((note) => (
                      <li key={note} className="flex gap-3 text-sm font-bold leading-relaxed text-[#111827]/70">
                        <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#45AD94]" />
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border-2 border-black bg-[#C6F6D5] p-5 shadow-[4px_4px_0px_0px_black]">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-black">
                <Code2 size={22} /> Architecture rules
              </h2>
              <ul className="grid gap-3 md:grid-cols-2">
                {architecture.rules.map((rule) => (
                  <li key={rule} className="flex gap-3 text-sm font-bold leading-relaxed text-[#111827]/70">
                    <ArrowRight size={16} className="mt-1 shrink-0 text-[#6366F1]" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
