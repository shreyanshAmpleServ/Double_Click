"use client"

import BusinessBenefits from "./BussinessBenefits"
import CTA from "./CTA"
import Footer from "./Footer"
import Hero from "./Hero"
import ImplementationTimeline from "./ImplementationTimeline"
// import NavBar from "./Navbar"
import PainPoints from "./Painpoints"
import SolutionFeatures from "./SolutionFeatures"
import WhyChooseUs from "./WhyChooseUs"

export default function OirGas() {
  return (
    <div className="min-h-screen bg-white">
      {/* <NavBar /> */}
      <Hero />
      <PainPoints />
      <SolutionFeatures />
      <BusinessBenefits />
      <ImplementationTimeline />
      <WhyChooseUs />
      <CTA />
      {/* <Footer /> */}
    </div>
  )
}
