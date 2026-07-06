import Link from "next/link";
import Hero from "@/components/sections/Hero";
import CTABlock from "@/components/sections/CTABlock";

export default function TemplateB({ data }) {
  const { content } = data;

  return (
    <div className="template-b">
      <Hero h1={content.h1} subheading={content.hero?.subheading} cta={content.hero?.cta} />

      {content.problem && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.problem.heading}</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{content.problem.description}</p>
          </div>
        </section>
      )}

      {content.solution && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.solution.heading}</h2>
            <ul className="space-y-3">
              {content.solution.points.map((point, index) => (
                <li key={index} className="flex items-start text-gray-700">
                  <span className="text-green-500 mr-3 mt-1 flex-shrink-0">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {content.technicalDetails && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {content.technicalDetails.heading}
            </h2>

            {content.technicalDetails.mern && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">MERN Stack Implementation</h3>
                <ul className="space-y-2">
                  {content.technicalDetails.mern.map((item, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="text-indigo-600 mr-3 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {content.technicalDetails.nextjs && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Next.js Implementation</h3>
                <ul className="space-y-2">
                  {content.technicalDetails.nextjs.map((item, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="text-indigo-600 mr-3 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {content.technicalDetails.details && (
              <ul className="space-y-2">
                {content.technicalDetails.details.map((item, index) => (
                  <li key={index} className="flex items-start text-gray-700">
                    <span className="text-indigo-600 mr-3 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {content.compatibleWith && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{content.compatibleWith.heading}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {content.compatibleWith.integrations.map((integration, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-900 font-medium">{integration}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {content.demo && (
        <section className="py-12 px-4 bg-gray-50 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{content.demo.heading}</h2>
            {content.demo.cta && (
              <Link
                href={content.demo.cta.link}
                className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                {content.demo.cta.text}
              </Link>
            )}
          </div>
        </section>
      )}

      {content.pricing && <CTABlock heading={content.pricing.heading} cta={content.pricing.cta} />}
    </div>
  );
}
