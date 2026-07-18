import React, { useMemo, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import SEOHead from "../components/layout/SEOHead";
import {
  ArrowRight,
  CheckCircle2,
  Copy,
  HelpCircle,
  Megaphone,
  MousePointerClick,
  Sparkles,
  Wand2,
} from "lucide-react";

const meta = {
  title: "SaaS Landing Page Copy Generator | Free Startup Copy Tool",
  description:
    "Generate SaaS landing page hero copy, benefits, CTA copy, and FAQ content from your product name, niche, and audience.",
  keywords: [
    "SaaS landing page generator",
    "startup landing page copy generator",
    "AI landing page copy tool",
    "SaaS landing page copy",
  ],
  canonical: "https://sassypack.collabtower.com/free-tools/saas-landing-page-copy-generator",
};

const toneOptions = [
  { value: "clear", label: "Clear and direct" },
  { value: "bold", label: "Bold and punchy" },
  { value: "premium", label: "Premium B2B" },
];

const TextField = ({ label, value, onChange, placeholder }) => (
  <label className="block">
    <span className="mb-2 block text-sm font-black text-[#111827]/70">{label}</span>
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className="min-h-[52px] w-full rounded-2xl border-2 border-black bg-white px-4 text-base font-bold text-[#111827] shadow-[3px_3px_0px_0px_black] outline-none placeholder:text-[#111827]/40"
    />
  </label>
);

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

const titleCase = (value) => (
  value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
);

const getLandingCopy = ({ productName, niche, audience, tone }) => {
  const product = productName.trim() || "LaunchStack";
  const cleanNiche = niche.trim() || "SaaS operations";
  const cleanAudience = audience.trim() || "startup founders";
  const audienceTitle = titleCase(cleanAudience);

  const toneCopy = {
    clear: {
      headline: `${product} helps ${cleanAudience} run ${cleanNiche} without the busywork.`,
      subheadline: `Plan, manage, and improve your ${cleanNiche} workflow from one focused dashboard built for ${cleanAudience}.`,
      primary: "Start free",
      secondary: "See how it works",
    },
    bold: {
      headline: `Turn ${cleanNiche} chaos into a repeatable growth machine.`,
      subheadline: `${product} gives ${cleanAudience} the system to move faster, stay focused, and launch with fewer loose ends.`,
      primary: "Build momentum now",
      secondary: "View the workflow",
    },
    premium: {
      headline: `${product} is the ${cleanNiche} command center for serious ${cleanAudience}.`,
      subheadline: `Give your team a cleaner way to coordinate work, measure progress, and make confident decisions before growth gets messy.`,
      primary: "Request access",
      secondary: "Explore the platform",
    },
  };

  const selected = toneCopy[tone];

  const benefits = [
    {
      title: "Get clarity fast",
      desc: `Replace scattered notes and half-finished processes with one shared view of your ${cleanNiche} workflow.`,
    },
    {
      title: "Move from idea to action",
      desc: `Turn plans into assigned steps so ${cleanAudience} know what to do next and why it matters.`,
    },
    {
      title: "Spot blockers earlier",
      desc: `Track the signals that show where ${cleanNiche} work is slowing down before it becomes expensive.`,
    },
    {
      title: "Scale without rebuilding",
      desc: `Start with a simple operating system, then add structure as your team, users, and revenue grow.`,
    },
  ];

  const ctas = {
    heroPrimary: selected.primary,
    heroSecondary: selected.secondary,
    section: `See why ${audienceTitle} choose ${product}`,
    final: `Start building better ${cleanNiche} today`,
    microcopy: "No credit card required. Set up your first workspace in minutes.",
  };

  const faq = [
    {
      question: `Who is ${product} for?`,
      answer: `${product} is built for ${cleanAudience} who need a simpler way to manage ${cleanNiche} without stitching together too many tools.`,
    },
    {
      question: "How quickly can we get started?",
      answer: "Most teams can create a workspace, invite collaborators, and map the first workflow in the same day.",
    },
    {
      question: "Does this replace our existing tools?",
      answer: `It can replace lightweight spreadsheets and manual tracking. If you already have a large stack, use ${product} as the focused operating layer for ${cleanNiche}.`,
    },
    {
      question: "What should we measure first?",
      answer: "Start with activation, completion rate, time saved, and the bottleneck that currently costs your team the most attention.",
    },
  ];

  return {
    hero: {
      eyebrow: `${cleanNiche} software for ${cleanAudience}`,
      headline: selected.headline,
      subheadline: selected.subheadline,
    },
    benefits,
    ctas,
    faq,
  };
};

const SaasLandingPageCopyGenerator = () => {
  const [productName, setProductName] = useState("FlowPilot");
  const [niche, setNiche] = useState("customer onboarding");
  const [audience, setAudience] = useState("B2B SaaS founders");
  const [tone, setTone] = useState("clear");
  const [copied, setCopied] = useState(false);

  const copy = useMemo(
    () => getLandingCopy({ productName, niche, audience, tone }),
    [productName, niche, audience, tone]
  );

  const copyLandingPage = async () => {
    const copyText = [
      "SaaS landing page copy",
      "",
      "Hero:",
      `Eyebrow: ${copy.hero.eyebrow}`,
      `Headline: ${copy.hero.headline}`,
      `Subheadline: ${copy.hero.subheadline}`,
      `Primary CTA: ${copy.ctas.heroPrimary}`,
      `Secondary CTA: ${copy.ctas.heroSecondary}`,
      `Microcopy: ${copy.ctas.microcopy}`,
      "",
      "Benefits:",
      ...copy.benefits.map((item) => `- ${item.title}: ${item.desc}`),
      "",
      "CTA copy:",
      `Section CTA: ${copy.ctas.section}`,
      `Final CTA: ${copy.ctas.final}`,
      "",
      "FAQ:",
      ...copy.faq.map((item) => `Q: ${item.question}\nA: ${item.answer}`),
    ].join("\n");

    try {
      await navigator.clipboard.writeText(copyText);
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
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#C6F6D5] px-4 py-2 text-sm font-black shadow-[3px_3px_0px_0px_black]">
                <Wand2 size={16} /> SaaS landing page generator
              </div>
              <h1 className="text-5xl font-black leading-none tracking-tight md:text-7xl">
                Generate SaaS landing page copy.
              </h1>
              <p className="mt-6 max-w-2xl text-xl font-bold leading-relaxed text-[#111827]/70">
                Enter your product name, niche, and audience to generate hero copy, benefits, CTA copy, and FAQ content.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[360px_1fr]">
            <div className="rounded-3xl border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_black]">
              <p className="mb-5 text-sm font-bold leading-relaxed text-[#111827]/60">
                Give the tool a concrete audience and niche. Specific inputs produce sharper startup landing page copy.
              </p>
              <div className="grid gap-4">
                <TextField label="Product name" value={productName} onChange={setProductName} placeholder="FlowPilot" />
                <TextField label="Niche" value={niche} onChange={setNiche} placeholder="customer onboarding" />
                <TextField label="Audience" value={audience} onChange={setAudience} placeholder="B2B SaaS founders" />
                <SelectField label="Tone" value={tone} onChange={setTone} options={toneOptions} />
                <button
                  type="button"
                  onClick={copyLandingPage}
                  className="mt-2 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border-2 border-black bg-[#C6F6D5] px-5 font-black shadow-[4px_4px_0px_0px_black] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                >
                  <Copy size={17} /> {copied ? "Copied" : "Copy landing copy"}
                </button>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="rounded-3xl border-2 border-black bg-[#111827] p-6 text-white shadow-[4px_4px_0px_0px_black]">
                <p className="mb-2 text-xs font-black uppercase tracking-[0.12em] text-[#FFE711]">{copy.hero.eyebrow}</p>
                <h2 className="max-w-4xl text-4xl font-black leading-none tracking-tight md:text-5xl">{copy.hero.headline}</h2>
                <p className="mt-5 max-w-2xl text-lg font-bold leading-relaxed text-white/60">{copy.hero.subheadline}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="inline-flex min-h-[48px] items-center rounded-2xl border-2 border-[#FFE711] bg-[#FFE711] px-5 font-black text-[#111827]">
                    {copy.ctas.heroPrimary}
                  </span>
                  <span className="inline-flex min-h-[48px] items-center rounded-2xl border-2 border-white/20 bg-white/10 px-5 font-black text-white">
                    {copy.ctas.heroSecondary}
                  </span>
                </div>
                <p className="mt-4 text-sm font-bold text-white/50">{copy.ctas.microcopy}</p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {copy.benefits.map((benefit) => (
                  <div key={benefit.title} className="rounded-3xl border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_black]">
                    <h3 className="mb-3 flex items-center gap-2 text-xl font-black">
                      <CheckCircle2 size={20} className="text-[#45AD94]" /> {benefit.title}
                    </h3>
                    <p className="text-sm font-bold leading-relaxed text-[#111827]/60">{benefit.desc}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
                <div className="rounded-3xl border-2 border-black bg-[#C6F6D5] p-5 shadow-[4px_4px_0px_0px_black]">
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-black">
                    <MousePointerClick size={22} /> CTA copy
                  </h2>
                  <div className="grid gap-3">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.1em] text-[#111827]/50">Section CTA</p>
                      <p className="font-black">{copy.ctas.section}</p>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.1em] text-[#111827]/50">Final CTA</p>
                      <p className="font-black">{copy.ctas.final}</p>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.1em] text-[#111827]/50">Microcopy</p>
                      <p className="text-sm font-bold leading-relaxed text-[#111827]/70">{copy.ctas.microcopy}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_black]">
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-black">
                    <Megaphone size={22} /> Copy angle
                  </h2>
                  <p className="text-sm font-bold leading-relaxed text-[#111827]/60">
                    Lead with the audience pain, describe the workflow outcome, and make the first CTA low-friction. This keeps the landing page useful before you have heavy social proof.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border-2 border-black bg-[#FDFCF6] p-5 shadow-[4px_4px_0px_0px_black]">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-black">
                  <HelpCircle size={22} /> FAQ
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {copy.faq.map((item) => (
                    <div key={item.question} className="rounded-2xl border-2 border-[#111827]/10 bg-white p-4">
                      <h3 className="font-black">{item.question}</h3>
                      <p className="mt-2 text-sm font-bold leading-relaxed text-[#111827]/60">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default SaasLandingPageCopyGenerator;
