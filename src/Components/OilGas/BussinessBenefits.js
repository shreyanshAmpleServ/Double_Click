"use client"

import { Card, Section } from "Shared/Customs"
import Reveal from "./Reveal"

const metrics = [
  { metric: "40%", label: "Reduction in operational costs" },
  { metric: "8hrs→2hrs", label: "Order processing time" },
  { metric: "99.9%", label: "Inventory accuracy" },
  { metric: "24/7", label: "Real-time visibility" },
]

export default function BusinessBenefits() {
  return (
    <Section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Reveal>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Measurable Business Impact</h3>
            <p className="text-lg md:text-xl text-gray-600">Real results from oil & gas companies like yours</p>
          </Reveal>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 80}>
              <Card className="p-6 border border-gray-200 text-center hover:shadow-md transition-shadow">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">{m.metric}</div>
                <p className="text-gray-600 text-sm md:text-base">{m.label}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
