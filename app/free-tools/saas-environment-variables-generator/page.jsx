import React, { useMemo, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import SEOHead from "../components/layout/SEOHead";
import {
  ArrowRight,
  CheckCircle2,
  Copy,
  CreditCard,
  Database,
  FileCode2,
  KeyRound,
  Server,
  ShieldCheck,
} from "lucide-react";

const meta = {
  title: "Next.js Environment Variables Template | Free SaaS .env Generator",
  description:
    "Generate a ready .env file template for a Next.js SaaS stack with Stripe, auth, database settings, and explanations for each variable.",
  keywords: [
    "Next.js environment variables template",
    "Stripe env variables setup",
    "SaaS .env example",
    "Next.js .env template",
    "SaaS environment variables generator",
  ],
  canonical: "https://sassypack.collabtower.com/free-tools/saas-environment-variables-generator",
};

const authOptions = [
  { value: "nextauth", label: "NextAuth / Auth.js" },
  { value: "clerk", label: "Clerk" },
  { value: "jwt", label: "Custom JWT" },
];

const dbOptions = [
  { value: "postgres", label: "PostgreSQL" },
  { value: "mongodb", label: "MongoDB" },
  { value: "mysql", label: "MySQL" },
];

const hostingOptions = [
  { value: "vercel", label: "Vercel" },
  { value: "railway", label: "Railway" },
  { value: "render", label: "Render" },
];

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

const getEnvConfig = ({ auth, db, hosting, includeStripe }) => {
  const baseUrl = hosting === "vercel" ? "https://your-app.vercel.app" : "https://your-app.com";
  const lines = [
    "# App",
    "NODE_ENV=production",
    `NEXT_PUBLIC_APP_URL=${baseUrl}`,
    "APP_NAME=Sassy SaaS",
    "",
  ];

  const explanations = [
    {
      key: "NODE_ENV",
      desc: "Tells Next.js and your server code to run production behavior.",
    },
    {
      key: "NEXT_PUBLIC_APP_URL",
      desc: "Your public app URL, used for redirects, emails, callbacks, and canonical links.",
    },
    {
      key: "APP_NAME",
      desc: "A server-side app label for email templates, logs, and internal product copy.",
    },
  ];

  if (includeStripe) {
    lines.push(
      "# Stripe",
      "STRIPE_SECRET_KEY=sk_live_replace_me",
      "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_replace_me",
      "STRIPE_WEBHOOK_SECRET=whsec_replace_me",
      "STRIPE_PRICE_ID_STARTER=price_replace_me",
      "STRIPE_PRICE_ID_PRO=price_replace_me",
      ""
    );
    explanations.push(
      {
        key: "STRIPE_SECRET_KEY",
        desc: "Server-only key used to create checkout sessions, customers, subscriptions, and billing portal links.",
      },
      {
        key: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
        desc: "Browser-safe Stripe key used by client-side Stripe components.",
      },
      {
        key: "STRIPE_WEBHOOK_SECRET",
        desc: "Used to verify Stripe webhook signatures before updating subscription state.",
      },
      {
        key: "STRIPE_PRICE_ID_*",
        desc: "Maps your app plans to Stripe recurring price IDs.",
      }
    );
  }

  if (auth === "nextauth") {
    lines.push(
      "# Auth.js / NextAuth",
      "AUTH_SECRET=replace_with_long_random_secret",
      `AUTH_URL=${baseUrl}`,
      "GOOGLE_CLIENT_ID=replace_me",
      "GOOGLE_CLIENT_SECRET=replace_me",
      "GITHUB_CLIENT_ID=replace_me",
      "GITHUB_CLIENT_SECRET=replace_me",
      ""
    );
    explanations.push(
      {
        key: "AUTH_SECRET",
        desc: "Signs and encrypts session tokens. Generate a long random value and keep it private.",
      },
      {
        key: "AUTH_URL",
        desc: "The canonical URL Auth.js uses when building callback and redirect URLs.",
      },
      {
        key: "GOOGLE_CLIENT_* / GITHUB_CLIENT_*",
        desc: "OAuth app credentials from each provider dashboard.",
      }
    );
  }

  if (auth === "clerk") {
    lines.push(
      "# Clerk",
      "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_replace_me",
      "CLERK_SECRET_KEY=sk_live_replace_me",
      "CLERK_WEBHOOK_SECRET=whsec_replace_me",
      "NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in",
      "NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up",
      ""
    );
    explanations.push(
      {
        key: "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
        desc: "Browser-safe Clerk key used by Clerk components and middleware.",
      },
      {
        key: "CLERK_SECRET_KEY",
        desc: "Server-only key for Clerk API calls.",
      },
      {
        key: "CLERK_WEBHOOK_SECRET",
        desc: "Verifies Clerk webhook events before syncing users to your database.",
      }
    );
  }

  if (auth === "jwt") {
    lines.push(
      "# Custom JWT Auth",
      "JWT_SECRET=replace_with_long_random_secret",
      "JWT_EXPIRES_IN=7d",
      "COOKIE_SECRET=replace_with_long_random_secret",
      ""
    );
    explanations.push(
      {
        key: "JWT_SECRET",
        desc: "Signs JWT access or session tokens. Rotate carefully because old tokens may become invalid.",
      },
      {
        key: "JWT_EXPIRES_IN",
        desc: "Controls token lifetime. Shorter durations reduce risk, longer durations reduce friction.",
      },
      {
        key: "COOKIE_SECRET",
        desc: "Protects signed cookies when your auth flow stores tokens in HTTP-only cookies.",
      }
    );
  }

  const dbLines = {
    postgres: ["# PostgreSQL", "DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require"],
    mongodb: ["# MongoDB", "MONGODB_URI=mongodb+srv://user:password@cluster/database?retryWrites=true&w=majority"],
    mysql: ["# MySQL", "DATABASE_URL=mysql://user:password@host:3306/database"],
  };

  const dbExplanation = {
    postgres: "Primary PostgreSQL connection string for Prisma, Drizzle, or server-side database clients.",
    mongodb: "Primary MongoDB connection URI for Mongoose, the MongoDB driver, or your database adapter.",
    mysql: "Primary MySQL connection string for Prisma, Drizzle, or server-side database clients.",
  };

  lines.push(...dbLines[db], "");
  explanations.push({
    key: db === "mongodb" ? "MONGODB_URI" : "DATABASE_URL",
    desc: dbExplanation[db],
  });

  lines.push(
    "# Email and operations",
    "RESEND_API_KEY=re_replace_me",
    "SUPPORT_EMAIL=support@your-app.com",
    "ADMIN_EMAIL=founder@your-app.com",
    "",
    "# Analytics",
    "NEXT_PUBLIC_GA_MEASUREMENT_ID=G-replace-me",
    "SENTRY_DSN=https://replace-me@sentry.io/project-id"
  );

  explanations.push(
    {
      key: "RESEND_API_KEY",
      desc: "Server-only key for transactional email such as invites, receipts, and passwordless login links.",
    },
    {
      key: "SUPPORT_EMAIL / ADMIN_EMAIL",
      desc: "Operational addresses for support copy, notifications, and internal alerts.",
    },
    {
      key: "NEXT_PUBLIC_GA_MEASUREMENT_ID",
      desc: "Browser-visible analytics ID. Prefix with NEXT_PUBLIC only when the value is safe for the client.",
    },
    {
      key: "SENTRY_DSN",
      desc: "Error monitoring DSN used to capture production exceptions.",
    }
  );

  const checklist = [
    "Keep every secret without NEXT_PUBLIC server-only.",
    "Use live Stripe keys only in production and test keys only locally.",
    "Add webhook secrets for Stripe and auth providers before launch.",
    "Set production callback URLs in OAuth provider dashboards.",
    "Store production variables in your host dashboard, not in git.",
  ];

  return {
    envText: lines.join("\n"),
    explanations,
    checklist,
  };
};

const SaasEnvironmentVariablesGenerator = () => {
  const [auth, setAuth] = useState("nextauth");
  const [db, setDb] = useState("postgres");
  const [hosting, setHosting] = useState("vercel");
  const [includeStripe, setIncludeStripe] = useState(true);
  const [copied, setCopied] = useState(false);

  const config = useMemo(
    () => getEnvConfig({ auth, db, hosting, includeStripe }),
    [auth, db, hosting, includeStripe]
  );

  const copyEnv = async () => {
    try {
      await navigator.clipboard.writeText(config.envText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <MainLayout>
      <SEOHead meta={meta} />
      <div className="min-h-screen bg-white text-[#111827]">
        <section className="bg-[#FDFCF6] px-6 pb-14 pt-32">
          <div className="mx-auto max-w-7xl">
            <a href="/free-tools" className="mb-8 inline-flex items-center gap-2 text-sm font-black text-[#6366F1]">
              <ArrowRight size={16} className="rotate-180" /> Free tools
            </a>
            <div className="max-w-4xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#9EDCF5] px-4 py-2 text-sm font-black shadow-[3px_3px_0px_0px_black]">
                <FileCode2 size={16} /> SaaS .env example
              </div>
              <h1 className="text-5xl font-black leading-none tracking-tight md:text-7xl">
                Generate environment variables for your SaaS stack.
              </h1>
              <p className="mt-6 max-w-2xl text-xl font-bold leading-relaxed text-[#111827]/70">
                Select your Next.js SaaS setup and get a ready .env template for Stripe, auth, database access, emails, analytics, and production operations.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-14">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="h-fit rounded-3xl border-2 border-black bg-[#FDFCF6] p-6 shadow-[6px_6px_0px_0px_black]">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-black bg-[#FFE711]">
                  <Server size={22} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-[#6366F1]">Stack input</p>
                  <h2 className="text-2xl font-black">Choose your setup</h2>
                </div>
              </div>

              <div className="space-y-5">
                <label className="block">
                  <span className="mb-2 block text-sm font-black text-[#111827]/70">Framework</span>
                  <div className="flex min-h-[52px] items-center gap-3 rounded-2xl border-2 border-black bg-white px-4 font-black shadow-[3px_3px_0px_0px_black]">
                    <CheckCircle2 size={18} className="text-[#6366F1]" /> Next.js
                  </div>
                </label>

                <label className="flex items-center justify-between gap-4 rounded-2xl border-2 border-black bg-white p-4 shadow-[3px_3px_0px_0px_black]">
                  <span className="flex items-center gap-3 font-black">
                    <CreditCard size={20} /> Include Stripe billing
                  </span>
                  <input
                    type="checkbox"
                    checked={includeStripe}
                    onChange={(event) => setIncludeStripe(event.target.checked)}
                    className="h-5 w-5 accent-[#6366F1]"
                  />
                </label>

                <SelectField label="Auth" value={auth} onChange={setAuth} options={authOptions} />
                <SelectField label="Database" value={db} onChange={setDb} options={dbOptions} />
                <SelectField label="Hosting" value={hosting} onChange={setHosting} options={hostingOptions} />
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-3xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_black]">
                <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="mb-1 text-xs font-black uppercase tracking-[0.12em] text-[#6366F1]">Ready .env template</p>
                    <h2 className="text-3xl font-black">Copy into your environment manager</h2>
                  </div>
                  <button
                    type="button"
                    onClick={copyEnv}
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-2xl border-2 border-black bg-[#C6F6D5] px-5 font-black shadow-[3px_3px_0px_0px_black] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                  >
                    <Copy size={18} /> {copied ? "Copied" : "Copy .env"}
                  </button>
                </div>
                <pre className="max-h-[520px] overflow-auto rounded-2xl border-2 border-black bg-[#111827] p-5 text-sm font-bold leading-relaxed text-[#FDFCF6]">
                  <code>{config.envText}</code>
                </pre>
              </div>

              <div className="grid gap-6 xl:grid-cols-2">
                <div className="rounded-3xl border-2 border-black bg-[#FDFCF6] p-6 shadow-[6px_6px_0px_0px_black]">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-black bg-[#FEBBCE]">
                      <KeyRound size={21} />
                    </div>
                    <h2 className="text-2xl font-black">Variable notes</h2>
                  </div>
                  <div className="space-y-4">
                    {config.explanations.map((item) => (
                      <div key={item.key} className="rounded-2xl border-2 border-[#111827]/10 bg-white p-4">
                        <p className="text-sm font-black">{item.key}</p>
                        <p className="mt-1 text-sm font-bold leading-relaxed text-[#111827]/60">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border-2 border-black bg-[#FDFCF6] p-6 shadow-[6px_6px_0px_0px_black]">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-black bg-[#C6F6D5]">
                      <ShieldCheck size={21} />
                    </div>
                    <h2 className="text-2xl font-black">Launch checks</h2>
                  </div>
                  <div className="space-y-3">
                    {config.checklist.map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-2xl border-2 border-[#111827]/10 bg-white p-4">
                        <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-[#6366F1]" />
                        <p className="text-sm font-black leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-2xl border-2 border-black bg-[#FFE711] p-4">
                    <div className="mb-2 flex items-center gap-2 font-black">
                      <Database size={18} /> Production habit
                    </div>
                    <p className="text-sm font-bold leading-relaxed">
                      Keep a separate local, preview, and production environment. Most SaaS launch bugs come from mixing test keys, callback URLs, or database URLs between them.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default SaasEnvironmentVariablesGenerator;
