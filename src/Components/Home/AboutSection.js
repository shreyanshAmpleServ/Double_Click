import React, { useEffect, useRef } from "react"
import images from "../../Assests/About-Us-Image.jpg"
import { FaMedal } from "react-icons/fa"
import { FiGlobe } from "react-icons/fi"
import { HiBriefcase, HiUsers } from "react-icons/hi"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const DoubleClickHero = () => {
  const circleRef = useRef(null)
  const leftSectionRef = useRef(null)
  const rightSectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const descriptionRef = useRef(null)
  const sinceRef = useRef(null)
  const achievementCardsRef = useRef(null)

  const cardRefs = {
    exp: useRef(null),
    sat: useRef(null),
    clients: useRef(null),
    projects: useRef(null),
  }

  useEffect(() => {
    // Left Section Animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: leftSectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    })

    // Title animation - slide in from left
    tl.from(titleRef.current, {
      x: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      // Subtitle animation - slide in from left with delay
      .from(
        subtitleRef.current,
        {
          x: -100,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      )
      // Description animation - fade in from bottom
      .from(
        descriptionRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      )
      // Since section animation - slide in from left
      .from(
        sinceRef.current,
        {
          x: -80,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      )
      // Achievement cards animation - stagger from bottom
      .from(
        achievementCardsRef.current.children,
        {
          y: 40,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.2"
      )

    // Right Section Animations
    // Circle animation
    gsap.from(circleRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: rightSectionRef.current,
        start: "top 80%",
      },
    })

    // Cards animation
    Object.values(cardRefs).forEach((ref, i) => {
      gsap.from(ref.current, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        delay: 0.3 + i * 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
        },
      })
    })

    // Hover Animations Setup
    // Achievement Cards Hover
    const achievementCards = achievementCardsRef.current?.children
    if (achievementCards) {
      Array.from(achievementCards).forEach((card) => {
        const onEnter = () => {
          gsap.to(card, {
            y: -10,
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          })
        }
        const onLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          })
        }
        card.addEventListener("mouseenter", onEnter)
        card.addEventListener("mouseleave", onLeave)
      })
    }

    // Circle Image Hover
    const onCircleEnter = () => {
      gsap.to(circleRef.current, {
        scale: 1.05,
        duration: 0.4,
        ease: "power2.out",
      })
    }
    const onCircleLeave = () => {
      gsap.to(circleRef.current, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      })
    }
    circleRef.current?.addEventListener("mouseenter", onCircleEnter)
    circleRef.current?.addEventListener("mouseleave", onCircleLeave)

    // Floating Cards Hover
    Object.values(cardRefs).forEach((ref) => {
      const onEnter = () => {
        gsap.to(ref.current, {
          y: -15,
          scale: 1.08,
          duration: 0.3,
          ease: "power2.out",
        })
      }
      const onLeave = () => {
        gsap.to(ref.current, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        })
      }
      ref.current?.addEventListener("mouseenter", onEnter)
      ref.current?.addEventListener("mouseleave", onLeave)
    })

    // Since Section Hover
    const onSinceEnter = () => {
      gsap.to(sinceRef.current, {
        x: 5,
        duration: 0.3,
        ease: "power2.out",
      })
    }
    const onSinceLeave = () => {
      gsap.to(sinceRef.current, {
        x: 0,
        duration: 0.3,
        ease: "power2.out",
      })
    }
    sinceRef.current?.addEventListener("mouseenter", onSinceEnter)
    sinceRef.current?.addEventListener("mouseleave", onSinceLeave)
  }, [])

  return (
    <div
      className="bg-gray-50 !py-6 lg:!py-8 px-4 sm:!px-6 md:!px-8 pb-0 lg:!px-10"
      style={{ fontFamily: "Poppins, Inter, system-ui, -apple-system, sans-serif !important" }}
    >
      <div className="!max-w-7xl !mx-auto">
        <div className="grid grid-cols-1 lg:!grid-cols-2 !gap-8 sm:!gap-12 lg:!gap-16 !items-center">
          {/* Left Section */}
          <div ref={leftSectionRef} className="!space-y-6 sm:!space-y-8">
            {/* Main Title */}
            <div>
              <h1
                ref={titleRef}
                className="text-primary !text-4xl sm:!text-5xl lg:!text-6xl !font-medium !mb-0 !mt-3 cursor-pointer transition-colors duration-300 "
              >
                About
              </h1>
              <h2
                ref={subtitleRef}
                className="!text-gray-900 !text-4xl sm:!text-5xl lg:!text-6xl !font-bold !leading-tight !mt-3 !mb-6 cursor-pointer transition-colors duration-300 hover:!text-gray-700"
              >
                DoubleClick
                <br />
                Consulting
              </h2>
              <p
                ref={descriptionRef}
                className="!text-gray-500 !text-base sm:!text-lg !leading-relaxed !max-w-lg transition-colors duration-300 hover:!text-gray-600"
              >
                Empowering Digital Transformation Through Expert SAP Solutions.
              </p>
            </div>
            <div className="flex flex-col lg:!flex-row gap-2 sm:!space-x-8 !space-y-3 sm:!space-y-3 !mt-6">
              {/* Since 2008 */}
              <div
                ref={sinceRef}
                className="!mt-2 sm:!mt-12 cursor-pointer  flex lg:flex-col flex-row gap-2 justify-center"
              >
                <h3 className="!text-gray-900 !text-xl sm:!text-2xl !my-2 !font-medium">Since</h3>
                <h3 className="!text-gray-900 !text-xl sm:!text-4xl !my-2 !font-bold">2008</h3>
              </div>
              {/* Achievement Cards */}
              <div ref={achievementCardsRef} className="grid !grid-cols-3 !gap-4 sm:!gap-6 lg:!gap-5 !mt-8 sm:!mt-16">
                <div className="!text-center !bg-white  !p-3 !px-0 lg:!px-3 !rounded-2xl shadow-lg lg:!shadow-sm cursor-pointer transition-shadow duration-300 hover:shadow-xl">
                  <div className="!w-12 sm:!w-16 !h-12 sm:!h-16 !mx-auto !mb-2 sm:!mb-4 !bg-yellow-100 !rounded-2xl !flex !items-center !justify-center">
                    <FaMedal className="!w-6 sm:!w-8 !h-6 sm:!h-8 !text-yellow-600" />
                  </div>
                  <p className="!mb-1 !text-xs sm:!text-sm !font-semibold !text-gray-900">SAP Gold</p>
                  <p className="!text-gray-500 !text-xs sm:!text-sm">Partner</p>
                </div>
                <div className="!text-center !bg-white !p-3 sm:!p-4 !rounded-2xl !shadow-sm cursor-pointer transition-shadow duration-300 hover:shadow-xl">
                  <div className="!w-12 sm:!w-16 !h-12 sm:!h-16 !mx-auto !mb-3 sm:!mb-4 !bg-green-100 !rounded-2xl !flex !items-center !justify-center">
                    <FiGlobe className="!w-6 sm:!w-8 !h-6 sm:!h-8 !text-green-600" />
                  </div>
                  <p className="!text-xs sm:!text-sm !mb-1 !font-semibold !text-gray-900">East Africa</p>
                  <p className="!text-gray-500 !text-xs sm:!text-sm">Leader</p>
                </div>
                <div className="!text-center !bg-white !p-3 sm:!p-4 !rounded-2xl !shadow-sm cursor-pointer transition-shadow duration-300 hover:shadow-xl">
                  <div className="!w-12 sm:!w-16 !h-12 sm:!h-16 !mx-auto !mb-3 sm:!mb-4 !bg-blue-100 !rounded-2xl !flex !items-center !justify-center">
                    <HiBriefcase className="!w-6 sm:!w-8 !h-6 sm:!h-8 !text-[#2f3985]" />
                  </div>
                  <p className="!mb-1 !text-xs sm:!text-sm !font-semibold !text-gray-900">400+ Successful</p>
                  <p className="!text-gray-500 !text-xs sm:!text-sm">Projects</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div
            ref={rightSectionRef}
            className="!relative flex !justify-start sm:!justify-center lg:!justify-center !items-center !h-[400px] sm:!h-[500px] lg:!h-[600px] !w-full"
          >
            {/* Circle & Image */}
            <div ref={circleRef} className="!relative cursor-pointer">
              <div className="!w-[280px] sm:!w-[300px] lg:!w-[400px] !h-[280px] sm:!h-[300px] lg:!h-[400px] !rounded-full !relative">
                <div className="!absolute !ml-[5%] !bg-[#2f3985] !mt-[5%] !inset-0 !w-[95%] !h-[95%] !object-cover !z-10 !rounded-full">
                  <img
                    src={images}
                    alt="Analytics Dashboard"
                    className="!absolute !inset-0 !w-full !h-full !object-cover !opacity-90 !z-10 !rounded-full transition-opacity duration-300 hover:!opacity-100"
                  />
                </div>
                <div className="!absolute !w-[95%] !h-[95%] !border-2 !border-[#4e62fc] !rounded-full !z-0"></div>
              </div>
            </div>

            {/* 15+ Years Experience */}
            <div
              ref={cardRefs.exp}
              className="!absolute !top-7  sm:!top-8 lg:!top-20 !left-0 lg:!left-0 !bg-white !rounded-2xl lg:!rounded-3xl !shadow-lg !p-2 sm:!p-3 lg:!p-4 !min-w-[120px] sm:!min-w-[150px] lg:!min-w-[180px] !z-10 cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
            >
              <div className="!flex !items-center !space-x-2 sm:!space-x-3">
                <div className="!w-8 sm:!w-12 lg:!w-14 !h-8 sm:!h-12 lg:!h-14 !bg-[#2f3985] !rounded-lg !flex !items-center !justify-center">
                  <HiBriefcase className="!w-4 sm:!w-6 lg:!w-10 !h-4 sm:!h-6 lg:!h-10 !text-white" />
                </div>
                <div>
                  <p className="!text-lg sm:!text-xl lg:!text-2xl !font-bold !text-center !text-gray-900">15+</p>
                  <p className="!text-xs sm:!text-xs lg:!text-sm !text-gray-500 !mt-1">Years Experience</p>
                </div>
              </div>
            </div>

            {/* 99% Client Satisfaction */}
            <div
              ref={cardRefs.sat}
              className="!absolute !top-2 sm:!top-2 lg:!top-0 !right-10 sm:!right-16 lg:!right-36 !bg-white !rounded-2xl lg:!rounded-3xl !shadow-lg !p-2 sm:!p-3 lg:!p-4 !min-w-[100px] sm:!min-w-[110px] lg:!min-w-[120px] !z-10 cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
            >
              <div className="!text-center">
                <div className="!w-10 sm:!w-12 lg:!w-14 !h-10 sm:!h-12 lg:!h-14 !mx-auto !bg-[#2f3985] !rounded-full !flex !items-center !justify-center !mb-2 sm:!mb-3 !relative">
                  <div className="!absolute !inset-2 sm:!inset-3 lg:!inset-4 !bg-white !rounded-full"></div>
                  <div className="!absolute !h-3 sm:!h-4 lg:!h-5 !w-0.5 sm:!w-1 !left-[50%] !bottom-0 !bg-white"></div>
                </div>
                <span className="!text-black !text-lg sm:!text-xl lg:!text-2xl !font-bold !relative !z-10">99%</span>
                <p className="!text-xs sm:!text-xs lg:!text-sm !text-gray-500 !leading-4 sm:!leading-5">
                  Client <br /> Satisfaction
                </p>
              </div>
            </div>

            {/* 50+ Enterprise Clients */}
            <div
              ref={cardRefs.clients}
              className="!absolute !bottom-9 sm:!bottom-[-1rem] lg:!bottom-12 !right-[59%] sm:!right-2 lg:!right-9 !bg-white !rounded-2xl lg:!rounded-3xl !shadow-lg !p-2 sm:!p-3 lg:!p-3 !min-w-[120px] sm:!min-w-[150px] lg:!min-w-[180px] !z-10 cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
            >
              <div className="!flex !items-center !space-x-2 sm:!space-x-3">
                <div className="!min-w-[70px]  sm:!min-w-[80px] lg:!min-w-[100px] !text-left">
                  <p className="!text-lg sm:!text-xl lg:!text-2xl !font-bold !text-gray-900">50+</p>
                  <p className="!text-xs sm:!text-xs lg:!text-sm !text-gray-500 !leading-3 sm:!leading-5">
                    Enterprise <br /> Clients
                  </p>
                </div>
                <div className="!w-8 sm:!w-12 lg:!w-14 !h-8 sm:!h-12 lg:!h-14 !bg-[#2f3985] !rounded-lg !flex !items-center !justify-center">
                  <HiUsers className="!w-4 sm:!w-6 lg:!w-10 !h-4 sm:!h-6 lg:!h-10 !text-white" />
                </div>
              </div>
            </div>

            {/* 100+ Projects Delivered */}
            <div
              ref={cardRefs.projects}
              className="!absolute !bottom-12 sm:!bottom-40 lg:!bottom-48 !right-0 sm:!right-0 lg:!right-0 !rounded-full !bg-blue-600 !shadow-lg !py-3 sm:!py-4 lg:!py-5 !min-w-[100px] sm:!min-w-[115px] lg:!min-w-[125px] !text-white !z-10 cursor-pointer transition-all duration-300 hover:!bg-blue-700 hover:shadow-2xl"
            >
              <div className="!text-center">
                <p className="!text-lg sm:!text-xl lg:!text-2xl !text-white !font-bold">400+</p>
                <span className="!text-xs sm:!text-sm lg:!text-base !text-white !opacity-90 !leading-3">
                  Projects <br />
                  Delivered{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoubleClickHero
