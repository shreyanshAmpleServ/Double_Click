import React, { useLayoutEffect, useRef } from "react"
import { CheckCircle2 } from "lucide-react"
import { Container, Section } from "Shared/Customs"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const left = [
  ["End-to-End Visibility", "Track every aspect from vehicle registration to maintenance and analytics."],
  ["Real-Time Monitoring", "Live tracking, instant alerts, and immediate visibility into movements and metrics."],
  ["Cost Reduction", "Optimize routes, reduce fuel, minimize maintenance, and prevent demurrage."],
]
const right = [
  ["Data-Driven Decisions", "Comprehensive dashboards and configurable reports for confident decisions."],
  ["Scalability", "Manage 10 trucks or 1,000 vehicles with the same adaptive platform."],
  ["SAP Certified", "Built on SAP Business One and S/4HANA with seamless integration."],
]

const Benefits = () => {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      // Title fade + lift
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

      // Stagger cards
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
    <Section>
      <div ref={sectionRef} className="relative">
        {/* Soft background + grid accent */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0.08) 30%, rgba(20,184,166,0.05) 65%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,.6) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            maskImage: "radial-gradient(200px 200px at 50% 0%, black 20%, transparent 70%)",
          }}
        />

        <Container>
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-blue-200/60 bg-blue-50 text-blue-700">
              Why DCC Fleet
            </span>
            <h2 data-benefits-title className="mt-4 text-4xl md:text-5xl font-bold leading-tight">
              Why Choose DCC Fleet Management?
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Practical gains you can feel from day one—backed by SAP-grade reliability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {[left, right].map((col, idx) => (
              <div key={idx} className="space-y-5">
                {col.map(([title, text]) => (
                  <div
                    key={title}
                    data-benefit-card
                    className="group relative p-5 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition-shadow"
                  >
                    {/* subtle highlight on hover */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: "linear-gradient(180deg, rgba(59,130,246,0.06) 0%, rgba(20,184,166,0.04) 100%)",
                      }}
                    />
                    <div className="relative flex gap-4">
                      <div className="w-10 h-10 rounded-xl grid place-items-center flex-shrink-0 bg-gradient-to-br from-blue-100 to-teal-100 ring-1 ring-inset ring-white">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 transition-transform group-hover:scale-110" />
                      </div>
                      <div>
                        <h3 className="text-base md:text-lg font-semibold text-gray-900">{title}</h3>
                        <p className="mt-1.5 text-gray-600 leading-relaxed">{text}</p>
                        {/* micro-cta chip */}
                        <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-blue-700/90 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                          Proven with live deployments
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Bottom KPI ribbon (decorative) */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              ["99.9%", "Uptime"],
              ["15–22%", "Fuel Savings"],
              ["↓35%", "Breakdowns"],
              ["2×", "Faster Insights"],
              ["<24h", "Go-Live Modules"],
              ["SAP", "Certified"],
            ].map(([num, label]) => (
              <div
                key={label}
                className="rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm p-4 text-center hover:shadow-md transition-shadow"
                data-benefit-card
              >
                <div className="text-xl font-bold text-gray-900">{num}</div>
                <div className="text-xs text-gray-600 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Local CSS for small shimmer animation (no external file needed) */}
      <style>{`
        @property --shine {
          syntax: '<number>';
          inherits: false;
          initial-value: 0;
        }
      `}</style>
    </Section>
  )
}

export default Benefits
