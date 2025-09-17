// PartnershipsSection.js
import React, { useState, useRef, useEffect } from "react"

const PartnershipsSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
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

  const BuildingIcon = ({ className, isHovered }) => (
    <svg
      className={`${className} transition-all duration-300 ${isHovered ? "scale-110" : "scale-100"}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  )

  const partnerships = [
    { name: "TATOA", delay: 100, description: "Transport Association" },
    { name: "KTA", delay: 200, description: "Kenya Transport Association" },
    { name: "KIFWA", delay: 300, description: "Kenya International Freight" },
    { name: "TAZ", delay: 400, description: "Transport Association Zambia" },
    { name: "UFFA", delay: 500, description: "Uganda Freight Forwarders" },
    { name: "SAFFA", delay: 600, description: "South African Freight" },
    { name: "SATC", delay: 700, description: "Southern Africa Transport" },
    { name: "SAHHA", delay: 800, description: "South African Haulage" },
    { name: "Land-linked Zambia", delay: 900, description: "Zambian Land Transport" },
  ]

  return (
    <section ref={sectionRef} className="bg-gray-50 py-16 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header with floating animation */}
        <div
          className={`text-center mb-16 transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="inline-block bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 text-sm font-medium px-6 py-3 rounded-full mb-6 shadow-md hover:shadow-lg transition-shadow animate-pulse">
            Strategic Alliances
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Partnerships & Memberships
          </h2>

          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            We maintain active partnerships with leading industry organizations across the region
          </p>
        </div>

        {/* Partnership Cards with staggered animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          {partnerships.slice(0, 5).map((partner, index) => (
            <div
              key={partner.name}
              className={`bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transform transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-90"
              } hover:scale-110 hover:-translate-y-3 cursor-pointer group relative overflow-hidden`}
              style={{
                transitionDelay: isVisible ? `${partner.delay}ms` : "0ms",
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

              <div className="text-center relative z-10">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300 shadow-lg">
                  <BuildingIcon className="w-8 h-8 text-blue-600" isHovered={hoveredCard === index} />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 text-lg">
                  {partner.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {partner.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Second Row with different animation timing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {partnerships.slice(5).map((partner, index) => (
            <div
              key={partner.name}
              className={`bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transform transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-90"
              } hover:scale-110 hover:-translate-y-3 cursor-pointer group relative overflow-hidden`}
              style={{
                transitionDelay: isVisible ? `${partner.delay}ms` : "0ms",
              }}
              onMouseEnter={() => setHoveredCard(index + 5)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

              <div className="text-center relative z-10">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300 shadow-lg">
                  <BuildingIcon className="w-8 h-8 text-blue-600" isHovered={hoveredCard === index + 5} />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {partner.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {partner.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PartnershipsSection
