import React, { useMemo, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import SEOHead from "../components/layout/SEOHead";
import { ArrowRight, CheckCircle2, Copy, Sparkles } from "lucide-react";

const meta = {
  title: "SaaS Pricing Page Generator | Free Pricing Page Template",
  description:
    "Generate SaaS pricing tiers, feature breakdowns, and CTA copy based on your SaaS type, audience, and pricing model.",
  keywords: [
    "SaaS pricing page generator",
    "pricing page template SaaS",
    "how to price SaaS product",
    "SaaS pricing page examples",
  ],
  canonical: "https://sassypack.collabtower.com/free-tools/saas-pricing-page-generator",
};

const saasTypeOptions = [
  { value: "productivity", label: "Productivity SaaS" },
  { value: "analytics", label: "Analytics SaaS" },
  { value: "ai", label: "AI SaaS" },
  { value: "devtools", label: "Developer tool" },
  { value: "crm", label: "CRM or sales tool" },
  { value: "marketplace", label: "Marketplace SaaS" },
];

const targetAudienceOptions = [
  { value: "solo", label: "Solo founders" },
  { value: "smb", label: "Small businesses" },
  { value: "startup", label: "Startup teams" },
  { value: "agency", label: "Agencies" },
  { value: "enterprise", label: "Enterprise teams" },
];

const pricingModelOptions = [
  { value: "freemium", label: "Freemium" },
  { value: "tiered", label: "Tiered" },
  { value: "usage", label: "Usage-based" },
];

const saasTypeProfiles = {
  productivity: {
    noun: "workspace",
    feature: "Workflow automation",
    premiumFeature: "Advanced team permissions",
  },
  analytics: {
    noun: "dashboard",
    feature: "Core dashboards",
    premiumFeature: "Custom reporting and alerts",
  },
  ai: {
    noun: "AI workflow",
    feature: "AI generation credits",
    premiumFeature: "Brand memory and private models",
  },
  devtools: {
    noun: "developer workflow",
    feature: "Project environments",
    premiumFeature: "Audit logs and SSO",
  },
  crm: {
    noun: "pipeline",
    feature: "Contact and deal tracking",
    premiumFeature: "Revenue forecasting",
  },
  marketplace: {
    noun: "marketplace",
    feature: "Listings and messaging",
    premiumFeature: "Managed payouts and moderation",
  },
};

const audienceProfiles = {
  solo: { label: "solo founders", entryPrice: 19, midPrice: 49, topPrice: 99, proof: "Launch without a large fixed bill" },
  smb: { label: "small businesses", entryPrice: 29, midPrice: 79, topPrice: 149, proof: "Simple setup for lean teams" },
  startup: { label: "startup teams", entryPrice: 49, midPrice: 129, topPrice: 299, proof: "Scale from early traction to repeatable growth" },
  agency: { label: "agencies", entryPrice: 59, midPrice: 199, topPrice: 399, proof: "Manage clients and delivery in one place" },
  enterprise: { label: "enterprise teams", entryPrice: 99, midPrice: 299, topPrice: 799, proof: "Built for security, compliance, and control" },
};

const getPricingPagePlan = ({ saasType, targetAudience, pricingModel }) => {
  const product = saasTypeProfiles[saasType];
  const audience = audienceProfiles[targetAudience];

  const commonFeatures = [
    product.feature,
    "Unlimited core projects",
    "Email support",
    "Stripe-ready checkout copy",
  ];

  const premiumFeatures = [
    product.premiumFeature,
    "Team collaboration",
    "Priority support",
    "Advanced analytics",
  ];

  if (pricingModel === "usage") {
    return {
      headline: `Usage-based pricing page template for ${audience.label}`,
      subheadline: `Best when customers pay more as their ${product.noun} grows. Lead with a low starting cost, then make expansion pricing obvious.`,
      tiers: [
        {
          name: "Launch",
          price: `$${Math.max(9, Math.round(audience.entryPrice / 2))}/mo + usage`,
          desc: `For ${audience.label} testing their first ${product.noun}.`,
          features: [product.feature, "Pay-as-you-grow usage", "Basic usage reports"],
          cta: "Start small",
        },
        {
          name: "Growth",
          price: `$${audience.midPrice}/mo + lower usage rates`,
          desc: "For teams using the product every week.",
          features: [...commonFeatures, "Volume discounts"],
          cta: "Scale usage",
        },
        {
          name: "Scale",
          price: "Custom",
          desc: "For high-volume teams that need controls and support.",
          features: [...premiumFeatures, "Custom limits and invoicing"],
          cta: "Talk to sales",
        },
      ],
      featureBreakdown: [
        "Show a usage estimator directly under the hero",
        "Include a clear included-usage row in every tier",
        "Add a short FAQ explaining overages, limits, and billing cycles",
        "Use a customer story showing cost growth after adoption",
      ],
      ctas: {
        primary: "Estimate your monthly cost",
        secondary: "Start with the launch plan",
        micro: "No surprise invoices. Upgrade only when usage grows.",
      },
    };
  }

  if (pricingModel === "freemium") {
    return {
      headline: `Freemium SaaS pricing page generator for ${audience.label}`,
      subheadline: "Best when activation happens before payment. Make the free tier useful, but reserve team, automation, and scale features for paid plans.",
      tiers: [
        {
          name: "Free",
          price: "$0",
          desc: `For trying the ${product.noun} and proving value.`,
          features: [product.feature, "1 seat", "Limited monthly usage"],
          cta: "Start free",
        },
        {
          name: "Pro",
          price: `$${audience.midPrice}/mo`,
          desc: `For ${audience.label} ready to use it consistently.`,
          features: commonFeatures,
          cta: "Upgrade to Pro",
        },
        {
          name: "Business",
          price: `$${audience.topPrice}/mo`,
          desc: "For teams that need control, reporting, and support.",
          features: premiumFeatures,
          cta: "Get Business",
        },
      ],
      featureBreakdown: [
        "Put the Free plan first, but visually highlight Pro",
        "Gate collaboration, automation, exports, and limits behind paid plans",
        "Use in-product prompts to upgrade after activation",
        "Add a comparison table for limits so the free tier does not feel vague",
      ],
      ctas: {
        primary: "Start free",
        secondary: "Compare paid plans",
        micro: "No credit card required. Upgrade when your workflow depends on it.",
      },
    };
  }

  return {
    headline: `Tiered pricing page template for ${audience.label}`,
    subheadline: "Best when buyers compare packages before checkout. Anchor the middle tier as the default choice and make the upgrade path obvious.",
    tiers: [
      {
        name: "Starter",
        price: `$${audience.entryPrice}/mo`,
        desc: `For one ${product.noun} and a focused launch.`,
        features: [product.feature, "Core integrations", "Email support"],
        cta: "Choose Starter",
      },
      {
        name: "Growth",
        price: `$${audience.midPrice}/mo`,
        desc: `For ${audience.label} that want repeatable growth.`,
        features: commonFeatures,
        cta: "Choose Growth",
        popular: true,
      },
      {
        name: "Scale",
        price: `$${audience.topPrice}/mo`,
        desc: "For teams that need deeper control and support.",
        features: premiumFeatures,
        cta: "Choose Scale",
      },
    ],
    featureBreakdown: [
      "Use a 3-tier layout with the middle tier marked Most Popular",
      "Group features by outcome: launch, collaborate, scale, support",
      "Put security and support rows near the bottom for serious buyers",
      "Add a simple FAQ answering refunds, migration, cancellation, and support",
    ],
    ctas: {
      primary: "Choose your plan",
      secondary: "See feature comparison",
      micro: `${audience.proof}. Cancel or change plans anytime.`,
    },
  };
};

const SelectField = ({ label, value, onChange, options }) => (
  <label className="block">
    <span className="mb-2 block text-sm font-semibold text-[#4B5563]">{label}</span>
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="min-h-[48px] w-full rounded-lg border border-[#D1D5DB] bg-white px-4 text-sm font-medium text-[#111827] outline-none transition focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
);

const SaasPricingPageGenerator = () => {
  const [saasType, setSaasType] = useState("productivity");
  const [targetAudience, setTargetAudience] = useState("startup");
  const [pricingModel, setPricingModel] = useState("tiered");
  const [copied, setCopied] = useState(false);

  const pricingPagePlan = useMemo(
    () => getPricingPagePlan({ saasType, targetAudience, pricingModel }),
    [saasType, targetAudience, pricingModel]
  );

  const copyPricingPlan = async () => {
    const planText = [
      pricingPagePlan.headline,
      pricingPagePlan.subheadline,
      "",
      "Pricing tiers:",
      ...pricingPagePlan.tiers.map((tier) => (
        `${tier.name} - ${tier.price}\n${tier.desc}\nFeatures: ${tier.features.join(", ")}\nCTA: ${tier.cta}`
      )),
      "",
      "Feature breakdown:",
      ...pricingPagePlan.featureBreakdown.map((feature) => `- ${feature}`),
      "",
      "CTA copy:",
      `Primary: ${pricingPagePlan.ctas.primary}`,
      `Secondary: ${pricingPagePlan.ctas.secondary}`,
      `Microcopy: ${pricingPagePlan.ctas.micro}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(planText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <MainLayout>
      <SEOHead meta={meta} />
      <main className="min-h-screen bg-[#F8FAFC] text-[#111827]">
        <section className="px-6 pb-16 pt-28 lg:pb-20 lg:pt-36">
          <div className="mx-auto max-w-6xl">
            <a href="/free-tools" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#6366F1] transition hover:text-[#4F46E5]">
              <ArrowRight size={16} className="rotate-180" /> Free tools
            </a>
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-semibold text-[#4B5563] shadow-sm">
                <Sparkles size={16} /> SaaS pricing page generator
              </div>
              <h1 className="mt-7 text-5xl font-semibold tracking-tight md:text-7xl">
                Generate a SaaS pricing page structure.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4B5563] md:text-xl">
                Create pricing tiers, feature breakdowns, and CTA copy based on your SaaS type, target audience, and pricing model.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-[#E5E7EB] bg-white px-6 py-20">
          <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[340px_1fr]">
            <div className="h-fit rounded-lg border border-[#E5E7EB] bg-white p-6 shadow-sm">
              <p className="mb-5 text-sm leading-6 text-[#4B5563]">
                Choose your inputs. The generated output is structured for a real SaaS pricing page template.
              </p>
              <div className="grid gap-4">
                <SelectField label="SaaS type" value={saasType} onChange={setSaasType} options={saasTypeOptions} />
                <SelectField label="Target audience" value={targetAudience} onChange={setTargetAudience} options={targetAudienceOptions} />
                <SelectField label="Pricing model" value={pricingModel} onChange={setPricingModel} options={pricingModelOptions} />
                <button
                  type="button"
                  onClick={copyPricingPlan}
                  className="mt-2 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[#FFE711] px-5 text-sm font-semibold text-[#111827] transition hover:bg-[#FFE711]"
                >
                  <Copy size={17} /> {copied ? "Copied" : "Copy structure"}
                </button>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="rounded-lg border border-[#E5E7EB] bg-[#111827] p-6 text-white shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FFE711]">Generated pricing page angle</p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight">{pricingPagePlan.headline}</h2>
                <p className="mt-3 text-sm leading-6 text-white/70">{pricingPagePlan.subheadline}</p>
              </div>

              <div className="grid gap-5 lg:grid-cols-3">
                {pricingPagePlan.tiers.map((tier) => (
                  <div
                    key={tier.name}
                    className={`relative rounded-lg border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
                      tier.popular ? "border-[#6366F1] ring-2 ring-[#6366F1]/10" : "border-[#E5E7EB]"
                    }`}
                  >
                    {tier.popular && (
                      <span className="absolute right-4 top-4 rounded-lg bg-[#EEF2FF] px-2.5 py-1 text-xs font-semibold text-[#4F46E5]">
                        Popular
                      </span>
                    )}
                    <h3 className="pr-20 text-xl font-semibold">{tier.name}</h3>
                    <p className="mt-4 text-3xl font-semibold tracking-tight text-[#111827]">{tier.price}</p>
                    <p className="mt-3 min-h-[52px] text-sm leading-6 text-[#6B7280]">{tier.desc}</p>
                    <div className="my-5 h-px bg-[#E5E7EB]" />
                    <ul className="grid gap-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-2 text-sm leading-6 text-[#4B5563]">
                          <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[#45AD94]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3 text-center text-sm font-semibold text-[#111827]">
                      {tier.cta}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
                <div className="rounded-lg border border-[#E5E7EB] bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-semibold">Feature breakdown</h2>
                  <ul className="grid gap-3">
                    {pricingPagePlan.featureBreakdown.map((feature) => (
                      <li key={feature} className="flex gap-3 text-sm leading-6 text-[#4B5563]">
                        <ArrowRight size={16} className="mt-1 shrink-0 text-[#6366F1]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg border border-[#E5E7EB] bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-semibold">CTA copy</h2>
                  <div className="mt-4 grid gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">Primary</p>
                      <p className="mt-1 font-semibold">{pricingPagePlan.ctas.primary}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">Secondary</p>
                      <p className="mt-1 font-semibold">{pricingPagePlan.ctas.secondary}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">Microcopy</p>
                      <p className="mt-1 text-sm leading-6 text-[#4B5563]">{pricingPagePlan.ctas.micro}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default SaasPricingPageGenerator;
