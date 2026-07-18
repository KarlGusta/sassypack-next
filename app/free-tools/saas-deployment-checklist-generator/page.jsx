import SaasDeploymentChecklistGeneratorClient from "./SaasDeploymentChecklistGeneratorClient";

export const metadata = {
  title: "SaaS Deployment Checklist Generator | Next.js Production Checklist",
  description:
    "Generate a deploy SaaS checklist with environment variables, database checks, and production readiness steps for Next.js, Node, MongoDB, and PostgreSQL.",
  keywords: [
    "deploy SaaS checklist",
    "Next.js production checklist",
    "launch SaaS checklist",
    "SaaS deployment checklist",
  ],
  alternates: {
    canonical: "https://sassypack.collabtower.com/free-tools/saas-deployment-checklist-generator",
  },
};

export default function SaasDeploymentChecklistGeneratorPage() {
  return <SaasDeploymentChecklistGeneratorClient />;
}
