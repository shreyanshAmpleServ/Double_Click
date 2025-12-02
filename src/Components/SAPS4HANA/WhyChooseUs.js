import React from "react"
import { CheckCircle2 } from "lucide-react"

const WhyChooseUs = () => {
  const reasons = [
    {
      title: "SAP Gold Partner",
      description: "Authorized partner with deep expertise and proven track record in S/4HANA implementations",
    },
    {
      title: "Expert Team",
      description: "Experienced consultants, developers, and project managers dedicated to your success",
    },
    {
      title: "End-to-End Support",
      description: "From assessment through implementation, training, and ongoing optimization",
    },
  ]

  return (
    <section className="!py-20 !bg-gradient-to-r !from-blue-50 !to-cyan-50">
      <div className="!max-w-7xl !mx-auto !px-4 sm:!px-6 lg:!px-8">
        <div className="!text-center !mb-16">
          <h2 className="!text-4xl !font-bold !mb-4">Why Choose DoubleClick?</h2>
          <p className="!text-lg !text-gray-600 !max-w-3xl !mx-auto">
            Your trusted SAP Gold Partner for S/4HANA success
          </p>
        </div>

        <div className="!grid md:!grid-cols-3 !gap-8">
          {reasons.map((reason, idx) => (
            <div key={idx} className="!bg-white !p-8 !rounded-lg !shadow-lg !border-l-4 !border-blue-600">
              <CheckCircle2 className="!w-8 !h-8 !text-blue-600 !mb-4" />
              <h3 className="!text-lg !font-semibold !text-gray-900 !mb-2">{reason.title}</h3>
              <p className="!text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
