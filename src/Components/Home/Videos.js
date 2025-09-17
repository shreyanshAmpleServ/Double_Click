import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef, useState } from "react"
import { IoPlayOutline } from "react-icons/io5"
import { useQuery } from "react-query"
import { footerServiceFn } from "Services/Home"

gsap.registerPlugin(ScrollTrigger)

const VideoSection = () => {
  const baseURL = process.env.REACT_APP_API_URL
  const [footData, setFootData] = useState([])
  const modalRef = useRef(null)
  const [openModal, setOpenModal] = useState(false)
  const sectionRef = useRef(null)
  const videoContainerRef = useRef(null)
  const playButtonRef = useRef(null)
  const overlayRef = useRef(null)

  const { data: footerData, isLoading, refetch } = useQuery(["footerDetails"], () => footerServiceFn())

  const findData = (key) => {
    return footData?.filter((item) => item.key === key)?.[0]
  }

  useEffect(() => {
    if (footerData) {
      setFootData(footerData?.data?.data)
    }
  }, [footerData])

  useEffect(() => {
    if (!footData.length) return

    const ctx = gsap.context(() => {
      // Set initial states
      const setInitialStates = () => {
        gsap.set(videoContainerRef.current, {
          scale: 0.8,
          opacity: 0,
          y: 50,
          borderRadius: "50px",
        })
        gsap.set(playButtonRef.current, {
          scale: 0,
          rotation: -180,
          opacity: 0,
        })
        gsap.set(overlayRef.current, {
          opacity: 0.3,
        })
      }

      // Create entrance animation
      const createAnimation = () => {
        const tl = gsap.timeline()

        tl.to(videoContainerRef.current, {
          scale: 1,
          opacity: 1,
          y: 0,
          borderRadius: "16px",
          duration: 1.2,
          ease: "power2.out",
        })
          .to(
            overlayRef.current,
            {
              opacity: 0.6,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.8"
          )
          .to(
            playButtonRef.current,
            {
              scale: 1,
              rotation: 0,
              opacity: 1,
              duration: 1,
              ease: "elastic.out(1, 0.6)",
            },
            "-=0.5"
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

      // Enhanced hover animations for play button
      if (playButtonRef.current) {
        const playBtn = playButtonRef.current

        playBtn.addEventListener("mouseenter", () => {
          gsap.to(playBtn, {
            scale: 1.3,
            rotation: 10,
            duration: 0.4,
            ease: "power2.out",
          })

          gsap.to(overlayRef.current, {
            opacity: 0.8,
            duration: 0.4,
            ease: "power2.out",
          })

          // Add pulsing effect
          gsap.to(playBtn, {
            boxShadow: "0 0 0 20px rgba(255, 255, 255, 0.3), 0 0 0 40px rgba(255, 255, 255, 0.1)",
            duration: 0.6,
            ease: "power2.out",
          })
        })

        playBtn.addEventListener("mouseleave", () => {
          gsap.to(playBtn, {
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: "power2.out",
          })

          gsap.to(overlayRef.current, {
            opacity: 0.6,
            duration: 0.4,
            ease: "power2.out",
          })

          gsap.to(playBtn, {
            boxShadow: "0 0 0 0px rgba(255, 255, 255, 0)",
            duration: 0.4,
            ease: "power2.out",
          })
        })

        // Click animation
        playBtn.addEventListener("mousedown", () => {
          gsap.to(playBtn, {
            scale: 0.9,
            duration: 0.1,
            ease: "power2.out",
          })
        })

        playBtn.addEventListener("mouseup", () => {
          gsap.to(playBtn, {
            scale: 1.3,
            duration: 0.2,
            ease: "power2.out",
          })
        })
      }

      // Container hover effects
      if (videoContainerRef.current) {
        videoContainerRef.current.addEventListener("mouseenter", () => {
          gsap.to(videoContainerRef.current, {
            scale: 1.02,
            y: -5,
            duration: 0.5,
            ease: "power2.out",
          })
        })

        videoContainerRef.current.addEventListener("mouseleave", () => {
          gsap.to(videoContainerRef.current, {
            scale: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          })
        })
      }
    }, sectionRef.current)

    return () => ctx.revert()
  }, [footData])

  // Modal animations
  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden"

      // Animate modal entrance
      if (modalRef.current) {
        gsap.fromTo(
          modalRef.current,
          {
            opacity: 0,
            scale: 0.8,
            y: 50,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          }
        )
      }
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [openModal])

  const videoUrl = baseURL + findData("home_page_video")?.singleMedia.url

  return (
    <>
      <div ref={sectionRef} className="lg:p-[10%] !py-[2%]">
        <div
          ref={videoContainerRef}
          className="relative mx-auto w-[80%] rounded-2xl lg:h-[28rem] h-[37vh] overflow-hidden cursor-pointer shadow-2xl hover:shadow-3xl transition-all duration-500"
          style={{
            backgroundImage: `url(${baseURL + findData("home_page_video")?.supportMedia.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Animated overlay */}
          <div
            ref={overlayRef}
            className="bg-black rounded-2xl absolute top-0 h-full w-full left-0 flex justify-center items-center transition-all duration-500"
          />

          {/* Play button with animations */}
          <div className="flex flex-col lg:flex-row text-white absolute top-[42%] left-[45%] lg:left-[45%] gap-4">
            <div ref={playButtonRef} className="relative cursor-pointer group" onClick={() => setOpenModal(true)}>
              <div className="relative z-10 flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/50 transition-all duration-300 group-hover:border-white/80">
                <IoPlayOutline className="!text-2xl lg:!text-4xl ml-1 text-white drop-shadow-lg" />
              </div>

              {/* Ripple effects */}
              <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-pulse" />
              <div
                className="absolute inset-0 rounded-full border border-white/20 animate-ping"
                style={{ animationDelay: "0.5s" }}
              />
            </div>
          </div>
        </div>

        {/* Enhanced Modal */}
        {openModal && (
          <div
            style={{ zIndex: 1000 }}
            className="fixed z-50 top-0 left-0 w-full h-full pt-[30%] lg:pt-[5%] bg-black/80 backdrop-blur-sm"
            onClick={() => setOpenModal(false)}
          >
            <div
              ref={modalRef}
              onClick={(e) => e.stopPropagation()}
              className="h-[35vh] relative lg:h-[90vh] w-[95vw] lg:w-[70%] rounded-lg m-auto overflow-hidden shadow-2xl"
            >
              {/* Close button */}
              <button
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
                onClick={() => setOpenModal(false)}
              >
                ×
              </button>

              <div className="w-full h-full">
                <video controls autoPlay className="w-full h-full object-cover rounded-lg">
                  <source src={videoUrl} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default VideoSection

// import { useEffect, useRef, useState } from "react"
// import { IoPlayOutline } from "react-icons/io5"
// import { useQuery } from "react-query"
// import { footerServiceFn } from "Services/Home"

// const VideoSection = () => {
//   const baseURL = process.env.REACT_APP_API_URL
//   const [footData, setFootData] = useState([])
//   const modalRef = useRef(null)
//   const [openModal, setOpenModal] = useState(false)

//   const { data: footerData, isLoading, refetch } = useQuery(["footerDetails"], () => footerServiceFn())
//   const findData = (key) => {
//     return footData?.filter((item) => item.key === key)?.[0]
//   }
//   useEffect(() => {
//     if (footerData) {
//       setFootData(footerData?.data?.data)
//     }
//   }, [footerData])

//   const videoUrl = baseURL + findData("home_page_video")?.singleMedia.url
//   useEffect(() => {
//     if (openModal) {
//       document.body.style.overflow = "hidden" // 🔒 Prevent scroll
//     } else {
//       document.body.style.overflow = "auto" // 🔓 Re-enable scroll
//     }

//     // Clean up on unmount
//     return () => {
//       document.body.style.overflow = "auto"
//     }
//   }, [openModal])
//   return (
//     <>
//       <div className=" lg:p-[10%] !py-[4%]">
//         <div
//           className="relative mx-auto w-[80%] rounded-2xl  lg:h-[28rem]  h-[37vh]"
//           style={{
//             backgroundImage: `url(${baseURL + findData("home_page_video")?.supportMedia.url})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat",
//           }}
//         >
//           <div className=" bg-black1 rounded-2xl !opacity-60 absolute top-0 h-full w-full left-0 flex justify-center items-center "></div>
//           <div className="flex flex-col lg:flex-row text-white absolute top-[42%] left-[45%] lg:left-[45%] gap-4 ">
//             <div class="zindex-fixed relativ" onClick={() => setOpenModal(true)}>
//               <a class="play-video">
//                 <IoPlayOutline className=" !text-4xl lg:!text-7xl " />
//               </a>
//             </div>
//           </div>
//         </div>
//         {openModal && (
//           <div
//             style={{ zIndex: 1000 }}
//             className="fixed  z-50 top-0 left-0 w-full h-full pt-[30%] lg:pt-[5%] bg-transparent"
//             onClick={() => setOpenModal(false)}
//           >
//             <div
//               onClick={(e) => e.stopPropagation()}
//               className="h-[35vh] relative lg:h-[90vh]  w-[95vw] lg:w-[70%]   rounded  m-auto"
//             >
//               {/* <div
//                 className="text-end absolute top-6 right-3  mr-[0%] text-white"
//                 onClick={(e) => {
//                   setOpenModal(false)
//                   e.stopPropagation()
//                 }}
//               >
//                 <Close />{" "}
//               </div> */}
//               <div>
//                 <video controls autoPlay className="w-100 h-[30vh] lg:h-[90vh] ">
//                   <source src={videoUrl} type="video/mp4" />
//                 </video>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   )
// }
// export default VideoSection
