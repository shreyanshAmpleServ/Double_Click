import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useMemo, useRef } from "react"
import { Helmet } from "react-helmet-async"
import { useQuery } from "react-query"
import { faqServiceFn } from "Services/Home"
import Loader from "Shared/Loader"

gsap.registerPlugin(ScrollTrigger)

const Questionaires = ({ isAboutUsTeam }) => {
  const { data: faqData, isLoading, refetch } = useQuery(["faq"], () => faqServiceFn())

  // Animation refs
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const faqItemsRef = useRef([])
  // let arrFaQData = []
  // useEffect(() => {
  //   faqData?.data?.data?.forEach((item) => {
  //     arrFaQData.push({
  //       "@type": "Question",
  //       name: item.title,
  //       acceptedAnswer: {
  //         "@type": "Answer",
  //         text: item.description,
  //       },
  //     })
  //   })
  // }, [faqData])

  // let faqSchema = {
  //   "@context": "https://schema.org",
  //   "@type": "FAQPage",
  //   mainEntity: arrFaQData,
  // }
  const structuredData = useMemo(() => {
    if (!faqData?.data?.data?.length) return null

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqData.data.data.map((item) => ({
        "@type": "Question",
        name: item.title.replace(/<[^>]+>/g, ""),
        acceptedAnswer: {
          "@type": "Answer",
          text: item.description.replace(/<[^>]+>/g, ""),
        },
      })),
    }
  }, [faqData])

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
  // useEffect(() => {
  //   if (!structuredData) return

  //   const script = document.createElement("script")
  //   script.type = "application/ld+json"
  //   script.id = "faq-schema"
  //   script.text = JSON.stringify(structuredData)

  //   document.head.appendChild(script)

  //   return () => {
  //     document.head.removeChild(script)
  //   }
  // }, [structuredData])
  if (isLoading) return <Loader />
  else {
    return (
      <>
        {
          <Helmet>
            {!isAboutUsTeam && <title>DoubleClick - FAQ</title>}
            {!isAboutUsTeam && (
              <meta name="description" content="Frequently Asked Questions about DoubleClick services." />
            )}
            {structuredData && <script type="application/ld+json">{JSON.stringify(structuredData)}</script>}
          </Helmet>
        }

        {/* <Helmet prioritizeSeoTags>
          <title>DoubleClick - FAQ</title>

          {structuredData && (
            // <title>DoubleClick - Home</title>

            <script
              id="faq-schema"
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: "What services do you offer?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "We provide a range of software development services including SAP S/4HANA & SAP Business One licence sales, services, consulting and customization, specialized logistics industry solutions such as DCC NG, custom software development and integration, UI/UX design, cloud solutions (DCC Cloud), and software maintenance and support.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "What industries do you work with?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "We work across various industries including finance and banking, e-commerce, manufacturing and production, logistics and transportation, and distribution.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "How do you ensure the quality of your software?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "We follow best practices in software engineering including agile development methodology, continuous testing and integration, code reviews and version control, dedicated quality assurance teams, and regular client feedback with iteration.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "What is your typical software development process?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Our software development process includes discovery and requirements gathering, planning and proposal, design with wireframes and UI/UX, development using agile sprints, testing and quality assurance, deployment, and ongoing support and maintenance.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "What technologies do you work with?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "We work with a wide range of technologies including frontend frameworks such as React, Angular and Vue.js; backend technologies like Node.js, Python, .NET, Java and PHP; mobile platforms including React Native, Flutter, Swift and Kotlin; databases such as MySQL, PostgreSQL, MongoDB and Firebase; cloud platforms like AWS, Azure and Google Cloud; and DevOps tools including Docker, Kubernetes and Jenkins.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "How long does it take to build a software product?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Project timelines depend on complexity. Small projects typically take 4 to 8 weeks, medium projects take around 2 to 4 months, and large systems may take 6 months or more.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "How much does it cost to develop software?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "The cost of software development varies based on project scope, features and technologies used. A detailed quotation is provided after understanding specific project requirements.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Do you offer post-launch support and maintenance?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes, we provide ongoing post-launch support and maintenance services including bug fixes, system upgrades and feature enhancements.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Can you work with our in-house team?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes, we can collaborate with your in-house team for development, consultation, or staff augmentation based on your project needs.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Do you offer NDA and IP protection?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes, we sign non-disclosure agreements and ensure full intellectual property rights are transferred upon project completion as per contract terms. Customer data safety is a top priority.",
                      },
                    },
                  ],
                }),
              }}
            />
          )}
        </Helmet> */}

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
}

export default Questionaires
