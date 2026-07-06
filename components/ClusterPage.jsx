import Link from "next/link";
import { ArrowRight, Boxes, CheckCircle2 } from "lucide-react";

export default function ClusterPage({ title, description, pages = [], relatedClusters = [] }) {
  return (
    <main className="min-h-screen bg-[#F8FAFC] px-6 pb-20 pt-28 text-[#111827] lg:pt-36">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-semibold text-[#4B5563] shadow-sm">
            <Boxes size={16} />
            {pages.length} pages
          </div>
          <h1 className="mt-7 text-5xl font-semibold tracking-tight text-[#111827] md:text-7xl">{title}</h1>
          <p className="mt-6 text-lg leading-8 text-[#4B5563] md:text-xl">{description}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {pages.map((page) => (
            <Link
              key={page.slug}
              href={page.slug}
              className="group rounded-lg border border-[#E5E7EB] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FFE711] text-[#111827]">
                  <CheckCircle2 size={20} className="text-[#111827]" />
                </div>
                <ArrowRight size={20} className="text-[#9CA3AF] transition-all group-hover:translate-x-1 group-hover:text-[#111827]" />
              </div>
              <h2 className="text-2xl font-semibold leading-tight text-[#111827]">
                {page.name || page.meta?.title || page.id}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#4B5563]">{page.meta?.description}</p>
            </Link>
          ))}
        </div>

        {relatedClusters.length > 0 && (
          <section className="mt-16 rounded-lg border border-[#E5E7EB] bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6366F1]">Next step</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#111827]">
              Keep exploring related sections.
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {relatedClusters.map((item) => (
                <Link
                  key={item.slug}
                  href={item.slug}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#FF7F4A] px-5 py-3 text-sm font-semibold text-[#111827] transition hover:bg-[#FF7F4A]"
                >
                  {item.label}
                  <ArrowRight size={16} />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
