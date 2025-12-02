/**
 * Hero Section Component
 * Main landing page hero with headline, subheadline, and CTA buttons
 * Features background image and compelling value proposition
 */
export default function Hero() {
  return (
    <section className="!relative !w-full !pt-20 lg:!pt-32 !pb-20 !overflow-hidden">
      {/* Background Image */}
      <div className="!absolute !inset-0 !z-10">
        <img src="/images/hero-bg.webp" alt="Hero Background" className="!w-full !h-full !object-cover" />
        {/* Overlay for text readability */}
        <div className="!absolute !inset-0 !bg-black !z-20 !bg-opacity-40" />
      </div>

      {/* Content */}
      <div className="!relative !z-50 !max-w-7xl !mx-auto !px-4 sm:!px-6 lg:!px-8">
        <div className="!max-w-3xl">
          {/* Main Headline */}
          <h1 className="!text-5xl lg:!text-[3.75rem] !font-bold !text-white !mb-6 !leading-tight">
            Faster Clearances. Smarter Freight Decisions. Total Visibility.
          </h1>

          {/* Subheadline */}
          <p className="!text-xl lg:!text-2xl !text-gray-100 !mb-8 !leading-relaxed">
            Powerful, end-to-end clearing & forwarding solution for freight forwarders, customs clearing agents &
            logistics companies across Africa & MEA.
          </p>

          {/* CTA Buttons - Only Request a Demo */}
          <div className="!flex !flex-col sm:!flex-row !gap-4">
            <button
              onClick={() => document.getElementById("request-quote")?.click()}
              className="!bg-blue-600 hover:!bg-blue-700 !rounded-lg !px-6 !py-1 !text-white !font-semibold !text-lg"
            >
              Request a Demo
            </button>
          </div>

          {/* Proven Results */}
          <div className="!mt-16 !grid !grid-cols-1 sm:!grid-cols-3 !gap-8">
            <div className="!bg-white !bg-opacity-10 !backdrop-blur-sm !rounded-lg !p-6 !border !border-white !border-opacity-20">
              <p className="!text-sm !text-gray-200 !mb-2">Demurrage Reduction</p>
              <p className="!text-3xl !font-bold !text-white">Up to 99%</p>
            </div>
            <div className="!bg-white !bg-opacity-10 !backdrop-blur-sm !rounded-lg !p-6 !border !border-white !border-opacity-20">
              <p className="!text-sm !text-gray-200 !mb-2">Clearance Time</p>
              <p className="!text-3xl !font-bold !text-white">60% Faster</p>
            </div>
            <div className="!bg-white !bg-opacity-10 !backdrop-blur-sm !rounded-lg !p-6 !border !border-white !border-opacity-20">
              <p className="!text-sm !text-gray-200 !mb-2">Full Visibility</p>
              <p className="!text-3xl !font-bold !text-white">End-to-End</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
