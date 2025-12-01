"use client"

import Image from "../../Assests/Hero-Image.png"
import { ArrowRight } from "lucide-react"
import { Button, Section } from "Shared/Customs"
import Reveal from "./Reveal"

export default function Hero() {
  return (
    <Section className="bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <Reveal>
            <div>
              <h2 className="!text-4xl md:!text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Transform Your Oil & Gas Operations
              </h2>
              <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed">
                Streamline inventory, reduce costs, and gain real-time visibility across your entire supply chain with
                SAP Business One & S/4HANA solutions built for the energy sector.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => document.getElementById("request-quote")?.click()}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Schedule Demo <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-4">✓ 30-minute personalized demo • ✓ No credit card required</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="relative h-72 md:h-96 block">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-orange-400 rounded-2xl opacity-10" />
              <div className="absolute inset-0 flex items-center justify-center">
                {/* <Image src="/images/logo.png" alt="DCC Solution" width={280} height={280} /> */}
                <img
                  src={Image}
                  alt="Oil & Gas Solution"
                  width={280}
                  height={280}
                  className="relative w-full h-full  !rounded-2xl "
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
