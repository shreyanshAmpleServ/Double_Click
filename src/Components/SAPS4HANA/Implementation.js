import React from "react"

const Implementation = () => {
  const steps = [
    { number: "1", title: "Assessment", description: "Evaluate your current systems and business requirements" },
    { number: "2", title: "Planning", description: "Develop a comprehensive implementation roadmap" },
    { number: "3", title: "Implementation", description: "Deploy S/4HANA with minimal disruption to operations" },
    { number: "4", title: "Support", description: "Ongoing optimization and continuous improvement" },
  ]

  return (
    <section className="!py-20 !bg-white">
      <div className="!max-w-7xl !mx-auto !px-4 sm:!px-6 lg:!px-8">
        <div className="!text-center !mb-16">
          <h2 className="!text-4xl !font-bold !mb-4">Our Implementation Approach</h2>
          <p className="!text-lg !text-gray-600 !max-w-3xl !mx-auto">
            A proven methodology to ensure successful S/4HANA deployment
          </p>
        </div>

        <div className="!grid md:!grid-cols-4 !gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="!relative">
              <div className="!bg-gradient-to-br !from-blue-50 !to-cyan-50 !p-8 !rounded-lg !border !border-blue-200 !h-full">
                <div className="!w-12 !h-12 !rounded-full !bg-blue-600 !text-white !flex !items-center !justify-center !font-bold !text-lg !mb-4">
                  {step.number}
                </div>
                <h3 className="!text-lg !font-semibold !text-gray-900 !mb-2">{step.title}</h3>
                <p className="!text-gray-600">{step.description}</p>
              </div>
              {idx < steps.length - 1 && (
                <div className="!hidden md:!block !absolute !top-1/2 !-right-3 !w-6 !h-1 !bg-blue-600 !transform !-translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Implementation
