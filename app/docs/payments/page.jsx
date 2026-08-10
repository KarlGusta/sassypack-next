import Link from "next/link";
import { ArrowLeft, ArrowRight, CreditCard } from "lucide-react";

export const metadata = {
  title: "Payments Docs | SassyPack",
  description:
    "How payments work in SassyPack: Stripe and Paystack integration, subscriptions, webhooks, and billing setup.",
  alternates: {
    canonical: "https://sassypack.collabtower.com/docs/payments",
  },
};

const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF7F4A] px-6 py-3 text-sm font-semibold text-[#111827] transition hover:bg-[#FF7F4A]";
const secondaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-5 py-3 text-sm font-semibold text-[#111827] transition hover:border-[#111827]";
const cardClass = "rounded-lg border border-[#E5E7EB] bg-white shadow-sm";

const steps = [
  {
    title: "Pick a payment provider",
    detail:
      "SassyPack supports Stripe and Paystack out of the box. Choose one based on your target market and add your API keys to your environment variables.",
  },
  {
    title: "Set up subscription plans",
    detail:
      "Define your pricing tiers in the provider dashboard, then map plan IDs to your app's subscription model.",
  },
  {
    title: "Handle checkout",
    detail:
      "Prebuilt checkout routes create a session and redirect the user to your provider's hosted payment page.",
  },
  {
    title: "Listen for webhooks",
    detail:
      "Webhook handlers keep subscription status in sync automatically, updating user access when a payment succeeds, fails, or a subscription is cancelled.",
  },
];

export default function PaymentsDocsPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] px-6 pb-20 pt-28 text-[#111827] lg:pt-36">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#6366F1]">
          <ArrowLeft size={16} /> Home
        </Link>

        <header className={`${cardClass} p-6 md:p-10`}>
          <div className="inline-flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#6366F1]">
            <CreditCard size={14} /> Docs
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            Payments
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#4B5563]">
            How SassyPack handles subscriptions, checkout, and billing with Stripe and Paystack.
          </p>
        </header>

        <section className="mt-6 grid gap-5">
          {steps.map((step, index) => (
            <div key={step.title} className={`${cardClass} p-6`}>
              <div className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E5E7EB] bg-[#F8FAFC] text-sm font-semibold text-[#111827]">
                  {index + 1}
                </span>
                <div>
                  <h2 className="text-lg font-semibold leading-tight">{step.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#4B5563]">{step.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-10 flex flex-wrap gap-3">
          <Link href="/free-tools/stripe-pricing-calculator" className={primaryButtonClass}>
            Stripe pricing calculator <ArrowRight size={18} />
          </Link>
          <Link href="/stripe-saas-payments-integration" className={secondaryButtonClass}>
            Payments integration details <ArrowRight size={18} />
          </Link>
        </section>
      </div>
    </main>
  );
}