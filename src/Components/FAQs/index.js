import { useState, useRef, useEffect } from "react"

// const faqData = [
//   {
//     id: 1,
//     question: "How do I get started with the platform?",
//     answer: {
//       id: 1,
//       body: [
//         {
//           type: "paragraph",
//           children: [
//             {
//               text: "Getting started is simple. Create your account, complete the onboarding checklist, and you'll be up and running within minutes. Our guided setup wizard will walk you through each step.",
//               type: "text",
//             },
//           ],
//         },
//       ],
//     },
//   },
//   {
//     id: 2,
//     question: "eqrwterty",
//     answer: {
//       id: 8,
//       body: [
//         {
//           type: "paragraph",
//           children: [{ text: "fgwfghwdfdsf", type: "text" }],
//         },
//       ],
//     },
//   },
//   {
//     id: 3,
//     question: "What payment methods do you accept?",
//     answer: {
//       id: 3,
//       body: [
//         {
//           type: "paragraph",
//           children: [
//             {
//               text: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for enterprise plans. All transactions are secured with 256-bit SSL encryption.",
//               type: "text",
//             },
//           ],
//         },
//       ],
//     },
//   },
//   {
//     id: 4,
//     question: "Can I cancel my subscription at any time?",
//     answer: {
//       id: 4,
//       body: [
//         {
//           type: "paragraph",
//           children: [
//             {
//               text: "Yes, absolutely. You can cancel your subscription at any time from your account settings. There are no cancellation fees and you'll retain access until the end of your billing period.",
//               type: "text",
//             },
//           ],
//         },
//       ],
//     },
//   },
//   {
//     id: 5,
//     question: "Is my data secure and private?",
//     answer: {
//       id: 5,
//       body: [
//         {
//           type: "paragraph",
//           children: [
//             {
//               text: "Data security is our top priority. We use industry-standard encryption, regular security audits, and are fully GDPR compliant. Your data is never shared with third parties.",
//               type: "text",
//             },
//           ],
//         },
//       ],
//     },
//   },
// ];

function renderBody(body) {
  return body.map((block, i) => {
    if (block.type === "paragraph") {
      return (
        <p key={i} style={{ margin: 0, lineHeight: "1.8" }}>
          {block.children.map((child, j) => (
            <span key={j}>{child.text}</span>
          ))}
        </p>
      )
    }
    return null
  })
}

function FAQItem({ faq, index, isOpen, onToggle }) {
  const contentRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  return (
    <div
      className={`mb-3 rounded-xl border transition-all duration-300 overflow-hidden relative
        ${
          isOpen
            ? "border-indigo-500 bg-indigo-50 shadow-lg"
            : "border-gray-200 bg-white hover:border-indigo-200 hover:bg-gray-50"
        }`}
    >
      {/* Left Accent Bar */}
      <div
        className={`absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-400 transition-transform duration-300
          ${isOpen ? "scale-y-100" : "scale-y-0"}
        `}
      />

      <button
        onClick={() => onToggle(faq.id)}
        className="w-full flex items-center justify-between gap-4 text-left px-6 py-3"
      >
        <div className="flex items-center gap-3">
          {/* Number badge */}
          <div
            className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-medium transition-all
              ${isOpen ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-600"}`}
          >
            {String(index + 1).padStart(2, "0")}
          </div>

          {/* Question */}
          <span
            className={`text-sm transition-all
              ${isOpen ? "!text-gray-900 !font-semibold" : "!text-gray-600"}
            `}
          >
            {faq.question}
          </span>
        </div>

        {/* Toggle Icon */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all
            ${isOpen ? "bg-indigo-500 text-white shadow-md" : "bg-gray-100 text-gray-400"}`}
        >
          <svg
            className={`transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
            width="14"
            height="14"
            viewBox="0 0 13 13"
            fill="none"
          >
            <line x1="6.5" y1="1" x2="6.5" y2="12" stroke="currentColor" strokeWidth="2" />
            <line x1="1" y1="6.5" x2="12" y2="6.5" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </button>

      {/* Animated Content */}
      <div style={{ height }} className="overflow-hidden transition-all duration-300">
        <div
          ref={contentRef}
          className={`px-6 pb-6 pl-16 text-sm leading-relaxed text-gray-500 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <p style={{ margin: 0, lineHeight: "1.8" }}>
            <span>{faq?.answer}</span>
          </p>
          {/* {renderBody(faq?.answer)} */}
        </div>
      </div>
    </div>
  )
}

export default function FAQAccordion({ faqs }) {
  const [openId, setOpenId] = useState(null)
  const [filter, setFilter] = useState("all")

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }



        .faq-wrapper {
          width: 100%;
          
          animation: fadeUp 0.55s cubic-bezier(0.4,0,0.2,1) forwards;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .faq-item-enter {
          animation: itemSlide 0.4s ease forwards;
          opacity: 0;
        }

        @keyframes itemSlide {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Soft decorative blobs */}
      {/* <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "-60px",
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "60%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,181,253,0.15) 0%, transparent 70%)",
          }}
        />
      </div> */}

      <div className="faq-wrapper px-[5%] mx-auto" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "44px", textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(99,102,241,0.08)",
              border: "1px solid rgba(99,102,241,0.7)",
              borderRadius: "100px",
              padding: "6px 16px",
              marginBottom: "18px",
            }}
          >
            <div
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #6366F1, #A78BFA)",
                boxShadow: "0 0 8px rgba(99,102,241,0.5)",
              }}
            />
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
                color: "#6366F1",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Help Center
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(28px, 5vw, 40px)",
              fontWeight: "800",
              color: "#1E1B4B",
              letterSpacing: "-0.03em",
              lineHeight: "1.15",
              marginBottom: "14px",
            }}
          >
            Frequently Asked{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6366F1 0%, #A78BFA 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Questions
            </span>
          </h1>
        </div>

        {/* Filter chips */}
        {/* <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "28px",
            flexWrap: "wrap",
          }}
        >
          {["all", "general", "billing", "security"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background: filter === f ? "linear-gradient(135deg, #6366F1, #A78BFA)" : "#fff",
                border: filter === f ? "none" : "1.5px solid #E5E7EB",
                borderRadius: "100px",
                padding: "7px 18px",
                cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "13px",
                fontWeight: "600",
                color: filter === f ? "#fff" : "#6B7280",
                letterSpacing: "0.01em",
                textTransform: "capitalize",
                transition: "all 0.25s ease",
                boxShadow: filter === f ? "0 4px 14px rgba(99,102,241,0.3)" : "none",
              }}
            >
              {f}
            </button>
          ))}
        </div> */}

        {/* FAQ Items */}
        <div>
          {faqs?.map((faq, index) => (
            <div key={faq.id} className="faq-item-enter" style={{ animationDelay: `${index * 0.07}s` }}>
              <FAQItem faq={faq} index={index} isOpen={openId === faq.id} onToggle={handleToggle} />
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div
          style={{
            textAlign: "center",
            marginTop: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <div style={{ height: "1px", width: "48px", background: "#E5E7EB" }} />
          <span
            // className="black"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              color: "#D1D5DB",
              letterSpacing: "0.08em",
            }}
          >
            {faqs?.length} QUESTIONS · CLICK TO EXPAND
          </span>
          <div style={{ height: "1px", width: "48px", background: "#E5E7EB" }} />
        </div>
      </div>
    </>
  )
}

// import { useState } from "react"
// import { ChevronDown } from "lucide-react"

// const FAQAccordion = ({ faqs }) => {
//   const [openIndex, setOpenIndex] = useState(null)

//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? null : index)
//   }

//   const renderAnswer = (body) => {
//     return body?.map((block, i) => {
//       if (block.type === "paragraph") {
//         return (
//           <p key={i} className="text-gray-600 mb-2">
//             {block.children?.map((child) => child.text).join("")}
//           </p>
//         )
//       }
//       return null
//     })
//   }

//   return (
//     <div className=" w-[100%] px-[5%] mx-auto space-y-3">
//       {faqs?.map((faq, index) => {
//         const isOpen = openIndex === index

//         return (
//           <div key={faq.id} className="border border-gray-200 rounded-xl bg-white shadow-sm">
//             <button
//               onClick={() => toggleFAQ(index)}
//               className="flex w-full items-center justify-between p-4 text-left font-medium"
//             >
//               <span className="!text-gray-800">{faq?.question}</span>

//               <ChevronDown className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} size={18} />
//             </button>

//             <div
//               className={`grid transition-all duration-300 ease-in-out ${
//                 isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
//               }`}
//             >
//               <div className="overflow-hidden">
//                 <div className="px-4 pb-4 text-sm">{renderAnswer(faq.answer?.body)}</div>
//               </div>
//             </div>
//           </div>
//         )
//       })}
//     </div>
//   )
// }

// export default FAQAccordion
