import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import moment from "moment"
import { useEffect, useRef, useState } from "react"
import { useQuery } from "react-query"
import { postBlogServiceFn, postServiceFn } from "Services/Home"

gsap.registerPlugin(ScrollTrigger)

const Posts = () => {
  const baseURL = process.env.REACT_APP_API_URL
  const [descOpen, setDescOpen] = useState()
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)
  const { data: postData, isLoading, refetch } = useQuery(["post"], () => postBlogServiceFn({ size: 3 }))
  console.log("Post", postData?.data?.data?.[0])
  const posts = postData?.data?.data?.[0]?.articles?.filter((item, i) => i < 3)
  console.log("Post", posts)
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
    [postData]
  )

  return (
    <>
      <div className="p-[6%] !pb-[2%]">
        <div className="text-center lg:pb-14 ">
          <div className="text-base font-semibold text-black">COMPANYS NEWS</div>
          <div className="text-3xl lg:text-4xl font-semibold text-primary">Recent Posts</div>
        </div>
        <div className="grid lg:grid-cols-3  text-center lg:gap-10 p-1">
          {posts?.map((item, index) => (
            <div className="  bg-white relative lg:px-4 py-10 pb-0 flex flex-col items-center gap-1 w-[88vw] lg:w-full lg:text-black2   ">
              <img
                src={baseURL + item?.cover?.url}
                alt=""
                className="w-full  h-64 object-cover hover:-translate-y-2 hover:opacity-60    transition-all duration-300 rounded-lg"
              />
              <div className="text-base font-semibold"> {moment(item?.createdAt).format("ll")}</div>
              <div className="text-lg font-semibold hover:text-red-700 text-nowrap overflow-hidden w-[80%] text-ellipsis">
                <a href={`${window.location.origin}/post/${item.slug}`}>{item?.title}</a>
              </div>
              <div
                onClick={() => setDescOpen(descOpen === index ? null : index)}
                className={`text-sm font-extralight famiy-serif2   w-[80%] ${
                  descOpen === index ? "" : "text-nowrap overflow-hidden text-ellipsis"
                } leading-6 text-gray-500`}
              >
                {item?.description}
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
export default Posts
