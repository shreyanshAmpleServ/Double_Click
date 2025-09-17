import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { crousalServiceFn } from "Services/Home"
import CustomButton from "Shared/CustomButton"
import React, { useState, useRef, useEffect } from "react"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import Slider from "react-slick"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Enhanced Custom Arrow Components with animations
const NextArrow = ({ onClick }) => {
  const arrowRef = useRef(null)

  useEffect(() => {
    if (arrowRef.current) {
      arrowRef.current.addEventListener("mouseenter", () => {
        gsap.to(arrowRef.current, {
          scale: 1.1,
          x: 5,
          duration: 0.3,
          ease: "power2.out",
        })
      })

      arrowRef.current.addEventListener("mouseleave", () => {
        gsap.to(arrowRef.current, {
          scale: 1,
          x: 0,
          duration: 0.3,
          ease: "power2.out",
        })
      })
    }
  }, [])

  return (
    <div
      ref={arrowRef}
      className="absolute top-1/2 right-2 lg:right-5 transform -translate-y-1/2 p-1 lg:p-2 pb-2 lg:pb-4 text-black bg-white text-3xl z-10 cursor-pointer rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      onClick={onClick}
    >
      <ArrowForwardIosIcon className="!text-lg lg:!text-2xl !font-thin" />
    </div>
  )
}

const PrevArrow = ({ onClick }) => {
  const arrowRef = useRef(null)

  useEffect(() => {
    if (arrowRef.current) {
      arrowRef.current.addEventListener("mouseenter", () => {
        gsap.to(arrowRef.current, {
          scale: 1.1,
          x: -5,
          duration: 0.3,
          ease: "power2.out",
        })
      })

      arrowRef.current.addEventListener("mouseleave", () => {
        gsap.to(arrowRef.current, {
          scale: 1,
          x: 0,
          duration: 0.3,
          ease: "power2.out",
        })
      })
    }
  }, [])

  return (
    <div
      ref={arrowRef}
      className="absolute top-1/2 left-2 lg:left-5 transform -translate-y-1/2 p-1 lg:p-2 pb-2 lg:pb-4 text-black bg-white text-3xl z-10 cursor-pointer rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      onClick={onClick}
    >
      <ArrowBackIosNewIcon className="!text-lg lg:!text-2xl !font-thin" />
    </div>
  )
}

function Sliders() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const baseURL = process.env.REACT_APP_API_URL
  const sliderRef = useRef(null)
  const containerRef = useRef(null)
  const contentRefs = useRef([])

  const { data: carouselData, isLoading, refetch } = useQuery(["carousel"], () => crousalServiceFn())

  // Animate slide content
  const animateSlideContent = (index) => {
    const content = contentRefs.current[index]
    if (!content) return

    const title = content.querySelector(".slide-title")
    const subtitle = content.querySelector(".slide-subtitle")
    const description = content.querySelector(".slide-description")
    const button = content.querySelector(".slide-button")

    // Reset all elements
    gsap.set([title, subtitle, description, button], {
      opacity: 0,
      y: 30,
      scale: 0.9,
    })

    // Animate in sequence
    const tl = gsap.timeline()

    if (title) {
      tl.to(title, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      })
    }

    if (subtitle) {
      tl.to(
        subtitle,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.5"
      )
    }

    if (description) {
      tl.to(
        description,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      )
    }

    if (button) {
      tl.to(
        button,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      )
    }
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    centerMode: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: (index) => {
      setCurrentSlide(index)
      // Animate content after slide change
      setTimeout(() => animateSlideContent(index), 200)
    },
    beforeChange: (oldIndex, newIndex) => {
      // Fade out current content
      const content = contentRefs.current[oldIndex]
      if (content) {
        gsap.to(content.querySelectorAll(".slide-title, .slide-subtitle, .slide-description, .slide-button"), {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power2.in",
        })
      }
    },
  }

  // Main container animation
  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        // Set initial state - FIXED: Reduced blur
        gsap.set(containerRef.current, {
          opacity: 0,
          scale: 0.98, // FIXED: Less dramatic scale
          filter: "blur(2px)", // FIXED: Much less blur (was 5px)
        })

        // Animate container entrance
        gsap.to(containerRef.current, {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.8, // FIXED: Faster duration
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 95%", // FIXED: Start earlier
            toggleActions: "play none none none",
            once: true,
          },
        })
      }, containerRef.current)

      return () => ctx.revert()
    }
  }, [])

  // FIXED: Start text animation immediately when data loads
  useEffect(() => {
    if (carouselData && !isLoading) {
      // Start text animation immediately, no wait
      setTimeout(() => {
        animateSlideContent(0)
      }, 100) // FIXED: Much shorter delay (was 1200ms)
    }
  }, [carouselData, isLoading])

  // Add floating animation to arrows
  useEffect(() => {
    const arrows = document.querySelectorAll(".slick-arrow")

    gsap.to(arrows, {
      y: -3,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.2,
    })
  }, [carouselData])

  return (
    <div
      ref={containerRef}
      style={{ fontFamily: "Open Sans" }}
      className="slider-container !z-auto h-[40vh] lg:h-[29rem] w-full overflow-hidden relative rounded-lg shadow-2xl"
    >
      <Slider ref={sliderRef} {...settings}>
        {carouselData?.data?.data?.map((item, i) => (
          <div key={i} className="relative !z-auto group">
            {/* FIXED: Enhanced image with less blur */}
            <div className="relative overflow-hidden h-[40vh] lg:h-[29rem]">
              <img
                decoding="async"
                src={baseURL + item?.image.url}
                alt=""
                className={`h-full !z-auto w-full object-cover transition-all duration-[4000ms] ease-out ${
                  currentSlide === i ? "scale-110" : "scale-100"
                } group-hover:scale-105`}
                style={{
                  filter: currentSlide === i ? "brightness(0.8)" : "brightness(0.7)", // FIXED: Less dramatic difference
                }}
              />

              {/* FIXED: Reduced gradient overlay opacity */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/20 opacity-0 transition-opacity duration-1000" // FIXED: Reduced opacity
                style={{
                  opacity: currentSlide === i ? 0.8 : 0.6, // FIXED: Less dramatic difference
                }}
              />
            </div>

            {/* Enhanced content overlay with animations */}
            <div
              ref={(el) => (contentRefs.current[i] = el)}
              className="absolute !z-20 pt-[4%] lg:pt-[4rem] top-0 left-0 lg:px-[10rem] px-[8.5%] h-full w-[100%] text-center text-white flex flex-col justify-start"
            >
              {/* FIXED: Reduced background blur */}
              <div className="absolute inset-0 backdrop-blur-[1px] bg-black/10 rounded-lg" />{" "}
              {/* FIXED: Much less blur */}
              {/* Content */}
              <div className="relative z-10">
                <div className="slide-title whitespace-nowrap text-2xl lg:text-5xl !capitalize !leading-8 lg:!leading-none font-bold mb-2 lg:mb-4 drop-shadow-lg">
                  <div dangerouslySetInnerHTML={{ __html: item?.title }} />
                </div>

                <div className="slide-subtitle text-base lg:text-xl !leading-4 lg:!leading-6 family-open-sans mt-1 lg:mt-2 pb-2 lg:mb-3 font-medium drop-shadow-md">
                  <div dangerouslySetInnerHTML={{ __html: item?.subtitle }} />
                </div>

                <div className="slide-description family-open-sans leading-3 !text-white lg:leading-5 text-[11px] lg:text-base mb-4 lg:mb-8 drop-shadow-md max-w-4xl mx-auto">
                  <div dangerouslySetInnerHTML={{ __html: item?.description }} />
                </div>

                {item?.action && (
                  <div className="slide-button">
                    <CustomButton className="bg-primary hover:bg-primary-dark !rounded-full !py-1.5 lg:!py-2 !px-6 lg:!px-8 !mt-3 lg:!mt-7 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                      <Link
                        to={item?.action?.link}
                        target="_blank"
                        className="family-open-sans text-sm lg:text-lg flex items-center"
                      >
                        {item?.action?.name}
                        <ArrowForwardIosIcon className="!text-xs lg:!text-base !ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </CustomButton>
                  </div>
                )}
              </div>
              {/* Animated decorative elements */}
              <div className="absolute top-10 right-10 w-20 h-20 border-2 border-white/30 rounded-full animate-pulse hidden lg:block" />
              <div className="absolute bottom-10 left-10 w-16 h-16 border-2 border-white/20 rounded-full animate-pulse delay-500 hidden lg:block" />
            </div>
          </div>
        ))}
      </Slider>

      {/* Custom slide indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {carouselData?.data?.data?.map((_, index) => (
          <button
            key={index}
            onClick={() => sliderRef.current?.slickGoTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-white scale-125 shadow-lg" : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20 z-30">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{
            width: `${((currentSlide + 1) / (carouselData?.data?.data?.length || 1)) * 100}%`,
          }}
        />
      </div>
    </div>
  )
}

export default Sliders

// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
// import { crousalServiceFn } from "Services/Home"
// import CustomButton from "Shared/CustomButton"
// import React, { useState } from "react"
// import { useQuery } from "react-query"
// import { Link } from "react-router-dom"
// import Slider from "react-slick"

// // Custom Arrow Components
// const NextArrow = ({ onClick }) => {
//   return (
//     <div
//       className="absolute top-1/2 right-2 lg:right-5 transform -translate-y-1/2 p-1 lg:p-2 pb-2 lg:pb-4 text-black  bg-white text-3xl z-10 cursor-pointer  "
//       onClick={onClick}
//     >
//       <ArrowForwardIosIcon className="!text-lg lg:!text-2xl !font-thin" />
//     </div>
//   )
// }

// const PrevArrow = ({ onClick }) => {
//   return (
//     <div
//       className="absolute top-1/2 left-2 lg:left-5 transform -translate-y-1/2 p-1 lg:p-2 pb-2 lg:pb-4 text-black  bg-white text-3xl z-10 cursor-pointer  opacity-100 group-hover:opacity-0 transition-all duration-300"
//       onClick={onClick}
//     >
//       <ArrowBackIosNewIcon className="!text-lg lg:!text-2xl !font-thin" />
//     </div>
//   )
// }

// function Sliders() {
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const baseURL = process.env.REACT_APP_API_URL
//   const sliderRef = React.useRef(null)
//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     arrows: true,
//     centerMode: false,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     afterChange: (index) => setCurrentSlide(index),
//     // beforeChange: (oldIndex, newIndex) => {
//     //     const images = document.querySelectorAll(".zoom-slide");
//     //     images.forEach((img, index) => {
//     //       if (index === newIndex) {
//     //         img.classList.add("zoom-out");
//     //       } else {
//     //         img.classList.remove("zoom-out");
//     //       }
//     //     });
//     //   }
//   }
//   const { data: carouselData, isLoading, refetch } = useQuery(["carousel"], () => crousalServiceFn())

//   return (
//     <div
//       style={{ fontFamily: "Open Sans" }}
//       className="slider-container !z-auto h-[40vh] lg:h-[33rem] w-full overflow-hidden"
//     >
//       <Slider {...settings}>
//         {carouselData?.data?.data?.map((item, i) => (
//           <div className=" relative  !z-auto">
//             <img
//               decoding="async"
//               src={baseURL + item?.image.url}
//               alt=""
//               className={`h-[40vh] !z-auto lg:h-[33rem] !bg-opacity-80 w-full object-cover  transition-transform duration-[3000ms] ease-in-out ${
//                 currentSlide === i ? "scale-125" : "scale-100"
//               }`}
//             />
//             <div className="absolute !z-auto pt-[4%] lg:pt-[4rem] top-0 left-0  lg:px-[10rem] px-[8.5%] h-full  bg-black  bg-opacity-50 w-[100%]   text-center  text-white">
//               <div className="text-2xl lg:text-5xl !capitalize !leading-8 lg:!leading-none  font-bold">
//                 <div dangerouslySetInnerHTML={{ __html: item?.title }} />
//               </div>
//               {/* <div className="text-2xl lg:text-5xl !capitalize !leading-8 lg:!leading-none  font-bold">
//                 {item?.title}
//               </div> */}
//               <div className="text-base lg:text-xl !leading-4 lg:!leading-6 family-open-sans mt-1 lg:mt-2 pb-2 lg:mb-3 font-medium">
//                 <div dangerouslySetInnerHTML={{ __html: item?.subtitle }} />
//               </div>
//               {/* <div className="text-base lg:text-xl !leading-4 lg:!leading-6 family-open-sans mt-1 lg:mt-2 pb-2 lg:mb-3 font-medium">
//                 {item?.subtitle}
//               </div> */}
//               <div className="family-open-sans leading-3 !text-white  lg:leading-5 text-[11px] lg:text-base">
//                 <div dangerouslySetInnerHTML={{ __html: item?.description }} />
//               </div>
//               {/* <div className="family-open-sans leading-3 lg:leading-5 text-[11px] lg:text-base">
//                 {item?.description}
//               </div> */}
//               {item?.action && (
//                 <CustomButton className="bg-primary !rounded-full !py-1.5 lg:!py-2 !mt-3 lg:!mt-7">
//                   <Link to={item?.action?.link} target="_blank" className=" family-open-sans text-sm lg:text-lg">
//                     {item?.action?.name}
//                   </Link>{" "}
//                   <ArrowForwardIosIcon className="!text-xs lg:!text-base !ml-2" />
//                 </CustomButton>
//               )}
//             </div>
//           </div>
//         ))}
//         {/* <div  className="relative">
//         <img  decoding="async"  src={slider2}  alt="" className={`h-[23rem] w-full object-cover  transition-transform duration-[3000ms] ease-in-out  ${
//                 currentSlide === 1 ? "scale-125" : "scale-100"
//               }`} />
//                <div className="absolute  top-[8%] left-[7%]  w-[50%]   text-white">
//             <div className="text-4xl lg:text-7xl  font-bold">Ready For Any <br/>Obstacle</div>
//             <div className="text-3xl family-open-sans mt-3 mb-7 font-medium">From Pickup to Destination</div>
//             <div className="text-base lg:text-xl mt-2 lg:mt-4 leading-5 lg:leading-8 font-medium lg:font-semibold">Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin,<br /> lorem quis bibendum auctor, nisi elit consequat ipsum, nec <br />sagittis sem nibh id elit.</div>
//             <CustomButton className="bg-black1 !rounded-none !py-2 !px-12 !mt-7" ><span className=" family-open-sans text-base lg:text-lg">Read More</span> </CustomButton>
//         </div>

//         </div>
//         <div>
//          <img decoding="async" src={slider3} className={`zoom-slide h-[23rem] !bg-opacity-80 w-full object-cover  transition-transform duration-[3000ms] ease-in-out  ${
//                 currentSlide === 2 ? "scale-125" : "scale-100"
//               }`}  alt=""  />

//         </div> */}
//       </Slider>
//     </div>
//   )
// }

// export default Sliders
