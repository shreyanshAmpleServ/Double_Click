// VisionSection.js
import React from "react"

export default function VisionSection() {
  return (
    <section className="py-10 px-7">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-[#bcc3f9] via-blue-50 to-[#fdc9dc] text-white py-16 px-8 rounded-3xl relative overflow-hidden">
          {/* <div className="bg-gradient-to-br from-[#2f3985] via-blue-700 to-[#d9145b] text-white py-16 px-8 rounded-3xl relative overflow-hidden"> */}
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
      <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
          <g fill="#ffffff" fillOpacity="0.1">
            <circle cx="7" cy="7" r="1"/>
          </g>
        </g>
      </svg>
    `)}")`,
                backgroundRepeat: "repeat",
              }}
            ></div>
          </div>

          <div className="relative z-10 text-center">
            {/* Header Badge */}
            <div className="inline-block bg-blue-700 bg-opacity-50 backdrop-blur-sm px-4 py-2 text-sm font-medium rounded-full mb-8 border border-blue-500">
              Our Vision
            </div>

            {/* Main Quote */}
            <blockquote className="text-2xl md:text-4xl lg:text-5xl text-black font-bold mb-8 leading-tight">
              "To be the leading ICT transformation partner across Africa and the GCC region"
            </blockquote>

            {/* Supporting Text */}
            <p className="text-lg md:text-xl !text-gray-500 leading-relaxed max-w-4xl mx-auto">
              Consistently delivering exceptional value to all our stakeholders while driving sustainable business
              growth and innovation across diverse industries.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
