import React, { useMemo, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import SEOHead from "../components/layout/SEOHead";
import { ArrowRight, CheckCircle2, Copy, CreditCard, ShieldCheck } from "lucide-react";

const meta = {
  title: "Stripe Subscription Setup Checker | Free Webhook Checker",
  description:
    "Check your Stripe subscription setup for missing webhooks, Checkout misconfigurations, and recommended Next.js integration flow.",
  keywords: [
    "Stripe subscription setup guide",
    "Stripe webhook checker",
    "Stripe checkout integration Next.js",
    "Stripe subscription setup",
  ],
  canonical: "https://sassypack.collabtower.com/free-tools/stripe-subscription-setup-checker",
};

const subscriptionModelOptions = [
  { value: "fixed", label: "Fixed monthly or annual tiers" },
  { value: "seat", label: "Seat-based subscription" },
  { value: "usage", label: "Usage-based or metered billing" },
  { value: "trial", label: "Free trial to paid plan" },
  { value: "hybrid", label: "Base subscription plus add-ons" },
];

const stripeWebhookEvents = [
  {
    event: "checkout.session.completed",
    severity: "critical",
    reason: "Creates or links the customer record after Checkout succeeds.",
  },
  {
    event: "customer.subscription.updated",
    severity: "critical",
    reason: "Keeps plan, status, renewal, trial, and cancellation data in sync.",
  },
  {
    event: "customer.subscription.deleted",
    severity: "critical",
    reason: "Removes paid access when a subscription ends.",
  },
  {
    event: "invoice.paid",
    severity: "warning",
    reason: "Confirms successful renewals and reactivates accounts after payment recovery.",
  },
  {
    event: "invoice.payment_failed",
    severity: "warning",
    reason: "Triggers dunning, grace periods, and failed-payment notices.",
  },
];

const stripeModelGuidance = {
  fixed: {
    label: "fixed tier subscriptions",
    checks: [
      {
        label: "Recurring Stripe Prices",
        test: (text) => text.includes("recurring") || text.includes("price_"),
        fix: "Use Stripe Price IDs for each monthly and annual tier instead of hardcoded amounts.",
      },
      {
        label: "Customer billing portal",
        test: (text) => text.includes("billingportal") || text.includes("billing.portal") || text.includes("customer portal"),
        fix: "Add a billing portal route so customers can change plans, update cards, and cancel.",
      },
    ],
    flow: "Create one Stripe Price per tier and interval, send the selected price to a server route, create Checkout in subscription mode, then sync access from webhooks.",
  },
  seat: {
    label: "seat-based subscriptions",
    checks: [
      {
        label: "Seat quantity",
        test: (text) => text.includes("quantity") || text.includes("adjustable_quantity"),
        fix: "Pass quantity to Checkout or enable adjustable_quantity for seat-based pricing.",
      },
      {
        label: "Seat-change proration",
        test: (text) => text.includes("proration") || text.includes("subscription.updated"),
        fix: "Handle seat changes through subscription updates and decide whether to prorate immediately.",
      },
    ],
    flow: "Store seat count in your app, pass quantity into Checkout, update quantity when team membership changes, and listen for subscription updates before changing access.",
  },
  usage: {
    label: "usage-based billing",
    checks: [
      {
        label: "Usage metering",
        test: (text) => text.includes("meter") || text.includes("usage") || text.includes("usage_record"),
        fix: "Add usage reporting through Stripe metering or usage records before invoices finalize.",
      },
      {
        label: "Upcoming invoice handling",
        test: (text) => text.includes("invoice.upcoming") || text.includes("invoice.finalized"),
        fix: "Use invoice lifecycle events to preview, finalize, and explain variable charges.",
      },
    ],
    flow: "Use Checkout to start the subscription, record billable usage in your app, report usage to Stripe on schedule, and use invoice events to notify customers before charges land.",
  },
  trial: {
    label: "trial subscriptions",
    checks: [
      {
        label: "Trial settings",
        test: (text) => text.includes("trial_period_days") || text.includes("trial_settings"),
        fix: "Configure trial_period_days or trial_settings so trial behavior is explicit.",
      },
      {
        label: "Trial lifecycle webhooks",
        test: (text) => text.includes("customer.subscription.trial_will_end") || text.includes("trial_will_end"),
        fix: "Listen for customer.subscription.trial_will_end to send reminders before billing starts.",
      },
    ],
    flow: "Create Checkout with trial settings, collect payment details when needed, remind users before trial end, then grant or revoke access from subscription status webhooks.",
  },
  hybrid: {
    label: "base subscriptions with add-ons",
    checks: [
      {
        label: "Multiple line items",
        test: (text) => text.includes("line_items") && (text.includes("quantity") || text.match(/price_/g)?.length > 1),
        fix: "Represent base plans and add-ons as clear line items or subscription items.",
      },
      {
        label: "Plan metadata",
        test: (text) => text.includes("metadata"),
        fix: "Attach userId, planId, and add-on metadata so webhook handlers can map Stripe state back to your app.",
      },
    ],
    flow: "Create a base subscription item plus add-ons, attach metadata for every app-side entitlement, and update entitlements only from verified webhook events.",
  },
};

const hasAny = (text, terms) => terms.some((term) => text.includes(term));

const getStripeSetupReview = ({ stripeConfig, subscriptionModel }) => {
  const text = stripeConfig.toLowerCase();
  const model = stripeModelGuidance[subscriptionModel];
  const hasSnippet = text.trim().length > 0;

  const setupChecks = [
    {
      label: "Checkout Session creation",
      passed: hasAny(text, ["checkout.sessions.create", "checkout session", "stripe.checkout"]),
      severity: "critical",
      fix: "Create Checkout Sessions from a server route, not directly in the browser.",
    },
    {
      label: "Subscription mode",
      passed: hasAny(text, ["mode: 'subscription'", 'mode: "subscription"', "mode=subscription"]),
      severity: "critical",
      fix: "Set mode: 'subscription' so Stripe creates a Subscription instead of a one-time payment.",
    },
    {
      label: "Stripe Price IDs",
      passed: hasAny(text, ["price_", "price:", "price_data"]),
      severity: "critical",
      fix: "Use Stripe Price IDs or explicit price_data line items for every subscription plan.",
    },
    {
      label: "Success and cancel URLs",
      passed: hasAny(text, ["success_url", "successurl"]) && hasAny(text, ["cancel_url", "cancelurl"]),
      severity: "warning",
      fix: "Provide success_url and cancel_url so Checkout returns customers to the right app state.",
    },
    {
      label: "Webhook signature verification",
      passed: hasAny(text, ["constructevent", "stripe-signature", "stripe_webhook_secret", "webhooksecret"]),
      severity: "critical",
      fix: "Verify webhook signatures with Stripe's raw request body before trusting events.",
    },
    {
      label: "App metadata",
      passed: text.includes("metadata"),
      severity: "warning",
      fix: "Add userId, teamId, planId, or tenant metadata so webhooks can update the correct account.",
    },
  ];

  const webhookChecks = stripeWebhookEvents.map((item) => ({
    ...item,
    passed: text.includes(item.event),
    fix: `Handle ${item.event}: ${item.reason}`,
  }));

  const modelChecks = model.checks.map((check) => ({
    ...check,
    severity: "warning",
    passed: check.test(text),
  }));

  const allChecks = [...setupChecks, ...webhookChecks, ...modelChecks];
  const criticalMissing = allChecks.filter((check) => check.severity === "critical" && !check.passed);
  const warningMissing = allChecks.filter((check) => check.severity !== "critical" && !check.passed);
  const passed = allChecks.filter((check) => check.passed);
  const score = hasSnippet
    ? Math.max(0, Math.round(100 - criticalMissing.length * 14 - warningMissing.length * 7))
    : 0;

  return {
    score,
    status: !hasSnippet ? "Paste your setup to start" : score >= 80 ? "Looks close" : score >= 55 ? "Needs cleanup" : "High-risk setup",
    summary: !hasSnippet
      ? "Paste a Stripe Checkout route, webhook handler, or config notes to get a subscription setup review."
      : `${passed.length} checks passed, ${criticalMissing.length} critical gaps, ${warningMissing.length} recommended fixes.`,
    passed,
    criticalMissing,
    warningMissing,
    recommendedFlow: [
      "Create a protected Next.js API route or server action that creates Checkout Sessions.",
      model.flow,
      "Verify Stripe webhooks with the raw body and STRIPE_WEBHOOK_SECRET.",
      "Store Stripe customer, subscription, price, status, current_period_end, and cancel_at_period_end in your database.",
      "Grant paid access from webhook-confirmed subscription status, not from the success redirect alone.",
      "Add a customer portal route for plan changes, card updates, invoices, and cancellation.",
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

const TextAreaField = ({ label, value, onChange, placeholder }) => (
  <label className="block">
    <span className="mb-2 block text-sm font-black text-[#111827]/70">{label}</span>
    <textarea
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className="min-h-[300px] w-full resize-y rounded-2xl border-2 border-black bg-white px-4 py-3 font-mono text-sm font-bold leading-relaxed text-[#111827] shadow-[3px_3px_0px_0px_black] outline-none placeholder:font-sans placeholder:text-[#111827]/40"
    />
  </label>
);

const StripeSubscriptionSetupChecker = () => {
  const [stripeConfig, setStripeConfig] = useState("");
  const [subscriptionModel, setSubscriptionModel] = useState("fixed");
  const [copied, setCopied] = useState(false);

  const stripeReview = useMemo(
    () => getStripeSetupReview({ stripeConfig, subscriptionModel }),
    [stripeConfig, subscriptionModel]
  );

  const copyStripeReview = async () => {
    const reviewText = [
      `Stripe subscription setup checker: ${stripeReview.status}`,
      `Score: ${stripeReview.score}/100`,
      stripeReview.summary,
      "",
      "Missing critical setup:",
      ...(stripeReview.criticalMissing.length
        ? stripeReview.criticalMissing.map((item) => `- ${item.label}: ${item.fix}`)
        : ["- No critical gaps detected."]),
      "",
      "Recommended fixes:",
      ...(stripeReview.warningMissing.length
        ? stripeReview.warningMissing.map((item) => `- ${item.label}: ${item.fix}`)
        : ["- No recommended fixes detected."]),
      "",
      "Recommended flow:",
      ...stripeReview.recommendedFlow.map((item) => `- ${item}`),
    ].join("\n");

    try {
      await navigator.clipboard.writeText(reviewText);
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
                <CreditCard size={16} /> Stripe subscription setup guide
              </div>
              <h1 className="text-5xl font-black leading-none tracking-tight md:text-7xl">
                Check your Stripe subscription setup.
              </h1>
              <p className="mt-6 max-w-2xl text-xl font-bold leading-relaxed text-[#111827]/70">
                Paste your Checkout route, webhook handler, or config notes to find missing webhooks, common misconfigurations, and the recommended Next.js subscription flow.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[420px_1fr]">
            <div className="rounded-3xl border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_black]">
              <p className="mb-5 text-sm font-bold leading-relaxed text-[#111827]/60">
                This Stripe webhook checker is a static review tool. It spots common setup gaps, but your live Stripe Dashboard and test webhooks are still the source of truth.
              </p>
              <div className="grid gap-4">
                <SelectField label="Subscription model" value={subscriptionModel} onChange={setSubscriptionModel} options={subscriptionModelOptions} />
                <TextAreaField
                  label="Stripe setup or config snippet"
                  value={stripeConfig}
                  onChange={setStripeConfig}
                  placeholder={`// Example:\nconst session = await stripe.checkout.sessions.create({\n  mode: 'subscription',\n  line_items: [{ price: 'price_...', quantity: 1 }],\n  success_url,\n  cancel_url,\n  metadata: { userId },\n})\n\n// webhook events handled:\n// checkout.session.completed\n// customer.subscription.updated`}
                />
                <button
                  type="button"
                  onClick={copyStripeReview}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border-2 border-black bg-[#9EDCF5] px-5 font-black shadow-[4px_4px_0px_0px_black] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                >
                  <Copy size={17} /> {copied ? "Copied" : "Copy review"}
                </button>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="grid gap-5 md:grid-cols-[220px_1fr]">
                <div className="rounded-3xl border-2 border-black bg-[#111827] p-6 text-white shadow-[4px_4px_0px_0px_black]">
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-white/40">Setup score</p>
                  <p className="mt-4 text-6xl font-black text-[#FFE711]">{stripeReview.score}</p>
                  <p className="mt-2 text-xl font-black">{stripeReview.status}</p>
                </div>
                <div className="rounded-3xl border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_black]">
                  <p className="mb-2 text-xs font-black uppercase tracking-[0.12em] text-[#6366F1]">Stripe checkout integration Next.js</p>
                  <h2 className="text-2xl font-black leading-tight">
                    Review for {stripeModelGuidance[subscriptionModel].label}
                  </h2>
                  <p className="mt-3 text-sm font-bold leading-relaxed text-[#111827]/60">{stripeReview.summary}</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border-2 border-black bg-[#C6F6D5] p-4">
                      <p className="text-2xl font-black">{stripeReview.passed.length}</p>
                      <p className="text-xs font-black uppercase text-[#111827]/50">Passed</p>
                    </div>
                    <div className="rounded-2xl border-2 border-black bg-[#FEBBCE] p-4">
                      <p className="text-2xl font-black">{stripeReview.criticalMissing.length}</p>
                      <p className="text-xs font-black uppercase text-[#111827]/50">Critical</p>
                    </div>
                    <div className="rounded-2xl border-2 border-black bg-[#FFE37E] p-4">
                      <p className="text-2xl font-black">{stripeReview.warningMissing.length}</p>
                      <p className="text-xs font-black uppercase text-[#111827]/50">Fixes</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                <div className="rounded-3xl border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_black]">
                  <h2 className="mb-4 text-xl font-black">Missing webhooks and critical setup</h2>
                  <div className="grid gap-3">
                    {(stripeReview.criticalMissing.length ? stripeReview.criticalMissing : [{ label: "No critical gaps detected", fix: "Core subscription setup checks passed." }]).map((item) => (
                      <div key={item.label} className="rounded-2xl border-2 border-[#111827]/10 bg-[#FDFCF6] p-4">
                        <p className="font-black">{item.label}</p>
                        <p className="mt-1 text-sm font-bold leading-relaxed text-[#111827]/60">{item.fix}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_black]">
                  <h2 className="mb-4 text-xl font-black">Common misconfigurations</h2>
                  <div className="grid gap-3">
                    {(stripeReview.warningMissing.length ? stripeReview.warningMissing : [{ label: "No common issues detected", fix: "Recommended setup checks passed." }]).map((item) => (
                      <div key={item.label} className="rounded-2xl border-2 border-[#111827]/10 bg-[#FDFCF6] p-4">
                        <p className="font-black">{item.label}</p>
                        <p className="mt-1 text-sm font-bold leading-relaxed text-[#111827]/60">{item.fix}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border-2 border-black bg-[#C6F6D5] p-5 shadow-[4px_4px_0px_0px_black]">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-black">
                  <ShieldCheck size={22} /> Recommended flow
                </h2>
                <ol className="grid gap-3">
                  {stripeReview.recommendedFlow.map((step, index) => (
                    <li key={step} className="grid grid-cols-[32px_1fr] gap-3 text-sm font-bold leading-relaxed text-[#111827]/70">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-white font-black">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default StripeSubscriptionSetupChecker;
