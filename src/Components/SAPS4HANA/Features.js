import React from "react"
import { BarChart3, Zap, Users, Cloud, TrendingUp, Shield } from "lucide-react"

const Features = () => {
  const features = [
    {
      title: "Real-Time Analytics",
      description:
        "Gain immediate insights into your business operations with in-memory computing and real-time dashboards.",
      icon: BarChart3,
    },
    {
      title: "Simplified Processes",
      description:
        "Streamline operations by consolidating functions into a single, cohesive platform with reduced complexity.",
      icon: Zap,
    },
    {
      title: "Modern User Experience",
      description: "Intuitive SAP Fiori interface that enhances productivity and reduces training time for your teams.",
      icon: Users,
    },
    {
      title: "Flexibility & Scalability",
      description: "Deploy on-premise, cloud, or hybrid—choose what fits your business needs and scale as you grow.",
      icon: Cloud,
    },
    {
      title: "AI-Ready with SAP Joule",
      description:
        "Leverage artificial intelligence for predictive analytics, intelligent automation, and smarter decisions.",
      icon: TrendingUp,
    },
    {
      title: "Enterprise Security",
      description: "Advanced security features and compliance standards to protect your critical business data.",
      icon: Shield,
    },
  ]

  return (
    <section id="features" className="!py-20 !bg-white">
      <div className="!max-w-7xl !mx-auto !px-4 sm:!px-6 lg:!px-8">
        <div className="!text-center !mb-16">
          <h2 className="!text-4xl !font-bold !mb-4">Key Features & Benefits</h2>
          <p className="!text-lg !text-gray-600 !max-w-3xl !mx-auto">
            Discover what makes S/4HANA the leading enterprise ERP platform
          </p>
        </div>

        <div className="!grid md:!grid-cols-2 lg:!grid-cols-3 !gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={idx}
                className="!bg-white !p-8 !rounded-lg !border !border-gray-200 hover:!border-cyan-300 !transition-colors"
              >
                <Icon className="!h-10 !w-10 !text-cyan-600 !mb-4" />
                <h3 className="!text-lg !font-semibold !text-gray-900 !mb-2">{feature.title}</h3>
                <p className="!text-gray-600">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features
