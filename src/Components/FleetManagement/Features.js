import React, { useLayoutEffect, useRef } from "react"
import { FEATURES } from "Helpers/datas"
import { Card, Container, Section } from "Shared/Customs"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const Features = () => {
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    if (!rootRef.current) return
    const ctx = gsap.context(() => {
      // Title + subtitle entrance
      gsap.from("[data-ft-title], [data-ft-sub]", {
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

      // Card grid stagger entrance
      gsap.from("[data-ft-card]", {
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

      // Subtle float on icons
      gsap.to("[data-ft-icon]", {
        y: -4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 1.6,
        stagger: 0.2,
      })
    }, rootRef)

    // 3D hover tilt for each card
    const cards = rootRef.current.querySelectorAll("[data-ft-card]")
    const cleanups = []

    cards.forEach((card) => {
      const onMove = (e) => {
        const r = card.getBoundingClientRect()
        const x = e.clientX - r.left
        const y = e.clientY - r.top
        const midX = r.width / 2
        const midY = r.height / 2
        const rotY = ((x - midX) / midX) * 8
        const rotX = -((y - midY) / midY) * 8
        gsap.to(card, {
          rotateY: rotY,
          rotateX: rotX,
          translateZ: 6,
          transformPerspective: 900,
          transformOrigin: "50% 50%",
          duration: 0.25,
          ease: "power2.out",
        })
      }
      const onLeave = () => gsap.to(card, { rotateX: 0, rotateY: 0, translateZ: 0, duration: 0.35, ease: "power2.out" })

      card.addEventListener("mousemove", onMove)
      card.addEventListener("mouseleave", onLeave)
      cleanups.push(() => {
        card.removeEventListener("mousemove", onMove)
        card.removeEventListener("mouseleave", onLeave)
      })
    })

    return () => {
      ctx.revert()
      cleanups.forEach((fn) => fn())
    }
  }, [])

  return (
    <Section id="features" className="relative overflow-hidden">
      {/* Decorative wash + grid mask */}
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
            "linear-gradient(to right, rgba(0,0,0,.55) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,.55) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: "radial-gradient(280px 200px at 50% 0%, black 25%, transparent 70%)",
        }}
      />
      <span aria-hidden className="absolute -top-20 -right-10 h-64 w-64 rounded-full bg-blue-300/25 blur-3xl -z-10" />
      <span aria-hidden className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-teal-300/25 blur-3xl -z-10" />

      <Container>
        <div ref={rootRef}>
          <div className="text-center mb-16">
            <h2 data-ft-title className="text-4xl md:text-5xl font-bold mb-4">
              Comprehensive Fleet Management Capabilities
            </h2>
            <p data-ft-sub className="text-xl text-gray-600 max-w-2xl mx-auto">
              From vehicle registration to tyre tracking, transform your fleet from reactive to proactive.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature) => {
              const Icon = feature.icon
              return (
                <Card
                  key={feature.title}
                  data-ft-card
                  className="relative p-6 group hover:scale-105 transform transition-all duration-700 hover:-translate-3 rounded-2xl border  border-gray-200 bg-white  backdrop-blur-sm shadow-sm hover:shadow-xl will-change-transform"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

                  {/* subtle card highlight */}
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity"
                    style={{
                      background: "linear-gradient(180deg, rgba(59,130,246,0.06) 0%, rgba(20,184,166,0.05) 100%)",
                    }}
                  />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br from-[#ffffff36] to-[#ffffff36] group-hover:!from-blue-100 group-hover:to-teal-100 ring-1 ring-white">
                      <Icon data-ft-icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>

                    <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-blue-700/90 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                      Production-ready
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default Features
