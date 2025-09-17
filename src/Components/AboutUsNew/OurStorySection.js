// EnhancedOurStorySection.js - Even more dramatic animations
import React, { useState, useRef, useEffect } from "react"

const EnhancedOurStorySection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
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
          // Trigger sequential animation phases
          setTimeout(() => setAnimationPhase(1), 200)
          setTimeout(() => setAnimationPhase(2), 600)
          setTimeout(() => setAnimationPhase(3), 1000)
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

  const stats = [
    { value: "15+", label: "Years Experience", delay: "delay-100", color: "from-yellow-400 to-orange-400" },
    { value: "400+", label: "Projects Delivered", delay: "delay-200", color: "from-green-400 to-blue-400" },
    { value: "50+", label: "Enterprise Clients", delay: "delay-300", color: "from-purple-400 to-pink-400" },
    { value: "99%", label: "Client Satisfaction", delay: "delay-400", color: "from-blue-400 to-cyan-400" },
  ]

  const getAnimationClass = (defaultClass, reducedClass = "opacity-100") => {
    if (prefersReducedMotion) return reducedClass
    return isVisible ? "translate-x-0 opacity-100" : defaultClass
  }

  return (
    <section ref={sectionRef} className="bg-gray-50 py-16 pb-6 px-[5%] overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-20 transition-all duration-2000 ${
            animationPhase >= 1 ? "scale-100" : "scale-0"
          }`}
        ></div>
        <div
          className={`absolute bottom-10 right-10 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-20 transition-all duration-2000 delay-500 ${
            animationPhase >= 2 ? "scale-100" : "scale-0"
          }`}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content with enhanced animations */}
          <div
            className={`${prefersReducedMotion ? "" : "transition-all duration-1200 transform"} ${getAnimationClass(
              "-translate-x-20 opacity-0 rotate-2"
            )}`}
          >
            {/* Animated badge */}
            <div
              className={`text-blue-600 font-medium mb-4 text-sm uppercase tracking-wide transition-all duration-800 delay-200 transform ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              Our Story
            </div>

            {/* Enhanced heading with word animations */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              <span
                className={`inline-block transition-all duration-600 delay-300 transform ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                Pioneering
              </span>{" "}
              <span
                className={`inline-block transition-all duration-600 delay-400 transform ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                Digital{" "}
              </span>
              <span
                className={`inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-600 delay-500 transform ${
                  isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-110"
                }`}
              >
                Excellence
              </span>{" "}
              <span
                className={`inline-block transition-all duration-600 delay-600 transform ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                Since 2008
              </span>
            </h2>

            {/* Animated paragraphs */}
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed mb-8">
              <p
                className={`${
                  prefersReducedMotion ? "" : "hover:text-gray-700 transition-all duration-300"
                } transform transition-all duration-800 delay-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                }`}
              >
                DoubleClick Consulting Limited stands as East Africa's premier{" "}
                <span className="font-semibold text-blue-600 relative">
                  SAP Gold Partner
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transition-all duration-1000 delay-1000 ${
                      animationPhase >= 2 ? "scale-x-100" : "scale-x-0"
                    } origin-left`}
                  ></span>
                </span>
                , bringing over 15 years of proven expertise in delivering transformative business solutions.
              </p>

              <p
                className={`${
                  prefersReducedMotion ? "" : "hover:text-gray-700 transition-all duration-300"
                } transform transition-all duration-800 delay-900 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                }`}
              >
                Our deep industry expertise spans multiple sectors, enabling us to understand unique business challenges
                and craft solutions that deliver{" "}
                <span className="font-semibold text-blue-600">measurable, sustainable results</span>.
              </p>
            </div>

            {/* Enhanced button with loading effect */}
            <button
              className={`group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium inline-flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 relative overflow-hidden ${
                prefersReducedMotion ? "" : "transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              } ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              } transition-all duration-1000 delay-1100`}
            >
              <span className="relative z-10">Learn More About Our Journey</span>
              <svg
                className={`w-5 h-5 relative z-10 ${
                  prefersReducedMotion ? "" : "transform group-hover:translate-x-2 transition-transform duration-300"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>

              {/* Button hover effect */}
              <span className="absolute inset-0 bg-blue-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
            </button>
          </div>

          {/* Right Stats Card with enhanced animations */}
          <div
            className={`lg:justify-self-center ${
              prefersReducedMotion ? "" : "transition-all duration-1200 transform"
            } ${getAnimationClass("translate-x-20 opacity-0 rotate-2 scale-95")}`}
          >
            <div
              className={`bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 text-white max-w-md shadow-2xl border border-blue-500 relative overflow-hidden ${
                prefersReducedMotion ? "" : "hover:shadow-3xl transition-all duration-500 hover:scale-105"
              }`}
            >
              {/* Card background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent"></div>
              </div>

              {/* Animated stats grid */}
              <div className="grid grid-cols-2 gap-6 relative z-10">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`text-center relative ${
                      prefersReducedMotion
                        ? "cursor-pointer"
                        : `transform transition-all duration-1000 ${stat.delay} ${
                            isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-90"
                          } hover:scale-125 cursor-pointer group`
                    }`}
                  >
                    {/* Animated number with gradient */}
                    <div
                      className={`text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-b ${stat.color} group-hover:scale-110 transition-transform duration-300`}
                    >
                      {stat.value}
                    </div>

                    {/* Label with underline animation */}
                    <div className="text-blue-100 text-sm font-medium relative">
                      {stat.label}
                      <div
                        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-full h-0.5 bg-white transition-all duration-300`}
                      ></div>
                    </div>

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-lg  opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EnhancedOurStorySection
