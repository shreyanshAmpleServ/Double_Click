// CoreValues.js
import React from "react"
import { FiShield } from "react-icons/fi"
import { FiTarget } from "react-icons/fi"

// Custom SVG Icons
const HeartIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
)

const ShieldCheckIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5-6a9 9 0 11-4.5 7.5" />
  </svg>
)

const TargetIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const values = [
  {
    icon: HeartIcon,
    title: "Integrity & Passion",
    description:
      "We approach every consulting engagement with unwavering honesty and genuine passion, focusing on our clients' real needs for transformational change.",
    bg: "!bg-red-100",
    iconColor: "text-red-600",
  },
  {
    icon: FiShield,
    title: "Quality Excellence",
    description:
      "Our commitment to quality, timeliness, and accuracy forms the foundation of every project we undertake.",
    bg: "!bg-blue-100 !text-blue-600",
    iconColor: "text-blue-600",
  },
  {
    icon: FiTarget,
    title: "Client-Centric Focus",
    description:
      "We measure our success by the tangible value we deliver to stakeholders and the long-term partnerships we build.",
    bg: "!bg-green-100 !text-green-600",
    iconColor: "text-green-600",
  },
]

export default function CoreValues() {
  return (
    <section className="bg-white py-10 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header Badge */}
        <div className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full mb-4">
          Our Foundation
        </div>

        {/* Main Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Core Values That Drive Us</h2>

        {/* Subtitle */}
        <p className="text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
          Our guiding principles ensure we consistently deliver outstanding results and build lasting relationships.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="group bg-gray-50 hover:bg-gradient-to-br hover:from-pink-100 hover:via-blue-50 hover:to-blue-100  p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 hover:-translate-y-5"
            >
              {/* Icon */}
              <div
                className={`w-16 group-hover:scale-110 h-16 mx-auto rounded-full ${value.bg} flex items-center justify-center mb-6`}
              >
                <value.icon className={`w-8 h-8 ${value.iconColor}`} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
