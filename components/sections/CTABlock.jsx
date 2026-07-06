import Link from "next/link";

export default function CTABlock({ heading, subheading, cta, button }) {
  const ctaData = cta || button;

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto bg-[#111827] rounded-[3rem] p-12 md:p-24 text-white text-center">
        {heading && (
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">{heading}</h2>
        )}

        {subheading && (
          <p className="text-xl text-white/60 mb-12 max-w-xl mx-auto">{subheading}</p>
        )}

        {ctaData && (
          <Link
            href={ctaData.link}
            className="inline-block bg-white text-black px-12 py-5 text-xl font-black rounded-2xl border-2 border-white hover:bg-[#FFE711] hover:border-[#FFE711] hover:text-black transition-colors"
          >
            {ctaData.text}
          </Link>
        )}
      </div>
    </section>
  );
}
