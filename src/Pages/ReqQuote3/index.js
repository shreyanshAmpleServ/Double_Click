import ReCaptchaCheckbox from "Components/Contact/ReCaptcha"
import { footerServiceFn, reqBookConsultationFn } from "Services/Home"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import toast from "react-hot-toast"
import { useMutation, useQuery } from "react-query"

/* ─── Font injection ─── */
if (!document.getElementById("bcm-font")) {
  const l = document.createElement("link")
  l.id = "bcm-font"
  l.href =
    "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap"
  l.rel = "stylesheet"
  document.head.appendChild(l)
}

/* ─── Light theme styles ─── */
if (!document.getElementById("bcm-light-styles")) {
  const s = document.createElement("style")
  s.id = "bcm-light-styles"
  s.textContent = `
    @keyframes bcmFloatA {
      0%,100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-14px) rotate(4deg); }
    }

    @keyframes bcmFloatB {
      0%,100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-10px) scale(1.04); }
    }

    @keyframes bcmSpin {
      to { transform: rotate(360deg); }
    }

    @keyframes bcmBlob {
      0%,100% {
        border-radius: 58% 42% 68% 32% / 52% 60% 40% 48%;
      }
      50% {
        border-radius: 38% 62% 42% 58% / 62% 38% 64% 36%;
      }
    }

    @keyframes bcmGradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    @keyframes bcmShimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }

    @keyframes bcmRipple {
      0% { transform: scale(1); opacity: .45; }
      100% { transform: scale(2.4); opacity: 0; }
    }

    .bcm-playfair {
      font-family: 'Playfair Display', Georgia, serif;
    }

    .bcm-dm {
      font-family: 'DM Sans', system-ui, sans-serif;
    }

    .bcm-label {
      font-family: 'DM Sans', system-ui, sans-serif;
      font-size: 10.5px;
      letter-spacing: .16em;
      text-transform: uppercase;
      font-weight: 800;
    }

    .bcm-light-bg {
      background: linear-gradient(135deg, #ffffff, #fff4f8, #f5f7ff, #ffffff);
      background-size: 400% 400%;
      animation: bcmGradient 12s ease infinite;
    }

    .bcm-left-light {
      background: linear-gradient(150deg, #ffffff 0%, #fff1f7 45%, #eef1ff 100%);
    }

    .bcm-top-bar {
      background: linear-gradient(90deg, #2f3985, #d9145b, #8b5cf6, #2f3985);
      background-size: 300% auto;
      animation: bcmShimmer 3.4s linear infinite;
    }

    .bcm-blob {
      animation: bcmBlob 8s ease-in-out infinite;
    }

    .bcm-float-a {
      animation: bcmFloatA 5.5s ease-in-out infinite;
    }

    .bcm-float-b {
      animation: bcmFloatB 4.8s ease-in-out infinite;
    }

    .bcm-spin {
      animation: bcmSpin 18s linear infinite;
    }

    .bcm-ripple {
      animation: bcmRipple 2.8s ease-out infinite;
    }

    .bcm-ripple-delay {
      animation: bcmRipple 2.8s ease-out infinite;
      animation-delay: .9s;
    }

    .bcm-input {
      transition: border-color .25s, box-shadow .25s, background .25s;
    }

    .bcm-input:focus {
      outline: none;
      border-color: #d9145b;
      box-shadow: 0 0 0 4px rgba(217, 20, 91, .12);
      background: #fff;
    }

    .bcm-input:hover:not(:focus) {
      border-color: rgba(47, 57, 133, .45);
    }
  `
  document.head.appendChild(s)
}

const initialData = {
  name: "",
  email: "",
  phone: "",
  company_name: "",
  position: "",
  message: "",
}

const initialErrors = {
  name: "",
  email: "",
  phone: "",
  company_name: "",
  position: "",
  message: "",
}

const Blob = ({ style, delay = "0s" }) => (
  <div className="bcm-blob absolute pointer-events-none" style={{ ...style, animationDelay: delay }} />
)

const FloatingBadge = ({ icon, label, value, className, style }) => (
  <div
    className={`absolute z-20 bg-white/85 rounded-2xl shadow-xl px-3 py-2.5 flex items-center gap-2.5 border border-pink-100 backdrop-blur-xl ${className}`}
    style={style}
  >
    <span className="text-xl leading-none">{icon}</span>

    <div>
      <div className="bcm-label text-[#d9145b]" style={{ fontSize: 9 }}>
        {label}
      </div>

      <div className="bcm-dm text-xs font-bold text-slate-800 mt-0.5">{value}</div>
    </div>
  </div>
)

const fieldVariants = {
  hidden: { opacity: 0, y: 22 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06 + 0.22,
      duration: 0.48,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const Field = ({ label, error, index, emoji, children }) => (
  <motion.div custom={index} variants={fieldVariants} initial="hidden" animate="show">
    <label className="bcm-label text-[#2f3985] flex items-center gap-1.5 mb-1.5 pl-0.5">
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
          className="bcm-dm text-[#d9145b] text-xs mt-1.5 pl-0.5 font-semibold"
        >
          ⚠ {error}
        </motion.p>
      )}
    </AnimatePresence>
  </motion.div>
)

const inputClass = (error) =>
  `bcm-input w-full bcm-dm rounded-xl border-2 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 bg-white/80 ${
    error ? "border-[#d9145b] bg-pink-50/70" : "border-slate-200"
  }`

const BookConsultationModal = ({ modal, setModal }) => {
  const baseURL = process.env.REACT_APP_API_URL

  const [personalData, setPersonalData] = useState(initialData)
  const [errors, setErrors] = useState(initialErrors)
  const [captchaStatus, setCaptchaStatus] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const recaptchaRef = useRef(null)

  const { data: globalData } = useQuery(["global-entity"], () => footerServiceFn())

  const findData = (key) => globalData?.data?.data?.find((item) => item.key === key)

  const closeModal = () => {
    setModal(false)
    setErrors(initialErrors)
    setSubmitted(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setPersonalData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validate = () => {
    const nextErrors = {}

    if (!personalData.name.trim()) {
      nextErrors.name = "Name is required"
    }

    if (!personalData.email.trim()) {
      nextErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalData.email)) {
      nextErrors.email = "Enter a valid email"
    }

    if (!personalData.phone.trim()) {
      nextErrors.phone = "Phone number is required"
    }

    if (!personalData.company_name.trim()) {
      nextErrors.company_name = "Company name is required"
    }

    if (!personalData.position.trim()) {
      nextErrors.position = "Position is required"
    }

    if (!personalData.message.trim()) {
      nextErrors.message = "Please enter your questions"
    } else if (personalData.message.trim().length < 10) {
      nextErrors.message = "Please enter at least 10 characters"
    }

    setErrors(nextErrors)

    return Object.keys(nextErrors).length === 0
  }

  const { mutate: addConsultation, isLoading: isAdding } = useMutation(reqBookConsultationFn, {
    onSuccess: () => {
      setSubmitted(true)
      toast.success("Consultation request submitted successfully!")

      setPersonalData(initialData)

      setTimeout(() => {
        closeModal()
      }, 3200)
    },
    onError: () => {
      toast.error("Something went wrong. Please try again.")
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validate()) {
      toast.error("Please fix the errors below")
      return
    }

    addConsultation({
      data: {
        ...personalData,

        // Hidden service value because service dropdown is removed.
        // service: "Book Consultation",
      },
    })
  }

  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const rotateX = useTransform(my, [-300, 300], [2.3, -2.3])
  const rotateY = useTransform(mx, [-300, 300], [-2.3, 2.3])

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
          key="book-consultation-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,.72), rgba(255,240,247,.76), rgba(240,243,255,.78))",
            backdropFilter: "blur(22px) saturate(1.5)",
          }}
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <motion.div
            key="book-consultation-card"
            initial={{ scale: 0.84, opacity: 0, y: 70 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.84, opacity: 0, y: 70 }}
            transition={{
              duration: 0.62,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              rotateX,
              rotateY,
              transformPerspective: 1400,
              boxShadow:
                "0 34px 90px rgba(47,57,133,.16), 0 14px 40px rgba(217,20,91,.13), inset 0 0 0 1px rgba(255,255,255,.75)",
            }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[95vh] overflow-hidden rounded-[30px] flex flex-col lg:flex-row bg-white"
          >
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.86 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.48,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-white via-pink-50 to-indigo-50 rounded-[30px] px-8"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.18, 1],
                      rotate: [0, 6, -6, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="text-7xl mb-5 select-none"
                  >
                    📅
                  </motion.div>

                  <h3 className="bcm-playfair text-4xl font-black text-slate-900 mb-2 text-center">
                    Consultation Requested!
                  </h3>

                  <p className="bcm-dm text-slate-500 text-center max-w-sm text-sm leading-relaxed">
                    Thank you. Our team will review your details and contact you shortly.
                  </p>

                  <div className="mt-8 w-44 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: 3.2,
                        ease: "linear",
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-[#2f3985] to-[#d9145b]"
                    />
                  </div>

                  <p className="bcm-dm text-xs text-slate-400 mt-2">Closing automatically…</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* LEFT LIGHT PANEL */}
            <motion.div
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                delay: 0.1,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="hidden lg:flex lg:w-[42%] bcm-left-light relative flex-col justify-between overflow-hidden border-r border-pink-100"
            >
              <Blob
                style={{
                  width: 260,
                  height: 260,
                  background: "radial-gradient(circle, rgba(217,20,91,.22), rgba(217,20,91,.04))",
                  top: -80,
                  right: -80,
                }}
              />

              <Blob
                delay="1.5s"
                style={{
                  width: 220,
                  height: 220,
                  background: "radial-gradient(circle, rgba(47,57,133,.20), rgba(47,57,133,.04))",
                  bottom: 40,
                  left: -70,
                }}
              />

              <Blob
                delay="2.5s"
                style={{
                  width: 130,
                  height: 130,
                  background: "radial-gradient(circle, rgba(139,92,246,.18), rgba(139,92,246,.03))",
                  top: "42%",
                  right: 20,
                }}
              />

              <div className="bcm-spin absolute top-7 right-7 w-28 h-28 rounded-full border-[3px] border-dashed border-[#d9145b]/20" />

              <div
                className="bcm-spin absolute bottom-12 left-8 w-16 h-16 rounded-full border-[3px] border-dashed border-[#2f3985]/20"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "12s",
                }}
              />

              <div className="relative z-10 flex justify-center pt-12 px-6">
                <motion.div
                  animate={{ y: [0, -14, 0] }}
                  transition={{
                    duration: 4.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative"
                >
                  {findData("consultation_form_left_side")?.singleMedia?.url ? (
                    <img
                      src={baseURL + findData("consultation_form_left_side")?.singleMedia?.url}
                      alt="Book consultation"
                      className="w-60 h-60 object-contain drop-shadow-2xl"
                    />
                  ) : (
                    <div className="relative w-56 h-56 flex items-center justify-center">
                      <div className="bcm-ripple absolute inset-0 rounded-full border-4 border-[#d9145b]/20" />
                      <div className="bcm-ripple-delay absolute inset-0 rounded-full border-4 border-[#2f3985]/18" />

                      <div className="absolute inset-5 rounded-full bg-pink-100/70 bcm-float-b" />
                      <div className="absolute inset-12 rounded-full bg-indigo-100/70 bcm-float-a" />

                      <span className="relative z-10 text-7xl select-none bcm-float-a">💬</span>
                    </div>
                  )}
                </motion.div>
              </div>

              <FloatingBadge
                icon="📅"
                label="Easy Booking"
                value="Quick Schedule"
                className="bcm-float-a"
                style={{
                  top: 210,
                  left: 18,
                }}
              />

              <FloatingBadge
                icon="🎯"
                label="Expert Advice"
                value="1:1 Guidance"
                className="bcm-float-b"
                style={{
                  top: 225,
                  right: 12,
                }}
              />

              <div className="relative z-10 px-8 pb-10 pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-7 h-0.5 rounded-full bg-[#d9145b] block" />

                  <span className="bcm-label text-[#d9145b]">Free Consultation</span>
                </div>

                <h2 className="bcm-playfair text-[2rem] font-black text-slate-900 leading-tight mb-3">
                  Book Your
                  <br />
                  <span className="italic text-[#d9145b]">Strategy</span>
                  <br />
                  Session
                </h2>

                <p className="bcm-dm text-slate-500 text-sm leading-relaxed max-w-[230px]">
                  Ask your questions and get practical guidance from our experts.
                </p>

                <div className="grid grid-cols-3 gap-3 mt-7 pt-5 border-t border-pink-100">
                  {[
                    ["30m", "Session"],
                    ["1:1", "Expert"],
                    ["24h", "Response"],
                  ].map(([value, label]) => (
                    <div key={label}>
                      <div className="bcm-playfair font-black text-xl text-[#2f3985]">{value}</div>

                      <div className="bcm-dm text-[11px] text-slate-400 font-medium mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* RIGHT PANEL */}
            <div className="bcm-light-bg w-full lg:w-[58%] overflow-y-auto flex flex-col">
              <div className="bcm-top-bar h-[4px] w-full flex-shrink-0" />

              <div className="px-6 py-5 lg:px-10 lg:py-9 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-5">
                  <motion.div
                    initial={{ opacity: 0, y: -14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 }}
                  >
                    <span className="bcm-label text-[#d9145b]">✦ Let’s Talk</span>

                    <h3 className="bcm-playfair text-[1.9rem] font-black text-slate-900 !mt-0.5 !mb-0.5 leading-tight">
                      Request for Book Consultation
                    </h3>

                    <p className="bcm-dm text-slate-400 text-xs mt-1">
                      Fill in your details and questions. We’ll contact you soon.
                    </p>
                  </motion.div>

                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 0.3,
                      type: "spring",
                      stiffness: 280,
                    }}
                    whileHover={{
                      scale: 1.15,
                      rotate: 90,
                      backgroundColor: "#fff0f6",
                      borderColor: "#d9145b",
                    }}
                    whileTap={{ scale: 0.88 }}
                    onClick={closeModal}
                    className="w-10 h-10 rounded-full border-2 border-slate-200 bg-white/85 flex items-center justify-center text-slate-400 hover:text-[#d9145b] transition-all duration-200 shadow-sm flex-shrink-0"
                  >
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                    </svg>
                  </motion.button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Full Name" error={errors.name} emoji="👤" index={0}>
                      <input
                        type="text"
                        name="name"
                        value={personalData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={inputClass(errors.name)}
                      />
                    </Field>

                    <Field label="Email Address" error={errors.email} emoji="✉️" index={1}>
                      <input
                        type="email"
                        name="email"
                        value={personalData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className={inputClass(errors.email)}
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Phone Number" error={errors.phone} emoji="📞" index={2}>
                      <input
                        type="text"
                        name="phone"
                        value={personalData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className={inputClass(errors.phone)}
                      />
                    </Field>

                    <Field label="Company" error={errors.company_name} emoji="🏢" index={3}>
                      <input
                        type="text"
                        name="company_name"
                        value={personalData.company_name}
                        onChange={handleChange}
                        placeholder="Your company name"
                        className={inputClass(errors.company_name)}
                      />
                    </Field>
                  </div>

                  <Field label="Position" error={errors.position} emoji="💼" index={4}>
                    <input
                      type="text"
                      name="position"
                      value={personalData.position}
                      onChange={handleChange}
                      placeholder="Founder, Manager, CEO..."
                      className={inputClass(errors.position)}
                    />
                  </Field>

                  <Field label="Questions / Consultation Notes" error={errors.message} emoji="❓" index={5}>
                    <textarea
                      name="message"
                      value={personalData.message}
                      onChange={handleChange}
                      placeholder="Write your questions, goals, challenges, preferred time, or anything you want to discuss..."
                      rows={4}
                      className={inputClass(errors.message) + " resize-none"}
                    />
                  </Field>

                  <motion.div
                    custom={6}
                    variants={fieldVariants}
                    initial="hidden"
                    animate="show"
                    className="bg-white/75 rounded-2xl p-3 border-2 border-slate-100 shadow-sm"
                  >
                    <ReCaptchaCheckbox ref={recaptchaRef} setCaptchaStatus={setCaptchaStatus} />
                  </motion.div>

                  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d9145b]/25 to-transparent" />

                  <motion.div
                    custom={7}
                    variants={fieldVariants}
                    initial="hidden"
                    animate="show"
                    className="flex items-center justify-center"
                  >
                    <motion.button
                      type="submit"
                      disabled={isAdding || !captchaStatus}
                      whileHover={
                        !isAdding && captchaStatus
                          ? {
                              scale: 1.06,
                              y: -2,
                            }
                          : {}
                      }
                      whileTap={
                        !isAdding && captchaStatus
                          ? {
                              scale: 0.96,
                            }
                          : {}
                      }
                      className="relative overflow-hidden px-8 py-3.5 rounded-full bcm-dm text-sm font-bold text-white disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{
                        background:
                          isAdding || !captchaStatus ? "#cbd5e1" : "linear-gradient(135deg, #2f3985 0%, #d9145b 100%)",
                        boxShadow:
                          !isAdding && captchaStatus
                            ? "0 10px 34px rgba(217,20,91,.28), 0 6px 22px rgba(47,57,133,.22)"
                            : "none",
                        transition: "box-shadow .3s, background .3s",
                      }}
                    >
                      {!isAdding && captchaStatus && (
                        <motion.span
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background:
                              "linear-gradient(105deg, transparent 35%, rgba(255,255,255,.32) 50%, transparent 65%)",
                          }}
                          animate={{
                            x: ["-130%", "230%"],
                          }}
                          transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            repeatDelay: 1.3,
                          }}
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
                            📅 Book Consultation
                            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.3, repeat: Infinity }}>
                              →
                            </motion.span>
                          </>
                        )}
                      </span>
                    </motion.button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-4 mt-1 border-t border-slate-100"
                  >
                    {[
                      ["🔒", "Secure"],
                      ["⚡", "Fast Response"],
                      ["💬", "Expert Guidance"],
                      ["✅", "No Spam"],
                    ].map(([icon, label]) => (
                      <div
                        key={label}
                        className="flex items-center gap-1 bcm-dm text-slate-400"
                        style={{ fontSize: 11 }}
                      >
                        <span>{icon}</span>
                        <span>{label}</span>
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

export default BookConsultationModal

// import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
// import { useEffect, useRef, useState } from "react"
// import toast from "react-hot-toast"
// import { useMutation } from "react-query"
// import ReCaptchaCheckbox from "Components/Contact/ReCaptcha"
// import { reqBookConsultationFn } from "Services/Home"

// /* ─── Google Font injection ─── */
// if (!document.getElementById("bcm-font")) {
//   const l = document.createElement("link")
//   l.id = "bcm-font"
//   l.href =
//     "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
//   l.rel = "stylesheet"
//   document.head.appendChild(l)
// }

// /* ─── CSS keyframes ─── */
// if (!document.getElementById("bcm-styles")) {
//   const s = document.createElement("style")
//   s.id = "bcm-styles"
//   s.textContent = `
//     @keyframes bcmFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
//     @keyframes bcmFloatR{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-8px) rotate(5deg)}}
//     @keyframes bcmSpinSlow{to{transform:rotate(360deg)}}
//     @keyframes bcmShimmer{0%{background-position:-400% center}100%{background-position:400% center}}
//     @keyframes bcmFadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
//     @keyframes bcmRipple{0%{transform:scale(1);opacity:.45}100%{transform:scale(2.6);opacity:0}}
//     @keyframes bcmBlob{0%,100%{border-radius:62% 38% 72% 28%/46% 64% 36% 54%}50%{border-radius:38% 62% 28% 72%/64% 36% 64% 36%}}
//     @keyframes bcmDiag{0%{transform:translate(0,0)}100%{transform:translate(60px,60px)}}
//     @keyframes bcmHeartbeat{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
//     @keyframes bcmSuccessPop{0%{opacity:0;transform:scale(.7) rotate(-8deg)}60%{transform:scale(1.06) rotate(2deg)}100%{opacity:1;transform:scale(1) rotate(0deg)}}

//     .bcm-cormorant{font-family:'Cormorant Garamond',Georgia,serif}
//     .bcm-jakarta{font-family:'Plus Jakarta Sans',system-ui,sans-serif}
//     .bcm-label{font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-size:10.5px;letter-spacing:.15em;text-transform:uppercase;font-weight:700}
//     .bcm-float{animation:bcmFloat 5s ease-in-out infinite}
//     .bcm-floatR{animation:bcmFloatR 6s ease-in-out infinite}
//     .bcm-spin{animation:bcmSpinSlow 22s linear infinite}
//     .bcm-spin-rev{animation:bcmSpinSlow 16s linear infinite reverse}
//     .bcm-blob{animation:bcmBlob 8s ease-in-out infinite}
//     .bcm-ripple{animation:bcmRipple 2.5s ease-out infinite}
//     .bcm-ripple-d{animation:bcmRipple 2.5s ease-out infinite;animation-delay:.8s}
//     .bcm-heartbeat{animation:bcmHeartbeat 2s ease-in-out infinite}
//     .bcm-shimmer-bar{background:linear-gradient(90deg,#2f3985,#d9145b,#e8c56d,#d9145b,#2f3985);background-size:400% auto;animation:bcmShimmer 4s linear infinite}
//     .bcm-shimmer-btn{background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.28) 50%,transparent 65%);background-size:300% auto;animation:bcmShimmer 2.8s linear infinite}
//     .bcm-diag::before{content:'';position:absolute;inset:-50%;background:repeating-linear-gradient(45deg,rgba(255,255,255,.5) 0px,rgba(255,255,255,.5) 1px,transparent 1px,transparent 28px);animation:bcmDiag 8s linear infinite;opacity:.07}
//     .bcm-input{transition:border-color .25s, box-shadow .25s, background .25s}
//     .bcm-input:focus{outline:none;border-color:#2f3985;box-shadow:0 0 0 4px rgba(47,57,133,.1);background:#fff}
//     .bcm-input:hover:not(:focus){border-color:#c4cde6}
//     .bcm-input-err{border-color:#f43f5e!important;background:#fff8f9!important;box-shadow:0 0 0 3px rgba(244,63,94,.1)!important}
//     .bcm-field{animation:bcmFadeUp .5s ease both}
//     .bcm-success-emoji{animation:bcmSuccessPop .7s cubic-bezier(.22,1,.36,1) both,bcmHeartbeat 2.5s ease-in-out 1s infinite}
//   `
//   document.head.appendChild(s)
// }

// /* ──────────── helpers ──────────── */
// const initialState = { email: "", name: "", phone: "", company_name: "", position: "", message: "" }
// const initialErrors = { email: "", name: "", phone: "", company_name: "", position: "", message: "" }

// const Blob = ({ style, delay = "0s" }) => (
//   <div className="bcm-blob absolute pointer-events-none" style={{ ...style, animationDelay: delay }} />
// )

// const StatBadge = ({ icon, label, value, style, delay = "0s" }) => (
//   <div
//     className="absolute z-20 bcm-floatR rounded-2xl px-3 py-2.5 flex items-center gap-2.5"
//     style={{
//       background: "rgba(255,255,255,.1)",
//       border: "1px solid rgba(255,255,255,.2)",
//       backdropFilter: "blur(16px)",
//       boxShadow: "0 8px 24px rgba(0,0,0,.2)",
//       animationDelay: delay,
//       ...style,
//     }}
//   >
//     <span className="text-xl leading-none">{icon}</span>
//     <div>
//       <div className="bcm-label" style={{ fontSize: 9, color: "#e8c56d", marginBottom: 2 }}>
//         {label}
//       </div>
//       <div className="bcm-jakarta text-xs font-bold text-white">{value}</div>
//     </div>
//   </div>
// )

// /* ─── Field ─── */
// const fv = {
//   hidden: { opacity: 0, y: 20 },
//   show: (i) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.065 + 0.2, duration: 0.46, ease: [0.22, 1, 0.36, 1] },
//   }),
// }

// const Field = ({ label, error, index, emoji, children }) => (
//   <motion.div custom={index} variants={fv} initial="hidden" animate="show">
//     <label className="bcm-label flex items-center gap-1.5 mb-1.5 pl-0.5" style={{ color: "#2f3985" }}>
//       <span
//         className="flex items-center justify-center text-xs rounded-md"
//         style={{ width: 22, height: 22, background: "linear-gradient(135deg,rgba(47,57,133,.12),rgba(217,20,91,.1))" }}
//       >
//         {emoji}
//       </span>
//       {label}
//     </label>
//     {children}
//     <AnimatePresence>
//       {error && (
//         <motion.p
//           initial={{ opacity: 0, y: -5, height: 0 }}
//           animate={{ opacity: 1, y: 0, height: "auto" }}
//           exit={{ opacity: 0, y: -5, height: 0 }}
//           className="bcm-jakarta text-xs mt-1.5 pl-0.5 font-semibold"
//           style={{ color: "#f43f5e" }}
//         >
//           ⚠ {error}
//         </motion.p>
//       )}
//     </AnimatePresence>
//   </motion.div>
// )

// const ic = (err) =>
//   `bcm-input bcm-jakarta w-full rounded-xl border-2 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 bg-white/80 ${
//     err ? "bcm-input-err" : "border-gray-200"
//   }`

// /* ══════════════════════════════════════════════
//    MAIN COMPONENT
// ══════════════════════════════════════════════ */
// const BookConsultationModal = ({ modal, setModal }) => {
//   const [formData, setFormData] = useState(initialState)
//   const [errors, setErrors] = useState(initialErrors)
//   const recaptchaRef = useRef(null)
//   const [captchaStatus, setCaptchaStatus] = useState(false)
//   const [submitted, setSubmitted] = useState(false)

//   const closeModal = () => {
//     setModal(false)
//     setErrors(initialErrors)
//     setSubmitted(false)
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((p) => ({ ...p, [name]: value }))
//     if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }))
//   }

//   const validate = () => {
//     const n = {}
//     if (!formData.name.trim()) n.name = "Name is required"
//     if (!formData.email.trim()) n.email = "Email is required"
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) n.email = "Enter a valid email"
//     if (!formData.phone.trim()) n.phone = "Phone number is required"
//     if (!formData.company_name.trim()) n.company_name = "Company name is required"
//     if (!formData.position.trim()) n.position = "Your position is required"
//     if (!formData.message.trim()) n.message = "Please share your questions"
//     else if (formData.message.trim().length < 10) n.message = "At least 10 characters"
//     setErrors(n)
//     return Object.keys(n).length === 0
//   }

//   const { mutate: addQuote, isLoading: isAdding } = useMutation(reqBookConsultationFn, {
//     onSuccess: () => {
//       setSubmitted(true)
//       toast.success("🎉 Consultation booked! We'll be in touch shortly.")
//       setFormData(initialState)
//       setTimeout(closeModal, 3500)
//     },
//     onError: () => toast.error("Something went wrong. Please try again."),
//   })

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (validate()) addQuote({ data: formData })
//     else toast.error("Please fix the errors below")
//   }

//   /* gentle 3-D tilt */
//   const mx = useMotionValue(0),
//     my = useMotionValue(0)
//   const rotX = useTransform(my, [-300, 300], [2, -2])
//   const rotY = useTransform(mx, [-300, 300], [-2, 2])
//   const onMove = (e) => {
//     const r = e.currentTarget.getBoundingClientRect()
//     mx.set(e.clientX - r.left - r.width / 2)
//     my.set(e.clientY - r.top - r.height / 2)
//   }
//   const onLeave = () => {
//     mx.set(0)
//     my.set(0)
//   }

//   return (
//     <AnimatePresence>
//       {modal && (
//         <motion.div
//           key="bcm-backdrop"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.32 }}
//           className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6"
//           style={{ background: "rgba(30,38,96,0.55)", backdropFilter: "blur(22px) saturate(1.8)" }}
//           onClick={(e) => e.target === e.currentTarget && closeModal()}
//         >
//           <motion.div
//             key="bcm-card"
//             initial={{ scale: 0.84, opacity: 0, y: 60 }}
//             animate={{ scale: 1, opacity: 1, y: 0 }}
//             exit={{ scale: 0.84, opacity: 0, y: 60 }}
//             transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//             style={{
//               rotateX: rotX,
//               rotateY: rotY,
//               transformPerspective: 1400,
//               boxShadow:
//                 "0 40px 120px rgba(217,20,91,.28), 0 10px 40px rgba(0,0,0,.3), inset 0 0 0 1px rgba(255,255,255,.12)",
//             }}
//             onMouseMove={onMove}
//             onMouseLeave={onLeave}
//             onClick={(e) => e.stopPropagation()}
//             className="relative w-full max-w-5xl max-h-[95vh] overflow-hidden rounded-[28px] flex flex-col lg:flex-row bg-white"
//           >
//             {/* ── SUCCESS OVERLAY ── */}
//             <AnimatePresence>
//               {submitted && (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.88 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
//                   className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-[28px] px-10 text-center"
//                   style={{ background: "linear-gradient(135deg,#fff5f8,#f5f7ff)" }}
//                 >
//                   <div className="bcm-success-emoji text-8xl mb-5 select-none">🎉</div>
//                   <h3 className="bcm-cormorant font-bold text-gray-800 mb-2" style={{ fontSize: "2.4rem" }}>
//                     You're Booked!
//                   </h3>
//                   <p className="bcm-jakarta text-gray-500 text-sm leading-relaxed max-w-xs">
//                     Our team will review your details and reach out within{" "}
//                     <span className="font-semibold" style={{ color: "#d9145b" }}>
//                       24 hours
//                     </span>{" "}
//                     to confirm your consultation slot.
//                   </p>
//                   <div
//                     className="mt-8 rounded-full overflow-hidden"
//                     style={{ width: 180, height: 5, background: "rgba(217,20,91,.15)" }}
//                   >
//                     <motion.div
//                       initial={{ width: "0%" }}
//                       animate={{ width: "100%" }}
//                       transition={{ duration: 3.5, ease: "linear" }}
//                       className="h-full rounded-full"
//                       style={{ background: "linear-gradient(90deg,#2f3985,#d9145b)" }}
//                     />
//                   </div>
//                   <p className="bcm-jakarta text-xs text-gray-400 mt-2">Closing automatically…</p>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* ══════ LEFT PANEL ══════ */}
//             <motion.div
//               initial={{ x: -80, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//               className="hidden lg:flex lg:w-[42%] relative flex-col justify-between overflow-hidden"
//               style={{ background: "linear-gradient(155deg,#1e2660 0%,#2f3985 50%,#3d1a7a 100%)" }}
//             >
//               {/* diagonal lines */}
//               <div className="bcm-diag absolute inset-0 overflow-hidden pointer-events-none" />

//               {/* blobs */}
//               <Blob
//                 style={{
//                   width: 200,
//                   height: 200,
//                   background: "radial-gradient(circle,rgba(217,20,91,.5),transparent)",
//                   top: -60,
//                   right: -50,
//                   opacity: 1,
//                 }}
//               />
//               <Blob
//                 style={{
//                   width: 160,
//                   height: 160,
//                   background: "radial-gradient(circle,rgba(232,197,109,.3),transparent)",
//                   bottom: 80,
//                   left: -40,
//                   opacity: 1,
//                 }}
//                 delay="3s"
//               />
//               <Blob
//                 style={{
//                   width: 100,
//                   height: 100,
//                   background: "radial-gradient(circle,rgba(47,57,133,.8),transparent)",
//                   top: "45%",
//                   right: 20,
//                   opacity: 1,
//                 }}
//                 delay="1.5s"
//               />

//               {/* rings */}
//               <div
//                 className="bcm-spin absolute rounded-full pointer-events-none"
//                 style={{ width: 100, height: 100, border: "2px dashed rgba(232,197,109,.25)", top: 20, right: 20 }}
//               />
//               <div
//                 className="bcm-spin-rev absolute rounded-full pointer-events-none"
//                 style={{ width: 60, height: 60, border: "2px dashed rgba(217,20,91,.3)", bottom: 80, left: 20 }}
//               />

//               {/* top copy */}
//               <div className="relative z-10 pt-9 px-8">
//                 <div
//                   className="inline-flex items-center gap-2 mb-7 bcm-label"
//                   style={{
//                     background: "rgba(255,255,255,.1)",
//                     border: "1px solid rgba(255,255,255,.18)",
//                     borderRadius: 100,
//                     padding: "6px 14px",
//                     color: "rgba(255,255,255,.8)",
//                     backdropFilter: "blur(12px)",
//                   }}
//                 >
//                   <span
//                     className="bcm-heartbeat block rounded-full"
//                     style={{ width: 7, height: 7, background: "#e8c56d" }}
//                   />
//                   Premium Consultation
//                 </div>
//                 <h2
//                   className="bcm-cormorant font-bold leading-tight mb-3"
//                   style={{ fontSize: "2.4rem", color: "#fff" }}
//                 >
//                   Book Your
//                   <br />
//                   <em style={{ color: "#e8c56d", fontStyle: "italic" }}>Expert</em>
//                   <br />
//                   Session
//                 </h2>
//                 <p
//                   className="bcm-jakarta text-sm leading-relaxed"
//                   style={{ color: "rgba(255,255,255,.6)", maxWidth: 220 }}
//                 >
//                   Connect with our specialists for a tailored strategy session designed around your goals.
//                 </p>
//               </div>

//               {/* illustration */}
//               <div className="relative z-10 flex justify-center items-center py-5 bcm-float">
//                 <StatBadge icon="⚡" label="Response" value="< 24 hrs" style={{ top: -20, left: 12 }} delay="0s" />
//                 <StatBadge icon="🌟" label="Rating" value="4.9 / 5.0" style={{ top: -10, right: 8 }} delay="1.2s" />
//                 <div
//                   className="relative flex items-center justify-center"
//                   style={{
//                     width: 160,
//                     height: 160,
//                     borderRadius: "50%",
//                     background: "linear-gradient(135deg,rgba(217,20,91,.3),rgba(47,57,133,.5))",
//                     boxShadow: "0 0 0 20px rgba(217,20,91,.08),0 0 0 40px rgba(217,20,91,.04)",
//                     fontSize: "5rem",
//                   }}
//                 >
//                   <div
//                     className="bcm-ripple absolute inset-0 rounded-full"
//                     style={{ border: "3px solid rgba(217,20,91,.5)" }}
//                   />
//                   <div
//                     className="bcm-ripple-d absolute inset-0 rounded-full"
//                     style={{ border: "3px solid rgba(217,20,91,.3)" }}
//                   />
//                   🤝
//                 </div>
//               </div>

//               {/* bottom stats */}
//               <div className="relative z-10 px-8 pb-9">
//                 <div
//                   className="mb-5"
//                   style={{ height: 1, background: "linear-gradient(90deg,rgba(255,255,255,.25),transparent)" }}
//                 />
//                 <div className="flex gap-5">
//                   {[
//                     ["500+", "Consultations"],
//                     ["99%", "Satisfaction"],
//                     ["5★", "Rated"],
//                   ].map(([v, l]) => (
//                     <div key={l}>
//                       <div className="bcm-cormorant font-bold" style={{ fontSize: "1.5rem", color: "#e8c56d" }}>
//                         {v}
//                       </div>
//                       <div
//                         className="bcm-jakarta font-medium mt-0.5"
//                         style={{ fontSize: 11, color: "rgba(255,255,255,.5)" }}
//                       >
//                         {l}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>

//             {/* ══════ RIGHT PANEL ══════ */}
//             <div
//               className="w-full lg:w-[58%] overflow-y-auto flex flex-col"
//               style={{ background: "linear-gradient(155deg,#fdfdff,#fff5f8,#f5f7ff)" }}
//             >
//               {/* shimmer bar */}
//               <div className="bcm-shimmer-bar flex-shrink-0" style={{ height: 4 }} />

//               <div className="flex-1 flex flex-col px-6 py-6 lg:px-10 lg:py-9">
//                 {/* header */}
//                 <div className="flex items-start justify-between mb-6">
//                   <motion.div
//                     initial={{ opacity: 0, y: -14 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.18 }}
//                   >
//                     <div className="bcm-label flex items-center gap-2 mb-1.5" style={{ color: "#d9145b" }}>
//                       <span
//                         style={{ width: 20, height: 2, background: "#d9145b", borderRadius: 2, display: "block" }}
//                       />
//                       Get Started Today
//                     </div>
//                     <h3
//                       className="bcm-cormorant font-bold leading-tight"
//                       style={{ fontSize: "2rem", color: "#1e2660" }}
//                     >
//                       Book a Consultation
//                     </h3>
//                   </motion.div>

//                   <motion.button
//                     initial={{ scale: 0, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     transition={{ delay: 0.3, type: "spring", stiffness: 280 }}
//                     whileHover={{ scale: 1.18, rotate: 90, backgroundColor: "#fff5f8", borderColor: "#fca5a5" }}
//                     whileTap={{ scale: 0.88 }}
//                     onClick={closeModal}
//                     className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-gray-200 bg-white/80 flex items-center justify-center text-gray-400 hover:text-pink-600 transition-all duration-200 shadow-sm"
//                     style={{ transition: "all .25s" }}
//                   >
//                     <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
//                       <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
//                     </svg>
//                   </motion.button>
//                 </div>

//                 {/* ── FORM ── */}
//                 <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <Field label="Full Name" error={errors.name} index={0} emoji="👤">
//                       <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         placeholder="Jane Smith"
//                         className={ic(errors.name)}
//                       />
//                     </Field>
//                     <Field label="Email Address" error={errors.email} index={1} emoji="✉️">
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         placeholder="jane@company.com"
//                         className={ic(errors.email)}
//                       />
//                     </Field>
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <Field label="Phone Number" error={errors.phone} index={2} emoji="📞">
//                       <input
//                         type="text"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         placeholder="+1 (555) 000-0000"
//                         className={ic(errors.phone)}
//                       />
//                     </Field>
//                     <Field label="Company Name" error={errors.company_name} index={3} emoji="🏢">
//                       <input
//                         type="text"
//                         name="company_name"
//                         value={formData.company_name}
//                         onChange={handleChange}
//                         placeholder="Acme Corporation"
//                         className={ic(errors.company_name)}
//                       />
//                     </Field>
//                   </div>

//                   <Field label="Your Position / Role" error={errors.position} index={4} emoji="💼">
//                     <input
//                       type="text"
//                       name="position"
//                       value={formData.position}
//                       onChange={handleChange}
//                       placeholder="e.g. Marketing Director, Founder, CTO…"
//                       className={ic(errors.position)}
//                     />
//                   </Field>

//                   <Field label="Questions & Goals for the Session" error={errors.message} index={5} emoji="💬">
//                     <textarea
//                       name="message"
//                       value={formData.message}
//                       onChange={handleChange}
//                       placeholder="What challenges are you facing? What outcomes do you hope to achieve from this consultation?…"
//                       rows={4}
//                       className={ic(errors.message) + " resize-none"}
//                     />
//                   </Field>

//                   {/* reCAPTCHA */}
//                   <motion.div
//                     custom={6}
//                     variants={fv}
//                     initial="hidden"
//                     animate="show"
//                     className="rounded-2xl p-3 border-2 border-gray-100 shadow-sm bg-white/70"
//                   >
//                     <ReCaptchaCheckbox ref={recaptchaRef} setCaptchaStatus={setCaptchaStatus} />
//                   </motion.div>

//                   <div style={{ height: 1, background: "linear-gradient(90deg,transparent,#e2e8f0,transparent)" }} />

//                   {/* Submit */}
//                   <motion.div custom={7} variants={fv} initial="hidden" animate="show">
//                     <motion.button
//                       type="submit"
//                       disabled={isAdding || !captchaStatus}
//                       whileHover={!isAdding && captchaStatus ? { scale: 1.04, y: -2 } : {}}
//                       whileTap={!isAdding && captchaStatus ? { scale: 0.96 } : {}}
//                       className="relative overflow-hidden w-full px-8 py-4 rounded-full bcm-jakarta text-sm font-bold text-white disabled:opacity-40 disabled:cursor-not-allowed"
//                       style={{
//                         background:
//                           isAdding || !captchaStatus ? "#d1d5db" : "linear-gradient(135deg,#d9145b 0%,#a00d42 100%)",
//                         boxShadow:
//                           !isAdding && captchaStatus
//                             ? "0 10px 36px rgba(217,20,91,.4), 0 3px 10px rgba(0,0,0,.1)"
//                             : "none",
//                         transition: "box-shadow .3s, background .3s",
//                       }}
//                     >
//                       {/* shimmer sweep */}
//                       {!isAdding && captchaStatus && (
//                         <motion.span
//                           className="bcm-shimmer-btn absolute inset-0 pointer-events-none"
//                           animate={{ x: ["-130%", "230%"] }}
//                           transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.4 }}
//                         />
//                       )}
//                       <span className="relative flex items-center justify-center gap-2">
//                         {isAdding ? (
//                           <>
//                             <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
//                               <circle
//                                 cx="12"
//                                 cy="12"
//                                 r="10"
//                                 stroke="currentColor"
//                                 strokeWidth="3"
//                                 strokeOpacity=".25"
//                               />
//                               <path
//                                 d="M12 2a10 10 0 0 1 10 10"
//                                 stroke="currentColor"
//                                 strokeWidth="3"
//                                 strokeLinecap="round"
//                               />
//                             </svg>
//                             Booking…
//                           </>
//                         ) : (
//                           <>
//                             📅 Book My Consultation
//                             <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.3, repeat: Infinity }}>
//                               →
//                             </motion.span>
//                           </>
//                         )}
//                       </span>
//                     </motion.button>
//                   </motion.div>

//                   {/* trust row */}
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 1 }}
//                     className="flex items-center justify-center gap-5 flex-wrap pt-4 mt-1 border-t border-gray-100"
//                   >
//                     {[
//                       ["🔒", "Secure & Private"],
//                       ["⚡", "Fast Response"],
//                       ["✅", "No Spam Ever"],
//                       ["🌟", "Top Rated"],
//                     ].map(([ic, lb]) => (
//                       <div
//                         key={lb}
//                         className="flex items-center gap-1 bcm-jakarta text-gray-400"
//                         style={{ fontSize: 11 }}
//                       >
//                         <span>{ic}</span>
//                         <span>{lb}</span>
//                       </div>
//                     ))}
//                   </motion.div>
//                 </form>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   )
// }

// export default BookConsultationModal
