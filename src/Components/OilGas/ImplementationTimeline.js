"use client"

import { Card, Section } from "Shared/Customs"
import Reveal from "./Reveal"

const steps = [
  { phase: "Week 1-2", title: "Assessment", desc: "Understand your current operations and requirements" },
  { phase: "Week 3-4", title: "Configuration", desc: "Customize solution for your specific workflows" },
  { phase: "Week 5-6", title: "Training", desc: "Comprehensive training for your team" },
  { phase: "Week 7", title: "Go-Live", desc: "Launch with ongoing support" },
]

export default function ImplementationTimeline() {
  return (
    <Section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Reveal>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Quick Implementation</h3>
            <p className="text-lg md:text-xl text-gray-600">Get up and running faster than you think</p>
          </Reveal>
        </div>
        <div className="grid md:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <div key={s.title} className="relative">
              <Reveal delay={i * 80}>
                <Card className="p-5 border border-gray-200 h-full hover:shadow-md transition-shadow">
                  <div className="text-xs font-semibold text-blue-600 mb-1.5">{s.phase}</div>
                  <h5 className="text-base font-bold text-gray-900 mb-1">{s.title}</h5>
                  <p className="text-gray-600 text-sm">{s.desc}</p>
                </Card>
              </Reveal>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-blue-600 transform -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
