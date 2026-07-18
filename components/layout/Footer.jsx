import Link from "next/link";
import { ArrowRight, ExternalLink, Mail, ShieldCheck, X, Zap } from "lucide-react";

const primaryCheckoutUrl = "https://karlgusta.gumroad.com/l/mlixgb?wanted=true";

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
      { name: "Email Support", href: "mailto:esimitkarlgusta@gmail.com", icon: Mail, external: true },
      { name: "Follow on X", href: "https://x.com/UseSassyPack", icon: X, external: true },
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
                  SassyPack | Next.js starter kitho want the launch plumbing handled before the real product work begins.
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
          <p>© {currentYear} SassyPack. All rights reserved.</p>
          <p>One-time purchase · Lifetime updates · Source code included</p>
        </div>
      </div>
    </footer>
  );
}