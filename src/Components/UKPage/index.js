import { useState, useEffect, useRef } from "react"
import { Helmet } from "react-helmet-async"

/* ─── UK DATA ─────────────────────────────────────────────────────────────── */

const STATS = [
  { num: "$2B+", label: "Capital Managed" },
  { num: "200+", label: "Fortune 500 Clients" },
  { num: "24", label: "UK Support Desk" },
  { num: "100%", label: "SAP Certified Team" },
]

const SERVICES = [
  {
    num: "01",
    title: "SAP S/4HANA Implementation",
    desc: "Full-lifecycle SAP deployments built around UK enterprise requirements, ensuring HMRC compliance and zero operational disruption.",
    tag: "Enterprise",
  },
  {
    num: "02",
    title: "SAP Finance & FICO",
    desc: "Finance and controlling solutions fully aligned with UK GAAP, Making Tax Digital, and HMRC real-time reporting mandates.",
    tag: "Finance",
  },
  {
    num: "03",
    title: "SAP Human Capital Management",
    desc: "UK-compliant payroll and HR managing PAYE, auto-enrolment pensions, IR35 contractor obligations and benefits.",
    tag: "HR & Payroll",
  },
  {
    num: "04",
    title: "SAP Supply Chain",
    desc: "End-to-end procurement, warehouse, and logistics optimisation across UK and post-Brexit European supply routes.",
    tag: "Logistics",
  },
  {
    num: "05",
    title: "SAP Business Intelligence",
    desc: "Real-time BI and executive dashboards engineered for boardroom insight and regulatory disclosure requirements.",
    tag: "Analytics",
  },
]

const PILLARS = [
  {
    icon: "✦",
    title: "SAP-Certified Consultants",
    desc: "Fully accredited specialists with hands-on UK enterprise deployment credentials",
  },
  {
    icon: "⬡",
    title: "UK Regulatory Mastery",
    desc: "Deep knowledge of HMRC, GDPR, IR35, MTD, and post-Brexit compliance frameworks",
  },
  {
    icon: "◈",
    title: "End-to-End Partnership",
    desc: "Strategy through go-live to long-term optimisation — one partner, no gaps",
  },
  {
    icon: "◎",
    title: "Measurable ROI",
    desc: "35–45% efficiency improvements consistently delivered across UK client base",
  },
]

const CASES = [
  {
    tag: "Financial Services",
    metric: "−38%",
    title: "Operational Cost Reduction",
    city: "London",
    desc: "A City of London asset manager reduced operational overhead by 38% through SAP automation and intelligent process reengineering across front and back office.",
  },
  {
    tag: "Manufacturing",
    metric: "+45%",
    title: "Production Efficiency",
    city: "West Midlands",
    desc: "A Midlands manufacturer increased throughput efficiency by 45% post S/4HANA transformation, integrating IoT sensor data directly into SAP plant maintenance.",
  },
  {
    tag: "Retail",
    metric: "£2.4M",
    title: "Annual Savings Unlocked",
    city: "Manchester",
    desc: "A multi-site retail chain unlocked £2.4M in annual savings via SAP inventory optimisation and fully centralised procurement management.",
  },
]

const WHY = [
  {
    title: "Deep UK Regulatory Expertise",
    desc: "Comprehensive command of HMRC, GDPR, IR35, Making Tax Digital, and post-Brexit compliance",
  },
  {
    title: "Nationwide Delivery Capability",
    desc: "Consultants deployed on-site across London, Birmingham, Manchester, Leeds, Edinburgh and beyond",
  },
  {
    title: "120+ Proven Implementations",
    desc: "Successful UK projects across financial services, manufacturing, public sector and retail",
  },
  {
    title: "Structured Delivery Methodology",
    desc: "Frameworks designed to minimise downtime, protect business continuity and accelerate value",
  },
  {
    title: "UK-Based 24/7 Support",
    desc: "Round-the-clock monitoring with guaranteed SLA response times from our UK support team",
  },
]

const REGIONS = [
  "London",
  "Manchester",
  "Birmingham",
  "Leeds",
  "Edinburgh",
  "Glasgow",
  "Bristol",
  "Cardiff",
  "Belfast",
  "Liverpool",
  "Sheffield",
  "Newcastle",
]

/* ─── HOOKS ───────────────────────────────────────────────────────────────── */

function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
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

/* ─── GLOBAL STYLES ───────────────────────────────────────────────────────── */

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Outfit:wght@300;400;500;600;700&display=swap');

  :root {
    --rose: #d9145b;
    --rose-dark: #9b0d3f;
    --rose-light: rgba(217,20,91,0.08);
    --navy: #0b1527;
    --ink: #1a2035;
    --muted: #64748b;
  }

  .uk-page { font-family: 'Outfit', sans-serif; background: #fff; }
  .font-serif { font-family: 'Cormorant Garamond', serif; }

  @keyframes uk-up    { from { opacity:0; transform:translateY(36px) } to { opacity:1; transform:translateY(0) } }
  @keyframes uk-left  { from { opacity:0; transform:translateX(-40px) } to { opacity:1; transform:translateX(0) } }
  @keyframes uk-right { from { opacity:0; transform:translateX(40px)  } to { opacity:1; transform:translateX(0) } }
  @keyframes uk-scale { from { opacity:0; transform:scale(0.9) }         to { opacity:1; transform:scale(1) } }
  @keyframes uk-line  { from { width:0 } to { width:100% } }
  @keyframes uk-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes uk-glow  { 0%,100%{box-shadow:0 0 20px rgba(217,20,91,0.15)} 50%{box-shadow:0 0 40px rgba(217,20,91,0.35)} }
  @keyframes uk-spin  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes uk-ping  { 0%{transform:scale(1);opacity:0.7} 70%{transform:scale(2);opacity:0} 100%{transform:scale(2);opacity:0} }
  @keyframes shimmer  { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes borderDraw { from{stroke-dashoffset:1000} to{stroke-dashoffset:0} }

  .in-up    { animation: uk-up    0.7s cubic-bezier(.22,1,.36,1) both }
  .in-left  { animation: uk-left  0.7s cubic-bezier(.22,1,.36,1) both }
  .in-right { animation: uk-right 0.7s cubic-bezier(.22,1,.36,1) both }
  .in-scale { animation: uk-scale 0.6s cubic-bezier(.22,1,.36,1) both }
  .float    { animation: uk-float 5s ease-in-out infinite }
  .glow-anim { animation: uk-glow 3s ease-in-out infinite }

  .d1{animation-delay:.05s} .d2{animation-delay:.12s} .d3{animation-delay:.2s}
  .d4{animation-delay:.3s}  .d5{animation-delay:.4s}  .d6{animation-delay:.52s}
  .d7{animation-delay:.65s}

  .shimmer-rose {
    background: linear-gradient(90deg,#d9145b 0%,#ff6b9d 45%,#d9145b 55%,#9b0d3f 100%);
    background-size: 200% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3.5s linear infinite;
  }

  .bg-grid-uk {
    background-image:
      linear-gradient(rgba(217,20,91,.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(217,20,91,.04) 1px, transparent 1px);
    background-size: 48px 48px;
  }

  .card-uk {
    transition: transform .4s cubic-bezier(.22,1,.36,1), box-shadow .4s ease, border-color .3s ease;
  }
  .card-uk:hover {
    transform: translateY(-6px);
    box-shadow: 0 24px 60px rgba(217,20,91,.1), 0 8px 20px rgba(0,0,0,.06);
    border-color: rgba(217,20,91,.3) !important;
  }

  .line-draw { animation: uk-line 1s ease-out both }

  .ping-dot::after {
    content:''; position:absolute; inset:0; border-radius:9999px;
    background:#d9145b; animation: uk-ping 2s ease-out infinite;
  }

  .service-hover:hover .svc-num {
    background: linear-gradient(135deg,#d9145b,#ff6b9d);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  }
  .service-hover::before {
    content:''; position:absolute; left:0; top:0; width:3px; height:0; background:linear-gradient(to bottom,#d9145b,#9b0d3f);
    transition: height .5s cubic-bezier(.22,1,.36,1);
  }
  .service-hover:hover::before { height:100%; }

  .tag-pill {
    font-family:'Outfit',sans-serif;
    font-size:10px; font-weight:700; letter-spacing:.12em; text-transform:uppercase;
    background:rgba(217,20,91,.07); border:1px solid rgba(217,20,91,.2);
    color:#d9145b; padding:4px 12px; border-radius:99px;
  }

  .nav-uk {
    background: rgba(255,255,255,.92);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0,0,0,.06);
  }
`

/* ─── SHARED BITS ─────────────────────────────────────────────────────────── */

function Label({ children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span style={{ width: 28, height: 1, background: "#d9145b", display: "block" }} />
      <span
        style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#d9145b" }}
      >
        {children}
      </span>
      <span style={{ width: 28, height: 1, background: "#d9145b", display: "block" }} />
    </div>
  )
}

function PrimaryBtn({ children, href = "/contact" }) {
  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: "#d9145b",
        color: "#fff",
        fontFamily: "Outfit,sans-serif",
        fontWeight: 700,
        fontSize: 11,
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
      {children} <span>→</span>
    </a>
  )
}

function OutlineBtn({ children, href = "/contact" }) {
  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        border: "1.5px solid #cbd5e1",
        color: "#475569",
        fontFamily: "Outfit,sans-serif",
        fontWeight: 700,
        fontSize: 11,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        padding: "16px 32px",
        borderRadius: 999,
        textDecoration: "none",
        transition: "all .3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#d9145b"
        e.currentTarget.style.color = "#d9145b"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#cbd5e1"
        e.currentTarget.style.color = "#475569"
      }}
    >
      {children} <span>→</span>
    </a>
  )
}

/* ─── NAV ─────────────────────────────────────────────────────────────────── */

function Nav({ onSwitch }) {
  return (
    <nav className="nav-uk fixed top-0 left-0 right-0 z-50 px-8 md:px-16 lg:px-24">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              background: "linear-gradient(135deg,#d9145b,#9b0d3f)",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 14px rgba(217,20,91,.3)",
            }}
          >
            <span style={{ color: "#fff", fontFamily: "Outfit", fontWeight: 900, fontSize: 10 }}>SAP</span>
          </div>
          <span
            style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 15, color: "#0b1527", letterSpacing: "-.01em" }}
          >
            Nexus<span style={{ color: "#d9145b" }}>SAP</span> UK
          </span>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Services", "About", "Cases", "Contact"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              style={{
                fontFamily: "Outfit",
                fontWeight: 500,
                fontSize: 13,
                color: "#64748b",
                textDecoration: "none",
                transition: "color .2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#d9145b")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
            >
              {l}
            </a>
          ))}
          <button
            onClick={onSwitch}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#f1f5f9",
              border: "1px solid #e2e8f0",
              borderRadius: 99,
              padding: "8px 16px",
              cursor: "pointer",
              fontFamily: "Outfit",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color: "#475569",
              transition: "all .3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#d9145b"
              e.currentTarget.style.color = "#d9145b"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e2e8f0"
              e.currentTarget.style.color = "#475569"
            }}
          >
            <span>🇺🇸</span> Switch to US
          </button>
        </div>
      </div>
    </nav>
  )
}

/* ─── HERO ────────────────────────────────────────────────────────────────── */

function Hero() {
  const [ref, inView] = useInView()
  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "#fff",
        paddingTop: 68,
      }}
    >
      <div className="bg-grid-uk" style={{ position: "absolute", inset: 0, opacity: 0.7 }} />
      {/* Decorative shapes */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(217,20,91,.07) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
        className="float"
      />
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: "-8%",
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(11,21,39,.04) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      {/* UK diagonal accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "48%",
          height: "100%",
          background: "linear-gradient(to bottom left, #f8fafc, transparent)",
          borderRadius: "0 0 0 120px",
          pointerEvents: "none",
        }}
      />

      <div ref={ref} style={{ position: "relative", zIndex: 10, width: "100%", padding: "60px 96px 60px 96px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Left */}
          <div>
            <div className={inView ? "in-up d1" : "opacity-0"}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(217,20,91,.07)",
                  border: "1px solid rgba(217,20,91,.18)",
                  borderRadius: 99,
                  padding: "8px 18px",
                  marginBottom: 28,
                }}
              >
                <span
                  style={{
                    fontFamily: "Outfit",
                    fontWeight: 700,
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#d9145b",
                  }}
                >
                  SAP Gold Partner — UK
                </span>
              </div>
            </div>

            <div className={inView ? "in-up d2" : "opacity-0"}>
              <h1
                className="font-serif"
                style={{
                  fontSize: "clamp(48px,5.5vw,76px)",
                  fontWeight: 700,
                  lineHeight: 1.05,
                  color: "#0b1527",
                  marginBottom: 24,
                }}
              >
                <span className="shimmer-rose">Next-Gen SAP</span> Automation for UK Enterprises
                {/* Precision SAP for <span className="shimmer-rose">British</span> Enterprise */}
              </h1>
            </div>

            <div className={inView ? "in-up d3" : "opacity-0"}>
              <p
                style={{
                  fontFamily: "Outfit",
                  fontSize: 17,
                  color: "#64748b",
                  lineHeight: 1.7,
                  marginBottom: 36,
                  maxWidth: 500,
                }}
              >
                Empowering UK enterprises for scalable growth, Double Click Consulting SAP solutions are HMRC-compliant,
                GDPR-ready, and engineered for the demands of the new digital age.
              </p>
            </div>

            <div className={`flex gap-4 flex-wrap ${inView ? "in-up d4" : "opacity-0"}`}>
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
                  fontSize: 11,
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
                Book Consultation <span>→</span>
              </a>
              {/* <PrimaryBtn>Book Consultation</PrimaryBtn> */}
              <OutlineBtn>View Case Studies</OutlineBtn>
            </div>

            <div
              className={inView ? "in-up d5" : "opacity-0"}
              style={{
                marginTop: 44,
                paddingTop: 32,
                borderTop: "1px solid #f1f5f9",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div style={{ display: "flex", marginRight: 4 }}>
                {["#d9145b", "#0b1527", "#475569", "rgba(217,20,91,.6)"].map((bg, i) => (
                  <div
                    key={i}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: bg,
                      border: "2px solid #fff",
                      marginLeft: i ? -10 : 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "Outfit",
                      fontWeight: 700,
                      fontSize: 10,
                      color: "#fff",
                    }}
                  >
                    {["JH", "SR", "AT", "+9"][i]}
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: 13, color: "#0b1527" }}>
                  Trusted by 120+ UK Organisations
                </div>
                <div style={{ fontFamily: "Outfit", fontSize: 12, color: "#94a3b8", marginTop: 2 }}>
                  ⭐⭐⭐⭐⭐ 4.9 / 5 client satisfaction
                </div>
              </div>
            </div>
          </div>

          {/* Right - Stats */}
          <div className={inView ? "in-right d2" : "opacity-0"}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {STATS.map((s, i) => {
                const val = useCountUp(s.num, inView)
                return (
                  <div
                    key={i}
                    className="card-uk in-scale"
                    style={{
                      background: "#fff",
                      border: "1px solid #f1f5f9",
                      borderRadius: 20,
                      padding: "28px 24px",
                      textAlign: "center",
                      animationDelay: `${0.08 + i * 0.08}s`,
                    }}
                  >
                    <div
                      className="shimmer-rose"
                      style={{ fontSize: 40, fontWeight: 700, lineHeight: 1, marginBottom: 8 }}
                    >
                      {val}
                      {s.num == "24" ? "/7" : ""}
                    </div>
                    <div
                      style={{
                        fontFamily: "Outfit",
                        fontWeight: 600,
                        fontSize: 10,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "#94a3b8",
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                )
              })}
              <div
                className="glow-anim in-scale"
                style={{
                  gridColumn: "span 2",
                  background: "linear-gradient(135deg,#d9145b 0%,#9b0d3f 100%)",
                  borderRadius: 20,
                  padding: "28px 24px",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                  animationDelay: ".45s",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div className="font-serif" style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
                    UK's Most Trusted SAP Agency
                  </div>
                  <div style={{ fontFamily: "Outfit", fontSize: 12, color: "rgba(255,255,255,.65)" }}>
                    Gold Partner · HMRC Compliant · GDPR Ready
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── ABOUT ───────────────────────────────────────────────────────────────── */

function About() {
  const [ref, inView] = useInView()
  return (
    <section
      ref={ref}
      id="about"
      style={{ background: "linear-gradient(to bottom, #f8fafc, #fff)", padding: "100px 96px" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <Label>About Us</Label>
          <h2
            className="font-serif"
            style={{ fontSize: "clamp(36px,4vw,56px)", fontWeight: 700, color: "#0b1527", lineHeight: 1.1 }}
          >
            Your Trusted <span style={{ color: "#d9145b" }}>SAP Partner</span> in the UK
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div className={inView ? "in-left" : "opacity-0"}>
            <p style={{ fontFamily: "Outfit", fontSize: 17, color: "#475569", lineHeight: 1.75, marginBottom: 20 }}>
              We are a premier SAP consultancy operating across England, Scotland, Wales, and Northern Ireland. Our
              accredited specialists help UK businesses modernise operations, achieve compliance, and scale with
              confidence.
            </p>
            <p style={{ fontFamily: "Outfit", fontSize: 15, color: "#64748b", lineHeight: 1.7 }}>
              From FTSE 250 enterprises to ambitious mid-market firms, we deliver bespoke SAP strategies tailored to UK
              market realities — HMRC, IR35, GDPR, Making Tax Digital, and beyond.
            </p>
            <div
              style={{
                marginTop: 36,
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "20px 24px",
                background: "#fff",
                border: "1px solid #f1f5f9",
                borderRadius: 16,
                boxShadow: "0 4px 20px rgba(0,0,0,.04)",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  background: "linear-gradient(135deg,#d9145b,#9b0d3f)",
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 8px 20px rgba(217,20,91,.25)",
                }}
              >
                <span style={{ color: "#fff", fontFamily: "Outfit", fontWeight: 900, fontSize: 12 }}>SAP</span>
              </div>
              <div>
                <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 14, color: "#0b1527" }}>
                  SAP Gold Partner · Certified Practice
                </div>
                <div style={{ fontFamily: "Outfit", fontSize: 12, color: "#94a3b8", marginTop: 2 }}>
                  Authorised UK & Ireland Partner since 2010
                </div>
              </div>
            </div>
          </div>
          <div className={inView ? "in-right" : "opacity-0"} style={{ display: "grid", gap: 12 }}>
            {PILLARS.map((p, i) => (
              <div
                key={p.title}
                className="card-uk"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  padding: "18px 20px",
                  background: "#fff",
                  border: "1px solid #f1f5f9",
                  borderRadius: 16,
                  cursor: "default",
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    background: "linear-gradient(135deg,#d9145b,#9b0d3f)",
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 16,
                    flexShrink: 0,
                    boxShadow: "0 6px 16px rgba(217,20,91,.22)",
                  }}
                >
                  {p.icon}
                </div>
                <div>
                  <strong
                    style={{
                      fontFamily: "Outfit",
                      fontWeight: 700,
                      fontSize: 14,
                      color: "#0b1527",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    {p.title}
                  </strong>
                  <span style={{ fontFamily: "Outfit", fontSize: 13, color: "#64748b" }}>{p.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── SERVICES ────────────────────────────────────────────────────────────── */

function Services() {
  const [ref, inView] = useInView()
  return (
    <section
      ref={ref}
      id="services"
      className="bg-red-50"
      style={{ padding: "100px 96px", position: "relative", overflow: "hidden" }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(217,20,91,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(217,20,91,.04) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(217,20,91,.08) 0%, transparent 65%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 10 }}>
        <div className={inView ? "in-up" : "opacity-0"} style={{ textAlign: "center", marginBottom: 64 }}>
          <Label>What We Do</Label>
          <h2
            className="font-serif"
            style={{ fontSize: "clamp(36px,4vw,56px)", fontWeight: 700, color: "#fff", lineHeight: 1.1 }}
          >
            Our SAP <span style={{ color: "#d9145b" }}>Services</span>
          </h2>
          <p
            style={{
              fontFamily: "Outfit",
              fontSize: 15,
              color: "rgba(255,255,255,.45)",
              maxWidth: 520,
              margin: "12px auto 0",
              lineHeight: 1.7,
            }}
          >
            Comprehensive SAP consulting for UK's most demanding enterprises — from initial strategy to continuous
            optimisation.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
          {SERVICES.map((s, i) => (
            <div
              key={s.num}
              className={`service-hover in-scale`}
              style={{
                position: "relative",
                background: "rgb(255,255,255)",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: 20,
                padding: "36px 28px",
                cursor: "default",
                overflow: "hidden",
                transition: "all .4s",
                animationDelay: `${i * 0.09}s`,
                animationFillMode: "both",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(214, 2, 79,.2)"
                e.currentTarget.style.borderColor = "rgb(214, 2, 79)"
                e.currentTarget.style.transform = "translateY(-8px)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgb(255,255,255)"
                e.currentTarget.style.borderColor = "rgba(255,255,255,.08)"
                e.currentTarget.style.transform = "translateY(0)"
              }}
            >
              <div className="tag-pill" style={{ marginBottom: 20, display: "inline-block" }}>
                {s.tag}
              </div>
              <div
                className="svc-num "
                style={{
                  fontSize: 64,
                  fontWeight: 700,
                  color: "rgba(214, 2, 79,.5)",
                  lineHeight: 1,
                  marginBottom: 16,
                  transition: "all .3s",
                }}
              >
                {s.num}
              </div>
              <h3 style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 15, color: "#fff", marginBottom: 12 }}>
                {s.title}
              </h3>
              <p style={{ fontFamily: "Outfit", fontSize: 13, color: "rgba(255,255,255,.45)", lineHeight: 1.65 }}>
                {s.desc}
              </p>
            </div>
          ))}
          <div
            className="in-scale"
            style={{
              background: "linear-gradient(135deg, rgba(217,20,91,.12), rgba(217,20,91,.04))",
              border: "1px solid rgba(217,20,91,.25)",
              borderRadius: 20,
              padding: "36px 28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              animationDelay: ".55s",
              animationFillMode: "both",
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                background: "rgba(217,20,91,.2)",
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                marginBottom: 20,
              }}
            >
              💬
            </div>
            <h3 style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 15, color: "#fff", marginBottom: 10 }}>
              Bespoke UK Solution?
            </h3>
            <p
              style={{
                fontFamily: "Outfit",
                fontSize: 13,
                color: "rgba(255,255,255,.45)",
                lineHeight: 1.65,
                marginBottom: 24,
              }}
            >
              Every British enterprise is unique. Speak with our UK SAP experts for a tailored roadmap.
            </p>
            <a
              href="#contact"
              style={{
                display: "inline-block",
                background: "#d9145b",
                color: "#fff",
                fontFamily: "Outfit",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "12px 24px",
                borderRadius: 10,
                textDecoration: "none",
                textAlign: "center",
                transition: "all .3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#9b0d3f")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#d9145b")}
            >
              Talk to an Expert →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── COVERAGE ────────────────────────────────────────────────────────────── */

function Coverage() {
  const [ref, inView] = useInView()
  const UK_DOTS = [
    { cx: 200, cy: 310, label: "London" },
    { cx: 170, cy: 245, label: "Birmingham" },
    { cx: 162, cy: 195, label: "Manchester" },
    { cx: 170, cy: 168, label: "Leeds" },
    { cx: 152, cy: 108, label: "Edinburgh" },
    { cx: 135, cy: 88, label: "Glasgow" },
    { cx: 145, cy: 280, label: "Bristol" },
    { cx: 118, cy: 245, label: "Cardiff" },
    { cx: 108, cy: 140, label: "Belfast" },
    { cx: 182, cy: 220, label: "Sheffield" },
  ]
  return (
    <section
      ref={ref}
      id="coverage"
      style={{ background: "linear-gradient(135deg,#fff,#fdf2f5,#f8fafc)", padding: "100px 96px" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <Label>Our Reach</Label>
          <h2
            className="font-serif"
            style={{ fontSize: "clamp(36px,4vw,56px)", fontWeight: 700, color: "#0b1527", lineHeight: 1.1 }}
          >
            Serving the <span style={{ color: "#d9145b" }}>United Kingdom</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div className={inView ? "in-left" : "opacity-0"}>
            <p style={{ fontFamily: "Outfit", fontSize: 15, color: "#64748b", lineHeight: 1.7, marginBottom: 32 }}>
              From our London HQ to regional teams nationwide, we deliver SAP excellence wherever your UK business
              operates.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {REGIONS.map((r, i) => (
                <span
                  key={r}
                  style={{
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: 10,
                    padding: "8px 16px",
                    fontFamily: "Outfit",
                    fontWeight: 600,
                    fontSize: 12,
                    color: "#475569",
                    transition: "all .3s",
                    cursor: "default",
                    animationDelay: `${i * 0.04}s`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#d9145b"
                    e.currentTarget.style.color = "#d9145b"
                    e.currentTarget.style.transform = "translateY(-2px)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e2e8f0"
                    e.currentTarget.style.color = "#475569"
                    e.currentTarget.style.transform = "translateY(0)"
                  }}
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
          <div className={inView ? "in-right" : "opacity-0"} style={{ display: "flex", justifyContent: "center" }}>
            <svg viewBox="0 0 320 460" style={{ width: "100%", maxWidth: 320 }}>
              <defs>
                <radialGradient id="uk-glow" cx="50%" cy="55%">
                  <stop offset="0%" stopColor="#d9145b" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#d9145b" stopOpacity="0" />
                </radialGradient>
              </defs>
              <ellipse cx="160" cy="230" rx="140" ry="200" fill="url(#uk-glow)" />
              <path
                d="M160,30 L185,55 L200,80 L205,110 L215,130 L210,160 L220,185 L215,220 L225,250 L220,285 L210,315 L200,345 L185,370 L165,390 L145,380 L125,355 L115,325 L108,295 L112,265 L105,240 L110,210 L105,182 L112,155 L108,130 L118,105 L130,80 L145,58 Z"
                fill="rgba(217,20,91,.04)"
                stroke="rgba(217,20,91,.15)"
                strokeWidth="1.5"
              />
              {UK_DOTS.map((d, i) => (
                <g key={d.label}>
                  <circle cx={d.cx} cy={d.cy} r="4.5" fill="#d9145b" />
                  <circle
                    cx={d.cx}
                    cy={d.cy}
                    r="4.5"
                    fill="#d9145b"
                    opacity="0.4"
                    style={{ animation: `uk-ping 2.5s ${i * 0.28}s ease-out infinite` }}
                  />
                  <text
                    x={d.cx + 9}
                    y={d.cy + 4}
                    fontSize="9"
                    fill="#0b1527"
                    fontFamily="Outfit,sans-serif"
                    fontWeight="600"
                  >
                    {d.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── CASES ───────────────────────────────────────────────────────────────── */

function Cases() {
  const [ref, inView] = useInView()
  return (
    <section ref={ref} id="cases" style={{ background: "#fff", padding: "100px 96px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className={inView ? "in-up" : "opacity-0"} style={{ textAlign: "center", marginBottom: 64 }}>
          <Label>Proven Results</Label>
          <h2
            className="font-serif"
            style={{ fontSize: "clamp(36px,4vw,56px)", fontWeight: 700, color: "#0b1527", lineHeight: 1.1 }}
          >
            Real UK Impact. <span style={{ color: "#d9145b" }}>Real Numbers.</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {CASES.map((c, i) => (
            <div
              key={c.title}
              className={`card-uk in-scale`}
              style={{
                background: "#fff",
                border: "1px solid #f1f5f9",
                borderRadius: 22,
                padding: "36px 28px",
                cursor: "default",
                overflow: "hidden",
                position: "relative",
                animationDelay: `${i * 0.12}s`,
                animationFillMode: "both",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: "linear-gradient(90deg,#d9145b,#9b0d3f)",
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform .5s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scaleX(1)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scaleX(0)")}
              />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <span className="tag-pill">{c.tag}</span>
                <span style={{ fontFamily: "Outfit", fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>
                  📍 {c.city}
                </span>
              </div>
              <div className=" shimmer-rose" style={{ fontSize: 60, fontWeight: 700, lineHeight: 1, marginBottom: 12 }}>
                {c.metric}
              </div>
              <h3
                style={{
                  fontFamily: "Outfit",
                  fontWeight: 700,
                  fontSize: 15,
                  color: "#0b1527",
                  marginBottom: 16,
                  paddingBottom: 16,
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                {c.title}
              </h3>
              <p style={{ fontFamily: "Outfit", fontSize: 13, color: "#64748b", lineHeight: 1.65 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── WHY US ──────────────────────────────────────────────────────────────── */

function WhyUs() {
  const [ref, inView] = useInView()
  return (
    <section ref={ref} style={{ background: "linear-gradient(to bottom, #f8fafc, #fff)", padding: "100px 96px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <Label>Why Choose Us</Label>
          <h2
            className="font-serif"
            style={{ fontSize: "clamp(36px,4vw,56px)", fontWeight: 700, color: "#0b1527", lineHeight: 1.1 }}
          >
            Why UK Enterprises <span style={{ color: "#d9145b" }}>Choose Us</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div className={inView ? "in-left" : "opacity-0"}>
            <div
              style={{
                background: "#fff",
                borderRadius: 28,
                padding: "52px 44px",
                textAlign: "center",
                border: "1px solid #f1f5f9",
                boxShadow: "0 20px 60px rgba(0,0,0,.06)",
                position: "relative",
                overflow: "hidden",
              }}
              className="shadow-xl"
            >
              <div
                style={{
                  position: "absolute",
                  top: -60,
                  right: -60,
                  width: 220,
                  height: 220,
                  background: "radial-gradient(circle,rgba(217,20,91,.06),transparent 70%)",
                  borderRadius: "50%",
                }}
              />
              <div
                className="font-serif"
                style={{ fontSize: 88, fontWeight: 700, color: "rgba(217,20,91,.7)", lineHeight: 1, marginBottom: 12 }}
              >
                SAP
              </div>
              <div className="font-serif" style={{ fontSize: 26, fontWeight: 700, color: "#0b1527", marginBottom: 6 }}>
                Gold Partner
              </div>
              <div style={{ fontFamily: "Outfit", fontSize: 13, color: "#94a3b8", marginBottom: 8 }}>
                Certified UK Practice
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "rgba(217,20,91,.07)",
                  border: "1px solid rgba(217,20,91,.15)",
                  borderRadius: 99,
                  padding: "6px 14px",
                  marginBottom: 32,
                }}
              >
                <span style={{ color: "#d9145b", fontSize: 12 }}>✓</span>
                <span
                  style={{
                    fontFamily: "Outfit",
                    fontWeight: 700,
                    fontSize: 11,
                    color: "#d9145b",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                  }}
                >
                  Verified Partner Status
                </span>
              </div>
              <div>
                <PrimaryBtn>Get Started Today</PrimaryBtn>
              </div>
            </div>
          </div>
          <div className={inView ? "in-right" : "opacity-0"} style={{ display: "grid", gap: 12 }}>
            {WHY.map((w, i) => (
              <div
                key={w.title}
                className="card-uk"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  padding: "18px 20px",
                  background: "#fff",
                  border: "1px solid #f1f5f9",
                  borderRadius: 16,
                  cursor: "default",
                  animationDelay: `${i * 0.07}s`,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    background: "linear-gradient(135deg,#d9145b,#9b0d3f)",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 13,
                    flexShrink: 0,
                    boxShadow: "0 4px 12px rgba(217,20,91,.22)",
                    transition: "transform .3s",
                  }}
                >
                  ✓
                </div>
                <div>
                  <strong
                    style={{
                      fontFamily: "Outfit",
                      fontWeight: 700,
                      fontSize: 14,
                      color: "#0b1527",
                      display: "block",
                      marginBottom: 3,
                    }}
                  >
                    {w.title}
                  </strong>
                  <span style={{ fontFamily: "Outfit", fontSize: 12, color: "#64748b" }}>{w.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── CTA ─────────────────────────────────────────────────────────────────── */

function CTA() {
  const [ref, inView] = useInView()
  return (
    <section
      ref={ref}
      id="contact"
      className=" bg-gradient-to-br from-[#bcc3f9] via-blue-50 to-[#f9b5ce]"
      style={{ padding: "100px 96px", position: "relative", overflow: "hidden" }}
    >
      <div
        className=" bg-gradient-to-br from-[#bcc3f9] via-blue-50 to-[#f9b5ce]"
        style={{
          position: "absolute",
          inset: 0,
          //   background: "linear-gradient(135deg, rgba(248,250,252,.8), rgba(253,242,245,.6), rgba(255,255,255,.8)) ",
        }}
      />
      <div className="bg-grid-uk" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 400,
          //   background: "radial-gradient(ellipse,rgba(217,20,91,.06),transparent 65%)",
          borderRadius: "50%",
        }}
      />
      <div
        className={inView ? "in-up" : "opacity-0"}
        style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 10 }}
      >
        <Label>Get Started</Label>
        <h2
          className="font-serif"
          style={{
            fontSize: "clamp(36px,4.5vw,62px)",
            fontWeight: 700,
            color: "#0b1527",
            lineHeight: 1.1,
            margin: "16px 0 24px",
          }}
        >
          Ready to Transform Your UK Business with <span style={{ color: "#d9145b" }}>SAP</span>?
        </h2>
        <p
          style={{
            fontFamily: "Outfit",
            fontSize: 16,
            color: "#64748b",
            lineHeight: 1.7,
            marginBottom: 40,
            maxWidth: 560,
            margin: "0 auto 40px",
          }}
        >
          Partner with the UK's leading SAP consultancy to modernise operations, ensure compliance, and unlock
          measurable growth.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <PrimaryBtn onClick={() => document.getElementById("book-consultation-id")?.click()}>
            Book Free Consultation
          </PrimaryBtn>
          <OutlineBtn>Contact Us Now</OutlineBtn>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 32,
            justifyContent: "center",
            marginTop: 52,
            paddingTop: 36,
            borderTop: "1px solid #f1f5f9",
          }}
        >
          {["SAP Gold Partner", "HMRC Compliant", "GDPR Ready", "24/7 UK Support"].map((b) => (
            <div
              key={b}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                fontFamily: "Outfit",
                fontSize: 13,
                color: "#475569",
                fontWeight: 500,
              }}
            >
              <span style={{ color: "#d9145b" }}>✓</span> {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── ROOT ────────────────────────────────────────────────────────────────── */

export default function SAPUK({ onSwitch }) {
  return (
    <>
      <Helmet>
        <title>SAP Services in UK | Expert SAP Consulting & Implementation</title>

        <meta name="title" content="SAP Services in the UK | Expert SAP Consulting & Implementation." />
        <meta
          name="description"
          content="Need SAP experts in the UK? Get fast, secure, and cost-effective SAP consulting, implementation, and support for enterprises and growing businesses."
        />

        <meta
          name="keywords"
          content="SAP implementation services UK, SAP consulting company UK, certified SAP partner UK, SAP technology partner UK, SAP consultants London, SAP services Europe"
        />

        {/* Open Graph */}
        <meta property="og:title" content="SAP Services in the UK | Expert SAP Consulting & Implementation" />
        <meta
          property="og:description"
          content="Get expert SAP consulting, implementation, and support services across the UK. Trusted SAP partner for enterprises and growing businesses."
        />

        {/* Canonical */}
        <link rel="canonical" href="https://doubleclick.co.tz/en-gb/sap-services-uk" />
      </Helmet>

      <div className="uk-page">
        <style>{CSS}</style>
        {/* <Nav onSwitch={onSwitch} /> */}
        <Hero />
        <About />
        <Services />
        <Coverage />
        <Cases />
        <WhyUs />
        <CTA />
      </div>
    </>
  )
}

// import { useState, useEffect, useRef } from "react"

// // ─── Country Data ─────────────────────────────────────────────────────────────

// const COUNTRY_DATA = {
//   uk: {
//     name: "United Kingdom",
//     flag: "",
//     tagline: "Powering British Enterprise Excellence",
//     subtitle:
//       "Delivering precision-engineered SAP solutions for the UK's most ambitious organisations — from London's financial district to Manchester's industrial heartland.",
//     heroLabel: "SAP Gold Partner — UK & Ireland",
//     ctaPrimary: "Book a Consultation",
//     ctaSecondary: "View Case Studies",
//     badge: "Trusted Across the UK",
//     badgeSub: "Serving British Commerce Since 2010",
//     about: {
//       title: "Your Trusted SAP Partner Across the UK",
//       p1: "We are a premier SAP consultancy operating across England, Scotland, Wales, and Northern Ireland. Our accredited team of SAP specialists helps UK businesses modernise operations, achieve compliance, and scale with confidence.",
//       p2: "From FTSE 250 enterprises to ambitious mid-market firms, we deliver bespoke SAP strategies tailored to UK market realities — HMRC compliance, IR35, GDPR, and beyond.",
//     },
//     pillars: [
//       { icon: "✦", title: "SAP Certified Consultants", desc: "Fully accredited experts with deep SAP credentials" },
//       { icon: "⬡", title: "UK-First Delivery", desc: "Solutions built around British regulatory requirements" },
//       { icon: "◈", title: "End-to-End Partnership", desc: "From discovery to deployment and ongoing support" },
//       { icon: "◎", title: "Measurable ROI", desc: "35–45% efficiency gains across our UK client base" },
//     ],
//     services: [
//       {
//         num: "01",
//         title: "SAP S/4HANA Implementation",
//         desc: "Full-lifecycle SAP deployments for UK enterprises, ensuring HMRC compliance and minimal business disruption.",
//         icon: "⚙",
//       },
//       {
//         num: "02",
//         title: "SAP Finance & Controlling",
//         desc: "FICO solutions aligned with UK accounting standards, tax regulations, and Making Tax Digital initiatives.",
//         icon: "£",
//       },
//       {
//         num: "03",
//         title: "SAP Human Capital Management",
//         desc: "UK-compliant HR and payroll solutions managing PAYE, auto-enrolment pensions, and IR35 obligations.",
//         icon: "◎",
//       },
//       {
//         num: "04",
//         title: "SAP Supply Chain Optimisation",
//         desc: "Streamline procurement, warehousing, and logistics operations across UK and European supply chains.",
//         icon: "↗",
//       },
//       {
//         num: "05",
//         title: "SAP Business Intelligence",
//         desc: "Real-time reporting and analytics dashboards built for boardrooms, giving you the strategic edge.",
//         icon: "◈",
//       },
//     ],
//     stats: [
//       { num: "120+", label: "UK Projects Delivered" },
//       { num: "15+", label: "Sectors Served" },
//       { num: "24/7", label: "UK Support Desk" },
//       { num: "100%", label: "SAP Certified Team" },
//     ],
//     cases: [
//       {
//         tag: "Financial Services",
//         metric: "−38%",
//         title: "Operational Cost Reduction",
//         desc: "A London-based asset management firm reduced operational overhead by 38% through intelligent SAP automation and process reengineering.",
//       },
//       {
//         tag: "Manufacturing",
//         metric: "+45%",
//         title: "Production Efficiency Gains",
//         desc: "A Midlands manufacturer increased throughput efficiency by 45% following a complete SAP S/4HANA transformation with IoT integration.",
//       },
//       {
//         tag: "Retail",
//         metric: "£2.4M",
//         title: "Annual Savings Unlocked",
//         desc: "A multi-site UK retail chain unlocked £2.4M in annual savings via SAP inventory optimisation and centralised procurement management.",
//       },
//     ],
//     why: [
//       {
//         title: "Deep UK Regulatory Expertise",
//         desc: "Comprehensive knowledge of HMRC, GDPR, Making Tax Digital, and post-Brexit compliance frameworks",
//       },
//       {
//         title: "Nationwide Delivery Capability",
//         desc: "Consultants deployed on-site across London, Birmingham, Manchester, Leeds, Edinburgh, and beyond",
//       },
//       {
//         title: "Proven UK Track Record",
//         desc: "120+ successful implementations across financial services, manufacturing, public sector and retail",
//       },
//       {
//         title: "Rapid Deployment Methodology",
//         desc: "Structured UK delivery frameworks that reduce time-to-value and protect business continuity",
//       },
//       {
//         title: "Round-the-Clock Support",
//         desc: "UK-based support team available 24/7 with guaranteed SLA response times",
//       },
//     ],
//     coverage: {
//       title: "Serving Organisations Across the United Kingdom",
//       desc: "From our London headquarters to regional offices nationwide, we deliver SAP excellence wherever your business operates.",
//       regions: [
//         "London",
//         "Manchester",
//         "Birmingham",
//         "Leeds",
//         "Edinburgh",
//         "Glasgow",
//         "Bristol",
//         "Cardiff",
//         "Belfast",
//         "Liverpool",
//         "Sheffield",
//         "Newcastle",
//       ],
//     },
//     ctaTitle: "Ready to Transform Your UK Business with SAP?",
//     ctaDesc:
//       "Partner with the UK's leading SAP consultancy to modernise operations, ensure compliance, and unlock measurable growth.",
//     mapDots: [
//       { cx: 200, cy: 200, label: "London" },
//       { cx: 170, cy: 150, label: "Birmingham" },
//       { cx: 165, cy: 120, label: "Manchester" },
//       { cx: 175, cy: 100, label: "Leeds" },
//       { cx: 160, cy: 80, label: "Edinburgh" },
//       { cx: 145, cy: 70, label: "Glasgow" },
//       { cx: 155, cy: 180, label: "Bristol" },
//       { cx: 220, cy: 140, label: "Norwich" },
//       { cx: 130, cy: 155, label: "Cardiff" },
//       { cx: 120, cy: 100, label: "Belfast" },
//     ],
//     mapShape:
//       "M200,30 L240,50 L260,100 L265,150 L250,200 L240,240 L200,280 L180,270 L160,240 L140,200 L130,160 L125,120 L135,70 L160,40 Z",
//   },
//   us: {
//     name: "United States",
//     flag: "🇺🇸",
//     tagline: "Accelerating American Enterprise Growth",
//     subtitle:
//       "Delivering high-velocity SAP transformations for Fortune 500 leaders and mid-market disruptors from Silicon Valley to the Northeast Corridor.",
//     heroLabel: "SAP Premier Partner — North America",
//     ctaPrimary: "Schedule a Demo",
//     ctaSecondary: "See Our Work",
//     badge: "The #1 SAP Firm in the US",
//     badgeSub: "Fueling American Business Innovation",
//     about: {
//       title: "America's Most Agile SAP Partner",
//       p1: "We are a high-growth SAP consultancy serving US enterprises from coast to coast. Our team of certified SAP architects and engineers helps American businesses innovate faster, operate leaner, and compete globally.",
//       p2: "From Fortune 500 corporations to Series-C scale-ups, we deliver SAP solutions engineered for American speed — aligned with SEC reporting, SOX compliance, US GAAP, and state-level regulatory requirements.",
//     },
//     pillars: [
//       {
//         icon: "★",
//         title: "SAP-Certified Engineers",
//         desc: "Top-tier architects with Fortune 500 deployment experience",
//       },
//       { icon: "⚡", title: "Move Fast, Stay Compliant", desc: "Rapid delivery aligned with SOX, HIPAA, and US GAAP" },
//       { icon: "◈", title: "Full-Stack SAP Coverage", desc: "ERP, CRM, analytics, integration — one seamless partner" },
//       { icon: "◎", title: "Transformational Results", desc: "40–55% efficiency gains across our US client base" },
//     ],
//     services: [
//       {
//         num: "01",
//         title: "SAP S/4HANA Transformation",
//         desc: "Enterprise-grade SAP deployments engineered for American scale — from rollout strategy to hypercare support.",
//         icon: "$",
//       },
//       {
//         num: "02",
//         title: "SAP Finance & SOX Compliance",
//         desc: "Financial solutions built around US GAAP, SEC reporting, and Sarbanes-Oxley audit trail requirements.",
//         icon: "◎",
//       },
//       {
//         num: "03",
//         title: "SAP Workforce Management",
//         desc: "HR and payroll solutions handling multi-state compliance, ACA, 401(k), and complex US labor law.",
//         icon: "◈",
//       },
//       {
//         num: "04",
//         title: "SAP Cloud Migration (RISE)",
//         desc: "Move your SAP landscape to the cloud with RISE with SAP — accelerated, secure, and cost-efficient.",
//         icon: "☁",
//       },
//       {
//         num: "05",
//         title: "SAP Analytics & AI",
//         desc: "Embed AI-driven insights across your SAP environment with real-time dashboards and predictive modeling.",
//         icon: "↗",
//       },
//     ],
//     stats: [
//       { num: "200+", label: "US Projects Delivered" },
//       { num: "30+", label: "Industries Served" },
//       { num: "24/7", label: "US Support Centers" },
//       { num: "100%", label: "SAP Certified Team" },
//     ],
//     cases: [
//       {
//         tag: "Technology",
//         metric: "−42%",
//         title: "Infrastructure Cost Reduction",
//         desc: "A Fortune 500 tech company eliminated 42% of SAP infrastructure costs through intelligent cloud migration and consolidation with RISE with SAP.",
//       },
//       {
//         tag: "Healthcare",
//         metric: "+52%",
//         title: "Operational Throughput Increase",
//         desc: "A national healthcare network increased operational throughput by 52% and achieved HIPAA compliance post SAP S/4HANA transformation.",
//       },
//       {
//         tag: "Consumer Goods",
//         metric: "$8.7M",
//         title: "Annual Value Delivered",
//         desc: "A leading CPG brand unlocked $8.7M in annual value through SAP supply chain optimisation and AI-powered demand forecasting.",
//       },
//     ],
//     why: [
//       {
//         title: "Deep US Regulatory Mastery",
//         desc: "Expert knowledge across SOX, SEC, HIPAA, US GAAP, and multi-state compliance frameworks",
//       },
//       {
//         title: "Coast-to-Coast Delivery Teams",
//         desc: "Consultants deployed across New York, San Francisco, Chicago, Dallas, Seattle, Atlanta and more",
//       },
//       {
//         title: "Fortune 500 Track Record",
//         desc: "200+ successful projects across tech, healthcare, finance, CPG, and manufacturing sectors",
//       },
//       {
//         title: "RISE with SAP Specialists",
//         desc: "Dedicated cloud migration practice accelerating SAP to cloud adoption with minimal risk",
//       },
//       {
//         title: "24/7 US-Based Support",
//         desc: "Dedicated support hubs in EST and PST time zones ensuring maximum coverage and zero downtime",
//       },
//     ],
//     coverage: {
//       title: "Serving Enterprises Across the United States",
//       desc: "With offices in major metro areas and remote delivery capacity nationwide, we go where American business needs us.",
//       regions: [
//         "New York",
//         "San Francisco",
//         "Chicago",
//         "Dallas",
//         "Seattle",
//         "Los Angeles",
//         "Boston",
//         "Atlanta",
//         "Miami",
//         "Denver",
//         "Austin",
//         "Washington DC",
//       ],
//     },
//     ctaTitle: "Ready to Drive Your American SAP Transformation?",
//     ctaDesc: "Join 200+ US enterprises that trust us to deliver SAP at scale — faster, smarter, and fully compliant.",
//     mapDots: [
//       { cx: 280, cy: 160, label: "New York" },
//       { cx: 100, cy: 175, label: "San Francisco" },
//       { cx: 220, cy: 155, label: "Chicago" },
//       { cx: 200, cy: 210, label: "Dallas" },
//       { cx: 110, cy: 140, label: "Seattle" },
//       { cx: 105, cy: 185, label: "LA" },
//       { cx: 285, cy: 150, label: "Boston" },
//       { cx: 260, cy: 200, label: "Atlanta" },
//       { cx: 270, cy: 230, label: "Miami" },
//       { cx: 165, cy: 165, label: "Denver" },
//     ],
//     mapShape:
//       "M60,100 L340,100 L360,130 L350,200 L300,240 L280,270 L230,280 L180,260 L150,270 L100,260 L60,230 L50,180 Z",
//   },
// }

// // ─── Hooks ────────────────────────────────────────────────────────────────────

// function useInView(options = {}) {
//   const ref = useRef(null)
//   const [isInView, setIsInView] = useState(false)
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsInView(true)
//           observer.disconnect()
//         }
//       },
//       { threshold: 0.1, ...options }
//     )
//     if (ref.current) observer.observe(ref.current)
//     return () => observer.disconnect()
//   }, [])
//   return [ref, isInView]
// }

// function useCounter(target, isActive, duration = 1800) {
//   const [count, setCount] = useState(0)
//   useEffect(() => {
//     if (!isActive) return
//     const num = parseInt(target.replace(/[^0-9]/g, ""))
//     if (!num) return
//     let start = 0
//     const step = num / (duration / 16)
//     const timer = setInterval(() => {
//       start += step
//       if (start >= num) {
//         setCount(num)
//         clearInterval(timer)
//       } else setCount(Math.floor(start))
//     }, 16)
//     return () => clearInterval(timer)
//   }, [isActive, target])
//   const prefix = target.match(/^[^0-9]*/)?.[0] || ""
//   const suffix = target.match(/[^0-9]*$/)?.[0] || ""
//   return `${prefix}${count}${suffix}`
// }

// // ─── Styles ───────────────────────────────────────────────────────────────────

// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');

//   * { box-sizing: border-box; }

//   @keyframes fadeUp {
//     from { opacity: 0; transform: translateY(40px); }
//     to { opacity: 1; transform: translateY(0); }
//   }
//   @keyframes fadeLeft {
//     from { opacity: 0; transform: translateX(-50px); }
//     to { opacity: 1; transform: translateX(0); }
//   }
//   @keyframes fadeRight {
//     from { opacity: 0; transform: translateX(50px); }
//     to { opacity: 1; transform: translateX(0); }
//   }
//   @keyframes scaleIn {
//     from { opacity: 0; transform: scale(0.88); }
//     to { opacity: 1; transform: scale(1); }
//   }
//   @keyframes lineGrow {
//     from { width: 0; }
//     to { width: 100%; }
//   }
//   @keyframes float {
//     0%, 100% { transform: translateY(0px); }
//     50% { transform: translateY(-12px); }
//   }
//   @keyframes pulse-ring {
//     0% { transform: scale(0.85); opacity: 0.8; }
//     70% { transform: scale(1.4); opacity: 0; }
//     100% { transform: scale(1.4); opacity: 0; }
//   }
//   @keyframes shimmer {
//     0% { background-position: -200% center; }
//     100% { background-position: 200% center; }
//   }
//   @keyframes rotateIn {
//     from { opacity: 0; transform: rotate(-10deg) scale(0.9); }
//     to { opacity: 1; transform: rotate(0) scale(1); }
//   }
//   @keyframes borderPulse {
//     0%, 100% { border-color: rgba(217, 20, 91, 0.3); }
//     50% { border-color: rgba(217, 20, 91, 0.8); }
//   }
//   @keyframes bgFloat {
//     0%, 100% { transform: translateY(0) rotate(0deg); }
//     33% { transform: translateY(-20px) rotate(2deg); }
//     66% { transform: translateY(10px) rotate(-1deg); }
//   }
//   @keyframes countrySwitch {
//     from { opacity: 0; transform: translateY(20px) scale(0.97); }
//     to { opacity: 1; transform: translateY(0) scale(1); }
//   }

//   .anim-up { animation: fadeUp 0.75s cubic-bezier(0.22,1,0.36,1) forwards; }
//   .anim-left { animation: fadeLeft 0.75s cubic-bezier(0.22,1,0.36,1) forwards; }
//   .anim-right { animation: fadeRight 0.75s cubic-bezier(0.22,1,0.36,1) forwards; }
//   .anim-scale { animation: scaleIn 0.6s cubic-bezier(0.22,1,0.36,1) forwards; }
//   .anim-rotate { animation: rotateIn 0.6s cubic-bezier(0.22,1,0.36,1) forwards; }
//   .country-switch { animation: countrySwitch 0.5s cubic-bezier(0.22,1,0.36,1) forwards; }

//   .d1 { animation-delay: 0.05s; }
//   .d2 { animation-delay: 0.12s; }
//   .d3 { animation-delay: 0.2s; }
//   .d4 { animation-delay: 0.3s; }
//   .d5 { animation-delay: 0.42s; }
//   .d6 { animation-delay: 0.55s; }

//   .float { animation: float 5s ease-in-out infinite; }
//   .float-slow { animation: float 8s ease-in-out infinite; }

//   .shimmer-text {
//     background: linear-gradient(90deg, #d9145b 0%, #ff6b9d 40%, #d9145b 60%, #9b0d3f 100%);
//     background-size: 200% auto;
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     background-clip: text;
//     animation: shimmer 3s linear infinite;
//   }

//   .card-glow:hover {
//     box-shadow: 0 0 0 1px rgba(217,20,91,0.3), 0 20px 60px rgba(217,20,91,0.12), 0 8px 25px rgba(0,0,0,0.08);
//   }

//   .pulse-dot::after {
//     content: '';
//     position: absolute;
//     top: 50%; left: 50%;
//     transform: translate(-50%, -50%);
//     width: 100%; height: 100%;
//     border-radius: 50%;
//     background: #d9145b;
//     animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
//   }

//   .bg-grid {
//     background-image: linear-gradient(rgba(217,20,91,0.04) 1px, transparent 1px),
//                       linear-gradient(90deg, rgba(217,20,91,0.04) 1px, transparent 1px);
//     background-size: 40px 40px;
//   }

//   .service-card:hover .service-num {
//     -webkit-text-fill-color: transparent;
//     background: linear-gradient(135deg, #d9145b, #ff6b9d);
//     -webkit-background-clip: text;
//     background-clip: text;
//   }

//   .animate-border { animation: borderPulse 2.5s ease-in-out infinite; }

//   .hero-bg-blob {
//     animation: bgFloat 12s ease-in-out infinite;
//   }

//   body { font-family: 'DM Sans', sans-serif; }
//   .font-display { font-family: 'Playfair Display', serif; }
// `

// // ─── Shared Components ────────────────────────────────────────────────────────

// function Label({ children }) {
//   return (
//     <div className="inline-flex items-center gap-3 mb-5">
//       <span className="w-6 h-px bg-[#d9145b]" />
//       <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#d9145b]">{children}</span>
//       <span className="w-6 h-px bg-[#d9145b]" />
//     </div>
//   )
// }

// function Btn({ children, href = "#contact", variant = "primary" }) {
//   if (variant === "primary")
//     return (
//       <a
//         href={href}
//         className="inline-flex items-center gap-2 bg-[#d9145b] hover:bg-[#b5104c] text-white font-semibold text-xs tracking-[0.15em] uppercase px-8 py-4 rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-[#d9145b]/40 hover:-translate-y-1 group"
//       >
//         {children}
//         <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
//       </a>
//     )
//   return (
//     <a
//       href={href}
//       className="inline-flex items-center gap-2 border border-slate-300 hover:border-[#d9145b] text-slate-600 hover:text-[#d9145b] font-semibold text-xs tracking-[0.15em] uppercase px-8 py-4 rounded-full transition-all duration-300 group"
//     >
//       {children}
//       <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
//     </a>
//   )
// }

// // ─── Country Switcher ─────────────────────────────────────────────────────────

// function CountrySwitcher({ active, onChange }) {
//   return (
//     <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-2xl p-1.5 shadow-2xl shadow-slate-200/60">
//       <div className="text-[9px] font-bold tracking-[0.15em] uppercase text-slate-400 px-2">Region</div>
//       {["uk", "us"].map((c) => (
//         <button
//           key={c}
//           onClick={() => onChange(c)}
//           className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 ${active === c ? "bg-[#d9145b] text-white shadow-lg shadow-[#d9145b]/30 scale-105" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"}`}
//         >
//           <span className="text-base">{COUNTRY_DATA[c].flag}</span>
//           {c.toUpperCase()}
//         </button>
//       ))}
//     </div>
//   )
// }

// // ─── Hero ────────────────────────────────────────────────────────────────────

// function Hero({ data }) {
//   const [ref, inView] = useInView()
//   return (
//     <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-white">
//       {/* Background layers */}
//       <div className="absolute inset-0 bg-grid opacity-60" />
//       <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-bl from-slate-50 to-transparent rounded-bl-[120px]" />
//       <div className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] bg-[#d9145b]/6 rounded-full blur-3xl hero-bg-blob" />
//       <div
//         className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-slate-100/80 rounded-full blur-3xl"
//         style={{ animationDelay: "4s" }}
//       />

//       {/* Floating decorative elements */}
//       <div className="absolute top-[20%] right-[8%] w-3 h-3 rounded-full bg-[#d9145b] float opacity-60" />
//       <div className="absolute top-[60%] right-[15%] w-2 h-2 rounded-full bg-[#d9145b]/40 float-slow" />
//       <div
//         className="absolute top-[40%] left-[3%] w-4 h-4 rounded-full border-2 border-[#d9145b]/30 float"
//         style={{ animationDelay: "2s" }}
//       />

//       <div ref={ref} className="relative z-10 w-full px-8 md:px-16 lg:px-28 py-24">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
//           {/* Left content */}
//           <div>
//             <div className={`${inView ? "anim-up d1" : "opacity-0"}`}>
//               <div className="inline-flex items-center gap-2.5 bg-[#d9145b]/8 border border-[#d9145b]/20 text-[#d9145b] text-[10px] font-bold tracking-[0.2em] uppercase px-5 py-2.5 rounded-full mb-7">
//                 <span className="text-base">{data.flag}</span>
//                 {data.heroLabel}
//               </div>
//             </div>

//             <h1
//               className={`font-display text-5xl md:text-6xl lg:text-[72px] font-black text-slate-900 leading-[1.05] mb-7 ${inView ? "anim-up d2" : "opacity-0"}`}
//             >
//               {data.tagline.split(" ").map((word, i) =>
//                 i === 1 ? (
//                   <span key={i} className="shimmer-text">
//                     {word}{" "}
//                   </span>
//                 ) : (
//                   `${word} `
//                 )
//               )}
//             </h1>

//             <p
//               className={`text-slate-500 text-lg leading-relaxed mb-10 max-w-xl ${inView ? "anim-up d3" : "opacity-0"}`}
//             >
//               {data.subtitle}
//             </p>

//             <div className={`flex flex-wrap gap-4 ${inView ? "anim-up d4" : "opacity-0"}`}>
//               <Btn>{data.ctaPrimary}</Btn>
//               <Btn variant="outline">{data.ctaSecondary}</Btn>
//             </div>

//             {/* Trust line */}
//             <div
//               className={`flex items-center gap-4 mt-12 pt-8 border-t border-slate-100 ${inView ? "anim-up d5" : "opacity-0"}`}
//             >
//               <div className="flex -space-x-2">
//                 {["bg-[#d9145b]", "bg-slate-700", "bg-slate-500", "bg-[#d9145b]/70"].map((c, i) => (
//                   <div
//                     key={i}
//                     className={`w-9 h-9 rounded-full ${c} border-2 border-white flex items-center justify-center text-white text-[10px] font-bold`}
//                   >
//                     {["JM", "SK", "AT", "+"][i]}
//                   </div>
//                 ))}
//               </div>
//               <div>
//                 <div className="text-sm font-semibold text-slate-800">Trusted by 200+ enterprises</div>
//                 <div className="text-xs text-slate-400">⭐⭐⭐⭐⭐ 4.9/5 average rating</div>
//               </div>
//             </div>
//           </div>

//           {/* Right stats grid */}
//           <div className={`${inView ? "anim-right d2" : "opacity-0"}`}>
//             <div className="grid grid-cols-2 gap-5">
//               {data.stats.map((s, i) => {
//                 const counted = useCounter(s.num, inView)
//                 return (
//                   <div
//                     key={i}
//                     className={`group bg-white rounded-2xl p-7 border border-slate-100 hover:border-[#d9145b]/30 card-glow transition-all duration-500 hover:-translate-y-2 anim-scale`}
//                     style={{ animationDelay: `${0.1 + i * 0.08}s` }}
//                   >
//                     <div className="font-display text-4xl font-black text-[#d9145b] mb-2 group-hover:scale-105 transition-transform duration-300">
//                       {counted}
//                     </div>
//                     <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">{s.label}</div>
//                   </div>
//                 )
//               })}
//               <div
//                 className="col-span-2 bg-gradient-to-r from-[#d9145b] to-[#9b0d3f] p-7 rounded-2xl shadow-2xl shadow-[#d9145b]/25 text-center text-white relative overflow-hidden anim-scale"
//                 style={{ animationDelay: "0.5s" }}
//               >
//                 <div className="absolute inset-0 opacity-10 bg-grid" />
//                 <div className="relative z-10">
//                   <div className="text-xl font-display font-bold mb-1">{data.badge}</div>
//                   <div className="text-white/70 text-sm">{data.badgeSub}</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// // ─── About ────────────────────────────────────────────────────────────────────

// function About({ data }) {
//   const [ref, inView] = useInView()
//   return (
//     <section ref={ref} id="about" className="bg-gradient-to-b from-slate-50/70 to-white py-24 px-8 md:px-16 lg:px-28">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-center mb-4">
//           <Label>About Us</Label>
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
//           <div className={inView ? "anim-left" : "opacity-0"}>
//             <h2 className="font-display text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
//               {data.about.title.split("SAP").map((part, i, arr) =>
//                 i < arr.length - 1 ? (
//                   <span key={i}>
//                     {part}
//                     <span className="text-[#d9145b]">SAP</span>
//                   </span>
//                 ) : (
//                   part
//                 )
//               )}
//             </h2>
//             <p className="text-slate-600 leading-relaxed mb-5 text-lg">{data.about.p1}</p>
//             <p className="text-slate-500 leading-relaxed">{data.about.p2}</p>
//             <div className="mt-10 flex items-center gap-5">
//               <div className="relative w-16 h-16 flex-shrink-0">
//                 <div className="w-16 h-16 bg-gradient-to-br from-[#d9145b] to-[#9b0d3f] rounded-2xl flex items-center justify-center shadow-xl shadow-[#d9145b]/30">
//                   <span className="text-white font-black text-lg tracking-tight">SAP</span>
//                 </div>
//               </div>
//               <div>
//                 <div className="font-bold text-slate-900 text-sm">SAP Gold Partner Certified</div>
//                 <div className="text-xs text-slate-400 mt-0.5">
//                   {data.flag} Authorised {data.name} Practice
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className={`grid gap-3 ${inView ? "anim-right" : "opacity-0"}`}>
//             {data.pillars.map((p, i) => (
//               <div
//                 key={p.title}
//                 className="group flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 hover:border-[#d9145b]/25 card-glow transition-all duration-400 hover:-translate-x-1 cursor-default"
//                 style={{ animationDelay: `${i * 0.08}s` }}
//               >
//                 <div className="w-11 h-11 bg-gradient-to-br from-[#d9145b] to-[#9b0d3f] rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg shadow-[#d9145b]/20 group-hover:scale-110 transition-transform duration-300">
//                   {p.icon}
//                 </div>
//                 <div>
//                   <strong className="block font-semibold text-slate-900 mb-1 text-sm">{p.title}</strong>
//                   <span className="text-sm text-slate-500">{p.desc}</span>
//                 </div>
//                 <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#d9145b] text-lg">
//                   →
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// // ─── Services ─────────────────────────────────────────────────────────────────

// function Services({ data }) {
//   const [ref, inView] = useInView()
//   return (
//     <section ref={ref} id="services" className="relative bg-[#0d0d14] py-24 px-8 md:px-16 lg:px-28 overflow-hidden">
//       <div className="absolute inset-0 bg-grid opacity-40" />
//       <div className="absolute top-0 right-0 w-96 h-96 bg-[#d9145b]/8 rounded-full blur-3xl" />
//       <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#d9145b]/5 rounded-full blur-3xl" />

//       <div className="relative z-10 max-w-7xl mx-auto">
//         <div className={`text-center mb-16 ${inView ? "anim-up" : "opacity-0"}`}>
//           <Label>What We Do</Label>
//           <h2 className="font-display text-4xl md:text-5xl font-black text-white leading-tight mt-2">
//             Our SAP <span className="text-[#d9145b]">Services</span>
//           </h2>
//           <p className="text-white/40 max-w-xl mx-auto mt-4 leading-relaxed">
//             Comprehensive SAP consulting tailored to {data.name}'s most demanding organisations.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//           {data.services.map((s, i) => (
//             <div
//               key={s.num}
//               className={`service-card group relative bg-white/4 border border-white/8 rounded-2xl p-8 hover:border-[#d9145b]/40 hover:bg-white/7 transition-all duration-500 hover:-translate-y-2 overflow-hidden cursor-default ${inView ? "anim-scale" : "opacity-0"}`}
//               style={{ animationDelay: `${i * 0.09}s` }}
//             >
//               <div className="absolute top-0 left-0 w-0.5 h-0 bg-gradient-to-b from-[#d9145b] to-transparent group-hover:h-full transition-all duration-600" />
//               <div
//                 className="absolute top-0 right-0 w-0 h-0.5 bg-gradient-to-l from-[#d9145b] to-transparent group-hover:w-full transition-all duration-600"
//                 style={{ transitionDelay: "0.1s" }}
//               />
//               <div className="service-num font-display text-7xl font-black text-white/10 leading-none mb-5 transition-all duration-300 group-hover:text-[#d9145b]/20">
//                 {s.num}
//               </div>
//               <h3 className="text-base font-semibold text-white mb-3 group-hover:text-white transition-colors">
//                 {s.title}
//               </h3>
//               <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/55 transition-colors">
//                 {s.desc}
//               </p>
//               <div className="mt-5 text-[#d9145b] text-xs font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
//                 Learn more →
//               </div>
//             </div>
//           ))}

//           {/* CTA card */}
//           <div
//             className={`bg-gradient-to-br from-[#d9145b]/15 to-[#d9145b]/5 border animate-border rounded-2xl p-8 flex flex-col justify-center ${inView ? "anim-scale" : "opacity-0"}`}
//             style={{ animationDelay: "0.6s" }}
//           >
//             <div className="w-14 h-14 bg-[#d9145b]/20 rounded-2xl flex items-center justify-center text-3xl mb-5">
//               💬
//             </div>
//             <h3 className="text-base font-semibold text-white mb-3">Need a Custom Solution?</h3>
//             <p className="text-sm text-white/50 leading-relaxed mb-6">
//               Every enterprise is unique. Talk to our {data.name} experts for a tailored SAP roadmap.
//             </p>
//             <a
//               href="#contact"
//               className="inline-block bg-[#d9145b] hover:bg-[#b5104c] text-white font-semibold text-xs tracking-wider uppercase px-6 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 text-center"
//             >
//               Talk to an Expert →
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// // ─── Coverage ─────────────────────────────────────────────────────────────────

// function Coverage({ data }) {
//   const [ref, inView] = useInView()
//   return (
//     <section
//       ref={ref}
//       id="coverage"
//       className="bg-gradient-to-br from-white via-slate-50/50 to-rose-50/30 py-24 px-8 md:px-16 lg:px-28"
//     >
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-center mb-4">
//           <Label>Our Reach</Label>
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
//           <div className={inView ? "anim-left" : "opacity-0"}>
//             <h2 className="font-display text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
//               {data.coverage.title.split(data.name).map((part, i, arr) =>
//                 i < arr.length - 1 ? (
//                   <span key={i}>
//                     {part}
//                     <span className="text-[#d9145b]">{data.name}</span>
//                   </span>
//                 ) : (
//                   part
//                 )
//               )}
//             </h2>
//             <p className="text-slate-500 leading-relaxed mb-8">{data.coverage.desc}</p>
//             <div className="flex flex-wrap gap-2">
//               {data.coverage.regions.map((r, i) => (
//                 <span
//                   key={r}
//                   className="group bg-white border border-slate-200 hover:border-[#d9145b]/40 text-slate-600 hover:text-[#d9145b] px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 cursor-default hover:shadow-md hover:shadow-[#d9145b]/8 hover:-translate-y-0.5"
//                   style={{ animationDelay: `${i * 0.05}s` }}
//                 >
//                   {r}
//                 </span>
//               ))}
//             </div>
//           </div>

//           <div className={`flex justify-center ${inView ? "anim-right" : "opacity-0"}`}>
//             <div className="relative w-full max-w-md aspect-square">
//               <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full">
//                 <defs>
//                   <radialGradient id="glow" cx="50%" cy="50%" r="50%">
//                     <stop offset="0%" stopColor="#d9145b" stopOpacity="0.15" />
//                     <stop offset="100%" stopColor="#d9145b" stopOpacity="0" />
//                   </radialGradient>
//                   <filter id="blur-sm">
//                     <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
//                   </filter>
//                 </defs>
//                 <ellipse cx="200" cy="200" rx="180" ry="180" fill="url(#glow)" />
//                 <path
//                   d={data.mapShape}
//                   fill="rgba(217, 20, 91, 0.04)"
//                   stroke="rgba(217, 20, 91, 0.15)"
//                   strokeWidth="1.5"
//                 />
//                 <g stroke="rgba(217, 20, 91, 0.2)" strokeWidth="1" fill="none" strokeDasharray="3,4">
//                   {data.mapDots
//                     .slice(0, 5)
//                     .map((d, i) =>
//                       data.mapDots
//                         .slice(i + 1, i + 3)
//                         .map((d2, j) => <line key={`${i}-${j}`} x1={d.cx} y1={d.cy} x2={d2.cx} y2={d2.cy} />)
//                     )}
//                 </g>
//                 {data.mapDots.map((dot, i) => (
//                   <g key={dot.label}>
//                     <circle cx={dot.cx} cy={dot.cy} r="14" fill="rgba(217,20,91,0.06)" />
//                     <circle cx={dot.cx} cy={dot.cy} r="5" fill="#d9145b" />
//                     <circle
//                       cx={dot.cx}
//                       cy={dot.cy}
//                       r="5"
//                       fill="#d9145b"
//                       opacity="0.5"
//                       style={{ animation: `pulse-ring 2.5s ${i * 0.3}s cubic-bezier(0.215,0.61,0.355,1) infinite` }}
//                     />
//                     <text
//                       x={dot.cx}
//                       y={dot.cy - 12}
//                       fill="#1e293b"
//                       fontSize="9"
//                       textAnchor="middle"
//                       fontFamily="DM Sans, sans-serif"
//                       fontWeight="600"
//                     >
//                       {dot.label}
//                     </text>
//                   </g>
//                 ))}
//               </svg>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// // ─── Case Studies ─────────────────────────────────────────────────────────────

// function CaseStudies({ data }) {
//   const [ref, inView] = useInView()
//   return (
//     <section ref={ref} id="cases" className="bg-white py-24 px-8 md:px-16 lg:px-28">
//       <div className="max-w-7xl mx-auto">
//         <div className={`text-center mb-16 ${inView ? "anim-up" : "opacity-0"}`}>
//           <Label>Proven Results</Label>
//           <h2 className="font-display text-4xl md:text-5xl font-black text-slate-900 leading-tight mt-2">
//             Real Impact. <span className="text-[#d9145b]">Real Numbers.</span>
//           </h2>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
//           {data.cases.map((c, i) => (
//             <div
//               key={c.title}
//               className={`group relative bg-white border border-slate-100 rounded-2xl p-8 overflow-hidden card-glow transition-all duration-500 hover:-translate-y-3 cursor-default ${inView ? "anim-scale" : "opacity-0"}`}
//               style={{ animationDelay: `${i * 0.12}s` }}
//             >
//               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#d9145b] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
//               <span className="inline-block bg-[#d9145b]/8 border border-[#d9145b]/15 text-[#d9145b] text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full mb-6">
//                 {c.tag}
//               </span>
//               <div className="font-display text-6xl font-black text-[#d9145b] leading-none mb-4 group-hover:scale-105 transition-transform duration-300">
//                 {c.metric}
//               </div>
//               <h3 className="text-base font-semibold text-slate-900 mb-4 pb-4 border-b border-slate-100">{c.title}</h3>
//               <p className="text-sm text-slate-500 leading-relaxed">{c.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// // ─── Why Us ───────────────────────────────────────────────────────────────────

// function WhyUs({ data }) {
//   const [ref, inView] = useInView()
//   return (
//     <section ref={ref} className="bg-gradient-to-b from-slate-50 to-white py-24 px-8 md:px-16 lg:px-28">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-center mb-4">
//           <Label>Why Choose Us</Label>
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
//           <div className={`order-2 lg:order-1 ${inView ? "anim-left" : "opacity-0"}`}>
//             <div className="relative bg-white border border-slate-100 rounded-3xl p-12 text-center overflow-hidden shadow-xl shadow-slate-200/40">
//               <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#d9145b]/5 rounded-full blur-2xl" />
//               <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-slate-100 rounded-full blur-xl" />
//               <div className="relative z-10">
//                 <div className="font-display text-9xl font-black text-[#d9145b]/10 leading-none mb-4">SAP</div>
//                 <div className="font-display text-2xl font-bold text-slate-900 mb-2">Gold Partner</div>
//                 <div className="text-sm text-slate-400 mb-2">
//                   {data.flag} {data.name} Certified Practice
//                 </div>
//                 <div className="inline-flex items-center gap-2 bg-[#d9145b]/8 border border-[#d9145b]/15 text-[#d9145b] text-xs font-bold px-4 py-2 rounded-full mb-8">
//                   ✓ Verified Partner Status
//                 </div>
//                 <div className="block">
//                   <Btn>Get Started Today</Btn>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className={`order-1 lg:order-2 ${inView ? "anim-right" : "opacity-0"}`}>
//             <h2 className="font-display text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-8">
//               Why Leading <span className="text-[#d9145b]">{data.name}</span> Enterprises Choose Us
//             </h2>
//             <div className="grid gap-3">
//               {data.why.map((w, i) => (
//                 <div
//                   key={w.title}
//                   className="group flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-2xl hover:border-[#d9145b]/25 card-glow transition-all duration-300 cursor-default"
//                   style={{ animationDelay: `${i * 0.08}s` }}
//                 >
//                   <div className="w-9 h-9 bg-gradient-to-br from-[#d9145b] to-[#9b0d3f] rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
//                     ✓
//                   </div>
//                   <div>
//                     <strong className="block font-semibold text-slate-900 mb-1 text-sm">{w.title}</strong>
//                     <span className="text-xs text-slate-500">{w.desc}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// // ─── Final CTA ────────────────────────────────────────────────────────────────

// function FinalCTA({ data }) {
//   const [ref, inView] = useInView()
//   return (
//     <section ref={ref} id="contact" className="relative overflow-hidden py-28 px-8 bg-white">
//       {/* Layered bg */}
//       <div className="absolute inset-0 bg-gradient-to-br from-rose-50/80 via-white to-slate-50/80" />
//       <div className="absolute inset-0 bg-grid opacity-30" />
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#d9145b]/5 rounded-full blur-3xl" />
//       <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full border border-[#d9145b]/10" />
//       <div className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full border border-[#d9145b]/8" />

//       <div className={`relative z-10 max-w-4xl mx-auto text-center ${inView ? "anim-up" : "opacity-0"}`}>
//         <Label>Get Started</Label>
//         <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-7 mt-4">
//           {data.ctaTitle.split("SAP").map((part, i, arr) =>
//             i < arr.length - 1 ? (
//               <span key={i}>
//                 {part}
//                 <span className="text-[#d9145b]">SAP</span>
//               </span>
//             ) : (
//               part
//             )
//           )}
//         </h2>
//         <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">{data.ctaDesc}</p>
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <a
//             href="#"
//             className="inline-flex items-center justify-center gap-2 bg-[#d9145b] hover:bg-[#b5104c] text-white font-bold tracking-[0.12em] uppercase px-10 py-5 rounded-2xl text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#d9145b]/30 group"
//           >
//             Book Free Consultation <span className="group-hover:translate-x-1 transition-transform">→</span>
//           </a>
//           <a
//             href="#"
//             className="inline-flex items-center justify-center gap-2 border-2 border-slate-200 hover:border-[#d9145b] text-slate-700 hover:text-[#d9145b] font-bold tracking-[0.12em] uppercase px-10 py-5 rounded-2xl text-sm transition-all duration-300 group"
//           >
//             Contact Us <span className="group-hover:translate-x-1 transition-transform">→</span>
//           </a>
//         </div>

//         {/* Trust badges */}
//         <div className="flex flex-wrap items-center justify-center gap-8 mt-14 pt-10 border-t border-slate-100">
//           {["SAP Gold Partner", "ISO 27001 Certified", "GDPR Compliant", "24/7 Support"].map((b, i) => (
//             <div key={b} className="flex items-center gap-2 text-sm text-slate-500">
//               <span className="text-[#d9145b]">✓</span>
//               <span className="font-medium">{b}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// // ─── Root ─────────────────────────────────────────────────────────────────────

// export default function SAPGlobalWebsite() {
//   const [country, setCountry] = useState("uk")
//   const [animKey, setAnimKey] = useState(0)
//   const data = COUNTRY_DATA[country]

//   const handleCountryChange = (c) => {
//     if (c === country) return
//     setCountry(c)
//     setAnimKey((k) => k + 1)
//     window.scrollTo({ top: 0, behavior: "smooth" })
//   }

//   return (
//     <div
//       className="min-h-screen font-sans antialiased"
//       key={animKey}
//       style={{ animation: "countrySwitch 0.5s cubic-bezier(0.22,1,0.36,1) forwards" }}
//     >
//       <style>{styles}</style>
//       <CountrySwitcher active={country} onChange={handleCountryChange} />
//       <Hero data={data} />
//       <About data={data} />
//       <Services data={data} />
//       <Coverage data={data} />
//       <CaseStudies data={data} />
//       <WhyUs data={data} />
//       <FinalCTA data={data} />
//     </div>
//   )
// }
