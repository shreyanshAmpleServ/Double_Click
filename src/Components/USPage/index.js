import { useState, useEffect, useRef } from "react"
import { Helmet } from "react-helmet-async"

// ─── Data (Tailored for US Market) ───────────────────────────────────────────

const SERVICES = [
  {
    num: "01",
    title: "Cloud ERP Transformation",
    desc: "Accelerating the move to SAP S/4HANA Cloud to drive real-time agility and operational excellence for US enterprises.",
    icon: "☁️",
  },
  {
    num: "02",
    title: "Strategic SAP Advisory",
    desc: "C-suite level consulting to align your SAP roadmap with long-term business goals and digital transformation KPIs.",
    icon: "📊",
  },
  {
    num: "03",
    title: "Managed Services & Optimization",
    desc: "High-velocity support and continuous improvement cycles to ensure maximum ROI from your SAP ecosystem.",
    icon: "⚡",
  },
  {
    num: "04",
    title: "Compliance & Regulatory Alignment",
    desc: "Expert guidance on GAAP, SOC2, and industry-specific compliance integration within your SAP environment.",
    icon: "🛡️",
  },
  {
    num: "05",
    title: "AI-Driven SAP Integration",
    desc: "Implementing SAP BTP and AI layers to automate workflows and generate predictive business insights.",
    icon: "🤖",
  },
]

const STATS = [
  { num: "$2B+", label: "Capital Managed" },
  { num: "200+", label: "Fortune 500 Clients" },
  { num: "99.9%", label: "SLA Uptime" },
  { num: "15+", label: "Industry Verticals" },
]

const VALUE_PROPS = [
  {
    icon: "🎯",
    title: "Precision Deployment",
    desc: "Zero-defect implementation methodology designed for high-stakes environments.",
  },
  {
    icon: "🚀",
    title: "Rapid Time-to-Value",
    desc: "Accelerated go-live cycles that realize business benefits in weeks, not years.",
  },
  {
    icon: "🌐",
    title: "Global Scalability",
    desc: "Architecting systems that support multi-national growth and complex supply chains.",
  },
  {
    icon: "💎",
    title: "Elite Certification",
    desc: "Our consultants hold the highest tier of SAP global certifications.",
  },
]

const US_CASES = [
  {
    tag: "Healthcare",
    metric: "40% ↓",
    title: "Administrative Overhead Reduction",
    desc: "A New York-based healthcare network optimized patient billing and resource allocation via SAP S/4HANA.",
  },
  {
    tag: "FinTech",
    metric: "2.5x",
    title: "Reporting Speed Increase",
    desc: "A Silicon Valley FinTech firm achieved near-instant financial closing using automated SAP consolidation.",
  },
  {
    tag: "Manufacturing",
    metric: "15% ↑",
    title: "Supply Chain Throughput",
    desc: "A Midwest automotive supplier reduced lead times by 15% through intelligent SAP IBP integration.",
  },
]

const US_HUBS = [
  "New York City",
  "Silicon Valley",
  "Chicago",
  "Austin",
  "Atlanta",
  "Seattle",
  "Houston",
  "Boston",
  "Miami",
  "Washington D.C.",
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

const styles = `
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes fadeInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
  .animate-fade-up { animation: fadeInUp 0.7s ease-out forwards; }
  .animate-fade-left { animation: fadeInLeft 0.7s ease-out forwards; }
  .animate-fade-right { animation: fadeInRight 0.7s ease-out forwards; }
  .animate-scale { animation: scaleIn 0.5s ease-out forwards; }
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

function SectionTitle({ children, center = false }) {
  return (
    <h2 className={`text-4xl md:text-6xl font-bold text-slate-900 leading-tight mb-6 ${center ? "text-center" : ""}`}>
      {children}
    </h2>
  )
}

function PrimaryBtn({ children, href = "/contact" }) {
  return (
    <a
      href={href}
      className="inline-block bg-[#d9145b] hover:bg-[#c2114f] text-white font-bold text-sm tracking-widest uppercase px-10 py-4 rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-[#d9145b]/40 hover:-translate-y-1"
    >
      {children}
    </a>
  )
}

function Hero() {
  const [ref, isInView] = useInView()

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -z-10 rounded-l-[120px]" />
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#d9145b]/5 rounded-full blur-3xl" />

      <div ref={ref} className="relative z-10 w-full px-8 md:px-16 lg:px-24 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className={`max-w-2xl ${isInView ? "animate-fade-left" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 bg-[#d9145b]/10 text-[#d9145b] text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-[#d9145b] rounded-full" />
              US Enterprise Certified
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[1.05] mb-8">
              {/* Next-Gen <span className="text-[#d9145b]">SAP</span> <br />
              Transformation. */}
              <span className="text-[#d9145b]">SAP</span> ERP, Cloud Solutions - Powering US Businesses
            </h1>

            <p className="text-slate-500 text-lg leading-normal mb-4 max-w-lg font-light">
              A premier SAP agency in the USA, Double Click Consulting offers end-to-end SAP ERP solutions from{" "}
              <strong className="!text-black !font-bold">
                Planning → Implementation → Integration → Analytics → Optimization → Support.
              </strong>
            </p>
            <p className="text-slate-500 text-base leading-relaxed mb-10 max-w-lg font-light">
              20+ years of transforming digital landscapes for US Fortune 500 companies through cloud-first SAP
              strategies and faster deployment.
            </p>
            {/* <p className="text-slate-500 text-xl leading-relaxed mb-10 max-w-lg font-light">
              Accelerating digital maturity for US Fortune 500 companies through cloud-first SAP strategies and
              high-velocity deployment.
            </p> */}

            <div className="flex flex-wrap gap-5">
              {/* <PrimaryBtn>Request Executive Brief</PrimaryBtn> */}
              <a
                href={"#"}
                onClick={() => document.getElementById("book-consultation-id")?.click()}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#d9145b",
                  color: "#fff",
                  fontFamily: "Outfit,sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  padding: "16px 32px",
                  borderRadius: 999,
                  textDecoration: "none",
                  transition: "all .3s",
                  border: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#9b0d3f"
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.style.boxShadow = "0 16px 40px rgba(217,20,91,.35)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#d9145b"
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                Request Executive Brief <span>→</span>
              </a>
              <div className="flex items-center gap-3 text-slate-400 text-sm font-medium">
                <span className="w-12 h-px bg-slate-200" />
                Strategic SAP Partner
              </div>
            </div>
          </div>

          <div className={`relative ${isInView ? "animate-fade-right" : "opacity-0"}`}>
            <div className="grid grid-cols-2 gap-6">
              {STATS.map((s, i) => (
                <div
                  key={i}
                  className="bg-white p-10 rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-50 text-center animate-scale"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="text-5xl font-black text-[#d9145b] mb-2">{s.num}</div>
                  <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
              <div
                className="col-span-2 bg-[#d9145b] p-10 rounded-[40px] shadow-2xl shadow-[#d9145b]/30 text-center text-white animate-scale"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="text-2xl font-bold mb-2">Enterprise Grade Reliability</div>
                <div className="text-white/70 text-sm tracking-wide">Architecting the Future of US Industry</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustBar() {
  return (
    <div className="py-12 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-8">
        <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10">
          Trusted by Industry Leaders
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale">
          {["FORTUNE 500", "GLOBAL 2000", "S&P 500", "SaaS Leaders", "HealthTech"].map((logo) => (
            <span key={logo} className="text-xl font-black text-slate-700 tracking-tighter">
              {logo}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function Services() {
  const [ref, isInView] = useInView()

  return (
    <section ref={ref} id="services" className="py-24 px-8 md:px-16 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-20 ${isInView ? "animate-fade-up" : "opacity-0"}`}>
          <SectionLabel>Strategic Offerings</SectionLabel>
          <SectionTitle center>
            Enterprise <span className="text-[#d9145b]">Capability</span>
          </SectionTitle>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-light">
            Precision-engineered SAP services designed to reduce technical debt and accelerate business value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className={`p-10 rounded-[32px] bg-slate-50 hover:bg-white hover:shadow-2xl hover:shadow-slate-600 transition-all duration-500 group ${isInView ? "animate-scale" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "forwards" }}
            >
              <div className="text-4xl mb-6 p-4 bg-white rounded-2xl w-fit shadow-sm group-hover:scale-110 transition-transform">
                {s.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{s.title}</h3>
              <p className="text-slate-500 leading-relaxed mb-8">{s.desc}</p>
              {/* <div className="text-[#d9145b] font-bold text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer group-hover:gap-4 transition-all">
                View Framework <span className="text-lg">→</span>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ValueSection() {
  const [ref, isInView] = useInView()

  return (
    <section ref={ref} className="py-24 px-8 md:px-16 lg:px-24 bg-slate-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className={isInView ? "animate-fade-left" : "opacity-0"}>
          <SectionLabel>The US Edge</SectionLabel>
          <SectionTitle>
            Why Leading <span className="text-[#d9145b]">Corporations</span> Partner With Us
          </SectionTitle>
          <p className="text-slate-500 text-lg mb-10 leading-relaxed">
            In the US market, speed is a competitive advantage. We combine deep technical expertise with a lean delivery
            model to ensure your transformation is seamless.
          </p>
          <PrimaryBtn>Schedule a Discovery Call</PrimaryBtn>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${isInView ? "animate-fade-right" : "opacity-0"}`}>
          {VALUE_PROPS.map((v, i) => (
            <div
              key={i}
              className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:border-[#d9145b]/30 transition-all"
            >
              <div className="text-3xl mb-4">{v.icon}</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">{v.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function USCoverage() {
  const [ref, isInView] = useInView()

  return (
    <section ref={ref} className="py-24 px-8 md:px-16 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 ${isInView ? "animate-fade-up" : "opacity-0"}`}>
          <SectionLabel>Geographic Presence</SectionLabel>
          <SectionTitle center>
            US <span className="text-[#d9145b]">Strategic Hubs</span>
          </SectionTitle>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {US_HUBS.map((hub) => (
            <span
              key={hub}
              className="bg-slate-50 border border-slate-100 text-slate-600 px-6 py-3 rounded-full text-sm font-medium hover:border-[#d9145b] hover:text-[#d9145b] transition-all cursor-default"
            >
              {hub}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function CaseStudies() {
  const [ref, isInView] = useInView()

  return (
    <section ref={ref} className="py-24 px-8 md:px-16 lg:px-24 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 ${isInView ? "animate-fade-up" : "opacity-0"}`}>
          <SectionLabel>Case Studies</SectionLabel>
          <SectionTitle center>
            Enterprise <span className="text-[#d9145b]">Outcomes</span>
          </SectionTitle>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {US_CASES.map((c, i) => (
            <div
              key={i}
              className={`p-10 rounded-[32px] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:border-[#d9145b]/30 transition-all ${isInView ? "animate-scale" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "forwards" }}
            >
              <span className="text-[#d9145b] text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-[#d9145b]/10 rounded-full">
                {c.tag}
              </span>
              <div className="text-6xl font-black text-slate-900 my-6">{c.metric}</div>
              <h3 className="text-xl font-bold mb-3">{c.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
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
      className="py-32 px-8 bg-gradient-to-br from-[#bcc3f9] via-blue-50 to-[#f9b5ce] relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_center,_#d9145b_0%,_transparent_70%)]" />
      </div>
      <div className={`relative z-10 max-w-4xl mx-auto text-center ${isInView ? "animate-fade-up" : "opacity-0"}`}>
        <h2 className="text-5xl md:text-7xl font-black text-black leading-tight mb-8">
          Elevate Your <br />
          <span className="text-[#d9145b]">Digital Core.</span>
        </h2>
        <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto font-light">
          Ready to modernize your SAP landscape and outpace the competition? Let's architect your future today.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          {/* <PrimaryBtn>Request Executive Consultation</PrimaryBtn> */}
          <a
            href={"#"}
            onClick={() => document.getElementById("book-consultation-id")?.click()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#d9145b",
              color: "#fff",
              fontFamily: "Outfit,sans-serif",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              padding: "16px 32px",
              borderRadius: 999,
              textDecoration: "none",
              transition: "all .3s",
              border: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#9b0d3f"
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow = "0 16px 40px rgba(217,20,91,.35)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#d9145b"
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
            Request Executive Consultation <span>→</span>
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center border-2 border-white/40 text-white font-bold px-10 py-4 rounded-full hover:bg-white  hover:!text-slate-800 transition-all"
          >
            Contact US Office
          </a>
        </div>
      </div>
    </section>
  )
}

export default function USSAPWebsite() {
  return (
    <>
      <Helmet>
        <title>SAP Services in USA | Expert SAP Consulting & Cost-Effective Solutions.</title>

        <meta name="title" content="SAP Services in the USA | Expert SAP Consulting & Cost-Effective Solutions." />
        <meta
          name="description"
          content="Looking for SAP services in the USA? We provide expert SAP consulting, implementation, migration, and support for businesses across New York, California, and beyond. Delivering scalable, high-performance SAP solutions."
        />

        <meta
          name="keywords"
          content="SAP company in USA, SAP solutions company USA, SAP ERP services USA, SAP agency in USA, SAP partners in USA, SAP consulting USA, SAP implementation USA"
        />

        <link rel="canonical" href="https://doubleclick.co.tz/en-us/sap-services-usa" />

        {/* Open Graph */}
        <meta property="og:title" content="SAP Services in the USA | Expert SAP Consulting" />
        <meta
          property="og:description"
          content="Expert SAP consulting, implementation, and support services across the USA. Trusted SAP partner for scalable enterprise solutions."
        />
      </Helmet>

      <div className="min-h-screen font-sans antialiased text-slate-900 bg-white">
        <style>{styles}</style>
        <Hero />
        <TrustBar />
        <Services />
        <ValueSection />
        <USCoverage />
        <CaseStudies />
        <FinalCTA />
      </div>
    </>
  )
}
