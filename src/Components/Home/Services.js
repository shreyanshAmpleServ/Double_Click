import { TbTruckDelivery } from "react-icons/tb"
import { ImAirplane } from "react-icons/im"
import { FaCaretRight } from "react-icons/fa"
import { FaShip } from "react-icons/fa"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"
import { useQuery } from "react-query"
import { coreServiceFn } from "Services/Home"

gsap.registerPlugin(ScrollTrigger)

const Services = () => {
  const baseURL = process.env.REACT_APP_API_URL
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Function to set initial states for all animated elements
      const setInitialStates = () => {
        gsap.set(sectionRef.current, { backgroundColor: "rgba(241, 241, 241, 0)" })
        gsap.set(titleRef.current, { y: -60, opacity: 0, scale: 0.7 })
        gsap.set(subtitleRef.current, { y: 40, opacity: 0 })
        gsap.set(".service-card", { y: 120, opacity: 0, scale: 0.6, rotationY: 20 })
        gsap.set(".service-image", { scale: 1.4, y: 60, opacity: 0.7 })
        gsap.set(".card-content", { y: 40, opacity: 0 })
        gsap.set(".read-more-btn", { x: -30, opacity: 0 })
      }

      // Function to create and play the animation
      const playAnimation = () => {
        const tl = gsap.timeline()

        // Animate section background slowly
        tl.to(sectionRef.current, {
          backgroundColor: "rgba(241, 241, 241, 1)",
          duration: 0.1,
          ease: "power1.out",
        })

          // Animate title with slow, smooth entrance
          .to(
            titleRef.current,
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1.5,
              ease: "power2.out",
            },
            "-=1.5"
          ) // Start 1.5s before previous animation ends

          // Animate subtitle slowly
          .to(
            subtitleRef.current,
            {
              y: 0,
              opacity: 1,
              duration: 1.6,
              ease: "power2.out",
            },
            "-=1.2"
          )

          // Animate service cards with slow stagger
          .to(
            ".service-card",
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotationY: 0,
              duration: 2,
              stagger: {
                amount: 1.5, // Slower stagger over 1.5 seconds
                from: "start",
                ease: "power1.out",
              },
              ease: "power2.out",
            },
            "-=1.8"
          )

          // Animate images slowly with smooth scaling
          .to(
            ".service-image",
            {
              scale: 1,
              y: 0,
              opacity: 1,
              duration: 2.2,
              stagger: 0.2,
              ease: "power1.out",
            },
            "-=1.8"
          )
          // Animate card content with slow, smooth entrance
          .to(
            ".card-content",
            {
              y: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.15,
              ease: "power1.out",
            },
            "-=3.5"
          )

          // Animate "Read More" buttons slowly
          .to(
            ".read-more-btn",
            {
              x: 0,
              opacity: 1,
              duration: 1.2,
              stagger: 0.1,
              ease: "power1.out",
            },
            "-=1"
          )

        return tl
      }

      // Set initial states on component mount
      setInitialStates()

      // Create ScrollTrigger that retriggers from both directions
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 85%", // Triggers when section is 85% into viewport
        end: "bottom 15%", // End point for the trigger area
        onEnter: () => {
          // Reset states and play animation when scrolling down
          setInitialStates()
          playAnimation()
        },
        onEnterBack: () => {
          // Reset states and play animation when scrolling back up
          setInitialStates()
          playAnimation()
        },
        onLeave: () => {
          // Optional: Reset to initial state when leaving viewport
          setInitialStates()
        },
        onLeaveBack: () => {
          // Optional: Reset to initial state when leaving viewport upwards
          setInitialStates()
        },
      })
    }, sectionRef.current)

    return () => ctx.revert()
  }, [])

  const { data: serviceData, isLoading, refetch } = useQuery(["core-service"], () => coreServiceFn())

  return (
    <>
      <div ref={sectionRef} className="bg-[#f1f1f1] p-[6%] !pt-[3%] !pb-[4%] px-[4%] lg:px-[10%] overflow-hidden">
        <div className="text-center pb-1">
          <div ref={titleRef} className="text-base font-semibold text-black">
            WHAT WE OFFER
          </div>
          <div ref={subtitleRef} className="text-3xl lg:text-4xl font-semibold text-primary">
            Our Core Services
          </div>
        </div>

        <div
          ref={gridRef}
          className="box grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 text-center gap-5 lg:p-8 lg:pb-1"
        >
          {serviceData?.data?.data?.[0]?.details?.map((item, i) => (
            <div key={i} className="service-card">
              <div className="overflow-hidden shadow-lg">
                <img
                  src={baseURL + item?.icon.url}
                  alt=""
                  className="service-image w-full !h-48 object-cover shadow-lg transition-transform duration-300 hover:scale-110"
                />
              </div>

              <div className="card-content box-item group h-[43%] bg-white mt-[-1.2rem] bg-opacity-90 backdrop-blur-sm mx-3 relative px-2 py-5 flex flex-col items-center gap-1 text-black shadow-md hover:shadow-2xl hover:-translate-y-4 transition-all duration-300">
                <div className="!text-xs !leading-4 !mb-0 font-semibold transform transition-transform duration-300 group-hover:scale-105">
                  {item?.title}
                </div>

                <div
                  style={{ fontSize: "10px" }}
                  className="text-xs font-extralight !leading-3 text-gray-900 transition-colors duration-300 group-hover:text-gray-700"
                >
                  {item?.description}
                </div>

                <div className="read-more-btn text-lg font-semibold flex items-center mt-auto text-black transition-all duration-300 group-hover:text-red-600">
                  <FaCaretRight className="!text-red-600 transition-transform duration-300 group-hover:translate-x-1" />
                  <span className="text-gray-800 font-semibold text-xs transition-colors duration-300 group-hover:text-red-600">
                    Read More
                  </span>
                </div>

                <div className="absolute bottom-0 left-1/2 w-0 h-1 bg-primary-red transition-all duration-500 group-hover:left-0 group-hover:w-full"></div>
              </div>
            </div>
          ))}
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  )
}

export default Services

// import { TbTruckDelivery } from "react-icons/tb"
// import { ImAirplane } from "react-icons/im"
// import { FaCaretRight } from "react-icons/fa"
// import { FaShip } from "react-icons/fa"
// import { gsap } from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"
// import { useEffect } from "react"
// import { useQuery } from "react-query"
// import { coreServiceFn } from "Services/Home"

// gsap.registerPlugin(ScrollTrigger)

// const Services = () => {
//   const baseURL = process.env.REACT_APP_API_URL
//   useEffect(() => {
//     gsap.from(".box", {
//       y: 300,
//       opacity: 0,
//       duration: 1,
//       stagger: 0.2,
//       ease: "power3.out",
//       scrollTrigger: {
//         trigger: ".box",
//         // start: 'top 100%',
//         toggleActions: "play none none none",
//       },
//     })
//   }, [])

//   const { data: serviceData, isLoading, refetch } = useQuery(["core-service"], () => coreServiceFn())
//   return (
//     <>
//       <div className="bg-[#f1f1f1] p-[6%] !pt-[3%] !pb-[4%] px-[4%] lg:px-[10%]">
//         <div className="text-center pb-1 ">
//           <div className="text-base font-semibold text-black">WHAT WE OFFER</div>
//           <div className="text-3xl lg:text-4xl font-semibold text-primary">Our Core Services</div>
//         </div>
//         <div className="box grid   lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  text-center gap-5 lg:p-8 lg:pb-1">
//           {serviceData?.data?.data?.[0]?.details?.map((item, i) => (
//             <div>
//               <img
//                 src={
//                   i % 2 == 0
//                     ? "	https://strapi.dcctz.com/dcc-website/uploads/Clearing_and_Forwarding_3_f8e507bd37.jpg"
//                     : "	https://strapi.dcctz.com/dcc-website/uploads/Blog_Fleet_9f5ea3525f.jpg"
//                 }
//                 alt=""
//                 className="w-full !h-48 object-cover    shadow-lg"
//               />
//               <div className="box-item group h-[43%] bg-white mt-[-1.2rem] bg-opacity-80 mx-3 relative px-2 py-5 flex flex-col items-center gap-1 text-black shadow-md hover:shadow-2xl  hover:-translate-y-4    transition-all duration-300">
//                 {/* <div>
//                   {item?.title == "GROUND DELIVERY" && (
//                     <TbTruckDelivery className="!text-5xl text-primary2 transform scale-x-[-1]" />
//                   )}
//                   {item?.title == "AIR DELIVERY" && (
//                     <ImAirplane className="!text-3xl mb-4 text-primary2 transform scale-x-[-1] " />
//                   )}
//                   {item?.icon?.url && <img src={baseURL + item?.icon?.url} alt="" className="!w-16 !h-16 mb-4" />}
//                   {item?.title == "SEA DELIVERY" && <FaShip className="!text-4xl mb-4 text-primary2 " />}
//                 </div> */}
//                 <div className="!text-xs !leading-4 !mb-0 font-semibold">{item?.title}</div>
//                 <div style={{ fontSize: "10px" }} className="text-xs font-extralight !leading-3 text-gray-900">
//                   {item?.description}
//                 </div>
//                 <div className="text-lg font-semibold flex items-center mt-auto  text-black  ">
//                   <FaCaretRight className="!text-red-600" />
//                   <span className="text-gray-800 font-semibold text-xs">Read More</span>
//                 </div>
//                 <div className="absolute bottom-0 left-1/2 w-0 h-1 bg-primary-red transition-all duration-500 group-hover:left-0 group-hover:w-full"></div>
//               </div>
//             </div>
//           ))}
//           {/* <div className="box-item group relative bg-white px-4 py-10 flex flex-col items-center gap-3 text-black shadow-md hover:shadow-2xl  hover:-translate-y-4    transition-all  duration-300">
//                 <ImAirplane className="!text-3xl mb-4 text-primary2 transform scale-x-[-1] " />
//                 <div className="text-xl">AIR DELIVERY</div>
//                 <div className="text-base font-thin leading-6 text-gray-500">Logistics Should Brace for Changes in Cargo Sed ut perspiciatis, unde omnis...</div>
//                 <div className="absolute bottom-0 left-1/2 w-0 h-1 bg-primary-red transition-all duration-500 group-hover:left-0 group-hover:w-full"></div>

//             </div>
//             <div className="box-item group relative bg-white px-4 py-10 flex flex-col items-center gap-3 text-black shadow-md hover:shadow-2xl  hover:-translate-y-4    transition-all  duration-300">
//                 <FaShip className="!text-4xl mb-4 text-primary2 " />
//                 <div className="text-xl">SEA DELIVERY</div>
//                 <div className="text-base font-thin leading-6 text-gray-500">Logistics Should Brace for Changes in Cargo Sed ut perspiciatis, unde omnis...</div>
//                 <div className="absolute bottom-0 left-1/2 w-0 h-1 bg-primary-red transition-all duration-500 group-hover:left-0 group-hover:w-full"></div>

//             </div> */}
//           <div></div>
//           <div></div>
//         </div>
//       </div>
//     </>
//   )
// }
// export default Services
