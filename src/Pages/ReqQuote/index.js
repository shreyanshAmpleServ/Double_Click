import emailjs from "@emailjs/browser"
import ReCaptchaCheckbox from "Components/Contact/ReCaptcha"
import { coreServiceFn, footerServiceFn, reqQuoteFn } from "Services/Home"
import { gsap } from "gsap"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { useMutation, useQuery } from "react-query"

const initialise2 = {
  email: "",
  name: "",
  phone: "",
  message: "",
  service: "",
}

const initialErrors = {
  email: "",
  name: "",
  phone: "",
  message: "",
  service: "",
}

const RequestQuoteModal = ({ modal, setModal }) => {
  const baseURL = process.env.REACT_APP_API_URL
  const [personalData, setPersonalData] = useState(initialise2)
  const [errors, setErrors] = useState(initialErrors)
  const recaptchaRef = useRef(null)
  const [captchaStatus, setCaptchaStatus] = useState(false)

  const modalBackdropRef = useRef(null)
  const modalContentRef = useRef(null)
  const formFieldsRef = useRef([])
  const buttonRef = useRef(null)
  const closeButtonRef = useRef(null)
  const titleRef = useRef(null)
  const leftSideRef = useRef(null)

  const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID
  const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID
  const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY

  const { data: mainServiceData } = useQuery(["main-service"], () => coreServiceFn())
  const { data: globalData } = useQuery(["global-entity"], () => footerServiceFn())

  useEffect(() => {
    if (modal) {
      gsap.set(modalBackdropRef.current, { opacity: 0 })
      gsap.set(modalContentRef.current, {
        scale: 0.8,
        opacity: 0,
        y: 50,
        filter: "blur(10px)",
      })
      gsap.set(leftSideRef.current, { x: -100, opacity: 0 })
      gsap.set(titleRef.current, { y: -30, opacity: 0 })
      gsap.set(formFieldsRef.current, {
        y: 30,
        opacity: 0,
        scale: 0.95,
      })
      gsap.set([buttonRef.current, closeButtonRef.current], {
        scale: 0,
        opacity: 0,
      })

      const tl = gsap.timeline()

      tl.to(modalBackdropRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power1.out",
      })

        .to(
          modalContentRef.current,
          {
            scale: 1,
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "back.out(1.3)",
          },
          "-=0.1"
        )

        .to(
          leftSideRef.current,
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6"
        )

        .to(
          titleRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )

        .to(
          formFieldsRef.current,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: {
              amount: 0.6,
              from: "start",
            },
            ease: "power2.out",
          },
          "-=0.3"
        )

        .to(
          [buttonRef.current, closeButtonRef.current],
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        )
    }
  }, [modal])

  const closeModal = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setModal(false)
        setErrors(initialErrors)
      },
    })

    tl.to(formFieldsRef.current, {
      y: -20,
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      stagger: {
        amount: 0.2,
        from: "end",
      },
      ease: "power2.in",
    })
      .to(
        modalContentRef.current,
        {
          scale: 0.8,
          opacity: 0,
          y: 50,
          filter: "blur(10px)",
          duration: 0.5,
          ease: "back.in(1.3)",
        },
        "-=0.2"
      )
      .to(
        modalBackdropRef.current,
        {
          opacity: 0,
          duration: 0.3,
          ease: "power1.in",
        },
        "-=0.3"
      )
  }

  const handleChange2 = (e) => {
    const { name, value } = e.target
    setPersonalData((prev) => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))

      const errorElement = e.target.nextElementSibling
      if (errorElement && errorElement.classList.contains("text-red-500")) {
        gsap.to(errorElement, {
          opacity: 0,
          y: -10,
          duration: 0.3,
          ease: "power2.out",
        })
      }

      gsap.to(e.target, {
        borderColor: "#d1d5db",
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    let isValid = true

    if (!personalData.name.trim()) {
      newErrors.name = "Name is required"
      isValid = false
    }

    if (!personalData.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalData.email)) {
      newErrors.email = "Please enter a valid email address"
      isValid = false
    }

    if (!personalData.phone.trim()) {
      newErrors.phone = "Phone number is required"
      isValid = false
    }

    if (!personalData.service) {
      newErrors.service = "Please select a service"
      isValid = false
    }

    if (!personalData.message.trim()) {
      newErrors.message = "Message is required"
      isValid = false
    } else if (personalData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long"
      isValid = false
    }

    setErrors(newErrors)

    if (!isValid) {
      setTimeout(() => {
        Object.keys(newErrors).forEach((fieldName) => {
          const field = document.querySelector(`[name="${fieldName}"]`)
          if (field) {
            gsap.fromTo(
              field,
              {
                x: 0,
              },
              {
                x: [-5, 5, -5, 5, 0],
                duration: 0.5,
                ease: "power2.out",
              }
            )

            gsap.to(field, {
              borderColor: "#ef4444",
              duration: 0.3,
              ease: "power2.out",
            })
          }

          const errorElement = field?.nextElementSibling
          if (errorElement && errorElement.classList.contains("text-red-500")) {
            gsap.fromTo(
              errorElement,
              {
                opacity: 0,
                y: -10,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out",
              }
            )
          }
        })
      }, 100)
    }
    return isValid
  }

  const sendSalesEmail = async (formData) => {
    try {
      const emailParams = {
        to_email: "sales@doubleclick.co.tz",
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
      }

      const result = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailParams, EMAILJS_PUBLIC_KEY)

      const confirmationEmailParams = {
        to_email: formData.email,
        to_name: formData.name,
        from_email: "sales@doubleclick.co.tz",
        message: "Thank you for your quote request. We'll get back to you soon!",
      }

      await emailjs.send(EMAILJS_SERVICE_ID, "template_confirmation_id", confirmationEmailParams, EMAILJS_PUBLIC_KEY)
      console.log("Email sent successfully to sales@gmail.com:", result)
      return result
    } catch (error) {
      console.error("Error sending email to sales@gmail.com:", error)
      throw error
    }
  }

  const { mutate: addQuote, isLoading: isAdding } = useMutation(reqQuoteFn, {
    onSuccess: async ({ data }) => {
      gsap.to(buttonRef.current, {
        scale: 1.1,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      })

      try {
        // await sendSalesEmail(personalData)
        toast.success("Quote request submitted successfully & Sales Team has been notified!")
      } catch (emailError) {
        toast.error("Quote submitted but failed to notify sales team")
        console.error("Email notification failed:", emailError)
      }

      setPersonalData(initialise2)
      setErrors(initialErrors)

      setTimeout(() => {
        closeModal()
      }, 1000)
    },
    onError: (error) => {
      gsap.to(buttonRef.current, {
        x: [-5, 5, -5, 5, 0],
        duration: 0.5,
        ease: "power2.out",
      })
      toast.error("Something went wrong. Please try again.")
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out",
        onComplete: () => {
          addQuote({ data: personalData })
        },
      })
    } else {
      toast.error("Please fix the errors below")
    }
  }

  const findData = (key) => {
    return globalData?.data?.data?.filter((item) => item.key === key)?.[0]
  }

  useEffect(() => {
    if (modal && buttonRef.current) {
      const button = buttonRef.current

      button.addEventListener("mouseenter", () => {
        if (!isAdding) {
          gsap.to(button, {
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            duration: 0.3,
            ease: "power2.out",
          })
        }
      })

      button.addEventListener("mouseleave", () => {
        if (!isAdding) {
          gsap.to(button, {
            scale: 1,
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            duration: 0.3,
            ease: "power2.out",
          })
        }
      })
    }

    if (modal && closeButtonRef.current) {
      const closeBtn = closeButtonRef.current

      closeBtn.addEventListener("mouseenter", () => {
        gsap.to(closeBtn, {
          scale: 1.2,
          rotation: 90,
          duration: 0.3,
          ease: "power2.out",
        })
      })

      closeBtn.addEventListener("mouseleave", () => {
        gsap.to(closeBtn, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out",
        })
      })
    }
  }, [modal, isAdding])

  console.log("mainServiceData", globalData?.data?.data)

  return (
    <>
      {modal && (
        <div
          ref={modalBackdropRef}
          className={`fixed inset-0 !z-50 flex items-center justify-center bg-black bg-opacity-70`}
          role="dialog"
          aria-hidden="true"
          style={{ zIndex: 1000 }}
          onClick={closeModal}
        >
          <div
            ref={modalContentRef}
            className="bg-white rounded-lg z-50 shadow-2xl w-full max-w-5xl overflow-y-auto max-h-[94vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <section className="bg-gray-100">
              <div className="flex flex-col lg:flex-row shadow-md">
                <div
                  ref={leftSideRef}
                  style={{
                    backgroundImage: `url(${baseURL + findData("quote_form_left_side")?.singleMedia?.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  className="hidden lg:block lg:w-5/12 bg-cover bg-center"
                ></div>
                <div className="w-full lg:w-7/12 px-6 lg:p-1 lg:mx-10 ">
                  <div className="lg:flex justify-end hidden ">
                    <button
                      ref={closeButtonRef}
                      onClick={closeModal}
                      aria-label="Close"
                      className="text-primary hover:text-black text-3xl transition-colors duration-300"
                    >
                      &times;
                    </button>
                  </div>
                  <div
                    ref={titleRef}
                    className="text-2xl lg:text-3xl flex justify-between font-semibold m-3 w-full mb-5"
                  >
                    <span> Request A Quote</span>
                    <button
                      ref={closeButtonRef}
                      onClick={closeModal}
                      aria-label="Close"
                      className="text-primary block lg:hidden hover:text-black text-3xl transition-colors duration-300"
                    >
                      &times;
                    </button>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6 mb-4">
                    <div className="flex flex-col gap-1.5 lg:gap-3">
                      <div className="w-full space-y-4">
                        <div ref={(el) => (formFieldsRef.current[0] = el)}>
                          <input
                            type="text"
                            name="name"
                            value={personalData?.name}
                            onChange={handleChange2}
                            placeholder="Your Name"
                            className={`w-full border rounded-full p-2 px-6 transition-all duration-300 focus:ring-2 focus:ring-primary focus:border-primary ${
                              errors.name ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                          {errors.name && <p className="!text-red-500 text-sm mt-1 px-2">{errors.name}</p>}
                        </div>

                        <div ref={(el) => (formFieldsRef.current[1] = el)}>
                          <input
                            type="email"
                            name="email"
                            value={personalData?.email}
                            onChange={handleChange2}
                            placeholder="Email"
                            className={`w-full border rounded-full p-2 px-6 transition-all duration-300 focus:ring-2 focus:ring-primary focus:border-primary ${
                              errors.email ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                          {errors.email && <p className="!text-red-500 text-sm mt-1 px-2">{errors.email}</p>}
                        </div>

                        <div ref={(el) => (formFieldsRef.current[2] = el)}>
                          <input
                            type="text"
                            name="phone"
                            value={personalData?.phone}
                            onChange={handleChange2}
                            placeholder="Phone Number"
                            className={`w-full border rounded-full p-2 px-6 transition-all duration-300 focus:ring-2 focus:ring-primary focus:border-primary ${
                              errors.phone ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                          {errors.phone && <p className="!text-red-500 text-sm mt-1 px-2">{errors.phone}</p>}
                        </div>

                        <div ref={(el) => (formFieldsRef.current[3] = el)}>
                          <select
                            name="service"
                            value={personalData?.service}
                            onChange={handleChange2}
                            className={`w-full border rounded-full p-2 px-6 pe-5 transition-all duration-300 focus:ring-2 focus:ring-primary focus:border-primary ${
                              errors.service ? "border-red-500" : "border-gray-300"
                            }`}
                          >
                            <option value="">Select Service</option>
                            {mainServiceData?.data?.data?.[0]?.details?.map((item, index) => (
                              <option key={index} value={item.title}>
                                {item.title}
                              </option>
                            ))}
                          </select>
                          {errors.service && <p className="!text-red-500 text-sm mt-1 px-2">{errors.service}</p>}
                        </div>
                      </div>

                      <div ref={(el) => (formFieldsRef.current[4] = el)}>
                        <textarea
                          placeholder="Message"
                          name="message"
                          value={personalData?.message}
                          onChange={handleChange2}
                          className={`w-full border rounded-md p-2 px-6 h-full resize-none transition-all duration-300 focus:ring-2 focus:ring-primary focus:border-primary ${
                            errors.message ? "border-red-500" : "border-gray-300"
                          }`}
                          rows="5"
                        ></textarea>
                        {errors.message && <p className="!text-red-500 text-sm mt-1 px-2">{errors.message}</p>}
                      </div>
                      <div ref={(el) => (formFieldsRef.current[5] = el)}>
                        <ReCaptchaCheckbox ref={recaptchaRef} setCaptchaStatus={setCaptchaStatus} />
                      </div>
                    </div>

                    <div>
                      <button
                        ref={buttonRef}
                        type="submit"
                        disabled={isAdding || !captchaStatus}
                        className={`bg-primary-red hover:bg-primary-red text-white px-6 py-2 rounded-full transition-all duration-300 ${
                          isAdding ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg"
                        }`}
                      >
                        {isAdding ? (
                          <span className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Sending...
                          </span>
                        ) : (
                          "Send Message"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  )
}

export default RequestQuoteModal
