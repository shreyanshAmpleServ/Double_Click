import { TbTruckDelivery } from "react-icons/tb"
import { ImAirplane } from "react-icons/im"
import { FaShip } from "react-icons/fa"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect } from "react"
import groundPic from "../../Assests/Content/07/blog_img_6.jpg"
import seaPic from "../../Assests/Content/07/post_thumb_1-4.jpg"
import airPic from "../../Assests/Content/07/blog_img_7.jpg"

gsap.registerPlugin(ScrollTrigger)

const CoreServices = () => {
  useEffect(() => {
    gsap.from(".box", {
      y: 300,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".box",
        // start: 'top 100%',
        toggleActions: "play none none none",
      },
    })
  }, [])

  return (
    <>
      <div className="bg-sky-blue-100 p-[6%] !pt-[3%] !pb-[1%]">
        <div className="text-center pb-1 ">
          <div className="text-base font-semibold text-black">WHAT WE OFFER</div>
          <div className="text-4xl font-semibold text-primary">Our Main Services</div>
        </div>
        <div className="box grid  lg:grid-cols-3  h-[60vh] text-center gap-10 lg:p-10">
          <div className="box-item group relative  !rounded-md  text-white shadow-md hover:shadow-2xl  overflow-hidden">
            <div
              className="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-125"
              style={{ backgroundImage: `url(${groundPic})`, zIndex: 1 }}
            ></div>
            <div className="absolute inset-0 bg-primary opacity-60 z-10 rounded-md"></div>
            {/* <div className="bg-primary !opacity-60  h-full w-full z-30 !rounded-md"> </div> */}
            <div className="absolute z-30 top-[65%] h-[60vh] mx-auto w-full flex flex-col gap-3 items-center group-hover:-translate-y-4    transition-all duration-300  ">
              <div>
                <TbTruckDelivery className="!text-5xl text-white transform scale-x-[-1]" />
              </div>
              <div className="text-xl">GROUND DELIVERY</div>
            </div>
          </div>
          <div className="box-item group relative  !rounded-md  text-white shadow-md hover:shadow-2xl overflow-hidden">
            <div
              className="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-125"
              style={{ backgroundImage: `url(${airPic})`, zIndex: 1 }}
            ></div>
            <div className="absolute inset-0   bg-primary opacity-60 z-10 rounded-md"></div>
            <div className="absolute z-30 top-[65%] mx-auto w-full flex flex-col gap-3 items-center group-hover:-translate-y-4    transition-all duration-300 ">
              <div>
                <ImAirplane className="!text-5xl text-white transform scale-x-[-1]" />
              </div>
              <div className="text-xl">AIR DELIVERY</div>
            </div>
          </div>
          <div className="box-item group relative  !rounded-md  text-white shadow-md hover:shadow-2xl overflow-hidden    ">
            <div
              className="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-125"
              style={{ backgroundImage: `url(${seaPic})`, zIndex: 1 }}
            ></div>
            <div className="absolute inset-0  bg-primary opacity-60 z-10 rounded-md"></div>
            <div className="absolute z-30 top-[65%] mx-auto w-full flex flex-col gap-3 items-center  group-hover:-translate-y-4    transition-all duration-300 ">
              <div>
                <FaShip className="!text-5xl text-white transform scale-x-[-1]" />
              </div>
              <div className="text-xl">SEA DELIVERY</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default CoreServices
