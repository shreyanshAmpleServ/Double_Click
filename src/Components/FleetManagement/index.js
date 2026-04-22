import React, { useState } from "react"
import "./gradients.css"

// import ContactCTA from "./components/ContactCTA"
import Hero from "./Hero"
import ValueProps from "./ValueProps"
import Features from "./Features"
import Dashboards from "./Dashboard"
import Reports from "./Reports"
import SapIntegration from "./SapIntegration"
import Benefits from "./Benifits"
import bg2 from "../../Assests/fleetBanner.png"
import { Section } from "Shared/Customs"

function FleetManagment() {
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <div id="top" className="min-h-screen  bg-white text-gray-900">
      <main>
        <Hero />
        <ValueProps />
        <Features />
        <Dashboards />
        <Reports />
        <SapIntegration />
        <Benefits />
        {/* <ContactCTA /> */}
      </main>
      <Section className="relative !pt-0 ">
        <img alt="fleetBanner" src={bg2} className="w-full h-auto border" />
      </Section>
      {/* <Footer /> */}
    </div>
  )
}
export default FleetManagment
