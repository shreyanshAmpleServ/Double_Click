import React from "react"
import { ArrowRight } from "lucide-react"
import { Button, Container } from "Shared/Customs"
import RequestQuoteModal from "Pages/ReqQuote"

const Hero = () => {
  return (
    <section className="relative overflow-hidden gradient-blue-teal">
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-400/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-teal-400/40 blur-3xl" />
      <Container className="relative z-10 py-28 text-center text-white">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold">
          SAP Business One & S/4HANA
        </span>
        <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          Transform Your Fleet Into a Data‑Driven Engine
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg !text-white/90">
          DCC Logistics Suite gives you real-time command over vehicles, trips, expenses, and workforce—on one powerful
          platform.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button variant="light" onClick={() => document.getElementById("request-quote")?.click()}>
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
