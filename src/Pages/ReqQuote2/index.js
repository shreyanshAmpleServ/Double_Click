import emailjs from "@emailjs/browser"
import ReCaptchaCheckbox from "Components/Contact/ReCaptcha"
import { coreServiceFn, footerServiceFn, reqQuoteFn } from "Services/Home"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { useMutation, useQuery } from "react-query"

/* ─── Google Font injection ─── */
if (!document.getElementById("rqm-font")) {
  const l = document.createElement("link")
  l.id = "rqm-font"
  l.href =
    "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap"
  l.rel = "stylesheet"
  document.head.appendChild(l)
}

/* ─── CSS keyframes ─── */
if (!document.getElementById("rqm-styles")) {
  const s = document.createElement("style")
  s.id = "rqm-styles"
  s.textContent = `
    @keyframes floatA{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-14px) rotate(4deg)}}
    @keyframes floatB{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-10px) rotate(-5deg)}}
    @keyframes floatC{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-8px) scale(1.06)}}
    @keyframes spinSlow{to{transform:rotate(360deg)}}
    @keyframes blobPulse{0%,100%{border-radius:60% 40% 70% 30%/50% 60% 40% 70%}50%{border-radius:40% 60% 30% 70%/60% 40% 70% 30%}}
    @keyframes shimmerBtn{0%{background-position:-200% center}100%{background-position:200% center}}
    @keyframes ripple{0%{transform:scale(1);opacity:0.5}100%{transform:scale(2.4);opacity:0}}
    @keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
    @keyframes orbit{from{transform:rotate(0deg) translateX(90px) rotate(0deg)}to{transform:rotate(360deg) translateX(90px) rotate(-360deg)}}
    @keyframes orbitB{from{transform:rotate(180deg) translateX(70px) rotate(-180deg)}to{transform:rotate(540deg) translateX(70px) rotate(-540deg)}}
    .rqm-floatA{animation:floatA 5s ease-in-out infinite}
    .rqm-floatB{animation:floatB 6.5s ease-in-out infinite}
    .rqm-floatC{animation:floatC 4s ease-in-out infinite}
    .rqm-spin{animation:spinSlow 20s linear infinite}
    .rqm-blob{animation:blobPulse 7s ease-in-out infinite}
    .rqm-grad{background:linear-gradient(135deg,#fff9f5,#fff5f0,#fdf4ff,#f0f9ff);background-size:400% 400%;animation:gradShift 10s ease infinite}
    .rqm-shimmer-btn{background:linear-gradient(120deg,#ff6b35,#f97316,#ef4444,#ff6b35);background-size:300% auto;animation:shimmerBtn 3s linear infinite}
    .rqm-orbit{animation:orbit 8s linear infinite}
    .rqm-orbit-b{animation:orbitB 12s linear infinite}
    .rqm-playfair{font-family:'Playfair Display',Georgia,serif}
    .rqm-dm{font-family:'DM Sans',system-ui,sans-serif}
    .rqm-label{font-family:'DM Sans',system-ui,sans-serif;font-size:10.5px;letter-spacing:0.16em;text-transform:uppercase;font-weight:700}
    .rqm-input{transition:border-color .25s, box-shadow .25s, background .25s}
    .rqm-input:focus{outline:none;border-color:#f97316;box-shadow:0 0 0 4px rgba(249,115,22,.12);background:#fff}
    .rqm-input:hover:not(:focus){border-color:#fdba74}
    .rqm-badge{animation:floatB 5s ease-in-out infinite;backdrop-filter:blur(12px)}
    .rqm-badge-b{animation:floatA 6s ease-in-out infinite;backdrop-filter:blur(12px)}
    .rqm-ripple{animation:ripple 2.8s ease-out infinite}
    .rqm-ripple-d{animation:ripple 2.8s ease-out infinite;animation-delay:.9s}
  `
  document.head.appendChild(s)
}

/* ───────────────────────────── helpers ──────────────────────────── */
const initialise2 = { email: "", name: "", phone: "", message: "", service: "" }
const initialErrors = { email: "", name: "", phone: "", message: "", service: "" }

const Blob = ({ style, delay = "0s" }) => (
  <div className="rqm-blob absolute pointer-events-none" style={{ ...style, animationDelay: delay }} />
)

const FloatingBadge = ({ icon, label, value, cls, style }) => (
  <div
    className={`absolute z-20 bg-white/80 rounded-2xl shadow-lg px-3 py-2.5 flex items-center gap-2.5 border border-orange-100 ${cls}`}
    style={style}
  >
    <span className="text-xl leading-none">{icon}</span>
    <div>
      <div className="rqm-label text-orange-400" style={{ fontSize: 9 }}>
        {label}
      </div>
      <div className="rqm-dm text-xs font-bold text-gray-800 mt-0.5">{value}</div>
    </div>
  </div>
)

/* ─── Field component ─── */
const fv = {
  hidden: { opacity: 0, y: 22 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.065 + 0.22, duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  }),
}

const Field = ({ label, error, index, emoji, children }) => (
  <motion.div custom={index} variants={fv} initial="hidden" animate="show">
    <label className="rqm-label text-orange-500 flex items-center gap-1.5 mb-1.5 pl-0.5">
      <span className="text-base">{emoji}</span>
      {label}
    </label>
    {children}
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -5, height: 0 }}
          className="rqm-dm text-red-500 text-xs mt-1.5 pl-0.5 font-medium"
        >
          ⚠ {error}
        </motion.p>
      )}
    </AnimatePresence>
  </motion.div>
)

const ic = (err) =>
  `rqm-input w-full rqm-dm rounded-xl border-2 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 bg-white/70 ${
    err ? "border-red-400 bg-red-50/60" : "border-gray-200"
  }`

/* ══════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════ */
const RequestQuoteModal2 = ({ modal, setModal }) => {
  const baseURL = process.env.REACT_APP_API_URL
  const [personalData, setPersonalData] = useState(initialise2)
  const [errors, setErrors] = useState(initialErrors)
  const recaptchaRef = useRef(null)
  const [captchaStatus, setCaptchaStatus] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const { data: mainServiceData } = useQuery(["main-service"], () => coreServiceFn())
  const { data: globalData } = useQuery(["global-entity"], () => footerServiceFn())
  const findData = (key) => globalData?.data?.data?.find((i) => i.key === key)

  const closeModal = () => {
    setModal(false)
    setErrors(initialErrors)
    setSubmitted(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setPersonalData((p) => ({ ...p, [name]: value }))
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }))
  }

  const validate = () => {
    const n = {}
    if (!personalData.name.trim()) n.name = "Name is required"
    if (!personalData.email.trim()) n.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalData.email)) n.email = "Enter a valid email"
    if (!personalData.phone.trim()) n.phone = "Phone is required"
    if (!personalData.service) n.service = "Select a service"
    if (!personalData.message.trim()) n.message = "Message is required"
    else if (personalData.message.trim().length < 10) n.message = "At least 10 characters"
    setErrors(n)
    return Object.keys(n).length === 0
  }

  const { mutate: addQuote, isLoading: isAdding } = useMutation(reqQuoteFn, {
    onSuccess: () => {
      setSubmitted(true)
      toast.success("🎉 Quote submitted! We'll be in touch soon.")
      setPersonalData(initialise2)
      setTimeout(closeModal, 3200)
    },
    onError: () => toast.error("Something went wrong. Try again."),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) addQuote({ data: personalData })
    else toast.error("Please fix the errors below")
  }

  /* gentle 3D tilt */
  const mx = useMotionValue(0),
    my = useMotionValue(0)
  const rotX = useTransform(my, [-300, 300], [2.5, -2.5])
  const rotY = useTransform(mx, [-300, 300], [-2.5, 2.5])
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(e.clientX - r.left - r.width / 2)
    my.set(e.clientY - r.top - r.height / 2)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          key="rqm-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6"
          style={{ background: "rgba(255,240,230,0.6)", backdropFilter: "blur(22px) saturate(2)" }}
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          {/* ── Card shell ── */}
          <motion.div
            key="rqm-card"
            initial={{ scale: 0.82, opacity: 0, y: 70 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.82, opacity: 0, y: 70 }}
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1400 }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="relative w-full max-w-5xl max-h-[95vh] overflow-hidden rounded-[28px] flex flex-col lg:flex-row bg-white"
            onClick={(e) => e.stopPropagation()}
            /* layered shadow */
            /* Tailwind doesn't support arbitrary box-shadow easily so inline: */
            /* handled via style below */
          >
            {/* shadow ring */}
            <style>{`.rqm-card-shadow{box-shadow:0 32px 90px rgba(255,107,53,0.22),0 8px 30px rgba(0,0,0,0.08),inset 0 0 0 1px rgba(255,255,255,0.7)}`}</style>
            <div className="rqm-card-shadow absolute inset-0 rounded-[28px] pointer-events-none z-10" />

            {/* ── SUCCESS STATE ── */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 rounded-[28px] px-10"
                >
                  <motion.div
                    animate={{ scale: [1, 1.18, 1], rotate: [0, 8, -8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-8xl mb-5 select-none"
                  >
                    🎉
                  </motion.div>
                  <h3 className="rqm-playfair text-4xl font-black text-gray-800 mb-2 text-center">Quote Sent!</h3>
                  <p className="rqm-dm text-gray-500 text-center max-w-xs text-sm leading-relaxed">
                    Our team will review your request and reply within{" "}
                    <span className="text-orange-500 font-semibold">24 hours</span> with a tailored proposal.
                  </p>
                  {/* progress bar */}
                  <div className="mt-8 w-40 h-1.5 rounded-full bg-orange-100 overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3.2, ease: "linear" }}
                      className="h-full rounded-full bg-gradient-to-r from-orange-400 to-red-500"
                    />
                  </div>
                  <p className="rqm-dm text-xs text-gray-400 mt-2">Closing automatically…</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ══════════ LEFT PANEL ══════════ */}
            <motion.div
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:flex lg:w-[42%] relative flex-col justify-between overflow-hidden"
              style={{ background: "linear-gradient(160deg,#fff5ed 0%,#ffe4cc 45%,#ffd0b0 100%)" }}
            >
              {/* bg blobs */}
              <Blob
                style={{
                  width: 240,
                  height: 240,
                  background: "radial-gradient(circle,#ffb38a,#ff6b35)",
                  top: -70,
                  right: -70,
                  opacity: 0.45,
                }}
              />
              <Blob
                style={{
                  width: 180,
                  height: 180,
                  background: "radial-gradient(circle,#ef4444,#ff6b35)",
                  bottom: 60,
                  left: -50,
                  opacity: 0.32,
                }}
                delay="2.5s"
              />
              <Blob
                style={{
                  width: 120,
                  height: 120,
                  background: "radial-gradient(circle,#fde68a,#fb923c)",
                  top: "40%",
                  right: 10,
                  opacity: 0.3,
                }}
                delay="1.2s"
              />

              {/* spinning dashed rings */}
              <div className="rqm-spin absolute top-6 right-6 w-24 h-24 rounded-full border-[3px] border-dashed border-orange-300/60" />
              <div
                className="rqm-spin absolute bottom-10 left-6 w-14 h-14 rounded-full border-[3px] border-dashed border-red-300/50"
                style={{ animationDirection: "reverse", animationDuration: "14s" }}
              />

              {/* orbiting dots */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 pointer-events-none">
                <div className="rqm-orbit absolute w-4 h-4 rounded-full bg-orange-400 shadow-md" />
                <div className="rqm-orbit-b absolute w-3 h-3 rounded-full bg-red-400 shadow-md" />
              </div>

              {/* illustration / GIF */}
              <div className="relative z-10 flex justify-center pt-10 px-6">
                <motion.div
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  {findData("quote_form_left_side")?.singleMedia?.url ? (
                    <img
                      src={baseURL + findData("quote_form_left_side")?.singleMedia?.url}
                      alt="Quote illustration"
                      className="w-56 h-56 object-contain drop-shadow-2xl"
                    />
                  ) : (
                    /* animated fallback illustration */
                    <div className="relative w-52 h-52 flex items-center justify-center">
                      {/* halo rings */}
                      <div className="rqm-ripple absolute inset-0 rounded-full border-4 border-orange-400/40" />
                      <div className="rqm-ripple-d absolute inset-0 rounded-full border-4 border-orange-300/30" />
                      <div className="absolute inset-4 rounded-full bg-orange-200/50 rqm-floatC" />
                      <div className="absolute inset-8 rounded-full bg-orange-300/40 rqm-floatB" />
                      <span className="rqm-floatA text-7xl select-none relative z-10">💼</span>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* floating stat badges */}
              <FloatingBadge
                icon="⚡"
                label="Avg. Response"
                value="&lt; 12 Hours"
                cls="rqm-badge"
                style={{ top: 195, left: 14 }}
              />
              <FloatingBadge
                icon="⭐"
                label="Client Rating"
                value="4.9 / 5.0"
                cls="rqm-badge-b"
                style={{ top: 205, right: 8 }}
              />

              {/* bottom copy */}
              <div className="relative z-10 px-8 pb-10 pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-0.5 rounded-full bg-orange-500 block" />
                  <span className="rqm-label text-orange-500">Free Consultation</span>
                </div>
                <h2 className="rqm-playfair text-[2rem] font-black text-gray-800 leading-tight mb-3">
                  Let's Build
                  <br />
                  <span className="text-orange-500 italic">Something</span>
                  <br />
                  Amazing
                </h2>
                <p className="rqm-dm text-gray-500 text-sm leading-relaxed max-w-[200px]">
                  Tell us your vision and we'll craft the perfect solution for your business.
                </p>
                {/* mini stats */}
                <div className="flex gap-5 mt-6 pt-5 border-t border-orange-200/80">
                  {[
                    ["500+", "Projects"],
                    ["99%", "Client Satisfaction"],
                    ["5★", "Rating"],
                  ].map(([v, l]) => (
                    <div key={l}>
                      <div className="rqm-playfair font-black text-xl text-orange-500">{v}</div>
                      <div className="rqm-dm text-[11px] text-gray-400 font-medium mt-0.5">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ══════════ RIGHT PANEL ══════════ */}
            <div className="rqm-grad w-full lg:w-[58%] overflow-y-auto flex flex-col">
              {/* rainbow top bar */}
              <div className="rqm-shimmer-btn h-[3px] w-full flex-shrink-0" />

              <div className="px-6 py-5 lg:px-10 lg:py-9 flex flex-col flex-1">
                {/* header */}
                <div className="flex items-start justify-between mb-5">
                  <motion.div
                    initial={{ opacity: 0, y: -14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 }}
                  >
                    <span className="rqm-label text-orange-500">✦ Get Started Today</span>
                    <h3 className="rqm-playfair text-[1.9rem]  font-black text-gray-800 !mt-0.5 !mb-0.5 leading-tight">
                      Request A Quote
                    </h3>
                    {/* <p className="rqm-dm text-gray-400 text-xs mt-1">Fill in the details — we'll handle the rest.</p> */}
                  </motion.div>

                  {/* close btn */}
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 280 }}
                    whileHover={{ scale: 1.18, rotate: 90, backgroundColor: "#fee2e2", borderColor: "#fca5a5" }}
                    whileTap={{ scale: 0.88 }}
                    onClick={closeModal}
                    className="w-10 h-10 rounded-full border-2 border-gray-200 bg-white/80 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all duration-200 shadow-sm flex-shrink-0"
                  >
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                    </svg>
                  </motion.button>
                </div>

                {/* step breadcrumb */}
                {/* <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.24 }}
                  className="flex items-center gap-2 mb-6"
                >
                  {["Your Details", "Service", "Message"].map((s, i) => (
                    <div key={s} className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 bg-white/80 rounded-full px-3 py-1.5 shadow-sm border border-orange-100/80">
                        <div
                          className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white rqm-dm font-bold"
                          style={{ fontSize: 11 }}
                        >
                          {i + 1}
                        </div>
                        <span className="rqm-label text-gray-500" style={{ fontSize: 9.5 }}>
                          {s}
                        </span>
                      </div>
                      {i < 2 && <div className="w-5 h-0.5 rounded bg-orange-200" />}
                    </div>
                  ))}
                </motion.div> */}

                {/* ── FORM ── */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Full Name" error={errors.name} index={0} emoji="👤">
                      <input
                        type="text"
                        name="name"
                        value={personalData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={ic(errors.name)}
                      />
                    </Field>
                    <Field label="Email Address" error={errors.email} index={1} emoji="✉️">
                      <input
                        type="email"
                        name="email"
                        value={personalData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className={ic(errors.email)}
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Phone Number" error={errors.phone} index={2} emoji="📞">
                      <input
                        type="text"
                        name="phone"
                        value={personalData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className={ic(errors.phone)}
                      />
                    </Field>
                    <Field label="Service Required" error={errors.service} index={3} emoji="🛠️">
                      <div className="relative">
                        <select
                          name="service"
                          value={personalData.service}
                          onChange={handleChange}
                          className={ic(errors.service) + " appearance-none pr-10 cursor-pointer"}
                        >
                          <option value="">Choose a service…</option>
                          {mainServiceData?.data?.data?.[0]?.details?.map((item, i) => (
                            <option key={i} value={item.title}>
                              {item.title}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-orange-400">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                              d="M4 6l4 4 4-4"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </Field>
                  </div>

                  <Field label="Project Details" error={errors.message} index={4} emoji="💬">
                    <textarea
                      name="message"
                      value={personalData.message}
                      onChange={handleChange}
                      placeholder="Describe your project, goals, timeline, and budget range…"
                      rows={4}
                      className={ic(errors.message) + " resize-none"}
                    />
                  </Field>

                  {/* reCAPTCHA */}
                  <motion.div
                    custom={5}
                    variants={fv}
                    initial="hidden"
                    animate="show"
                    className="bg-white/70 rounded-2xl p-3 border-2 border-gray-100 shadow-sm"
                  >
                    <ReCaptchaCheckbox ref={recaptchaRef} setCaptchaStatus={setCaptchaStatus} />
                  </motion.div>

                  {/* divider */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-orange-200 to-transparent" />

                  {/* submit row */}
                  <motion.div
                    custom={6}
                    variants={fv}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                  >
                    {/* avatar trust */}
                    {/* <div className="flex items-center gap-2.5 rqm-dm text-xs text-gray-400">
                      <div className="flex -space-x-1.5">
                        {["🧑‍💼", "👩‍💼", "🧑‍💻", "👨‍🎨"].map((e, i) => (
                          <div
                            key={i}
                            className="w-7 h-7 rounded-full border-2 border-white bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center text-sm"
                          >
                            {e}
                          </div>
                        ))}
                      </div>
                      <span>
                        Trusted by <span className="text-orange-500 font-semibold">500+ clients</span>
                      </span>
                    </div> */}

                    {/* CTA button */}
                    <motion.button
                      type="submit"
                      disabled={isAdding || !captchaStatus}
                      whileHover={!isAdding && captchaStatus ? { scale: 1.06, y: -2 } : {}}
                      whileTap={!isAdding && captchaStatus ? { scale: 0.96 } : {}}
                      className="relative overflow-hidden px-8 py-3.5 rounded-full rqm-dm text-sm font-bold text-white disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{
                        background:
                          isAdding || !captchaStatus ? "#d1d5db" : "linear-gradient(135deg,#ff6b35 0%,#e63946 100%)",
                        boxShadow:
                          !isAdding && captchaStatus
                            ? "0 8px 30px rgba(255,107,53,0.45), 0 2px 8px rgba(0,0,0,0.1)"
                            : "none",
                        transition: "box-shadow .3s, background .3s",
                      }}
                    >
                      {/* shimmer sweep */}
                      {!isAdding && captchaStatus && (
                        <motion.span
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background:
                              "linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.3) 50%,transparent 65%)",
                          }}
                          animate={{ x: ["-130%", "230%"] }}
                          transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.4 }}
                        />
                      )}
                      <span className="relative flex items-center gap-2">
                        {isAdding ? (
                          <>
                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeOpacity=".25"
                              />
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
                    </motion.button>
                  </motion.div>

                  {/* trust badges */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="flex items-center justify-center gap-5 pt-4 mt-1 border-t border-gray-100"
                  >
                    {[
                      ["🔒", "Secure & Private"],
                      ["⚡", "Fast Response"],
                      ["✅", "No Spam Ever"],
                      ["🌟", "Top Rated"],
                    ].map(([ic, lb]) => (
                      <div key={lb} className="flex items-center gap-1 rqm-dm text-gray-400" style={{ fontSize: 11 }}>
                        <span>{ic}</span>
                        <span>{lb}</span>
                      </div>
                    ))}
                  </motion.div>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default RequestQuoteModal2

// import emailjs from "@emailjs/browser"
// import ReCaptchaCheckbox from "Components/Contact/ReCaptcha"
// import { coreServiceFn, footerServiceFn, reqQuoteFn } from "Services/Home"
// import { motion, AnimatePresence } from "framer-motion"
// import { useEffect, useRef, useState } from "react"
// import toast from "react-hot-toast"
// import { useMutation, useQuery } from "react-query"

// const initialise2 = {
//   email: "",
//   name: "",
//   phone: "",
//   message: "",
//   service: "",
// }

// const initialErrors = {
//   email: "",
//   name: "",
//   phone: "",
//   message: "",
//   service: "",
// }

// /* ─── Floating particle dots ─── */
// const Particle = ({ style }) => (
//   <motion.div
//     className="absolute rounded-full bg-white pointer-events-none"
//     style={style}
//     animate={{ y: [0, -18, 0], opacity: [0.08, 0.22, 0.08] }}
//     transition={{ duration: style.duration, repeat: Infinity, ease: "easeInOut", delay: style.delay }}
//   />
// )

// const particles = Array.from({ length: 18 }, (_, i) => ({
//   width: Math.random() * 4 + 2,
//   height: Math.random() * 4 + 2,
//   top: `${Math.random() * 100}%`,
//   left: `${Math.random() * 100}%`,
//   duration: 3 + Math.random() * 4,
//   delay: Math.random() * 3,
// }))

// /* ─── Animated field wrapper ─── */
// const fieldVariants = {
//   hidden: { opacity: 0, y: 24 },
//   visible: (i) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: 0.35 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
//   }),
// }

// /* ─── Input component ─── */
// const Field = ({ label, error, children, index }) => (
//   <motion.div custom={index} variants={fieldVariants} initial="hidden" animate="visible" className="group relative">
//     <label className="block text-xs font-semibold tracking-[0.18em] uppercase text-slate-400 mb-1.5 pl-1">
//       {label}
//     </label>
//     {children}
//     <AnimatePresence>
//       {error && (
//         <motion.p
//           initial={{ opacity: 0, y: -6 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -6 }}
//           className="text-red-400 text-xs mt-1.5 pl-1 font-medium tracking-wide"
//         >
//           {error}
//         </motion.p>
//       )}
//     </AnimatePresence>
//   </motion.div>
// )

// const inputClass = (hasError) =>
//   `w-full bg-white/5 border ${
//     hasError ? "border-red-500/70" : "border-white/10"
//   } rounded-lg px-4 py-3 text-white placeholder-slate-500 text-sm
//    focus:outline-none focus:border-amber-400/60 focus:bg-white/8 focus:ring-1 focus:ring-amber-400/30
//    transition-all duration-300`

// /* ─── Main modal ─── */
// const RequestQuoteModal2 = ({ modal, setModal }) => {
//   const baseURL = process.env.REACT_APP_API_URL
//   const [personalData, setPersonalData] = useState(initialise2)
//   const [errors, setErrors] = useState(initialErrors)
//   const recaptchaRef = useRef(null)
//   const [captchaStatus, setCaptchaStatus] = useState(false)

//   const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID
//   const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID
//   const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY

//   const { data: mainServiceData } = useQuery(["main-service"], () => coreServiceFn())
//   const { data: globalData } = useQuery(["global-entity"], () => footerServiceFn())

//   const findData = (key) => globalData?.data?.data?.filter((item) => item.key === key)?.[0]

//   const closeModal = () => {
//     setModal(false)
//     setErrors(initialErrors)
//   }

//   const handleChange2 = (e) => {
//     const { name, value } = e.target
//     setPersonalData((prev) => ({ ...prev, [name]: value }))
//     if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
//   }

//   const validateForm = () => {
//     const newErrors = {}
//     if (!personalData.name.trim()) newErrors.name = "Name is required"
//     if (!personalData.email.trim()) newErrors.email = "Email is required"
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalData.email)) newErrors.email = "Enter a valid email address"
//     if (!personalData.phone.trim()) newErrors.phone = "Phone number is required"
//     if (!personalData.service) newErrors.service = "Please select a service"
//     if (!personalData.message.trim()) newErrors.message = "Message is required"
//     else if (personalData.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters"
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const { mutate: addQuote, isLoading: isAdding } = useMutation(reqQuoteFn, {
//     onSuccess: () => {
//       toast.success("Quote submitted! We'll be in touch soon.")
//       setPersonalData(initialise2)
//       setErrors(initialErrors)
//       setTimeout(closeModal, 1200)
//     },
//     onError: () => toast.error("Something went wrong. Please try again."),
//   })

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (validateForm()) addQuote({ data: personalData })
//     else toast.error("Please fix the errors below")
//   }

//   /* backdrop click */
//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) closeModal()
//   }

//   return (
//     <AnimatePresence>
//       {modal && (
//         <motion.div
//           key="backdrop"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.35 }}
//           className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
//           style={{ background: "rgba(2,4,12,0.82)", backdropFilter: "blur(8px)" }}
//           onClick={handleBackdropClick}
//         >
//           {/* ── Modal card ── */}
//           <motion.div
//             key="modal"
//             initial={{ scale: 0.88, opacity: 0, y: 48 }}
//             animate={{ scale: 1, opacity: 1, y: 0 }}
//             exit={{ scale: 0.88, opacity: 0, y: 48 }}
//             transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
//             className="relative w-full max-w-5xl max-h-[94vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col lg:flex-row"
//             style={{ background: "linear-gradient(135deg,#0d1117 0%,#111827 100%)" }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* ─── Decorative top line ─── */}
//             <div
//               className="absolute top-0 left-0 right-0 h-[2px] z-10"
//               style={{ background: "linear-gradient(90deg,transparent,#f59e0b,#ef4444,transparent)" }}
//             />

//             {/* ─── LEFT PANEL ─── */}
//             <motion.div
//               initial={{ x: -60, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//               className="hidden lg:flex lg:w-5/12 relative flex-col justify-end overflow-hidden"
//               style={{
//                 backgroundImage: `url(${baseURL + findData("quote_form_left_side")?.singleMedia?.url})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 minHeight: "520px",
//               }}
//             >
//               {/* overlay */}
//               <div
//                 className="absolute inset-0"
//                 style={{
//                   background:
//                     "linear-gradient(160deg,rgba(13,17,23,0.3) 0%,rgba(13,17,23,0.85) 70%,rgba(13,17,23,0.97) 100%)",
//                 }}
//               />

//               {/* particles */}
//               {particles.map((p, i) => (
//                 <Particle key={i} style={p} />
//               ))}

//               {/* geometric accent */}
//               <div className="absolute top-8 left-8 w-16 h-16 border border-amber-400/30 rounded-full" />
//               <div className="absolute top-12 left-12 w-6 h-6 bg-amber-400/20 rounded-full" />
//               <div className="absolute top-8 right-8 w-24 h-[1px] bg-gradient-to-r from-transparent to-amber-400/40" />

//               {/* text block */}
//               <div className="relative z-10 p-8 pb-10">
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.45, duration: 0.6 }}
//                 >
//                   <div className="flex items-center gap-2 mb-4">
//                     <div className="h-[1px] w-8 bg-amber-400" />
//                     <span className="text-amber-400 text-xs tracking-[0.22em] uppercase font-semibold">
//                       Get Started
//                     </span>
//                   </div>
//                   <h2
//                     className="text-3xl font-bold text-white leading-tight mb-3"
//                     style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.01em" }}
//                   >
//                     Let's Build
//                     <br />
//                     <span style={{ color: "#f59e0b" }}>Something</span>
//                     <br />
//                     Remarkable.
//                   </h2>
//                   <p className="text-slate-400 text-sm leading-relaxed max-w-56">
//                     Tell us about your project and we'll craft a tailored solution for your business.
//                   </p>

//                   {/* stats row */}
//                   <div className="flex gap-5 mt-7">
//                     {[
//                       ["98%", "Satisfaction"],
//                       ["500+", "Projects"],
//                       ["24h", "Response"],
//                     ].map(([val, lbl]) => (
//                       <div key={lbl}>
//                         <div className="text-white font-bold text-lg" style={{ fontFamily: "'Georgia', serif" }}>
//                           {val}
//                         </div>
//                         <div className="text-slate-500 text-xs tracking-wide">{lbl}</div>
//                       </div>
//                     ))}
//                   </div>
//                 </motion.div>
//               </div>
//             </motion.div>

//             {/* ─── RIGHT PANEL ─── */}
//             <div className="w-full lg:w-7/12 overflow-y-auto px-6 py-8 lg:px-10 lg:py-9 flex flex-col">
//               {/* header */}
//               <div className="flex items-start justify-between mb-8">
//                 <motion.div
//                   initial={{ opacity: 0, y: -16 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.2, duration: 0.5 }}
//                 >
//                   <p className="text-amber-400 text-xs tracking-[0.2em] uppercase font-semibold mb-1">
//                     Free Consultation
//                   </p>
//                   <h3
//                     className="text-white text-2xl lg:text-3xl font-bold"
//                     style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.01em" }}
//                   >
//                     Request a Quote
//                   </h3>
//                 </motion.div>

//                 <motion.button
//                   initial={{ opacity: 0, scale: 0 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 0.3, type: "spring", stiffness: 260 }}
//                   whileHover={{ scale: 1.15, rotate: 90 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={closeModal}
//                   className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-colors duration-200"
//                 >
//                   <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
//                     <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
//                   </svg>
//                 </motion.button>
//               </div>

//               {/* ── Form ── */}
//               <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <Field label="Full Name" error={errors.name} index={0}>
//                     <input
//                       type="text"
//                       name="name"
//                       value={personalData.name}
//                       onChange={handleChange2}
//                       placeholder="John Doe"
//                       className={inputClass(errors.name)}
//                     />
//                   </Field>

//                   <Field label="Email Address" error={errors.email} index={1}>
//                     <input
//                       type="email"
//                       name="email"
//                       value={personalData.email}
//                       onChange={handleChange2}
//                       placeholder="john@company.com"
//                       className={inputClass(errors.email)}
//                     />
//                   </Field>

//                   <Field label="Phone Number" error={errors.phone} index={2}>
//                     <input
//                       type="text"
//                       name="phone"
//                       value={personalData.phone}
//                       onChange={handleChange2}
//                       placeholder="+1 (555) 000-0000"
//                       className={inputClass(errors.phone)}
//                     />
//                   </Field>

//                   <Field label="Service Required" error={errors.service} index={3}>
//                     <select
//                       name="service"
//                       value={personalData.service}
//                       onChange={handleChange2}
//                       className={inputClass(errors.service) + " cursor-pointer"}
//                       style={{ appearance: "none" }}
//                     >
//                       <option value="" className="bg-gray-900">
//                         Select a service…
//                       </option>
//                       {mainServiceData?.data?.data?.[0]?.details?.map((item, i) => (
//                         <option key={i} value={item.title} className="bg-gray-900">
//                           {item.title}
//                         </option>
//                       ))}
//                     </select>
//                   </Field>
//                 </div>

//                 <Field label="Your Message" error={errors.message} index={4}>
//                   <textarea
//                     name="message"
//                     value={personalData.message}
//                     onChange={handleChange2}
//                     placeholder="Describe your project goals, timeline, and any specific requirements…"
//                     rows={5}
//                     className={inputClass(errors.message) + " resize-none"}
//                   />
//                 </Field>

//                 <motion.div custom={5} variants={fieldVariants} initial="hidden" animate="visible">
//                   <ReCaptchaCheckbox ref={recaptchaRef} setCaptchaStatus={setCaptchaStatus} />
//                 </motion.div>

//                 {/* divider */}
//                 <div className="h-px w-full bg-white/5 my-1" />

//                 {/* submit row */}
//                 <motion.div
//                   custom={6}
//                   variants={fieldVariants}
//                   initial="hidden"
//                   animate="visible"
//                   className="flex items-center justify-between gap-4 flex-wrap"
//                 >
//                   <p className="text-slate-500 text-xs">
//                     We'll respond within <span className="text-amber-400 font-medium">24 hours</span>
//                   </p>

//                   <motion.button
//                     type="submit"
//                     disabled={isAdding || !captchaStatus}
//                     whileHover={!isAdding && captchaStatus ? { scale: 1.04 } : {}}
//                     whileTap={!isAdding && captchaStatus ? { scale: 0.97 } : {}}
//                     className="relative overflow-hidden px-8 py-3 rounded-full text-sm font-semibold tracking-wide text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
//                     style={{
//                       background:
//                         isAdding || !captchaStatus
//                           ? "rgba(255,255,255,0.08)"
//                           : "linear-gradient(135deg,#f59e0b 0%,#ef4444 100%)",
//                       boxShadow: !isAdding && captchaStatus ? "0 0 28px rgba(245,158,11,0.35)" : "none",
//                     }}
//                   >
//                     {/* shimmer */}
//                     {!isAdding && captchaStatus && (
//                       <motion.div
//                         className="absolute inset-0 pointer-events-none"
//                         style={{
//                           background:
//                             "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.18) 50%,transparent 60%)",
//                         }}
//                         animate={{ x: ["-100%", "200%"] }}
//                         transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
//                       />
//                     )}
//                     <span className="relative flex items-center gap-2">
//                       {isAdding ? (
//                         <>
//                           <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
//                             <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
//                             <path
//                               d="M12 2a10 10 0 0 1 10 10"
//                               stroke="currentColor"
//                               strokeWidth="3"
//                               strokeLinecap="round"
//                             />
//                           </svg>
//                           Sending…
//                         </>
//                       ) : (
//                         <>
//                           Send Message
//                           <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
//                             <path
//                               d="M2 8h12M9 3l5 5-5 5"
//                               stroke="currentColor"
//                               strokeWidth="1.8"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             />
//                           </svg>
//                         </>
//                       )}
//                     </span>
//                   </motion.button>
//                 </motion.div>
//               </form>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   )
// }

// export default RequestQuoteModal2
