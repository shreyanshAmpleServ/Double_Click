import React from "react"

const Hero = () => {
  const scrollToLearnMore = () => {
    document.getElementById("learn-more")?.scrollIntoView({ behavior: "smooth" })
  }
  return (
    <section className="!pt-32 !pb-20 !bg-gradient-to-br !from-blue-900 !via-blue-800 !to-cyan-700 !text-white !relative !overflow-hidden">
      <div className="!absolute !inset-0 !opacity-10">
        <div className="!absolute !top-0 !left-0 !w-96 !h-96 !bg-white !rounded-full !mix-blend-multiply !filter !blur-3xl"></div>
        <div className="!absolute !bottom-0 !right-0 !w-96 !h-96 !bg-cyan-300 !rounded-full !mix-blend-multiply !filter !blur-3xl"></div>
      </div>

      <div className="!max-w-7xl !mx-auto !px-4 sm:!px-6 lg:!px-8 !relative !z-10">
        <div className="!text-center">
          <h1 className="!text-5xl md:!text-6xl !font-bold !mb-6 !leading-tight">
            Transform Your Enterprise with <span className="!text-cyan-300">SAP S/4HANA</span>
          </h1>
          <p className="!text-xl md:!text-2xl !text-blue-100 !mb-8 !max-w-3xl !mx-auto">
            Real-time insights, simplified processes, and AI-powered intelligence. Unlock your business potential with
            the next-generation ERP platform.
          </p>
          <div className="!flex !flex-col sm:!flex-row !gap-4 !justify-center">
            <button
              onClick={() => document.getElementById("request-quote")?.click()}
              className="!bg-cyan-500 hover:!bg-cyan-600 !text-white !px-8 !py-3 !rounded-lg !font-semibold !transition"
            >
              Schedule a Demo
            </button>
            <button
              onClick={scrollToLearnMore}
              className="!bg-white !bg-opacity-20 hover:!bg-white hover:!bg-opacity-30 !text-white !px-8 !py-3 !rounded-lg !font-semibold !border !border-white !border-opacity-50 !transition"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
