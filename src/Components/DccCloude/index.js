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
    <div className="bg-[#f5f5f7] py-16 px-4 md:px-10 font-[Inter]">
      {/* TOP SECTION */}
      <div className="max-w-5xl mx-auto mb-16">
        <span className="text-[10px] font-bold bg-purple-100 text-purple-600 px-3 py-1 rounded-full">PRICING</span>

        <h2 className="text-xl md:text-2xl font-semibold mt-4">Get Your Custom Price Instantly</h2>

        <p className="text-gray-500 text-sm mt-2 max-w-xl">
          No fixed tiers — your cloud is sized exactly to your needs. Use our calculator to configure your environment
          and get an instant estimate.
        </p>

        {/* GRADIENT CARD */}
        <div className="mt-6 rounded-2xl p-10 text-center text-white relative overflow-hidden bg-gradient-to-br from-[#1a0f2e] via-[#2a0f4f] to-[#0f0a1e]">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-purple-600/20 blur-3xl opacity-40"></div>

          <div className="relative z-10">
            {/* <div className="text-3xl mb-3"> ◆◆ </div> */}
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-3">
              {" "}
              Cloud Pricing Calculator{" "}
            </h1>

            <p className="text-sm text-gray-300 max-w-md mx-auto">
              Tell us your vCPU, RAM, and storage requirements. Our calculator will give you a transparent, itemised
              cost estimate in seconds — no sales call needed.
            </p>

            {/* FEATURES */}
            <div className="flex flex-wrap justify-center gap-6 text-xs mt-6 text-purple-300">
              <span>✔ vCPU & RAM</span>
              <span>✔ Storage</span>
              <span>✔ Bandwidth</span>
              <span>✔ Instant estimate</span>
            </div>

            {/* BUTTON */}
            <button className="mt-6 bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-2 rounded-md text-sm font-semibold shadow-lg hover:opacity-90">
              <a href="/cloud-hosting-calculator"> Open Pricing Calculator → </a>
            </button>

            <p className="text-xs text-gray-400 mt-4">
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
      <div className="max-w-5xl mx-auto mb-16">
        <span className="text-[10px] font-bold bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
          WHY DCC CLOUD
        </span>

        <h2 className="text-xl md:text-2xl font-semibold mt-4">The DCC Difference</h2>

        <p className="text-gray-500 text-sm mt-2 max-w-xl">
          We're not just a hosting provider — we're your long term technology partner.
        </p>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {[
            "SAP Gold Partner",
            "East Africa Focus",
            "Fully Managed",
            "Scales With You",
            "Dedicated Support",
            "Enterprise Security",
          ].map((item, i) => (
            <div key={i} className="bg-white border rounded-xl p-4 text-center shadow-sm hover:shadow-md transition">
              <div className="text-2xl mb-2">◆</div>
              <h4 className="text-sm font-semibold">{item}</h4>
              <p className="text-xs text-gray-500 mt-1">Enterprise-grade reliability and support.</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA BANNER */}
      <div className="max-w-5xl mx-auto">
        <div className="rounded-2xl text-center text-white py-10 px-6 bg-gradient-to-br from-[#1a0f2e] via-[#2a0f4f] to-[#0f0a1e] relative overflow-hidden">
          <div className="absolute inset-0 bg-pink-500/20 blur-3xl opacity-30"></div>

          <div className="relative z-10">
            <h3 className="text-lg font-semibold mb-2">Ready to Move Your Business to the Cloud?</h3>

            <p className="text-sm text-gray-300 mb-6">
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
      <div className="max-w-5xl mx-auto mb-20">
        {/* TAG */}
        <span className="text-[10px] font-semibold tracking-wide bg-[#efe7fb] text-[#7b2fbe] px-3 py-1 rounded-full">
          CLOUD OFFERINGS
        </span>

        {/* TITLE */}
        <h2 className="text-[20px] font-semibold mt-4 text-[#1a1030]">Everything Your Business Needs in the Cloud</h2>

        <p className="text-[#6b7280] text-[13px] mt-2 max-w-xl">
          From SAP hosting to fully configured private cloud — DCC Cloud delivers flexible, enterprise-ready solutions
          tailored to your industry.
        </p>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {[
            {
              title: "SAP Business One Cloud Hosting",
              tag: "SAP Certified",
            },
            {
              title: "SAP S/4HANA Public Cloud",
              tag: "Enterprise ERP",
              active: true,
            },
            {
              title: "Cloud Migration Services",
              tag: "Managed Migration",
            },
            {
              title: "Managed Hosting & Security",
              tag: "Always-On Security",
            },
            {
              title: "Hybrid Cloud Setup",
              tag: "Flexible Architecture",
            },
            {
              title: "Custom Private Cloud",
              tag: "Fully Configured",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`rounded-xl p-5 border ${
                item.active ? "border-[#e9d8ff] bg-[#fbf8ff]" : "border-[#e6e3eb] bg-white"
              } hover:shadow-md transition`}
            >
              {/* ICON */}
              <div className="w-9 h-9 rounded-lg bg-[#f3ecff] flex items-center justify-center mb-4 text-[#7b2fbe]">
                ◆◆
              </div>

              {/* TITLE */}
              <h3 className="text-[14px] font-semibold text-[#1a1030]">{item.title}</h3>

              {/* DESC */}
              <p className="text-[12px] text-[#6b7280] mt-2 leading-relaxed">
                Enterprise-grade solution tailored for your infrastructure needs.
              </p>

              {/* TAG */}
              <span className="inline-block mt-3 text-[10px] bg-[#efe7fb] text-[#7b2fbe] px-2 py-1 rounded-full">
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ================= INFRA ================= */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT */}
        <div>
          <span className="text-[10px] font-semibold tracking-wide bg-[#efe7fb] text-[#7b2fbe] px-3 py-1 rounded-full">
            INFRASTRUCTURE
          </span>

          <h2 className="text-[20px] font-semibold mt-4 text-[#1a1030]">
            World-Class Infrastructure, Locally Delivered
          </h2>

          <p className="text-[#6b7280] text-[13px] mt-3 mb-6 max-w-md">
            DCC Cloud runs on Iron Mountain's Tier 3 datacenter in Amsterdam, with full disaster recovery in Ashburn,
            Virginia.
          </p>

          {/* BULLETS */}
          <ul className="space-y-4 text-[13px]">
            {[
              "Tier 3 Iron Mountain datacenter — Amsterdam primary site",
              "Disaster recovery site in Ashburn, Virginia (USA)",
              "Multi-level failover — applications stay online",
              "Customised resource scaling — up or down",
              "End-to-end encryption and compliance-ready security",
            ].map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="w-5 h-5 bg-[#7b2fbe] text-white rounded-full flex items-center justify-center text-[10px] mt-[2px]">
                  ✓
                </span>
                <span className="text-[#4b5563]">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT DARK CARD */}
        <div className="rounded-2xl p-6 text-white bg-gradient-to-br from-[#120a22] via-[#1c0f3a] to-[#120a22] shadow-xl">
          <div className="grid grid-cols-2 gap-4">
            {[
              ["Primary Site", "Amsterdam"],
              ["DR Site", "Ashburn, VA"],
              ["Uptime SLA", "99.9", "⚡"],
              ["Datacenter", "Tier 3 / Iron Mountain"],
            ].map(([label, value, icon], i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                {icon && <p className="text-[20px] text-gray-400">{icon}</p>}
                <p className="text-[11px] text-gray-400">{label}</p>
                <p className="text-[15px] !text-white font-semibold mt-1">{value}</p>
              </div>
            ))}

            <div className="col-span-2 bg-white/5 border border-white/10 rounded-lg p-4 text-center">
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
      <section className="relative text-center px-6 py-28 overflow-hidden bg-gradient-to-b from-[#1a0f2e] via-[#120a22] to-[#0f0a1e]">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-purple-600/20 blur-3xl opacity-30"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-purple-400/30 bg-purple-500/10 text-purple-300 px-4 py-1 rounded-full text-xs mb-6">
            ● Enterprise-Grade Cloud · Tier 3 Datacenter
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Cloud Infrastructure <br />
            Built for{" "}
            <span className="bg-gradient-to-r from-[#7b2fbe] to-[#e040a0] bg-clip-text text-transparent">
              African Enterprise
            </span>
          </h1>

          {/* Description */}
          <p className="text-gray-400 mt-6 text-sm md:text-base max-w-xl mx-auto">
            Secure, scalable, and always-on cloud hosting from Double Click Consulting — powering SAP, ERP, and
            mission-critical workloads across East Africa.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => document.getElementById("request-quote")?.click()}
              className="bg-gradient-to-r from-[#7b2fbe] to-[#e040a0] text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-lg hover:opacity-90"
            >
              Request a Quote
            </button>

            <button
              onClick={() => {
                document.getElementById("offerings-section")?.scrollIntoView({ behavior: "smooth" })
              }}
              className="border border-white/20 text-white px-6 py-3 rounded-lg text-sm hover:bg-white/10 transition"
            >
              Explore Offerings ↓
            </button>
          </div>
        </div>
      </section>

      {/* ================= STATS BARS ================= */}
      <section className="bg-[#f6f5f8] py-12 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          {[
            { value: "99.9%", label: "Uptime Guarantee" },
            { value: "Tier 3", label: "Iron Mountain Datacenter" },
            { value: "2", label: "Geographic Redundancy Sites" },
            { value: "400+", label: "Projects Delivered" },
            { value: "24/7", label: "Managed Support" },
          ].map((item, i) => (
            <div key={i} className="relative text-center">
              {/* Gradient Bar */}
              <div className="h-10 font-bold text-white text-[2rem]  flex justify-center items-center w-full bg-gradient-to-r from-[#7b2fbe] to-[#e040a0] rounded-sm">
                {item.value}
              </div>

              {/* LABEL */}
              <p className="text-xs text-gray-500 mt-4">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
