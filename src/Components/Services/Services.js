import { mainServiceFn } from "Services/Home"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect } from "react"
import { TbTruckDelivery } from "react-icons/tb"
import { useQuery } from "react-query"

gsap.registerPlugin(ScrollTrigger)

const CoreServices = () => {
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
  const { data: mainServiceData, isLoading, refetch } = useQuery(["main-service"], () => mainServiceFn())
  console.log("Service :", mainServiceData?.data?.data?.[0]?.details)
  return (
    <>
      <div className="bg-sky-blue-100 p-[6%] !pt-[3%] !pb-[1%]">
        <div className="text-center pb-4 ">
          <div className="text-base font-semibold text-black">WHAT WE OFFER</div>
          <div className="text-4xl font-semibold text-primary">Our Main Services</div>
        </div>
        <div className="box grid  lg:grid-cols-3  min-h-[60vh] text-center gap-10 lg:p-10">
          {mainServiceData?.data?.data?.[0]?.details?.map((item) => (
            <div className="box-item group relative  !rounded-md  text-white shadow-md hover:shadow-2xl h-[40vh]  overflow-hidden">
              <div
                className="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-125"
                style={{ backgroundImage: `url(${baseURL + item?.backgroundImage?.url})`, zIndex: 1 }}
              ></div>
              <div className="absolute inset-0 bg-primary opacity-60 z-10 rounded-md"></div>
              {/* <div className="bg-primary !opacity-60  h-full w-full z-30 !rounded-md"> </div> */}
              <div className="absolute z-30 top-[50%] h-[60vh] mx-auto w-full flex flex-col gap-3 items-center group-hover:-translate-y-4    transition-all duration-300  ">
                <div>
                  {/* <TbTruckDelivery className="!text-5xl text-white transform scale-x-[-1]" /> */}
                  {item?.icon?.url ? (
                    <img src={baseURL + item?.icon?.url} className="scale-x-[-1] h-10 w-10" />
                  ) : (
                    <TbTruckDelivery className="!text-5xl text-white transform scale-x-[-1]" />
                  )}
                </div>
                <div className="text-xl mx-3 mb-3">{item?.title}</div>
              </div>
            </div>
          ))}
          {/* <div className="box-item group relative  !rounded-md  text-white shadow-md hover:shadow-2xl h-[40vh] overflow-hidden">
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
          <div className="box-item group relative  !rounded-md  text-white shadow-md hover:shadow-2xl h-[40vh] overflow-hidden    ">
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
          </div> */}
        </div>
      </div>
    </>
  )
}
export default CoreServices
