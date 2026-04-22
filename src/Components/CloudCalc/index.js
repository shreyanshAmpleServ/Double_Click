import { useEffect, useState } from "react"

export default function CloudCalculator() {
  const isVerified = localStorage.getItem("cloud_calc_verified") // simple client-side check to persist unlock state
  const [vcpu, setVcpu] = useState(8)
  const [ram, setRam] = useState(128)
  const [storage, setStorage] = useState(2500)
  const [support, setSupport] = useState("enterprise")
  const [backup, setBackup] = useState("twohourly")
  const [ssl, setSsl] = useState("none")
  const [isUnlocked, setIsUnlocked] = useState((isVerified == "true") | false)
  const [step, setStep] = useState("form") // form | otp
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [documentId, setDocumentId] = useState("") // for OTP verification

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    position: "",
  })

  const [otp, setOtp] = useState("")
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

  const handleSubmit = async () => {
    if (!validateForm()) return

    setLoading(true)

    try {
      const res = await claudCalcVerifyFn({ ...form })

      setDocumentId(res?.data?.data?.documentId || "") // store document ID for OTP verification
      toast.success("OTP sent successfully to your email.")
      setStep("otp")
    } catch (err) {
      toast.error("Failed to send OTP")
    } finally {
      setLoading(false)
    }
  }
  //   const handleSubmit = () => {
  //     if (!validateForm()) return
  //     claudCalcVerifyFn({
  //       name: form.name,
  //       company: form.company,
  //       email: form.email,
  //       phone: form.phone,
  //       position: form.position,
  //     })
  //     console.log("Send OTP to:", form.email)
  //     setStep("otp")
  //   }

  const handleVerifyOtp = async () => {
    try {
      const res = await otpVerifyFn({
        document_id: documentId,
        otp,
      })

      // success
      setDocumentId("")
      localStorage.setItem("cloud_calc_verified", true)
      toast.success("OTP verified! Cloud Calculator unlocked.")
      setIsUnlocked(true)
    } catch (error) {
      // Extract message safely
      const message = error?.response?.data?.error?.message || error?.message || "Something went wrong"

      toast.error(message)
    }
  }
  const validateForm = () => {
    const newErrors = {}
    if (!form.name.trim()) {
      newErrors.name = "Name is required"
      toast.error("Name is required")
      return false
    }

    if (!form.company.trim()) {
      newErrors.company = "Company is required"
      toast.error("Company is required")
      return false
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required"
      toast.error("Email is required")
      return false
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email"
      toast.error("Invalid email")
      return false
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required"
      toast.error("Phone is required")
      return false
    }

    if (!/^\d{10,15}$/.test(form.phone)) {
      newErrors.phone = "Invalid phone number"
      toast.error("Invalid phone number")
      return false
    }

    // if (!form.position.trim()) {
    //   toast.error("Position is required")
    //   return false
    // }
    setErrors(newErrors)
    return true
  }

  useEffect(() => {
    console.log("isVerified", isVerified, isVerified == "true")
    if (isVerified == "true") {
      setIsUnlocked(true)
    }
  }, [isVerified])

  const [showResult, setShowResult] = useState(false)
  const RATES = {
    ramPerGB: 8.5,
    storagePer100GB: 65,
    support: {
      standard: 0,
      premium: 150,
      enterprise: 350,
    },
    backup: {
      daily: 0,
      twohourly: 80,
    },
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
  return (
    <div className="">
      {!isUnlocked && (
        <div style={{ zIndex: 1000 }} className="fixed inset-0 bg-black/40 flex items-center justify-center !z-50 ">
          <div style={{ marginTop: "5rem" }} className="bg-white rounded-2xl p-5 pt-2 w-full max-w-sm shadow-xl  !z-50">
            {step === "form" ? (
              <>
                <h3 className="text-lg font-semibold !my-2">Unlock Cloud Calculator</h3>
                <Input
                  label="Name"
                  required={true}
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  error={errors.name}
                />

                <Input
                  label="Company"
                  required={true}
                  value={form.company}
                  onChange={(v) => setForm({ ...form, company: v })}
                  error={errors.company}
                />

                <Input
                  label="Email"
                  required={true}
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  error={errors.email}
                />

                <Input
                  label="Phone"
                  type="tel"
                  required={true}
                  value={form.phone}
                  onChange={(v) => setForm({ ...form, phone: v })}
                  error={errors.phone}
                />

                <Input
                  label="Position"
                  value={form.position}
                  onChange={(v) => setForm({ ...form, position: v })}
                  //   error={errors.position}
                />
                {/* <Input label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                <Input label="Company" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
                <Input label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                <Input label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                <Input label="Position" value={form.position} onChange={(v) => setForm({ ...form, position: v })} /> */}

                {/* <button
                  onClick={handleSubmit}
                  className="w-full mt-4 py-2 rounded-lg text-white bg-gradient-to-r from-purple-600 to-pink-500"
                >
                  Submit & Get OTP
                </button> */}
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
                    setOtp("") // optional reset
                  }}
                  className="w-full mt-2 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
                >
                  ← Back to form
                </button>
              </>
              //   <>
              //     <h3 className="text-lg font-semibold mb-4">Verify OTP</h3>

              //     <input
              //       value={otp}
              //       onChange={(e) => {
              //         const value = e.target.value

              //         // Allow only numbers & max 6 digits
              //         if (/^\d*$/.test(value) && value.length <= 6) {
              //           setOtp(value)
              //         }
              //       }}
              //       placeholder="Enter OTP"
              //       maxLength={6}
              //       className="w-full border rounded-lg p-2 mb-4"
              //     />

              //     <button
              //       onClick={handleVerifyOtp}
              //       className="w-full py-2 rounded-lg text-white bg-gradient-to-r from-purple-600 to-pink-500"
              //     >
              //       Verify & Unlock
              //     </button>
              //   </>
            )}
          </div>
        </div>
      )}

      {/* YOUR EXISTING UI */}
      <div className={isUnlocked ? "" : "pointer-events-none blur-sm"}></div>
      <div className="bg-[#f5f5f7] min-h-screen py-10 px-4 font-[Inter]">
        {/* HERO */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-xs font-semibold mb-4">
            ● DCC CLOUD — ENTERPRISE HOSTING ●
          </div>

          <h1 className="text-3xl md:text-4xl font-bold">
            How much will your{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
              cloud hosting
            </span>{" "}
            cost?
          </h1>

          <p className="text-gray-500 mt-3 text-sm">
            Get an instant estimate for hosting your enterprise applications on DCC Cloud infrastructure.
          </p>
        </div>

        {/* TRUST BAR */}
        <div className="mt-8 border-y py-4 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          <span>⚡ 99.9% Uptime</span>
          <span>🏢 Iron Mountain Tier 3</span>
          <span>💾 Offsite DR Storage</span>
          <span>🏆 SAP Gold Partner</span>
        </div>

        {/* MAIN */}
        <div className="max-w-4xl mx-auto mt-8 grid gap-4">
          {/* LEFT CARD */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-lg mb-1">Estimate Your Monthly Cost</h2>
            <p className="text-xs text-gray-400 mb-6">Adjust the options below to match your infrastructure needs</p>

            {/* vCPU */}
            <div className="mb-6">
              <label className="text-xs font-semibold text-gray-500">vCPUs</label>
              <input
                type="range"
                min="2"
                max="32"
                step="2"
                value={vcpu}
                onChange={(e) => setVcpu(Number(e.target.value))}
                className="w-full accent-purple-600 mt-2"
              />
              <div className="text-right text-purple-600 text-sm font-semibold">{vcpu} vCPU</div>
            </div>

            {/* RAM */}
            <div className="mb-6">
              <label className="text-xs font-semibold text-gray-500">RAM</label>
              <input
                type="range"
                min="8"
                max="256"
                step="8"
                value={ram}
                onChange={(e) => setRam(Number(e.target.value))}
                className="w-full accent-purple-600 mt-2"
              />
              <div className="text-right text-purple-600 text-sm font-semibold">{ram} GB</div>
            </div>

            {/* STORAGE */}
            <div className="mb-6">
              <label className="text-xs font-semibold text-gray-500">STORAGE</label>
              <input
                type="range"
                min="100"
                max="5000"
                step="100"
                value={storage}
                onChange={(e) => setStorage(Number(e.target.value))}
                className="w-full accent-purple-600 mt-2"
              />
              <div className="text-right text-purple-600 text-sm font-semibold">{storage} GB</div>
            </div>

            {/* SELECTS */}
            <Select label="SUPPORT LEVEL" value={support} setValue={setSupport}>
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
              <option value="enterprise">Enterprise</option>
            </Select>

            <Select label="BACKUP & REPLICATION" value={backup} setValue={setBackup}>
              <option value="daily">Daily</option>
              <option value="twohourly">2-Hourly</option>
            </Select>

            <Select label="SSL CERTIFICATE" value={ssl} setValue={setSsl}>
              <option value="none">Not Required</option>
              <option value="included">Included</option>
            </Select>

            {/* BUTTON */}
            <button
              onClick={() => setShowResult(true)}
              className="w-full mt-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-pink-500 to-purple-600"
            >
              Calculate My Estimate →
            </button>
            {/* <button className="w-full mt-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-pink-500 to-purple-600">
              Calculate My Estimate →
            </button> */}
            {showResult && (
              <>
                {vcpu > 24 ? (
                  // CONSULT BOX
                  <div className="mt-6 bg-yellow-50 border border-yellow-300 rounded-xl p-5 text-center">
                    <h3 className="font-semibold text-yellow-800 mb-2">⚠ Custom Configuration Required</h3>
                    <p className="text-sm text-yellow-700 mb-4">Deployments above 24 vCPU require consultation.</p>
                    <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg">
                      <a href="/contact"> Contact Us</a>
                    </button>
                  </div>
                ) : (
                  // RESULT BOX
                  <div className="mt-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl p-6">
                    {(() => {
                      const result = calculateCost()

                      if (!result) return null

                      return (
                        <>
                          <div className="text-xs opacity-80">Estimated Monthly Cost</div>

                          <div className="text-3xl font-bold mt-1">
                            ${result.total.toFixed(2)}
                            <span className="text-sm font-normal"> / month</span>
                          </div>

                          {/* BREAKDOWN */}
                          <div className="mt-4 text-sm space-y-2">
                            <div className="flex justify-between">
                              <span>{vcpu} vCPU</span>
                              <span>{vcpu <= 20 ? "Included" : "Flexible"}</span>
                            </div>

                            <div className="flex justify-between">
                              <span>RAM ({ram}GB)</span>
                              <span>${result.ramCost.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between">
                              <span>Storage ({storage}GB)</span>
                              <span>${result.storageCost.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between">
                              <span>Support</span>
                              <span>{result.supportCost === 0 ? "Included" : `$${result.supportCost}`}</span>
                            </div>

                            <div className="flex justify-between">
                              <span>Backup</span>
                              <span>{result.backupCost === 0 ? "Included" : `$${result.backupCost}`}</span>
                            </div>

                            <div className="flex justify-between">
                              <span>SSL</span>
                              <span>{ssl === "none" ? "Not required" : "Included"}</span>
                            </div>
                          </div>
                        </>
                      )
                    })()}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="bg-[#f5f5f7]  font-[Inter]">
            <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
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

            <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
              <h3 className="font-semibold text-sm mb-4">✅ What's Always Included</h3>

              <ul className="text-sm text-gray-600 space-y-3">
                <li className="flex gap-2">
                  <span className="text-green-500">✔</span> Managed infrastructure & OS patching
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-500">✔</span> 99.9% uptime SLA with credits
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-500">✔</span> Daily automated backups
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-500">✔</span> DDoS protection & firewall
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-500">✔</span> SSL certificates (web & mobile apps)
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-500">✔</span> Monitoring & alerting
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-500">✔</span> Offsite DR storage (Virginia location)
                </li>
              </ul>
            </div>

            <div className="rounded-xl p-6 text-center text-white mb-8 bg-gradient-to-r from-purple-600 to-pink-500">
              <h3 className="font-semibold text-sm mb-2">Not sure what you need?</h3>
              <p className="text-xs  text-white opacity-80 mb-4">
                Our team will review your estimate for free and recommend the right configuration for your workload.
              </p>

              <button
                onClick={() => document.getElementById("request-quote")?.click()}
                className="bg-white text-purple-600 px-6 py-2 rounded-md text-sm font-semibold w-full"
              >
                Book a Free Consultation
              </button>

              <p className="text-xs mt-2 text-white opacity-80">or call +255-22-2112161</p>
            </div>

            {/* INFRASTRUCTURE */}
            <div className="text-center mb-6">
              <h2 className="text-lg font-semibold">Enterprise Infrastructure, Built for East Africa</h2>
              <div className="w-10 h-[2px] bg-gradient-to-r from-pink-500 to-purple-600 mx-auto mt-2"></div>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
          </div>
          {/* <PricingUI /> */}
        </div>
      </div>
    </div>
  )
}

/* REUSABLE COMPONENTS */

function Select({ label, value, setValue, children }) {
  return (
    <div className="mb-4">
      <label className="text-xs font-semibold text-gray-500 block mb-1">{label}</label>
      <select value={value} onChange={(e) => setValue(e.target.value)} className="w-full border rounded-lg p-2 text-sm">
        {children}
      </select>
    </div>
  )
}

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <h3 className="font-semibold text-sm mb-3">{title}</h3>
      {children}
    </div>
  )
}

import React from "react"
import toast from "react-hot-toast"
import { claudCalcVerifyFn, otpVerifyFn } from "Services/Home"

/* ROW */
function Row({ label, value, green, yellow, purple }) {
  return (
    <div className="flex justify-between py-2 border-b last:border-none text-xs">
      <span className="text-gray-600">{label}</span>
      <span
        className={`font-semibold ${
          green ? "text-green-500" : yellow ? "text-yellow-600" : purple ? "text-purple-600" : ""
        }`}
      >
        {value}
      </span>
    </div>
  )
}

/* FEATURE CARD */
function Feature({ title, desc }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm text-center">
      <div className="text-xl mb-2">🔷</div>
      <h4 className="text-sm font-semibold mb-1">{title}</h4>
      <p className="text-xs text-gray-500">{desc}</p>
    </div>
  )
}

function OtpInput({ value, setValue, onSubmit }) {
  const inputs = Array(6).fill(0)

  const handleChange = (e, index) => {
    const val = e.target.value

    if (!/^\d?$/.test(val)) return

    const newOtp = value.split("")
    newOtp[index] = val
    const finalOtp = newOtp.join("")
    setValue(finalOtp)

    // move next
    if (val && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus()
    }
  }

  const handleKeyDown = (e, index) => {
    // ⬅ backspace
    if (e.key === "Backspace" && !value[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus()
    }

    // 🚀 ENTER PRESS
    if (e.key === "Enter") {
      if (value.length === 6) {
        onSubmit()
      }
    }
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, 6)

    if (!/^\d+$/.test(paste)) return

    setValue(paste)
  }

  return (
    <div className="flex gap-2 justify-center mb-2" onPaste={handlePaste}>
      {inputs.map((_, i) => (
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

function Input({ label, value, onChange, error, required }) {
  return (
    <div className="mb-0">
      <label className="text-xs font-semibold text-gray-500">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full border rounded-lg p-2 text-sm mt-1 ${error ? "border-red-500" : ""}`}
      />
    </div>
  )
}
