import Link from "next/link";
import { ArrowRight, Layout, CreditCard, BookOpen, FolderOpen } from "lucide-react";

export const metadata = {
  title: "Page not found | SassyPack",
  description:
    "This route couldn’t be found. Head home or explore SassyPack — the Next.js starter kit that helps you skip setup and ship faster.",
};

const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF7F4A] px-6 py-3 text-sm font-semibold text-[#111827] transition hover:bg-[#FF7F4A]";
const secondaryButtonClass =
  "inline-flex items-center justify-center rounded-lg border border-[#D1D5DB] bg-white px-6 py-3 text-sm font-semibold text-[#111827] transition hover:border-[#111827]";
const cardClass =
  "rounded-lg border border-[#E5E7EB] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md";

const whileHere = [
  {
    title: "Explore what’s inside",
    desc: "Auth, payments, protected routes, analytics, SEO, and more.",
    href: "/#inside",
    icon: Layout,
  },
  {
    title: "Check pricing",
    desc: "Pick a plan and start building.",
    href: "/pricing",
    icon: CreditCard,
  },
  {
    title: "Read the blog",
    desc: "Practical guides for launching SaaS faster.",
    href: "/blog",
    icon: BookOpen,
  },
  {
    title: "Browse resources",
    desc: "Tools and guides to help you ship.",
    href: "/resources",
    icon: FolderOpen,
  },
];

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] px-6 pb-20 pt-28 text-[#111827] lg:pt-36">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6366F1]">
            404
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
            Looks like this route needs some setup.
          </h1>
          <p className="mt-5 text-base leading-7 text-[#4B5563] md:text-lg">
            The page you requested couldn&apos;t be found.
            <br className="hidden sm:block" />
            Fortunately, SassyPack already handles the setup you actually need.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/" className={primaryButtonClass}>
              Back to SassyPack <ArrowRight size={18} />
            </Link>
            <Link href="/pricing" className={secondaryButtonClass}>
              Get the starter kit
            </Link>
          </div>
        </div>

        <div className="mt-16">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.18em] text-[#6366F1]">
            While you&apos;re here
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whileHere.map((item) => (
              <Link key={item.title} href={item.href} className={cardClass}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EEF2FF] text-[#4F46E5]">
                  <item.icon size={20} />
                </div>
                <h2 className="mt-5 text-base font-semibold text-[#111827]">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#4B5563]">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-xl rounded-lg border border-[#E5E7EB] bg-white p-6 text-center shadow-sm">
          <p className="text-xl font-semibold tracking-tight">SassyPack</p>
          <p className="mt-2 text-sm leading-6 text-[#4B5563]">
            Launch SaaS faster. Skip the setup.
          </p>
          <p className="mt-4 text-xs font-medium text-[#6B7280]">
            One-time purchase · Lifetime updates · Source code included
          </p>
        </div>
      </div>
    </main>
  );
}
