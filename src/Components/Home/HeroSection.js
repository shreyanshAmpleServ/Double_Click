import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, Mail } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import aiva from "../../Assests/Aiva-Logo.png"
import arrow from "../../Assests/Arrow-logo.png"
import cloude from "../../Assests/Cloud-logo.png"
import aiImage from "../../Assests/Home-Page-Image.png"
import logo1 from "../../Assests/Logo-1.png"
import logo10 from "../../Assests/Logo-10.png"
import logo2 from "../../Assests/Logo-2.png"
import logo3 from "../../Assests/Logo-3.png"
import logo4 from "../../Assests/Logo-4.png"
import logo5 from "../../Assests/Logo-5.png"
import logo6 from "../../Assests/Logo-6.png"
import logo7 from "../../Assests/Logo-7.png"
import logo8 from "../../Assests/Logo-8.png"
import logo9 from "../../Assests/Logo-9.png"
import sap from "../../Assests/SAP.png"

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger)

const images = [
  { src: logo1, alt: "Logo 1" },
  { src: logo2, alt: "Logo 2" },
  { src: logo3, alt: "Logo 3" },
  { src: logo4, alt: "Logo 4" },
  { src: logo5, alt: "Logo 5" },
  { src: logo6, alt: "Logo 6" },
  { src: logo8, alt: "Logo 8" },
  { src: logo9, alt: "Logo 9" },
  { src: logo10, alt: "Logo 10" },
]

export default function DoubleClickWebsite() {
  const containerRef = useRef(null)
  const [isModal, setIsModal] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate main heading with stagger effect
      gsap.from(".heading-line", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".main-heading",
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      })

      // Animate description text
      gsap.from(".description", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".description",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })

      // Animate buttons
      gsap.from(".cta-button", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".cta-buttons",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })

      // Animate SAP logos
      gsap.from(".sap-logo", {
        opacity: 0,
        x: -30,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".sap-section",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })

      // Animate statistics
      gsap.from(".stat-item", {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })

      // Animate right image section
      gsap.from(".hero-image", {
        opacity: 0,
        x: 50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".hero-image",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })

      // Animate floating icons
      gsap.from(".floating-icon", {
        opacity: 0,
        scale: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 1,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: ".hero-image",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      })

      // Animate email icon
      gsap.from(".email-icon", {
        opacity: 0,
        scale: 0,
        rotation: 180,
        duration: 0.8,
        delay: 1.2,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: ".hero-image",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      })

      // Animate partner logos
      gsap.from(".partner-logo", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".partner-section",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })

      // Hover animations for buttons
      const buttons = gsap.utils.toArray(".cta-button")
      buttons.forEach((button) => {
        button.addEventListener("mouseenter", () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          })
        })

        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          })
        })
      })

      // Hover animations for floating icons
      const floatingIcons = gsap.utils.toArray(".floating-icon, .email-icon")
      floatingIcons.forEach((icon) => {
        icon.addEventListener("mouseenter", () => {
          gsap.to(icon, {
            scale: 1.25,
            // rotation: 5,
            duration: 0.3,
            ease: "power2.out",
          })
        })

        icon.addEventListener("mouseleave", () => {
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out",
          })
        })
      })

      // Hover animations for partner logos
      const partnerLogos = gsap.utils.toArray(".partner-logo")
      partnerLogos.forEach((logo) => {
        logo.addEventListener("mouseenter", () => {
          gsap.to(logo, {
            scale: 1.1,
            filter: "grayscale(0%)",
            duration: 0.3,
            ease: "power2.out",
          })
        })

        logo.addEventListener("mouseleave", () => {
          gsap.to(logo, {
            scale: 1,
            filter: "grayscale(100%)",
            duration: 0.3,
            ease: "power2.out",
          })
        })
      })

      // Continuous floating animation for floating icons
      gsap.to(".floating-icon", {
        y: -10,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.2,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="bg-white font-inter">
      {/* Main Content */}
      <div className="max-w-7xl px-4 lg:pl-[5rem] lg:pr-[3.4rem] mx-auto py-6">
        <div className="flex flex-col lg:flex-row  items-center gap-16">
          {/* Left Content */}
          <div className="">
            {/* Main Heading with proper font family */}
            <div className="main-heading text-5xl font-bold mb-4 leading-none font-inter">
              <div className="heading-line text-primary mb-0 font-inter">
                We <span className="italic font-inter">are</span>
              </div>
              <div className="heading-line text-slate-700 mt-[-20px] font-inter font-bold">Double Click</div>
              <div className="heading-line text-slate-700 mt-[-20px] font-inter font-bold">Consulting</div>
            </div>

            {/* Description with proper font family */}
            <p className="description text-gray-600 text-lg leading-6 mb-4 max-w-lg font-inter">
              Learn how we support your business with tailored solutions designed to optimize operations, enhance
              visibility, and drive efficiency across your business to deliver excellence. From advanced systems and
              real-time data insights to streamlined management and automation tools, we empower you to overcome
              challenges and scale with confidence.
            </p>
            {/* Hidden Image Section */}
            <div className="flex-1 lg:hidden relative">
              <div className="hero-image relative rounded-3xl p-8 full">
                {/* AI Circuit Pattern Overlay */}
                <div className="h-full rounded-3xl ">
                  <img src={aiImage} alt="AI Circuit Pattern" className="w-full h-full object-cover rounded-3xl" />
                </div>

                {/* Floating Icons */}
                <div className="floating-icon absolute bottom-24 mb-2 left-10">
                  <div className="relative group">
                    <a href="/dcc-cloud">
                      <img src={cloude} alt="Cloud Logo" className="w-8 h-8" />
                    </a>
                    <div className="absolute whitespace-nowrap left-1/2 transform -translate-x-1/2 bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10">
                      DCC Cloud
                    </div>
                  </div>
                </div>

                <div className="floating-icon absolute bottom-14 mb-3  left-10">
                  <div className="relative group">
                    <a href="/products-and-solutions/dcc-tracking-suite-ng">
                      <img
                        //   onClick={() => navigate("/products-and-solutions/dcc-logistics-siute-ng")}
                        src={aiva}
                        alt="AIVA Logo"
                        className="w-8 h-8"
                      />
                    </a>
                    <div className="absolute whitespace-nowrap left-1/2 transform -translate-x-1/2 bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10">
                      AIVA - AI Virtual Assistant
                    </div>
                  </div>
                </div>

                <div className="floating-icon absolute bottom-8 left-10">
                  <img src={arrow} alt="Arrow Logo" className="w-8 h-8" />
                </div>
              </div>

              {/* Email Icon */}
              <div className="email-icon absolute right-7 top-12 mt-0 transform -translate-y-1/2">
                <a
                  href="/contact"
                  className="w-10 h-10 bg-[#2f3985] rounded-full flex items-center justify-center shadow-lg"
                >
                  <Mail className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
            {/* Buttons with proper font family */}
            <div className="cta-buttons flex flex-col lg:flex-row gap-4 mb-6">
              <button
                onClick={() => document.getElementById("request-quote")?.click()}
                className="cta-button bg-[#2f3985]  text-white px-6 py-3 rounded flex justify-center items-center gap-2 hover:bg-blue-700 font-inter font-medium"
              >
                Request a demo <ArrowRight className="w-4 h-4" />
              </button>
              <button className="cta-button text-[#2f3985] border border-[#2f3985] px-6 py-3 rounded  hover:bg-blue-50 ">
                <a href="/contact" className="flex items-center justify-center gap-2 font-inter font-medium">
                  {" "}
                  Book for consultation <ArrowRight className="w-4 h-4" />
                </a>
              </button>
            </div>

            {/* SAP Logos with proper font family */}
            <div className="sap-section flex gap-8 items-center mb-6">
              <div className="sap-logo flex justify-center text-sky-500 font-semibold items-center font-inter">
                <img src={sap} alt="SAP S/4 HANA" className="h-10" />
                S/4 HANA
              </div>
              <div className="sap-logo flex justify-center text-[#2f3985] font-semibold items-center font-inter">
                <img src={sap} alt="SAP S/4 HANA" className="h-10" />
                Business One
              </div>
            </div>

            {/* Stats with proper font family */}
            <div className="stats-section flex gap-16">
              <div className="stat-item">
                <div className="text-4xl font-bold text-center text-[#2f3985] font-inter">99%</div>
                <div className="text-gray-700 text-sm italic font-inter">Client Satisfaction</div>
              </div>
              <div className="stat-item">
                <div className="text-4xl font-bold text-center text-[#2f3985] font-inter">400+</div>
                <div className="text-gray-700 text-sm italic font-inter">Projects Delivered</div>
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="hidden lg:block flex-1  relative">
            <div className="hero-image relative rounded-3xl p-8 full">
              {/* AI Circuit Pattern Overlay */}
              <div className="h-full rounded-3xl ">
                <img src={aiImage} alt="AI Circuit Pattern" className="w-full h-full object-cover rounded-3xl" />
              </div>

              {/* Floating Icons */}
              <div className="floating-icon absolute bottom-40 mb-2 left-12">
                <div className="relative group">
                  <a href="/dcc-cloud">
                    <img src={cloude} alt="Cloud Logo" className="w-12 h-12" />
                  </a>
                  <div className="absolute whitespace-nowrap left-[190%]  top-4  h-1/2 transform -translate-x-1/2 bottom-full mb-1 hidden group-hover:block bg-gray-800  text-white text-xs rounded py-1 px-2 z-10">
                    DCC Cloud
                  </div>
                </div>
              </div>

              <div className="floating-icon absolute bottom-24 mb-4 left-12">
                <div className="relative group">
                  <a href="/products-and-solutions/dcc-tracking-suite-ng">
                    <img
                      //   onClick={() => navigate("/products-and-solutions/dcc-logistics-siute-ng")}
                      src={aiva}
                      alt="AIVA Logo"
                      className="w-12 h-12"
                    />
                  </a>
                  <div className="absolute whitespace-nowrap left-[280%]  top-4  h-1/2 transform -translate-x-1/2 bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10">
                    AIVA - AI Virtual Assistant
                  </div>
                </div>
              </div>

              <div className="floating-icon absolute bottom-14 left-12">
                <img src={arrow} alt="Arrow Logo" className="w-12 h-12" />
              </div>
            </div>

            {/* Email Icon */}
            <div className="email-icon absolute right-9 top-14 mt-2 transform -translate-y-1/2">
              <div className="relative group">
                <a
                  href="/contact"
                  className="w-14 h-14 bg-[#2f3985] rounded-full flex items-center justify-center shadow-lg"
                >
                  <Mail className="w-8 h-8 text-white" />
                </a>
                <div className="absolute whitespace-nowrap left-1/2  h-1/2 transform -translate-x-1/2 bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10">
                  Contact Us
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partner Logos */}
      <div className="partner-section bg-gray-50 px-[.1rem] lg:px-[2rem] lg:py-12 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="hide-scroll flex justify-center  overflow-x-scroll overflow-y-hidden items-center gap-2.5 lg:gap-10 opacity-80">
            {images?.map((items, index) => (
              <div
                key={index}
                className="partner-logo h-6 lg:h-10 flex items-center justify-center min-w-[30px] lg:min-w-[60px]"
              >
                <img src={items.src} alt={items.alt} className="h-full  w-auto grayscale transition-transform" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
