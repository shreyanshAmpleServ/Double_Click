import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, AnimatePresence } from "framer-motion"
import { useMutation, useQuery } from "react-query"
import toast from "react-hot-toast"
import ReCaptchaCheckbox from "Components/Contact/ReCaptcha"
import { addQuoteFn, footerServiceFn, mainServiceFn, reqQuoteFn } from "Services/Home"

gsap.registerPlugin(ScrollTrigger)

/* ─── Font & Style injection ─── */
if (!document.getElementById("quotes-font")) {
  const l = document.createElement("link")
  l.id = "quotes-font"
  l.href =
    "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap"
  l.rel = "stylesheet"
  document.head.appendChild(l)
}

if (!document.getElementById("quotes-styles")) {
  const s = document.createElement("style")
  s.id = "quotes-styles"
  s.textContent = `
    @keyframes qFloatA { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-12px) rotate(3deg)} }
    @keyframes qFloatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px) rotate(-4deg)} }
    @keyframes qPulseRing { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(2.2);opacity:0} }
    @keyframes qSpinSlow { to{transform:rotate(360deg)} }
    @keyframes qBlob { 0%,100%{border-radius:60% 40% 70% 30%/50% 60% 40% 70%} 50%{border-radius:40% 60% 30% 70%/60% 40% 70% 30%} }
    @keyframes qShimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
    @keyframes qGradShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
    @keyframes qOrbit { from{transform:rotate(0deg) translateX(80px) rotate(0deg)} to{transform:rotate(360deg) translateX(80px) rotate(-360deg)} }
    @keyframes qOrbitB { from{transform:rotate(180deg) translateX(55px) rotate(-180deg)} to{transform:rotate(540deg) translateX(55px) rotate(-540deg)} }
    @keyframes qCountUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

    .q-playfair { font-family: 'Playfair Display', Georgia, serif; }
    .q-dm { font-family: 'DM Sans', system-ui, sans-serif; }
    .q-label { font-family: 'DM Sans', system-ui, sans-serif; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 700; }
    .q-float-a { animation: qFloatA 5s ease-in-out infinite; }
    .q-float-b { animation: qFloatB 6.5s ease-in-out infinite; }
    .q-spin { animation: qSpinSlow 18s linear infinite; }
    .q-blob { animation: qBlob 8s ease-in-out infinite; }
    .q-orbit { animation: qOrbit 9s linear infinite; }
    .q-orbit-b { animation: qOrbitB 13s linear infinite; }
    .q-shimmer-bar { background: linear-gradient(120deg,#e11d48,#ef4444,#fb7185,#e11d48); background-size:300% auto; animation: qShimmer 3s linear infinite; }
    .q-bg-grad { background: linear-gradient(140deg,#fff8f6,#fff5f0,#fdf4ff,#f0f9ff); background-size:400% 400%; animation: qGradShift 12s ease infinite; }

    .q-input {
      font-family: 'DM Sans', system-ui, sans-serif;
      width: 100%;
      padding: 12px 16px;
      border: 2px solid #e5e7eb;
      border-radius: 14px;
      font-size: 14px;
      color: #1f2937;
      background: rgba(255,255,255,0.75);
      transition: border-color .25s, box-shadow .25s, background .25s;
      outline: none;
    }
    .q-input::placeholder { color: #9ca3af; }
    .q-input:hover:not(:focus) { border-color: #fca5a5; }
    .q-input:focus { border-color: #e11d48; box-shadow: 0 0 0 4px rgba(220,38,38,.10); background: #fff; }
    .q-input.error { border-color: #f87171; background: #fff5f5; }
    .q-input::-webkit-scrollbar { width: 4px; }
    .q-input::-webkit-scrollbar-track { background: transparent; }
    .q-input::-webkit-scrollbar-thumb { background: #fca5a5; border-radius: 99px; }

    .q-select-wrap { position: relative; }
    .q-select-wrap::after {
      content: '';
      position: absolute;
      right: 14px;
      top: 50%;
      transform: translateY(-50%);
      width: 10px;
      height: 10px;
      border-right: 2px solid #e11d48;
      border-bottom: 2px solid #e11d48;
      transform: translateY(-65%) rotate(45deg);
      pointer-events: none;
    }

    .q-badge { backdrop-filter: blur(14px); animation: qFloatB 5s ease-in-out infinite; }
    .q-badge-b { backdrop-filter: blur(14px); animation: qFloatA 6.5s ease-in-out infinite; }
    .q-ring { animation: qPulseRing 3s ease-out infinite; }
    .q-ring-d { animation: qPulseRing 3s ease-out infinite; animation-delay: 1s; }

    .q-card-shadow {
      box-shadow:
        0 40px 100px rgba(220,38,38,.16),
        0 10px 40px rgba(0,0,0,.08),
        inset 0 0 0 1px rgba(255,255,255,.7);
    }

    .q-submit-btn {
      background: linear-gradient(135deg, #e11d48 0%, #b91c1c 100%);
      box-shadow: 0 8px 30px rgba(220,38,38,.40), 0 2px 8px rgba(0,0,0,.1);
      transition: box-shadow .3s, transform .2s;
    }
    .q-submit-btn:hover:not(:disabled) {
      box-shadow: 0 12px 40px rgba(220,38,38,.55), 0 4px 12px rgba(0,0,0,.12);
      transform: translateY(-2px);
    }
    .q-submit-btn:active:not(:disabled) { transform: translateY(0); }
    .q-submit-btn:disabled { background: #d1d5db; box-shadow: none; cursor: not-allowed; opacity: 0.6; }
  `
  document.head.appendChild(s)
}

/* ─── Helpers ─── */
const initialise = { email: "", name: "", phone: "", message: "", service: "" }
const initialErrors = { email: "", name: "", phone: "", message: "", service: "" }

const Blob = ({ style, delay = "0s" }) => (
  <div className="q-blob absolute pointer-events-none" style={{ ...style, animationDelay: delay }} />
)

const FloatingBadge = ({ icon, label, value, cls, style }) => (
  <div
    className={`absolute z-20 bg-white/85 rounded-2xl shadow-lg px-3 py-2.5 flex items-center gap-2.5 border border-rose-100 ${cls}`}
    style={style}
  >
    <span className="text-xl leading-none">{icon}</span>
    <div>
      <div className="q-label text-rose-400" style={{ fontSize: 9 }}>
        {label}
      </div>
      <div className="q-dm text-xs font-bold text-gray-800 mt-0.5">{value}</div>
    </div>
  </div>
)

/* Field animation variants */
const fv = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07 + 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
}

const Field = ({ label, error, index, emoji, children }) => (
  <motion.div custom={index} variants={fv} initial="hidden" animate="show">
    <label className="q-label text-rose-500 flex items-center gap-1.5 mb-1.5 pl-0.5">
      <span className="text-sm">{emoji}</span>
      {label}
    </label>
    {children}
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          className="q-dm text-rose-500 text-xs mt-1.5 pl-0.5 font-medium"
        >
          ⚠ {error}
        </motion.p>
      )}
    </AnimatePresence>
  </motion.div>
)

/* ══════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════ */
const Quotes = () => {
  const baseURL = process.env.REACT_APP_API_URL
  const [formData, setFormData] = useState(initialise)
  const [errors, setErrors] = useState(initialErrors)
  const [submitted, setSubmitted] = useState(false)
  const [captchaStatus, setCaptchaStatus] = useState(false)
  const recaptchaRef = useRef(null)
  const sectionRef = useRef(null)
  const cardRef = useRef(null)

  /* ── Queries ── */
  const { data: mainServiceData } = useQuery(["main-service"], mainServiceFn)
  const { data: quoteLeftData } = useQuery(["QuoteLeftDetails"], footerServiceFn)

  const serviceOptions =
    mainServiceData?.data?.data?.[0]?.details?.map((i) => ({
      label: i?.title,
      value: i?.title,
    })) || []

  const findData = (key) => quoteLeftData?.data?.data?.find((item) => item.key === key)
  const imageUrl = baseURL + findData("quote_form_left_side")?.singleMedia?.url

  /* ── GSAP scroll animation ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 70,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  /* ── Handlers ── */
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const validate = () => {
    const n = {}
    if (!formData.name.trim()) n.name = "Name is required"
    if (!formData.email.trim()) n.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) n.email = "Enter a valid email"
    if (!formData.phone.trim()) n.phone = "Phone is required"
    if (!formData.service) n.service = "Please select a service"
    if (!formData.message.trim()) n.message = "Message is required"
    else if (formData.message.trim().length < 10) n.message = "At least 10 characters required"
    setErrors(n)
    return Object.keys(n).length === 0
  }

  const { mutate: addQuote, isLoading: isAdding } = useMutation(reqQuoteFn, {
    onSuccess: () => {
      setSubmitted(true)
      toast.success("🎉 Quote submitted! We'll be in touch soon.")
      setFormData(initialise)
      setCaptchaStatus(false)
    },
    onError: () => toast.error("Something went wrong. Please try again."),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!captchaStatus) {
      toast.error("Please complete the reCAPTCHA verification")
      return
    }
    if (validate()) {
      addQuote({ data: formData })
    } else {
      toast.error("Please fix the errors below")
    }
  }

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-16 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #fff 0%, #fff1f2 50%, #fff 100%)" }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-10 right-20 w-80 h-80 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #e11d48, transparent)", filter: "blur(60px)" }}
        />
        <div
          className="absolute bottom-20 left-10 w-64 h-64 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #e11d48, transparent)", filter: "blur(50px)" }}
        />
        <div
          className="q-spin absolute top-16 right-40 w-20 h-20 rounded-full border-[2px] border-dashed border-rose-200/60"
          style={{ top: "5%", right: "8%" }}
        />
        <div
          className="q-spin absolute w-12 h-12 rounded-full border-[2px] border-dashed border-rose-300/40"
          style={{ bottom: "12%", left: "5%", animationDirection: "reverse", animationDuration: "14s" }}
        />
      </div>

      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-14 relative"
      >
        {/* <span className="q-label text-rose-400 tracking-widest">Request A</span> */}
        <h2 className="q-playfair text-4xl md:text-5xl font-black text-gray-900 mt-2 mb-3">
          Free{" "}
          <span
            className="italic"
            style={{
              background: "linear-gradient(135deg, #e11d48 0%, #fb7185 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Quote
          </span>
        </h2>
        <p className="q-dm text-gray-400 text-sm max-w-xs mx-auto leading-relaxed">
          Tell us about your project and we'll craft the perfect solution.
        </p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="w-8 h-[2px] rounded-full bg-rose-500" />
          <div className="w-2 h-2 rounded-full bg-rose-400" />
          <div className="w-8 h-[2px] rounded-full bg-rose-500" />
        </div>
      </motion.div>

      {/* Main Card */}
      <div
        ref={cardRef}
        className="q-card-shadow max-w-6xl mx-auto rounded-[28px] overflow-hidden flex flex-col lg:flex-row relative"
        style={{ background: "#fff" }}
      >
        {/* Success Overlay */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-[28px] px-10"
              style={{ background: "linear-gradient(135deg, #fff5f3, #fdf4ff)" }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-8xl mb-6 select-none"
              >
                🎉
              </motion.div>
              <h3 className="q-playfair text-4xl font-black text-gray-800 mb-3 text-center">Quote Sent!</h3>
              <p className="q-dm text-gray-500 text-center max-w-xs text-sm leading-relaxed">
                Our team will review and reply within <span className="text-rose-500 font-semibold">24 hours</span> with
                a tailored proposal.
              </p>
              <div className="mt-8 w-40 h-1.5 rounded-full bg-rose-100 overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3.2, ease: "linear" }}
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #e11d48, #fb7185)" }}
                />
              </div>
              <p className="q-dm text-xs text-gray-400 mt-2">Closing automatically…</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══ LEFT PANEL ══ */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex lg:w-[42%] relative flex-col justify-between overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #fff1f2 0%, #ffe4e6 50%, #fecdd3 100%)",
            minHeight: 560,
          }}
        >
          {/* Blobs */}
          <Blob
            style={{
              width: 260,
              height: 260,
              background: "radial-gradient(circle, #fda4af, #e11d48)",
              top: -80,
              right: -80,
              opacity: 0.4,
            }}
          />
          <Blob
            style={{
              width: 180,
              height: 180,
              background: "radial-gradient(circle, #fb7185, #e11d48)",
              bottom: 50,
              left: -60,
              opacity: 0.3,
            }}
            delay="2.5s"
          />
          <Blob
            style={{
              width: 110,
              height: 110,
              background: "radial-gradient(circle, #ffe4e6, #fb7185)",
              top: "45%",
              right: 15,
              opacity: 0.25,
            }}
            delay="1.5s"
          />

          {/* Spinning rings */}
          <div className="q-spin absolute top-5 right-5 w-20 h-20 rounded-full border-[2.5px] border-dashed border-rose-300/60" />
          <div
            className="q-spin absolute bottom-8 left-5 w-12 h-12 rounded-full border-[2.5px] border-dashed border-rose-300/50"
            style={{ animationDirection: "reverse", animationDuration: "12s" }}
          />

          {/* Orbiting dots */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 pointer-events-none">
            <div className="q-orbit absolute w-4 h-4 rounded-full bg-rose-500 shadow-lg" />
            <div className="q-orbit-b absolute w-3 h-3 rounded-full bg-rose-400 shadow-md" />
          </div>

          {/* Image / Illustration */}
          <div className="relative z-10 flex justify-center pt-10 px-6">
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              {imageUrl && !imageUrl.endsWith("undefined") ? (
                <img src={imageUrl} alt="Quote illustration" className="w-52 h-52 object-contain drop-shadow-2xl" />
              ) : (
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <div className="q-ring absolute inset-0 rounded-full border-4 border-rose-400/40" />
                  <div className="q-ring-d absolute inset-0 rounded-full border-4 border-rose-300/30" />
                  <div className="absolute inset-4 rounded-full bg-rose-100/60 q-float-b" />
                  <div className="absolute inset-8 rounded-full bg-rose-200/50 q-float-a" />
                  <span className="q-float-a text-6xl select-none relative z-10">💼</span>
                </div>
              )}
            </motion.div>
          </div>

          {/* Floating badges */}
          <FloatingBadge
            icon="⚡"
            label="Avg. Response"
            value="< 12 Hours"
            cls="q-badge"
            style={{ top: 200, left: 12 }}
          />
          <FloatingBadge
            icon="⭐"
            label="Client Rating"
            value="4.9 / 5.0"
            cls="q-badge-b"
            style={{ top: 210, right: 8 }}
          />

          {/* Bottom copy */}
          <div className="relative z-10 px-8 pb-10 pt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-0.5 rounded-full bg-rose-500 block" />
              <span className="q-label text-rose-500">Free Consultation</span>
            </div>
            <h2 className="q-playfair text-[1.9rem] font-black text-gray-800 leading-tight mb-3">
              Let's Build
              <br />
              <span className="text-rose-500 italic">Something</span>
              <br />
              Remarkable
            </h2>
            <p className="q-dm text-gray-500 text-sm leading-relaxed max-w-[210px]">
              Tell us your vision and we'll craft the perfect solution for your business.
            </p>

            {/* Mini stats */}
            <div className="flex gap-5 mt-6 pt-5 border-t border-orange-200/80">
              {[
                ["500+", "Projects"],
                ["99%", "Satisfaction"],
                ["5★", "Rating"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="q-playfair font-black text-xl text-rose-500">{v}</div>
                  <div className="q-dm text-[10px] text-gray-400 font-medium mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ══ RIGHT PANEL ══ */}
        <div className="q-bg-grad w-full lg:w-[58%] overflow-y-auto flex flex-col">
          {/* Rainbow top bar */}
          <div className="q-shimmer-bar h-[3px] w-full flex-shrink-0" />

          <div className="px-6 py-7 lg:px-10 lg:py-9 flex flex-col flex-1">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.55 }}
              className="mb-7"
            >
              <span className="q-label text-rose-400">✦ Get Started Today</span>
              <h3 className="q-playfair text-[1.85rem] font-black text-gray-800 mt-1 mb-1 leading-tight">
                Request A Quote
              </h3>
              <p className="q-dm text-gray-400 text-xs mt-1">Fill in the details — we'll handle the rest.</p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
              {/* Row 1: Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name" error={errors.name} index={0} emoji="👤">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="XYZ"
                    className={`q-input ${errors.name ? "error" : ""}`}
                  />
                </Field>
                <Field label="Email Address" error={errors.email} index={1} emoji="✉️">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    className={`q-input ${errors.email ? "error" : ""}`}
                  />
                </Field>
              </div>

              {/* Row 2: Phone + Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Phone Number" error={errors.phone} index={2} emoji="📞">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className={`q-input ${errors.phone ? "error" : ""}`}
                  />
                </Field>
                <Field label="Service Required" error={errors.service} index={3} emoji="🛠️">
                  <div className="q-select-wrap">
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={`q-input appearance-none cursor-pointer pr-10 ${errors.service ? "error" : ""}`}
                    >
                      <option value="">Choose a service…</option>
                      {serviceOptions.map((opt, i) => (
                        <option key={i} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </Field>
              </div>

              {/* Message */}
              <Field label="Project Details" error={errors.message} index={4} emoji="💬">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your project, goals, timeline, and budget range…"
                  rows={4}
                  className={`q-input resize-none ${errors.message ? "error" : ""}`}
                />
              </Field>

              {/* reCAPTCHA */}
              <motion.div
                custom={5}
                variants={fv}
                initial="hidden"
                animate="show"
                className="rounded-2xl overflow-hidden border-2 border-gray-100 bg-white/70 shadow-sm"
                style={{ padding: "10px 12px" }}
              >
                <ReCaptchaCheckbox ref={recaptchaRef} setCaptchaStatus={setCaptchaStatus} />
              </motion.div>

              {/* Divider */}
              <div
                className="h-px w-full"
                style={{ background: "linear-gradient(90deg, transparent, #fca5a5, transparent)" }}
              />

              {/* Submit Button */}
              <motion.div
                custom={6}
                variants={fv}
                initial="hidden"
                animate="show"
                className="flex flex-col items-center gap-3"
              >
                <button
                  type="submit"
                  disabled={isAdding || !captchaStatus}
                  className="q-submit-btn relative overflow-hidden w-full sm:w-auto px-10 py-3.5 rounded-full q-dm text-sm font-bold text-white"
                >
                  {/* Shimmer sweep */}
                  {!isAdding && captchaStatus && (
                    <motion.span
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.28) 50%, transparent 70%)",
                      }}
                      animate={{ x: ["-130%", "230%"] }}
                      transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5 }}
                    />
                  )}
                  <span className="relative flex items-center justify-center gap-2">
                    {isAdding ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity=".25" />
                          <path
                            d="M12 2a10 10 0 0 1 10 10"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        🚀 Send My Request
                        <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.3, repeat: Infinity }}>
                          →
                        </motion.span>
                      </>
                    )}
                  </span>
                </button>

                {!captchaStatus && (
                  <p className="q-dm text-xs text-gray-400">Complete reCAPTCHA to enable submission</p>
                )}
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                className="flex flex-wrap items-center justify-center gap-4 pt-4 mt-1 border-t border-gray-100"
              >
                {[
                  ["🔒", "Secure & Private"],
                  ["⚡", "Fast Response"],
                  ["✅", "No Spam Ever"],
                  ["🌟", "Top Rated"],
                ].map(([ic, lb]) => (
                  <div key={lb} className="flex items-center gap-1 q-dm text-gray-400" style={{ fontSize: 11 }}>
                    <span>{ic}</span>
                    <span>{lb}</span>
                  </div>
                ))}
              </motion.div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Quotes

// import { TbTruckDelivery } from "react-icons/tb"
// import { ImAirplane } from "react-icons/im"
// import { FaShip } from "react-icons/fa"
// // import image1 from "../../Assests/Content/bg-text.jpg"
// import CustomInput from "Shared/CustomInput"
// import CustomSelect from "Shared/CustomSelect"
// import CustomButton from "Shared/CustomButton"
// import { useEffect, useState } from "react"
// import { gsap } from "gsap"
// import { addQuoteFn, footerServiceFn, mainServiceFn, reqQouteServiceFn } from "Services/Home"
// import { useMutation, useQuery } from "react-query"
// import toast, { Toaster } from "react-hot-toast"
// import ReCAPTCHA from "react-google-recaptcha"

// const initialise = {
//   email: "",
//   name: "",
//   message: "",
//   service: "",
// }

// const Quotes = () => {
//   const baseURL = process.env.REACT_APP_API_URL
//   const [initialData, setInitialData] = useState(initialise)
//   const [captchaToken, setCaptchaToken] = useState(null)

//   useEffect(() => {
//     // Trigger animation when the section comes into view
//     gsap.from(".request-quote-container", {
//       opacity: 0,
//       y: 50,
//       duration: 1.5,
//       ease: "power3.out",
//       scrollTrigger: {
//         trigger: ".request-quote-container",
//         start: "top 80%",
//         toggleActions: "play none none none",
//       },
//     })

//     gsap.from(".image-section", {
//       opacity: 0,
//       x: 400,
//       duration: 1.5,
//       ease: "power3.out",
//       scrollTrigger: {
//         trigger: ".image-section",
//         start: "top 80%",
//         toggleActions: "play none none none",
//       },
//     })

//     gsap.from(".form-section", {
//       opacity: 0,
//       x: -400,
//       duration: 1.5,
//       ease: "power3.out",
//       scrollTrigger: {
//         trigger: ".form-section",
//         start: "top 80%",
//         toggleActions: "play none none none",
//       },
//     })
//   }, [])

//   const { data: mainServiceData, isLoading, refetch } = useQuery(["main-service"], () => mainServiceFn())

//   const { data: quoteLeftData } = useQuery(["QuoteLeftDetails"], () => footerServiceFn())
//   const serviceOption = mainServiceData?.data?.data?.[0]?.details.map((i) => ({ label: i?.title, value: i?.title }))
//   // const transportTypeOptions = quotationSchemaData?.data?.attributes?.transportType?.enum?.map((i)=>({label:i,value:i}))
//   const handleChange = (e) => {
//     setInitialData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
//   }
//   const { mutate: addQuote, isLoading: isAdding } = useMutation(addQuoteFn, {
//     onSuccess: ({ data }) => {
//       toast.success("Created Successfull !")
//       setInitialData(initialise)
//     },
//   })

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (!captchaToken) {
//       alert("Please complete the CAPTCHA.")
//       return
//     }
//     addQuoteFn({ data: initialData })
//     setInitialData(initialise)
//     toast.success("Created Successfull !")
//   }
//   const findData = (key) => {
//     return quoteLeftData?.data?.data?.filter((item) => item.key === key)?.[0]
//   }
//   const imageUrl = baseURL + findData("quote_form_left_side")?.singleMedia.url

//   return (
//     <>
//       <div className="p-[6%] !pt-[3%] !pb-[1%]">
//         <div className="text-center pb-4 ">
//           <div className="text-base font-semibold text-black">REQUEST A</div>
//           <div className="text-3xl lg:text-4xl font-semibold text-primary">Free Quote</div>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="lg:flex request-quote-container justify-between ">
//             <div
//               style={{
//                 backgroundImage: `url(${imageUrl})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 //   width: '100%',
//                 //   height: 'full', // Example height
//               }}
//               className="image-section rounded-lg h-[40vh] lg:h-auto lg:w-[30%] text-xl family-open-sans !font-thin align-self-stretch text-white flex text-center justify-center items-center   leading-10 shadow-md"
//             >
//               <span className="bg-black px-3 h-full flex justify-center items-center bg-opacity-70">
//                 {" "}
//                 {findData("quote_form_left_side")?.value}
//               </span>
//             </div>

//             <div className="form-section lg:w-[65%] pt-5 lg:pt-0 flex flex-col gap-4">
//               <div className="grid grid-cols-2 gap-4 ">
//                 <CustomInput
//                   name="name"
//                   value={initialData?.name}
//                   onChange={handleChange}
//                   required
//                   placeholder="Your Name"
//                 ></CustomInput>
//                 <CustomInput
//                   name="email"
//                   value={initialData?.email}
//                   onChange={handleChange}
//                   required
//                   placeholder="Email"
//                 ></CustomInput>
//                 {/* <CustomSelect name="freightType" value={initialData?.freightType} onChange={handleChange} required placeholder="Type of Freight" options={freightOptions}></CustomSelect> */}
//               </div>
//               <CustomSelect
//                 name="service"
//                 value={initialData?.service}
//                 onChange={handleChange}
//                 required
//                 placeholder="Services"
//                 options={serviceOption}
//               ></CustomSelect>
//               <CustomInput
//                 name="message"
//                 value={initialData?.message}
//                 onChange={handleChange}
//                 required
//                 multiline={true}
//                 rows={5}
//                 label=""
//                 placeholder="Message"
//                 className="mt-4"
//               ></CustomInput>
//               {/* <ReCAPTCHA
//                 sitekey="6LdFLqgUAAAAABy-iDsiuueFkJOeYgZzR1IKi36C"
//                 onChange={(token) => setCaptchaToken(token)}
//                 // size="invisible"
//               /> */}
//               <CustomButton type="submit" className="bg-primary-red !rounded-full !w-48 !font-semibold">
//                 REQUEST QUOTE
//               </CustomButton>
//             </div>
//           </div>
//         </form>
//       </div>
//     </>
//   )
// }
// export default Quotes

