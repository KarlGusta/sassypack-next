import Link from "next/link";
import { blogPosts } from "@/lib/blogPosts";
import {
  addContextualLinksToMarkdown,
  getContextualLinkRules,
  getUniqueSortedBlogPosts,
} from "@/data/blogInternalLinks";
import { getHubPath, getHubsForPost } from "@/data/blogHubs";
import { NOINDEX_SLUGS } from "@/lib/blogNoindexSlugs";
import MarkdownContent from "@/components/blog/MarkdownContent";
import ShareButtons from "@/components/blog/ShareButtons";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  User,
  ChevronRight,
  Clock,
} from "lucide-react";

const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF7F4A] px-6 py-3 text-sm font-semibold text-[#111827] transition hover:bg-[#FF7F4A]";
const secondaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-5 py-3 text-sm font-semibold text-[#111827] transition hover:border-[#111827]";
const cardClass = "rounded-lg border border-[#E5E7EB] bg-white shadow-sm";

function getPost(slug) {
  const sortedBlogPosts = getUniqueSortedBlogPosts(blogPosts);
  const currentPostIndex = sortedBlogPosts.findIndex((p) => p.slug === slug);
  const post = currentPostIndex >= 0 ? sortedBlogPosts[currentPostIndex] : null;
  const previousPost = currentPostIndex > 0 ? sortedBlogPosts[currentPostIndex - 1] : null;
  const nextPost =
    currentPostIndex >= 0 && currentPostIndex < sortedBlogPosts.length - 1
      ? sortedBlogPosts[currentPostIndex + 1]
      : null;

  return { sortedBlogPosts, post, previousPost, nextPost };
}

export function generateStaticParams() {
  const sortedBlogPosts = getUniqueSortedBlogPosts(blogPosts);
  return sortedBlogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { post } = getPost(slug);

  if (!post) {
    return { title: "Post not found | SassyPack" };
  }

  const canonicalUrl = `https://sassypack.collabtower.com/blog/${slug}`;
  const shouldNoindex = NOINDEX_SLUGS.has(slug);

  return {
    title: `${post.title} | SassyPack`,
    description: post.description,
    alternates: { canonical: canonicalUrl },
    robots: shouldNoindex ? "noindex, follow" : "index, follow",
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const { sortedBlogPosts, post, previousPost, nextPost } = getPost(slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-[#F8FAFC] px-6 py-32 text-[#111827]">
        <div className={`${cardClass} mx-auto max-w-2xl p-8 text-center`}>
          <h2 className="text-4xl font-semibold tracking-tight">Post not found</h2>
          <p className="mt-4 text-base leading-7 text-[#4B5563]">
            The article you are looking for has moved or doesn't exist.
          </p>
          <Link href="/blog" className={`${primaryButtonClass} mt-8`}>
            <ArrowLeft size={18} /> Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  const sameCategory = sortedBlogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const fallback = sortedBlogPosts
    .filter((p) => p.slug !== post.slug && p.category !== post.category)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const relatedPosts = [...sameCategory, ...fallback].slice(0, 3);

  const postHubs = getHubsForPost(post, sortedBlogPosts);
  const contextualLinkRules = getContextualLinkRules(post.slug, sortedBlogPosts);
  const articleContent = addContextualLinksToMarkdown(post.content, contextualLinkRules);

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-6 pb-20 pt-28 text-[#111827] lg:pt-36">
      <nav className="mx-auto mb-8 flex max-w-4xl items-center gap-2 text-sm font-medium text-[#6B7280]">
        <Link href="/" className="transition hover:text-[#111827]">Home</Link>
        <ChevronRight size={14} />
        <Link href="/blog" className="transition hover:text-[#111827]">Blog</Link>
        <ChevronRight size={14} />
        <span className="truncate text-[#111827]">{post.category}</span>
      </nav>

      <article className="mx-auto max-w-4xl">
        <header className={`${cardClass} p-6 md:p-10`}>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6366F1]">
            {post.category}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            {post.title}
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-[#E5E7EB] pt-6 text-sm font-medium text-[#6B7280]">
            <div className="flex items-center gap-2 text-[#111827]">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFE711] text-[#111827]">
                <User size={16} />
              </div>
              <span>Karl Gusta</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={17} />
              <span>
                {new Date(post.date).toLocaleDateString(undefined, {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={17} />
              <span>5 min read</span>
            </div>
          </div>
        </header>

        <div className={`${cardClass} mt-6 p-6 md:p-10`}>
          <MarkdownContent content={articleContent} />
        </div>

        {postHubs.length > 0 && (
          <section className={`${cardClass} mt-6 p-6`}>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6366F1]">
              Part of these topic hubs
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {postHubs.map((hub) => (
                <Link key={hub.slug} href={getHubPath(hub)} className={secondaryButtonClass}>
                  {hub.title} <ChevronRight size={16} />
                </Link>
              ))}
            </div>
          </section>
        )}

        {(previousPost || nextPost) && (
          <nav className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2" aria-label="Article navigation">
            {previousPost ? (
              <Link
                href={`/blog/${previousPost.slug}`}
                className={`${cardClass} group flex h-full flex-col justify-between p-6 transition hover:-translate-y-1 hover:shadow-md`}
              >
                <span className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
                  <ArrowLeft size={16} /> Previous Article
                </span>
                <span className="text-xl font-semibold leading-tight text-[#111827] transition group-hover:text-[#6366F1]">
                  {previousPost.title}
                </span>
                <span className="mt-4 text-sm font-medium text-[#6B7280]">
                  {new Date(previousPost.date).toLocaleDateString(undefined, {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </Link>
            ) : (
              <div className="hidden md:block" aria-hidden="true" />
            )}

            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className={`${cardClass} group flex h-full flex-col justify-between p-6 transition hover:-translate-y-1 hover:shadow-md md:text-right`}
              >
                <span className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280] md:justify-end">
                  Next Article <ArrowRight size={16} />
                </span>
                <span className="text-xl font-semibold leading-tight text-[#111827] transition group-hover:text-[#6366F1]">
                  {nextPost.title}
                </span>
                <span className="mt-4 text-sm font-medium text-[#6B7280]">
                  {new Date(nextPost.date).toLocaleDateString(undefined, {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </Link>
            ) : null}
          </nav>
        )}

        <div className="mt-8 flex flex-col items-center justify-between gap-5 border-t border-[#E5E7EB] pt-8 md:flex-row">
          <ShareButtons title={post.title} />
          <Link href="/blog" className={secondaryButtonClass}>
            <ArrowLeft size={18} /> Back to all insights
          </Link>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="mx-auto mt-20 max-w-5xl">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6366F1]">
                Keep Reading
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Related Articles
              </h2>
            </div>
            <Link href="/blog" className={secondaryButtonClass}>
              View all posts <ChevronRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {relatedPosts.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className={`${cardClass} group p-6 transition hover:-translate-y-1 hover:shadow-md`}
              >
                <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
                  <span className="truncate">{item.category}</span>
                  <span>
                    {new Date(item.date).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold leading-tight text-[#111827] transition group-hover:text-[#6366F1]">
                  {item.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#4B5563]">
                  {item.description}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#111827]">
                  Read article <ChevronRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto mt-20 max-w-4xl">
        <div className={`${cardClass} p-8 text-center md:p-12`}>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6366F1]">
            Free Tools
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Ready to put the guide to work?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#4B5563]">
            Use the free SaaS tools to plan pricing, validate ideas, and check your launch setup.
          </p>
          <Link href="/free-tools" className={`${primaryButtonClass} mt-8`}>
            Open Free Tools <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
