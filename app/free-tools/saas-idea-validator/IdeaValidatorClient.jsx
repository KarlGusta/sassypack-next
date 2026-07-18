"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Copy,
  Lightbulb,
  Rocket,
  Target,
} from "lucide-react";

const highRiskSignals = [
  "ai", "machine learning", "marketplace", "payments", "stripe", "bank",
  "finance", "healthcare", "medical", "compliance", "crypto", "real-time",
  "realtime", "video", "mobile app", "scraping", "browser extension",
  "multi-sided", "social network",
];

const mediumRiskSignals = [
  "analytics", "dashboard", "team", "collaboration", "workflow",
  "automation", "booking", "calendar", "api", "integration",
  "subscription", "crm", "notification",
];

const lowRiskSignals = [
  "template", "checklist", "tracker", "directory", "form", "newsletter",
  "report", "content", "planner", "calculator",
];

const featureRules = [
  { terms: ["ai", "machine learning", "generate", "assistant"], features: ["Prompt input and response screen", "Saved AI outputs", "Usage limits by plan"] },
  { terms: ["marketplace", "multi-sided", "buyers", "sellers"], features: ["Simple listing creation", "Searchable listing directory", "Manual inquiry workflow"] },
  { terms: ["analytics", "dashboard", "report"], features: ["Metrics dashboard", "CSV import or manual data entry", "Exportable summary report"] },
  { terms: ["team", "collaboration", "agency"], features: ["Team workspace", "Invite teammate flow", "Basic roles and permissions"] },
  { terms: ["booking", "calendar", "schedule"], features: ["Availability setup", "Booking request form", "Confirmation email"] },
  { terms: ["crm", "sales", "lead", "pipeline"], features: ["Contact list", "Deal pipeline stages", "Follow-up reminders"] },
  { terms: ["content", "newsletter", "social"], features: ["Content calendar", "Draft and status tracker", "Publishing checklist"] },
];

const baseFeatures = [
  "Landing page with clear offer",
  "Email/password or magic-link signup",
  "User dashboard for the core workflow",
  "One primary create/edit flow",
  "Basic billing or waitlist CTA",
  "Transactional email for key actions",
  "Admin view for support and manual fixes",
];

const hasAny = (text, terms) => terms.some((term) => text.includes(term));
const getMatchedTerms = (text, terms) => terms.filter((term) => text.includes(term));
const unique = (items) => Array.from(new Set(items));

const extractAudience = (idea) => {
  const match = idea.match(/\bfor\s+([^.,;]+)/i);
  if (!match) return "a specific niche audience";
  return match[1].trim().slice(0, 80);
};

const getIdeaValidation = (idea) => {
  const cleanIdea = idea.trim();
  const text = cleanIdea.toLowerCase();
  const audience = extractAudience(cleanIdea || "for early SaaS founders");

  const highMatches = getMatchedTerms(text, highRiskSignals);
  const mediumMatches = getMatchedTerms(text, mediumRiskSignals);
  const lowMatches = getMatchedTerms(text, lowRiskSignals);

  const ruleFeatures = featureRules
    .filter((rule) => hasAny(text, rule.terms))
    .flatMap((rule) => rule.features);

  const mvpFeatures = unique([...ruleFeatures, ...baseFeatures]).slice(0, 8);

  let risk = "Low";
  let riskColor = "bg-[#C6F6D5]";
  let riskReason = "This can likely be tested with a focused CRUD workflow, a clear landing page, and manual operations behind the scenes.";

  if (highMatches.length >= 2 || (highMatches.length >= 1 && mediumMatches.length >= 2)) {
    risk = "High";
    riskColor = "bg-[#FEBBCE]";
    riskReason = "The idea includes multiple complexity drivers such as integrations, compliance, marketplaces, AI, payments, or real-time behavior.";
  } else if (highMatches.length >= 1 || mediumMatches.length >= 2) {
    risk = "Medium";
    riskColor = "bg-[#FFE37E]";
    riskReason = "The idea is buildable, but the first version should reduce integrations, automation, and edge cases.";
  } else if (lowMatches.length >= 1 || cleanIdea.length > 0) {
    risk = "Low";
  }

  const buildScope = [
    { phase: "Days 1-2", work: "Write the landing page, define one target user, and create the waitlist or signup flow." },
    { phase: "Days 3-5", work: "Build the core dashboard and the single workflow users must complete to feel value." },
    { phase: "Days 6-8", work: "Add persistence, account settings, transactional email, and basic admin visibility." },
    { phase: "Days 9-11", work: "Connect payments or a manual upgrade request, add empty states, and tighten onboarding." },
    { phase: "Days 12-14", work: "Test the happy path, fix rough edges, invite 5-10 users, and manually support anything non-core." },
  ];

  const validationTests = [
    `Interview 5 people in ${audience} before building the full product.`,
    "Ask for a painful current workaround, not just interest in the idea.",
    "Pre-sell, collect a waitlist, or ask users to commit to a pilot call.",
    "Track one activation action that proves the product solved the first problem.",
  ];

  const scopeCuts = [
    "No native mobile app in the MVP",
    "No complex automation until users repeat the workflow manually",
    "No custom permissions beyond owner/member unless buyers demand it",
    "No multi-plan pricing until the first paid users reveal usage patterns",
  ];

  return {
    title: cleanIdea || "Describe your SaaS idea to generate a scope",
    audience,
    risk,
    riskColor,
    riskReason,
    signals: unique([...highMatches, ...mediumMatches, ...lowMatches]).slice(0, 8),
    mvpFeatures,
    buildScope,
    validationTests,
    scopeCuts,
  };
};

const TextAreaField = ({ label, value, onChange, placeholder }) => (
  <label className="block">
    <span className="mb-2 block text-sm font-black text-[#111827]/70">{label}</span>
    <textarea
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className="min-h-[220px] w-full resize-y rounded-2xl border-2 border-black bg-white px-4 py-3 text-base font-bold leading-relaxed text-[#111827] shadow-[3px_3px_0px_0px_black] outline-none placeholder:text-[#111827]/40"
    />
  </label>
);

export default function IdeaValidatorClient() {
  const [idea, setIdea] = useState("AI customer support dashboard for small SaaS teams");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => getIdeaValidation(idea), [idea]);

  const copyResult = async () => {
    const resultText = [
      `SaaS idea validator result: ${result.title}`,
      `Audience: ${result.audience}`,
      `Risk level: ${result.risk}`,
      `Risk reason: ${result.riskReason}`,
      "",
      "MVP feature list:",
      ...result.mvpFeatures.map((feature) => `- ${feature}`),
      "",
      "Build in 2 weeks scope:",
      ...result.buildScope.map((item) => `- ${item.phase}: ${item.work}`),
      "",
      "Validation tests:",
      ...result.validationTests.map((item) => `- ${item}`),
      "",
      "Scope cuts:",
      ...result.scopeCuts.map((item) => `- ${item}`),
    ].join("\n");

    try {
      await navigator.clipboard.writeText(resultText);
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
              <Lightbulb size={16} /> SaaS idea validator
            </div>
            <h1 className="text-5xl font-black leading-none tracking-tight md:text-7xl">
              Validate your SaaS idea and scope the MVP.
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-bold leading-relaxed text-[#111827]/70">
              Enter an idea to generate an MVP feature list, a build-in-two-weeks scope, and a practical complexity risk level.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[420px_1fr]">
          <div className="rounded-3xl border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_black]">
            <p className="mb-5 text-sm font-bold leading-relaxed text-[#111827]/60">
              Keep the idea plain. Mention the audience, core workflow, and any tricky parts like AI, payments, integrations, marketplaces, or compliance.
            </p>
            <div className="grid gap-4">
              <TextAreaField
                label="SaaS idea"
                value={idea}
                onChange={setIdea}
                placeholder="Example: A CRM for freelance designers that tracks leads, proposals, invoices, and follow-ups."
              />
              <button
                type="button"
                onClick={copyResult}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border-2 border-black bg-[#FFE711] px-5 font-black shadow-[4px_4px_0px_0px_black] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
              >
                <Copy size={17} /> {copied ? "Copied" : "Copy MVP scope"}
              </button>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="grid gap-5 md:grid-cols-[220px_1fr]">
              <div className={`rounded-3xl border-2 border-black p-6 shadow-[4px_4px_0px_0px_black] ${result.riskColor}`}>
                <p className="text-xs font-black uppercase tracking-[0.12em] text-[#111827]/50">Risk level</p>
                <p className="mt-4 text-5xl font-black">{result.risk}</p>
                <p className="mt-3 text-sm font-bold leading-relaxed text-[#111827]/70">Complexity estimate</p>
              </div>
              <div className="rounded-3xl border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_black]">
                <p className="mb-2 text-xs font-black uppercase tracking-[0.12em] text-[#6366F1]">Validate SaaS idea tool</p>
                <h2 className="text-2xl font-black leading-tight">{result.title}</h2>
                <p className="mt-3 text-sm font-bold leading-relaxed text-[#111827]/60">{result.riskReason}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {(result.signals.length ? result.signals : ["focused MVP"]).map((signal) => (
                    <span key={signal} className="rounded-full border-2 border-[#111827]/10 bg-[#FDFCF6] px-3 py-1 text-xs font-black text-[#111827]/60">
                      {signal}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <div className="rounded-3xl border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_black]">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-black">
                  <ClipboardCheck size={22} /> MVP feature list
                </h2>
                <ul className="grid gap-3">
                  {result.mvpFeatures.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm font-bold leading-relaxed text-[#111827]/70">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#45AD94]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_black]">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-black">
                  <Target size={22} /> Scope cuts
                </h2>
                <ul className="grid gap-3">
                  {result.scopeCuts.map((item) => (
                    <li key={item} className="flex gap-3 text-sm font-bold leading-relaxed text-[#111827]/70">
                      <AlertTriangle size={18} className="mt-0.5 shrink-0 text-[#6366F1]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-3xl border-2 border-black bg-[#C6F6D5] p-5 shadow-[4px_4px_0px_0px_black]">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-black">
                <Rocket size={22} /> Build in 2 weeks scope
              </h2>
              <ol className="grid gap-3">
                {result.buildScope.map((item, index) => (
                  <li key={item.phase} className="grid grid-cols-[36px_1fr] gap-3 text-sm font-bold leading-relaxed text-[#111827]/70">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-black bg-white font-black">
                      {index + 1}
                    </span>
                    <span>
                      <span className="font-black text-[#111827]">{item.phase}: </span>
                      {item.work}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-3xl border-2 border-black bg-[#FDFCF6] p-5 shadow-[4px_4px_0px_0px_black]">
              <h2 className="mb-4 text-xl font-black">Validation tests before you build more</h2>
              <ul className="grid gap-3 md:grid-cols-2">
                {result.validationTests.map((item) => (
                  <li key={item} className="flex gap-3 text-sm font-bold leading-relaxed text-[#111827]/70">
                    <ArrowRight size={16} className="mt-1 shrink-0 text-[#6366F1]" />
                    {item}
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
