import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"
import { useQuery } from "react-query"
import { teamsServiceFn } from "Services/Home"
import dummy from "../../Assests/dummyLogo.jpg"

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
      <div className="p-[6%] !pt-[3%] !pb-[1%]">
        <div className="text-center lg:pb-0 ">
          <div className="text-base font-semibold text-black">FACE BEHIND DCC</div>
          <div className="text-4xl font-semibold text-primary">Our Team</div>
        </div>
        <div className="w-full">
          {/* Top 3 Cards */}
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 px-16 mb-6  text-center">
            {TeamsData?.data?.data
              ?.slice(0, 3) // first 3 items
              .map((item, index) => (
                <div
                  key={index}
                  className="bg-white relative px-4 py-10 pb-1 flex flex-col items-center gap-2 text-black2"
                >
                  <div className="flip-card w-full h-72 border rounded-lg">
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
                          className="text-xs leading-4 font-medium flex items-center !text-black absolute p-5 "
                        >
                          <div>{item?.description || ""}</div>
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
          </div>

          {/* Remaining Items in Grid (4 columns) */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 text-center">
            {TeamsData?.data?.data
              ?.slice(3) // from 4th item onwards
              .map((item, index) => (
                <div
                  key={index}
                  className="bg-white relative px-3 py-6 pb-1 flex flex-col items-center gap-2 text-black2"
                >
                  <div className="flip-card w-full h-72 border rounded-lg">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <img
                          src={item?.profile?.url ? baseURL + item?.profile?.url : dummy}
                          alt=""
                          className="w-full h-full object-fill transition-all duration-75 lg:duration-500 hover:blur-sm"
                        />
                      </div>
                      <div className="flip-card-back border relative">
                        <img
                          src={item?.profile?.url ? baseURL + item?.profile?.url : dummy}
                          alt=""
                          className="w-full h-full blur-md object-fill transition-all duration-100 lg:duration-500 hover:blur-sm"
                        />
                        <p
                          style={{ fontSize: "12px" }}
                          className="text-xs leading-4 font-medium flex items-center !text-black absolute p-5 lg:p-3"
                        >
                          <div>{item?.description || ""}</div>
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
          </div>
        </div>
      </div>
    </>
  )
}
export default Teams
