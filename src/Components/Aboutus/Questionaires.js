import { useQuery } from "react-query"
import { faqServiceFn } from "Services/Home"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"

gsap.registerPlugin(ScrollTrigger)

const Questionaires = () => {
  const { data: faqData, isLoading, refetch } = useQuery(["faq"], () => faqServiceFn())

  // Animation refs
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const faqItemsRef = useRef([])

  console.log("Ques", faqData?.data?.data)

  useEffect(() => {
    if (!faqData?.data?.data || isLoading) return

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(titleRef.current, { y: -30, opacity: 0 })
      gsap.set(subtitleRef.current, { y: -20, opacity: 0 })
      gsap.set(faqItemsRef.current, {
        y: 50,
        opacity: 0,
        scale: 0.95,
      })

      // Create animation timeline - triggers after section is visible
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%", // Animation starts when section is well into view
          toggleActions: "play none none none",
          once: true,
          // markers: true // Uncomment to see trigger points during development
        },
      })

      // Header animations
      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      })
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

        // FAQ items with staggered animation
        .to(
          faqItemsRef.current,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: {
              amount: 1,
              from: "start",
            },
            ease: "power2.out",
          },
          "-=0.4"
        )
    }, sectionRef.current)

    return () => ctx.revert()
  }, [faqData, isLoading])

  return (
    <>
      <div ref={sectionRef} className="p-[6%] !pt-[3%] !pb-[1%]">
        <div className="text-center pb-0">
          <div ref={titleRef} className="text-base font-semibold text-black">
            FREQUENTLY ASKED
          </div>
          <div ref={subtitleRef} className="text-4xl font-semibold text-primary">
            Questions
          </div>
        </div>
        <div className="flex flex-wrap family-serif2 justify-between gap-5 lg:p-10">
          {faqData?.data?.data?.map((item, index) => (
            <div
              key={index}
              ref={(el) => (faqItemsRef.current[index] = el)}
              className="w-full lg:w-[49%] bg-white relative p-3 pb-1 flex flex-col items-start gap-2 text-black2"
            >
              <div className="text-base font-medium mb-3">
                <div dangerouslySetInnerHTML={{ __html: item.title }} />
              </div>
              <div className="text-slate-500 leading-5">
                <div>
                  <div dangerouslySetInnerHTML={{ __html: item.description }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Questionaires
