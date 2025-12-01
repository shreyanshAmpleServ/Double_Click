import React, { useLayoutEffect, useRef, useMemo, useState } from "react"
import { CheckCircle2 } from "lucide-react"
import { Container, Section } from "Shared/Customs"
import { REPORTS } from "Helpers/datas"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const Reports = () => {
  const rootRef = useRef(null)
  const [q, setQ] = useState("")

  useLayoutEffect(() => {
    if (!rootRef.current) return
    const ctx = gsap.context(() => {
      // heading entrance (tight + snappy)
      gsap.from("[data-rp-title], [data-rp-sub]", {
        opacity: 0,
        y: 14,
        duration: 0.45,
        ease: "power2.out",
        stagger: 0.06,
        scrollTrigger: { trigger: rootRef.current, start: "top 80%" },
      })

      // list items cascade
      gsap.from("[data-rp-item]", {
        opacity: 0,
        x: -10,
        duration: 0.35,
        ease: "power2.out",
        stagger: 0.045,
        scrollTrigger: { trigger: rootRef.current, start: "top 78%" },
      })

      // info panel
      gsap.from("[data-rp-panel]", {
        opacity: 0,
        y: 16,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  const filtered = useMemo(() => {
    if (!q.trim()) return REPORTS
    const s = q.toLowerCase()
    return REPORTS.filter((r) => r.toLowerCase().includes(s))
  }, [q])

  return (
    <Section id="reports" className="relative overflow-hidden">
      {/* very soft background wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 45% at 50% 0%, rgba(59,130,246,0.10) 0%, rgba(59,130,246,0.06) 35%, rgba(20,184,166,0.05) 65%, transparent 100%)",
        }}
      />

      <Container>
        <div ref={rootRef}>
          <div className="text-center mb-10">
            <h2 data-rp-title className="text-3xl md:text-4xl font-bold mb-2">
              Comprehensive Reporting Suite
            </h2>
            <p data-rp-sub className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              Access powerful, configurable, SAP®-aligned reports delivering up-to-the-minute information.
            </p>

            {/* compact search filter (optional but handy) */}
            {/* <div className="mt-5 flex justify-center">
              <div className="relative w-full max-w-lg">
                <input
                  type="text"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search reports (e.g., P&L, route, driver)…"
                  className="w-full rounded-xl border border-gray-200 bg-white/90 backdrop-blur px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {q && (
                  <button
                    onClick={() => setQ("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700"
                  >
                    clear
                  </button>
                )}
              </div>
            </div> */}
          </div>

          {/* tighter grid + smaller tiles */}
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map((report) => (
              <div
                key={report}
                data-rp-item
                className="
                  group relative flex items-start gap-3 p-4 rounded-xl border
                  border-gray-200 bg-white/85 backdrop-blur-[2px]
                  shadow-sm hover:shadow-md transition-shadow
                "
              >
                {/* highlight layer that doesn't block hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: "linear-gradient(180deg, rgba(59,130,246,0.05) 0%, rgba(20,184,166,0.04) 100%)",
                  }}
                />
                <div className="relative mt-0.5 grid place-items-center">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 transition-transform duration-200 group-hover:scale-110" />
                </div>
                <span className="relative text-sm md:text-[15px] text-gray-700">
                  {report}
                  {/* underline grows on hover */}
                  <span className="pointer-events-none absolute left-0 -bottom-0.5 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-300 group-hover:w-full" />
                </span>
              </div>
            ))}
          </div>

          {/* empty state when searching */}
          {filtered.length === 0 && (
            <div className="mt-6 text-center text-sm text-gray-500">No reports match “{q}”.</div>
          )}

          <div data-rp-panel className="mt-10 p-6 md:p-8 bg-blue-50 rounded-2xl border border-blue-200 text-center">
            <p className="text-gray-700 text-sm md:text-base">
              <span className="font-semibold text-blue-700">And many more…</span> Covering operational metrics,
              financial analysis, and performance KPIs.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default Reports
