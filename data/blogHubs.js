import { getUniqueSortedBlogPosts } from "./blogInternalLinks.js";

export const blogHubs = [
  {
    slug: "saas-development",
    title: "SaaS Development Hub",
    label: "Development",
    description:
      "Build faster SaaS products with guides on MVP planning, MERN, Next.js, dashboards, deployment, and starter-kit architecture.",
    accent: "#C994FF",
    featuredSlugs: [
      "how-to-build-saas-mvp-fast-guide",
      "validate-your-saas-idea-before-building",
      "nextjs-saas-starter-kit-guide",
      "build-saas-dashboard-mern-nextjs-tutorial",
      "building-saas-apps-with-mern-stack",
      "mern-saas-tutorial-from-scratch-to-deployment",
      "what-is-a-saas-starter-kit-nextjs-mern",
      "sassypack-mern-nextjs-starter-kit",
      "nextjs-saas-template-for-developers-cut-dev-time",
      "saas-development-debugging-guide-2025",
      "mern-stack-productivity-patterns-2025",
      "ultimate-guide-to-shipping-saas-fast",
    ],
    keywords: [
      "mvp", "development", "nextjs", "next.js", "mern", "dashboard",
      "starter kit", "boilerplate", "deployment",
    ],
  },
  {
    slug: "saas-security",
    title: "SaaS Security Hub",
    label: "Security",
    description:
      "Security, authentication, GDPR, SOC 2, audit readiness, compliance, and privacy guides for SaaS founders.",
    accent: "#FFE711",
    featuredSlugs: [
      "saas-security-compliance-audit-checklist-2025",
      "saas-security-audits-gdpr-soc2-compliance-guide",
      "saas-security-compliance-gdpr-mern-guide",
      "saas-security-compliance-roadmap-2026",
      "saas-security-compliance-soc2-prep-guide",
      "best-saas-authentication-security-guide",
      "saas-authentication-best-practices-2026",
      "best-authentication-setup-for-saas",
      "saas-security-auditing-best-practices-2026",
      "saas-analytics-and-data-privacy-compliance-2026",
      "building-hipaa-compliant-healthtech-mern-2026",
    ],
    keywords: [
      "security", "compliance", "gdpr", "soc2", "soc 2", "authentication",
      "auth", "privacy", "audit", "hipaa",
    ],
  },
  {
    slug: "saas-scaling",
    title: "SaaS Scaling Hub",
    label: "Scaling",
    description:
      "Scale MERN and Next.js SaaS products with performance, monitoring, architecture, multi-tenancy, and growth infrastructure guides.",
    accent: "#6366F1",
    featuredSlugs: [
      "scaling-mern-saas-performance-optimization-2025",
      "scaling-mern-saas-performance-guide",
      "scaling-mern-saas-performance-optimization",
      "scaling-saas-performance-monitoring-growth-guide",
      "advanced-mern-performance-optimization-scaling-guide",
      "clean-architecture-for-mern-saas-scaling",
      "multi-tenancy-and-team-management-nextjs-mern",
      "building-saas-apps-mern-stack-2026-guide",
      "scaling-mern-saas-strategies-2026",
      "scaling-mern-saas-performance-monitoring",
      "advanced-mongodb-aggregations-for-saas-dashboards",
      "nextjs-saas-architecture-best-practices",
    ],
    keywords: [
      "scaling", "scale", "performance", "monitoring", "architecture",
      "multi-tenancy", "mongodb", "optimization", "growth",
    ],
  },
  {
    slug: "saas-monetization",
    title: "SaaS Monetization Hub",
    label: "Monetization",
    description:
      "Turn SaaS products into revenue with Stripe, Paystack, pricing, subscriptions, checkout, billing, and monetization strategy guides.",
    accent: "#22C55E",
    featuredSlugs: [
      "saas-monetization-payment-integration-guide",
      "mastering-saas-billing-stripe-paystack-guide",
      "saas-pricing-and-monetization-strategies-guide",
      "saas-pricing-strategies-for-maximum-mrr",
      "saas-pricing-models-for-maximum-mrr",
      "how-to-add-stripe-or-paystack-payments-to-your-saas",
      "how-to-add-stripe-payments-to-your-sassypack-app",
      "how-to-add-paystack-payments-to-your-sassypack-app",
      "stripe-subscription-integration-saas",
      "saas-payment-integration-guide-stripe-paystack",
      "integrate-paystack-nextjs-mern-saas-guide",
      "saas-subscription-management-guide",
      "stripe-vs-paystack-saas-payment-integration-guide",
    ],
    keywords: [
      "monetization", "pricing", "payment", "payments", "stripe", "paystack",
      "billing", "subscription", "checkout", "mrr",
    ],
  },
];

const MAX_HUB_ARTICLES = 18;

const getPostSearchText = (post) =>
  `${post.slug} ${post.title} ${post.description} ${post.category}`.toLowerCase();

const scorePostForHub = (post, hub) => {
  const searchText = getPostSearchText(post);
  return hub.keywords.reduce(
    (score, keyword) => score + (searchText.includes(keyword.toLowerCase()) ? 1 : 0),
    0
  );
};

export const getBlogHubBySlug = (hubSlug) =>
  blogHubs.find((hub) => hub.slug === hubSlug);

export const getHubPath = (hub) => `/blog/hubs/${hub.slug}`;

export const getHubArticles = (hub, posts, limit = MAX_HUB_ARTICLES) => {
  const sortedPosts = getUniqueSortedBlogPosts(posts);
  const postBySlug = new Map(sortedPosts.map((post) => [post.slug, post]));
  const selected = [];
  const selectedSlugs = new Set();

  hub.featuredSlugs.forEach((slug) => {
    const post = postBySlug.get(slug);
    if (!post || selectedSlugs.has(slug)) return;
    selected.push(post);
    selectedSlugs.add(slug);
  });

  sortedPosts
    .map((post) => ({ post, score: scorePostForHub(post, hub) }))
    .filter(({ post, score }) => score > 0 && !selectedSlugs.has(post.slug))
    .sort((a, b) => b.score - a.score || new Date(b.post.date) - new Date(a.post.date))
    .slice(0, Math.max(limit - selected.length, 0))
    .forEach(({ post }) => {
      selected.push(post);
      selectedSlugs.add(post.slug);
    });

  return selected.slice(0, limit);
};

export const getHubsForPost = (post, posts) =>
  blogHubs.filter((hub) =>
    getHubArticles(hub, posts).some((article) => article.slug === post.slug)
  );
