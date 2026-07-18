import pagesData from "@/data/pages.json";
import featuresData from "@/data/features.json";
import solutionsData from "@/data/solutions.json";
import audiencesData from "@/data/audiences.json";
import comparisonsData from "@/data/comparisons.json";
import stacksData from "@/data/stacks.json";
import usecasesData from "@/data/usecases.json";

const hostname = "https://sassypack.collabtower.com";

function toEntry(slug, { priority = 0.9, changeFrequency = "weekly" } = {}) {
  return {
    url: `${hostname}${slug}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  };
}

export default function sitemap() {
  const entries = [];

  // Pages defined in data/pages.json (home, pricing, stack landers, etc.)
  (pagesData.pages || []).forEach((page) => {
    if (!page.slug) return;
    entries.push(
      toEntry(page.slug, {
        priority: page.slug === "/" ? 1.0 : 0.8,
        changeFrequency: page.slug === "/" ? "daily" : "weekly",
      })
    );
  });

  // Programmatic dynamic routes
  (featuresData.features || []).forEach((item) => item.slug && entries.push(toEntry(item.slug)));
  (solutionsData.solutions || []).forEach((item) => item.slug && entries.push(toEntry(item.slug)));
  (audiencesData.audiences || []).forEach((item) => item.slug && entries.push(toEntry(item.slug)));
  (comparisonsData.comparisons || []).forEach(
    (item) => item.slug && entries.push(toEntry(item.slug, { priority: 0.8 }))
  );
  (stacksData.stacks || []).forEach((item) => item.slug && entries.push(toEntry(item.slug)));
  (usecasesData.usecases || []).forEach((item) => item.slug && entries.push(toEntry(item.slug)));

  // Dedupe by URL, in case any data file overlaps
  const seen = new Set();
  return entries.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
