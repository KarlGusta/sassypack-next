import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero({ h1, heading, subheading, cta, problem }) {
  const title = h1 || heading;

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden bg-[#FDFCF6]">
      <div className="max-w-5xl mx-auto text-center">
        {title && (
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none text-[#111827]">
            {title}
          </h1>
        )}

        {subheading && (
          <p className="text-xl md:text-2xl text-[#111827]/70 mb-6 max-w-2xl mx-auto leading-relaxed">
            {subheading}
          </p>
        )}

        {problem && (
          <p className="text-lg text-[#111827]/60 mb-8 max-w-2xl mx-auto leading-relaxed">
            {problem}
          </p>
        )}

        {cta && (
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-4">
            <Link
              href={cta.link}
              className="inline-flex items-center gap-2 px-10 py-5 text-lg font-black bg-[#111827] text-white rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              {cta.text} <ArrowRight size={20} />
            </Link>
            <div className="text-sm font-bold text-[#111827]/50">
              One-time purchase · Lifetime updates
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
