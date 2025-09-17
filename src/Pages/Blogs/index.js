import Section1 from "Components/Blogs/Section1"
import Connections from "Components/Home/Connect"
import moment from "moment"
import { Helmet } from "react-helmet-async"
import { useQuery } from "react-query"
import { postBlogServiceFn } from "Services/Home"
import Loader from "Shared/Loader"
import DefaultImage from "../../Assests/default_image-1.jpg"
import logo from "../../Assests/Content/logo_footer.png"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"

gsap.registerPlugin(ScrollTrigger)

const Blogs = () => {
  const baseURL = process.env.REACT_APP_API_URL
  const { data: blogData, isLoading, refetch } = useQuery(["blogs"], () => postBlogServiceFn())

  // Animation refs
  const blogsSectionRef = useRef(null)
  const blogsTitleRef = useRef(null)
  const blogsGridRef = useRef(null)
  const blogCardsRef = useRef([])

  useEffect(() => {
    if (!blogData?.data?.data?.[0]?.articles || isLoading) return

    const ctx = gsap.context(() => {
      // Set initial states - FIXED: Removed scale from cards to prevent size issues
      gsap.set(blogsSectionRef.current, {
        opacity: 0,
        backgroundColor: "rgba(248, 250, 252, 0)",
      })

      gsap.set(blogsTitleRef.current, {
        y: -50,
        opacity: 0,
        filter: "blur(8px)",
      })

      // FIXED: Only use opacity and y transform for cards, no scale
      gsap.set(blogCardsRef.current, {
        y: 60,
        opacity: 0,
        filter: "blur(10px)",
      })

      gsap.set(".blog-image", {
        scale: 1.1,
        opacity: 0,
        filter: "blur(5px)",
      })

      gsap.set(".blog-date", {
        y: 20,
        opacity: 0,
      })

      gsap.set(".blog-title", {
        y: 15,
        opacity: 0,
      })

      gsap.set(".blog-description", {
        y: 10,
        opacity: 0,
      })

      // Create animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: blogsSectionRef.current,
          start: "top 95%",
          toggleActions: "play none none none",
          once: true, // FIXED: Make it trigger only once
        },
      })

      // Section background fade
      tl.to(blogsSectionRef.current, {
        opacity: 1,
        backgroundColor: "rgba(248, 250, 252, 0.5)",
        duration: 1.2,
        ease: "power1.out",
      })

        // Title animation with blur removal
        .to(
          blogsTitleRef.current,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power2.out",
          },
          "-=0.8"
        )

        // FIXED: Cards animation without scale conflicts
        .to(
          blogCardsRef.current,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            stagger: {
              amount: 1,
              from: "start",
              ease: "power1.out",
            },
            ease: "power2.out",
          },
          "-=1.6"
        )

        // Images with morphing scale effect
        .to(
          ".blog-image",
          {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            stagger: {
              amount: 0.6,
              from: "start",
            },
            ease: "power2.out",
          },
          "-=1.2"
        )

        // Blog content animations
        .to(
          ".blog-date",
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: {
              amount: 0.4,
              from: "start",
            },
            ease: "power1.out",
          },
          "-=0.8"
        )

        .to(
          ".blog-title",
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: {
              amount: 0.4,
              from: "start",
            },
            ease: "power1.out",
          },
          "-=0.6"
        )

        .to(
          ".blog-description",
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: {
              amount: 0.4,
              from: "start",
            },
            ease: "power1.out",
          },
          "-=0.4"
        )

      // FIXED: Simplified hover animations without scale conflicts
      blogCardsRef.current.forEach((card, index) => {
        if (card) {
          card.addEventListener("mouseenter", () => {
            // Simple hover animations without timeline conflicts
            gsap.to(card, {
              y: -10,
              duration: 0.3,
              ease: "power2.out",
            })

            gsap.to(card.querySelector(".blog-image"), {
              scale: 1.05,
              filter: "brightness(1.1)",
              duration: 0.3,
              ease: "power2.out",
            })

            gsap.to(card, {
              boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
              duration: 0.3,
              ease: "power2.out",
            })
          })

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            })

            gsap.to(card.querySelector(".blog-image"), {
              scale: 1,
              filter: "brightness(1)",
              duration: 0.3,
              ease: "power2.out",
            })

            gsap.to(card, {
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              duration: 0.3,
              ease: "power2.out",
            })
          })
        }
      })

      // FIXED: Removed floating animation that could cause conflicts
      // gsap.to(".blog-image", {
      //   y: -8,
      //   duration: 4,
      //   ease: "power1.inOut",
      //   yoyo: true,
      //   repeat: -1,
      //   stagger: {
      //     amount: 2,
      //     from: "random"
      //   }
      // })
    }, blogsSectionRef.current)

    return () => ctx.revert()
  }, [blogData, isLoading])

  return (
    <>
      <Helmet>
        <title>DoubleClick - Blogs</title>
        <meta name="Blogs" content="This page is Blogs page of Double click consulting." />
        <meta
          name="keywords"
          content="Contact DoubleClick, IT consulting, digital solutions, support, DoubleClick contact"
        />
        <meta property="og:title" content="Blogs | DoubleClick Consulting" />
        <meta property="title" content="Blogs | DoubleClick Consulting" />
        <meta
          name="og:description"
          content="Reach out to DoubleClick Consulting for business solutions and expert advice tailored to your needs."
        />
        <meta
          name="description"
          content="Reach out to DoubleClick Consulting for business solutions and expert advice tailored to your needs."
        />
        <meta property="og:image" content={logo} />
      </Helmet>

      {isLoading && (
        <div className="fixed h-[100vh] w-[100vw] z-50 bg-black bg-opacity-85 flex justify-center items-center">
          <Loader />
        </div>
      )}

      <div className="w-[100vw] min-w-[320px] !bg-white max-w-screen-2xl mx-auto rendor overflow-hidden">
        <Section1 data={blogData?.data?.data?.[0]} />

        <div
          ref={blogsSectionRef}
          className="p-[6%] !pt-[2%] !pb-[1%] transition-all duration-1000"
          style={{ backgroundColor: "rgba(248, 250, 252, 0)" }}
        >
          <div className="text-center lg:pb-3 mb-3">
            <div ref={blogsTitleRef} className="text-4xl font-semibold text-primary mb-4">
              Recent Blogs
            </div>
            {/* <div className="w-32 h-1 bg-gradient-to-r from-primary to-orange-500 mx-auto rounded-full"></div> */}
          </div>

          <div
            ref={blogsGridRef}
            className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 text-center lg:gap-8 md:gap-6 gap-4 p-1"
          >
            {blogData?.data?.data?.[0]?.articles?.map((item, index) => (
              <a
                key={item.slug}
                href={`${window.location.origin}/post/${item.slug}`}
                ref={(el) => (blogCardsRef.current[index] = el)}
                className="bg-white relative px-6 py-8 flex flex-col items-center gap-4 text-black2 w-full rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group border border-gray-100"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                <div className="relative z-10 w-full">
                  <div className="overflow-hidden rounded-xl mb-4">
                    {item?.cover?.url || item?.thumbnail_image?.url ? (
                      <img
                        src={
                          item?.thumbnail_image?.url ? baseURL + item?.thumbnail_image?.url : baseURL + item?.cover?.url
                        }
                        alt=""
                        className="blog-image w-full h-64 object-cover transition-all duration-300 rounded-xl"
                      />
                    ) : (
                      <img
                        src={DefaultImage}
                        alt=""
                        className="blog-image w-full h-64 object-cover transition-all duration-300 rounded-xl"
                      />
                    )}
                  </div>

                  <div className="blog-date text-sm font-semibold text-gray-600 mb-3 px-3 py-1 bg-gray-100 rounded-full inline-block">
                    {moment(item?.createdAt).format("MMM DD, YYYY")}
                  </div>

                  <div className="blog-title text-lg font-semibold hover:text-primary text-gray-900 mb-3 leading-tight transition-colors duration-300 line-clamp-2">
                    {item?.title}
                  </div>

                  <div className="blog-description text-sm font-light text-gray-600 leading-relaxed line-clamp-3">
                    {item?.description}
                  </div>

                  {/* Read more indicator */}
                  <div className="mt-4 text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Read More →
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <Connections />
      </div>
    </>
  )
}

export default Blogs
