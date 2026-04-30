import { useState, useEffect, useRef } from "react"
import { Helmet } from "react-helmet-async"

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    num: "01",
    title: "SAP Implementation Services",
    desc: "End-to-end SAP implementation tailored to your business needs, ensuring a smooth and efficient transition with minimal disruption.",
    icon: "⚙",
  },
  {
    num: "02",
    title: "SAP S/4HANA Migration",
    desc: "Upgrade your legacy systems to SAP S/4HANA with minimal disruption and maximum performance gains across your operations.",
    icon: "⬆",
  },
  {
    num: "03",
    title: "SAP Support & Maintenance",
    desc: "Reliable 24/7 support to keep your SAP systems running smoothly, efficiently, and continuously optimized.",
    icon: "⚡",
  },
  {
    num: "04",
    title: "SAP Business One Solutions",
    desc: "Ideal for SMEs — we implement SAP Business One to simplify operations and improve decision-making at every level.",
    icon: "◈",
  },
  {
    num: "05",
    title: "SAP Integration Services",
    desc: "Seamlessly integrate SAP with your existing systems for better data flow, unified reporting, and operational efficiency.",
    icon: "◎",
  },
  {
    num: "06",
    title: "DCC Logistics Suite NG",
    desc: "AI-powered logistics solutions including fleet management, freight forwarding, inland depot handling, warehouse management, live tracking, real-time profit insights, and intelligent decision making. ",
    icon: "◎",
  },
  {
    num: "07",
    title: "DCC Could Services",
    desc: "Enterprise-specific cloud integration services in your existing ERP system for accessibility, strong data security, low dependency on IT resources, affordable pricing and faster ROI conversions.",
    icon: "◎",
  },
]

const STATS = [
  { num: "450+", label: "Projects Delivered" },
  { num: "20+", label: "Countries Served" },
  { num: "24", label: "Support Available" },
  { num: "100%", label: "SAP Certified Team" },
]

const PILLARS = [
  { icon: "S", title: "SAP Certified Team", desc: "Fully accredited consultants with deep SAP expertise" },
  { icon: "A", title: "Africa-First Approach", desc: "Solutions built for African business realities" },
  { icon: "E", title: "End-to-End Delivery", desc: "From scoping to go-live and long-term support" },
  { icon: "R", title: "Proven Results", desc: "30–40% efficiency gains across our client base" },
]

const CASES = [
  {
    tag: "Manufacturing",
    metric: "−30%",
    title: "Operational Cost Reduction",
    desc: "A regional manufacturing company reduced operational costs by 30% through SAP implementation and intelligent process automation.",
  },
  {
    tag: "Retail",
    metric: "+40%",
    title: "Inventory & Efficiency Gains",
    desc: "A large retail business improved inventory management and increased overall operational efficiency by 40% post-SAP deployment.",
  },
  {
    tag: "Logistics",
    metric: "360°",
    title: "Unified Decision-Making",
    desc: "A logistics firm achieved streamlined reporting and enhanced decision-making through full SAP integration across all departments.",
  },
]

const WHY_ITEMS = [
  {
    title: "Certified SAP Experts",
    desc: (
      <>
        <strong>SAP Expert team</strong> with hands-on industry experience in the global market.
      </>
    ),
  },
  {
    title: "Deep African Market Knowledge",
    desc: (
      <>
        Customized SAP solutions based on <strong>Africa regional market analytics</strong> for faster business
        operations, data-driven.
      </>
    ),
  },
  {
    title: "End-to-End Under One Roof",
    desc: (
      <>
        <strong>Complete ERP solutions</strong> from installation, integration, configuration, logistics, CRM, analytics
        and after delivery customer support.
      </>
    ),
  },
  {
    title: "Fast, Efficient Deployment",
    desc: (
      <>
        Efficient SAP deployment with automated data migration tools, faster project strategies, minimal downtime and
        seamless integration with the existing ERP system.
      </>
    ),
  },
  {
    title: "Dedicated 24/7 Support Team",
    desc: (
      <>
        We have a dedicated support team with <strong>24/7 availability</strong>. We offer real-time issue resolutions
        and operational support.
      </>
    ),
  },
]

const COUNTRIES = [
  "Tanzania",
  "Kenya",
  "Rwanda",
  "Zambia",
  "DR Congo",
  "Uganda",
  "Ethiopia",
  "Nigeria",
  "Ghana",
  "South Africa",
  "+ More",
]

function useInView(options = {}) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, ...options }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return [ref, isInView]
}
function useCountUp(target, active) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    const n = parseInt(target.replace(/\D/g, ""))
    if (!n) return
    let cur = 0
    const step = n / 60
    const t = setInterval(() => {
      cur = Math.min(cur + step, n)
      setVal(Math.floor(cur))
      if (cur >= n) clearInterval(t)
    }, 16)
    return () => clearInterval(t)
  }, [active])
  const pre = target.match(/^[^\d]*/)?.[0] ?? ""
  const suf = target.match(/[^\d]*$/)?.[0] ?? ""
  return `${pre}${val}${suf}`
}

// ─── Modern Corporate Styles ───────────────────────────────────────────────

const styles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeInLeft {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  .animate-fade-up { animation: fadeInUp 0.7s ease-out forwards; }
  .animate-fade-left { animation: fadeInLeft 0.7s ease-out forwards; }
  .animate-fade-right { animation: fadeInRight 0.7s ease-out forwards; }
  .animate-scale { animation: scaleIn 0.5s ease-out forwards; }
  .stagger-1 { animation-delay: 0.1s; }
  .stagger-2 { animation-delay: 0.2s; }
  .stagger-3 { animation-delay: 0.3s; }
  .stagger-4 { animation-delay: 0.4s; }
  .stagger-5 { animation-delay: 0.5s; }
`

// ─── Components ──────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <p className="text-xs font-bold tracking-widest uppercase text-[#d9145b] mb-3 flex items-center gap-3">
      <span className="w-8 h-px bg-[#d9145b]" />
      {children}
    </p>
  )
}

function SectionTitle({ children }) {
  return <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">{children}</h2>
}

function PrimaryBtn({ children, href = "#contact" }) {
  return (
    <a
      href={href}
      className="inline-block bg-[#d9145b] hover:bg-[#c2114f] text-white font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#d9145b]/30 hover:-translate-y-1"
    >
      {children}
    </a>
  )
}

function OutlineBtn({ children, href = "#contact" }) {
  return (
    <a
      href={href}
      className="inline-block border-2 border-slate-200 hover:border-[#d9145b] text-slate-600 hover:text-[#d9145b] font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-full transition-all duration-300"
    >
      {children}
    </a>
  )
}

function Hero() {
  const [ref, isInView] = useInView()

  return (
    <section id="home" className="relative min-h-screen  pt-2 flex items-center bg-white overflow-hidden">
      {/* Elegant Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -z-10 rounded-l-[100px]" />
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#d9145b]/5 rounded-full blur-3xl" />

      <div ref={ref} className="relative z-10 w-full px-8 md:px-16 lg:px-24 py-20 !pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className={`max-w-2xl ${isInView ? "animate-fade-left" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 bg-[#d9145b]/10 text-[#d9145b] text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-[#d9145b] rounded-full" />
              SAP Gold Partner - Africa
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-8">
              Transform Digital <span className="text-[#d9145b]">ERP </span>landscape for Africa
              {/* <span className="text-[#d9145b]">Digital</span> <br />
              Enterprise Success */}
            </h1>

            {/* <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-lg">
              Empowering African businesses with high-performance SAP solutions tailored for growth, efficiency, and
              regional scalability.
            </p> */}
            <div className="mb-10 max-w-lg">
              <ul className="space-y-2 text-slate-600 text-[15px] !pl-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-gradient-to-r from-[#7B2FBE] to-[#E040A0] text-white rounded-full flex items-center justify-center text-[10px] mt-[2px]">
                    ✓
                  </span>
                  <span>Enterprise Ready SAP Consulting & Services in Africa</span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-gradient-to-r from-[#7B2FBE] to-[#E040A0] text-white rounded-full flex items-center justify-center text-[10px] mt-[2px]">
                    ✓
                  </span>
                  <span>
                    Customized ERP solutions like{" "}
                    <strong className="!text-black !font-bold">SAP Business One, SAP S/4HANA </strong> & more
                  </span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-gradient-to-r from-[#7B2FBE] to-[#E040A0] text-white rounded-full flex items-center justify-center text-[10px] mt-[2px]">
                    ✓
                  </span>

                  <span>
                    <strong className="!text-black !font-bold">DCC SAP Cloud </strong> Integration & Services
                  </span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-gradient-to-r from-[#7B2FBE] to-[#E040A0] text-white rounded-full flex items-center justify-center text-[10px] mt-[2px]">
                    ✓
                  </span>
                  <span>
                    AI-Powered <strong className="!text-black !font-bold">Logistics Management Solutions</strong>
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-4">
              {/* <PrimaryBtn>Book Consultation</PrimaryBtn> */}
              <a
                onClick={() => document.getElementById("book-consultation-id")?.click()}
                href="#"
                className="inline-block bg-[#d9145b] hover:bg-[#b01149] text-white font-bold tracking-widest uppercase px-10 py-5 rounded-xl text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#d9145b]/25"
              >
                Book Consultation
              </a>
              <OutlineBtn href="#services">Learn More</OutlineBtn>
            </div>
          </div>

          <div className={`relative ${isInView ? "animate-fade-right" : "opacity-0"}`}>
            <div className="grid grid-cols-2 gap-6">
              {STATS.map((s, i) => {
                const val = useCountUp(s.num, isInView)
                return (
                  <div
                    key={i}
                    className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 text-center animate-scale"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="text-4xl font-black text-[#d9145b] mb-2">
                      {val} {s.num == "24" ? "/7" : ""}
                    </div>
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">{s.label}</div>
                  </div>
                )
              })}
              <div
                className="col-span-2 bg-[#d9145b] p-8 rounded-3xl shadow-2xl shadow-[#d9145b]/20 text-center text-white animate-scale"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="text-xl font-bold mb-1">The Most Trusted SAP Agency</div>
                <div className="text-white/70 text-sm">Serving the Heart of African Commerce</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  const [ref, isInView] = useInView()

  return (
    <section
      ref={ref}
      id="about"
      className="bg-gradient-to-b from-slate-50 to-white py-16 px-8 md:px-16 flex flex-col items-center lg:px-24"
    >
      <div className="inline-flex items-center gap-2 bg-[#d9145b]/10 text-[#d9145b] text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
        <span className="w-2 h-2 bg-[#d9145b] rounded-full" />
        About Us
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
        <div className={isInView ? "animate-fade-in-left" : "opacity-0"}>
          {/* <SectionLabel>About Us</SectionLabel> */}
          <SectionTitle>
            Your Trusted
            <span className="text-[#d9145b]"> SAP Partner</span>
            <br />
            in Africa
          </SectionTitle>
          <p className="text-slate-600 leading-relaxed mb-6 text-lg">
            We are a leading SAP agency in Africa, helping businesses streamline operations, improve efficiency, and
            scale with confidence. Our team of certified SAP consultants delivers tailored solutions across industries.
          </p>
          <p className="text-slate-500 leading-relaxed">
            From small enterprises to large organizations, we provide strategic SAP services designed to meet the unique
            challenges of the African market.
          </p>

          {/* Decorative SAP logo */}
          <div className="mt-8 flex items-center gap-4">
            <div className="w-16 h-16 bg-[#d9145b]  rounded-xl flex items-center justify-center animate-pulse-glow">
              <span className="text-white  font-black text-lg">SAP</span>
            </div>
            <div>
              <div className="font-bold text-[#0A1F44]">Certified Partner</div>
              <div className="text-sm text-slate-500">Gold Partner Status</div>
            </div>
          </div>
        </div>

        <div className={`grid gap-4 ${isInView ? "animate-fade-in-right" : "opacity-0"}`}>
          {PILLARS.map((p, i) => (
            <div
              key={p.title}
              className="group flex items-start gap-4 p-5 bg-white rounded-xl border border-slate-100 hover:border-[#d9145b]/30 hover:shadow-lg hover:shadow-[#d9145b]/5 transition-all duration-300 hover:-translate-x-1"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-[#d9145b] rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg">
                {p.icon}
              </div>
              <div>
                <strong className="block font-semibold text-[#0A1F44] mb-1">{p.title}</strong>
                <span className="text-sm text-slate-500">{p.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Services() {
  const [ref, isInView] = useInView()

  return (
    <section
      ref={ref}
      id="services"
      className=" py-16 px-8 md:px-16 flex flex-col items-center lg:px-24 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="inline-flex items-center gap-2 bg-[#d9145b]/10 text-[#d9145b] text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
        <span className="w-2 h-2 bg-[#d9145b] rounded-full" />
        What We Do
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#d9145b]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className={isInView ? "animate-fade-in-up" : "opacity-0"}>
          {/* <SectionLabel>What We Do</SectionLabel> */}
          <SectionTitle light>
            Our SAP <span className="text-[#d9145b]">Services</span>
          </SectionTitle>
          <p className="text-white/60 max-w-xl leading-relaxed mb-12">
            Comprehensive SAP consulting services tailored to African businesses — from first implementation to
            continuous optimization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <div
              key={s.num}
              className={`group bg-white/8 border shadow-xl border-white/10 rounded-xl p-8 hover:border-[#d9145b]/30 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#d9145b]/10 relative overflow-hidden ${isInView ? "animate-scale-in" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "forwards" }}
            >
              <div className="absolute top-0 left-0 w-1 h-0 bg-[#d9145b] group-hover:h-full transition-all duration-500" />
              <div className="text-6xl font-black text-[#d9145b] leading-none mb-4 group-hover:text-[#d9145b]/20 transition-colors duration-300">
                {s.num}
              </div>
              {/* <div className="text-2xl mb-4 opacity-50 group-hover:opacity-100 transition-opacity">{s.icon}</div> */}
              <h3 className="text-lg font-semibold text-black mb-3">{s.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
            </div>
          ))}

          {/* CTA card */}
          <div
            className={`bg-[#d9145b]/10 border border-[#d9145b]/30 rounded-xl p-8 flex flex-col justify-center ${isInView ? "animate-scale-in" : "opacity-0"}`}
            style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
          >
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-lg font-semibold text-black mb-3">Need a Custom Solution?</h3>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Every business is unique. Talk to our experts for a tailored SAP solution.
            </p>
            <a
              href="#contact"
              className="inline-block bg-[#d9145b] hover:bg-[#b01149] text-white font-semibold text-xs tracking-widest uppercase px-6 py-3 rounded-lg transition-all duration-300 hover:-translate-y-0.5 text-center"
            >
              Talk to an Expert
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Coverage() {
  const [ref, isInView] = useInView()

  return (
    <section
      ref={ref}
      id="coverage"
      className="bg-gradient-to-br from-[#ffffff] to-[#e8e2e4] py-16 flex flex-col items-center px-8 md:px-16 lg:px-24"
    >
      <div className="inline-flex items-center gap-2 bg-[#d9145b]/10 text-[#d9145b] text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
        <span className="w-2 h-2 bg-[#d9145b] rounded-full" />
        Our Reach
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className={isInView ? "animate-fade-in-left" : "opacity-0"}>
          {/* <SectionLabel>Our Reach</SectionLabel> */}
          <SectionTitle light>
            Serving Businesses
            <br />
            <span className="text-[#d9145b]">Across Africa</span>
          </SectionTitle>
          <p className="text-white/60 leading-relaxed mb-8">
            Our SAP consulting services are available across key African markets. We understand regional business
            challenges and deliver localized solutions.
          </p>
          <div className="flex flex-wrap gap-2">
            {COUNTRIES.map((c, i) => (
              <span
                key={c}
                className="bg-[#d9145b]/10 border border-[#d9145b]/25 text-[#ff6b9d] px-4 py-2 rounded-lg text-xs font-medium tracking-wide hover:bg-[#d9145b]/20 hover:border-[#d9145b]/40 transition-all duration-300 cursor-default"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* SVG Map */}
        <div className={`flex justify-center ${isInView ? "animate-fade-in-right" : "opacity-0"}`}>
          <svg viewBox="0 0 400 450" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-md">
            {/* Africa silhouette */}
            <path
              d="M200,20 L280,50 L320,120 L340,200 L330,280 L300,350 L250,400 L200,430 L150,400 L100,350 L70,280 L60,200 L80,120 L120,50 L200,20 Z"
              fill="rgba(217, 20, 91, 0.05)"
              stroke="rgba(217, 20, 91, 0.2)"
              strokeWidth="2"
              className="animate-pulse"
              style={{ animationDuration: "4s" }}
            />

            {/* Connection lines */}
            <g stroke="rgba(217, 20, 91, 0.3)" strokeWidth="1" fill="none">
              <path d="M200,100 Q250,150 250,200" strokeDasharray="4,4" className="animate-pulse" />
              <path
                d="M200,100 Q150,200 180,280"
                strokeDasharray="4,4"
                className="animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
              <path
                d="M250,200 Q200,250 200,300"
                strokeDasharray="4,4"
                className="animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </g>

            {/* City dots */}
            {[
              { cx: 200, cy: 100, label: "Kenya" },
              { cx: 200, cy: 150, label: "Tanzania" },
              { cx: 180, cy: 120, label: "Uganda" },
              { cx: 220, cy: 80, label: "Ethiopia" },
              { cx: 120, cy: 200, label: "Nigeria" },
              { cx: 100, cy: 220, label: "Ghana" },
              { cx: 200, cy: 350, label: "S. Africa" },
              { cx: 200, cy: 180, label: "Zambia" },
              { cx: 180, cy: 200, label: "DR Congo" },
              { cx: 200, cy: 130, label: "Rwanda" },
            ].map((dot, i) => (
              <g key={dot.label} style={{ animationDelay: `${i * 0.2}s` }}>
                <circle cx={dot.cx} cy={dot.cy} r="6" fill="#d9145b" className="animate-pulse" />
                <circle
                  cx={dot.cx}
                  cy={dot.cy}
                  r="12"
                  fill="none"
                  stroke="#d9145b"
                  strokeWidth="1"
                  opacity="0.3"
                  className="animate-ping"
                  style={{ animationDuration: "2s" }}
                />
                <text
                  x={dot.cx}
                  y={dot.cy - 15}
                  fill="rgb(0,0,0)"
                  fontSize="10"
                  textAnchor="middle"
                  fontFamily="sans-serif"
                >
                  {dot.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  )
}

function CaseStudies() {
  const [ref, isInView] = useInView()

  return (
    <section
      ref={ref}
      id="cases"
      className="bg-gradient-to-b from-white flex flex-col items-center to-slate-50 py-16 px-8 md:px-16 lg:px-24"
    >
      <div className="inline-flex items-center gap-2 bg-[#d9145b]/10 text-[#d9145b] text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
        <span className="w-2 h-2 bg-[#d9145b] rounded-full" />
        Proven Results
      </div>
      <div className="max-w-7xl mx-auto">
        <div className={isInView ? "animate-fade-in-up" : "opacity-0"}>
          {/* <SectionLabel>Proven Results</SectionLabel> */}
          <SectionTitle>
            Real Impact with <span className="text-[#0A1F44]">SAP</span>
          </SectionTitle>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {CASES.map((c, i) => (
            <div
              key={c.title}
              className={`group bg-white rounded-2xl p-8 border border-slate-100 hover:border-[#d9145b]/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#d9145b]/10 ${isInView ? "animate-scale-in" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.15}s`, animationFillMode: "forwards" }}
            >
              <span className="inline-block bg-[#d9145b]/10 text-[#d9145b] text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-6 border border-[#d9145b]/20">
                {c.tag}
              </span>
              <div className="text-6xl font-black text-[#d9145b] leading-none mb-4 group-hover:scale-105 transition-transform duration-300">
                {c.metric}
              </div>
              <h3 className="text-lg font-semibold text-[#0A1F44] mb-4 pb-4 border-b border-slate-100">{c.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyUs() {
  const [ref, isInView] = useInView()

  return (
    <section ref={ref} className="bg-white py-16 flex flex-col items-center px-8 md:px-16 lg:px-24">
      <div className="inline-flex items-center gap-2 bg-[#d9145b]/10 text-[#d9145b] text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
        <span className="w-2 h-2 bg-[#d9145b] rounded-full" />
        Why Choose Us
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Badge */}
        <div className={`order-2 lg:order-1 ${isInView ? "animate-fade-in-left" : "opacity-0"}`}>
          <div className="bg-white shadow-xl rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#d9145b] to-transparent" />
            </div>
            <div className="relative z-10">
              <span className="font-black text-8xl text-[#d9145b]/20 block leading-none">SAP</span>
              <span className="text-3xl font-bold text-black block mt-4 mb-2">Certified Partner</span>
              <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-xs mx-auto">
                Trusted by organizations across 10+ African countries to deliver transformative solutions.
              </p>
              <PrimaryBtn>Get Started Today</PrimaryBtn>
            </div>
          </div>
        </div>

        {/* List */}
        <div className={`order-1 lg:order-2 ${isInView ? "animate-fade-in-right" : "opacity-0"}`}>
          {/* <SectionLabel>Why Choose Us</SectionLabel> */}
          <SectionTitle>
            Why Our <span className="text-[#0A1F44]">SAP Agency</span>
          </SectionTitle>
          <ul className="grid gap-4 list-none lg:pl-5 !pl-0">
            {WHY_ITEMS.map((w, i) => (
              <li
                key={w.title}
                className="flex items-start gap-4 p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-[#d9145b]/30 hover:shadow-lg hover:shadow-[#d9145b]/5 transition-all duration-300 group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-10 h-10 bg-[#d9145b] rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  ✓
                </div>
                <div>
                  <strong className="block font-semibold text-[#0A1F44] mb-1">{w.title}</strong>
                  <span className="text-sm text-slate-500">{w.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  const [ref, isInView] = useInView()

  return (
    <section
      ref={ref}
      id="contact"
      className="relative overflow-hidden py-20 px-8 bg-gradient-to-br from-[#bcc3f9] via-blue-50 to-[#f9b5ce]"
      //   style={{
      //     background: "linear-gradient(135deg, #0A1F44 0%, #1E3A6E 50%, #0A1F44 100%)",
      //   }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute w-full h-full animate-gradient"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 50%, rgba(217, 20, 91, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 70% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className={`relative z-10 max-w-4xl mx-auto text-center ${isInView ? "animate-fade-in-up" : "opacity-0"}`}>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black leading-tight mb-8">
          Ready to Transform Your Business with
          <span className=" text-[#d9145b] ml-2 mt-2">SAP?</span>
        </h2>
        <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          Partner with our SAP experts to streamline your operations, reduce costs, and scale your business across
          Africa.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            onClick={() => document.getElementById("book-consultation-id")?.click()}
            href="#"
            className="inline-block bg-[#d9145b] hover:bg-[#b01149] text-white font-bold tracking-widest uppercase px-10 py-5 rounded-xl text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#d9145b]/25"
          >
            Book Free Consultation
          </a>
          <a
            href="/contact"
            className="inline-block border-2 border-gray-500 hover:border-[#d9145b] text-black hover:text-[#d9145b] font-bold tracking-widest uppercase px-10 py-5 rounded-xl text-sm transition-all duration-300 backdrop-blur-sm"
          >
            Contact Us Now
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Root Component ───────────────────────────────────────────────────────────

export default function SAPAfricaWebsite() {
  return (
    <>
      <Helmet>
        <title>SAP Services in South Africa | Trusted SAP Consulting Experts - DoubleClick Consulting</title>
        <meta
          name={"SAP Services in South Africa | Trusted SAP Consulting Experts"}
          content={`This page is SAP Services in South Africa | Trusted SAP Consulting Experts page of Double click cunsulting.`}
        />
        <meta
          name="keywords"
          content="SAP agency in South Africa, SAP partners in Africa, SAP business Africa, best SAP agency in South Africa, top SAP partners in Africa,Contact DoubleClick, IT consulting, digital solutions, support, DoubleClick contact"
        />
        <link rel="canonical" href="https://doubleclick.co.tz/en-za/sap-africa" />
        <meta
          property="og:title"
          content={`SAP Services in South Africa | Trusted SAP Consulting Experts | DoubleClick Consulting`}
        />
        <meta
          property="og:description"
          content={
            "Get reliable SAP services in South Africa. We provide SAP consulting, implementation & support for businesses in Johannesburg, kenaya, Cape Town & across SA. Connect us Today!"
          }
        />
        <meta name="title" content={`SAP Services in South Africa | Trusted SAP Consulting Experts`} />
        <meta
          name="description"
          content={
            "Get reliable SAP services in South Africa. We provide SAP consulting, implementation & support for businesses in Johannesburg, kenaya, Cape Town & across SA. Connect us Today!"
          }
        />
      </Helmet>

      <div className="min-h-screen font-sans antialiased ">
        <style>{styles}</style>
        <Hero />
        <About />
        <Services />
        <Coverage />
        <CaseStudies />
        <WhyUs />
        <FinalCTA />
      </div>
    </>
  )
}
