import { use, useEffect, useState } from "react"
import React from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { claudCalcVerifyFn, otpVerifyFn } from "Services/Home"

export default function CloudCalculator({ isDirect = false }) {
  const navigate = useNavigate()
  const [vcpu, setVcpu] = useState(8)
  const [ram, setRam] = useState(32)
  const [storage, setStorage] = useState(500)
  const [support, setSupport] = useState("premium")
  const [backup, setBackup] = useState("daily")
  const [ssl, setSsl] = useState("none")
  const isVerified = localStorage.getItem("cloud_calc_verified")
  const [isUnlocked, setIsUnlocked] = useState(isDirect | (isVerified == "true") | false)
  const [step, setStep] = useState("form")
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [documentId, setDocumentId] = useState("")
  const [showResult, setShowResult] = useState(false)

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    position: "",
  })

  const [otp, setOtp] = useState("")

  // const getVerificationStatus = () => {
  //   const data = localStorage.getItem("cloud_calc_verified")
  //   if (!data) return false

  //   try {
  //     const parsed = JSON.parse(data)

  //     if (Date.now() > parsed.expiry) {
  //       localStorage.removeItem("cloud_calc_verified") // expired
  //       return false
  //     }

  //     return parsed.value === true
  //   } catch {
  //     return false
  //   }
  // }
  // const isVerified = getVerificationStatus()
  // const [isUnlocked, setIsUnlocked] = useState(isVerified)

  useEffect(() => {
    if (!isUnlocked) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isUnlocked])

  useEffect(() => {
    if (isVerified == "true") setIsUnlocked(true)
  }, [isVerified])

  const handleSubmit = async () => {
    if (!validateForm()) return
    setLoading(true)
    try {
      const res = await claudCalcVerifyFn({ ...form })
      setDocumentId(res?.data?.data?.documentId || "")
      toast.success("OTP sent successfully to your email.")
      setStep("otp")
    } catch (err) {
      toast.error("Failed to send OTP")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    try {
      // const expiryTime = Date.now() + 24 * 60 * 60 * 1000 // 24 hours

      // localStorage.setItem(
      //   "cloud_calc_verified",
      //   JSON.stringify({
      //     value: true,
      //     expiry: expiryTime,
      //   })
      // )
      await otpVerifyFn({ document_id: documentId, otp })
      setDocumentId("")
      localStorage.setItem("cloud_calc_verified", true)
      toast.success("OTP verified! Cloud Calculator unlocked.")
      setIsUnlocked(true)
    } catch (error) {
      const message = error?.response?.data?.error?.message || error?.message || "Something went wrong"
      toast.error(message)
    }
  }

  const validateForm = () => {
    if (!form.name.trim()) {
      toast.error("Name is required")
      return false
    }
    if (!form.company.trim()) {
      toast.error("Company is required")
      return false
    }
    if (!form.email.trim()) {
      toast.error("Email is required")
      return false
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      toast.error("Invalid email")
      return false
    }
    if (!form.phone.trim()) {
      toast.error("Phone is required")
      return false
    }
    // if (!/^\d{10,15}$/.test(form.phone)) {
    //   toast.error("Invalid phone number")
    //   return false
    // }
    if (!/^\+?[0-9-]{9,16}$/.test(form.phone)) {
      toast.error("Phone must be 9–16 characters and can include + or - only")
      return false
    }
    return true
  }

  const RATES = {
    ramPerGB: 8.5,
    storagePer100GB: 65,
    support: { standard: 0, premium: 150, enterprise: 350 },
    backup: { daily: 0, twohourly: 80 },
  }

  const calculateCost = () => {
    if (vcpu > 24) return null
    const ramCost = ram * RATES.ramPerGB
    const storageCost = (storage / 100) * RATES.storagePer100GB
    const supportCost = RATES.support[support]
    const backupCost = RATES.backup[backup]
    return {
      total: ramCost + storageCost + supportCost + backupCost,
      ramCost,
      storageCost,
      supportCost,
      backupCost,
    }
  }

  useEffect(() => {
    if (!showResult) {
      let result = calculateCost()
      result.total && setShowResult(true)
    }
  }, [])
  const supportLabel = {
    standard: "Standard Support",
    premium: "Premium Support (24/7, 4hr SLA)",
    enterprise: "Enterprise Support",
  }
  const backupLabel = { daily: "Daily Backup (Included)", twohourly: "2-Hourly Backup" }

  return (
    <div>
      {/* UNLOCK MODAL */}
      {!isUnlocked && (
        <div style={{ zIndex: 1000 }} className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div style={{ marginTop: "5rem" }} className="bg-white rounded-2xl p-5 pt-2 w-full max-w-sm shadow-xl">
            {step === "form" ? (
              <>
                <h3 className="text-lg font-semibold !my-1">Unlock Cloud Calculator</h3>
                <Input
                  label="Name"
                  required
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  error={errors.name}
                />
                <Input
                  label="Company"
                  required
                  value={form.company}
                  onChange={(v) => setForm({ ...form, company: v })}
                  error={errors.company}
                />
                <Input
                  label="Email"
                  required
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  error={errors.email}
                />
                <Input
                  label="Phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(v) => setForm({ ...form, phone: v })}
                  error={errors.phone}
                />
                <Input label="Position" value={form.position} onChange={(v) => setForm({ ...form, position: v })} />
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full mt-4 py-2 rounded-lg text-white bg-gradient-to-r from-purple-600 to-pink-500"
                >
                  {loading ? "Sending..." : "Submit & Get OTP"}
                </button>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-4">Verify OTP</h3>
                <OtpInput value={otp} setValue={setOtp} onSubmit={handleVerifyOtp} />
                <button
                  onClick={handleVerifyOtp}
                  className="w-full py-2 rounded-lg text-white bg-gradient-to-r from-purple-600 to-pink-500 mt-4"
                >
                  Verify & Unlock
                </button>
                <button
                  onClick={() => {
                    setStep("form")
                    setOtp("")
                  }}
                  className="w-full mt-2 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
                >
                  ← Back to form
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* MAIN UI */}
      <div className={isUnlocked ? "" : "pointer-events-none blur-sm"}>
        <div className="bg-[#f5f5f7] min-h-screen pb-10 " style={{ fontFamily: "Inter, sans-serif" }}>
          {/* HERO */}
          <div className="!bg-[#ffffff] pt-10 px-4">
            <div className="text-center max-w-5xl flex flex-col items-center mx-auto">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-xs font-semibold mb-4">
                ● DCC CLOUD — ENTERPRISE HOSTING ●
              </div>
              <h1 className="!text-3xl md:!text-5xl !my-[1rem] !mb-0 font-bold">
                How much will your{" "}
                <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
                  cloud hosting
                </span>{" "}
                cost?
              </h1>
              <div
                style={{
                  width: "60px",
                  height: "4px",
                  margin: "1px auto 20px",
                  background: "linear-gradient(90deg, #e91e8c, #7b2ff7)",
                  borderRadius: "2px",
                }}
              ></div>
              <p className="text-gray-500 !max-w-xl mt-2 !text-[16px]">
                Get an instant estimate for hosting your enterprise applications on DCC Cloud infrastructure. Takes 60
                seconds.
              </p>
              <p className="!text-gray-400 !text-[13px] mt-2">
                No commitment. Our team will validate your estimate for free.
              </p>
            </div>

            {/* TRUST BAR */}
            <div className="mt-8 border-y py-4 flex flex-wrap justify-center gap-8 text-xs text-black/80">
              <span className="flex items-center gap-1">
                <span className="!text-2xl">⚡</span>
                <div>
                  <div className="font-semibold">99.9% Uptime</div>
                  <div className="text-gray-400">Guaranteed SLA</div>
                </div>
              </span>
              <span className="flex items-center gap-1">
                <span className="!text-xl">🏢</span>
                <div>
                  <div className="font-semibold">Iron Mountain Tier 3</div>
                  <div className="text-gray-400">Amsterdam primary datacenter</div>
                </div>
              </span>
              <span className="flex items-center gap-1">
                <span className="!text-xl">💾</span>
                <div>
                  <div className="font-semibold">Offsite DR Storage</div>
                  <div className="text-gray-400">Included on all plans</div>
                </div>
              </span>
              <span className="flex items-center gap-1">
                <span className="!text-xl">🏆</span>
                <div>
                  <div className="font-semibold">SAP Gold Partner</div>
                  <div className="text-gray-400">Certified infrastructure</div>
                </div>
              </span>
            </div>
          </div>

          {/* TWO COLUMN LAYOUT */}
          <div className="max-w-5xl mx-auto mt-8 flex  justify-center   gap-6 items-start">
            {/* LEFT: CALCULATOR */}
            <div className="bg-white w-[65%] rounded-2xl p-6 shadow-sm">
              <h2 className="font-semibold text-lg !my-0">Estimate Your Monthly Cost</h2>
              <p className="text-xs text-gray-400 mb-6">Adjust the options below to match your infrastructure needs</p>

              {/* vCPUs Section */}
              <div className="mb-4">
                <div className="flex items-center gap-1 mb-3">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">vCPUs</label>
                  <Tooltip text="Virtual CPU cores allocated to your server" />
                </div>

                <div className="flex items-center gap-6">
                  <input
                    type="range"
                    min="2"
                    max="32"
                    step="2"
                    value={vcpu}
                    onChange={(e) => setVcpu(Number(e.target.value))}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                  <span className="text-purple-600 text-sm font-bold min-w-[80px] text-right">{vcpu} vCPU</span>
                </div>

                <div className="flex justify-between mt-2">
                  <span className="text-xs text-green-500 font-medium">2–20 cores: Included free</span>
                  {/* {vcpu > 20 && (
                    <span className="text-xs text-amber-500 font-medium flex items-center gap-1">
                      ⚡ Flexible — contact us
                    </span>
                  )} */}
                  <span
                    className={`text-xs ${
                      vcpu <= 20
                        ? "text-green-500 font-semibold"
                        : vcpu <= 24
                          ? "text-amber-500 font-semibold"
                          : "text-red-500 font-semibold"
                    }`}
                  >
                    {vcpu <= 20 ? "✓ Free" : vcpu <= 24 ? "⚡ Flexible — contact us" : "⚠ Consultation required"}
                  </span>
                </div>
              </div>

              {/* RAM Section */}
              <div className="mb-4">
                <div className="flex items-center gap-1 mb-3">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">RAM</label>
                  <Tooltip text="Memory allocated to your virtual machine" />
                </div>

                <div className="flex items-center gap-6">
                  <input
                    type="range"
                    min="8"
                    max="256"
                    step="8"
                    value={ram}
                    onChange={(e) => setRam(Number(e.target.value))}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                  <span className="text-purple-600 text-sm font-bold min-w-[80px] text-right">{ram}GB</span>
                </div>

                <div className="mt-2">
                  <span className="text-xs text-gray-400 font-medium">$8.50 / GB / month</span>
                </div>
              </div>

              {/* STORAGE Section */}
              <div className="mb-4">
                <div className="flex items-center gap-1 mb-3">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Storage</label>
                  <Tooltip text="SSD block storage attached to your server" />
                </div>

                <div className="flex items-center gap-6">
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    step="100"
                    value={storage}
                    onChange={(e) => setStorage(Number(e.target.value))}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                  <span className="text-purple-600 text-sm font-bold min-w-[80px] text-right">{storage}GB</span>
                </div>

                <div className="mt-2">
                  <span className="text-xs text-gray-400 font-medium">$65 / 100GB / month</span>
                </div>
              </div>

              {/* vCPU */}
              {/* <div className="mb-5">
                <div className="flex items-center gap-1 mb-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">vCPUs</label>
                  <Tooltip text="Virtual CPU cores allocated to your server" />
                </div>
                <input
                  type="range"
                  min="2"
                  max="32"
                  step="2"
                  value={vcpu}
                  onChange={(e) => setVcpu(Number(e.target.value))}
                  className="w-full accent-purple-600"
                />
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-green-500">2–20 cores: Included free</span>
                  <span className="text-purple-600 text-sm font-semibold">{vcpu} vCPU</span>
                </div>
                <div className="text-right">
                  <span
                    className={`text-xs ${
                      vcpu <= 20
                        ? "text-green-500 font-semibold"
                        : vcpu <= 24
                          ? "text-amber-500 font-semibold"
                          : "text-red-500 font-semibold"
                    }`}
                  >
                    {vcpu <= 20 ? "✓ Free" : vcpu <= 24 ? "⚡ Flexible — contact us" : "⚠ Consultation required"}
                  </span>
                </div>
              </div> */}

              {/* RAM */}
              {/* <div className="mb-5">
                <div className="flex items-center gap-1 mb-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">RAM</label>
                  <Tooltip text="Memory allocated to your virtual machine" />
                </div>
                <input
                  type="range"
                  min="8"
                  max="256"
                  step="8"
                  value={ram}
                  onChange={(e) => setRam(Number(e.target.value))}
                  className="w-full accent-purple-600"
                />
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-400">$8.50 / GB / month</span>
                  <span className="text-purple-600 text-sm font-semibold">{ram} GB</span>
                </div>
              </div> */}

              {/* STORAGE */}
              {/* <div className="mb-5">
                <div className="flex items-center gap-1 mb-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Storage</label>
                  <Tooltip text="SSD block storage attached to your server" />
                </div>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="100"
                  value={storage}
                  onChange={(e) => setStorage(Number(e.target.value))}
                  className="w-full accent-purple-600"
                />
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-400">$65 / 100GB / month</span>
                  <span className="text-purple-600 text-sm font-semibold">{storage} GB</span>
                </div>
              </div> */}

              {/* SUPPORT LEVEL */}
              <div className="mb-4">
                <div className="flex items-center gap-1 mb-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Support Level</label>
                  <Tooltip text="Choose your support tier" />
                </div>
                <div className="relative">
                  <select
                    value={support}
                    onChange={(e) => setSupport(e.target.value)}
                    className="w-full border rounded-lg p-2 text-sm appearance-none pr-8 bg-white"
                  >
                    <option value="standard">Standard (Bussiness Hours)</option>
                    <option value="premium">Premium (24/7, 4hr SLA)</option>
                    <option value="enterprise">Enterprise (Dedicated Manager)</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▼</span>
                </div>
              </div>

              {/* BACKUP */}
              <div className="mb-4">
                <div className="flex items-center gap-1 mb-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Backup &amp; Replication</label>
                  <Tooltip text="How often your data is backed up" />
                </div>
                <div className="relative">
                  <select
                    value={backup}
                    onChange={(e) => setBackup(e.target.value)}
                    className="w-full border rounded-lg p-2 text-sm appearance-none pr-8 bg-white"
                  >
                    <option value="daily">Daily Backup (Included)</option>
                    <option value="twohourly">2-Hourly Replication(+add-on)</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▼</span>
                </div>
              </div>

              {/* SSL */}
              <div className="mb-6">
                <div className="flex items-center gap-1 mb-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">SSL Certificate</label>
                  <Tooltip text="SSL/TLS certificates for your domains" />
                </div>
                <div className="relative">
                  <select
                    value={ssl}
                    onChange={(e) => setSsl(e.target.value)}
                    className="w-full border rounded-lg p-2 text-sm appearance-none pr-8 bg-white"
                  >
                    <option value="none">Not Required (Internal / Server Only)</option>
                    <option value="included">Required (Web / Mobile App ) - Included</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▼</span>
                </div>
              </div>

              {/* CALCULATE BUTTON */}
              <button
                onClick={() => setShowResult(true)}
                className="w-full py-3 rounded-xl text-white font-semibold text-sm bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition"
              >
                Calculate My Estimate →
              </button>

              {/* RESULT */}
              {showResult && (
                <>
                  {vcpu > 24 ? (
                    <div className="mt-6 bg-yellow-50 border border-yellow-300 rounded-xl p-5 text-center">
                      <h3 className="font-semibold text-yellow-800 mb-2">⚠ Custom Configuration Required</h3>
                      <p className="text-sm text-yellow-700 mb-4">Deployments above 24 vCPU require consultation.</p>
                      <a
                        href="/contact"
                        className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        Contact Us
                      </a>
                    </div>
                  ) : (
                    (() => {
                      const result = calculateCost()
                      if (!result) return null
                      return (
                        <div className="mt-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl p-6">
                          <div className="text-xs opacity-80 uppercase tracking-wide">Estimated Monthly Cost</div>
                          <div className="text-3xl lg:text-4xl font-bold mt-1">
                            ${result.total.toFixed(2)}
                            <span className="text-sm font-normal"> / month</span>
                          </div>

                          {/* BREAKDOWN */}
                          <div className="mt-0 lg:mt-4 text-[11px] lg:text-[14px] space-y-2.5 lg:space-y-2 border-t border-white/20 pt-4">
                            <div className="flex justify-between border-b border-white/10 ">
                              <span>{vcpu} vCPU</span>
                              <span className="font-semibold">{vcpu <= 20 ? "Included Free" : "Flexible"}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 ">
                              <span>RAM ({ram}GB × $8.50)</span>
                              <span className="font-semibold">${result.ramCost.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 ">
                              <span>Storage ({storage}GB)</span>
                              <span className="font-semibold">${result.storageCost.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 ">
                              <span>{supportLabel[support]}</span>
                              <span className="font-semibold">
                                {result.supportCost === 0 ? "Included" : `$${result.supportCost}`}
                              </span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 ">
                              <span>Daily Backup</span>
                              <span className="font-semibold">
                                {result.backupCost === 0 ? "Included" : `$${result.backupCost}`}
                              </span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 ">
                              <span>Offsite DR Storage</span>
                              <span className="font-semibold">Included</span>
                            </div>
                            <div className="flex justify-between">
                              <span>SSL Certificate (N/A)</span>
                              <span className="font-semibold">{ssl === "none" ? "Not required" : "Included"}</span>
                            </div>
                          </div>

                          {/* CTA BUTTONS */}
                          <div className="mt-5 grid grid-cols-2 gap-3">
                            <button
                              onClick={() => navigate("/contact")}
                              className="bg-white text-purple-600 font-semibold text-xs px-2 lg:text-sm py-2 rounded-lg hover:bg-purple-50 transition"
                            >
                              <a href="/contact"> Get Formal Quote</a>
                            </button>

                            {/* onClick={() => navigate("/contact")} */}
                            <a
                              href="tel:+255222112161"
                              className="border border-white text-center text-white font-semibold text-xs px-2  lg:text-sm py-2 rounded-lg hover:bg-white/10 transition"
                            >
                              {/* <a href="tel:+255222112161"> */} <span>📞</span> Call Us {/* </a> */}
                            </a>
                          </div>
                        </div>
                      )
                    })()
                  )}
                </>
              )}
            </div>

            {/* RIGHT COLUMN */}
            <div className="w-[35%] space-y-4">
              {/* PRICING GLANCE */}
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="font-semibold text-sm mb-4">💠 Pricing at a Glance</h3>
                <div className="text-sm">
                  <Row label="vCPU (up to 20 cores)" value="Free" green />
                  <Row label="vCPU (21–24 cores)" value="Flexible" yellow />
                  <Row label="vCPU (25+ cores)" value="Consult required" yellow />
                  <Row label="RAM" value="$8.50 / GB / mo" purple />
                  <Row label="Storage" value="$65 / 100GB / mo" purple />
                  <Row label="Daily Backup" value="Included" green />
                  <Row label="Offsite DR Storage" value="Included" green />
                  <Row label="SSL (web/mobile)" value="Included" green />
                </div>
              </div>

              {/* ALWAYS INCLUDED */}
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="font-semibold text-sm mb-4">✅ What's Always Included</h3>
                <ul className="text-sm text-gray-600 space-y-3">
                  {[
                    { color: "text-green-500", text: "Managed infrastructure & OS patching" },
                    { color: "text-purple-500", text: "99.9% uptime SLA with credits" },
                    { color: "text-purple-500", text: "Daily automated backups" },
                    { color: "text-purple-500", text: "DDoS protection & firewall" },
                    { color: "text-purple-500", text: "SSL certificates (web & mobile apps)" },
                    { color: "text-purple-500", text: "Monitoring & alerting" },
                    { color: "text-purple-500", text: "Offsite DR storage (Virginia location)" },
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className={item.color}>✔</span> {item.text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CONSULTATION CTA */}
              <div className="rounded-xl p-6 text-center text-white bg-gradient-to-r from-purple-600 to-pink-500">
                <h3 className="font-semibold text-sm mb-2">Not sure what you need?</h3>
                <p className="text-xs text-white opacity-80 mb-4">
                  Our team will review your estimate for free and recommend the right configuration for your workload.
                </p>
                <button
                  onClick={() => navigate("/contact")}
                  className="bg-white text-purple-600 px-6 py-2 rounded-md text-sm font-semibold w-full hover:bg-purple-50 transition"
                >
                  <a href="/contact"> Book a Free Consultation</a>
                </button>
                <p className="text-xs mt-2 text-white opacity-80">or call +255-22-2112161</p>
              </div>
            </div>
          </div>
          {/* INFRASTRUCTURE */}
          <div className=" max-w-5xl my-4 mx-auto  p-8">
            {/* Heading */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Enterprise Infrastructure, Built for East Africa</h2>
              <div className="w-12 h-[3px] bg-gradient-to-r from-pink-500 to-purple-600 mx-auto mt-3 rounded-full"></div>
            </div>

            {/* Top row — 4 columns */}
            <div className="grid  md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <Feature
                icon="🌍"
                iconBg="bg-blue-50"
                title="Local Expertise"
                desc="Tanzania-based team with 20+ years serving East African enterprises"
              />
              <Feature
                icon="🖥️"
                iconBg="bg-purple-50"
                title="Tier 3 Datacenter"
                desc="Iron Mountain Amsterdam — one of the world's most secure hosting facilities"
              />
              <Feature
                icon="💾"
                iconBg="bg-pink-50"
                title="Offsite DR Storage"
                desc="Cold DR storage in Virginia included on every plan for data resilience"
              />
              <Feature
                icon="🛡️"
                iconBg="bg-blue-50"
                title="Enterprise Security"
                desc="Multi-level failover, encryption at rest and in transit"
              />
              <Feature
                icon="🏅"
                iconBg="bg-yellow-50"
                title="SAP Certified"
                desc="Gold Partner infrastructure certified for SAP Business One & S/4HANA"
              />
              <Feature
                icon="📞"
                iconBg="bg-pink-50"
                title="Dedicated Support"
                desc="Real humans, not bots — available 24/7 on premium plans"
              />
            </div>

            {/* Bottom row — 2 columns centered */}
            {/* <div className="grid grid-cols-2 md:grid-cols-2 gap-4 max-w-md mx-auto">
              
            </div> */}
          </div>

          {/* <div>
            <div className="text-center mb-4">
              <h2 className="text-lg font-semibold">Enterprise Infrastructure, Built for East Africa</h2>
              <div className="w-10 h-[2px] bg-gradient-to-r from-pink-500 to-purple-600 mx-auto mt-2"></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Feature
                title="Local Expertise"
                desc="Tanzania-based team with 20+ years serving East African enterprises"
              />
              <Feature
                title="Tier 3 Datacenter"
                desc="Iron Mountain Amsterdam — one of the world's most secure hosting facilities"
              />
              <Feature
                title="Offsite DR Storage"
                desc="Cold DR storage in Virginia included on every plan for data resilience"
              />
              <Feature title="Enterprise Security" desc="Multi-level failover, encryption at rest and in transit" />
              <Feature
                title="SAP Certified"
                desc="Gold Partner infrastructure certified for SAP Business One & S/4HANA"
              />
              <Feature title="Dedicated Support" desc="Real humans, not bots — available 24/7 on premium plans" />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

/* TOOLTIP */
function Tooltip({ text }) {
  return (
    <div className="relative group inline-block">
      <span className="w-4 h-4 rounded-full bg-gray-100 text-gray-400 text-[10px] flex items-center justify-center cursor-help font-bold">
        i
      </span>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 w-40 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition z-10 text-center">
        {text}
      </div>
    </div>
  )
}

/* ROW */
function Row({ label, value, green, yellow, purple }) {
  return (
    <div className="flex justify-between py-2 border-b last:border-none text-xs">
      <span className="text-gray-600">{label}</span>
      <span
        className={`font-semibold ${green ? "text-green-500" : yellow ? "text-yellow-600" : purple ? "text-purple-600" : ""}`}
      >
        {value}
      </span>
    </div>
  )
}

/* FEATURE CARD */
// function Feature({ title, desc }) {
//   return (
//     <div className="bg-white rounded-xl p-4 !shadow-xl text-center">
//       <div className="text-xl mb-2">🔷</div>
//       <h4 className="text-sm font-semibold mb-1">{title}</h4>
//       <p className="text-xs text-gray-500">{desc}</p>
//     </div>
//   )
// }
{
  /* Updated Feature component */
}

function Feature({ icon, iconBg, title, desc }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 text-center shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-14 h-14 ${iconBg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
        <span className="text-2xl">{icon}</span>
      </div>
      <h4 className="text-sm font-semibold text-gray-800 mb-2">{title}</h4>
      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
    </div>
  )
}

/* OTP INPUT */
function OtpInput({ value, setValue, onSubmit }) {
  const handleChange = (e, index) => {
    const val = e.target.value
    if (!/^\d?$/.test(val)) return
    const newOtp = value.split("")
    newOtp[index] = val
    setValue(newOtp.join(""))
    if (val && index < 5) document.getElementById(`otp-${index + 1}`)?.focus()
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !value[index] && index > 0) document.getElementById(`otp-${index - 1}`)?.focus()
    if (e.key === "Enter" && value.length === 6) onSubmit()
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, 6)
    if (!/^\d+$/.test(paste)) return
    setValue(paste)
  }

  return (
    <div className="flex gap-2 justify-center mb-2" onPaste={handlePaste}>
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <input
            key={i}
            id={`otp-${i}`}
            type="text"
            value={value[i] || ""}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            maxLength={1}
            className="w-10 h-12 text-center text-lg font-semibold border rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        ))}
    </div>
  )
}

/* INPUT */
// function Input({ label, value, onChange, error, required, type = "text" }) {
//   return (
//     <div className="mb-3">
//       <label className="text-xs font-semibold text-gray-500">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       <input
//         type={type}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className={`w-full border rounded-lg p-2 text-sm mt-1 ${error ? "border-red-500" : ""}`}
//       />
//     </div>
//   )
// }
function Input({ label, value, onChange, error, required, type = "text" }) {
  const handleChange = (val) => {
    if (type === "tel") {
      // Allow only digits, + and -
      const cleaned = val.replace(/[^0-9+-]/g, "")

      // Limit length to 16
      if (cleaned.length <= 18) {
        onChange(cleaned)
      }
    } else {
      onChange(val)
    }
  }

  return (
    <div className="mb-1.5">
      <label className="text-xs font-semibold text-gray-500">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className={`w-full border rounded-lg p-2 text-sm mt-0.5 ${error ? "border-red-500" : ""}`}
        placeholder={type === "tel" ? "+91 9876543210" : ""}
      />
    </div>
  )
}
