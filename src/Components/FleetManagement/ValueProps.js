import React, { useLayoutEffect, useRef } from "react"
import { Zap, BarChart3, TrendingUp } from "lucide-react"
import { Card, Container, Section } from "Shared/Customs"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const ValueProps = () => {
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    if (!rootRef.current) return
    const ctx = gsap.context(() => {
      // Title + subtitle entrance
      gsap.from("[data-vp-title], [data-vp-sub]", {
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

      // Cards stagger in
      gsap.from("[data-vp-card]", {
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

  const items = [
    {
      icon: Zap,
      title: "Real-Time Visibility",
      text: "Monitor your entire fleet with live tracking, movement monitoring, and instant alerts.",
      chip: "Live tracking",
    },
    {
      icon: BarChart3,
      title: "Data-Driven Insights",
      text: "Comprehensive dashboards and reports for granular fleet analytics.",
      chip: "Actionable KPIs",
    },
    {
      icon: TrendingUp,
      title: "Cost Optimization",
      text: "Intelligent routes, expense control, and resource optimization reduce costs.",
      chip: "Lower TCO",
    },
  ]

  return (
    <Section className="relative overflow-hidden bg-gray-50">
      {/* Decorative background */}
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
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,.65) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,.65) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: "radial-gradient(240px 180px at 50% 0%, black 25%, transparent 70%)",
        }}
      />

      <Container>
        <div ref={rootRef} className="mx-auto max-w-6xl">
          {/* Optional heading for context (can remove if you don't want it) */}
          <div className="text-center mb-10">
            <span
              data-vp-title
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-blue-200/60 bg-blue-50 text-blue-700"
            >
              What you gain
            </span>
            <p data-vp-sub className="mt-3 text-sm text-gray-600 max-w-xl mx-auto">
              Three pillars that move the needle from day one.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {items.map(({ icon: Icon, title, text, chip }) => (
              <Card
                key={title}
                data-vp-card
                className="relative  p-8 text-center rounded-2xl border border-gray-200 transition-all hover:-translate-y-3 bg-white/80 backdrop-blur-sm shadow-sm hover:scale-105 hover:shadow-xl "
              >
                {/* Shine accent */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br from-blue-200/30 to-teal-200/30 blur-2xl"
                />
                <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-100 to-teal-100 ring-1 ring-white">
                  <Icon className="h-7 w-7 text-blue-600 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="mt-2 text-gray-600">{text}</p>

                {/* micro chip */}
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-blue-700/90 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                  {chip}
                </div>

                {/* hover lift */}
                <div className="absolute inset-0 rounded-2xl transition-transform duration-300 will-change-transform hover:scale-[1.01]" />
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default ValueProps
