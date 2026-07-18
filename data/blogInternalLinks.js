const MAX_CONTEXTUAL_LINKS = 6;

const INTERNAL_LINK_RULES = [
  {
    slug: "validate-your-saas-idea-before-building",
    phrases: [
      "validate your SaaS idea",
      "validate your idea",
      "validate your market",
      "idea validation",
      "validation guide",
      "validate before building",
      "validate early",
    ],
  },
  {
    slug: "how-to-build-saas-mvp-fast-guide",
    phrases: [
      "SaaS MVP",
      "build an MVP",
      "build your MVP",
      "MVP launch",
      "working MVP",
      "launching an MVP",
    ],
  },
  {
    slug: "saas-deployment-production-guide",
    phrases: [
      "deployment guide",
      "deployment friction",
      "deployment pipelines",
      "deploy your SaaS",
      "deploy your app",
      "production deployment",
      "from localhost",
    ],
  },
  {
    slug: "nextjs-saas-starter-kit-guide",
    phrases: [
      "Next.js SaaS starter kit",
      "Next.js SaaS guide",
      "Next.js SaaS",
      "building your SaaS with Next.js",
      "Next.js and MongoDB",
    ],
  },
  {
    slug: "best-authentication-setup-for-saas",
    phrases: [
      "authentication setup",
      "SaaS authentication",
      "secure login",
      "OAuth",
      "JWT",
      "password resets",
    ],
  },
  {
    slug: "how-to-add-stripe-or-paystack-payments-to-your-saas",
    phrases: [
      "Stripe payments",
      "Paystack payments",
      "Stripe or Paystack",
      "payment integration",
      "billing system",
      "subscription payments",
    ],
  },
  {
    slug: "how-to-track-user-behavior-in-your-sassypack-app-using-posthog",
    phrases: [
      "PostHog",
      "product analytics",
      "track user behavior",
      "analytics dashboard",
      "session recording",
      "feature flags",
    ],
  },
  {
    slug: "building-saas-apps-with-Nextjs-stack",
    phrases: [
      "Nextjs stack",
      "MongoDB Express React Node",
      "MongoDB backend",
      "Express backend",
      "React frontend",
      "Node.js backend",
    ],
  },
  {
    slug: "saas-seo-content-strategy-2026-guide",
    phrases: [
      "SaaS SEO",
      "SEO content strategy",
      "content strategy",
      "programmatic SEO",
      "technical SEO",
      "rank on Google",
    ],
  },
  {
    slug: "sassypack-vs-building-from-scratch",
    phrases: [
      "building from scratch",
      "build from scratch",
      "from scratch",
      "boilerplate code",
      "starter kit",
      "SaaS starter kit",
    ],
  },
];

const BLOCK_SEPARATOR = /(\n\s*\n)/;
const PROTECTED_INLINE_PATTERN = /!?\[[^\]]*]\([^)]+\)|`[^`]*`|https?:\/\/\S+/g;

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const sortByDateDesc = (a, b) => new Date(b.date) - new Date(a.date);

export const getUniqueSortedBlogPosts = (posts) => {
  const seenSlugs = new Set();

  return [...posts]
    .sort(sortByDateDesc)
    .filter((post) => {
      if (seenSlugs.has(post.slug)) return false;
      seenSlugs.add(post.slug);
      return true;
    });
};

export const getContextualLinkRules = (currentSlug, posts) => {
  const postBySlug = new Map(posts.map((post) => [post.slug, post]));

  return INTERNAL_LINK_RULES
    .filter((rule) => rule.slug !== currentSlug && postBySlug.has(rule.slug))
    .map((rule) => ({
      ...rule,
      href: `/blog/${rule.slug}`,
      title: postBySlug.get(rule.slug).title,
      phrases: [...rule.phrases].sort((a, b) => b.length - a.length),
    }));
};

const isParagraphBlock = (block) => {
  const trimmed = block.trim();

  if (!trimmed) return false;
  if (/^(```|~~~)/.test(trimmed)) return false;
  if (/^(#{1,6}\s|[-*+]\s|\d+\.\s|>\s|\|)/.test(trimmed)) return false;
  if (/^(!?\[[^\]]*]\([^)]+\)|<\/?[a-z][\s\S]*>)/i.test(trimmed)) return false;

  return /[A-Za-z]/.test(trimmed);
};

const getProtectedRanges = (block) => {
  const ranges = [];

  for (const match of block.matchAll(PROTECTED_INLINE_PATTERN)) {
    ranges.push([match.index, match.index + match[0].length]);
  }

  return ranges;
};

const isProtectedIndex = (index, ranges) =>
  ranges.some(([start, end]) => index >= start && index < end);

const findPhraseMatch = (block, phrase, protectedRanges) => {
  const pattern = new RegExp(
    `(^|[^A-Za-z0-9_])(${escapeRegExp(phrase)})(?=$|[^A-Za-z0-9_])`,
    "i"
  );
  const match = pattern.exec(block);

  if (!match) return null;

  const start = match.index + match[1].length;
  const text = match[2];

  if (isProtectedIndex(start, protectedRanges)) return null;

  return { start, end: start + text.length, text };
};

const linkFirstAvailablePhrase = (block, rule) => {
  if (block.includes(`](${rule.href})`)) {
    return { block, linked: false };
  }

  const protectedRanges = getProtectedRanges(block);

  for (const phrase of rule.phrases) {
    const match = findPhraseMatch(block, phrase, protectedRanges);

    if (!match) continue;

    return {
      block: `${block.slice(0, match.start)}[${match.text}](${rule.href})${block.slice(match.end)}`,
      linked: true,
    };
  }

  return { block, linked: false };
};

export const addContextualLinksToMarkdown = (
  content,
  rules,
  maxLinks = MAX_CONTEXTUAL_LINKS
) => {
  const usedTargets = new Set();
  let linkCount = 0;

  return content
    .split(BLOCK_SEPARATOR)
    .map((block) => {
      if (linkCount >= maxLinks || !isParagraphBlock(block)) return block;

      let linkedBlock = block;

      for (const rule of rules) {
        if (linkCount >= maxLinks) break;
        if (usedTargets.has(rule.slug)) continue;

        const result = linkFirstAvailablePhrase(linkedBlock, rule);
        linkedBlock = result.block;

        if (result.linked) {
          usedTargets.add(rule.slug);
          linkCount += 1;
        }
      }

      return linkedBlock;
    })
    .join("");
};
