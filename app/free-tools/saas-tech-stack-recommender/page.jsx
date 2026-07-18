import SaasTechStackRecommenderClient from "./SaasTechStackRecommenderClient";

export const metadata = {
  title: "Best Tech Stack for SaaS | Free SaaS Stack Recommender",
  description:
    "Choose your budget, complexity, and audience to get a SaaS tech stack recommendation covering Nextjs vs Next.js, database choice, and deployment setup.",
  keywords: [
    "best tech stack for SaaS",
    "Nextjs vs Next.js SaaS",
    "SaaS architecture guide",
    "SaaS tech stack recommender",
    "SaaS database choice",
  ],
  alternates: {
    canonical: "https://sassypack.collabtower.com/free-tools/saas-tech-stack-recommender",
  },
};

export default function SaasTechStackRecommenderPage() {
  return <SaasTechStackRecommenderClient />;
}
