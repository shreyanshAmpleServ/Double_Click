import React, { useLayoutEffect, useRef } from "react"
import { TrendingDown, Zap, Eye } from "lucide-react"
import { Card, Container, Section } from "Shared/Customs"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const Benefits = () => {
  const sectionRef = useRef(null)

  const benefits = [
    {
      icon: TrendingDown,
      metric: "Up to 99%",
      title: "Demurrage Reduction",
      description: "Eliminate costly storage charges with faster clearances and optimized container management",
    },
    {
      icon: Zap,
      metric: "60%",
      title: "Faster Clearance Time",
      description: "Streamlined workflows and automated processes reduce processing time significantly",
    },
    {
      icon: Eye,
      metric: "100%",
      title: "Full Cargo Visibility",
      description: "Track shipments from document pickup to final delivery with complete transparency",
    },
  ]

  const differentiators = [
    "Built for African & MEA clearance processes",
    "Integrates with port community systems, GPS, ERP & finance",
    "Covers pre-clearance to container return",
    "Deep workflow automation with minimal manual entry",
    "Multi-language & multi-currency support",
  ]

  useLayoutEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from("[data-benefits-title]", {
        opacity: 0,
        y: 18,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      })

      gsap.from("[data-benefit-card]", {
        opacity: 0,
        y: 22,
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <Section id="benefits" className="py-20 bg-white">
      <div ref={sectionRef} className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0.08) 30%, rgba(20,184,166,0.05) 65%, transparent 100%)",
          }}
        />

        <Container>
          <div className="mb-20">
            <h2 data-benefits-title className="!text-4xl sm:!text-5xl font-bold text-gray-900 mb-4">
              Proven Results
            </h2>
            <p className="!text-xl text-gray-600 mb-12">Real impact for clearing agents and logistics providers</p>

            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <Card
                    key={index}
                    data-benefit-card
                    className="p-8 border-0 bg-gradient-to-br from-blue-50 to-teal-50 hover:shadow-lg transition-shadow"
                  >
                    <div className="mb-6">
                      <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <p className="text-4xl font-bold text-blue-600 mb-2">{benefit.metric}</p>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </Card>
                )
              })}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg">
            <h2 className="!text-3xl font-bold text-gray-900 mb-8">Why Our Module Outperforms</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <ul className="p-0 space-y-4">
                  {differentiators.slice(0, 3).map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-lg text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <ul className="p-0 space-y-4">
                  {differentiators.slice(3).map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-lg text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  )
}

export default Benefits
