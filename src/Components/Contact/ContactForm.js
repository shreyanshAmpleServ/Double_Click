import { Phone } from "@mui/icons-material"
import { useState, useRef, useEffect } from "react"
import toast from "react-hot-toast"
import { FaLocationDot, FaStar } from "react-icons/fa6"
import { IoIosMail, IoMdTime, IoMdCheckmarkCircle } from "react-icons/io"
import { HiSparkles } from "react-icons/hi"
import { useMutation, useQuery } from "react-query"
import { companiesServiceFn, contactUsFn, footerServiceFn } from "Services/Home"
import CustomButton from "Shared/CustomButton"
import CustomInput from "Shared/CustomInput"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "./Contact.css"

gsap.registerPlugin(ScrollTrigger)

const initialise = {
  name: "",
  company_name: "",
  email: "",
  phone: "",
  message: "",
}

const ContactForm = () => {
  const [initialData, setInitialData] = useState(initialise)
  const [focusedField, setFocusedField] = useState(null)
  const { data: companiesData, isLoading } = useQuery(["companyAddress"], () => companiesServiceFn())
  const { data: timingData } = useQuery(["timing"], () => footerServiceFn())
  const timing = timingData?.data?.data?.filter((item) => item.key === "company_time")?.[0]

  // Animation refs
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const titleRef = useRef(null)
  const addressSectionRef = useRef(null)
  const formSectionRef = useRef(null)
  const addressCardsRef = useRef([])
  const formFieldsRef = useRef([])
  const buttonRef = useRef(null)
  const successRef = useRef(null)
  const gradientRef = useRef(null)
  const statsRef = useRef([])

  console.log("Companies : ", timingData)

  // Enhanced GSAP Animations with more effects
  useEffect(() => {
    if (!companiesData?.data?.data || isLoading) return

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([headerRef.current, titleRef.current], { y: 50, opacity: 0, scale: 0.95 })
      gsap.set([addressSectionRef.current, formSectionRef.current], { y: 80, opacity: 0, scale: 0.9 })
      gsap.set(addressCardsRef.current, { y: 60, opacity: 0, scale: 0.8, rotationY: 15 })
      gsap.set(formFieldsRef.current, { y: 40, opacity: 0, scale: 0.95 })
      gsap.set(buttonRef.current, { y: 30, opacity: 0, scale: 0.9 })
      gsap.set(statsRef.current, { y: 20, opacity: 0, scale: 0.9 })

      // Create master timeline with enhanced effects
      const masterTL = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      })

      // Enhanced entrance animations
      masterTL
        .to(headerRef.current, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        })
        .to(
          titleRef.current,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.6"
        )
        .to(
          statsRef.current,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        )
        .to(
          [addressSectionRef.current, formSectionRef.current],
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          addressCardsRef.current,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.7)",
          },
          "-=0.6"
        )
        .to(
          formFieldsRef.current,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.8"
        )
        .to(
          buttonRef.current,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)",
          },
          "-=0.4"
        )

      // Enhanced hover animations for cards
      addressCardsRef.current.forEach((card) => {
        if (card) {
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -12,
              scale: 1.03,
              rotationY: 5,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
              duration: 0.4,
              ease: "power2.out",
            })

            gsap.to(card.querySelectorAll(".card-icon"), {
              scale: 1.15,
              rotation: 10,
              duration: 0.4,
              ease: "back.out(1.7)",
            })

            // Add glow effect
            gsap.to(card, {
              borderColor: "rgba(79, 70, 229, 0.3)",
              duration: 0.4,
              ease: "power2.out",
            })
          })

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              rotationY: 0,
              boxShadow: "0 10px 25px -3px rgba(0, 0, 0, 0.08)",
              duration: 0.4,
              ease: "power2.out",
            })

            gsap.to(card.querySelectorAll(".card-icon"), {
              scale: 1,
              rotation: 0,
              duration: 0.4,
              ease: "power2.out",
            })

            gsap.to(card, {
              borderColor: "rgba(229, 231, 235, 0.5)",
              duration: 0.4,
              ease: "power2.out",
            })
          })
        }
      })

      // Enhanced form field focus animations
      formFieldsRef.current.forEach((field) => {
        if (field) {
          const input = field.querySelector("input, textarea")
          if (input) {
            input.addEventListener("focus", () => {
              gsap.to(field, {
                scale: 1.02,
                y: -3,
                duration: 0.3,
                ease: "power2.out",
              })

              // Add subtle glow
              gsap.to(field.querySelector("input, textarea"), {
                boxShadow: "0 0 0 3px rgba(79, 70, 229, 0.1)",
                duration: 0.3,
                ease: "power2.out",
              })
            })

            input.addEventListener("blur", () => {
              gsap.to(field, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out",
              })

              gsap.to(field.querySelector("input, textarea"), {
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                duration: 0.3,
                ease: "power2.out",
              })
            })
          }
        }
      })

      // Continuous subtle animations
      gsap.to(".floating-element", {
        y: "random(-10, 10)",
        x: "random(-5, 5)",
        rotation: "random(-2, 2)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 2,
          from: "random",
        },
      })
    }, sectionRef.current)

    return () => ctx.revert()
  }, [companiesData, isLoading])

  const handleChange = (e) => {
    setInitialData((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    // Add micro-animation on change
    const field = e.target.closest(".form-field")
    if (field) {
      gsap.fromTo(field, { scale: 1 }, { scale: 1.01, duration: 0.1, yoyo: true, repeat: 1 })
    }
  }

  const { mutate: contacUs, isLoading: isAdding } = useMutation(contactUsFn, {
    onSuccess: ({ data }) => {
      // Enhanced success animation
      gsap
        .timeline()
        .to(buttonRef.current, {
          scale: 1.1,
          // backgroundColor: "#10B981",
          duration: 0.3,
          ease: "power2.out",
        })
        .to(buttonRef.current, {
          scale: 1,
          duration: 0.4,
          ease: "elastic.out(1, 0.3)",
        })
        .to(successRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(2)",
        })
        .to(successRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          delay: 2,
          ease: "power2.in",
        })

      // Success particle effect
      for (let i = 0; i < 10; i++) {
        const particle = document.createElement("div")
        particle.className = "fixed w-2 h-2 bg-green-400 rounded-full pointer-events-none z-40"
        particle.style.left = "50%"
        particle.style.top = "55%"
        document.body.appendChild(particle)

        gsap.to(particle, {
          x: `random(-200, 200)`,
          y: `random(-200, 200)`,
          opacity: 0,
          scale: 0,
          duration: 1.5,
          ease: "power2.out",
          onComplete: () => particle.remove(),
        })
      }

      toast.success("Message sent successfully!")
      setInitialData(initialise)
    },
    onError: () => {
      // Enhanced error animation
      gsap
        .timeline()
        .to(buttonRef.current, {
          x: [-10, 10, -8, 8, -4, 4, 0],
          backgroundColor: "#EF4444",
          duration: 0.6,
          ease: "power2.out",
        })
        .to(buttonRef.current, {
          backgroundColor: "#4F46E5",
          duration: 0.5,
          delay: 1,
        })

      toast.error("Something went wrong. Please try again.")
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(initialData)

    // Enhanced submit animation
    gsap.to(buttonRef.current, {
      scale: 0.97,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.out",
    })

    contacUs({ data: initialData })
  }

  return (
    <>
      {/* Success Indicator */}
      <div
        ref={successRef}
        className="fixed contact-us top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-6 rounded-full shadow-2xl z-50 scale-0 opacity-0"
      >
        <IoMdCheckmarkCircle className="text-4xl" />
      </div>

      <div
        ref={sectionRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 relative overflow-hidden min-h-screen"
      >
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl floating-element"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-pink-500/8 rounded-full blur-3xl floating-element"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-emerald-500/6 to-blue-500/6 rounded-full blur-3xl floating-element"></div>

          {/* Additional decorative elements */}
          <div className="absolute top-20 right-20 w-4 h-4 bg-indigo-400/20 rounded-full floating-element"></div>
          <div className="absolute bottom-32 right-32 w-3 h-3 bg-pink-400/20 rounded-full floating-element"></div>
          <div className="absolute top-1/2 left-20 w-2 h-2 bg-purple-400/20 rounded-full floating-element"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Enhanced Header Section */}
          <div ref={headerRef} className="text-center mb-20">
            <div ref={titleRef} className="mb-12">
              <div className="inline-flex items-center px-8 py-4 bg-white/90 backdrop-blur-sm rounded-full text-indigo-600 font-bold text-sm uppercase tracking-widest shadow-xl border border-indigo-100/50 mb-10 hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
                <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3 animate-pulse"></div>
                <IoIosMail className="mr-3 text-lg group-hover:scale-110 transition-transform duration-300" />
                Get In Touch With Us
                <div className="w-3 h-3 bg-indigo-500 rounded-full ml-3 animate-pulse"></div>
              </div>

              <h1 className="text-6xl lg:text-7xl font-black bg-gradient-to-r from-gray-900 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8 leading-tight">
                Let's Create Something
                <br />
                <span className="text-5xl lg:text-6xl bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 bg-clip-text text-transparent">
                  Amazing Together
                </span>
              </h1>

              <div className="flex justify-center mb-10">
                <div className="relative">
                  <div className="w-32 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full animate-pulse"></div>
                </div>
              </div>

              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                Transform your ideas into reality. We're here to help you every step of the way with
                <span className="font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                  {" "}
                  personalized solutions
                </span>{" "}
                and
                <span className="font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-md">
                  {" "}
                  expert guidance
                </span>
                .
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-16 lg:gap-20">
            {/* Enhanced Address Section */}
            <div ref={addressSectionRef} className="lg:col-span-2">
              <div className="mb-12">
                <div className="flex items-center mb-8">
                  <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mr-4 shadow-xl floating-element">
                    <FaLocationDot className="text-white text-xl" />
                  </div>
                  <h2 className="text-4xl font-black text-gray-900">Our Locations</h2>
                </div>

                <p className="text-lg text-gray-600 leading-relaxed mb-10">
                  We're strategically located to serve you better. Visit us at any of our offices or connect with us
                  digitally.
                </p>

                {/* Enhanced Stats Cards */}
                <div className="grid grid-cols-3 gap-4 mb-10">
                  <div
                    ref={(el) => (statsRef.current[0] = el)}
                    className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 hover:shadow-xl hover:scale-105 hover:border-indigo-200 transition-all duration-300 group"
                  >
                    <div className="text-3xl font-black text-indigo-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                      24/7
                    </div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Support</div>
                  </div>
                  <div
                    ref={(el) => (statsRef.current[1] = el)}
                    className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 hover:shadow-xl hover:scale-105 hover:border-purple-200 transition-all duration-300 group"
                  >
                    <div className="text-3xl font-black text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                      1hr
                    </div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Response</div>
                  </div>
                  <div
                    ref={(el) => (statsRef.current[2] = el)}
                    className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 hover:shadow-xl hover:scale-105 hover:border-pink-200 transition-all duration-300 group"
                  >
                    <div className="text-3xl font-black text-pink-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                      100%
                    </div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Quality</div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {companiesData?.data?.data?.map((item, index) => (
                  <div
                    key={index}
                    ref={(el) => (addressCardsRef.current[index] = el)}
                    className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-gray-100/50 hover:border-indigo-200 transition-all duration-500"
                  >
                    <div className="flex items-center mb-8">
                      <HiSparkles className="mr-4 text-2xl text-indigo-600 card-icon" />
                      <h3 className="text-2xl font-black text-gray-900">{item?.label}</h3>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-start gap-6">
                        <div className="w-14 h-14 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl flex items-center justify-center flex-shrink-0 card-icon border border-red-100 shadow-md">
                          <FaLocationDot className="text-red-500 text-lg" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-2">
                            Address
                          </div>
                          <div className="text-gray-700 leading-relaxed font-medium">{item?.address}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center flex-shrink-0 card-icon border border-blue-100 shadow-md">
                          <Phone className="text-blue-500 text-lg" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-2">Phone</div>
                          <div className="text-gray-800 font-black text-xl">{item?.phone}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl flex items-center justify-center flex-shrink-0 card-icon border border-green-100 shadow-md">
                          <IoIosMail className="text-green-500 text-lg" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-2">Email</div>
                          <div className="text-gray-800 font-black text-xl">{item?.email}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl flex items-center justify-center flex-shrink-0 card-icon border border-purple-100 shadow-md">
                          <IoMdTime className="text-purple-500 text-lg" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-2">Hours</div>
                          <div className="text-gray-700 font-bold">
                            {" "}
                            {timing?.value.split("Sat:").map((part, i) => (
                              <div key={i}>{i === 0 ? part : "Sat:" + part}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Form Section */}
            <div ref={formSectionRef} className="lg:col-span-3">
              <div className="bg-white/90 backdrop-blur-sm p-10 lg:p-12 rounded-3xl shadow-2xl border border-gray-100/50">
                <form onSubmit={handleSubmit}>
                  <div className="mb-12">
                    <div className="flex items-center mb-8">
                      <div className="w-14 h-14 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mr-4 shadow-xl floating-element">
                        <HiSparkles className="text-white text-xl" />
                      </div>
                      <div>
                        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">Ready to Start?</h2>
                        <h3 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 bg-clip-text text-transparent mt-2">
                          Let's Talk!
                        </h3>
                      </div>
                    </div>

                    <div className="w-24 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mb-8"></div>

                    <p className="text-lg text-gray-600 leading-relaxed">
                      Fill out the form below and our team will get back to you within
                      <span className="font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md"> 24 hours</span>.
                      We're excited to hear about your project!
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div ref={(el) => (formFieldsRef.current[0] = el)} className="grid sm:grid-cols-2 gap-8">
                      <div className="form-field">
                        <label className="block text-sm font-black text-gray-700 mb-3 uppercase tracking-widest">
                          Your Name *
                        </label>
                        <CustomInput
                          name="name"
                          value={initialData?.name}
                          required
                          onChange={handleChange}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          className="!rounded-2xl !border-2 !border-gray-200 hover:!border-indigo-300 focus:!border-indigo-500 !bg-white !shadow-md hover:!shadow-lg focus:!shadow-xl !transition-all !duration-300 !py-4 !px-6 !text-lg !font-medium"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div className="form-field">
                        <label className="block text-sm font-black text-gray-700 mb-3 uppercase tracking-widest">
                          Email Address *
                        </label>
                        <CustomInput
                          name="email"
                          type="email"
                          value={initialData?.email}
                          required
                          onChange={handleChange}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          className="!rounded-2xl !border-2 !border-gray-200 hover:!border-indigo-300 focus:!border-indigo-500 !bg-white !shadow-md hover:!shadow-lg focus:!shadow-xl !transition-all !duration-300 !py-4 !px-6 !text-lg !font-medium"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div ref={(el) => (formFieldsRef.current[1] = el)} className="grid sm:grid-cols-2 gap-8">
                      <div className="form-field">
                        <label className="block text-sm font-black text-gray-700 mb-3 uppercase tracking-widest">
                          Company Name *
                        </label>
                        <CustomInput
                          name="company_name"
                          value={initialData?.company_name}
                          required
                          onChange={handleChange}
                          onFocus={() => setFocusedField("company")}
                          onBlur={() => setFocusedField(null)}
                          className="!rounded-2xl !border-2 !border-gray-200 hover:!border-indigo-300 focus:!border-indigo-500 !bg-white !shadow-md hover:!shadow-lg focus:!shadow-xl !transition-all !duration-300 !py-4 !px-6 !text-lg !font-medium"
                          placeholder="Your company name"
                        />
                      </div>

                      <div className="form-field">
                        <label className="block text-sm font-black text-gray-700 mb-3 uppercase tracking-widest">
                          Phone Number *
                        </label>
                        <CustomInput
                          name="phone"
                          value={initialData?.phone}
                          required
                          onChange={handleChange}
                          onFocus={() => setFocusedField("phone")}
                          onBlur={() => setFocusedField(null)}
                          className="!rounded-2xl !border-2 !border-gray-200 hover:!border-indigo-300 focus:!border-indigo-500 !bg-white !shadow-md hover:!shadow-lg focus:!shadow-xl !transition-all !duration-300 !py-4 !px-6 !text-lg !font-medium"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>

                    <div ref={(el) => (formFieldsRef.current[2] = el)} className="form-field">
                      <label className="block text-sm font-black text-gray-700 mb-3 uppercase tracking-widest">
                        Project Details *
                      </label>
                      <CustomInput
                        required
                        multiline={true}
                        rows={7}
                        name="message"
                        value={initialData?.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        className="!rounded-2xl !border-2 !border-gray-200 hover:!border-indigo-300 focus:!border-indigo-500 !bg-white !shadow-md hover:!shadow-lg focus:!shadow-xl !transition-all !duration-300 !p-6 !leading-relaxed !text-lg !font-medium"
                        placeholder="Tell us about your project, goals, timeline, and any specific requirements. The more details you provide, the better we can help you!"
                      />
                    </div>

                    <div ref={buttonRef} className="pt-8">
                      <CustomButton
                        type="submit"
                        disabled={isAdding}
                        className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white !rounded-2xl !py-6 !font-black !text-xl shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

                        {isAdding ? (
                          <span className="flex items-center justify-center relative z-10">
                            <div className="animate-spin rounded-full h-7 w-7 border-b-3 border-white mr-4"></div>
                            <span className="tracking-wide text-white">Sending Message...</span>
                          </span>
                        ) : (
                          <span className="flex items-center justify-center relative z-10">
                            <HiSparkles className="mr-3 text-2xl text-white" />
                            <span className="tracking-wide text-white">Send Message</span>
                            <svg
                              className="ml-3 w-7 h-7 text-white transition-transform duration-300 group-hover:translate-x-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                              />
                            </svg>
                          </span>
                        )}
                      </CustomButton>

                      <p className="text-sm text-gray-500 mt-6 text-center leading-relaxed">
                        By submitting this form, you agree to our
                        <span className="font-bold text-indigo-600"> privacy policy</span> and
                        <span className="font-bold text-indigo-600"> terms of service</span>.
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactForm
