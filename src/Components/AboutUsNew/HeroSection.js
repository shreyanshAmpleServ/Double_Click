import React, { useState, useEffect } from "react"

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16 px-6 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="7" cy="7" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat`}
        ></div>
      </div>

      <div
        className={`max-w-6xl mx-auto text-center relative z-10 transition-all duration-1000 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* Top Badge */}
        <div className="inline-block bg-blue-700 bg-opacity-50 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-medium mb-8 border border-blue-500">
          SAP Gold Partner • 15+ Years Experience
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          About{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">DoubleClick</span>{" "}
          Consulting
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl !text-blue-200 mb-12 max-w-4xl mx-auto leading-relaxed">
          Empowering Digital Transformation Through Expert SAP Solutions
        </p>

        {/* Bottom Icons/Badges */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
          {[
            { icon: "⭐", text: "SAP Gold Partner", color: "bg-yellow-500" },
            { icon: "🌍", text: "East Africa Leader", color: "bg-green-500" },
            { icon: "👥", text: "400+ Successful Projects", color: "bg-purple-500" },
          ].map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 transform transition-all duration-700 delay-${(index + 1) * 200} ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
              } hover:scale-105`}
            >
              <div
                className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center text-xl shadow-lg`}
              >
                {item.icon}
              </div>
              <span className="text-lg font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
