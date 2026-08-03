import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, Mail, ShieldCheck, Zap } from "lucide-react";
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

function LinkedInIcon({ size = 12, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon({ size = 12, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
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
                    <LinkedInIcon size={12} /> LinkedIn
                  </a>
                  <a
                    href={author.socials.github.url}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-2.5 py-1 text-xs font-semibold text-[#4B5563] transition hover:border-[#CBD5E1] hover:bg-white hover:text-[#111827]"
                  >
                    <GitHubIcon size={12} /> {author.socials.github.handle}
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
