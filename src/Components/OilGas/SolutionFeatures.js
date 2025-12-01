"use client"
import { CheckCircle2 } from "lucide-react"
import { Card, Section } from "Shared/Customs"
import Reveal from "./Reveal"

const sections = [
  {
    title: "Advanced Inventory Management",
    features: [
      "Temperature & density-based stock calculations",
      "Multi-depot inventory tracking",
      "3rd party tank management",
      "Real-time stock position reporting",
    ],
  },
  {
    title: "Financial & Procurement",
    features: [
      "Post-import loan handling",
      "Bank guarantee management",
      "Letter of credit processing",
      "Open Tender Procurement (OTP)",
    ],
  },
  {
    title: "Sales & Operations",
    features: [
      "Service station sales management",
      "Multi-price list support",
      "Cash & credit sales with approval workflows",
      "Hospitality stock management",
    ],
  },
  {
    title: "Reporting & Analytics",
    features: [
      "Comprehensive MIS/Reports suite",
      "Transfer & pump-over tracking",
      "Vessel-wise stock movement reports",
      "Revenue & cost analysis dashboards",
    ],
  },
]

export default function SolutionFeatures() {
  return (
    <Section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Reveal>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Our Oil & Gas Solution</h3>
            <p className="text-lg md:text-xl text-gray-600">Purpose-built features for energy sector operations</p>
          </Reveal>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((section, i) => (
            <Reveal key={section.title} delay={i * 80}>
              <Card className="p-6 border border-gray-200 hover:shadow-md transition-shadow">
                <h5 className="text-base md:text-lg font-semibold text-gray-900 mb-4">{section.title}</h5>
                <ul className="space-y-3">
                  {section.features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
