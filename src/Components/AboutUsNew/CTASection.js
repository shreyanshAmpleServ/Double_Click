// CTASection.js - With particle effects and advanced animations
import React, { useState, useRef, useEffect } from "react"

const CTASection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
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

  // Mouse tracking for parallax effect
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setMousePosition({ x, y })
  }

  // Floating particles component
  const FloatingParticles = () => {
    const particles = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))

    return (
      <div className="absolute inset-0 overflow-hidden">
        {/* {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-white rounded-full opacity-10 animate-pulse"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))} */}
      </div>
    )
  }

  return (
    <section ref={sectionRef} className="py-10 pb-4">
      <div className="max-w-6xl mx-auto">
        <div
          className={`bg-gradient-to-br from-[#bcc3f9] via-blue-50 to-[#fdc9dc] text-white py-20 px-8 rounded-3xl relative overflow-hidden transform transition-all duration-1000 ${
            // className={`bg-gradient-to-br from-[#2f3985] via-blue-600 to-[#d9145b] text-white py-20 px-8 rounded-3xl relative overflow-hidden transform transition-all duration-1000 ${
            isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
          onMouseMove={handleMouseMove}
        >
          {/* Animated Background Elements */}
          <FloatingParticles />

          {/* Parallax background elements */}
          <div
            className="absolute w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse"
            style={{
              top: "10%",
              right: "10%",
              transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
              transition: "transform 0.3s ease-out",
            }}
          />
          <div
            className="absolute w-64 h-64 bg-purple-400 rounded-full blur-3xl opacity-20 animate-pulse"
            style={{
              bottom: "10%",
              left: "10%",
              transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
              transition: "transform 0.3s ease-out",
              animationDelay: "1s",
            }}
          />

          <div className="relative z-10 text-center">
            {/* Animated Main Heading */}
            <h2
              className={`text-4xl md:text-5xl !text-black lg:text-6xl font-bold mb-8 leading-tight transition-all duration-1000 delay-200 transform ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <span className="inline-block animate-bounce delay-100">Ready</span>{" "}
              <span className="inline-block animate-bounce delay-200">to</span>{" "}
              <span className="inline-block animate-bounce delay-300">Transform</span>{" "}
              <span className="inline-block animate-bounce delay-400">Your</span>{" "}
              <span className="inline-block animate-bounce delay-500 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-orange-500">
                Business?
              </span>
            </h2>

            {/* Typewriter effect description */}
            <div
              className={`text-lg md:text-xl !text-gray-400 leading-relaxed max-w-4xl mx-auto mb-12 transition-all duration-1000 delay-600 transform ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <p className=" !text-gray-500">
                Whether you're seeking to optimize distribution networks, enhance freight forwarding operations, or
                implement a complete digital supply chain solution,
              </p>
              <p className="font-semibold !text-gray-500">
                DoubleClick Consulting Limited is your trusted partner for success.
              </p>
            </div>

            {/* Animated CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-800 transform ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              {/* Primary CTA with pulse animation */}
              <button className="group relative border !border-black bg-white !text-blue-600 hover:bg-blue-100 px-10 py-5 rounded-2xl font-bold text-lg inline-flex items-center gap-4 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-80 overflow-hidden">
                <div className="absolute  border-black inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="  relative z-10">Get Started Today</div>
                <svg
                  className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300 relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>

                {/* Ripple effect */}
                <span className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:animate-ping"></span>
              </button>

              {/* Secondary CTA with border animation */}
              <button className="group relative bg-transparent border border-black text-black hover:bg-white hover:!text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 overflow-hidden">
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <div className="relative z-10 ">Schedule Consultation</div>
              </button>
            </div>

            {/* Trust indicators with fade-in animation */}
            <div
              className={`mt-12 flex flex-wrap justify-center items-center gap-8 text-blue-200 transition-all duration-1000 delay-1000 transform ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
              }`}
            >
              <div className="flex !text-gray-500 items-center gap-2 text-sm">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>SAP Gold Partner</span>
              </div>
              <div className="flex !text-gray-500 items-center gap-2 text-sm">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>15+ Years Experience</span>
              </div>
              <div className="flex !text-gray-500 items-center gap-2 text-sm">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>100+ Projects Delivered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
