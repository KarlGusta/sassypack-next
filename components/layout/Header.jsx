"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: "Why it saves time", href: "#why" },
    { label: "What's inside", href: "#inside" },
    { label: "Pricing", href: "#pricing" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goHome = () => {
    router.push("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToSection = (href) => {
    router.push(`/${href}`);
    window.setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 px-4 transition-all duration-300 ${
        scrolled ? "py-3" : "py-4"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-lg border border-[#E5E7EB] bg-white/90 px-4 py-3 shadow-sm backdrop-blur md:px-5">
        <button
          type="button"
          onClick={goHome}
          className="text-left text-xl font-semibold tracking-tight text-[#111827] transition hover:text-[#6366F1]"
        >
          SassyPack
        </button>

        <nav className="hidden items-center gap-1 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] p-1 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => goToSection(item.href)}
              className="rounded-md px-3 py-2 text-sm font-medium text-[#4B5563] transition hover:bg-white hover:text-[#111827] hover:shadow-sm"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <Link
          href="/pricing"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FFE711] px-4 py-2.5 text-sm font-semibold text-[#111827] transition hover:bg-[#FFE711]"
        >
          Get the kit <ArrowRight size={16} />
        </Link>
      </div>
    </header>
  );
}
