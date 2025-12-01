"use client"
import { Users, Zap, Shield } from "lucide-react"
import { Card, Section } from "Shared/Customs"
import Reveal from "./Reveal"

const blocks = [
  {
    icon: Users,
    title: "Industry Experts",
    desc: "15+ years of experience in Oil & Gas operations and SAP implementations",
  },
  {
    icon: Zap,
    title: "Rapid Deployment",
    desc: "Pre-built templates and accelerators get you live in weeks, not months",
  },
  { icon: Shield, title: "Dedicated Support", desc: "24/7 support team with deep domain knowledge of energy sector" },
]

export default function WhyChooseUs() {
  return (
    <Section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Reveal>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Why Choose DCC?</h3>
            <p className="text-lg md:text-xl text-gray-600">Industry expertise meets technical excellence</p>
          </Reveal>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {blocks.map((b, i) => (
            <Reveal key={b.title} delay={i * 80}>
              <Card className="p-6 border border-gray-200 text-center hover:shadow-md transition-shadow relative overflow-hidden group">
                <span className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 bg-blue-200/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <b.icon className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-1.5">{b.title}</h4>
                <p className="text-gray-600 text-sm">{b.desc}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
