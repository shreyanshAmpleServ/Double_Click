import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import moment from "moment"
import { useEffect, useRef, useState } from "react"
import { useQuery } from "react-query"
import { postBlogServiceFn } from "Services/Home"

gsap.registerPlugin(ScrollTrigger)

const Posts = () => {
  const baseURL = process.env.REACT_APP_API_URL
  const [descOpen, setDescOpen] = useState()
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const cardsRef = useRef([])

  const { data: postData, isLoading, refetch } = useQuery(["post"], () => postBlogServiceFn({ size: 3 }))
  console.log("Post", postData?.data?.data?.[0])
  const posts = postData?.data?.data?.[0]?.articles?.filter((item, i) => i < 3)
  console.log("Post", posts)

  useEffect(() => {
    if (!posts || posts.length === 0) return

    const ctx = gsap.context(() => {
      // Set initial states ONCE - don't reset on retrigger
      gsap.set(titleRef.current, { y: -30, opacity: 0 })
      gsap.set(subtitleRef.current, { y: 30, opacity: 0 })

      // Different initial states for each card
      gsap.set(cardsRef.current[0], { x: -200, opacity: 0, scale: 0.8 })
      gsap.set(cardsRef.current[1], { y: -150, opacity: 0, scale: 0.8 })
      gsap.set(cardsRef.current[2], { x: 200, opacity: 0, scale: 0.8 })

      // Set image states - keep images visible to prevent white flash
      gsap.set(".post-image", { scale: 0.7, opacity: 0.3 }) // Changed from 0 to 0.3
      gsap.set(".post-content", { y: 20, opacity: 0 })
      gsap.set(".post-date", { y: 15, opacity: 0 })

      // Create animation timeline - removed setInitialStates calls
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse", // Changed to allow reverse
          once: false, // Allow retriggering
        },
      })

      // Animate titles and cards simultaneously
      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      })

        // Subtitle starts slightly after title
        .to(
          subtitleRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6"
        )

        // Cards start immediately with titles - NO DELAY
        .to(
          cardsRef.current[0],
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.8"
        ) // Start with title

        .to(
          cardsRef.current[1],
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power2.out",
          },
          "-=0.9"
        ) // Start almost with title

        .to(
          cardsRef.current[2],
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
          },
          "-=1.0"
        ) // Start with title

        // Images animate quickly with smooth stagger - no white flash
        .to(
          ".post-image",
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.7"
        )

        // Content follows quickly
        .to(
          ".post-content",
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.5"
        )

        // Date badges finish the sequence
        .to(
          ".post-date",
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.3"
        )

      // Smooth, fast hover animations
      cardsRef.current.forEach((card, index) => {
        if (card) {
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -10,
              scale: 1.02,
              duration: 0.3,
              ease: "power2.out",
            })

            gsap.to(card.querySelector(".post-image"), {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out",
            })

            gsap.to(card.querySelector(".post-date"), {
              backgroundColor: "#3b82f6",
              color: "#ffffff",
              duration: 0.2,
              ease: "power2.out",
            })
          })

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            })

            gsap.to(card.querySelector(".post-image"), {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            })

            gsap.to(card.querySelector(".post-date"), {
              backgroundColor: "#f3f4f6",
              color: "#64748b",
              duration: 0.2,
              ease: "power2.out",
            })
          })
        }
      })
    }, sectionRef.current)

    return () => ctx.revert()
  }, [posts])

  return (
    <>
      <div ref={sectionRef} className="p-[6%] !pt-[3%] !pb-[1%] px-[8%] lg:px-[15%] overflow-hidden">
        <div className="text-center lg:pb-4">
          <div ref={titleRef} className="text-base font-semibold text-black">
            COMPANY'S NEWS
          </div>
          <div ref={subtitleRef} className="text-3xl lg:text-4xl font-semibold text-primary">
            News Feed
          </div>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-3 lg:gap-10 md:gap-5 p-1">
          {posts?.map((item, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white relative px-4 py-4 lg:py-10 pb-0 flex flex-col items-center gap-1.5 w-[82vw] lg:w-full md:w-full lg:text-black2 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="overflow-hidden rounded-lg w-full">
                <img
                  src={baseURL + item?.thumbnail_image?.url}
                  alt=""
                  className="post-image w-full h-64 object-cover transition-all duration-300 rounded-lg"
                  loading="eager" // Ensure images load immediately
                />
              </div>

              <div className="post-content w-full px-2">
                <div className="text-lg font-semibold hover:text-red-700 text-nowrap overflow-hidden w-[100%] text-ellipsis mb-2">
                  <a href={`${window.location.origin}/post/${item.slug}`}>{item?.title}</a>
                </div>

                <div
                  onClick={() => setDescOpen(descOpen === index ? null : index)}
                  className={`text-sm font-extralight famiy-serif2 w-[100%] ${
                    descOpen === index ? "" : "text-nowrap overflow-hidden text-ellipsis"
                  } leading-6 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors duration-300`}
                >
                  {item?.description}
                </div>
              </div>

              <div className="post-date flex justify-between p-2 mb-1 items-center gap-2 text-xs  font-extralight mt-2 !text-slate-800 bg-gray-100 w-full rounded cursor-pointer group transition-all duration-300">
                <div>Published at</div>
                <div className="!text-xs">{moment(item?.createdAt).format("LL")}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Posts

// import { gsap } from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"
// import moment from "moment"
// import { useEffect, useRef, useState } from "react"
// import { useQuery } from "react-query"
// import { postBlogServiceFn, postServiceFn } from "Services/Home"

// gsap.registerPlugin(ScrollTrigger)

// const Posts = () => {
//   const baseURL = process.env.REACT_APP_API_URL
//   const [descOpen, setDescOpen] = useState()
//   const ref1 = useRef(null)
//   const ref2 = useRef(null)
//   const ref3 = useRef(null)
//   const { data: postData, isLoading, refetch } = useQuery(["post"], () => postBlogServiceFn({ size: 3 }))
//   console.log("Post", postData?.data?.data?.[0])
//   const posts = postData?.data?.data?.[0]?.articles?.filter((item, i) => i < 3)
//   console.log("Post", posts)
//   useEffect(
//     () =>
//       [ref1, ref2, ref3].forEach((ref, index) => {
//         gsap.from(ref.current, {
//           x: -400,
//           opacity: 0,
//           duration: 1,
//           delay: index * 0.1,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: ref.current,
//             start: "top 90%",
//             toggleActions: "play none none none",
//           },
//         })
//       }),
//     [postData]
//   )

//   return (
//     <>
//       <div className="p-[6%] !pt-[3%] !pb-[1%] px-[8%] lg:px-[15%]">
//         <div className="text-center lg:pb-4 ">
//           <div className="text-base font-semibold text-black">COMPANYS NEWS</div>
//           <div className="text-3xl lg:text-4xl font-semibold text-primary">News Feed</div>
//         </div>
//         <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 lg:gap-10 md:gap-5 p-1">
//           {posts?.map((item, index) => (
//             <div className="  bg-white relative lg:px-4 py-10 pb-0 flex flex-col items-center gap-1.5 w-[88vw] lg:w-full md:w-full lg:text-black2   ">
//               <img
//                 src={baseURL + item?.thumbnail_image?.url}
//                 alt=""
//                 className="w-full  h-64 object-cover hover:-translate-y-2 hover:opacity-60    transition-all duration-300 rounded-lg"
//               />
//               <div className="text-lg font-semibold hover:text-red-700 text-nowrap overflow-hidden w-[100%] text-ellipsis">
//                 <a href={`${window.location.origin}/post/${item.slug}`}>{item?.title}</a>
//               </div>
//               <div
//                 onClick={() => setDescOpen(descOpen === index ? null : index)}
//                 className={`text-sm font-extralight famiy-serif2   w-[100%] ${
//                   descOpen === index ? "" : "text-nowrap overflow-hidden text-ellipsis"
//                 } leading-6 text-gray-500`}
//               >
//                 {item?.description}
//               </div>
//               <div className="flex justify-between p-2 items-center gap-2 text-sm font-thin mt-2 text-slate-600 bg-gray-100 w-full rounded cursor-pointer group">
//                 <div className="">Published at </div>
//                 <div className="text-xs "> {moment(item?.createdAt).format("LL")}</div>
//               </div>
//             </div>
//           ))}

//           {/* <div ref={ref2} className="  bg-white relative px-4 py-10 flex flex-col items-center gap-3 text-black2   ">
//                 <img src={image2} alt="" className="w-full h-64 object-cover hover:-translate-y-2 hover:opacity-60    transition-all duration-300 rounded-lg" />
//                 <div className="text-base font-semibold"><span className="text-primary">Business</span> / July 28, 2023</div>
//                 <div className="text-lg font-semibold">Fleet Management Comes into</div>
//                 <div className="text-base font-thin famiy-serif2 leading-6 text-gray-500">Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium...</div>
//             </div>
//             <div ref={ref3} className="  bg-white relative px-4 py-10 flex flex-col items-center gap-3 text-black2   ">
//                 <img src={image3} alt="" className="w-full h-64 object-cover hover:-translate-y-2 hover:opacity-60    transition-all duration-300 rounded-lg" />
//                 <div className="text-base font-semibold"><span className="text-primary">Warehousing</span> / July 28, 2023</div>
//                 <div className="text-lg font-semibold">New Warehouse Now Operational</div>
//                 <div className="text-base font-thin famiy-serif2 leading-6 text-gray-500">Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium...</div>
//             </div> */}
//         </div>
//       </div>
//     </>
//   )
// }
// export default Posts
