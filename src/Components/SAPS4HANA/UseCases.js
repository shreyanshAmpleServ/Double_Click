import React from "react"

const UseCases = () => {
  const useCases = [
    { title: "Supply Chain Management", description: "Optimize procurement, logistics, and inventory management" },
    { title: "Finance & Controlling", description: "Real-time financial insights and advanced reporting" },
    { title: "Production Planning", description: "Monitor and optimize manufacturing workflows" },
    { title: "Sales & Distribution", description: "Enhance sales performance with real-time analytics" },
    { title: "Project Management", description: "Plan, execute, and monitor projects with integrated tracking" },
    { title: "Human Resources", description: "Streamline HR operations and talent management" },
  ]

  return (
    <section className="!py-20 !bg-gray-50">
      <div className="!max-w-7xl !mx-auto !px-4 sm:!px-6 lg:!px-8">
        <div className="!text-center !mb-16">
          <h2 className="!text-4xl !font-bold !mb-4">Industry Use Cases</h2>
          <p className="!text-lg !text-gray-600 !max-w-3xl !mx-auto">
            S/4HANA transforms operations across all business functions
          </p>
        </div>

        <div className="!grid md:!grid-cols-2 lg:!grid-cols-3 !gap-6">
          {useCases.map((useCase, idx) => (
            <div
              key={idx}
              className="!bg-white !p-8 !rounded-lg !border !border-gray-200 hover:!shadow-lg !transition-shadow"
            >
              <div className="!w-12 !h-12 !rounded-lg !bg-blue-100 !flex !items-center !justify-center !mb-4">
                <span className="!text-blue-600 !font-bold !text-lg">{idx + 1}</span>
              </div>
              <h3 className="!text-lg !font-semibold !text-gray-900 !mb-2">{useCase.title}</h3>
              <p className="!text-gray-600">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default UseCases
