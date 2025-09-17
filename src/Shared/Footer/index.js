import { EmailRounded, Google, PhoneAndroid } from "@mui/icons-material"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import { blogFn, companiesServiceFn, footerServiceFn, newsLatterFn } from "Services/Home"
import CustomButton from "Shared/CustomButton"
import CustomIconButton from "Shared/CustomIconButton"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { FaLocationDot } from "react-icons/fa6"
import { IoIosArrowForward } from "react-icons/io"
import { MdAccessTime } from "react-icons/md"
import { useMutation, useQuery } from "react-query"
import { Link, useLocation, useNavigate } from "react-router-dom"

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  const [showButton, setShowButton] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const baseURL = process.env.REACT_APP_API_URL
  const [footData, setFootData] = useState([])
  const [email, setEmail] = useState()

  // Animation refs
  const footerRef = useRef(null)
  const newsletterRef = useRef(null)
  const logoSectionRef = useRef(null)
  const navigationRef = useRef(null)
  const contactRef = useRef(null)
  const bottomSectionRef = useRef(null)
  const scrollButtonRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = (path) => {
    console.log("path", path)
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      navigate(path)
      window.scrollTo({ top: 0 })
    }
  }

  // Main footer animations
  useEffect(() => {
    if (!footData.length) return

    const ctx = gsap.context(() => {
      // Set initial states
      const setInitialStates = () => {
        gsap.set(newsletterRef.current, { y: -50, opacity: 0 })
        gsap.set(logoSectionRef.current, { x: -100, opacity: 0 })
        gsap.set(navigationRef.current, { y: 100, opacity: 0 })
        gsap.set(contactRef.current, { x: 100, opacity: 0 })
        gsap.set(bottomSectionRef.current, { y: 30, opacity: 0 })
        gsap.set(".social-icon", { scale: 0, opacity: 0 })
        gsap.set(".nav-item", { x: -20, opacity: 0 })
        gsap.set(".contact-item", { y: 20, opacity: 0 })
      }

      // Create animation timeline
      const createAnimation = () => {
        const tl = gsap.timeline()

        // Newsletter section
        tl.to(newsletterRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        })

          // Main sections with stagger
          .to(
            logoSectionRef.current,
            {
              x: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power2.out",
            },
            "-=0.7"
          )

          .to(
            navigationRef.current,
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power2.out",
            },
            "-=0.9"
          )

          .to(
            contactRef.current,
            {
              x: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power2.out",
            },
            "-=1.1"
          )

          // Social icons with bounce
          .to(
            ".social-icon",
            {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "back.out(1.7)",
            },
            "-=0.8"
          )

          // Navigation items slide in
          .to(
            ".nav-item",
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.08,
              ease: "power2.out",
            },
            "-=0.6"
          )

          // Contact items
          .to(
            ".contact-item",
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "power2.out",
            },
            "-=0.8"
          )

          // Bottom section
          .to(
            bottomSectionRef.current,
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
            },
            "-=0.5"
          )

        return tl
      }

      // Set initial states
      setInitialStates()

      // Create ScrollTrigger
      ScrollTrigger.create({
        trigger: footerRef.current,
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

      // Social icons hover animations
      document.querySelectorAll(".social-icon").forEach((icon) => {
        icon.addEventListener("mouseenter", () => {
          gsap.to(icon, {
            scale: 1.2,
            y: -5,
            duration: 0.3,
            ease: "power2.out",
          })
        })

        icon.addEventListener("mouseleave", () => {
          gsap.to(icon, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          })
        })
      })

      // Navigation items hover animations
      document.querySelectorAll(".nav-item").forEach((item) => {
        item.addEventListener("mouseenter", () => {
          gsap.to(item.querySelector(".nav-arrow"), {
            x: 5,
            duration: 0.3,
            ease: "power2.out",
          })
        })

        item.addEventListener("mouseleave", () => {
          gsap.to(item.querySelector(".nav-arrow"), {
            x: 0,
            duration: 0.3,
            ease: "power2.out",
          })
        })
      })
    }, footerRef.current)

    return () => ctx.revert()
  }, [footData])

  // Scroll to top button animation
  useEffect(() => {
    if (scrollButtonRef.current) {
      if (showButton) {
        gsap.fromTo(
          scrollButtonRef.current,
          { scale: 0, rotate: -180, opacity: 0 },
          { scale: 1, rotate: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
        )
      } else {
        gsap.to(scrollButtonRef.current, {
          scale: 0,
          rotate: 180,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        })
      }
    }
  }, [showButton])

  const findData = (key) => {
    return footData?.filter((item) => item.key === key)?.[0]
  }

  const { data: footerData, isLoading, refetch } = useQuery(["footerDetails"], () => footerServiceFn())
  const { data: blogDatas } = useQuery(["menu"], () => blogFn())

  useEffect(() => {
    if (footerData) {
      setFootData(footerData?.data?.data)
    }
  }, [footerData])

  const { mutate: addNewsFn, isLoading: isAdding } = useMutation(newsLatterFn, {
    onSuccess: ({ data }) => {
      toast.success("Created Successfully!")
      setEmail("")
    },
    onError: (error) => {
      console.log(error.response.data.error.message)
      toast.error(error.response.data.error.message || "Creation failed!")
    },
  })

  const handleNews = () => {
    addNewsFn({ data: { email: email } })
    setEmail("")
  }

  const { data: companiesAddress } = useQuery(["companyAddresss"], () => companiesServiceFn())

  return (
    <>
      <div ref={footerRef} className="bg-sky-blue-100 w-[100vw] min-w-[320px] max-w-screen-2xl mx-auto overflow-hidden">
        <div className="px-[1.5rem] lg:px-[5rem]">
          {/* Newsletter Section */}
          <div
            ref={newsletterRef}
            className="flex lg:w-1/2 flex-col lg:flex-row justify-center mx-auto items-center gap-4 lg:my-8 mt-8"
          >
            <div className="text-sm font-semibold">
              <span className="whitespace-nowrap">SUBSCRIBE FOR </span>
              <div className="text-base text-red-600">NEWSLETTER</div>
            </div>
            <div className="flex w-full lg:w-2/3 justify-center">
              <input
                className="border text-base w-[90%] border-blue-950 active:border-none rounded-s-full px-6 py-2.5 font-normal mr-[-50px] transition-all duration-300 focus:ring-2 focus:ring-blue-300"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <CustomButton
                disabled={!email}
                isLoading={isAdding}
                onClick={handleNews}
                className="!bg-[#2f3985] !font-semibold !px-8 whitespace-nowrap !text-sm !rounded-full hover:!bg-[#1f2563] transition-all duration-300"
              >
                CHECK NOW
              </CustomButton>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-3 justify-start items-start gap-8 my-8 lg:my-20">
            {/* Logo and Social Section */}
            <div ref={logoSectionRef} className="flex h-full flex-col justify-start gap-6">
              <div>
                <img src={baseURL + findData("company_logo")?.singleMedia?.url} alt="Logo" className="h-14 w-auto" />
              </div>
              <p className="text-sm lg:text-base text-[#818181]">{findData("quote_form_left_side")?.value}</p>
              <div>
                <div className="font-bold mb-4 text-xl">We're Social</div>
                <div className="flex gap-3">
                  {footData?.map(
                    (item) =>
                      item?.key?.startsWith("social_account_") && (
                        <Link target="_blank" to={item?.value} key={item.key} className="social-icon">
                          {item?.singleMedia?.url ? (
                            <img
                              className="h-8 w-8 rounded-lg hover:shadow-lg transition-all duration-300"
                              src={baseURL + item?.singleMedia?.url}
                              alt={item?.key}
                            />
                          ) : (
                            <Google className="social-icon" />
                          )}
                        </Link>
                      )
                  )}
                </div>
              </div>
            </div>

            {/* Navigation Section */}
            <div ref={navigationRef} className="flex h-full flex-col justify-start">
              <div className="text-xl font-semibold lg:pl-[20%] mb-6">Quick Navigation</div>
              <div className="text-slate-600 text-sm grid lg:pl-[21%] gap-2">
                <div
                  className="nav-item flex gap-2 items-center py-2 hover:translate-x-4 transition-all duration-300 cursor-pointer group"
                  onClick={() => handleClick("/")}
                >
                  <IoIosArrowForward className="nav-arrow !text-red-500 transition-all duration-300" />
                  <span className="group-hover:text-red-600 transition-colors duration-300">Home</span>
                </div>

                <div
                  className="nav-item flex gap-2 items-center py-2 hover:translate-x-4 transition-all duration-300 cursor-pointer group"
                  onClick={() => handleClick("/blogs")}
                >
                  <IoIosArrowForward className="nav-arrow !text-red-500 transition-all duration-300" />
                  <span className="group-hover:text-red-600 transition-colors duration-300">Blogs</span>
                </div>

                <div
                  className="nav-item flex gap-2 items-center py-2 hover:translate-x-4 transition-all duration-300 cursor-pointer group"
                  onClick={() => handleClick("/contact")}
                >
                  <IoIosArrowForward className="nav-arrow !text-red-500 transition-all duration-300" />
                  <span className="group-hover:text-red-600 transition-colors duration-300">Contacts</span>
                </div>

                <div
                  className="nav-item flex gap-2 items-center py-2 hover:translate-x-4 transition-all duration-300 cursor-pointer group"
                  onClick={() => handleClick("/aboutus")}
                >
                  <IoIosArrowForward className="nav-arrow !text-red-500 transition-all duration-300" />
                  <span className="group-hover:text-red-600 transition-colors duration-300">About Us</span>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div ref={contactRef} className="flex h-full flex-col justify-start">
              <div className="text-xl font-semibold mb-6">Get In Touch</div>
              {companiesAddress?.data?.data?.map(
                (item) =>
                  item?.isDefault && (
                    <div key={item.id} className="text-gray-600 text-xs lg:text-sm font-light flex flex-col gap-2">
                      {item?.address && (
                        <div className="contact-item flex items-start gap-4 py-2 hover:text-gray-800 transition-colors duration-300">
                          <FaLocationDot className="!text-xl mt-1 text-red-500 flex-shrink-0" />
                          <span>{item?.address}</span>
                        </div>
                      )}

                      {item?.phone && (
                        <div className="contact-item flex items-center gap-4 py-2 hover:text-gray-800 transition-colors duration-300">
                          <PhoneAndroid className="!text-xl text-red-500 flex-shrink-0" />
                          <span>{item?.phone}</span>
                        </div>
                      )}

                      {item?.email && (
                        <div className="contact-item flex items-center gap-4 py-2 hover:text-gray-800 transition-colors duration-300">
                          <EmailRounded className="!text-xl text-red-500 flex-shrink-0" />
                          <span>{item?.email}</span>
                        </div>
                      )}

                      {item?.time && (
                        <div className="contact-item flex items-center gap-4 py-2 hover:text-gray-800 transition-colors duration-300">
                          <MdAccessTime className="!text-xl text-red-500 flex-shrink-0" />
                          <span>{item?.time}</span>
                        </div>
                      )}
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div ref={bottomSectionRef} className="bg-[#4b5563] text-slate-50">
        <div className="flex w-[100vw] min-w-[320px] max-w-screen-2xl mx-auto flex-col lg:flex-row justify-center lg:justify-between pl-6 pr-6 lg:pl-20 lg:pr-8 text-xs font-thin gap-2 lg:gap-6 lg:text-sm items-center py-4 lg:py-6">
          <div className="flex gap-2">
            <div className="hover:text-gray-300 transition-colors duration-300 cursor-pointer">Privacy Policy</div>
            <div>|</div>
            <div
              className="cursor-pointer hover:text-gray-300 transition-colors duration-300"
              onClick={() => navigate("/contact")}
            >
              CONTACT
            </div>
            <div>|</div>
            <div
              className="cursor-pointer hover:text-gray-300 transition-colors duration-300"
              onClick={() => {
                window.scrollTo("0", { behavior: "smooth" })
                navigate("/faq")
              }}
            >
              FAQS
            </div>
          </div>
          <div>
            <span className="text-center mr-7">
              2025 © All Rights Reserved by SAP B1 Solutions | SAP Gold Partner | Add-Ons Development | Double Click
              Solutions.
            </span>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showButton && (
        <div ref={scrollButtonRef} className="!fixed !bottom-4 !right-4 z-50">
          <CustomIconButton
            className="bg-primary-dark hover:bg-primary-darker shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => {
              const el = document.getElementById("headerId")
              if (el) el.scrollIntoView({ behavior: "smooth" })
            }}
          >
            <KeyboardArrowUpIcon className="!text-white font-bold" />
          </CustomIconButton>
        </div>
      )}
    </>
  )
}

export default Footer

// import { EmailRounded, Google, PhoneAndroid } from "@mui/icons-material"
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
// import { blogFn, companiesServiceFn, footerServiceFn, newsLatterFn } from "Services/Home"
// import CustomButton from "Shared/CustomButton"
// import CustomIconButton from "Shared/CustomIconButton"
// import { gsap } from "gsap"
// import { useEffect, useRef, useState } from "react"
// import toast from "react-hot-toast"
// import { FaLocationDot } from "react-icons/fa6"
// import { IoIosArrowForward } from "react-icons/io"
// import { MdAccessTime } from "react-icons/md"
// import { useMutation, useQuery } from "react-query"
// import { Link, useLocation, useNavigate } from "react-router-dom"

// const Footer = () => {
//   const [showButton, setShowButton] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => {
//       setShowButton(window.scrollY > 100) // Show if scrolled more than 100px
//     }

//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   const location = useLocation()
//   const navigate = useNavigate()
//   const baseURL = process.env.REACT_APP_API_URL
//   const [footData, setFootData] = useState([])
//   const [email, setEmail] = useState()
//   const ref1 = useRef(null)
//   const ref2 = useRef(null)
//   const ref3 = useRef(null)
//   const ref4 = useRef(null)

//   const handleClick = (path) => {
//     console.log("path", path)
//     if (location.pathname === path) {
//       window.scrollTo({ top: 0, behavior: "smooth" })
//     } else {
//       navigate(path)
//       window.scrollTo({ top: 0 })
//     }
//   }

//   useEffect(
//     () =>
//       [ref1, ref2, ref3, ref4].forEach((ref, index) => {
//         gsap.from(ref.current, {
//           x: -400,
//           opacity: 0,
//           duration: 1,
//           delay: index * 0.1,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: ref.current,
//             start: "top 90%",
//             toggleActions: "play none none none",
//           },
//         })
//       }),
//     []
//   )
//   const findData = (key) => {
//     return footData?.filter((item) => item.key === key)?.[0]
//   }
//   const { data: footerData, isLoading, refetch } = useQuery(["footerDetails"], () => footerServiceFn())
//   const { data: blogDatas } = useQuery(["menu"], () => blogFn())

//   useEffect(() => {
//     if (footerData) {
//       setFootData(footerData?.data?.data)
//     }
//   }, [footerData])
//   const { mutate: addNewsFn, isLoading: isAdding } = useMutation(newsLatterFn, {
//     onSuccess: ({ data }) => {
//       toast.success("Created Successfully!")
//       setEmail("")
//     },
//     onError: (error) => {
//       console.log(error.response.data.error.message)
//       toast.error(error.response.data.error.message || "Creation failed!")
//     },
//   })
//   const handleNews = () => {
//     addNewsFn({ data: { email: email } })
//     setEmail("")
//   }
//   const { data: companiesAddress } = useQuery(["companyAddresss"], () => companiesServiceFn())
//   return (
//     <>
//       {/* <hr  className="shadow-xl shadow-red-500"/> */}
//       {/* <footer className=" relative text-black   py-[4%] pt-[6%] px-[8%]"> */}
//       {/* First Part  */}
//       {/* <div className="grid lg:grid-cols-2">
//         <div ref={ref4} className=" flex flex-col justify-between  my-6">
//           <div>
//             <div className="text-xl lg:text-2xl text-red-600 mb-5">Find us at the office</div>
//             <div className="flex flex-col !text-gray-500 lg:flex-row text-base font-extralight gap-5 lg:gap-8">
//               <div className="flex flex-col gap-2 lg:gap-4">
//                 <div className="text-lg font-semibold !text-black1">Tanzania</div>
//                 <div>
//                   <Phone className="mr-2 text-red-600" />
//                   +255 222112161
//                 </div>
//                 <div>
//                   <Mail className="mr-2 text-red-600" />
//                   sales@doubleclick.co.tz
//                 </div>
//               </div>
//               <div className="flex flex-col gap-2 lg:gap-4">
//                 <div className="text-lg font-semibold !text-black1">India</div>
//                 <div>
//                   {" "}
//                   <Phone className="mr-2 text-red-600" />
//                   +255 222112161
//                 </div>
//                 <div>
//                   <Mail className="mr-2 text-red-600" />
//                   sales@doubleclick.co.tz
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="lg:flex hidden  items-center gap-4 my-8">
//             <div className="text-sm font-semibold">
//               {" "}
//               <span className="whitespace-nowrap"> SUBSCRIBE FOR </span>{" "}
//               <div className="text-base text-red-600">NEWSLETTER</div>{" "}
//             </div>
//             <div className="flex w-[70%]">
//               <input
//                 className="border text-base w-[70%] border-blue-950 active:border-none rounded-s-full px-6 py-2 font-normal mr-[-50px]"
//                 type="email"
//                 placeholder="Email"
//               />
//               <CustomButton className="!bg-[#2f3985] !font-semibold w-36 !text-sm !rounded-full">
//                 CHECK NOW
//               </CustomButton>
//             </div>
//           </div>
//         </div>
//         <div className="">
//           <iframe
//             width="100%"
//             height="358"
//             id="gmap_canvas"
//             loading="lazy"
//             src="https://maps.google.com/maps?q=London%20Eye,%20London,%20United%20Kingdom&amp;t=m&amp;z=10&amp;output=embed&amp;iwloc=near"
//             title="London Eye, London, United Kingdom"
//             aria-label="London Eye, London, United Kingdom"
//           ></iframe>
//         </div>
//       </div>
//       <div className="flex lg:hidden flex-col  items-center gap-4 my-8">
//         <div className="text-sm font-semibold">
//           {" "}
//           <span className="whitespace-nowrap"> SUBSCRIBE FOR </span>{" "}
//           <span className="text-base text-red-600">NEWSLETTER</span>{" "}
//         </div>
//         <div className="flex w-full">
//           <input
//             className="border text-base w-[90%] border-blue-950 active:border-none rounded-s-full px-6 py-2 font-normal mr-[-50px]"
//             type="email"
//             placeholder="Email"
//           />
//           <CustomButton className="!bg-[#2f3985] !font-semibold  !px-8 whitespace-nowrap !text-sm !rounded-full">
//             CHECK NOW
//           </CustomButton>
//         </div>
//       </div> */}
//       {/* Secoder Part  */}
//       {/* <div className="grid lg:grid-cols-3  items-center gap-4 my-20">
//         <div ref={ref1} className=" flex flex-col gap-6">
//           <div>
//             <img src={logo} alt="Logo" className="h-14 w-auto" />
//           </div>
//           <div className="text-[#666]">
//             Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit
//             consequat ipsum, nec sagittis sem nibh id elit. Vivamus ac ultrices diam, vitae accumsan tellus. Integer
//             sollicitudin vulputate lacus, congue .
//           </div>
//           <div>
//             <div className="font-bold mb-4 text-xl">We're Social</div>
//             <div className="flex gap-2">
//               <Facebook />
//               <Twitter />
//               <WhatsApp />
//               <Google />
//             </div>
//           </div>
//         </div>
//         <div ref={ref2} className=" flex flex-col gap-6">
//           <div className="text-3xl font-medium text-secondary">Recent Post</div>
//           <div className="flex gap-4">
//             <div className="">
//               <img className="rounded-full  h-24 w-48  size-full " src={postThumb1} alt="" />
//             </div>
//             <div className="flex flex-col gap-3">
//               <div className="text-primary text-base font-semibold">Liberalisation in 2019 </div>
//               <div> Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium..</div>
//               <div className="flex items-center gap-3">
//                 <CalendarMonth /> July 28, 2023 <FaComments /> 1
//               </div>
//             </div>
//           </div>
//           <div className="flex gap-4">
//             <div>
//               <img className="!rounded-full  h-24 w-48  size-full wp-image-329" src={postThumb2} alt="" />
//             </div>
//             <div className="flex flex-col gap-3">
//               <div className="text-primary text-base font-semibold">Liberalisation in 2019 </div>
//               <div> Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium..</div>
//               <div className="flex items-center gap-3">
//                 <CalendarMonth /> July 28, 2023 <FaComments /> 1
//               </div>
//             </div>
//           </div>
//         </div>
//         <div ref={ref3} className=" flex flex-col gap-6">
//           <div className="text-3xl font-medium text-secondary">Our Photostream</div>
//           <div className="grid grid-cols-4 gap-1 ">
//             <div className="h-20 w-20 widget_media_image">
//               <a href="https://www.instagram.com/p/CvwR9y5v99b/?utm_source=ig_web_copy_link&amp;igshid=MzRlODBiNWFlZA==">
//                 <img src={pic1} className="h-20 w-20 " alt="" loading="lazy" />
//               </a>
//             </div>
//             <div className="h-20 w-20 widget_media_image">
//               <a href="https://www.instagram.com/p/CvwR9y5v99b/?utm_source=ig_web_copy_link&amp;igshid=MzRlODBiNWFlZA==">
//                 <img src={pic2} className="h-20 w-20 " alt="" loading="lazy" />
//               </a>
//             </div>
//             <div className="h-20 w-20 widget_media_image">
//               <a href="https://www.instagram.com/p/CvwR9y5v99b/?utm_source=ig_web_copy_link&amp;igshid=MzRlODBiNWFlZA==">
//                 <img src={pic3} className="h-20 w-20 " alt="" loading="lazy" />
//               </a>
//             </div>
//             <div className="h-20 w-20 widget_media_image">
//               <a href="../../../live.staticflickr.com/5605/15484954949_a4e97a9dc5_b.jpg">
//                 <img src={pic4} className="h-20 w-20 " alt="" loading="lazy" />
//               </a>
//             </div>
//             <div className="h-20 w-20 widget_media_image">
//               <a href="../../../live.staticflickr.com/7490/15647103116_1e4b9033f0_b.jpg">
//                 <img src={pic5} className="h-20 w-20 " alt="" loading="lazy" />
//               </a>
//             </div>
//             <div className="h-20 w-20 widget_media_image">
//               <a href="https://www.instagram.com/p/CvwR9y5v99b/?utm_source=ig_web_copy_link&amp;igshid=MzRlODBiNWFlZA==">
//                 <img src={pic6} className="h-20 w-20 " alt="" loading="lazy" />
//               </a>
//             </div>
//             <div className="h-20 w-20 widget_media_image">
//               <a href="https://www.instagram.com/p/CvwR9y5v99b/?utm_source=ig_web_copy_link&amp;igshid=MzRlODBiNWFlZA==">
//                 <img src={pic7} className="h-20 w-20 " alt="" loading="lazy" />
//               </a>
//             </div>
//             <div className="h-20 w-20 widget_media_image">
//               <a href="../../../live.staticflickr.com/3937/15647100406_34599445cf_b.jpg">
//                 <img src={pic8} className="h-20 w-20 " alt="" loading="lazy" />
//               </a>
//             </div>
//             <div className="h-20 w-20 widget_media_image">
//               <a href="https://www.instagram.com/p/CvwR9y5v99b/?utm_source=ig_web_copy_link&amp;igshid=MzRlODBiNWFlZA==">
//                 <img src={pic9} className="h-20 w-20 " alt="" loading="lazy" />
//               </a>
//             </div>
//             <div className="h-20 w-20 widget_media_image">
//               <a href="../../../live.staticflickr.com/7467/15484952179_5303848c98_b.jpg">
//                 <img src={pic10} className="h-20 w-20 " alt="" loading="lazy" />
//               </a>
//             </div>
//             <div className="h-20 w-20 widget_media_image">
//               <a href="https://www.instagram.com/p/CvwR9y5v99b/?utm_source=ig_web_copy_link&amp;igshid=MzRlODBiNWFlZA==">
//                 <img src={pic1} className="h-20 w-20 " alt="" loading="lazy" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </div> */}
//       {/* </footer> */}
//       {/* Third Part  */}
//       <div className="bg-sky-blue-100 w-[100vw]  min-w-[320px] max-w-screen-2xl mx-auto ">
//         <div className=" px-[1.5rem] lg:px-[5rem] ">
//           {/* Section1 */}
//           <div className="flex lg:w-1/2 flex-col lg:flex-row justify-center mx-auto   items-center gap-4  lg:my-8 mt-8 ">
//             <div className="text-sm font-semibold">
//               {" "}
//               <span className="whitespace-nowrap"> SUBSCRIBE FOR </span>{" "}
//               <div className="text-base text-red-600">NEWSLETTER</div>{" "}
//             </div>
//             <div className="flex w-full lg:w-2/3  justify-center">
//               <input
//                 className="border text-base w-[90%] border-blue-950 active:border-none rounded-s-full px-6 py-2.5 font-normal mr-[-50px]"
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <CustomButton
//                 disabled={!email}
//                 isLoading={isAdding}
//                 onClick={handleNews}
//                 className="!bg-[#2f3985] !font-semibold  !px-8 whitespace-nowrap !text-sm !rounded-full"
//               >
//                 CHECK NOW
//               </CustomButton>
//             </div>
//           </div>
//           {/* Section2 */}
//           <div className="grid lg:grid-cols-3 justify-start   items-center gap-4 my-8 lg:my-20">
//             <div className=" flex h-full flex-col justify-start gap-6">
//               <div>
//                 <img src={baseURL + findData("company_logo")?.singleMedia?.url} alt="Logo" className="h-14 w-auto" />
//               </div>
//               <p className="text-sm lg:text-base  text-[#818181]">
//                 {findData("quote_form_left_side")?.value}
//                 {/* Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit
//             consequat ipsum, nec sagittis sem nibh id elit.  */}
//               </p>
//               <div>
//                 <div className="font-bold mb-4 text-xl">We're Social</div>
//                 <div className="flex gap-2">
//                   {footData?.map(
//                     (item) =>
//                       item?.key?.startsWith("social_account_") && (
//                         <Link target="_blank" to={item?.value} key={item.key}>
//                           {item?.singleMedia?.url ? (
//                             <img className="h-8 w-87" src={baseURL + item?.singleMedia?.url} alt={item?.key} />
//                           ) : (
//                             <Google />
//                           )}
//                         </Link>
//                       )
//                   )}

//                   {/* <img className="h-6 w-6" src={process.env.REACT_APP_API_URL+ findData("social_account_facebook")?.singleMedia?.url} /> */}
//                   {/* {findData("social_account_facebook")?.value && (
//                   <Link target="_blank" to={findData("social_account_facebook")?.value}>
//                     <Facebook />
//                   </Link>
//                 )}
//                 {findData("social_account_instagram")?.value && (
//                   <Link target="_blank" to={findData("social_account_instagram")?.value}>
//                     <Instagram />
//                   </Link>
//                 )}
//                 {findData("social_account_twitter")?.value && (
//                   <Link target="_blank" to={findData("social_account_twitter")?.value}>
//                     <Twitter />{" "}
//                   </Link>
//                 )}
//                 {findData("social_account_whatsApp")?.value && (
//                   <Link target="_blank" to={findData("social_account_whatsApp")?.value}>
//                     <WhatsApp />{" "}
//                   </Link>
//                 )}
//                 {findData("social_account_website")?.value && (
//                   <Link target="_blank" to={findData("social_account_website")?.value}>
//                     <Google />{" "}
//                   </Link>
//                 )}
//                 {findData("social_account_linkedin")?.value && (
//                   <Link target="_blank" to={findData("social_account_linkedin")?.value}>
//                     <LinkedIn />{" "}
//                   </Link>
//                 )} */}
//                 </div>
//               </div>
//             </div>

//             <div className=" flex h-full flex-col justify-start">
//               <div className="text-xl font-semibold lg:pl-[20%]">Quick Navigation</div>
//               <div className="text-slate-600 my-5 text-sm grid  lg:pl-[21%] gap-0">
//                 <div
//                   className="flex gap-2 items-center my-2 hover:translate-x-4  transition-all duration-300 cursor-pointer"
//                   onClick={() => handleClick("/")}
//                 >
//                   <IoIosArrowForward className="!text-red-500" /> <span>Home</span>
//                 </div>

//                 {/* <div className="flex gap-2 items-center my-2 hover:translate-x-4  transition-all duration-300 cursor-pointer"  onClick={()=>{handleClick("/")}} >
//               <IoIosArrowForward className="!text-red-500" /> <span>News</span>
//             </div> */}
//                 {/* <div
//                 className="flex gap-2 items-center my-2 hover:translate-x-4  transition-all duration-300 cursor-pointer"
//                 onClick={() => {
//                   handleClick("/services")
//                 }}
//               >
//                 <IoIosArrowForward className="!text-red-500" /> <span>Services</span>
//               </div> */}
//                 {/* {blogDatas?.data?.map(
//                 (item) =>
//                   item?.slug != "blogs" && (
//                     <a
//                       href={
//                         item?.children?.length > 0
//                           ? `${window.location.origin}/${item?.slug}/${item?.children?.[0].slug}/${item?.children?.[0]?.article?.slug}`
//                           : `${window.location.origin}/${item.slug}/${item?.article?.slug}`
//                       }
//                       className="flex gap-2 items-center my-2 hover:translate-x-4  transition-all duration-300 cursor-pointer"
//                     >
//                       <IoIosArrowForward className="!text-red-500" /> <span>{item?.name}</span>
//                     </a>
//                   )
//               )} */}
//                 {/* {blogDatas?.data?.map((item) => (
//                 <>
//                   {item?.slug != "blogs" && (
//                     <div className=" group">
//                       <a
//                         href={item?.article ? `${window.location.origin}/${item.slug}/${item?.article?.slug}` : "#"}
//                         className="!capitalize flex whitespace-nowrap gap-2 items-center my-2 hover:translate-x-4  transition-all duration-300 cursor-pointer"
//                       >
//                         <IoIosArrowForward className="!text-red-500" /> {item?.name?.toLowerCase()}

//                       </a>
//                       <div className="absolute   w-auto bg-white shadow-lg border text-xs whitespace-nowrap font-medium rounded hidden group-hover:block z-50">
//                         {item?.children
//                           ?.slice()
//                           .sort((a, b) => a.order - b.order)
//                           .map((i) => (
//                             <>
//                               {i?.children?.length > 0 ? (
//                                 <div className=" !capitalize  bg-gray-100 whitespace-nowrap flex justify-between px-4 py-1.5 border-b hover:bg-gray-100">
//                                   {i.name}
//                                   {i?.children?.length > 0 && <FaAngleDown className="text-black !font-thin !mt-1 " />}
//                                 </div>
//                               ) : (
//                                 <a
//                                   href={
//                                     i?.article
//                                       ? `${window.location.origin}/${item.slug}/${i.slug}/${i?.article?.slug}`
//                                       : ""
//                                   }
//                                   className=" !capitalize whitespace-nowrap flex px-4 border-b py-2 hover:bg-gray-100"
//                                 >
//                                   {i.name}
//                                 </a>
//                               )}
//                               {i?.children?.length > 0 &&
//                                 i?.children?.map((j) => (
//                                   <>
//                                     {j?.children?.length > 0 ? (
//                                       <div className=" !capitalize bg-gray-200 whitespace-nowrap border-b pl-10 flex justify-between px-4 py-1 hover:bg-gray-100">
//                                         {j.name}
//                                         {j?.children?.length > 0 && (
//                                           <FaAngleDown className="text-black !font-thin   !mt-1 " />
//                                         )}
//                                       </div>
//                                     ) : (
//                                       <a
//                                         href={
//                                           j?.article
//                                             ? `${window.location.origin}/${item.slug}/${i.slug}/${j?.slug}/${j?.article?.slug}`
//                                             : "/no-article-found"
//                                         }
//                                         className=" !capitalize pl-10 bg-gray-100 whitespace-nowrap border-b flex  px-4 py-1 hover:bg-gray-100"
//                                       >
//                                           {j.name}
//                                       </a>
//                                     )}

//                                     {j?.children?.length > 0 &&
//                                       j?.children?.map((k) => (
//                                         <a
//                                           href={
//                                             k?.article
//                                               ? `${window.location.origin}/${item.slug}/${i.slug}/${j.slug}/${k.slug}/${k?.article?.slug}`
//                                               : `${window.location.origin}/no-article-found`
//                                           }
//                                           className=" !capitalize px-4 flex bg-gray-200 py-1 !pl-16 border-b    hover:bg-gray-200"
//                                         >
//                                           {k.name}
//                                         </a>
//                                       ))}
//                                   </>
//                                 ))}
//                             </>
//                           ))}
//                       </div>
//                     </div>
//                   )}
//                 </>
//               ))} */}
//                 <div
//                   className="flex gap-2 items-center my-2 hover:translate-x-4  transition-all duration-300 cursor-pointer"
//                   onClick={() => {
//                     handleClick("/blogs")
//                   }}
//                 >
//                   <IoIosArrowForward className="!text-red-500" /> <span>Blogs</span>
//                 </div>
//                 <div
//                   className="flex gap-2 items-center my-2 hover:translate-x-4  transition-all duration-300 cursor-pointer"
//                   onClick={() => {
//                     handleClick("/contact")
//                   }}
//                 >
//                   <IoIosArrowForward className="!text-red-500" /> <span>Contacts</span>
//                 </div>
//                 <div
//                   className="flex gap-2 items-center my-2 hover:translate-x-4  transition-all duration-300 cursor-pointer"
//                   onClick={() => {
//                     handleClick("/aboutus")
//                   }}
//                 >
//                   <IoIosArrowForward className="!text-red-500" /> <span>About Us</span>
//                 </div>
//                 {/* <div className="flex gap-2 items-center my-2 hover:translate-x-4  transition-all duration-300 cursor-pointer"  onClick={()=>{handleClick("/")}} >
//               <IoIosArrowForward className="!text-red-500" /> <span>Projects</span>
//             </div> */}
//               </div>
//             </div>

//             <div className=" flex h-full flex-col justify-start ">
//               <div className="text-xl font-semibold">Get In Touch</div>
//               {companiesAddress?.data?.data?.map(
//                 (item) =>
//                   item?.isDefault && (
//                     <div className="text-gray-600 text-xs lg:text-sm font-light flex flex-col gap-0  my-3">
//                       {item?.address && (
//                         <div className="flex items-start gap-4  my-1 lg:my-2 ">
//                           <FaLocationDot className="!text-4xl  mt-2 mr-2" />{" "}
//                           <span>
//                             {item?.address}
//                             {/* {findData("company_address_1")?.value
//                           ? findData("company_address_1")?.value
//                           : findData("company_address_2")?.value} */}
//                           </span>
//                         </div>
//                       )}
//                       {item?.phone && (
//                         <div className="flex  items-center gap-4  my-1 lg:my-2 ">
//                           <PhoneAndroid className="!text-2xl w-5 mt-2" />
//                           <span>
//                             {item?.phone}
//                             {/* <div>{findData("company_phone")?.value}</div> */}
//                           </span>
//                         </div>
//                       )}

//                       {item?.email && (
//                         <div className="flex items-center gap-4  my-1 lg:my-2 ">
//                           <EmailRounded className="!text-2xl w-5 mt-2" />{" "}
//                           <span>
//                             {item?.email}
//                             {/* <div>{findData("company_email")?.value}</div> */}
//                           </span>
//                         </div>
//                       )}
//                       {item?.time && (
//                         <div className="flex gap-2 items-center my-1 lg:my-2 ">
//                           <MdAccessTime className="!text-2xl mt-2" />{" "}
//                           <span>
//                             {item?.time}
//                             {/* <div>{findData("company_time")?.value}</div> */}
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   )
//               )}
//             </div>

//             {/*
//         <div   className=" flex h-full flex-col justify-start" >
//           <div className="text-xl font-semibold mb-4">Recent Tweets</div>
//           <div style={{fontSize:"14.2px"}} className="text-slate-500 text-sm  font-thin flex flex-col gap-0  ">
//             With this roundup of 42 of the best halftone resources for Adobe Photoshop and Adobe Illustrator, here’s everything… twitter.com/i/web/status/1…about
//           </div>
//           <div className="text-sm text-slate-400 !font-thin">3 days ago</div>
//           <CustomButton className="!bg-[#1c95de] !my-8 !font-semibold  !px-8 whitespace-nowrap !text-sm !rounded-full">
//            <Twitter /> FOLLOW @TWITTER
//           </CustomButton>
//         </div> */}
//           </div>
//         </div>
//       </div>
//       {/* Last Part */}
//       <div className=" bg-[#4b5563] text-slate-50">
//         <div className="flex w-[100vw] min-w-[320px] max-w-screen-2xl mx-auto flex-col lg:flex-row justify-center  lg:justify-between pl-6 pr-6 lg:pl-20 lg:pr-8 text-xs font-thin gap-2 lg:gap-6 lg:text-sm  items-center py-4 lg:py-6 bg-[#4b5563] text-slate-50">
//           <div className="flex gap-2 ">
//             <div>Privecy Policy</div>
//             <div>|</div>
//             <div
//               className="cursor-pointer"
//               onClick={() => {
//                 navigate("/contact")
//               }}
//             >
//               CONTACT
//             </div>
//             <div>|</div>
//             <div
//               className="cursor-pointer"
//               onClick={() => {
//                 window.scrollTo("0", { behavior: "smooth" })
//                 navigate("/faq")
//               }}
//             >
//               FAQS
//             </div>
//           </div>
//           <div>
//             <span className="text-center mr-7">
//               {" "}
//               2025 © All Rights Reserved by SAP B1 Solutions | SAP Gold Partner | Add-Ons Development | Double Click
//               Solutions.
//             </span>

//             {/* <CustomIconButton className="hidden lg:block  ">
//          <a href="#headerId"><KeyboardArrowUpIcon className="!text-white font-bold" /></a>
//         </CustomIconButton> */}
//           </div>
//         </div>
//       </div>
//       {showButton && (
//         <div className="!fixed !bottom-4  !right-4  z-50 ">
//           <CustomIconButton
//             className=" bg-primary-dark"
//             onClick={() => {
//               const el = document.getElementById("headerId")
//               if (el) el.scrollIntoView({ behavior: "smooth" })
//             }}
//           >
//             <a>
//               <KeyboardArrowUpIcon className="!text-white font-bold" />
//             </a>
//           </CustomIconButton>
//         </div>
//       )}
//     </>
//   )
// }
// export default Footer
