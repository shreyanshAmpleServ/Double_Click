import CTASection from "Components/AboutUsNew/CTASection"
import { useState, useEffect, useRef } from "react"

// ─── Intersection Observer hook for scroll reveals ───────────────────────────
function useReveal(threshold = 0.12) {
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

// ─── Data ────────────────────────────────────────────────────────────────────
const features = [
  {
    icon: "🎯",
    title: "Smart Lead Scoring",
    desc: "AI ranks leads by conversion probability so reps focus on contacts most likely to close. Scoring models adapt to your sales history automatically.",
  },
  {
    icon: "📊",
    title: "Visual Pipeline",
    desc: "Drag-and-drop deal boards with color-coded stages, revenue projections, and win-probability bands — complex forecasts made intuitive.",
  },
  {
    icon: "✉️",
    title: "Email Sequences",
    desc: "Multi-step outreach triggered by lead behavior or time delays. Track opens, clicks, and replies. A/B test subject lines in one click.",
  },
  {
    icon: "🔍",
    title: "Contact 360°",
    desc: "Every call, email, meeting, and purchase in a unified timeline. Enrichment keeps profiles current without manual effort from your team.",
  },
  {
    icon: "🤖",
    title: "AI Forecasting",
    desc: "Predictive models surface accurate revenue forecasts by analyzing win rates, rep behavior, and deal velocity. At-risk deals flagged automatically.",
  },
  {
    icon: "📈",
    title: "Revenue Analytics",
    desc: "Real-time dashboards track quota attainment, conversion rates, and cycle length. Drill down by rep, region, or product line.",
  },
  {
    icon: "🔗",
    title: "200+ Integrations",
    desc: "Native connectors for Slack, Gmail, Outlook, Zoom, and more. Webhooks and a REST API cover anything else without code.",
  },
  {
    icon: "🛡️",
    title: "Role-Based Access",
    desc: "Granular permissions keep sensitive deal data secure. Managers see everything; reps see their book — all configurable without dev help.",
  },
  {
    icon: "📱",
    title: "Mobile Field CRM",
    desc: "Full CRM power on iOS and Android. Log calls, scan cards, and update deals offline. Everything syncs the moment you reconnect.",
  },
]

const pipelineStages = [
  {
    title: "Prospecting & Capture",
    desc: "Auto-import leads from web forms, LinkedIn, and email campaigns. Assign owners and trigger welcome sequences instantly.",
  },
  {
    title: "Qualification & Discovery",
    desc: "BANT and MEDDIC frameworks guide reps through calls. AI summarizes notes and suggests next best actions.",
  },
  {
    title: "Proposal & Negotiation",
    desc: "Generate branded proposals in one click. Track when prospects open documents. Collaborate on contract terms in real time.",
  },
  {
    title: "Close & Won",
    desc: "E-signatures and payment collection built in. Closed deals trigger onboarding sequences and commissions automatically.",
  },
  {
    title: "Retention & Expansion",
    desc: "Post-sale health scores flag churn risk. Expansion opportunities surface based on usage data and renewal timelines.",
  },
]

const steps = [
  {
    n: "1",
    title: "Define Trigger",
    desc: "50+ triggers: new lead, stage change, email opened, deal age exceeded, or any custom event via webhooks.",
  },
  {
    n: "2",
    title: "Set Conditions",
    desc: "Filter by score, deal size, industry, or any custom field so the right action fires for exactly the right record.",
  },
  {
    n: "3",
    title: "Configure Actions",
    desc: "Send emails, assign tasks, notify Slack, update fields, or push data to any connected app — all without code.",
  },
  {
    n: "4",
    title: "Monitor & Iterate",
    desc: "Watch automation logs live. A/B test different paths, track conversion impact, and refine without engineering support.",
  },
]

const plans = [
  {
    name: "Starter",
    price: "₹2,499",
    period: "/mo",
    desc: "For small teams getting started",
    features: [
      "Up to 5 users",
      "10,000 contacts",
      "Basic pipeline",
      "Email integration",
      "Standard reports",
      "Mobile app",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Growth",
    price: "₹6,999",
    period: "/mo",
    desc: "For scaling teams that need automation & AI",
    features: [
      "Up to 25 users",
      "Unlimited contacts",
      "Custom pipelines",
      "Email sequences & automation",
      "AI lead scoring & forecasting",
      "Advanced analytics",
      "50+ integrations",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For large orgs with complex needs",
    features: [
      "Unlimited users",
      "Dedicated infrastructure",
      "Custom AI models",
      "SSO / SAML",
      "On-premise option",
      "99.9% SLA guarantee",
      "Dedicated CSM",
      "Custom onboarding",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

const testimonials = [
  {
    initials: "AR",
    name: "Arjun Reddy",
    role: "VP Sales, Fintech Startup",
    text: "Switching to DCC CRM cut our sales cycle by 22 days. The pipeline visibility alone was worth the investment — every rep knows exactly where every deal stands.",
  },
  {
    initials: "SM",
    name: "Shreya Mehta",
    role: "CRO, SaaS Platform",
    text: "The AI forecasting is scarily accurate. We've doubled our forecast precision and can now commit revenue to the board with genuine confidence every quarter.",
  },
  {
    initials: "KP",
    name: "Kabir Patel",
    role: "Head of Sales, E-commerce",
    text: "Our reps actually love using it. The mobile app is fast, the UI is clean, and they're logging calls on the go instead of catching up at end of day.",
  },
]

const faqs = [
  {
    q: "Can I migrate data from my existing CRM?",
    a: "Yes. We provide a white-glove migration service for Salesforce, HubSpot, Zoho, Pipedrive, and 30+ other platforms. Our team handles mapping, transformation, and validation so nothing gets lost.",
  },
  {
    q: "Is there a free trial?",
    a: "All plans include a 14-day free trial with full feature access and no credit card required. You can invite your entire team and run real deals during the trial period.",
  },
  {
    q: "How does the AI forecasting work?",
    a: "Our forecasting engine analyzes historical win rates, deal age, email engagement, meeting cadence, rep behavior patterns, and seasonal factors to produce stage-weighted probability scores for every open deal.",
  },
  {
    q: "Is my data secure?",
    a: "All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We're SOC 2 Type II certified, GDPR compliant, and store data in ISO 27001-certified data centers with daily automated backups.",
  },
  {
    q: "Can I customize the pipeline stages?",
    a: "Yes — on Growth and Enterprise plans you can create unlimited custom pipelines with any number of stages, each with their own required fields, automation triggers, and probability weightings.",
  },
]

const integrations = [
  { icon: "📧", name: "Gmail" },
  { icon: "💼", name: "Outlook" },
  { icon: "💬", name: "Slack" },
  { icon: "📹", name: "Zoom" },
  { icon: "🔧", name: "Zapier" },
  { icon: "🛒", name: "Shopify" },
  { icon: "💳", name: "Stripe" },
  { icon: "📊", name: "HubSpot" },
]

// ─── Sub-components ──────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return <p className="text-xs font-bold tracking-widest uppercase text-blue-600 mb-3">{children}</p>
}

function SectionTitle({ children }) {
  return <h2 className="text-3xl md:text-4xl font-extrabold !text-slate-900 leading-tight mb-4">{children}</h2>
}

function SectionSub({ children, center }) {
  return <p className={`text-slate-500 text-base leading-relaxed max-w-xl ${center ? "mx-auto" : ""}`}>{children}</p>
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function CRMPage() {
  const [activeStage, setActiveStage] = useState(0)
  const [openFaq, setOpenFaq] = useState(null)
  const [count, setCount] = useState({ deals: 0, revenue: 0, uptime: 0, rating: 0 })

  // Animated counters on mount
  useEffect(() => {
    const targets = { deals: 12400, revenue: 2.8, uptime: 98.7, rating: 4.9 }
    const duration = 1800
    const steps = 60
    const interval = duration / steps
    let step = 0
    const timer = setInterval(() => {
      step++
      const p = step / steps
      const ease = 1 - Math.pow(1 - p, 3)
      setCount({
        deals: Math.round(targets.deals * ease),
        revenue: +(targets.revenue * ease).toFixed(1),
        uptime: +(targets.uptime * ease).toFixed(1),
        rating: +(targets.rating * ease).toFixed(1),
      })
      if (step >= steps) clearInterval(timer)
    }, interval)
    return () => clearInterval(timer)
  }, [])

  const barHeights = [45, 60, 40, 75, 55, 90, 70, 100, 82, 95]

  return (
    <main className="bg-white font-sans overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-24 pb-16 px-6">
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59,130,246,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,.08) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        {/* Floating blobs */}
        <div
          className="absolute top-20 right-16 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ animation: "blobFloat 8s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-24 left-10 w-64 h-64 bg-indigo-200 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ animation: "blobFloat 10s ease-in-out infinite reverse" }}
        />

        <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div
              className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold px-4 py-2 rounded-full mb-7"
              style={{ animation: "fadeSlideDown 0.6s ease both" }}
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full" style={{ animation: "pulse 1.8s infinite" }} />
              #1 CRM for Growing Teams
            </div>
            <h1
              className="text-5xl md:text-6xl font-black !text-slate-900 leading-[1.05] mb-6"
              style={{ animation: "fadeSlideDown 0.7s ease 0.1s both" }}
            >
              Convert More Leads.
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Close More Deals.
              </span>
            </h1>
            <p
              className="text-slate-500 text-lg leading-relaxed mb-9 max-w-lg"
              style={{ animation: "fadeSlideDown 0.7s ease 0.2s both" }}
            >
              Streamline your entire customer journey — from first contact to loyal advocate — with AI-powered insights,
              automated workflows, and a 360° view of every relationship.
            </p>
            <div className="flex flex-wrap gap-4 mb-12" style={{ animation: "fadeSlideDown 0.7s ease 0.3s both" }}>
              <a
                href="#features"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5 transition-all duration-200"
              >
                Get Started Free →
              </a>
              <a
                href="#pipeline"
                className="border border-slate-200 bg-white text-slate-700 px-8 py-3.5 rounded-xl font-semibold text-sm hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                See Pipeline
              </a>
            </div>
            {/* Counter stats */}
            <div className="grid grid-cols-4 gap-4" style={{ animation: "fadeSlideDown 0.7s ease 0.4s both" }}>
              {[
                { val: `${count.deals.toLocaleString()}+`, label: "Active Companies" },
                { val: `$${count.revenue}B+`, label: "Revenue Tracked" },
                { val: `${count.uptime}%`, label: "Uptime SLA" },
                { val: `${count.rating}★`, label: "G2 Rating" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-xl font-black text-blue-600 tabular-nums">{s.val}</div>
                  <div className="text-xs text-slate-400 mt-1 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — live dashboard card */}
          <div style={{ animation: "fadeSlideUp 0.8s ease 0.3s both" }}>
            <div className="bg-white rounded-2xl shadow-2xl shadow-blue-100 border border-slate-100 overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-100 px-5 py-3.5 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="text-xs text-slate-400 ml-3 font-medium">Sales Dashboard — Q4 2025</span>
                <span className="ml-auto text-xs font-bold text-green-500 flex items-center gap-1">
                  <span
                    className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"
                    style={{ animation: "pulse 2s infinite" }}
                  />
                  LIVE
                </span>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { val: "$847K", lbl: "Pipeline" },
                    { val: "68%", lbl: "Quota" },
                    { val: "34", lbl: "Open Deals" },
                  ].map((k) => (
                    <div key={k.lbl} className="bg-slate-50 rounded-xl p-3">
                      <div className="text-xl font-black text-slate-800">{k.val}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{k.lbl}</div>
                    </div>
                  ))}
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Monthly Revenue</p>
                <div className="flex items-end gap-1.5 h-24">
                  {barHeights.map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm bg-gradient-to-t from-blue-600 to-indigo-400 opacity-80 hover:opacity-100 transition-opacity"
                      style={{
                        height: `${h}%`,
                        transitionDelay: `${i * 40}ms`,
                        animation: `barGrow 0.8s ease ${i * 60}ms both`,
                      }}
                    />
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  {[80, 60, 90].map((w, i) => (
                    <div key={i} className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-400 to-indigo-400"
                        style={{ width: `${w}%`, animation: `slideRight 1s ease ${0.5 + i * 0.15}s both` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Small floating deal card */}
            <div
              className="absolute -right-2 top-1/3 bg-white border border-slate-100 rounded-2xl shadow-xl px-5 py-4 text-center hidden xl:block"
              style={{ animation: "floatY 5s ease-in-out infinite" }}
            >
              <div className="text-2xl font-black !text-slate-900">$124K</div>
              <div className="text-xs text-slate-400 mt-1">Closed today</div>
              <div className="text-xs text-green-500 font-bold mt-1">↑ 18% vs yesterday</div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeSlideDown{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
          @keyframes fadeSlideUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
          @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
          @keyframes blobFloat{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(20px,-20px) scale(1.05)}}
          @keyframes barGrow{from{height:0;opacity:0}to{opacity:0.8}}
          @keyframes slideRight{from{width:0}to{}}
          @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.5)}}
        `}</style>
      </section>

      {/* ── TICKER ───────────────────────────────────────────────────────── */}
      <div className="bg-blue-600 overflow-hidden py-3 flex gap-0">
        <div className="flex whitespace-nowrap gap-0" style={{ animation: "ticker 24s linear infinite" }}>
          {[
            "Lead Management",
            "Sales Pipeline",
            "Email Automation",
            "Contact 360°",
            "AI Forecasting",
            "Deal Tracking",
            "Revenue Analytics",
            "Task Automation",
          ]
            .concat([
              "Lead Management",
              "Sales Pipeline",
              "Email Automation",
              "Contact 360°",
              "AI Forecasting",
              "Deal Tracking",
              "Revenue Analytics",
              "Task Automation",
            ])
            .map((t, i) => (
              <span key={i} className="text-blue-100 text-xs font-semibold mx-10">
                {t}
              </span>
            ))}
        </div>
        <style>{`@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      </div>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section id="features" className="py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-14">
            <SectionLabel>Core Features</SectionLabel>
            <SectionTitle>Everything You Need to Win Customers</SectionTitle>
            <SectionSub>
              Built for sales teams of all sizes — from solo founders to enterprise floors managing thousands of deals
              simultaneously.
            </SectionSub>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 60}>
                <div className="group bg-slate-50 border border-slate-100 rounded-2xl p-7 hover:border-blue-200 hover:bg-blue-50 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-blue-100 transition-all duration-300 cursor-default">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-2xl mb-5 group-hover:border-blue-300 group-hover:scale-110 transition-all duration-300 shadow-sm">
                    {f.icon}
                  </div>
                  <h3 className="!text-slate-900 font-bold text-base mb-2">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PIPELINE ─────────────────────────────────────────────────────── */}
      <section id="pipeline" className="py-28 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SectionLabel>Sales Pipeline</SectionLabel>
            <SectionTitle>
              Your Entire Sales Process,
              <br />
              In One Screen
            </SectionTitle>
            <SectionSub>
              Map your unique methodology to flexible stages. Move deals forward with drag-and-drop, then let automation
              handle the follow-up.
            </SectionSub>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mt-14 items-start">
            {/* Stage list */}
            <Reveal>
              <div className="space-y-1">
                {pipelineStages.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStage(i)}
                    className={`w-full text-left flex items-start gap-4 p-5 rounded-xl border transition-all duration-200 ${activeStage === i ? "bg-blue-600 border-blue-600 shadow-lg shadow-blue-200" : "bg-white border-slate-100 hover:border-blue-200 hover:bg-blue-50"}`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 transition-all ${activeStage === i ? "bg-white shadow-[0_0_0_4px_rgba(255,255,255,.25)]" : "bg-slate-300"}`}
                    />
                    <div>
                      <h4 className={`font-bold text-sm mb-1 ${activeStage === i ? "!text-white" : "!text-slate-800"}`}>
                        {s.title}
                      </h4>
                      <p
                        className={`text-sm leading-relaxed ${activeStage === i ? "!text-blue-100" : "!text-slate-500"}`}
                      >
                        {s.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </Reveal>

            {/* Mock dashboard */}
            <Reveal delay={100}>
              <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-100 px-5 py-3 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <span className="ml-3 text-xs text-slate-400 font-medium">Pipeline Board</span>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { v: "$847K", l: "Pipeline Value" },
                      { v: "68%", l: "Quota Attained" },
                      { v: "34", l: "Open Deals" },
                    ].map((k) => (
                      <div key={k.l} className="bg-slate-50 rounded-xl p-3 text-center">
                        <div className="text-lg font-black text-blue-600">{k.v}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{k.l}</div>
                      </div>
                    ))}
                  </div>
                  {pipelineStages.map((s, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 py-2.5 border-b border-slate-50 last:border-0 transition-all duration-200 ${activeStage === i ? "bg-blue-50 -mx-5 px-5 rounded-lg" : ""}`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full flex-shrink-0 ${activeStage === i ? "bg-blue-500" : "bg-slate-300"}`}
                      />
                      <span
                        className={`text-xs font-semibold flex-1 ${activeStage === i ? "text-blue-700" : "text-slate-500"}`}
                      >
                        {s.title}
                      </span>
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${activeStage === i ? "bg-blue-500" : "bg-slate-200"}`}
                          style={{ width: activeStage >= i ? `${[80, 65, 48, 30, 15][i]}%` : "0%" }}
                        />
                      </div>
                      <span
                        className={`text-xs font-bold w-10 text-right ${activeStage === i ? "text-blue-600" : "text-slate-400"}`}
                      >
                        {[80, 65, 48, 30, 15][i]}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── AUTOMATION ───────────────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <SectionLabel>Automation</SectionLabel>
            <SectionTitle>Set It Once, Run Forever</SectionTitle>
            <SectionSub center>
              Replace repetitive manual tasks with intelligent workflows that act in real time, so your team sells
              instead of shuffles paperwork.
            </SectionSub>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="relative bg-slate-50 border border-slate-100 rounded-2xl p-7 hover:shadow-lg hover:-translate-y-1 hover:border-blue-200 transition-all duration-300">
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 -right-3 text-slate-300 text-lg z-10">→</div>
                  )}
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-black text-base flex items-center justify-center mb-5 shadow-md shadow-blue-200">
                    {s.n}
                  </div>
                  <h4 className="font-bold !text-slate-900 text-sm mb-2">{s.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTEGRATIONS ─────────────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-14">
            <SectionLabel>Integrations</SectionLabel>
            <SectionTitle>Connects With Your Whole Stack</SectionTitle>
            <SectionSub center>
              200+ native integrations. If it's not listed, our Zapier connector and REST API cover the rest.
            </SectionSub>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {integrations.map((int, i) => (
              <Reveal key={int.name} delay={i * 50}>
                <div className="bg-white border border-slate-100 rounded-2xl p-4 text-center hover:border-blue-200 hover:-translate-y-1 hover:shadow-md hover:shadow-blue-100 transition-all duration-250 cursor-default">
                  <div className="text-3xl mb-2">{int.icon}</div>
                  <div className="text-xs font-semibold text-slate-500">{int.name}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <p className="text-slate-400 text-sm">
              And 192 more ·{" "}
              <a href="#" className="text-blue-600 font-semibold hover:underline">
                Browse all integrations →
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-14">
            <SectionLabel>Testimonials</SectionLabel>
            <SectionTitle>Trusted by Sales Teams Worldwide</SectionTitle>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-7 hover:shadow-lg hover:-translate-y-1 hover:border-blue-200 transition-all duration-300">
                  <div className="text-yellow-400 text-sm mb-4">★★★★★</div>
                  <p className="text-slate-600 text-sm leading-relaxed italic mb-6">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
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
      <CTASection />

      {/* <section className="py-16 px-6 bg-white">
        <Reveal>
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl px-12 py-16 text-center relative overflow-hidden shadow-2xl shadow-blue-200">
            <div
              className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle at 20% 50%,white 0%,transparent 50%)" }}
            />
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 relative">Ready to Close More Deals?</h2>
            <p className="text-blue-200 text-base mb-8 relative">
              Join 12,400+ companies growing with DCC CRM. Start your free 14-day trial today — no credit card required.
            </p>
            <a
              href="#"
              className="inline-block bg-white text-blue-600 font-bold text-sm px-10 py-4 rounded-xl hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200 relative"
            >
              Start Free Trial →
            </a>
          </div>
        </Reveal>
      </section> */}
    </main>
  )
}
