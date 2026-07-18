import React, { useMemo, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import SEOHead from "../components/layout/SEOHead";
import {
  ArrowRight,
  BarChart3,
  Calculator,
  CheckCircle2,
  Copy,
  CreditCard,
  DollarSign,
  Gauge,
  Percent,
} from "lucide-react";

const meta = {
  title: "Stripe Pricing Calculator | Usage-Based SaaS Pricing Tool",
  description:
    "Calculate break-even pricing, target margins, and usage-based SaaS pricing recommendations for API-call products using Stripe.",
  keywords: [
    "SaaS pricing calculator",
    "Stripe pricing model calculator",
    "usage based pricing tool",
    "usage based SaaS pricing",
  ],
  canonical: "https://sassypack.collabtower.com/free-tools/stripe-pricing-calculator",
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

const toNumber = (value) => Math.max(0, Number(value) || 0);
const formatCurrency = (value) => currencyFormatter.format(Math.max(0, Number(value) || 0));
const formatNumber = (value) => numberFormatter.format(Math.max(0, Number(value) || 0));

const Field = ({ label, value, onChange, prefix, suffix, step = "1" }) => (
  <label className="block">
    <span className="mb-2 block text-sm font-black text-[#111827]/70">{label}</span>
    <div className="flex min-h-[52px] items-center rounded-2xl border-2 border-black bg-white px-4 shadow-[3px_3px_0px_0px_black]">
      {prefix && <span className="mr-2 text-sm font-black text-[#111827]/40">{prefix}</span>}
      <input
        type="number"
        min="0"
        step={step}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full bg-transparent text-lg font-black text-[#111827] outline-none"
      />
      {suffix && <span className="ml-2 text-sm font-black text-[#111827]/40">{suffix}</span>}
    </div>
  </label>
);

const MetricCard = ({ label, value, note, icon: Icon, color = "bg-[#FFE37E]" }) => (
  <div className="rounded-3xl border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_black]">
    <div className="mb-4 flex items-center justify-between gap-3">
      <span className="text-xs font-black uppercase tracking-[0.08em] text-[#111827]/40">{label}</span>
      <span className={`flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black ${color}`}>
        <Icon size={18} />
      </span>
    </div>
    <div className="text-3xl font-black leading-none text-[#111827]">{value}</div>
    {note && <p className="mt-3 text-sm font-bold leading-snug text-[#111827]/60">{note}</p>}
  </div>
);

const getPricingRecommendations = ({
  costPerCall,
  expectedUsers,
  callsPerUser,
  targetMargin,
  fixedMonthlyCost,
  stripePercent,
  stripeFixedFee,
}) => {
  const users = Math.max(1, expectedUsers);
  const totalCalls = users * callsPerUser;
  const variableCost = totalCalls * costPerCall;
  const totalCost = variableCost + fixedMonthlyCost;
  const costPerUser = totalCost / users;
  const stripeRate = stripePercent / 100;
  const marginRate = Math.min(0.9, targetMargin / 100);
  const breakEvenPerUser = (costPerUser + stripeFixedFee) / Math.max(0.01, 1 - stripeRate);
  const targetPricePerUser = (costPerUser + stripeFixedFee) / Math.max(0.01, 1 - stripeRate - marginRate);
  const costPerThousandCalls = costPerCall * 1000;
  const targetPricePerThousandCalls = costPerThousandCalls / Math.max(0.01, 1 - stripeRate - marginRate);
  const breakEvenUsersAtTargetPrice = targetPricePerUser <= 0
    ? 0
    : Math.ceil(fixedMonthlyCost / Math.max(0.01, targetPricePerUser * (1 - stripeRate - marginRate) - callsPerUser * costPerCall - stripeFixedFee));

  const starterCalls = Math.max(1000, Math.round(callsPerUser * 0.5 / 1000) * 1000);
  const growthCalls = Math.max(starterCalls * 2, Math.round(callsPerUser / 1000) * 1000);
  const scaleCalls = Math.max(growthCalls * 2, Math.round(callsPerUser * 3 / 1000) * 1000);

  const tiers = [
    {
      name: "Starter",
      price: Math.ceil(targetPricePerThousandCalls * (starterCalls / 1000) + 9),
      usage: `${formatNumber(starterCalls)} API calls/mo`,
      note: "Good for trials, prototypes, and low-volume accounts.",
    },
    {
      name: "Growth",
      price: Math.ceil(targetPricePerUser),
      usage: `${formatNumber(growthCalls)} API calls/mo`,
      note: "Anchor this as the default plan for expected usage.",
      popular: true,
    },
    {
      name: "Scale",
      price: Math.ceil(targetPricePerThousandCalls * (scaleCalls / 1000) + 29),
      usage: `${formatNumber(scaleCalls)} API calls/mo`,
      note: "Use this tier to capture heavy accounts before custom pricing.",
    },
  ];

  const recommendations = [
    `Set break-even at no less than ${formatCurrency(breakEvenPerUser)} per user/month.`,
    `For a ${targetMargin}% gross margin after Stripe fees, target about ${formatCurrency(targetPricePerUser)} per user/month.`,
    `For pure usage-based billing, charge at least ${formatCurrency(targetPricePerThousandCalls)} per 1,000 API calls.`,
    "Keep a base subscription fee so low-usage customers still cover support, auth, hosting, and billing overhead.",
    "Use Stripe metered billing only after you can reliably count billable events and explain usage on invoices.",
  ];

  return {
    totalCalls,
    variableCost,
    totalCost,
    costPerUser,
    breakEvenPerUser,
    targetPricePerUser,
    targetPricePerThousandCalls,
    breakEvenUsersAtTargetPrice: Number.isFinite(breakEvenUsersAtTargetPrice) ? breakEvenUsersAtTargetPrice : 0,
    tiers,
    recommendations,
  };
};

const StripePricingCalculator = () => {
  const [costPerCall, setCostPerCall] = useState("0.002");
  const [expectedUsers, setExpectedUsers] = useState("500");
  const [callsPerUser, setCallsPerUser] = useState("1000");
  const [targetMargin, setTargetMargin] = useState("70");
  const [fixedMonthlyCost, setFixedMonthlyCost] = useState("500");
  const [stripePercent, setStripePercent] = useState("2.9");
  const [stripeFixedFee, setStripeFixedFee] = useState("0.30");
  const [copied, setCopied] = useState(false);

  const result = useMemo(
    () => getPricingRecommendations({
      costPerCall: toNumber(costPerCall),
      expectedUsers: toNumber(expectedUsers),
      callsPerUser: toNumber(callsPerUser),
      targetMargin: toNumber(targetMargin),
      fixedMonthlyCost: toNumber(fixedMonthlyCost),
      stripePercent: toNumber(stripePercent),
      stripeFixedFee: toNumber(stripeFixedFee),
    }),
    [costPerCall, expectedUsers, callsPerUser, targetMargin, fixedMonthlyCost, stripePercent, stripeFixedFee]
  );

  const copyPricing = async () => {
    const pricingText = [
      "Stripe pricing model calculator",
      "",
      `Total API calls: ${formatNumber(result.totalCalls)}`,
      `Monthly infrastructure cost: ${formatCurrency(result.totalCost)}`,
      `Break-even price/user: ${formatCurrency(result.breakEvenPerUser)}`,
      `Target price/user: ${formatCurrency(result.targetPricePerUser)}`,
      `Target usage price: ${formatCurrency(result.targetPricePerThousandCalls)} per 1,000 API calls`,
      "",
      "Recommended tiers:",
      ...result.tiers.map((tier) => `- ${tier.name}: $${tier.price}/mo, includes ${tier.usage}. ${tier.note}`),
      "",
      "Pricing recommendations:",
      ...result.recommendations.map((item) => `- ${item}`),
    ].join("\n");

    try {
      await navigator.clipboard.writeText(pricingText);
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
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#FFE37E] px-4 py-2 text-sm font-black shadow-[3px_3px_0px_0px_black]">
                <Calculator size={16} /> Usage based pricing tool
              </div>
              <h1 className="text-5xl font-black leading-none tracking-tight md:text-7xl">
                Calculate usage-based SaaS pricing.
              </h1>
              <p className="mt-6 max-w-2xl text-xl font-bold leading-relaxed text-[#111827]/70">
                Estimate break-even pricing, Stripe-adjusted margins, and recommended plans for API-call SaaS products.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[380px_1fr]">
            <div className="rounded-3xl border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_black]">
              <p className="mb-5 text-sm font-bold leading-relaxed text-[#111827]/60">
                Enter your API economics and target margin. Stripe fees are adjustable so you can model subscriptions, metered billing, or hybrid usage plans.
              </p>
              <div className="grid gap-4">
                <Field label="Cost per API call" prefix="$" value={costPerCall} onChange={setCostPerCall} step="0.0001" />
                <Field label="Expected users" value={expectedUsers} onChange={setExpectedUsers} />
                <Field label="API calls per user/mo" value={callsPerUser} onChange={setCallsPerUser} />
                <Field label="Target gross margin" suffix="%" value={targetMargin} onChange={setTargetMargin} />
                <Field label="Fixed monthly costs" prefix="$" value={fixedMonthlyCost} onChange={setFixedMonthlyCost} />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Stripe fee" suffix="%" value={stripePercent} onChange={setStripePercent} step="0.1" />
                  <Field label="Fixed fee" prefix="$" value={stripeFixedFee} onChange={setStripeFixedFee} step="0.01" />
                </div>
                <button
                  type="button"
                  onClick={copyPricing}
                  className="mt-2 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border-2 border-black bg-[#FFE37E] px-5 font-black shadow-[4px_4px_0px_0px_black] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                >
                  <Copy size={17} /> {copied ? "Copied" : "Copy pricing model"}
                </button>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="rounded-3xl border-2 border-black bg-[#111827] p-6 text-white shadow-[4px_4px_0px_0px_black]">
                <p className="mb-2 text-xs font-black uppercase tracking-[0.12em] text-[#FFE711]">Stripe pricing model calculator</p>
                <h2 className="text-3xl font-black leading-tight">
                  {formatCurrency(result.targetPricePerUser)} per user/month target
                </h2>
                <p className="mt-3 text-sm font-bold leading-relaxed text-white/60">
                  Based on {formatNumber(result.totalCalls)} monthly API calls and a {targetMargin}% target gross margin after estimated Stripe fees.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <MetricCard label="Break-even/user" value={formatCurrency(result.breakEvenPerUser)} note="Minimum price after Stripe fees" icon={Gauge} />
                <MetricCard label="Target/user" value={formatCurrency(result.targetPricePerUser)} note={`${targetMargin}% margin target`} icon={Percent} color="bg-[#C6F6D5]" />
                <MetricCard label="Per 1k calls" value={formatCurrency(result.targetPricePerThousandCalls)} note="Usage-based price floor" icon={BarChart3} color="bg-[#9EDCF5]" />
                <MetricCard label="Monthly cost" value={formatCurrency(result.totalCost)} note={`${formatCurrency(result.costPerUser)} cost/user`} icon={DollarSign} color="bg-[#FEBBCE]" />
              </div>

              <div className="grid gap-5 lg:grid-cols-3">
                {result.tiers.map((tier) => (
                  <div
                    key={tier.name}
                    className={`relative rounded-3xl border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_black] ${
                      tier.popular ? "ring-4 ring-[#FFE37E]" : ""
                    }`}
                  >
                    {tier.popular && (
                      <span className="absolute right-4 top-4 rounded-full border-2 border-black bg-[#FFE37E] px-3 py-1 text-xs font-black">
                        Recommended
                      </span>
                    )}
                    <h3 className="pr-28 text-2xl font-black">{tier.name}</h3>
                    <p className="mt-3 text-4xl font-black text-[#6366F1]">${tier.price}</p>
                    <p className="mt-1 text-sm font-black text-[#111827]/50">per month</p>
                    <div className="my-5 h-px border-t-2 border-dashed border-[#111827]/10" />
                    <p className="text-sm font-black">{tier.usage}</p>
                    <p className="mt-3 text-sm font-bold leading-relaxed text-[#111827]/60">{tier.note}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl border-2 border-black bg-[#C6F6D5] p-5 shadow-[4px_4px_0px_0px_black]">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-black">
                  <CreditCard size={22} /> Pricing recommendations
                </h2>
                <ul className="grid gap-3 md:grid-cols-2">
                  {result.recommendations.map((item) => (
                    <li key={item} className="flex gap-3 text-sm font-bold leading-relaxed text-[#111827]/70">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#111827]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default StripePricingCalculator;
