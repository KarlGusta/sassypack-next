import Link from "next/link";
import { blogPosts } from "@/lib/blogPosts";
import { getUniqueSortedBlogPosts } from "@/data/blogInternalLinks";
import { blogHubs, getBlogHubBySlug, getHubArticles, getHubPath } from "@/data/blogHubs";
import { formatBlogDate } from "@/lib/blogDates";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";

const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF7F4A] px-6 py-3 text-sm font-semibold text-[#111827] transition hover:bg-[#FF7F4A]";
const secondaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-5 py-3 text-sm font-semibold text-[#111827] transition hover:border-[#111827]";
const cardClass = "rounded-lg border border-[#E5E7EB] bg-white shadow-sm";

function getHubData(hubSlug) {
  const hub = getBlogHubBySlug(hubSlug);
  if (!hub) return { hub: null, articles: [] };

  const sortedBlogPosts = getUniqueSortedBlogPosts(blogPosts);
  const articles = getHubArticles(hub, sortedBlogPosts);

  return { hub, articles };
}

export function generateStaticParams() {
  return blogHubs.map((hub) => ({ hubSlug: hub.slug }));
}

export async function generateMetadata({ params }) {
  const { hubSlug } = await params;
  const { hub } = getHubData(hubSlug);

  if (!hub) {
    return { title: "Hub not found | SassyPack" };
  }

  const canonicalUrl = `https://sassypack.collabtower.com/blog/hubs/${hubSlug}`;

  return {
    title: `${hub.title} | SassyPack`,
    description: hub.description,
    alternates: { canonical: canonicalUrl },
    robots: "index, follow",
    openGraph: {
      title: hub.title,
      description: hub.description,
      url: canonicalUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: hub.title,
      description: hub.description,
      creator: "@thekarlesi",
      site: "@UseSassyPack",
    },
  };
}

export default async function BlogHubPage({ params }) {
  const { hubSlug } = await params;
  const { hub, articles } = getHubData(hubSlug);

  if (!hub) {
    return (
      <main className="min-h-screen bg-[#F8FAFC] px-6 py-32 text-[#111827]">
        <div className={`${cardClass} mx-auto max-w-2xl p-8 text-center`}>
          <h2 className="text-4xl font-semibold tracking-tight">Hub not found</h2>
          <p className="mt-4 text-base leading-7 text-[#4B5563]">
            The topic hub you are looking for has moved or doesn&apos;t exist.
          </p>
          <Link href="/blog" className={`${primaryButtonClass} mt-8`}>
            <ArrowLeft size={18} /> Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  const otherHubs = blogHubs.filter((h) => h.slug !== hub.slug);

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-6 pb-20 pt-28 text-[#111827] lg:pt-36">
      <nav className="mx-auto mb-8 flex max-w-5xl items-center gap-2 text-sm font-medium text-[#6B7280]">
        <Link href="/" className="transition hover:text-[#111827]">Home</Link>
        <ChevronRight size={14} />
        <Link href="/blog" className="transition hover:text-[#111827]">Blog</Link>
        <ChevronRight size={14} />
        <span className="truncate text-[#111827]">{hub.title}</span>
      </nav>

      <header className="mx-auto max-w-5xl">
        <div className={`${cardClass} p-6 md:p-10`}>
          <p
            className="text-sm font-semibold uppercase tracking-[0.18em]"
            style={{ color: hub.accent }}
          >
            {hub.label}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            {hub.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#4B5563]">
            {hub.description}
          </p>
        </div>
      </header>

      {articles.length > 0 ? (
        <section className="mx-auto mt-10 max-w-5xl">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {articles.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`${cardClass} group p-6 transition hover:-translate-y-1 hover:shadow-md`}
              >
                <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
                  <span className="truncate">{post.category}</span>
                  <span>
                    {formatBlogDate(post.date, { month: "short", year: undefined })}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold leading-tight text-[#111827] transition group-hover:text-[#6366F1]">
                  {post.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#4B5563]">
                  {post.description}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#111827]">
                  Read article <ChevronRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <section className="mx-auto mt-10 max-w-5xl">
          <div className={`${cardClass} p-8 text-center`}>
            <p className="text-base leading-7 text-[#4B5563]">
              No articles are available in this hub yet. Check back soon.
            </p>
          </div>
        </section>
      )}

      {otherHubs.length > 0 && (
        <section className="mx-auto mt-16 max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6366F1]">
            Explore other hubs
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {otherHubs.map((h) => (
              <Link key={h.slug} href={getHubPath(h)} className={secondaryButtonClass}>
                {h.title} <ChevronRight size={16} />
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto mt-16 max-w-4xl">
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

      <div className="mx-auto mt-10 max-w-5xl">
        <Link href="/blog" className={secondaryButtonClass}>
          <ArrowLeft size={18} /> Back to all insights
        </Link>
      </div>
    </main>
  );
}