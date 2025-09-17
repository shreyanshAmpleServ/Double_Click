import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef, useState } from "react"
import { useQuery } from "react-query"
import { teamsServiceFn } from "Services/Home"
import dummy from "../../Assests/dummyLogo.jpg"

gsap.registerPlugin(ScrollTrigger)

const Teams = () => {
  const baseURL = process.env.REACT_APP_API_URL
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const leadershipCardsRef = useRef([])
  const teamCardsRef = useRef([])
  const [selectedMember, setSelectedMember] = useState(null)
  const modalRef = useRef(null)
  const modalContentRef = useRef(null)
  const modalImageRef = useRef(null)
  const modalTextRef = useRef(null)

  const { data: TeamsData, isLoading, refetch } = useQuery(["teams"], () => teamsServiceFn())

  // Modal opening animation
  useEffect(() => {
    if (selectedMember && modalRef.current) {
      // Set initial states
      gsap.set(modalRef.current, { opacity: 0 })
      gsap.set(modalContentRef.current, { scale: 0.7, opacity: 0, rotationY: 15 })
      gsap.set(modalImageRef.current, { scale: 1.3, opacity: 0, x: -50 })
      gsap.set(modalTextRef.current, { y: 30, opacity: 0 })

      // Animation timeline
      const tl = gsap.timeline()

      tl.to(modalRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      })
        .to(
          modalContentRef.current,
          {
            scale: 1,
            opacity: 1,
            rotationY: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.1"
        )
        .to(
          modalImageRef.current,
          {
            scale: 1,
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          modalTextRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.5"
        )
    }
  }, [selectedMember])

  // Modal closing animation
  const closeModal = () => {
    if (modalRef.current) {
      const tl = gsap.timeline({
        onComplete: () => setSelectedMember(null),
      })

      tl.to(modalTextRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      })
        .to(
          modalImageRef.current,
          {
            scale: 0.8,
            opacity: 0,
            x: -30,
            duration: 0.4,
            ease: "power2.in",
          },
          "-=0.2"
        )
        .to(
          modalContentRef.current,
          {
            scale: 0.7,
            opacity: 0,
            rotationY: -15,
            duration: 0.4,
            ease: "back.in(1.7)",
          },
          "-=0.3"
        )
        .to(
          modalRef.current,
          {
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
          },
          "-=0.2"
        )
    } else {
      setSelectedMember(null)
    }
  }

  useEffect(() => {
    if (!TeamsData?.data?.data || isLoading) return

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(titleRef.current, { y: -30, opacity: 0 })
      gsap.set(subtitleRef.current, { y: -20, opacity: 0 })
      gsap.set([...leadershipCardsRef.current, ...teamCardsRef.current], {
        y: 50,
        opacity: 0,
        scale: 0.95,
      })

      // Animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      })

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
        .to(
          leadershipCardsRef.current,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: {
              amount: 0.6,
              from: "start",
            },
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          teamCardsRef.current,
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
          "-=0.6"
        )

      // Hover animations
      const allCards = [...leadershipCardsRef.current, ...teamCardsRef.current]
      allCards.forEach((card) => {
        if (card) {
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -10,
              scale: 1.03,
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
              duration: 0.3,
              ease: "power2.out",
            })
          })

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              duration: 0.3,
              ease: "power2.out",
            })
          })
        }
      })
    }, sectionRef.current)

    return () => ctx.revert()
  }, [TeamsData, isLoading])

  const TeamCard = ({ item, index, isLeadership = false }) => {
    return (
      <div
        ref={(el) => (isLeadership ? (leadershipCardsRef.current[index] = el) : (teamCardsRef.current[index] = el))}
        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100"
        onClick={() => setSelectedMember(item)}
      >
        {/* Image Section */}
        <div className="relative overflow-hidden">
          <img
            src={item?.profile?.url ? baseURL + item?.profile?.url : dummy}
            alt={item?.name}
            className={`w-full object-fill transition-transform duration-500 group-hover:scale-105 ${
              isLeadership ? "h-80" : "h-64"
            }`}
          />

          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Info Icon - Only show if description exists */}
          {item?.description && (
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Text Section */}
        <div className={`text-center ${isLeadership ? "p-3" : "p-2"}`}>
          <h3 className={`font-bold text-gray-900 !mb-2 leading-tight ${isLeadership ? "text-xl" : "text-lg"}`}>
            {item?.name}
          </h3>
          <p
            className={`text-secondary font-semibold !mb-1 uppercase tracking-wide ${
              isLeadership ? "text-sm" : "text-xs"
            }`}
          >
            {item?.designation}
          </p>
          {/* Read More Button */}
          {item?.description && (
            <button className="mt-4 text-primary mx-auto font-semibold text-sm hover:text-primary/80 transition-colors duration-300 flex items-center">
              Read More
              <svg
                className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      <div ref={sectionRef} className="py-7 px-6 lg:px-16 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-primary/5 to-orange-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-primary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-1">
            <div
              ref={titleRef}
              className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold text-sm mb-2 uppercase tracking-wide"
            >
              FACE BEHIND DCC
            </div>
            <div ref={subtitleRef} className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Our Team
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-orange-500 mx-auto rounded-full"></div>
          </div>

          {/* Leadership Team - Top 3 */}
          {TeamsData?.data?.data?.length > 0 && (
            <div className="mb-8 mx-0 lg:mx-20">
              <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
                {TeamsData?.data?.data?.slice(0, 3).map((item, index) => (
                  <TeamCard key={`leadership-${index}`} item={item} index={index} isLeadership={true} />
                ))}
              </div>
            </div>
          )}

          {/* Team Members - 4 Column Layout */}
          {TeamsData?.data?.data?.length > 3 && (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {TeamsData?.data?.data?.slice(3).map((item, index) => (
                <TeamCard key={`team-${index}`} item={item} index={index} isLeadership={false} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Animated Modal */}
      {selectedMember && (
        <div
          ref={modalRef}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          style={{ zIndex: 9999 }}
          onClick={closeModal}
        >
          <div
            ref={modalContentRef}
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Perfect Modal Content */}
            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Image Section */}
                <div className="md:w-1/3">
                  <img
                    src={selectedMember?.profile?.url ? baseURL + selectedMember?.profile?.url : dummy}
                    alt={selectedMember?.name}
                    className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
                    ref={modalImageRef}
                  />
                </div>

                {/* Content Section */}
                <div className="md:w-2/3 flex flex-col justify-start" ref={modalTextRef}>
                  <h2 className="text-3xl font-bold text-gray-900 !mb-2">{selectedMember?.name}</h2>

                  <p className="text-primary font-semibold text-lg !mb-3 uppercase tracking-wide">
                    {selectedMember?.designation}
                  </p>

                  <div className="space-y-4">
                    <p className="text-gray-700 !text-sm leading-relaxed">
                      {selectedMember?.description ||
                        "This team member is an integral part of our organization, bringing valuable expertise and dedication to their role. They contribute significantly to our team's success and help drive our mission forward."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS animations */}
      <style jsx>{`
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}

export default Teams
