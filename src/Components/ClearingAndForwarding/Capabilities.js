import React, { useLayoutEffect, useRef } from "react"
import { FileText, Truck, DollarSign, FileCheck, Bell, MapPin } from "lucide-react"
import { Card, Container, Section } from "Shared/Customs"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const Capabilities = () => {
  const rootRef = useRef(null)

  const capabilities = [
    {
      icon: FileText,
      title: "File Master & Movement Tracking",
      description:
        "Define file types, set ETA/ATA/ETD/ATD dates, auto-calculate KPIs, and receive milestone alerts for vessel arrival, port clearance, loading, dispatch, and offloading.",
    },
    {
      icon: FileCheck,
      title: "Customs & Port Clearance",
      description:
        "Capture all customs & port SOPs, track file statuses by mode, monitor container free days and demurrage risk, and track CFS/ICD handovers.",
    },
    {
      icon: DollarSign,
      title: "Cost Control & File Expenses",
      description:
        "Track expected vs actual expenses, manage internal approval workflows, monitor per-file profitability with GP% reporting, and drill-down by cost centers.",
    },
    {
      icon: FileCheck,
      title: "Billing & Customer Contracts",
      description:
        "Apply pricing based on customer contracts, automate billing with cost-plus/flat/tiered structures, and send invoices instantly with tax/GST compliance.",
    },
    {
      icon: Bell,
      title: "Alerts, Notifications & Email Workflows",
      description:
        "Auto-email for cargo loading, departure acknowledgment, ETA/ETD changes, and bond expiry alerts. Notify internal stakeholders, customers, drivers, and customs agents.",
    },
    {
      icon: Truck,
      title: "Trip & Delivery Integration",
      description:
        "Convert cleared files to trip planning with vehicle allocation, assign drivers, track GPS, manage POD collection, and track container return cycles.",
    },
  ]

  useLayoutEffect(() => {
    if (!rootRef.current) return
    const ctx = gsap.context(() => {
      gsap.from("[data-cap-title], [data-cap-sub]", {
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

      gsap.from("[data-cap-card]", {
        opacity: 0,
        y: 26,
        rotateX: -8,
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.08,
        transformOrigin: "50% 100%",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 72%",
        },
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <Section id="capabilities" className="relative overflow-hidden bg-gray-50">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0.08) 35%, rgba(20,184,166,0.06) 70%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,.55) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,.55) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: "radial-gradient(280px 200px at 50% 0%, black 25%, transparent 70%)",
        }}
      />

      <Container>
        <div ref={rootRef}>
          <div className="mb-16">
            <h2 data-cap-title className="!text-4xl sm:!text-5xl font-bold text-gray-900 mb-4">
              Revolutionize Your Clearing & Forwarding Operations
            </h2>
            <p data-cap-sub className="!text-xl text-gray-600 max-w-3xl">
              Clearing delays. Mounting demurrage. Poor visibility across shipment stages. Our solution transforms how
              you handle files, track milestones, manage billing, and optimize vehicle dispatch — all in one powerful
              platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon
              return (
                <Card
                  key={index}
                  data-cap-card
                  className="relative p-8 group hover:scale-105 transform transition-all duration-700 hover:-translate-3 rounded-2xl border border-gray-200 bg-white backdrop-blur-sm shadow-sm hover:shadow-xl will-change-transform"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity"
                    style={{
                      background: "linear-gradient(180deg, rgba(59,130,246,0.06) 0%, rgba(20,184,166,0.05) 100%)",
                    }}
                  />
                  <div className="relative">
                    <div className="mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{capability.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{capability.description}</p>
                  </div>
                </Card>
              )
            })}
          </div>

          <div className="mt-16 bg-blue-50 rounded-lg p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Whether it's sea import, air export, local delivery, or bonded transit...
            </h3>
            <p className="text-lg text-gray-700">
              We streamline every process, ensuring customs compliance, financial control, and client satisfaction. Our
              solution covers pre-clearance to container return, with deep workflow automation and minimal manual entry.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default Capabilities
