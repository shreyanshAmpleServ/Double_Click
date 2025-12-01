import React, { useLayoutEffect, useRef } from "react"
import { Building2, Truck, Package, Warehouse, MapPin } from "lucide-react"
import { Card, Container, Section } from "Shared/Customs"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const TargetAudience = () => {
  const rootRef = useRef(null)

  const audiences = [
    {
      icon: Building2,
      title: "Customs Clearing Agencies",
      description: "Streamline customs clearance processes and reduce compliance risks",
    },
    {
      icon: Truck,
      title: "Freight Forwarders & CHAs",
      description: "Manage complex shipments with end-to-end visibility and control",
    },
    {
      icon: Package,
      title: "Logistics Companies",
      description: "Optimize operations and improve profitability across all modes",
    },
    {
      icon: Warehouse,
      title: "Container Freight Stations (CFS)",
      description: "Manage storage, handling, and documentation efficiently",
    },
    {
      icon: MapPin,
      title: "ICD/Port Operators",
      description: "Coordinate with multiple stakeholders and track all movements",
    },
  ]

  useLayoutEffect(() => {
    if (!rootRef.current) return
    const ctx = gsap.context(() => {
      gsap.from("[data-ta-title], [data-ta-sub]", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 78%",
        },
      })

      gsap.from("[data-ta-card]", {
        opacity: 0,
        y: 24,
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 70%",
        },
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <Section className="py-20 bg-white">
      <Container>
        <div ref={rootRef}>
          <div className="mb-16">
            <h2 data-ta-title className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Built for Your Industry
            </h2>
            <p data-ta-sub className="text-xl text-gray-600 max-w-3xl">
              Our solution is designed specifically for clearing and forwarding professionals across Africa and the MEA
              region.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {audiences.map((audience, index) => {
              const Icon = audience.icon
              return (
                <Card
                  key={index}
                  data-ta-card
                  className="p-8 border-2 border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all bg-white"
                >
                  <div className="mb-4">
                    <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-7 h-7 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{audience.title}</h3>
                  <p className="text-gray-600">{audience.description}</p>
                </Card>
              )
            })}
          </div>

          <div className="mt-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg p-12 text-white">
            <h3 className="text-2xl font-bold mb-4">Optimized for Africa & MEA</h3>
            <p className="text-lg mb-6 text-white opacity-90">
              Our solution is built with deep understanding of clearing and forwarding processes specific to African and
              Middle East & Africa (MEA) markets. We understand local regulations, port procedures, customs
              requirements, and operational challenges unique to the region.
            </p>
            <div className="grid md:grid-cols-3 text-white gap-8">
              <div>
                <p className="font-semibold text-white opacity-90 mb-2">Local Expertise</p>
                <p className="text-white opacity-90">Deep knowledge of regional processes and regulations</p>
              </div>
              <div>
                <p className="font-semibold text-white opacity-90 mb-2">Multi-Language Support</p>
                <p className="text-white opacity-90">Support for multiple languages and currencies</p>
              </div>
              <div>
                <p className="font-semibold text-white opacity-90 mb-2">Proven Track Record</p>
                <p className="text-white opacity-90">Trusted by leading logistics providers across the region</p>
              </div>
            </div>
          </div>
          <style>
            {`
              .text-white {
                color: white !important;
              }
            `}
          </style>
        </div>
      </Container>
    </Section>
  )
}

export default TargetAudience
