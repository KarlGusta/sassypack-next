import PricingPageGeneratorClient from "./PricingPageGeneratorClient";

export const metadata = {
  title: "SaaS Pricing Page Generator | Free Pricing Page Template",
  description:
    "Generate SaaS pricing tiers, feature breakdowns, and CTA copy based on your SaaS type, audience, and pricing model.",
  alternates: {
    canonical: "https://sassypack.collabtower.com/free-tools/saas-pricing-page-generator",
  },
};

export default function SaasPricingPageGeneratorPage() {
  return <PricingPageGeneratorClient />;
}
