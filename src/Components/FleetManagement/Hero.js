import React from "react"
import { ArrowRight } from "lucide-react"
import { Button, Container } from "Shared/Customs"
import RequestQuoteModal from "Pages/ReqQuote"
// import bg2 from "../../Assests/Content/07/breadcrumbs_bg.jpg"
import bg2 from "../../Assests/fleetCover.png"

const Hero = () => {
  return (
    <section
      style={{ backgroundImage: `url(${bg2})` }}
      className="relative overflow-hidden bg-cover opacity-90 bg-center bg-no-repeat"
    >
      {/* <section className="relative overflow-hidden gradient-blue-teal"> */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-400/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-teal-400/40 blur-3xl" />
      <Container className="relative z-10 py-28 text-center bg-opacity-75 !max-w-full bg-black text-white">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-gray-100 text-black px-4 py-2 text-sm font-semibold">
          SAP Business One & S/4HANA
        </span>
        <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          Best Fleet Management Solutions With Real-Time GPS Tracking
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg !text-white/90">
          DCC Logistics Suite Next Gen services include virtual management of Vehicle Registration, Trip Planning,
          Checklist Compliance, GPS Monitoring, Return Load, Demurrage Prevention, Expense Control, and more.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            className="!text-[#d70552] !bg-white"
            variant="light"
            onClick={() => document.getElementById("request-quote")?.click()}
          >
            Schedule Demo <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
          >
            Learn More
          </Button>
        </div>
      </Container>
    </section>
  )
}
export default Hero
