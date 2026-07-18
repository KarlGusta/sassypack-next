import StripePricingCalculatorClient from "./StripePricingCalculatorClient";

export const metadata = {
  title: "Stripe Pricing Calculator | Usage-Based SaaS Pricing Tool",
  description:
    "Calculate break-even pricing, target margins, and usage-based SaaS pricing recommendations for API-call products using Stripe.",
  keywords: [
    "SaaS pricing calculator",
    "Stripe pricing model calculator",
    "usage based pricing tool",
    "usage based SaaS pricing",
  ],
  alternates: {
    canonical: "https://sassypack.collabtower.com/free-tools/stripe-pricing-calculator",
  },
};

export default function StripePricingCalculatorPage() {
  return <StripePricingCalculatorClient />;
}
