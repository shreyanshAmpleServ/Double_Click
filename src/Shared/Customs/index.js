import React from "react"

const Button = ({ variant = "primary", className = "", children, ...props }) => {
  const base =
    "inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus-visible:ring-blue-500",
    light: "bg-white text-blue-700 hover:bg-gray-100 border border-gray-200 focus-visible:ring-blue-500",
    outline:
      "border border-white border-opacity-30 text-white hover:bg-white hover:bg-opacity-10 focus-visible:ring-white focus-visible:ring-opacity-60",
    dark: "bg-gray-900 text-white hover:bg-black focus-visible:ring-gray-600",
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

// ==========================================
// src/components/ui/Card.jsx
// ==========================================

const Card = ({ className = "", children }) => (
  <div
    className={`rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow ${className}`}
  >
    {children}
  </div>
)

// ==========================================
// src/components/ui/Container.jsx
// ==========================================

const Container = ({ className = "", children }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
)

// ==========================================
// src/components/ui/Section.jsx
// ==========================================

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`relative py-14 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </section>
)

const Badge = ({ className = "", children }) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full border border-white border-opacity-30 bg-white bg-opacity-10 px-4 py-2 text-sm font-semibold ${className}`}
  >
    {children}
  </span>
)

export { Container, Card, Section, Button }
