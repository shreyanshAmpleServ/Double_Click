// EnhancedDifferentiators.js - With advanced scroll animations
import React, { useState, useRef, useEffect } from "react"
import { FiGlobe } from "react-icons/fi"

// Custom SVG Icons (same as before)
const BadgeCheckIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    />
  </svg>
)

const LightningBoltIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const GlobeIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9 3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
    />
  </svg>
)

const CheckIcon = ({ className, isAnimated }) => (
  <svg className={`${className} ${isAnimated ? "animate-bounce" : ""}`} fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
      clipRule="evenodd"
    />
  </svg>
)

export default function EnhancedDifferentiators() {
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [animationPhase, setAnimationPhase] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addListener(handleChange)

    return () => mediaQuery.removeListener(handleChange)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Sequential animation phases
          setTimeout(() => setAnimationPhase(1), 500)
          setTimeout(() => setAnimationPhase(2), 1000)
          setTimeout(() => setAnimationPhase(3), 1500)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const differentiators = [
    {
      icon: BadgeCheckIcon,
      title: "Certified Excellence",
      items: ["SAP Gold Partner status", "S/4HANA & Business One certified", "15+ years proven track record"],
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
      hoverBg: "group-hover:bg-blue-200",
      delay: 200,
      direction: "left",
    },
    {
      icon: LightningBoltIcon,
      title: "Innovation-Driven",
      items: [
        "Cutting-edge SAP S/4HANA solutions",
        "Custom integrations & solutions",
        "Latest technologies & methodologies",
      ],
      bg: "bg-purple-100",
      iconColor: "text-purple-600",
      hoverBg: "group-hover:bg-purple-200",
      delay: 400,
      direction: "up",
    },
    {
      icon: FiGlobe,
      title: "Regional Leadership",
      items: ["East Africa market leader", "Strategic industry partnerships", "Local expertise & understanding"],
      bg: "bg-green-100",
      iconColor: "text-green-600",
      hoverBg: "group-hover:bg-green-200",
      delay: 600,
      direction: "right",
    },
  ]

  const getCardAnimation = (direction, index) => {
    if (prefersReducedMotion) return "opacity-100"

    const baseClass = "transition-all duration-1000 transform"

    if (!isVisible) {
      switch (direction) {
        case "left":
          return `${baseClass} -translate-x-20 opacity-0 rotate-6`
        case "up":
          return `${baseClass} -translate-y-20 opacity-0 scale-90`
        case "right":
          return `${baseClass} translate-x-20 opacity-0 rotate-6`
        default:
          return `${baseClass} translate-y-12 opacity-0 scale-95`
      }
    }

    return `${baseClass} translate-x-0 translate-y-0 opacity-100 scale-100 rotate-0`
  }

  return (
    <section ref={sectionRef} className="bg-gray-50 py-10 px-6 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-20 transition-all duration-2000 ${
            animationPhase >= 1 ? "scale-100" : "scale-0"
          }`}
        ></div>
        <div
          className={`absolute bottom-20 right-10 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-20 transition-all duration-2000 delay-500 ${
            animationPhase >= 2 ? "scale-100" : "scale-0"
          }`}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-green-200 rounded-full blur-3xl opacity-15 transition-all duration-2000 delay-1000 ${
            animationPhase >= 3 ? "scale-100" : "scale-0"
          }`}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Animated Header Badge */}
        <div
          className={`inline-block bg-gradient-to-r from-green-100 to-green-200 text-green-800 text-sm font-medium px-6 py-3 rounded-full mb-6 shadow-md transition-all duration-800 transform ${
            isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"
          } ${prefersReducedMotion ? "" : "hover:scale-105 animate-pulse"}`}
        >
          Our Differentiators
        </div>

        {/* Animated Main Title with word reveals */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          <span
            className={`inline-block transition-all duration-600 delay-200 transform ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            What
          </span>{" "}
          <span
            className={`inline-block transition-all duration-600 delay-300 transform ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Sets
          </span>{" "}
          <span
            className={`inline-block transition-all duration-600 delay-400 transform ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Us
          </span>{" "}
          <span
            className={`inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-600 delay-500 transform ${
              isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-110"
            }`}
          >
            Apart
          </span>
        </h2>

        {/* Animated Subtitle */}
        <p
          className={`text-gray-600 text-xl mb-16 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-600 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          Discover why leading organizations across East Africa trust us with their digital transformation
        </p>

        {/* Enhanced Animated Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {differentiators.map((diff, index) => (
            <div
              key={diff.title}
              className={`bg-white p-5 rounded-2xl shadow-lg hover:shadow-2xl group relative overflow-hidden cursor-pointer ${getCardAnimation(
                diff.direction,
                index
              )} ${prefersReducedMotion ? "" : "hover:scale-110 hover:-translate-y-4"}`}
              style={{
                transitionDelay: isVisible ? `${diff.delay}ms` : "0ms",
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-green-500 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>

              {/* Animated Icon with enhanced effects */}
              <div
                className={`w-16 h-16 mx-auto rounded-full ${diff.bg} ${
                  diff.hoverBg
                } flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-125 group-hover:shadow-xl relative z-10 ${
                  prefersReducedMotion ? "" : "group-hover:rotate-12"
                } ${hoveredCard === index && !prefersReducedMotion ? "animate-pulse" : ""}`}
              >
                <diff.icon
                  className={`w-10 h-10 ${diff.iconColor} transition-all duration-500 group-hover:scale-110 
                `}
                />

                {/* Icon glow effect */}
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>

              {/* Animated Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-blue-600 transition-all duration-300 relative z-10">
                {diff.title}
              </h3>

              {/* Enhanced Animated List Items */}
              <ul className="text-gray-600 space-y-4 text-left relative z-10">
                {diff.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className={`flex items-start transition-all duration-700 transform group-hover:translate-x-2 ${
                      isVisible ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
                    }`}
                    style={{
                      transitionDelay: isVisible ? `${diff.delay + 200 + itemIndex * 150}ms` : "0ms",
                    }}
                  >
                    <CheckIcon
                      className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5 mr-4 transition-all duration-300 group-hover:text-green-600 group-hover:scale-125"
                      isAnimated={hoveredCard === index && !prefersReducedMotion}
                    />
                    <span className="leading-relaxed group-hover:text-gray-800 transition-colors duration-300 font-medium">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Card border glow effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
