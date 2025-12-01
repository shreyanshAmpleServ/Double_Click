import React, { useLayoutEffect, useRef } from "react"
import { CheckCircle2 } from "lucide-react"
import { Card, Container, Section } from "Shared/Customs"
import { DASHBOARDS } from "Helpers/datas"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Add keyframes for animations
const styles = `
  @keyframes gradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  @keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(30px, -30px) rotate(5deg); }
    66% { transform: translate(-20px, 20px) rotate(-5deg); }
  }
  
  @keyframes float-delayed {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(-30px, 30px) rotate(-5deg); }
    66% { transform: translate(20px, -20px) rotate(5deg); }
  }
  
  .animate-float {
    animation: float 20s ease-in-out infinite;
  }
  
  .animate-float-delayed {
    animation: float-delayed 25s ease-in-out infinite;
  }
`

const Dashboards = () => {
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    if (!rootRef.current) return
    const ctx = gsap.context(() => {
      // Enhanced entrance with scale and rotation
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

      // Cards with flip-in effect
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

      // Per-card list items with bounce
      rootRef.current.querySelectorAll("[data-db-card]").forEach((card) => {
        gsap.from(card.querySelectorAll("[data-db-li]"), {
          opacity: 0,
          x: -20,
          scale: 0.8,
          duration: 0.5,
          ease: "back.out(1.7)",
          stagger: 0.08,
          scrollTrigger: { trigger: card, start: "top 80%" },
        })
      })
    }, rootRef)

    // Enhanced 3D tilt with glow effect
    const cards = rootRef.current.querySelectorAll("[data-db-card]")
    const cleanups = []

    cards.forEach((card) => {
      const glow = card.querySelector("[data-glow]")

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
          translateZ: 20,
          transformPerspective: 1000,
          transformOrigin: "50% 50%",
          duration: 0.3,
          ease: "power2.out",
        })

        // Animate glow to follow mouse
        if (glow) {
          gsap.to(glow, {
            x: x - r.width / 2,
            y: y - r.height / 2,
            opacity: 0.4,
            duration: 0.3,
            ease: "power2.out",
          })
        }
      }

      const onLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          translateZ: 0,
          duration: 0.4,
          ease: "power2.out",
        })

        if (glow) {
          gsap.to(glow, {
            opacity: 0,
            duration: 0.3,
          })
        }
      }

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
    <>
      <style>{styles}</style>
      <Section
        id="dashboards"
        className="relative overflow-hidden bg-gradient-to-b from-blue-50/30 via-teal-50/20 to-purple-50/30"
      >
        {/* Enhanced gradient background with animation */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 animate-pulse-slow"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0.08) 30%, rgba(20,184,166,0.08) 60%, rgba(168,85,247,0.06) 85%, transparent 100%)",
            animation: "pulse 8s ease-in-out infinite",
          }}
        />

        {/* Floating orbs */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl opacity-20 bg-gradient-to-br from-blue-400 to-cyan-300 animate-float"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl opacity-15 bg-gradient-to-br from-purple-400 to-pink-300 animate-float-delayed"
        />

        {/* Enhanced grid pattern */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(59,130,246,.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,130,246,.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(350px 250px at 50% 0%, black 20%, transparent 75%)",
          }}
        />

        <Container>
          <div ref={rootRef}>
            <div className="text-center mb-12">
              <h2
                data-db-title
                className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 via-teal-600 to-purple-600 bg-clip-text text-transparent"
              >
                Visual Dashboards & Analytics
              </h2>
              <p data-db-sub className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Gain clarity across vehicle, route, and trip performance with real-time dashboards and insights.
              </p>
            </div>

            {/* Enhanced grid with better cards */}
            <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
              {DASHBOARDS.map((board, idx) => (
                <Card
                  key={board.title}
                  data-db-card
                  className="
                    group relative p-6 md:p-8 rounded-2xl 
                    border border-gray-200 hover:border-2 
                    bg-white/90 backdrop-blur-md
                    shadow-lg hover:shadow-2xl
                    transition-all duration-500
                    will-change-transform
                    hover:border-blue-200
                    overflow-hidden
                  "
                  style={{
                    transformStyle: "preserve-3d",
                    background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)",
                  }}
                >
                  {/* Animated gradient border on hover */}
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(20,184,166,0.1), rgba(168,85,247,0.1))",
                      backgroundSize: "200% 200%",
                      animation: "gradient 3s ease infinite",
                    }}
                  />

                  {/* Floating glow effect that follows mouse */}
                  <div
                    data-glow
                    aria-hidden
                    className="pointer-events-none absolute w-64 h-64 rounded-full blur-3xl opacity-0 transition-opacity"
                    style={{
                      background:
                        idx % 2 === 0
                          ? "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)"
                          : "radial-gradient(circle, rgba(20,184,166,0.4) 0%, transparent 70%)",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />

                  {/* Shimmer effect on hover */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background:
                        "linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.5) 50%, transparent 75%)",
                      backgroundSize: "200% 100%",
                      animation: "shimmer 2s infinite",
                    }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-teal-600 transition-all duration-500">
                        {board.title}
                      </h3>
                    </div>

                    <ul className="space-y-3">
                      {board.items.map((item) => (
                        <li
                          key={item}
                          data-db-li
                          className="
                            group/item flex items-start gap-3 rounded-xl p-3 -mx-3
                            transition-all duration-300
                            hover:bg-gradient-to-r hover:from-blue-50 hover:to-teal-50
                            hover:shadow-md hover:scale-105
                            cursor-pointer
                          "
                        >
                          <div className="mt-0.5 grid place-items-center flex-shrink-0">
                            <div className="relative">
                              <CheckCircle2 className="w-6 h-6 text-blue-500 transition-all duration-300 group-hover/item:text-teal-500 group-hover/item:scale-125 group-hover/item:rotate-12" />
                              <span className="absolute inset-0 rounded-full bg-blue-400 blur-md opacity-0 group-hover/item:opacity-50 transition-opacity duration-300" />
                            </div>
                          </div>
                          <span className="text-sm md:text-base text-gray-700 group-hover/item:text-gray-900 font-medium relative inline-block transition-colors duration-300">
                            {item}
                            {/* Animated underline */}
                            <span className="pointer-events-none absolute left-0 -bottom-1 h-[3px] w-0 bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 transition-all duration-500 group-hover/item:w-full rounded-full shadow-lg" />
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Enhanced badge with pulse */}
                    {/* <div className="mt-6 inline-flex items-center gap-2 text-xs md:text-sm text-blue-700 bg-gradient-to-r from-blue-50 to-teal-50 border-2 border-blue-200 px-4 py-2 rounded-full shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                      </span>
                      <span className="font-semibold">Real-time KPIs</span>
                    </div> */}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default Dashboards
