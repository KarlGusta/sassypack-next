import IdeaValidatorClient from "./IdeaValidatorClient";

export const metadata = {
  title: "SaaS Idea Validator | Free MVP Feature Generator",
  description:
    "Validate a SaaS idea, generate an MVP feature list, define a two-week build scope, and estimate complexity risk.",
  alternates: {
    canonical: "https://sassypack.collabtower.com/free-tools/saas-idea-validator",
  },
};

export default function SaasIdeaValidatorPage() {
  return <IdeaValidatorClient />;
}
