import React, { useEffect, useRef, useState } from "react"
import CustomButton from "Shared/CustomButton"
import bg2 from "../../Assests/Content/bg_6.jpg"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import RequestQuoteModal from "Pages/ReqQuote"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import air from "../../Assests/Air_Sea_Land.jpg"

gsap.registerPlugin(ScrollTrigger)

const Connections = () => {
  const [isModal, setIsModal] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-in text
      gsap.from(".connections-text", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".connections-text",
          start: "top 90%",
        },
      })
      // Fade-in & scale button
      gsap.from(".connections-button", {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".connections-button",
          start: "top 95%",
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <div ref={containerRef} className="py-16">
        <div
          className="relative h-64 lg:h-56 overflow-hidden"
          style={{
            background: `url(${air || bg2}) center/cover no-repeat`,
          }}
        >
          {/* translucent overlay */}
          <div className=" bg-primary !opacity-60 absolute top-0 h-full w-full left-0 flex justify-center items-center "></div>

          <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center lg:justify-between px-6 lg:px-20 text-white">
            {/* Animated Text */}
            <div className="connections-text mb-6 lg:mb-0 text-lg lg:text-2xl font-semibold transition-colors duration-300 hover:text-blue-100 group">
              <span className="relative inline-block">
                Interested in working with Doubleclick?
                <span className="absolute left-0 -bottom-1 h-0.5 bg-blue-100 w-0 group-hover:w-full transition-all duration-300" />
              </span>
            </div>

            {/* Animated Button */}
            <CustomButton
              variant="outlined"
              className="
                connections-button
                group !relative !overflow-hidden !rounded-full !border-2 !border-white !px-8 !py-3 !font-bold !text-black
                transition-all !duration-300 ease-out
                hover:!bg-white hover:text-primary hover:!text-black hover:scale-105
              "
            >
              {/* sliding fill */}
              <span className="absolute inset-0 bg-white scale-x-0 origin-left transform transition-transform duration-300 ease-out group-hover:scale-x-100" />
              <a
                href="/contact"
                id="touch_id"
                className="relative z-10 !text-white hover:!text-black text-base flex items-center gap-2"
              >
                GET IN TOUCH
                <ArrowForwardIosIcon className="transform transition-transform duration-300 ease-out !h-5 group-hover:translate-x-1" />
              </a>
            </CustomButton>
          </div>
        </div>
      </div>
    </>
  )
}

export default Connections
