"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { blogPosts } from "@/lib/blogPosts";
import { blogHubs, getHubPath } from "@/data/blogHubs";
import { getUniqueSortedBlogPosts } from "@/data/blogInternalLinks";
import { Search, Tag, Calendar, ArrowRight, BookOpen, Layers } from "lucide-react";

const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF7F4A] px-5 py-3 text-sm font-semibold text-[#111827] transition hover:bg-[#FF7F4A]";
const secondaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-5 py-3 text-sm font-semibold text-[#111827] transition hover:border-[#111827]";
const cardClass = "rounded-lg border border-[#E5E7EB] bg-white shadow-sm";

export default function BlogListPage() {
  const sortedPosts = useMemo(() => getUniqueSortedBlogPosts(blogPosts), []);
  const categories = ["All", ...new Set(sortedPosts.map((p) => p.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts =
    selectedCategory === "All"
      ? sortedPosts
      : sortedPosts.filter((post) => post.category === selectedCategory);

  const getCoverImage = (post) =>
    `https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800&q=${post.slug}`;

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-6 pb-20 pt-28 text-[#111827] lg:pt-36">
      <section className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-semibold text-[#4B5563] shadow-sm">
            <BookOpen size={16} />
            Insights & guides
          </div>
          <h1 className="mt-7 text-5xl font-semibold tracking-tight md:text-7xl">
            SaaS guides for faster shipping.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4B5563] md:text-xl">
            Master the art of shipping SaaS with SassyPack engineering tips and founder stories.
          </p>
        </div>
      </section>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-start">
        <aside className="w-full lg:w-72">
          <div className="sticky top-28 space-y-5">
            <section className={`${cardClass} p-5`}>
              <div className="mb-5 flex items-center gap-2">
                <Tag size={18} className="text-[#6366F1]" />
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#111827]">
                  Categories
                </h2>
              </div>
              <nav className="flex flex-wrap gap-2 lg:flex-col">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-lg px-4 py-2.5 text-left text-sm font-medium transition ${
                      selectedCategory === cat
                        ? "bg-[#FFE711] text-[#111827]"
                        : "bg-[#F8FAFC] text-[#4B5563] hover:bg-white hover:text-[#111827]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </nav>
            </section>

            <section className={`${cardClass} p-5`}>
              <div className="mb-5 flex items-center gap-2">
                <Layers size={18} className="text-[#6366F1]" />
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#111827]">
                  Topic Hubs
                </h2>
              </div>
              <nav className="grid gap-3">
                {blogHubs.map((hub) => (
                  <Link
                    key={hub.slug}
                    href={getHubPath(hub)}
                    className="group rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] p-4 transition hover:border-[#CBD5E1] hover:bg-white"
                  >
                    <span
                      className="mb-3 inline-block h-2 w-10 rounded-full"
                      style={{ backgroundColor: hub.accent }}
                    />
                    <span className="block text-sm font-semibold text-[#111827]">
                      {hub.title}
                    </span>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#6B7280] group-hover:text-[#6366F1]">
                      Explore hub <ArrowRight size={12} />
                    </span>
                  </Link>
                ))}
              </nav>
            </section>

            <section className={`${cardClass} p-5`}>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6366F1]">
                Next step
              </p>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                Turn the guides into action.
              </h2>
              <Link href="/free-tools" className={`${primaryButtonClass} mt-5 w-full`}>
                Open free tools <ArrowRight size={16} />
              </Link>
            </section>

            <section className={`${cardClass} hidden p-5 lg:block`}>
              <BookOpen className="mb-4 text-[#6366F1]" size={28} />
              <h3 className="text-lg font-semibold">Build in Public</h3>
              <p className="mt-2 text-sm leading-6 text-[#4B5563]">
                Get shipping tips delivered directly to your inbox.
              </p>
              <button
                type="button"
                className="mt-5 w-full rounded-lg bg-[#FFE711] px-4 py-2.5 text-sm font-semibold text-[#111827] transition hover:bg-[#FFE711]"
              >
                Subscribe
              </button>
            </section>
          </div>
        </aside>

        <section className="flex-1">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6366F1]">
                Articles
              </p>
              <p className="mt-2 text-sm font-medium text-[#6B7280]">
                Showing {filteredPosts.length} articles
              </p>
            </div>
            <Link href="/blog" className={secondaryButtonClass}>
              All posts <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className={`${cardClass} group flex overflow-hidden transition hover:-translate-y-1 hover:shadow-md`}
              >
                <Link href={`/blog/${post.slug}`} className="flex w-full flex-col">
                  <div className="relative h-52 overflow-hidden bg-[#E5E7EB]">
                    <img
                      src={post.image || getCoverImage(post)}
                      alt={post.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute left-4 top-4">
                      <span className="rounded-lg bg-[#FFE711] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#111827]">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
                      <Calendar size={14} />
                      {new Date(post.date).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>

                    <h3 className="text-2xl font-semibold leading-tight text-[#111827] transition group-hover:text-[#6366F1]">
                      {post.title}
                    </h3>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#4B5563]">
                      {post.description}
                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#111827]">
                      Read article <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className={`${cardClass} py-20 text-center`}>
              <Search size={42} className="mx-auto mb-4 text-[#9CA3AF]" />
              <p className="text-lg font-semibold text-[#4B5563]">
                No articles found in this category.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
