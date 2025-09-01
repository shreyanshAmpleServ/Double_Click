import { useEffect, useRef, useState } from "react"
import { IoPlayOutline } from "react-icons/io5"
import { useQuery } from "react-query"
import { footerServiceFn } from "Services/Home"

const VideoSection = () => {
  const baseURL = process.env.REACT_APP_API_URL
  const [footData, setFootData] = useState([])
  const modalRef = useRef(null)
  const [openModal, setOpenModal] = useState(false)

  const { data: footerData, isLoading, refetch } = useQuery(["footerDetails"], () => footerServiceFn())
  const findData = (key) => {
    return footData?.filter((item) => item.key === key)?.[0]
  }
  useEffect(() => {
    if (footerData) {
      setFootData(footerData?.data?.data)
    }
  }, [footerData])

  const videoUrl = baseURL + findData("home_page_video")?.singleMedia.url
  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden" // 🔒 Prevent scroll
    } else {
      document.body.style.overflow = "auto" // 🔓 Re-enable scroll
    }

    // Clean up on unmount
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [openModal])
  return (
    <>
      <div className=" lg:p-[10%] !py-[4%]">
        <div
          className="relative mx-auto w-[80%] rounded-2xl  lg:h-[28rem]  h-[37vh]"
          style={{
            backgroundImage: `url(${baseURL + findData("home_page_video")?.supportMedia.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className=" bg-black1 rounded-2xl !opacity-60 absolute top-0 h-full w-full left-0 flex justify-center items-center "></div>
          <div className="flex flex-col lg:flex-row text-white absolute top-[40%] left-[40%] lg:left-[45%] gap-4 ">
            <div class="zindex-fixed relativ" onClick={() => setOpenModal(true)}>
              <a class="play-video">
                <IoPlayOutline className="!text-7xl " />
              </a>
            </div>
          </div>
        </div>
        {openModal && (
          <div
            style={{ zIndex: 1000 }}
            className="fixed  z-50 top-0 left-0 w-full h-full pt-[30%] lg:pt-[10%] bg-transparent"
            onClick={() => setOpenModal(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="h-[35vh] relative lg:h-[80vh]  w-[95vw] lg:w-[70%]   rounded  m-auto"
            >
              {/* <div
                className="text-end absolute top-6 right-3  mr-[0%] text-white"
                onClick={(e) => {
                  setOpenModal(false)
                  e.stopPropagation()
                }}
              >
                <Close />{" "}
              </div> */}
              <div>
                <video controls autoPlay className="w-100 h-[30vh] lg:h-[80vh] ">
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
