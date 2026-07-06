import { ArrowRight, Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$49",
    desc: "For solo developers launching fast.",
    cta: "Get Starter",
    link: "https://karlgusta.gumroad.com/l/zgkhq?wanted=true",
    features: ["Core SaaS setup", "Landing page", "Auth ready", "Single project license"],
  },
  {
    name: "Pro",
    price: "$99",
    desc: "Best for serious indie founders.",
    cta: "Get Pro",
    link: "https://karlgusta.gumroad.com/l/rqzmvd?wanted=true",
    featured: true,
    features: ["Everything in Starter", "Payments (Stripe)", "Analytics (PostHog)", "SEO blog system"],
  },
  {
    name: "Team / Extended",
    price: "$199",
    desc: "For teams and multiple products.",
    cta: "Get Team",
    link: "https://karlgusta.gumroad.com/l/txwnl?wanted=true",
    features: ["Everything in Pro", "Multiple projects", "Team usage", "Extended license"],
  },
  {
    name: "Done For You",
    price: "Custom",
    desc: "We set it up for you.",
    cta: "Contact",
    link: "https://karlgusta.gumroad.com/l/ewoxke?wanted=true",
    features: ["Full setup", "Custom config", "Deployment help", "Priority support"],
  },
];

const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF7F4A] px-5 py-3 text-sm font-semibold text-[#111827] transition hover:bg-[#FF7F4A]";

export const metadata = {
  title: "Pricing | SassyPack",
  description: "One-time pricing for a faster SaaS launch. Pay once, get lifetime updates, and keep the source code.",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] px-6 py-28 text-[#111827] lg:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6366F1]">Pricing</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
            One-time pricing for a faster SaaS launch.
          </h1>
          <p className="mt-5 text-base leading-7 text-[#4B5563] md:text-lg">
            Pay once, get lifetime updates, and keep the source code.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
                plan.featured ? "border-[#6366F1] ring-2 ring-[#6366F1]/10" : "border-[#E5E7EB]"
              }`}
            >
              <div className="flex min-h-[188px] flex-col">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-[#111827]">{plan.name}</h3>
                  {plan.featured && (
                    <span className="rounded-lg bg-[#EEF2FF] px-2.5 py-1 text-xs font-semibold text-[#4F46E5]">
                      Popular
                    </span>
                  )}
                </div>
                <p className="mt-5 text-4xl font-semibold tracking-tight">{plan.price}</p>
                <p className="mt-4 text-sm leading-6 text-[#6B7280]">{plan.desc}</p>
              </div>

              <ul className="mt-6 space-y-3 border-t border-[#E5E7EB] pt-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm leading-6 text-[#4B5563]">
                    <Check size={16} className="mt-1 shrink-0 text-[#45AD94]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              
                href={plan.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${primaryButtonClass} mt-8 w-full`}
              >
                {plan.cta} <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-2xl rounded-lg border border-[#E5E7EB] bg-white p-5 text-center text-sm font-medium leading-6 text-[#4B5563] shadow-sm">
          No subscriptions. Pay once. Build forever.
        </div>
      </div>
    </main>
  );
}
