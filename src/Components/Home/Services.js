import { TbTruckDelivery } from "react-icons/tb"
import { ImAirplane } from "react-icons/im"
import { FaShip } from "react-icons/fa"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect } from "react"
import { useQuery } from "react-query"
import { coreServiceFn } from "Services/Home"

gsap.registerPlugin(ScrollTrigger)

const Services = () => {
  const baseURL = process.env.REACT_APP_API_URL
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

  const { data: serviceData, isLoading, refetch } = useQuery(["core-service"], () => coreServiceFn())
  return (
    <>
      <div className="bg-sky-blue-100 p-[6%] !pt-[3%] !pb-[1%]">
        <div className="text-center pb-1 ">
          <div className="text-base font-semibold text-black">WHAT WE OFFER</div>
          <div className="text-3xl lg:text-4xl font-semibold text-primary">Our Core Services</div>
        </div>
        <div className="box grid   lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  text-center gap-10 lg:p-8 lg:pb-1">
          {serviceData?.data?.data?.[0]?.details?.map((item) => (
            <div className="box-item group  bg-white relative px-2 py-10 flex flex-col items-center gap-3 text-black shadow-md hover:shadow-2xl  hover:-translate-y-4    transition-all duration-300">
              <div>
                {item?.title == "GROUND DELIVERY" && (
                  <TbTruckDelivery className="!text-5xl text-primary2 transform scale-x-[-1]" />
                )}
                {item?.title == "AIR DELIVERY" && (
                  <ImAirplane className="!text-3xl mb-4 text-primary2 transform scale-x-[-1] " />
                )}
                {item?.icon?.url && <img src={baseURL + item?.icon?.url} alt="" className="!w-16 !h-16 mb-4" />}
                {item?.title == "SEA DELIVERY" && <FaShip className="!text-4xl mb-4 text-primary2 " />}
              </div>
              <div className="text-xl font-semibold">{item?.title}</div>
              <div className="text-base font-extralight leading-6 text-gray-900">{item?.description}</div>
              <div className="absolute bottom-0 left-1/2 w-0 h-1 bg-primary-red transition-all duration-500 group-hover:left-0 group-hover:w-full"></div>
            </div>
          ))}
          {/* <div className="box-item group relative bg-white px-4 py-10 flex flex-col items-center gap-3 text-black shadow-md hover:shadow-2xl  hover:-translate-y-4    transition-all  duration-300">
                <ImAirplane className="!text-3xl mb-4 text-primary2 transform scale-x-[-1] " />
                <div className="text-xl">AIR DELIVERY</div>
                <div className="text-base font-thin leading-6 text-gray-500">Logistics Should Brace for Changes in Cargo Sed ut perspiciatis, unde omnis...</div>
                <div className="absolute bottom-0 left-1/2 w-0 h-1 bg-primary-red transition-all duration-500 group-hover:left-0 group-hover:w-full"></div>

            </div>
            <div className="box-item group relative bg-white px-4 py-10 flex flex-col items-center gap-3 text-black shadow-md hover:shadow-2xl  hover:-translate-y-4    transition-all  duration-300">
                <FaShip className="!text-4xl mb-4 text-primary2 " />
                <div className="text-xl">SEA DELIVERY</div>
                <div className="text-base font-thin leading-6 text-gray-500">Logistics Should Brace for Changes in Cargo Sed ut perspiciatis, unde omnis...</div>
                <div className="absolute bottom-0 left-1/2 w-0 h-1 bg-primary-red transition-all duration-500 group-hover:left-0 group-hover:w-full"></div>

            </div> */}
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  )
}
export default Services
