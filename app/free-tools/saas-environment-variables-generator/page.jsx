import SaasEnvironmentVariablesGeneratorClient from "./SaasEnvironmentVariablesGeneratorClient";

export const metadata = {
  title: "Next.js Environment Variables Template | Free SaaS .env Generator",
  description:
    "Generate a ready .env file template for a Next.js SaaS stack with Stripe, auth, database settings, and explanations for each variable.",
  keywords: [
    "Next.js environment variables template",
    "Stripe env variables setup",
    "SaaS .env example",
    "Next.js .env template",
    "SaaS environment variables generator",
  ],
  alternates: {
    canonical: "https://sassypack.collabtower.com/free-tools/saas-environment-variables-generator",
  },
};

export default function SaasEnvironmentVariablesGeneratorPage() {
  return <SaasEnvironmentVariablesGeneratorClient />;
}
