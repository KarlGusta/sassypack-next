import Link from "next/link";

export default function FeatureGrid({ heading, features, items }) {
  const featureList = features || items || [];

  return (
    <section className="py-24 px-6 bg-[#FFFBEB]">
      <div className="max-w-6xl mx-auto">
        {heading && (
          <h2 className="text-3xl md:text-5xl font-black mb-12 text-center text-[#111827]">
            {heading}
          </h2>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureList.map((feature, index) => {
            const title = feature.title || feature;
            const inner = (
              <div className="group p-8 bg-white border-2 border-black rounded-3xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all h-full">
                <h3 className="text-xl font-black mb-3 text-[#111827] group-hover:text-[#6366F1] transition-colors">
                  {title}
                </h3>
                {feature.description && (
                  <p className="text-[#111827]/70 leading-relaxed">{feature.description}</p>
                )}
              </div>
            );

            return feature.link ? (
              <Link key={index} href={feature.link} className="h-full">
                {inner}
              </Link>
            ) : (
              <div key={index}>{inner}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
