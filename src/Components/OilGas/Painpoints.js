"use client"
import { Gauge, BarChart3, Shield } from "lucide-react"
import { Card, Section } from "Shared/Customs"
import Reveal from "./Reveal"

const items = [
  {
    icon: Gauge,
    title: "Inventory Complexity",
    desc: "Managing fuel stock across multiple depots, temperature variations, and precise quantity tracking",
  },
  {
    icon: BarChart3,
    title: "Operational Visibility",
    desc: "Lack of real-time insights into supply chain, pricing, and cost management across operations",
  },
  {
    icon: Shield,
    title: "Compliance & Risk",
    desc: "Meeting regulatory requirements, handling letters of credit, and managing procurement processes",
  },
]

export default function PainPoints() {
  return (
    <Section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Reveal>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Challenges in Oil & Gas Operations</h3>
            <p className="text-lg md:text-xl text-gray-600">We understand the unique complexities of your industry</p>
          </Reveal>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <Card className="p-6 border border-gray-200 hover:shadow-lg transition-shadow relative overflow-hidden group">
                <span className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 bg-blue-200/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <item.icon className="w-10 h-10 text-blue-600 mb-3" />
                <h4 className="text-lg font-semibold text-gray-900 mb-1.5">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
