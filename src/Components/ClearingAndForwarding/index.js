import React from "react"
import "./gradients.css"

import Capabilities from "./Capabilities"
import Dashboards from "./Dashboards"
import Benefits from "./Benefits"
import TargetAudience from "./TargetAudience"
import CTA from "./CTA"
import Hero from "./Hero"

function ClearingAndForwarding() {
  return (
    <div id="top" className="min-h-screen w-full bg-white text-gray-900">
      {/* Hero Section - Main value proposition and headline */}
      <Hero />

      {/* Capabilities Section - Core features and functionality */}
      <Capabilities />

      {/* Benefits Section - Proven results and differentiators */}
      <Benefits />

      {/* Dashboards Section - Analytics and BI insights */}
      <Dashboards />

      {/* Target Audience Section - Who should use this solution */}
      <TargetAudience />

      <CTA />
    </div>
  )
}
export default ClearingAndForwarding
