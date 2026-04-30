import React from "react"

export default function CloudPage() {
  return (
    <div className="font-[Inter] text-[#1A1030]">
      <HeroStatsSection />
      <OfferingsInfraExact />
      <PricingSection />
    </div>
  )
}

function PricingSection() {
  return (
    <div className="bg-[#f5f5f7] py-16 px-4 md:px-10 pb-6 font-[Inter]">
      {/* TOP SECTION */}
      <div className="max-w-[65rem] mx-auto mb-16">
        <span className="text-[10px] font-bold bg-purple-100 text-purple-600 px-3 py-1 rounded-full">PRICING</span>

        <h2 className="!text-[1.6rem] leading-5 md:!text-[40px] !font-extrabold mt-4">
          Get Your Custom Price Instantly
        </h2>

        <p className="text-gray-500 text-sm mt-2 max-w-xl">
          No fixed tiers — your cloud is sized exactly to your needs. Use our calculator to configure your environment
          and get an instant estimate.
        </p>

        {/* GRADIENT CARD */}
        <div className="mt-6 rounded-2xl p-10 text-center text-white relative overflow-hidden bg-gradient-to-br from-[#1a0f2e] via-[#2a0f4f] to-[#0f0a1e]">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-purple-600/20 blur-3xl opacity-40"></div>

          <div className="relative z-10">
            <div className="text-5xl mb-3">🧮 </div>
            <h1 className="text-3xl md:!text-5xl !font-extrabold text-white leading-tight mb-3">
              {" "}
              Cloud Pricing Calculator{" "}
            </h1>

            <p className="text-[16px] leading-7 !text-[#C4B5D4] max-w-md mx-auto">
              Tell us your vCPU, RAM, and storage requirements. Our calculator will give you a transparent, itemised
              cost estimate in seconds — no sales call needed.
            </p>

            {/* FEATURES */}
            <div className="flex flex-wrap justify-center gap-8 text-sm mt-6 py-4 text-purple-300">
              <span>✔ vCPU & RAM</span>
              <span>✔ Storage</span>
              <span>✔ Bandwidth</span>
              <span>✔ Instant estimate</span>
            </div>

            {/* BUTTON */}

            <a
              href="/cloud-hosting-calculator"
              className="inline-block mt-6 bg-gradient-to-r from-pink-500 to-purple-600 px-6 lg:px-10 py-4 rounded-md text-base lg:text-lg font-semibold text-white shadow-lg 
             transition-all duration-500 ease-in-out 
             hover:scale-110 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] hover:brightness-110
             group whitespace-nowrap"
            >
              Open Pricing Calculator
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-2 ml-2">→</span>
            </a>

            <p className="text-sm text-gray-400 mt-4">
              Need help sizing your environment?{" "}
              <a href="/contact" className="text-purple-400 font-medium">
                Talk to our team
              </a>{" "}
              — we’ll configure it for you.
            </p>
          </div>
        </div>
      </div>

      {/* WHY DCC */}
      <div className="max-w-[65rem] mx-auto mb-16">
        <span className="text-[10px] font-bold bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
          WHY DCC CLOUD
        </span>

        <h2 className="!text-[1.6rem] leading-5 lg:!text-[40px] !font-extrabold mt-4">The DCC Difference</h2>

        <p className="text-gray-500 text-lg leading-6.5 mt-2 max-w-xl">
          We're not just a hosting provider — we're your long-term technology partner, with deep SAP expertise and a
          track record across East Africa.
        </p>

        {/* GRID */}
        {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {[
            { title: "SAP Gold Partner", icon: "🏆" },
            { title: "East Africa Focus", icon: "🌍" },
            { title: "Fully Managed", icon: "🔧" },
            { title: "Scales With You", icon: "📈" },
            { title: "Dedicated Support", icon: "🤝" },
            { title: "Enterprise Security", icon: "🔐" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white border border-[#e6e3eb] rounded-xl p-4 text-center shadow-sm hover:shadow-md transition"
            >
              <div className="text-2xl mb-2">{item.icon}</div>

              <h4 className="text-sm font-semibold text-[#1a1030]">{item.title}</h4>

              <p className="text-xs text-gray-500 mt-1">Enterprise-grade reliability and support.</p>
            </div>
          ))}
        </div> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
          {[
            {
              title: "SAP Gold Partner",
              icon: "🏆",
              desc: "Certified SAP Gold Partner with 400+ successful implementations across the region.",
            },
            {
              title: "East Africa Focus",
              icon: "🌍",
              desc: "Headquartered in Dar es Salaam — we understand local business needs and compliance requirements.",
            },
            {
              title: "Fully Managed",
              icon: "🔧",
              desc: "We handle patching, monitoring, backups, and scaling — so your team can focus on the business.",
            },
            {
              title: "Scales With You",
              icon: "📈",
              desc: "Start small and scale up. Resources are adjusted on demand with no long procurement cycles.",
            },
            {
              title: "Dedicated Support",
              icon: "🤝",
              desc: "A named account manager and technical team who know your environment inside out.",
            },
            {
              title: "Enterprise Security",
              icon: "🔐",
              desc: "Multi-layer security, encrypted backups, and compliance controls built into every plan.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white border border-[#e6e3eb] rounded-[14px] px-6 py-7 text-center shadow-sm hover:shadow-md transition-all duration-300 group hover:border-[#D8B4FE]"
            >
              {/* ICON - Matched to 36px */}
              <div className="text-[36px] mb-3.5 transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>

              {/* TITLE - Matched to 16px / Bold */}
              <h4 className="text-[16px] font-bold text-[#1a1030] mb-2">{item.title}</h4>

              {/* DESC - Matched to 13px / Line-height 1.6 */}
              <p className="text-[13px] text-[#6b7280] leading-[1.6]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA BANNER */}
      <div className="max-w-[65rem] mx-auto">
        <div className="rounded-2xl text-center text-white py-10 px-6 bg-gradient-to-br from-[#1a0f2e] via-[#2a0f4f] to-[#0f0a1e] relative overflow-hidden">
          <div className="absolute inset-0 bg-pink-500/20 blur-3xl opacity-30"></div>

          <div className="relative z-10">
            <h3 className="!text-[1.6rem] leading-5 lg:!text-[40px] !font-extrabold  !mb-[2rem]">
              Ready to Move Your Business to the Cloud?
            </h3>

            <p className="text-sm !text-[#C4B5D4] mb-[2rem]">
              Talk to our cloud specialists and get a tailored proposal within 48 hours.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => document.getElementById("request-quote")?.click()}
                className="bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-2 rounded-md text-sm font-semibold"
              >
                Request a Quote
              </button>

              <button className="border border-white/30 px-5 py-2 rounded-md text-sm">📞 +255-22-2112161</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
function OfferingsInfraExact() {
  return (
    <div id="offerings-section" className="bg-[#f6f5f8] py-16 px-6 font-[Inter]">
      {/* ================= OFFERINGS ================= */}

      <div className="max-w-[66rem] mx-auto mb-20 px-4">
        {/* TAG */}
        <span className="text-[10px] font-bold tracking-widest bg-[#efe7fb] text-[#7b2fbe] px-3 py-1 rounded-full uppercase">
          Cloud Offerings
        </span>

        {/* TITLE */}
        <div className="!text-[1.6rem]  lg:!text-[40px] !font-extrabold mt-4 text-[#1a1030] leading-tight">
          Everything Your Business Needs <br /> in the Cloud
        </div>

        <p className="text-[#6b7280] text-[14px] mt-3 max-w-xl leading-relaxed">
          From SAP hosting to fully configured private cloud — DCC Cloud delivers flexible, enterprise-ready solutions
          tailored to your industry.
        </p>
        {/* <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            {
              title: "SAP Business One Cloud Hosting",
              tag: "SAP Certified",
              icon: "☁️",
              desc: "Dedicated cloud environment optimised for SAP Business One — high performance, low latency, and fully managed by certified SAP consultants.",
            },
            {
              title: "SAP S/4HANA Public Cloud",
              tag: "Enterprise ERP",
              icon: "🚀",
              desc: "Accelerate your digital transformation with SAP S/4HANA on the cloud. Real-time analytics, intelligent automation, and enterprise-grade scalability.",
            },
            {
              title: "Cloud Migration Services",
              tag: "Managed Migration",
              icon: "🔄",
              desc: "Seamless lift-and-shift or re-architecture of your on-premise workloads to the cloud — with zero data loss and minimal downtime.",
            },
            {
              title: "Managed Hosting & Security",
              tag: "Always-On Security",
              icon: "🛡️",
              desc: "Enterprise-grade security protocols and 24/7 monitoring to ensure your cloud infrastructure remains impenetrable and compliant.",
            },
            {
              title: "Hybrid Cloud Setup",
              tag: "Flexible Architecture",
              icon: "🔀",
              desc: "The best of both worlds: combine private and public cloud resources to optimize cost, performance, and control.",
            },
            {
              title: "Custom Private Cloud",
              tag: "Fully Configured",
              icon: "🏗️",
              desc: "A fully isolated, bespoke cloud environment tailored specifically to your business's unique security and regulatory requirements.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`group relative rounded-[16px] p-8 border transition-all duration-250 cursor-pointer overflow-hidden
        ${
          item.active
            ? "border-[#D8B4FE] bg-[#fbf8ff] shadow-[0_12px_40px_rgba(123,47,190,0.12)] -translate-y-1"
            : "border-[#e6e3eb] bg-white hover:border-[#D8B4FE] hover:shadow-[0_12px_40px_rgba(123,47,190,0.12)] hover:-translate-y-1"
        }`}
            >
              <div
                className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#7b2fbe] to-[#d8b4fe] transition-opacity duration-250 
        ${item.active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
              />

              <div
                style={{ background: "linear-gradient(135deg, #f3e8ff 0%, #fce4f3 100%)" }}
                className="w-[52px] h-[52px] rounded-[12px] flex items-center justify-center mb-5 text-2xl"
              >
                {item.icon}
              </div>

              <h3 className="text-[18px] font-bold text-[#1a1030] mb-2 leading-tight group-hover:text-[#7b2fbe] transition-colors">
                {item.title}
              </h3>

              <p className="text-[14px] text-[#6b7280] leading-[1.65] mb-6">{item.desc}</p>

              <span className="inline-block text-[11px] font-semibold px-3 py-1 rounded-full bg-[#f3e8ff] text-[#7b2fbe] border border-[#e9d8ff]">
                {item.tag}
              </span>
            </div>
          ))}
        </div> */}

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            {
              title: "SAP Business One Cloud Hosting",
              tag: "SAP Certified",
              icon: "☁️",
              desc: "Dedicated cloud environment optimised for SAP Business One — high performance, low latency, and fully managed by certified SAP consultants.",
            },
            {
              title: "SAP S/4HANA Public Cloud",
              tag: "Enterprise ERP",
              icon: "🚀",
              desc: "Accelerate your digital transformation with SAP S/4HANA on the cloud. Real-time analytics, intelligent automation, and enterprise-grade scalability.",
            },
            {
              title: "Cloud Migration Services",
              tag: "Managed Migration",
              icon: "🔄",
              desc: "Seamless lift-and-shift or re-architecture of your on-premise workloads to the cloud — with zero data loss and minimal downtime.",
            },
            {
              title: "Managed Hosting & Security",
              tag: "Always-On Security",
              icon: "🛡️",
              desc: "Enterprise-grade security protocols and 24/7 monitoring to ensure your cloud infrastructure remains impenetrable and compliant.",
            },
            {
              title: "Hybrid Cloud Setup",
              tag: "Flexible Architecture",
              icon: "🔀",
              desc: "The best of both worlds: combine private and public cloud resources to optimize cost, performance, and control.",
            },
            {
              title: "Custom Private Cloud",
              tag: "Fully Configured",
              icon: "🏗️",
              desc: "A fully isolated, bespoke cloud environment tailored specifically to your business's unique security and regulatory requirements.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl p-7  transition-all duration-300 cursor-pointer
                 hover:scale-105 overflow-hidden

               ${
                 item.active
                   ? "hover:ring-1 hover:ring-[#d8b4fe] hover:bg-[#fbf8ff] hover:shadow-[0_0_20px_-5px_rgba(216,180,254,0.4)]"
                   : "ring-1 ring-[#f0f0f0] bg-white hover:ring-[#d8b4fe] hover:shadow-[0_0_20px_-5px_rgba(216,180,254,0.4)] hover:-translate-y-1"
               }`}
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#7B2FBE] to-[#E040A0] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* ICON */}
              <div
                style={{ background: "linear-gradient(135deg, #f3e8ff 0%, #fce4f3 100%)" }}
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-xl"
              >
                {item.icon}
              </div>

              {/* TITLE */}
              <h3 className="text-[16px] font-bold text-[#1a1030] mb-3 leading-tight group-hover:text-[#7b2fbe] transition-colors">
                {item.title}
              </h3>

              {/* DESC - Updated to be more detailed like the image */}
              <p className="text-[13px] text-[#6b7280] leading-relaxed mb-6">{item.desc}</p>

              {/* TAG */}
              <span className="inline-block text-[11px] font-medium px-3 py-1 rounded-full bg-[#f3e8ff] text-[#7b2fbe] border border-[#e9d8ff]">
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* ================= INFRA ================= */}
      <div className="max-w-[65rem] mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT */}
        <div>
          <span className="text-[10px] font-semibold tracking-wide bg-[#efe7fb] text-[#7b2fbe] px-3 py-1 rounded-full">
            INFRASTRUCTURE
          </span>

          <h2 className="!text-[1.4rem]  lg:!text-[35px] !leading-tight !font-extrabold mt-4  text-[#1a1030]">
            World-Class Infrastructure, Locally Delivered
          </h2>

          <p className="text-[#6b7280] text-[13px] mt-3 mb-6 max-w-md">
            DCC Cloud runs on Iron Mountain's Tier 3 datacenter in Amsterdam, with full disaster recovery in Ashburn,
            Virginia.
          </p>

          {/* BULLETS */}
          <ul className="space-y-4 text-[13px] !pl-0">
            {[
              "Tier 3 Iron Mountain datacenter — Amsterdam primary site",
              "Disaster recovery site in Ashburn, Virginia (USA)",
              "Multi-level failover — applications stay online",
              "Customised resource scaling — up or down",
              "End-to-end encryption and compliance-ready security",
            ].map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="w-5 h-5 bg-gradient-to-r from-[#7B2FBE] to-[#E040A0] text-white rounded-full flex items-center justify-center text-[10px] mt-[2px]">
                  ✓
                </span>
                <span className="!text-[15px] text-[#000000]">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT DARK CARD */}
        <div className="rounded-2xl p-6 text-white bg-gradient-to-br from-[#120a22] via-[#1c0f3a] to-[#120a22] shadow-xl">
          <div className="grid grid-cols-2 gap-4">
            {[
              ["Primary Site", "Amsterdam", "🏢"],
              ["DR Site", "Ashburn, VA", "🔁"],
              ["Uptime SLA", "99.9", "⚡"],
              ["Datacenter", "Tier 3 / Iron Mountain", "🔒"],
            ].map(([label, value, icon], i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                {icon && <p className="text-[20px] text-gray-400">{icon}</p>}
                <p className="text-[11px] text-gray-400">{label}</p>
                <p className="text-[15px] !text-white font-semibold mt-1">{value}</p>
              </div>
            ))}

            <div className="col-span-2 bg-white/5 border border-white/10 rounded-lg p-4 text-center">
              <p className="text-[20px] text-gray-400">🌍</p>
              <p className="text-[11px] text-gray-400">Serving</p>
              <p className="text-[15px] !text-white font-semibold mt-1">East Africa & Beyond</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
function HeroStatsSection() {
  return (
    <div className="font-[Inter]">
      {/* ================= HERO ================= */}
      <section className="relative text-center px-6 py-8 lg:py-28 overflow-hidden bg-gradient-to-b from-[#1a0f2e] via-[#120a22] to-[#0f0a1e]">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-purple-600/20 blur-3xl opacity-30"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-purple-400/30 bg-purple-500/10 text-purple-300 px-4 py-1 rounded-full text-xs mb-6">
            ● Enterprise-Grade Cloud · Tier 3 Datacenter
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 62px)",
              fontWeight: 800,
              lineHeight: "1.1",
              color: "white",
              marginBottom: "24px",
              letterSpacing: "-1.5px",
              position: "relative",
            }}
            className="text-3xl md:!text-[3.5rem] !mb-1  font-extrabold text-white !leading-7"
          >
            Cloud Infrastructure <br />
            Built for{" "}
            <span className="bg-gradient-to-r from-[#7b2fbe] to-[#e040a0] bg-clip-text text-transparent">
              African Enterprise
            </span>
          </h1>

          {/* Description */}
          <p className="0 !text-[#C4B5D4] mt-6 text-[14px] md:text-base max-w-xl mx-auto">
            Secure, scalable, and always-on cloud hosting from Double Click Consulting — powering SAP, ERP, and
            mission-critical workloads across East Africa.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            {" "}
            {/* Wrapping in a div for layout */}
            {/* BUTTON 1: Request a Quote */}
            <button
              onClick={() => document.getElementById("request-quote")?.click()}
              className="bg-gradient-to-r from-[#7b2fbe] to-[#e040a0] text-white px-8 py-3.5 rounded-lg text-base font-semibold shadow-lg 
               transition-all duration-300 ease-out 
               hover:scale-105 hover:-translate-y-1 hover:opacity-90 hover:shadow-purple-500/40 hover:shadow-xl"
            >
              Request a Quote
            </button>
            {/* BUTTON 2: Explore Offerings */}
            <button
              onClick={() => {
                document.getElementById("offerings-section")?.scrollIntoView({ behavior: "smooth" })
              }}
              className="group border border-white/20 text-white px-8 py-3.5 rounded-lg text-base 
               transition-all duration-300 ease-out 
               hover:bg-white/10 hover:scale-105 hover:-translate-y-1"
            >
              Explore Offerings
              <span className="inline-block transition-transform duration-300 group-hover:translate-y-1 ml-1">↓</span>
            </button>
          </div>

          {/* <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => document.getElementById("request-quote")?.click()}
              className="bg-gradient-to-r from-[#7b2fbe] to-[#e040a0] text-white px-8 py-3.5 rounded-lg text-base font-semibold shadow-lg hover:opacity-90"
            >
              Request a Quote
            </button>

            <button
              onClick={() => {
                document.getElementById("offerings-section")?.scrollIntoView({ behavior: "smooth" })
              }}
              className="border border-white/20 text-white px-8 py-3.5 rounded-lg text-base hover:bg-white/10 transition"
            >
              Explore Offerings ↓
            </button>
          </div> */}
        </div>
      </section>

      {/* ================= STATS BARS ================= */}

      <section className="bg-[#f6f5f8]  py-8 px-6">
        <div className="max-w-[65rem] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-center">
            {[
              { value: "99.9%", label: "Uptime Guarantee" },
              { value: "Tier 3", label: "Iron Mountain Datacenter" },
              { value: "2", label: "Geographic Redundancy Sites" },
              { value: "400+", label: "Projects Delivered" },
              { value: "24/7", label: "Managed Support" },
            ].map((item, i) => (
              <div
                key={i}
                className={`
            px-6 py-4
            flex flex-col items-center justify-center
            ${i !== 4 ? "lg:border-r border-[#e3e0e8]" : ""}
          `}
              >
                {/* VALUE */}
                {/* <h2 className="!text-[2rem] md:text-[42px] font-extrabold !text-[#9333ea] leading-none">
                  {item.value}
                </h2> */}
                <h2
                  className="!text-[28px] md:!text-[42px] !my-1 !mt-3 !font-extrabold !leading-none 
  !bg-gradient-to-r !from-[#7b2fbe] !to-[#e040a0] 
  !bg-clip-text !text-transparent"
                >
                  {item.value}
                </h2>
                {/* LABEL */}
                <p className="text-[14px]  text-[#434446] mt-3 leading-snug">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <hr />
    </div>
  )
}
