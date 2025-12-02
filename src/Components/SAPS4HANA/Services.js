import React from "react"
import { Award, Cog, Rocket, Globe } from "lucide-react"

const Services = () => {
  const services = [
    {
      title: "License Resale",
      description:
        "As a SAP Gold Partner, we provide authorized SAP S/4HANA licenses with competitive pricing and flexible terms tailored to your business needs.",
      icon: Award,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Consulting",
      description:
        "Expert consulting services to assess your current systems, plan your S/4HANA journey, and optimize your implementation strategy.",
      icon: Cog,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Development",
      description:
        "Custom development and extensions to tailor S/4HANA to your unique business requirements and industry-specific needs.",
      icon: Rocket,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Full-Stack Services",
      description:
        "End-to-end support from planning through implementation, integration, training, and ongoing maintenance and optimization.",
      icon: Globe,
      color: "from-green-500 to-emerald-500",
    },
  ]

  return (
    <section id="services" className="!py-20 !bg-gray-50">
      <div className="!max-w-7xl !mx-auto !px-4 sm:!px-6 lg:!px-8">
        <div className="!text-center !mb-16">
          <h2 className="!text-4xl !font-bold !mb-4">Our S/4HANA Services</h2>
          <p className="!text-lg !text-gray-600 !max-w-3xl !mx-auto">
            As a SAP Gold Partner, we provide comprehensive solutions across the entire S/4HANA lifecycle
          </p>
        </div>

        <div className="!grid md:!grid-cols-2 lg:!grid-cols-4 !gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon
            return (
              <div
                key={idx}
                className="!p-6 !bg-white !rounded-lg hover:!shadow-lg !transition-shadow !border !border-gray-200"
              >
                <div
                  className={`!w-12 !h-12 !rounded-lg !bg-gradient-to-br ${service.color} !flex !items-center !justify-center !mb-4`}
                >
                  <Icon className="!h-6 !w-6 !text-white" />
                </div>
                <h3 className="!text-lg !font-semibold !text-gray-900 !mb-2">{service.title}</h3>
                <p className="!text-gray-600">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services
