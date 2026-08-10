"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Copy,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF7F4A] px-6 py-3 text-sm font-semibold text-[#111827] transition hover:bg-[#FF7F4A]";
const secondaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-5 py-3 text-sm font-semibold text-[#111827] transition hover:border-[#111827]";
const cardClass = "rounded-lg border border-[#E5E7EB] bg-white shadow-sm";

const authTypes = [
  { value: "jwt", label: "JWT auth" },
  { value: "session", label: "Session auth" },
];

const providerOptions = [
  { id: "google", label: "Google" },
  { id: "github", label: "GitHub" },
];

const authTypeCopy = {
  jwt: {
    label: "JWT authentication",
    storage: "Store the signed token in an HttpOnly cookie, then verify it on protected requests.",
    sessionStep: "API verifies the JWT signature and claims before returning protected data.",
    refresh: "Rotate refresh tokens or re-issue short-lived access tokens from a secure server endpoint.",
    risk: "Avoid storing JWTs in localStorage for SaaS dashboards because XSS can expose long-lived tokens.",
  },
  session: {
    label: "Session authentication",
    storage: "Store only a session ID in an HttpOnly cookie; keep the session record server-side.",
    sessionStep: "API looks up the session ID in your database or session store before returning protected data.",
    refresh: "Extend, rotate, or expire server-side sessions based on user activity and risk signals.",
    risk: "Session auth is easier to revoke, but it requires durable session storage and cleanup.",
  },
};

const getProviderLabel = (providers) => {
  if (!providers.length) return "email/password";
  if (providers.length === 1) return providers[0] === "google" ? "Google OAuth" : "GitHub OAuth";
  return "Google or GitHub OAuth";
};

const getAuthFlow = ({ authType, providers }) => {
  const copy = authTypeCopy[authType];
  const providerLabel = getProviderLabel(providers);
  const usesOAuth = providers.length > 0;

  const diagram = usesOAuth
    ? [
        { title: "User clicks login", detail: `Chooses ${providerLabel}` },
        { title: "Next.js starts OAuth", detail: "Creates state, nonce, and redirect URL" },
        { title: "Provider consent", detail: "User approves identity access" },
        { title: "Callback route", detail: "Validates state and exchanges code" },
        { title: "App session", detail: copy.storage },
        { title: "Protected request", detail: copy.sessionStep },
      ]
    : [
        { title: "User submits credentials", detail: "Email and password sent to auth route" },
        { title: "Server validates user", detail: "Hash check, account status, rate limit" },
        { title: "Token or session issued", detail: copy.storage },
        { title: "Cookie returned", detail: "HttpOnly, Secure, SameSite cookie" },
        { title: "Protected request", detail: copy.sessionStep },
      ];

  const lifecycle = usesOAuth
    ? [
        `User clicks "Continue with ${providerLabel}".`,
        "Next.js creates an OAuth authorization URL with state, nonce, scopes, and callback URL.",
        "The browser redirects to the OAuth provider.",
        "The provider authenticates the user and asks for consent if needed.",
        "The provider redirects back to your callback route with an authorization code.",
        "Your server verifies state, exchanges the code for provider tokens, and reads the profile.",
        "Your app finds or creates the user record.",
        copy.storage,
        copy.sessionStep,
        copy.refresh,
      ]
    : [
        "User submits email and password to a server route.",
        "Server validates input, rate limits attempts, and checks the password hash.",
        "Server finds or creates the auth session after credentials pass.",
        copy.storage,
        "Browser sends the cookie automatically on future app and API requests.",
        copy.sessionStep,
        copy.refresh,
      ];

  const architecture = [
    "Keep auth callbacks and credential checks on the server.",
    "Use HttpOnly, Secure, SameSite cookies for browser-based SaaS apps.",
    "Protect dashboard routes at middleware or layout level.",
    "Store provider account IDs separately from your user profile table.",
    "Log auth events such as sign-in, sign-out, failed login, and account linking.",
    copy.risk,
  ];

  return {
    title: `${copy.label} flow${usesOAuth ? ` with ${providerLabel}` : ""}`,
    diagram,
    lifecycle,
    architecture,
  };
};

export default function AuthFlowVisualizerClient() {
  const [authType, setAuthType] = useState("jwt");
  const [providers, setProviders] = useState(["google"]);
  const [copied, setCopied] = useState(false);

  const flow = useMemo(() => getAuthFlow({ authType, providers }), [authType, providers]);

  const toggleProvider = (provider) => {
    setProviders((current) =>
      current.includes(provider)
        ? current.filter((item) => item !== provider)
        : [...current, provider]
    );
  };

  const copyFlow = async () => {
    const flowText = [
      flow.title,
      "",
      "Flow diagram:",
      ...flow.diagram.map((step, index) => `${index + 1}. ${step.title}: ${step.detail}`),
      "",
      "Request lifecycle:",
      ...flow.lifecycle.map((step, index) => `${index + 1}. ${step}`),
      "",
      "Architecture notes:",
      ...flow.architecture.map((note) => `- ${note}`),
    ].join("\n");

    try {
      await navigator.clipboard.writeText(flowText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-6 pb-20 pt-28 text-[#111827] lg:pt-36">
      <div className="mx-auto max-w-6xl">
        <Link href="/free-tools" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#6366F1]">
          <ArrowLeft size={16} /> Free tools
        </Link>

        <header className={`${cardClass} p-6 md:p-10`}>
          <div className="inline-flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#6366F1]">
            <LockKeyhole size={14} /> JWT authentication flow diagram
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            Visualize your SaaS auth flow.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#4B5563]">
            Choose JWT or session auth, add Google or GitHub OAuth, and generate a clear
            authentication system architecture with request lifecycle steps.
          </p>
        </header>

        <div className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]">
          <div className={`${cardClass} h-fit p-6`}>
            <p className="mb-5 text-sm leading-6 text-[#4B5563]">
              Pick the login pattern you are planning. The visualizer outputs an OAuth login
              flow for Next.js or a credential-based JWT/session lifecycle.
            </p>

            <div className="grid gap-5">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
                  Auth type
                </p>
                <div className="grid gap-2">
                  {authTypes.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setAuthType(option.value)}
                      className={`min-h-[44px] rounded-lg border px-4 text-left text-sm font-semibold transition ${
                        authType === option.value
                          ? "border-[#111827] bg-[#F8FAFC] text-[#111827]"
                          : "border-[#E5E7EB] bg-white text-[#4B5563] hover:border-[#111827]"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
                  OAuth providers
                </p>
                <div className="grid gap-2">
                  {providerOptions.map((provider) => (
                    <button
                      key={provider.id}
                      type="button"
                      onClick={() => toggleProvider(provider.id)}
                      className={`flex min-h-[44px] items-center gap-3 rounded-lg border px-4 text-left text-sm font-semibold transition ${
                        providers.includes(provider.id)
                          ? "border-[#111827] bg-[#F8FAFC] text-[#111827]"
                          : "border-[#E5E7EB] bg-white text-[#4B5563] hover:border-[#111827]"
                      }`}
                    >
                      {<KeyRound size={16} />}
                      {provider.label}
                    </button>
                  ))}
                </div>
              </div>

              <button type="button" onClick={copyFlow} className={primaryButtonClass}>
                <Copy size={16} /> {copied ? "Copied" : "Copy auth flow"}
              </button>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-lg bg-[#111827] p-6 text-white shadow-sm md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FFE711]">
                Authentication system architecture
              </p>
              <h2 className="mt-2 text-2xl font-semibold leading-tight md:text-3xl">{flow.title}</h2>
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {flow.diagram.map((step, index) => (
                  <div
                    key={`${step.title}-${index}`}
                    className="rounded-lg border border-white/10 bg-white/5 p-4"
                  >
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-semibold text-[#111827]">
                        {index + 1}
                      </span>
                      {index < flow.diagram.length - 1 && (
                        <ArrowRight size={16} className="hidden text-white/40 md:block" />
                      )}
                    </div>
                    <h3 className="text-base font-semibold leading-tight">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/60">{step.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-[1fr_320px]">
              <div className={`${cardClass} p-6`}>
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <ShieldCheck size={20} /> Step-by-step request lifecycle
                </h2>
                <ol className="grid gap-3">
                  {flow.lifecycle.map((step, index) => (
                    <li key={step} className="grid grid-cols-[30px_1fr] gap-3 text-sm leading-6 text-[#4B5563]">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E5E7EB] bg-[#F8FAFC] text-xs font-semibold text-[#111827]">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className={`${cardClass} p-6`}>
                <h2 className="mb-4 text-lg font-semibold">Architecture notes</h2>
                <ul className="grid gap-3">
                  {flow.architecture.map((note) => (
                    <li key={note} className="flex gap-2 text-sm leading-6 text-[#4B5563]">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#22C55E]" />
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <Link href="/free-tools" className={secondaryButtonClass}>
            <ArrowLeft size={18} /> Back to free tools
          </Link>
        </div>
      </div>
    </main>
  );
}