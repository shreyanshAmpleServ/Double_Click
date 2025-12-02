import React from "react"
import { CheckCircle2 } from "lucide-react"

const WhatIsS4HANA = () => {
  const features = [
    {
      title: "In-Memory Architecture",
      description: "Process data at lightning speed with SAP HANA's in-memory database technology",
    },
    {
      title: "Real-Time Analytics",
      description: "Make data-driven decisions instantly with real-time dashboards and reporting",
    },
    {
      title: "AI-Ready Platform",
      description: "Leverage SAP Joule for predictive analytics and intelligent automation",
    },
    { title: "Cloud & On-Premise", description: "Deploy flexibly—cloud, on-premise, or hybrid based on your needs" },
  ]

  const stats = [
    { value: "50%", label: "Faster implementation vs legacy ERP" },
    { value: "40-60%", label: "Quicker time-to-value" },
    { value: "Real-Time", label: "Data processing and insights" },
  ]

  return (
    <section id="what-is-s4hana" className="!pt-20 !bg-white">
      <div className="!max-w-7xl !mx-auto !px-4 sm:!px-6 lg:!px-8">
        <div className="!text-center !mb-16">
          <h2 className="!text-4xl !font-bold !mb-4">What is SAP S/4HANA?</h2>
          <p className="!text-lg !text-gray-600 !max-w-3xl !mx-auto">
            The intelligent, next-generation ERP platform built on in-memory technology for real-time business insights
            and AI-driven decision making.
          </p>
        </div>

        <div className="!grid md:!grid-cols-2 !gap-8 !mb-16">
          <div className="!space-y-7">
            {features.map((feature, idx) => (
              <div key={idx} className="!flex !gap-4">
                <CheckCircle2 className="!w-6 !h-6 !text-cyan-600 !flex-shrink-0 !mt-1" />
                <div>
                  <h3 className="!font-semibold !mt-0 !text-gray-900">{feature.title}</h3>
                  <p className="!text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="!grid !grid-cols-1 !gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="!bg-gradient-to-br !from-blue-50 !to-cyan-50 !p-8 !rounded-lg !border !border-blue-200"
              >
                <div className="!text-4xl !font-bold !text-blue-600 !mb-2">{stat.value}</div>
                <div className="!text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhatIsS4HANA
