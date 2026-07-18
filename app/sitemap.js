import pagesData from "@/data/pages.json";
import featuresData from "@/data/features.json";
import solutionsData from "@/data/solutions.json";
import audiencesData from "@/data/audiences.json";
import comparisonsData from "@/data/comparisons.json";
import stacksData from "@/data/stacks.json";
import usecasesData from "@/data/usecases.json";

const hostname = "https://sassypack.collabtower.com";

function toEntry(slug, options) {
  const priority = options && options.priority !== undefined ? options.priority : 0.9;
  const changeFrequency = options && options.changeFrequency ? options.changeFrequency : "weekly";
  return {
    url: hostname + slug,
    lastModified: new Date(),
    changeFrequency: changeFrequency,
    priority: priority,
  };
}

export default function sitemap() {
  const entries = [];

  (pagesData.pages || []).forEach(function (page) {
    if (!page.slug) return;
    entries.push(
      toEntry(page.slug, {
        priority: page.slug === "/" ? 1.0 : 0.8,
        changeFrequency: page.slug === "/" ? "daily" : "weekly",
      })
    );
  });

  (featuresData.features || []).forEach(function (item) {
    if (item.slug) entries.push(toEntry(item.slug));
  });
  (solutionsData.solutions || []).forEach(function (item) {
    if (item.slug) entries.push(toEntry(item.slug));
  });
  (audiencesData.audiences || []).forEach(function (item) {
    if (item.slug) entries.push(toEntry(item.slug));
  });
  (comparisonsData.comparisons || []).forEach(function (item) {
    if (item.slug) entries.push(toEntry(item.slug, { priority: 0.8 }));
  });
  (stacksData.stacks || []).forEach(function (item) {
    if (item.slug) entries.push(toEntry(item.slug));
  });
  (usecasesData.usecases || []).forEach(function (item) {
    if (item.slug) entries.push(toEntry(item.slug));
  });

  const seen = new Set();
  return entries.filter(function (entry) {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
