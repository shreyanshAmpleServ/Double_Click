import React, { useLayoutEffect, useRef } from "react"
import { CheckCircle2 } from "lucide-react"
import { Card, Container, Section } from "Shared/Customs"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const Dashboards = () => {
  const rootRef = useRef(null)

  const dashboardFeatures = [
    {
      title: "File Trends",
      description: "Monthly volume by mode & vertical with detailed analytics",
    },
    {
      title: "Profit & Loss",
      description: "File-level GP, GP%, and pending dues tracking",
    },
    {
      title: "Container Status",
      description: "Storage, demurrage, released, and ready-to-load monitoring",
    },
    {
      title: "Customs Analysis",
      description: "Average clearance time for sea, air, and road shipments",
    },
    {
      title: "Bond Monitoring",
      description: "Used vs available bond amounts with real-time tracking",
    },
    {
      title: "Performance Metrics",
      description: "KPI tracking and operational efficiency insights",
    },
  ]

  const capabilities = [
    "Drillable analytics for deep insights",
    "Export data in multiple formats",
    "Role-based customization",
  ]

  const monitoring = ["Live data updates", "Automated alerts and notifications", "Predictive analytics"]

  useLayoutEffect(() => {
    if (!rootRef.current) return
    const ctx = gsap.context(() => {
      gsap.from("[data-db-title]", {
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: 0.7,
        ease: "back.out(1.2)",
        scrollTrigger: { trigger: rootRef.current, start: "top 80%" },
      })

      gsap.from("[data-db-sub]", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: { trigger: rootRef.current, start: "top 80%" },
      })

      gsap.from("[data-db-card]", {
        opacity: 0,
        y: 40,
        scale: 0.9,
        rotationX: -15,
        duration: 0.7,
        ease: "back.out(1.4)",
        stagger: 0.15,
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <Section
      id="dashboards"
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, rgba(239, 246, 255, 0.3), rgba(240, 253, 250, 0.2), rgba(250, 245, 255, 0.3))",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 animate-pulse-slow"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0.08) 30%, rgba(20,184,166,0.08) 60%, rgba(168,85,247,0.06) 85%, transparent 100%)",
          animation: "pulse 8s ease-in-out infinite",
        }}
      />

      <Container>
        <div ref={rootRef}>
          <div className="text-center mb-16">
            <h2
              data-db-title
              className="!text-4xl sm:!text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-teal-600 to-purple-600 bg-clip-text text-transparent"
            >
              Dashboards & BI Insights
            </h2>
            <p data-db-sub className="!text-xl text-gray-600 max-w-3xl mx-auto">
              Our integrated dashboard suite gives real-time insights into every aspect of your clearing & forwarding
              operations. Each dashboard is drillable, exportable, and role-configurable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {dashboardFeatures.map((feature, index) => (
              <Card
                key={index}
                data-db-card
                className="group relative p-6 md:p-8 rounded-2xl border border-gray-200 hover:border-2 bg-white bg-opacity-90 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-500 will-change-transform hover:border-blue-200 overflow-hidden"
              >
                <div className="relative z-10">
                  <h3 className="!text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="mb-16">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg p-2 border border-gray-200">
              <img
                src="/images/dashboard-modern.png"
                alt="Enhanced Dashboard Analytics"
                className="w-full h-auto"
                style={{ maxHeight: "600px", objectFit: "contain" }}
              />
            </div>
            <p className="text-center !text-sm text-gray-500 mt-4">
              Real-time analytics dashboard with container tracking, customs analysis, and performance metrics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="!text-2xl font-bold text-gray-900 mb-6">Capabilities</h3>
              <ul className="p-0 space-y-4">
                {capabilities.map((capability, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">{capability}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="!text-2xl font-bold text-gray-900 mb-6">Real-Time Monitoring</h3>
              <ul className="p-0 space-y-4">
                {monitoring.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center mt-1">
                      <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default Dashboards
