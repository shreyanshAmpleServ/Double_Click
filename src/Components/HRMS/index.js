import { useState, useEffect, useRef } from "react"

// ─── Intersection Observer hook ───────────────────────────────────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const modules = [
  {
    icon: "💰",
    color: "from-violet-100 to-purple-100",
    border: "group-hover:border-violet-300",
    title: "Payroll & Compliance",
    desc: "Process salaries, bonuses, and deductions automatically. TDS, PF, ESI, PT filing built in. One-click ITR-ready reports with every budget update auto-applied.",
    tags: ["Auto-Filing", "TDS", "PF/ESI"],
  },
  {
    icon: "🧲",
    color: "from-pink-100 to-rose-100",
    border: "group-hover:border-pink-300",
    title: "Recruitment & ATS",
    desc: "Publish to 40+ job boards, screen CVs with AI, schedule interviews, collect structured feedback, generate offer letters, and onboard — all in one flow.",
    tags: ["AI Screening", "Job Boards", "E-Offer"],
  },
  {
    icon: "🚀",
    color: "from-blue-100 to-indigo-100",
    border: "group-hover:border-blue-300",
    title: "Onboarding",
    desc: "Digital checklists, document collection, equipment requests, and buddy assignments ensure new hires are productive from Day 1. Custom workflows per role.",
    tags: ["Digital Docs", "Checklists", "eSign"],
  },
  {
    icon: "📅",
    color: "from-teal-100 to-emerald-100",
    border: "group-hover:border-teal-300",
    title: "Leave & Attendance",
    desc: "Configurable leave policies, geo-fenced attendance, biometric sync, shift scheduling, and overtime — all feeding directly into payroll every month.",
    tags: ["Geo-fence", "Biometric", "Shifts"],
  },
  {
    icon: "🎯",
    color: "from-orange-100 to-amber-100",
    border: "group-hover:border-orange-300",
    title: "Performance Management",
    desc: "Set OKRs and KRAs, run 360° feedback cycles, calibrate ratings, and tie outcomes directly to compensation planning and promotion decisions.",
    tags: ["OKR/KRA", "360°", "Calibration"],
  },
  {
    icon: "📚",
    color: "from-cyan-100 to-sky-100",
    border: "group-hover:border-cyan-300",
    title: "Learning & Development",
    desc: "Built-in LMS for courses, skill assessments, and certifications. Identify gaps via performance data and auto-recommend learning paths to each employee.",
    tags: ["LMS", "Skill Map", "Certifications"],
  },
  {
    icon: "💎",
    color: "from-violet-100 to-fuchsia-100",
    border: "group-hover:border-violet-300",
    title: "Compensation & Benefits",
    desc: "Salary benchmarking, pay bands, variable pay, equity tracking, and benefits admin with employee self-enrollment and live cost modeling dashboards.",
    tags: ["Benchmarking", "Equity", "Benefits"],
  },
  {
    icon: "📊",
    color: "from-slate-100 to-blue-100",
    border: "group-hover:border-slate-300",
    title: "HR Analytics",
    desc: "Attrition prediction, hiring funnel, DEI metrics, absenteeism trends, and a custom report builder. Export-ready data for CHRO decks in seconds.",
    tags: ["Attrition AI", "DEI", "Reports"],
  },
  {
    icon: "🔐",
    color: "from-green-100 to-emerald-100",
    border: "group-hover:border-green-300",
    title: "Employee Self-Service",
    desc: "Staff manage their own payslips, leave requests, expense claims, and tax declarations without HR involvement — freeing your team for strategic work.",
    tags: ["Mobile App", "Chatbot", "Expense"],
  },
]

const lifecycle = [
  {
    icon: "🎯",
    title: "Attract & Recruit",
    desc: "AI-powered job descriptions, multi-channel sourcing, structured interviews, and bias-reduced screening to hire top talent faster at lower cost per hire.",
  },
  {
    icon: "🚀",
    title: "Onboard & Engage",
    desc: "Welcome portals, digital paperwork, role-based training paths, and 30/60/90 check-ins so new hires feel at home and productive from week one.",
  },
  {
    icon: "📈",
    title: "Develop & Perform",
    desc: "Continuous feedback loops, skills development plans, and growth-oriented reviews replace annual performance anxiety with year-round clarity.",
  },
  {
    icon: "💰",
    title: "Pay & Reward",
    desc: "Real-time payroll, performance bonuses, recognition programs, and competitive benchmarking keep your team motivated and fairly compensated.",
  },
  {
    icon: "🔄",
    title: "Retain & Transition",
    desc: "Flight-risk alerts, internal mobility tools, and structured exit interviews minimize regrettable turnover and preserve institutional knowledge.",
  },
]

const payrollFeatures = [
  {
    icon: "⚡",
    title: "One-Click Processing",
    desc: "Process payroll for any headcount in seconds. Review, approve, and disburse with a full audit trail and direct bank integration.",
  },
  {
    icon: "🏛️",
    title: "Statutory Compliance",
    desc: "Auto-calculate and file TDS, PF, ESI, PT, and LWFS. Stays current with every union budget update without manual configuration.",
  },
  {
    icon: "📋",
    title: "Flexible Salary Structures",
    desc: "Design unlimited components — HRA, LTA, medical, performance pay — with tax optimization suggestions for each employee's bracket.",
  },
  {
    icon: "🌍",
    title: "Multi-State & Multi-Currency",
    desc: "Manage payroll across Indian states with varying PT slabs, or run international payroll in 40+ currencies for global teams.",
  },
  {
    icon: "📊",
    title: "Payslip & Tax Forms",
    desc: "Branded payslips delivered instantly. Form 16, Form 12BB, and IT-return packages generated with one click at year end.",
  },
  {
    icon: "🔄",
    title: "Reimbursements & Advances",
    desc: "Mobile claim submission, manager approval, bulk finance processing, and auto-reconciliation against payroll every cycle.",
  },
]

const compliance = [
  {
    icon: "🛡️",
    title: "SOC 2 Type II",
    desc: "Independently audited for security, availability, and confidentiality annually.",
  },
  {
    icon: "🔒",
    title: "AES-256 Encryption",
    desc: "All data encrypted at rest and in transit. Zero-knowledge architecture for sensitive records.",
  },
  {
    icon: "📜",
    title: "Labour Law Ready",
    desc: "Auto-updated for Shops & Estab., Factory Act, POSH, Gratuity, and Bonus Acts.",
  },
  {
    icon: "🌐",
    title: "PDPB / GDPR",
    desc: "Data residency controls, right-to-erasure workflows, and consent management built in.",
  },
  {
    icon: "🏢",
    title: "ISO 27001",
    desc: "Data centers carry ISO 27001 certification with a 99.95% uptime SLA guarantee.",
  },
  { icon: "📱", title: "MFA & SSO", desc: "Multi-factor auth, SAML-based SSO, and granular RBAC for every user role." },
]

const onboardingSteps = [
  {
    n: "1",
    title: "Discovery Call",
    desc: "We map your existing HR processes, identify gaps, and configure the platform to your org chart and policies before you touch a setting.",
  },
  {
    n: "2",
    title: "Data Migration",
    desc: "Upload employees, historical payroll, leave balances, and performance history from any spreadsheet or legacy HRMS. We validate every record.",
  },
  {
    n: "3",
    title: "Configure & Test",
    desc: "Set salary structures, leave policies, appraisal cycles, and workflows. Run a parallel payroll to verify accuracy before going live.",
  },
  {
    n: "4",
    title: "Go Live & Train",
    desc: "Roll out with live training sessions, help videos, and a dedicated success manager available on call for the first 90 days.",
  },
]

const testimonials = [
  {
    initials: "DM",
    name: "Divya Menon",
    role: "HR Director, 500-person IT firm",
    text: "Payroll used to take our team 4 days every month. With DCC HRMS it takes 40 minutes. The statutory compliance alone saved us from two potentially costly penalties.",
  },
  {
    initials: "VN",
    name: "Vikram Nair",
    role: "CHRO, D2C Brand",
    text: "The recruitment module is exceptional. We reduced time-to-hire by 38 days and our hiring managers actually enjoy the interview scheduling process now.",
  },
  {
    initials: "RS",
    name: "Ritu Singh",
    role: "People Lead, HealthTech Startup",
    text: "Employee self-service was a game changer. Our HR team handles strategy now, not payslip requests. Attrition is down 15% since we launched the performance module.",
  },
]

const plans = [
  {
    name: "Essentials",
    price: "₹199",
    period: "/emp/mo",
    desc: "For growing teams up to 100 employees",
    features: [
      "Core HR & Employee Database",
      "Payroll & Compliance",
      "Leave & Attendance",
      "Employee Self-Service",
      "Mobile App",
      "Standard Reports",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    price: "₹349",
    period: "/emp/mo",
    desc: "Full HR power for scaling organisations",
    features: [
      "Everything in Essentials",
      "Recruitment & ATS",
      "Performance Management",
      "Learning & Development",
      "HR Analytics & Insights",
      "Compensation Benchmarking",
      "Priority Support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "Bespoke solutions for large organisations",
    features: [
      "Everything in Professional",
      "Multi-entity & Multi-country",
      "Custom Workflows & Forms",
      "Dedicated HRIS Consultant",
      "API Access & Custom Integrations",
      "On-premise or Private Cloud",
      "99.95% SLA Guarantee",
    ],
    cta: "Talk to Sales",
    popular: false,
  },
]

const faqs = [
  {
    q: "Is DCC HRMS compliant with Indian labour laws?",
    a: "Yes. The platform is continuously updated for PF, ESI, PT, TDS, Bonus Act, Gratuity Act, POSH, and Shops & Establishments regulations across all states. You'll receive in-app notifications before every budget cycle change.",
  },
  {
    q: "Can we integrate with our existing ERP or accounting software?",
    a: "Absolutely. Native integrations exist for SAP, Oracle, Tally, QuickBooks, and Zoho Books. Our REST API and Zapier connector handle any custom connection without engineering effort.",
  },
  {
    q: "How long does implementation take?",
    a: "Most SMBs are live within 5–10 business days. Enterprise deployments with complex configurations typically take 3–6 weeks. Our implementation team handles everything and provides training before handover.",
  },
  {
    q: "Is employee data safe and private?",
    a: "All employee data is encrypted at rest (AES-256) and in transit (TLS 1.3). We're SOC 2 Type II certified, ISO 27001 compliant, and provide DPAs covering GDPR and India's PDPB requirements.",
  },
  {
    q: "Do employees need training to use self-service?",
    a: "The portal is designed for zero-training adoption. The mobile app takes under 5 minutes to learn. We also provide in-app tours and an AI chatbot that answers employee questions 24/7.",
  },
]

const employees = [
  {
    initials: "PR",
    name: "Priya Rao",
    role: "Engineering · Senior Dev",
    status: "Active",
    color: "from-violet-500 to-purple-600",
    badge: "bg-emerald-100 text-emerald-700",
  },
  {
    initials: "AK",
    name: "Aryan Kumar",
    role: "Design · UI Lead",
    status: "Remote",
    color: "from-pink-500 to-violet-500",
    badge: "bg-violet-100 text-violet-700",
  },
  {
    initials: "NS",
    name: "Nisha Sharma",
    role: "HR · People Ops",
    status: "Active",
    color: "from-teal-500 to-blue-500",
    badge: "bg-emerald-100 text-emerald-700",
  },
  {
    initials: "RJ",
    name: "Rohit Jain",
    role: "Finance · Analyst",
    status: "On Leave",
    color: "from-amber-400 to-pink-500",
    badge: "bg-amber-100 text-amber-700",
  },
]

// ─── Shared UI ─────────────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return <p className="text-xs font-bold tracking-widest uppercase text-violet-600 mb-3">{children}</p>
}
function SectionTitle({ children }) {
  return <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">{children}</h2>
}
function SectionSub({ children, center }) {
  return <p className={`text-slate-500 text-base leading-relaxed max-w-xl ${center ? "mx-auto" : ""}`}>{children}</p>
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function HRMSPage() {
  const [activeLC, setActiveLC] = useState(0)
  const [openFaq, setOpenFaq] = useState(null)
  const [counts, setCounts] = useState({ emp: 0, payroll: 0, accuracy: 0, rating: 0 })

  useEffect(() => {
    const targets = { emp: 1.2, payroll: 840, accuracy: 99.8, rating: 4.8 }
    let step = 0
    const total = 60
    const timer = setInterval(() => {
      step++
      const ease = 1 - Math.pow(1 - step / total, 3)
      setCounts({
        emp: +(targets.emp * ease).toFixed(1),
        payroll: Math.round(targets.payroll * ease),
        accuracy: +(targets.accuracy * ease).toFixed(1),
        rating: +(targets.rating * ease).toFixed(1),
      })
      if (step >= total) clearInterval(timer)
    }, 1800 / total)
    return () => clearInterval(timer)
  }, [])

  const deptData = [
    { label: "Engineering", pct: 72, color: "from-violet-500 to-purple-500" },
    { label: "Sales", pct: 55, color: "from-pink-500 to-rose-500" },
    { label: "Marketing", pct: 38, color: "from-teal-500 to-cyan-500" },
    { label: "Operations", pct: 45, color: "from-amber-400 to-orange-500" },
    { label: "HR & Finance", pct: 28, color: "from-blue-500 to-indigo-500" },
  ]

  return (
    <main className="bg-white font-sans overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-violet-50 to-fuchsia-50 pt-24 pb-16 px-6">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139,92,246,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,.07) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        {/* Blobs */}
        <div
          className="absolute top-16 right-20 w-96 h-96 bg-violet-200 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ animation: "blobDrift 9s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-20 left-8 w-72 h-72 bg-pink-200 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ animation: "blobDrift 11s ease-in-out infinite reverse" }}
        />

        <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Copy */}
          <div>
            <div
              className="inline-flex items-center gap-2 bg-violet-100 border border-violet-200 text-violet-700 text-xs font-bold px-4 py-2 rounded-full mb-7"
              style={{ animation: "slideDown 0.6s ease both" }}
            >
              <span className="w-2 h-2 bg-violet-500 rounded-full" style={{ animation: "pulseDot 2s infinite" }} />
              Modern HR Platform for 2025
            </div>
            <h1
              className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] mb-6"
              style={{ animation: "slideDown 0.7s ease 0.1s both" }}
            >
              Your People Are
              <br />
              <span className="bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                Your Greatest Asset
              </span>
            </h1>
            <p
              className="text-slate-500 text-lg leading-relaxed mb-9 max-w-lg"
              style={{ animation: "slideDown 0.7s ease 0.2s both" }}
            >
              Automate payroll, streamline recruitment, manage performance, and build a thriving culture — all from one
              unified platform designed for modern HR teams.
            </p>
            <div className="flex flex-wrap gap-4 mb-12" style={{ animation: "slideDown 0.7s ease 0.3s both" }}>
              <a
                href="#modules"
                className="bg-gradient-to-r from-violet-600 to-purple-700 text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-violet-200 hover:shadow-violet-300 hover:-translate-y-0.5 transition-all duration-200"
              >
                Request Free Demo →
              </a>
              <a
                href="#lifecycle"
                className="border border-slate-200 bg-white text-slate-700 px-8 py-3.5 rounded-xl font-semibold text-sm hover:border-violet-300 hover:bg-violet-50 transition-all duration-200"
              >
                Explore Modules
              </a>
            </div>
            {/* KPIs */}
            <div className="grid grid-cols-4 gap-4" style={{ animation: "slideDown 0.7s ease 0.4s both" }}>
              {[
                { val: `${counts.emp}M+`, label: "Employees Managed" },
                { val: `₹${counts.payroll}Cr+`, label: "Payroll / Month" },
                { val: `${counts.accuracy}%`, label: "Payroll Accuracy" },
                { val: `${counts.rating}★`, label: "Capterra Rating" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-xl font-black text-violet-600 tabular-nums">{s.val}</div>
                  <div className="text-xs text-slate-400 mt-1 font-medium leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Employee panel card */}
          <div style={{ animation: "slideUp 0.8s ease 0.3s both" }}>
            <div className="bg-white rounded-2xl shadow-2xl shadow-violet-100 border border-slate-100 overflow-hidden">
              {/* Panel header tabs */}
              <div className="flex border-b border-slate-100">
                {["Active (24)", "On Leave (3)", "Remote (8)"].map((tab, i) => (
                  <div
                    key={tab}
                    className={`flex-1 px-3 py-3 text-center text-xs font-semibold cursor-default transition-colors ${i === 0 ? "text-violet-600 border-b-2 border-violet-600 bg-violet-50" : "text-slate-400 hover:text-slate-600"}`}
                  >
                    {tab}
                  </div>
                ))}
              </div>
              <div className="p-5">
                {employees.map((e) => (
                  <div key={e.name} className="flex items-center gap-3 py-3 border-b border-slate-50 last:border-0">
                    <div
                      className={`w-9 h-9 rounded-full bg-gradient-to-br ${e.color} text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-sm`}
                    >
                      {e.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-800 truncate">{e.name}</div>
                      <div className="text-xs text-slate-400">{e.role}</div>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${e.badge}`}>
                      {e.status}
                    </span>
                  </div>
                ))}
                {/* Month summary */}
                <div className="mt-4 bg-slate-50 rounded-xl p-4 grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-slate-400 mb-0.5">Onboarded this month</div>
                    <div className="text-sm font-bold text-violet-600">4 employees</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-0.5">Payroll processed</div>
                    <div className="text-sm font-bold text-teal-600">₹48.2L</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes slideDown{from{opacity:0;transform:translateY(-18px)}to{opacity:1;transform:translateY(0)}}
          @keyframes slideUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
          @keyframes blobDrift{0%,100%{transform:translate(0,0)}50%{transform:translate(18px,-18px)}}
          @keyframes pulseDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(1.6)}}
        `}</style>
      </section>

      {/* ── TICKER ───────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-700 overflow-hidden py-3">
        <div className="flex whitespace-nowrap" style={{ animation: "tickerMove 26s linear infinite" }}>
          {[
            "Payroll Automation",
            "Leave Management",
            "Performance Reviews",
            "Recruitment ATS",
            "Employee Self-Service",
            "Compliance",
            "L&D",
            "Benefits Admin",
            "Time & Attendance",
            "Succession Planning",
          ]
            .concat([
              "Payroll Automation",
              "Leave Management",
              "Performance Reviews",
              "Recruitment ATS",
              "Employee Self-Service",
              "Compliance",
              "L&D",
              "Benefits Admin",
              "Time & Attendance",
              "Succession Planning",
            ])
            .map((t, i) => (
              <span key={i} className="text-violet-200 text-xs font-semibold mx-10">
                {t}
              </span>
            ))}
        </div>
        <style>{`@keyframes tickerMove{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      </div>

      {/* ── STAT BAR ─────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { val: "1.2M+", label: "Employees Managed", icon: "👥" },
            { val: "₹840Cr+", label: "Monthly Payroll", icon: "💸" },
            { val: "99.8%", label: "Payroll Accuracy", icon: "✅" },
            { val: "4.8★", label: "Capterra Rating", icon: "⭐" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 70}>
              <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-1 hover:border-violet-200 transition-all duration-300">
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="text-2xl font-black text-violet-600">{s.val}</div>
                <div className="text-xs text-slate-400 font-medium mt-1">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── MODULES ──────────────────────────────────────────────────────── */}
      <section id="modules" className="py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-14">
            <SectionLabel>Platform Modules</SectionLabel>
            <SectionTitle>Every HR Function, One Platform</SectionTitle>
            <SectionSub>
              12 integrated modules covering the entire employee lifecycle — no spreadsheets, no switching between
              tools, no data gaps between systems.
            </SectionSub>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((m, i) => (
              <Reveal key={m.title} delay={i * 55}>
                <div
                  className={`group bg-gradient-to-br ${m.color} border border-transparent rounded-2xl p-7 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 cursor-default ${m.border}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
                    {m.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">{m.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{m.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {m.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-semibold bg-white bg-opacity-70 text-violet-700 px-2.5 py-1 rounded-full border border-violet-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIFECYCLE ────────────────────────────────────────────────────── */}
      <section id="lifecycle" className="py-28 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SectionLabel>Employee Lifecycle</SectionLabel>
            <SectionTitle>
              From Hire to Retire,
              <br />
              Seamlessly Managed
            </SectionTitle>
            <SectionSub>
              Every stage of the employee journey is connected. Data flows automatically between modules so nothing
              falls through the cracks.
            </SectionSub>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mt-14 items-start">
            {/* Stage list */}
            <Reveal>
              <div className="space-y-3">
                {lifecycle.map((lc, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveLC(i)}
                    className={`w-full text-left flex items-start gap-4 p-5 rounded-xl border transition-all duration-250 ${activeLC === i ? "bg-violet-600 border-violet-600 shadow-lg shadow-violet-200" : "bg-white border-slate-100 hover:border-violet-200 hover:bg-violet-50"}`}
                  >
                    <span className="text-2xl flex-shrink-0 mt-0.5">{lc.icon}</span>
                    <div>
                      <h4 className={`font-bold text-sm mb-1 ${activeLC === i ? "!text-white" : "!text-slate-800"}`}>
                        {lc.title}
                      </h4>
                      <p
                        className={`text-sm leading-relaxed ${activeLC === i ? "!text-violet-100" : "!text-slate-500"}`}
                      >
                        {lc.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </Reveal>

            {/* Workforce dashboard */}
            <Reveal delay={100}>
              <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-100 px-5 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    <span className="text-xs text-slate-400 ml-2 font-medium">Workforce Overview — June 2025</span>
                  </div>
                  <span className="text-xs font-bold text-violet-500 flex items-center gap-1">
                    <span
                      className="w-1.5 h-1.5 bg-violet-500 rounded-full inline-block"
                      style={{ animation: "pulseDot 2s infinite" }}
                    />
                    LIVE
                  </span>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {[
                      { v: "248", l: "Total Headcount" },
                      { v: "12", l: "Open Positions" },
                      { v: "96%", l: "Satisfaction" },
                      { v: "8.2%", l: "Attrition Rate" },
                    ].map((k) => (
                      <div key={k.l} className="bg-slate-50 rounded-xl p-3 text-center">
                        <div className="text-xl font-black text-violet-600">{k.v}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{k.l}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                    Department Distribution
                  </p>
                  <div className="space-y-3">
                    {deptData.map((d) => (
                      <div key={d.label} className="flex items-center gap-3">
                        <span className="text-xs text-slate-500 w-24 flex-shrink-0">{d.label}</span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${d.color}`}
                            style={{ width: `${d.pct}%`, transition: "width 1.2s ease" }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-600 w-8 text-right">{d.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PAYROLL ──────────────────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <SectionLabel>Payroll</SectionLabel>
            <SectionTitle>Payroll That Just Works</SectionTitle>
            <SectionSub center>
              Error-free, compliant, and on time — every time. Our payroll engine handles complexity so your HR team
              doesn't have to.
            </SectionSub>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {payrollFeatures.map((f, i) => (
              <Reveal key={f.title} delay={i * 65}>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-7 hover:border-violet-200 hover:bg-violet-50 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-100 transition-all duration-300">
                  <div className="text-3xl mb-4">{f.icon}</div>
                  <h3 className="font-bold text-slate-900 text-sm mb-2">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPLIANCE ───────────────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-14">
            <SectionLabel>Compliance & Security</SectionLabel>
            <SectionTitle>Built for Trust</SectionTitle>
            <SectionSub center>
              HR data is sensitive. Every layer of the platform was built with security and regulatory compliance as a
              first principle — not an afterthought.
            </SectionSub>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {compliance.map((c, i) => (
              <Reveal key={c.title} delay={i * 60}>
                <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center hover:border-violet-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-100 transition-all duration-300">
                  <div className="text-3xl mb-3">{c.icon}</div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1">{c.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMPLEMENTATION STEPS ─────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-16">
            <SectionLabel>Getting Started</SectionLabel>
            <SectionTitle>Up and Running in Days, Not Months</SectionTitle>
            <SectionSub center>
              Our dedicated implementation team handles migration, configuration, and training. Most customers are live
              in under 2 weeks.
            </SectionSub>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {onboardingSteps.map((s, i) => (
              <Reveal
                className="bg-slate-50 border border-slate-100 rounded-2xl p-7 hover:shadow-lg hover:-translate-y-2 hover:border-violet-200 transition-all duration-300"
                key={s.title}
                // delay={i * 80}
              >
                <div className="relative">
                  {i < onboardingSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 -right-3 text-slate-300 text-lg z-10">→</div>
                  )}
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-600 to-purple-700 text-white font-black text-base flex items-center justify-center mb-5 shadow-md shadow-violet-200">
                    {s.n}
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-2">{s.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-14">
            <SectionLabel>Customer Stories</SectionLabel>
            <SectionTitle>HR Teams Love DCC HRMS</SectionTitle>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <div className="bg-white border border-slate-100 rounded-2xl p-7 hover:shadow-lg hover:-translate-y-1 hover:border-violet-200 transition-all duration-300">
                  <div className="text-yellow-400 text-sm mb-4">★★★★★</div>
                  <p className="text-slate-600 text-sm leading-relaxed italic mb-6">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-purple-700 text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">{t.name}</div>
                      <div className="text-xs text-slate-400">{t.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-white">
        <Reveal>
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-violet-600 via-purple-700 to-fuchsia-700 rounded-3xl px-12 py-16 text-center relative overflow-hidden shadow-2xl shadow-violet-200">
            <div
              className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle at 20% 50%,white 0%,transparent 50%)" }}
            />
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 relative">
              Ready to Transform Your HR?
            </h2>
            <p className="!text-violet-200 text-base mb-8 relative">
              Join 8,000+ companies managing their workforce with DCC HRMS. Request a personalised demo today.
            </p>
            <a
              href="#"
              className="inline-block bg-white text-violet-700 font-bold text-sm px-10 py-4 rounded-xl hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200 relative"
            >
              Request Free Demo →
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
