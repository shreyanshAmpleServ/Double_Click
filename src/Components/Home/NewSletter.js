import React, { useState, useRef, useEffect } from "react"
import HelpChatIcon from "../../Assests/help.png"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import { newsLatterFn } from "Services/Home"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const NewsletterSignup = () => {
  const [email, setEmail] = useState("")

  // Animation refs
  const sectionRef = useRef(null)
  const iconRef = useRef(null)
  const textContentRef = useRef(null)
  const formRef = useRef(null)
  const inputRef = useRef(null)
  const buttonRef = useRef(null)

  const { mutate: addNewsFn, isLoading: isAdding } = useMutation(newsLatterFn, {
    onSuccess: ({ data }) => {
      toast.success("Email submission successfully!")
      setEmail("")

      // Success animation
      gsap.to(buttonRef.current, {
        scale: 1.1,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      })
    },
    onError: (error) => {
      console.log(error.response.data.error.message)
      toast.error(error.response.data.error.message || "Creation failed!")

      // Error shake animation
      gsap.to(formRef.current, {
        x: [-10, 10, -8, 8, -6, 6, -4, 4, -2, 2, 0],
        duration: 0.6,
        ease: "power2.out",
      })
    },
  })

  // Main animation setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      const setInitialStates = () => {
        gsap.set(iconRef.current, {
          x: -100,
          opacity: 0,
          rotation: -20,
          scale: 0.8,
        })
        gsap.set(textContentRef.current, {
          y: 50,
          opacity: 0,
        })
        gsap.set(formRef.current, {
          x: 100,
          opacity: 0,
          scale: 0.9,
        })
        gsap.set(inputRef.current, {
          width: "0%",
          opacity: 0,
        })
        gsap.set(buttonRef.current, {
          scale: 0,
          rotation: 180,
          opacity: 0,
        })
      }

      // Create animation timeline
      const createAnimation = () => {
        const tl = gsap.timeline()

        // Icon animation with bounce
        tl.to(iconRef.current, {
          x: 0,
          opacity: 1,
          rotation: 0,
          scale: 1,
          duration: 1.2,
          ease: "back.out(1.7)",
        })

          // Text content slide up
          .to(
            textContentRef.current,
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
            },
            "-=0.8"
          )

          // Form container slide in
          .to(
            formRef.current,
            {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              // ease: "power2.out",
              ease: "back.out(1.7)",
            },
            "-=2"
          )

          // Input field expand animation
          .to(
            inputRef.current,
            {
              width: "100%",
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=1.2"
          )

          // Button spin and scale in
          .to(
            buttonRef.current,
            {
              scale: 1,
              rotation: 0,
              opacity: 1,
              duration: 0.8,
              ease: "back.out(1.5)",
            },
            "-=1"
          )

        return tl
      }

      // Set initial states
      setInitialStates()

      // Create ScrollTrigger
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => {
          setInitialStates()
          createAnimation()
        },
        onEnterBack: () => {
          setInitialStates()
          createAnimation()
        },
      })

      // Input focus animations
      if (inputRef.current) {
        inputRef.current.addEventListener("focus", () => {
          gsap.to(inputRef.current, {
            scale: 1.02,
            borderColor: "#f97316",
            boxShadow: "0 0 0 3px rgba(249, 115, 22, 0.1)",
            duration: 0.3,
            ease: "power2.out",
          })
        })

        inputRef.current.addEventListener("blur", () => {
          gsap.to(inputRef.current, {
            scale: 1,
            borderColor: "transparent",
            boxShadow: "0 0 0 0px rgba(249, 115, 22, 0)",
            duration: 0.3,
            ease: "power2.out",
          })
        })
      }

      // Button hover animations
      if (buttonRef.current) {
        buttonRef.current.addEventListener("mouseenter", () => {
          gsap.to(buttonRef.current, {
            scale: 1.05,
            backgroundColor: "#ea580c",
            duration: 0.3,
            ease: "power2.out",
          })
        })

        buttonRef.current.addEventListener("mouseleave", () => {
          gsap.to(buttonRef.current, {
            scale: 1,
            backgroundColor: "#f97316",
            duration: 0.3,
            ease: "power2.out",
          })
        })

        buttonRef.current.addEventListener("mousedown", () => {
          gsap.to(buttonRef.current, {
            scale: 0.95,
            duration: 0.1,
            ease: "power2.out",
          })
        })

        buttonRef.current.addEventListener("mouseup", () => {
          gsap.to(buttonRef.current, {
            scale: 1.05,
            duration: 0.1,
            ease: "power2.out",
          })
        })
      }

      // Icon hover animation
      if (iconRef.current) {
        iconRef.current.addEventListener("mouseenter", () => {
          gsap.to(iconRef.current, {
            scale: 1.1,
            rotation: 5,
            duration: 0.3,
            ease: "power2.out",
          })
        })

        iconRef.current.addEventListener("mouseleave", () => {
          gsap.to(iconRef.current, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out",
          })
        })
      }
    }, sectionRef.current)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    // Button loading animation
    gsap.to(buttonRef.current, {
      scale: 0.9,
      duration: 0.1,
      ease: "power2.out",
      onComplete: () => {
        addNewsFn({ data: { email: email } })
      },
    })
  }

  return (
    <div ref={sectionRef} className="bg-slate-700 py-10 px-4 sm:px-[8%] lg:px-[15%] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Section - Icon and Text */}
          <div className="flex items-start gap-6 flex-1">
            <div className="flex-shrink-0">
              <img ref={iconRef} src={HelpChatIcon} className="h-36 cursor-pointer" alt="Help" />
            </div>
            <div ref={textContentRef} className="text-left">
              <h2 className="text-3xl font-semibold !mb-1 !text-white">Keep Up To Date</h2>
              <p className="!text-gray-300 text-lg">Sign up for our newsletter and follow us on social media</p>
            </div>
          </div>

          {/* Right Section - Email Form */}
          <div className="flex-shrink-0 w-full md:w-auto">
            <form ref={formRef} onSubmit={handleSubmit} className="flex gap-0 relative">
              <input
                ref={inputRef}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email...."
                className="px-4 py-3 text-white w-52 bg-[#8182831f] border-2 border-transparent focus:outline-none focus:ring-none rounded-l-md transition-all duration-300"
                required
              />
              <button
                ref={buttonRef}
                type="submit"
                disabled={isAdding}
                className="bg-orange-500 text-white font-semibold px-5 py-3 rounded-r-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-700 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isAdding ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>SENDING...</span>
                  </div>
                ) : (
                  "SUBSCRIBE"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsletterSignup

// import React, { useState } from "react"
// import HelpChatIcon from "../../Assests/help.png"
// import { useMutation } from "react-query"
// import { toast } from "react-toastify"
// import { newsLatterFn } from "Services/Home"

// const NewsletterSignup = () => {
//   const [email, setEmail] = useState("")

//   const { mutate: addNewsFn, isLoading: isAdding } = useMutation(newsLatterFn, {
//     onSuccess: ({ data }) => {
//       toast.success("Email submission successfully!")
//       setEmail("")
//     },
//     onError: (error) => {
//       console.log(error.response.data.error.message)
//       toast.error(error.response.data.error.message || "Creation failed!")
//     },
//   })
//   const handleNews = () => {}
//   const handleSubmit = (e) => {
//     e.preventDefault()
//     addNewsFn({ data: { email: email } })
//     setEmail("")
//   }

//   return (
//     <div className="bg-slate-700 py-10 px-4 sm:px-[8%] lg:px-[15%]">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex flex-col md:flex-row items-center justify-between gap-8">
//           {/* Left Section - Icon and Text */}
//           <div className="flex items-start gap-6 flex-1">
//             <div className="flex-shrink-0">
//               <img src={HelpChatIcon} className="h-36" alt="Help" />
//             </div>
//             <div className="text-left">
//               <h2 className="text-3xl font-semibold !mb-1 !text-white ">Keep Up To Date</h2>
//               <p className="!text-gray-300 text-lg">Sign up for our newsletter and follow us on social media</p>
//             </div>
//           </div>

//           {/* Right Section - Email Form */}
//           <div className="flex-shrink-0 w-full md:w-auto">
//             <form onSubmit={handleSubmit} className="flex gap-0">
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email...."
//                 className="px-4 py-3 text-white w-52  bg-[#8182831f] border-0 focus:outline-none focus:ring-none focus:ring-[#8182831f] rounded-l-md"
//                 required
//               />
//               <button
//                 type="submit"
//                 className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-3 rounded-r-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-700"
//               >
//                 SUBSCRIBE
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default NewsletterSignup
