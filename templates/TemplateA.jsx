import Link from "next/link";
import Hero from "@/components/sections/Hero";
import FeatureGrid from "@/components/sections/FeatureGrid";
import TechStack from "@/components/sections/TechStack";
import CTABlock from "@/components/sections/CTABlock";

export default function TemplateA({ data }) {
  const { content } = data;

  return (
    <div className="template-a">
      <Hero
        h1={content.h1}
        heading={content.hero?.heading}
        subheading={content.hero?.subheading}
        cta={content.hero?.cta}
      />

      {content.whatsIncluded && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {content.whatsIncluded.heading}
            </h2>
            <ul className="space-y-3 max-w-2xl mx-auto">
              {content.whatsIncluded.features.map((feature, index) => (
                <li key={index} className="flex items-start text-gray-700">
                  <span className="text-green-500 mr-3 mt-1 flex-shrink-0">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {content.timeSavings && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {content.timeSavings.heading}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div className="bg-red-50 p-6 rounded-lg border-2 border-red-200">
                <h3 className="text-xl font-semibold text-red-900 mb-2">Custom Build</h3>
                <p className="text-3xl font-bold text-red-600">
                  {content.timeSavings.comparison.custom}
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                <h3 className="text-xl font-semibold text-green-900 mb-2">With SassyPack</h3>
                <p className="text-3xl font-bold text-green-600">
                  {content.timeSavings.comparison.sassypack}
                </p>
              </div>
            </div>
            <p className="text-center text-gray-700 text-lg">{content.timeSavings.description}</p>
          </div>
        </section>
      )}

      {content.techStack && (
        <TechStack
          heading={content.techStack.heading}
          technologies={content.techStack.technologies}
          backend={content.techStack.backend}
          frontend={content.techStack.frontend}
          stack={content.techStack.stack}
        />
      )}

      {content.builtInFeatures && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              {content.builtInFeatures.heading}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {content.builtInFeatures.items.map((item, index) => (
                <div key={index} className="p-6 border border-gray-200 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  {item.link && (
                    <Link href={item.link} className="text-indigo-600 hover:text-indigo-700 font-medium">
                      Learn more →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {content.productionReady && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {content.productionReady.heading}
            </h2>
            <ul className="space-y-3 max-w-2xl mx-auto">
              {content.productionReady.points.map((point, index) => (
                <li key={index} className="flex items-start text-gray-700">
                  <span className="text-indigo-600 mr-3 mt-1 flex-shrink-0">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {content.architecture && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {content.architecture.heading}
            </h2>
            <ul className="space-y-3 max-w-2xl mx-auto">
              {content.architecture.structure.map((item, index) => (
                <li key={index} className="flex items-start text-gray-700">
                  <span className="text-indigo-600 mr-3 mt-1 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {content.keyFeatures && (
        <FeatureGrid heading={content.keyFeatures.heading} items={content.keyFeatures.items} />
      )}

      {content.deployment && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {content.deployment.heading}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {content.deployment.options.map((option, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-900 font-medium">{option}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {content.pricing && (
        <section className="py-12 px-4 bg-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{content.pricing.heading}</h2>
            {content.pricing.cta && (
              <Link
                href={content.pricing.cta.link}
                className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                {content.pricing.cta.text}
              </Link>
            )}
          </div>
        </section>
      )}

      {content.finalCTA && (
        <CTABlock
          heading={content.finalCTA.heading}
          subheading={content.finalCTA.subheading}
          cta={content.finalCTA.cta}
        />
      )}

      {content.cta && (
        <CTABlock heading={content.cta.heading} subheading={content.cta.subheading} button={content.cta.button} />
      )}
    </div>
  );
}
