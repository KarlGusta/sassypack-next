import featuresData from "@/data/features.json";
import solutionsData from "@/data/solutions.json";
import audiencesData from "@/data/audiences.json";
import comparisonsData from "@/data/comparisons.json";
import stacksData from "@/data/stacks.json";
import usecasesData from "@/data/usecases.json";

// Single-prefix clusters — every entry's slug starts with `prefix + "/"`.
export const clusters = {
  features: { list: featuresData.features, prefix: "/features" },
  solutions: { list: solutionsData.solutions, prefix: "/solutions" },
  audiences: { list: audiencesData.audiences, prefix: "/for" },
  comparisons: { list: comparisonsData.comparisons, prefix: "/vs" },
  usecases: { list: usecasesData.usecases, prefix: "/use-cases" },
};

// Stacks has no single prefix — entries live under /mern-stack/* and /nextjs/*.
// Each group is routed by its own [slug] page.
export const stackGroups = {
  mernStack: { list: stacksData.stacks, prefix: "/mern-stack" },
  nextjs: { list: stacksData.stacks, prefix: "/nextjs" },
};

// One-off standalone cluster — comparisons.json entries that live outside /vs.
export const alternatives = { list: comparisonsData.comparisons, prefix: "/alternatives" };

// Full stacks list, for the /stacks hub page (which just links out to the
// real /mern-stack/* and /nextjs/* routes; it owns no [slug] route itself).
export const stacksAll = stacksData.stacks;

export function sanitizeData(data) {
  return JSON.parse(JSON.stringify(data).replace(/"\/demo"/g, '"/pricing"'));
}

const CURRENT_YEAR = new Date().getFullYear();
export function freshenYear(str) {
  if (!str) return str;
  return str.replace(/\b20\d{2}\b/g, CURRENT_YEAR);
}

// ── Named-cluster helpers (features/solutions/audiences/comparisons/usecases) ──
export function getEntry(clusterKey, leafSlug) {
  const { list, prefix } = clusters[clusterKey];
  return getEntryFromGroup({ list, prefix }, leafSlug);
}

export function getStaticParamsFor(clusterKey) {
  const { list, prefix } = clusters[clusterKey];
  return getStaticParamsForGroup({ list, prefix });
}

// ── Generic helpers — usable with any { list, prefix } group,        ──
// ── including stackGroups.mernStack, stackGroups.nextjs, alternatives ──
export function getEntryFromGroup(group, leafSlug) {
  const fullSlug = `${group.prefix}/${leafSlug}`;
  const entry = group.list.find((p) => p.slug === fullSlug);
  return entry ? sanitizeData(entry) : null;
}

export function getStaticParamsForGroup(group) {
  return group.list
    .filter((p) => p.slug.startsWith(group.prefix + "/"))
    .map((p) => ({ slug: p.slug.slice(group.prefix.length + 1) }));
}

export function buildMetadata(meta = {}) {
  const {
    title: rawTitle = "Next.js starter kit & Next.js SaaS Starter Kit",
    description = "Launch your SaaS in hours with SassyPack. Pre-built authentication, payments, dashboards, and APIs for MERN and Next.js.",
    keywords = [],
    canonical = "https://sassypack.collabtower.com",
  } = meta;

  const title = freshenYear(rawTitle);
  const ogImage = "https://sassypack.collabtower.com/sassypack-og.png";

  return {
    title,
    description,
    keywords: Array.isArray(keywords) ? keywords.join(", ") : keywords,
    alternates: { canonical },
    openGraph: { type: "website", url: canonical, title, description, images: [ogImage] },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

export function buildSchema(description) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SassyPack",
    applicationCategory: "DeveloperApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    operatingSystem: "Web",
    description,
  };
}
