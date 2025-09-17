import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Strategic Solutions Icon
const TargetIcon = ({ iconRef }) => (
  <svg ref={iconRef} className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
    <circle cx="12" cy="12" r="6" strokeWidth={1.5} />
    <circle cx="12" cy="12" r="2" strokeWidth={1.5} />
  </svg>
)

// End-to-End Execution Icon
const GearIcon = ({ iconRef }) => (
  <svg ref={iconRef} className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const UponSliderService = () => {
  const sectionRef = useRef(null)
  const mainCardRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const readMoreRef = useRef(null)
  const card1Ref = useRef(null)
  const card2Ref = useRef(null)
  const icon1Ref = useRef(null)
  const icon2Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(mainCardRef.current, { opacity: 0, scale: 0.8, filter: "blur(10px)" })
      gsap.set(titleRef.current, { opacity: 0, scale: 0.9 })
      gsap.set(descriptionRef.current, { opacity: 0, scale: 0.95 })
      gsap.set(readMoreRef.current, { opacity: 0, scale: 0.8 })
      gsap.set([card1Ref.current, card2Ref.current], { opacity: 0, scale: 0.7, filter: "blur(5px)" })
      gsap.set([icon1Ref.current, icon2Ref.current], { opacity: 0, scale: 0 })

      // Timeline on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      })

      tl.to(mainCardRef.current, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power2.out",
      })
        .to(titleRef.current, { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }, "-=0.8")
        .to(descriptionRef.current, { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }, "-=0.6")
        .to(
          [card1Ref.current, card2Ref.current],
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1,
            stagger: 0.2,
            ease: "back.out(1.3)",
          },
          "-=0.5"
        )
        .to(
          [icon1Ref.current, icon2Ref.current],
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            stagger: 0.1,
            ease: "back.out(1.5)",
          },
          "-=0.8"
        )
        .to(readMoreRef.current, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }, "-=0.4")

      // On enter, also animate one zoom pulse for icons
      tl.add(() => {
        gsap.fromTo(
          [icon1Ref.current, icon2Ref.current],
          { scale: 1 },
          { scale: 1.2, duration: 0.5, yoyo: true, repeat: 1, ease: "power1.inOut" }
        )
      }, "-=0.5")
      // Continuous rotation only for the gear icon
      gsap.to(icon2Ref.current, {
        rotation: 360,
        duration: 5, // one full rotation every 5 seconds
        ease: "none",
        repeat: -1, // infinite loop
      })
    }, sectionRef.current)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={sectionRef}
      className="hidden lg:flex w-[80vw] lg:w-[40rem] h-[13rem] min-w-[320px] bg-white max-w-screen-2xl mx-auto overflow-hidden flex items-center justify-center"
    >
      <div
        ref={mainCardRef}
        className="absolute -mt-[13rem] flex flex-col items-center justify-center w-[85vw] lg:w-[50rem] min-w-[320px] lg:max-w-[1100px] h-[19rem] shadow-xl bg-white gap-3 py-16 rounded-lg"
      >
        <div className="py-10 pt-3 px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-5 flex-col lg:flex-row justify-between">
              {/* Left Section */}
              <div className="lg:w-[45%]">
                <h1 ref={titleRef} className="text-xl md:text-2xl font-semibold text-gray-900 mb-2 leading-tight">
                  Driving Excellence, Delivering Impact
                </h1>
                <p ref={descriptionRef} className="text-xs text-gray-600 leading-relaxed mb-4 max-w-2xl">
                  We empower organizations to innovate, optimize, and grow. With industry expertise and cutting-edge
                  technology, we create solutions that transform challenges into opportunities for long-term success.
                </p>
                <div ref={readMoreRef} className="flex items-center">
                  <span className="text-orange-500 font-medium cursor-pointer hover:text-orange-600 transition-colors text-sm">
                    ▶ <span className="text-gray-800 font-semibold">Read More</span>
                  </span>
                </div>
              </div>
              {/* Right Section */}
              <div className="lg:w-[55%] flex gap-3">
                <div
                  ref={card1Ref}
                  className="bg-white w-1/2 h-full p-2 text-center flex flex-col items-center rounded-lg border border-gray-100 hover:border-orange-200 transition-all duration-300"
                >
                  <div>
                    <TargetIcon iconRef={icon1Ref} />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Strategic Solutions</h4>
                  <p className="text-gray-600 text-xs leading-relaxed mb-1">
                    Our team designs business strategies and digital frameworks that align with your goals, ensuring
                    sustainable growth and competitive advantage.
                  </p>
                </div>
                <div
                  ref={card2Ref}
                  className="bg-white w-1/2 h-full p-2 text-center flex flex-col items-center rounded-lg border border-gray-100 hover:border-orange-200 transition-all duration-300"
                >
                  <div>
                    <GearIcon iconRef={icon2Ref} />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">End-to-End Execution</h4>
                  <p className="text-gray-600 text-xs leading-relaxed mb-2">
                    From planning to implementation, we manage every detail with precision, ensuring seamless delivery,
                    measurable results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UponSliderService

// import React from "react"

// // Strategic Solutions Icon
// const TargetIcon = () => (
//   <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
//     <circle cx="12" cy="12" r="6" strokeWidth={1.5} />
//     <circle cx="12" cy="12" r="2" strokeWidth={1.5} />
//   </svg>
// )

// // End-to-End Execution Icon
// const GearIcon = () => (
//   <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={1.5}
//       d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
//     />
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//   </svg>
// )

// const UponSliderService = () => {
//   return (
//     <>
//       <div className="w-[40rem]  h-[13rem] min-w-[320px] !bg-white  max-w-screen-2xl mx-auto !overflow-hidden flex items-center justify-center">
//         <div className=" absolute mt-[-13rem] flex flex-col items-center justify-center w-[50rem] min-w-[320px] max-w-[1100px] h-[19rem] shadow-xl bg-white gap-3 py-16 ">
//           <div className="bg-white  py-10 pt-3 px-4 sm:px-6 lg:px-12">
//             <div className="max-w-7xl mx-auto">
//               <div className="flex gap-5 justify-between ">
//                 {/* Left Section - Main Hero Content */}
//                 <div className="lg:col-span-2 !w-[45%]">
//                   <h1 className="!text-xl md:!text-2xl lg:!text2xl !font-semibold text-gray-900 !mb-2 !leading-tight">
//                     Driving Excellence, Delivering Impact
//                   </h1>

//                   <p className="text-xs text-gray-600 leading-relaxed mb-4 max-w-2xl">
//                     We empower organizations to innovate, optimize, and grow. With industry expertise and cutting-edge
//                     technology, we create solutions that transform challenges into opportunities for long-term success.
//                   </p>

//                   <div className="flex items-center">
//                     <span className="text-orange-500 font-medium cursor-pointer hover:text-orange-600 transition-colors">
//                       ▶ <span className="text-gray-800 font-semibold text-sm">Read More</span>
//                     </span>
//                   </div>
//                 </div>

//                 {/* Right Section - Feature Cards */}
//                 <div className=" w-[55%] flex gap-3">
//                   {/* Strategic Solutions Card */}
//                   <div className="bg-white w-1/2 h-full p-2 text-center flex flex-col items-center rounded-lg   ">
//                     <div className="mb-0">
//                       <TargetIcon />
//                     </div>
//                     <h4 className=" font-semibold text-gray-900 !mb-2">Strategic Solutions</h4>
//                     <p style={{ fontSize: "10px" }} className="text-gray-600 text-xs !leading-relaxed mb-1">
//                       Our team designs business strategies and digital frameworks that align with your goals, ensuring
//                       sustainable growth and competitive advantage.
//                     </p>
//                     <div className="flex items-center">
//                       <span className="text-orange-500 font-medium cursor-pointer hover:text-orange-600 transition-colors text-sm">
//                         ▶ <span className="text-gray-800 font-semibold text-sm">Read More</span>
//                       </span>
//                     </div>
//                   </div>

//                   {/* End-to-End Execution Card */}
//                   <div className="bg-white p-2 w-1/2 h-full text-center flex flex-col items-center rounded-lg  ">
//                     <div className="mb-0">
//                       <GearIcon />
//                     </div>
//                     <h4 className=" font-semibold text-gray-900 !mb-1">End-to-End Execution</h4>
//                     <p style={{ fontSize: "10px" }} className="text-gray-600 !leading-relaxed mb-2">
//                       From planning to implementation, we manage every detail with precision, ensuring seamless
//                       delivery, measurable results.
//                     </p>
//                     <div className="flex items-center">
//                       <span className="text-orange-500 font-medium cursor-pointer hover:text-orange-600 transition-colors text-sm">
//                         ▶ <span className="text-gray-800 font-semibold text-sm">Read More</span>
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }
// export default UponSliderService
