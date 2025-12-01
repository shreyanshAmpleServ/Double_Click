import React from "react"
import { ArrowRight } from "lucide-react"
import { Button, Container, Section } from "Shared/Customs"

const CTA = () => {
  return (
    <Section id="contact" className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="!text-4xl sm:!text-5xl !font-bold !text-white !mb-6">
            Ready to Transform Your Customs Clearing Process?
          </h2>
          <p className="!text-xl !text-white !opacity-90 !mb-12 !max-w-2xl !mx-auto">
            Experience a smarter way to manage freight, files, and financials. Join leading logistics providers across
            Africa and MEA who are already seeing results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center whitespace-nowrap">
            <button
              className="!bg-white !flex !items-center !justify-center !gap-2 !text-blue-600 hover:!bg-gray-100 !rounded-lg !font-semibold !px-4 !py-2"
              onClick={() => document.getElementById("request-quote")?.click()}
            >
              Request Your Demo Now
              <ArrowRight className="!ml-2 !w-5 !h-5" />
            </button>
            <button className="!bg-transparent !border-2 !border-white !rounded-lg !text-white hover:!bg-white hover:!bg-opacity-10 !font-semibold !px-4 !py-2">
              Contact Sales
            </button>
          </div>

          <div className="mt-16 pt-12 border-t border-white border-opacity-20">
            <p className="!text-white !opacity-90 !mb-6">Trusted by leading organizations</p>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              <div className="text-white">
                <p className="!text-2xl !text-white !opacity-90 !font-bold">500+</p>
                <p className="!text-sm !text-white !opacity-80">Active Users</p>
              </div>
              <div className="text-white">
                <p className="!text-2xl !text-white !opacity-90 !font-bold">50+</p>
                <p className="!text-sm !text-white !opacity-80">Companies</p>
              </div>
              <div className="text-white">
                <p className="!text-2xl !text-white !opacity-90 !font-bold">99%</p>
                <p className="!text-sm !text-white !opacity-80">Uptime</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default CTA
