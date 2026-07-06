export default function TechStack({ heading, technologies, backend, frontend, stack }) {
  const flatList = technologies || stack;

  return (
    <section className="py-24 px-6 bg-[#C994FF]/10">
      <div className="max-w-4xl mx-auto">
        {heading && (
          <h2 className="text-3xl md:text-5xl font-black text-[#111827] mb-12 text-center">
            {heading}
          </h2>
        )}

        {flatList && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {flatList.map((tech, index) => (
              <div
                key={index}
                className="bg-white px-6 py-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-[#111827]"
              >
                {tech}
              </div>
            ))}
          </div>
        )}

        {(backend || frontend) && (
          <div className="grid md:grid-cols-2 gap-8">
            {backend && (
              <div>
                <h3 className="text-xl font-black text-[#111827] mb-6 pb-2 border-b-2 border-black">
                  Backend
                </h3>
                <ul className="space-y-3">
                  {backend.map((tech, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 bg-white border-2 border-black rounded-2xl px-5 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-[#111827]"
                    >
                      <span className="text-[#6366F1] font-black shrink-0">→</span>
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {frontend && (
              <div>
                <h3 className="text-xl font-black text-[#111827] mb-6 pb-2 border-b-2 border-black">
                  Frontend
                </h3>
                <ul className="space-y-3">
                  {frontend.map((tech, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 bg-white border-2 border-black rounded-2xl px-5 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-[#111827]"
                    >
                      <span className="text-[#6366F1] font-black shrink-0">→</span>
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
