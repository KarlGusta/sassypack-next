import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, Github, Linkedin, Mail, ShieldCheck, Zap } from "lucide-react";
import { author } from "@/data/author";

const primaryCheckoutUrl = "https://karlgusta.gumroad.com/l/mlixgb?wanted=true";

function XIcon({ size = 15, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.2 2.25h7.54l4.261 5.678L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

const linkGroups = [
  {
    title: "Product",
    links: [
      { name: "Why SassyPack", href: "/why" },
      { name: "What's Inside", href: "/whats-inside" },
      { name: "Pricing", href: "/pricing" },
      { name: "Free Tools", href: "/free-tools" },
      { name: "Resources", href: "/resources" },
      { name: "Blog", href: "/blog" },
      { name: "Help Center", href: "/faq" },
    ],
  },
  {
    title: "Browse",
    links: [
      { name: "Features", href: "/features" },
      { name: "Solutions", href: "/solutions" },
      { name: "Audiences", href: "/for" },
      { name: "Comparisons", href: "/vs" },
      { name: "Stacks", href: "/stacks" },
      { name: "Use Cases", href: "/use-cases" },
      { name: "Industries", href: "/industries" },
    ],
  },
  {
    title: "Comparisons",
    links: [
      { name: "vs ShipFast", href: "/blog/sassypack-vs-shipfast" },
      { name: "vs MakerKit", href: "/blog/sassypack-vs-makerkit-2" },
      { name: "vs Supastarter", href: "/blog/sassypack-vs-supastarter-2" },
      { name: "vs Next.js Starters", href: "/blog/sassypack-vs-nextjs-starters" },
    ],
  },
  {
    title: "Connect",
    links: [
      { name: "Email Support", href: `mailto:${author.email}`, icon: Mail, external: true },
      { name: "Follow SassyPack on X", href: "https://x.com/UseSassyPack", icon: XIcon, external: true },
      { name: "Gumroad Store", href: primaryCheckoutUrl, icon: ExternalLink, external: true },
      { name: "Privacy Policy", href: "/privacy" },
    ],
  },
];

// Other products built by the creator.
const creatorProjects = [
  { name: "AdPurity", href: "https://adpurity.collabtower.com/" },
  { name: "Adentra", href: "https://adentra.collabtower.com/" },
  { name: "Zero to SaaS", href: "https://zero-to-saas.collabtower.com/" },
  { name: "Hireva", href: "https://hireva.collabtower.com/" },
  { name: "Nexora", href: "https://nexora.collabtower.com/" },
  { name: "Operanta", href: "https://operanta.collabtower.com/" },
];

function FooterLink({ link }) {
  const Icon = link.icon;
  const className =
    "flex items-center gap-2 text-sm font-medium text-[#4B5563] transition hover:text-[#111827]";

  const content = (
    <>
      {Icon && <Icon size={15} className="text-[#6B7280]" />}
      {link.name}
    </>
  );

  if (link.external) {
    return (
      <a
        href={link.href}
        target={link.href.startsWith("mailto:") ? undefined : "_blank"}
        rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {content}
    </Link>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E5E7EB] bg-[#F8FAFC] px-6 py-16 text-[#111827]">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-lg border border-[#E5E7EB] bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-2xl font-semibold tracking-tight">SassyPack</p>
                <p className="mt-4 max-w-xl text-sm leading-6 text-[#4B5563]">
                  SassyPack is a Next.js starter kit that helps you launch your SaaS in hours with pre-built authentication, payments, dashboards, and APIs. Built by {author.name}.
                </p>
              </div>
              <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-[#D1FAE5] bg-[#ECFDF5] px-3 py-2 text-sm font-semibold text-[#047857]">
                <ShieldCheck size={16} />
                Production ready
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF7F4A] px-5 py-3 text-sm font-semibold text-[#111827] transition hover:bg-[#FF7F4A]"
              >
                Get SassyPack <ArrowRight size={16} />
              </Link>
              <a
                href="https://sassypack.collabtower.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-5 py-3 text-sm font-semibold text-[#111827] transition hover:border-[#111827]"
              >
                <Zap size={16} />
                Built with SassyPack
              </a>
            </div>
          </div>

          <div className="rounded-lg border border-[#E5E7EB] bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6366F1]">Quick access</p>
            <p className="mt-3 text-sm leading-6 text-[#4B5563]">
              Jump into the parts buyers usually check before choosing a starter kit.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {["Pricing", "FAQ", "Features", "Free Tools"].map((label) => (
                <Link
                  key={label}
                  href={"/" + label.toLowerCase().replace(" ", "-")}
                  className="rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2 text-sm font-medium text-[#4B5563] transition hover:border-[#CBD5E1] hover:bg-white hover:text-[#111827]"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {linkGroups.map((group) => (
            <div key={group.title} className="rounded-lg border border-[#E5E7EB] bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-[#111827]">{group.title}</h3>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={group.title + "-" + link.name}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-lg border border-[#E5E7EB] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <Image
                src={author.image}
                alt={author.imageAlt}
                width={56}
                height={56}
                className="rounded-lg border border-[#E5E7EB] object-cover"
              />
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6366F1]">
                  Built by {author.name}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-[#4B5563]">
                  {author.shortBio}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={author.socials.twitter.url}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-2.5 py-1 text-xs font-semibold text-[#4B5563] transition hover:border-[#CBD5E1] hover:bg-white hover:text-[#111827]"
                  >
                    <XIcon size={12} /> {author.socials.twitter.handle}
                  </a>
                  <a
                    href={author.socials.linkedin.url}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-2.5 py-1 text-xs font-semibold text-[#4B5563] transition hover:border-[#CBD5E1] hover:bg-white hover:text-[#111827]"
                  >
                    <Linkedin size={12} /> LinkedIn
                  </a>
                  <a
                    href={author.socials.github.url}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-2.5 py-1 text-xs font-semibold text-[#4B5563] transition hover:border-[#CBD5E1] hover:bg-white hover:text-[#111827]"
                  >
                    <Github size={12} /> {author.socials.github.handle}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-[#E5E7EB] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6366F1]">
              More from the creator
            </h3>
            <p className="text-sm text-[#6B7280]">Other products built with SassyPack.</p>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {creatorProjects.map((project) => (
              <a
                key={project.name}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-2 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2 text-sm font-medium text-[#4B5563] transition hover:border-[#CBD5E1] hover:bg-white hover:text-[#111827]"
              >
                {project.name}
                <ExternalLink size={13} className="shrink-0 text-[#9CA3AF]" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-[#E5E7EB] pt-6 text-sm font-medium text-[#6B7280] md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} SassyPack. Built by {author.name}. All rights reserved.</p>
          <p>One-time purchase · Lifetime updates · Source code included</p>
        </div>
      </div>
    </footer>
  );
}
