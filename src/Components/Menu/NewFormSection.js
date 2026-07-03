import { Phone } from "@mui/icons-material"
import ReCaptchaCheckbox from "Components/Contact/ReCaptcha"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { FaLocationDot } from "react-icons/fa6"
import { HiSparkles } from "react-icons/hi"
import { IoIosMail, IoMdCheckmarkCircle, IoMdTime } from "react-icons/io"
import { useMutation, useQuery } from "react-query"
import { companiesServiceFn, contactUsFn, footerServiceFn } from "Services/Home"
import CustomButton from "Shared/CustomButton"
import CustomInput from "Shared/CustomInput"

gsap.registerPlugin(ScrollTrigger)

const initialise = {
  name: "",
  company_name: "",
  email: "",
  phone: "",
  message: "",
}

const NewContactForm = () => {
  const [initialData, setInitialData] = useState(initialise)
  const [captchaStatus, setCaptchaStatus] = useState(false)

  const { data: companiesData, isLoading } = useQuery(["companyAddress"], () => companiesServiceFn())
  const { data: timingData } = useQuery(["timing"], () => footerServiceFn())
  const timing = timingData?.data?.data?.filter((item) => item.key === "company_time")?.[0]

  const recaptchaRef = useRef(null)
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const addressSectionRef = useRef(null)
  const formSectionRef = useRef(null)
  const addressCardsRef = useRef([])
  const formFieldsRef = useRef([])
  const buttonRef = useRef(null)
  const successRef = useRef(null)

  // Clear tracking arrays during render phases to avoid attaching dead node duplicates
  addressCardsRef.current = []
  formFieldsRef.current = []

  useEffect(() => {
    if (!companiesData?.data?.data || isLoading) return

    const ctx = gsap.context(() => {
      // Set sleek initial offset points
      gsap.set(headerRef.current, { y: 30, opacity: 0 })
      gsap.set([addressSectionRef.current, formSectionRef.current], { y: 40, opacity: 0 })
      gsap.set(addressCardsRef.current, { x: -20, opacity: 0 })
      gsap.set(formFieldsRef.current, { y: 15, opacity: 0 })
      gsap.set(buttonRef.current, { scale: 0.9, opacity: 0 })

      const masterTL = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      })

      masterTL
        .to(headerRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" })
        .to(
          [addressSectionRef.current, formSectionRef.current],
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        )
        .to(addressCardsRef.current, { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.4")
        .to(formFieldsRef.current, { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: "power2.out" }, "-=0.5")
        .to(buttonRef.current, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.5)" }, "-=0.2")

      // Interactive hover behaviors
      addressCardsRef.current.forEach((card) => {
        if (!card) return
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -4,
            borderColor: "rgba(233, 30, 99, 0.4)",
            boxShadow: "0 10px 20px -5px rgba(0,0,0,0.05)",
            duration: 0.3,
          })
        })
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, borderColor: "rgba(226, 232, 240, 0.8)", boxShadow: "none", duration: 0.3 })
        })
      })
    }, sectionRef.current)

    return () => ctx.revert()
  }, [companiesData, isLoading])

  const handleChange = (e) => {
    setInitialData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const { mutate: contacUs, isLoading: isAdding } = useMutation(contactUsFn, {
    onSuccess: () => {
      gsap
        .timeline()
        .to(successRef.current, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.5)" })
        .to(successRef.current, { scale: 0, opacity: 0, duration: 0.3, delay: 2 })

      toast.success("Message sent successfully!")
      setInitialData(initialise)
      recaptchaRef.current?.reset()
    },
    onError: () => {
      gsap.fromTo(buttonRef.current, { x: -6 }, { x: 6, duration: 0.1, repeat: 5, yoyo: true })
      toast.error("Something went wrong. Please try again.")
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!captchaStatus) {
      toast.error("Please complete the captcha verification.")
      return
    }
    contacUs({ data: initialData })
  }

  return (
    <>
      <div
        ref={successRef}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-5 rounded-full shadow-2xl z-50 scale-0 opacity-0 pointer-events-none transition-transform"
      >
        <IoMdCheckmarkCircle className="text-3xl" />
      </div>

      <div ref={sectionRef} className="py-8 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div ref={headerRef} className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-pink-50 px-3.5 py-1.5 text-xs font-semibold text-[#e91e63] uppercase tracking-wider">
              <HiSparkles /> Free Consultation
            </span>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Let's Create Something Amazing Together
            </h2>
          </div>

          {/* Combined Card Layout Split Box */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xl overflow-hidden grid lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            {/* Left Column: Quick Contacts Info Panel */}
            <div
              ref={addressSectionRef}
              className="lg:col-span-2 p-6 md:p-8 bg-slate-50/50 space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Get in Touch</h3>
                  <p className="text-sm text-slate-500 mt-1">Connect with our systems architects directly.</p>
                </div>

                {/* Main Address loop mapping */}
                <div className="space-y-3">
                  {companiesData?.data?.data?.slice(0, 2).map((company, index) => (
                    <div
                      key={company.id || index}
                      ref={(el) => el && addressCardsRef.current.push(el)}
                      className="p-4 bg-white border border-slate-200/60 rounded-xl space-y-2 transition-all"
                    >
                      <h4 className="font-semibold text-sm text-slate-800">
                        {company.company_name || "Office Location " + (index + 1)}
                      </h4>
                      {company.address && (
                        <div className="flex gap-2 text-xs text-slate-600 items-start">
                          <FaLocationDot className="text-slate-400 mt-0.5 shrink-0" />
                          <span className="line-clamp-2">{company.address}</span>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                        {company.phone && (
                          <a href={`tel:${company.phone}`} className="flex gap-1 items-center hover:text-[#e91e63]">
                            <Phone className="!text-xs text-slate-400" /> {company.phone}
                          </a>
                        )}
                        {company.email && (
                          <a href={`mailto:${company.email}`} className="flex gap-1 items-center hover:text-[#e91e63]">
                            <IoIosMail className="text-sm text-slate-400" /> Email Us
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Operating Hours Block Footer */}
              {timing?.value && (
                <div className="flex gap-2.5 items-center p-3 bg-indigo-50/40 border border-indigo-100/40 rounded-xl text-xs text-indigo-950 mt-4 lg:mt-0">
                  <IoMdTime className="text-lg text-indigo-500 shrink-0" />
                  <div>
                    <span className="font-medium block text-slate-700">Operating Hours</span>
                    <span className="text-slate-500">{timing.value}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Clean Mini Form Block */}
            <div ref={formSectionRef} className="lg:col-span-3 p-6 md:p-8 bg-white">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div ref={(el) => el && formFieldsRef.current.push(el)}>
                    <CustomInput
                      name="name"
                      value={initialData.name}
                      onChange={handleChange}
                      placeholder="Your Name *"
                      required
                      className="!rounded-lg !py-2.5 text-sm"
                    />
                  </div>
                  <div ref={(el) => el && formFieldsRef.current.push(el)}>
                    <CustomInput
                      name="email"
                      type="email"
                      value={initialData.email}
                      onChange={handleChange}
                      placeholder="Business Email *"
                      required
                      className="!rounded-lg !py-2.5 text-sm"
                    />
                  </div>
                  <div ref={(el) => el && formFieldsRef.current.push(el)}>
                    <CustomInput
                      name="company_name"
                      value={initialData.company_name}
                      onChange={handleChange}
                      placeholder="Company Name *"
                      required
                      className="!rounded-lg !py-2.5 text-sm"
                    />
                  </div>
                  <div ref={(el) => el && formFieldsRef.current.push(el)}>
                    <CustomInput
                      name="phone"
                      value={initialData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number *"
                      required
                      className="!rounded-lg !py-2.5 text-sm"
                    />
                  </div>
                </div>

                <div ref={(el) => el && formFieldsRef.current.push(el)}>
                  <CustomInput
                    multiline
                    rows={3}
                    name="message"
                    value={initialData.message}
                    onChange={handleChange}
                    placeholder="Briefly describe your requirements..."
                    className="!rounded-lg text-sm"
                  />
                </div>

                <div className="py-1 scale-90 origin-left">
                  <ReCaptchaCheckbox ref={recaptchaRef} setCaptchaStatus={setCaptchaStatus} />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div ref={buttonRef} className="w-full sm:w-auto">
                    <CustomButton
                      type="submit"
                      disabled={isAdding || !captchaStatus}
                      className="
                        !bg-[#e91e63]
                        hover:!bg-[#d81b60]
                        !text-white
                        !px-8
                        !py-3
                        !rounded-lg
                        !font-semibold
                        !text-sm
                        w-full
                        sm:w-auto
                        transition-all
                        disabled:opacity-40
                      "
                    >
                      {isAdding ? "Sending..." : "Submit Inquiry"}
                    </CustomButton>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Response turnaround within 24 hours.</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewContactForm
