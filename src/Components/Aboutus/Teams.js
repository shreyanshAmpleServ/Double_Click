import { TbTruckDelivery } from "react-icons/tb"
import { ImAirplane } from "react-icons/im"
import { FaShip } from "react-icons/fa"
import image1 from "../../Assests/Content/07/blog_img_1.jpg"
import image2 from "../../Assests/Content/07/blog_img_2.jpg"
import image3 from "../../Assests/Content/07/blog_img_3.jpg"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useQuery } from "react-query"
import { postServiceFn, teamsServiceFn } from "Services/Home"
import moment from "moment"
import dummy from "../../Assests/dummyLogo.jpg"
import { BsPersonCircle } from "react-icons/bs"

gsap.registerPlugin(ScrollTrigger)

const Teams = () => {
  const baseURL = process.env.REACT_APP_API_URL
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)
  const { data: TeamsData, isLoading, refetch } = useQuery(["teams"], () => teamsServiceFn())
  console.log("Temas", TeamsData?.data?.data)
  useEffect(
    () =>
      [ref1, ref2, ref3].forEach((ref, index) => {
        gsap.from(ref.current, {
          x: -400,
          opacity: 0,
          duration: 1,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        })
      }),
    [TeamsData]
  )

  return (
    <>
      <div className="p-[6%] !pb-[2%]">
        <div className="text-center lg:pb-14 ">
          <div className="text-base font-semibold text-black">FACE BEHIND DCC</div>
          <div className="text-4xl font-semibold text-primary">Our Team</div>
        </div>
        <div className="grid 2xl:grid-cols-5 lg:grid-cols-4  text-center lg:gap-3 p-1">
          {TeamsData?.data?.data?.map((item, index) => (
            <div key={index} className="bg-white relative px-4 py-10 pb-1 flex flex-col items-center gap-2 text-black2">
              <div className="flip-card w-full h-72 lg:h-72 border rounded-lg">
                <div className="flip-card-inner">
                  {/* Front */}
                  <div className="flip-card-front">
                    <img
                      src={item?.profile?.url ? baseURL + item?.profile?.url : dummy}
                      alt=""
                      className="w-full h-full object-fill transition-all duration-75 lg:duration-500 hover:blur-sm"
                    />
                  </div>

                  {/* Back */}
                  <div className="flip-card-back border relative">
                    <img
                      src={item?.profile?.url ? baseURL + item?.profile?.url : dummy}
                      alt=""
                      className="w-full h-full blur-md object-fill transition-all duration-100 lg:duration-500 hover:blur-sm"
                    />
                    <p
                      style={{ fontSize: "12px" }}
                      className="text-xs leading-4 font-medium text-black  absolute p-5 lg:p-3 "
                    >
                      <div>{item?.description || ""}</div>
                      {/* <div className="flex justify-center items-center gap-2 mt-2">
                        {item?.socialAccounts?.map((account, idx) => (
                          <a
                            key={idx}
                            href={account?.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className=" hover:underline"
                          >
                            {account?.svgIcon ? (
                              <div
                                className="w-7 h-7 rounded-lg overflow-hidden border border-gray-300 border-opacity-30 flex items-center  justify-center "
                                dangerouslySetInnerHTML={{
                                  __html: account?.svgIcon?.replace(
                                    "<svg ",
                                    '<svg class="w-full h-full object-fit-cover" '
                                  ),
                                }}
                              />
                            ) : (
                              <BsPersonCircle className="w-7 h-7 rounded-lg overflow-hidden border border-gray-300 border-opacity-30 flex items-center  justify-center " />
                            )}{" "}
                          </a>
                        ))}
                      </div> */}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-lg font-semibold whitespace-nowrap">{item?.name}</div>
                <div className="text-sm whitespace-nowrap font-normal">{item?.designation}</div>
              </div>
            </div>
          ))}

          {/* <div ref={ref2} className="  bg-white relative px-4 py-10 flex flex-col items-center gap-3 text-black2   ">
                <img src={image2} alt="" className="w-full h-64 object-cover hover:-translate-y-2 hover:opacity-60    transition-all duration-300 rounded-lg" />
                <div className="text-base font-semibold"><span className="text-primary">Business</span> / July 28, 2023</div>
                <div className="text-lg font-semibold">Fleet Management Comes into</div>
                <div className="text-base font-thin famiy-serif2 leading-6 text-gray-500">Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium...</div>
            </div>
            <div ref={ref3} className="  bg-white relative px-4 py-10 flex flex-col items-center gap-3 text-black2   ">
                <img src={image3} alt="" className="w-full h-64 object-cover hover:-translate-y-2 hover:opacity-60    transition-all duration-300 rounded-lg" />
                <div className="text-base font-semibold"><span className="text-primary">Warehousing</span> / July 28, 2023</div>
                <div className="text-lg font-semibold">New Warehouse Now Operational</div>
                <div className="text-base font-thin famiy-serif2 leading-6 text-gray-500">Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium...</div>
            </div> */}
        </div>
      </div>
    </>
  )
}
export default Teams
