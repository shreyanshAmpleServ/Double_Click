import React from "react"
import { Container, Section } from "Shared/Customs"

const SapIntegration = () => {
  return (
    <Section className="bg-gradient-to-br from-[#bcc3f9] via-blue-50 to-[#fdc9dc] text-white !pt-2">
      <Container>
        <div className="max-w-4xl mx-auto text-center text-black">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Built for SAP Ecosystem</h2>
          <p className="text-xl text-white/90 mb-8">
            Fully integrated with SAP Business One and SAP S/4HANA for seamless data flow and unified operations.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-4">SAP Business One</h3>
              <p className="text-white/90">
                Ideal for small to mid-sized logistics companies with integrated fleet and complete financial
                visibility.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-4">SAP S/4HANA</h3>
              <p className="text-white/90">
                Enterprise‑grade fleet management with real‑time processing, advanced analytics, and global scale.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
export default SapIntegration
