"use client"
import { ArrowRight } from "lucide-react"
import { Button, Section } from "Shared/Customs"
import Reveal from "./Reveal"
import { navigate } from "Shared/useNavigate"

export default function CTA() {
  return (
    <Section className="py-16 gradient-blue-teal">
      <div className="max-w-4xl mx-auto text-center text-white">
        <Reveal>
          <h3 className="text-3xl md:!text-4xl font-bold mb-4">Ready to Transform Your Operations?</h3>
          <p className="text-lg md:text-xl !text-white/80 mb-6">
            Schedule a personalized demo and see how DCC Oil & Gas solution can streamline your business
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/contact")}
              className="bg-white !text-blue-600 hover:!bg-gray-100"
            >
              Schedule Demo <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              onClick={() => document.getElementById("request-quote")?.click()}
              variant="outline"
              className="border-white text-white hover:bg-blue-700"
            >
              Request Quote
            </Button>
          </div>
          <p className="text-xs !text-white/80 mt-4">
            Questions? Contact us at sales@doubleclick.co.tz or +255-22-2112161
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
