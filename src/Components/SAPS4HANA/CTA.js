import React from "react"

const CTA = () => {
  return (
    <section id="learn-more" className="!py-20 !bg-gradient-to-r !from-blue-600 !to-cyan-600 !text-white">
      <div className="!max-w-7xl !mx-auto !px-4 sm:!px-6 lg:!px-8 !text-center">
        <h2 className="!text-4xl !font-bold !mb-6">Ready to Transform Your Business?</h2>
        <p className="!text-xl !text-blue-100 !mb-8 !max-w-2xl !mx-auto">
          Let's discuss how SAP S/4HANA can drive growth and efficiency for your organization
        </p>
        <div className="!flex !flex-col sm:!flex-row !gap-4 !justify-center">
          <button
            onClick={() => document.getElementById("request-quote")?.click()}
            className="!bg-white !text-blue-600 !px-8 !py-3 !rounded-lg !font-semibold hover:!bg-blue-50 !transition"
          >
            Schedule a Consultation
          </button>
        </div>
      </div>
    </section>
  )
}

export default CTA
