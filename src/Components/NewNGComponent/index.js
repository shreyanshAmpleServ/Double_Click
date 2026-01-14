import { CTA } from "./CTA"
import { Features } from "./Features"
import { Hero } from "./Hero"
import { Stats } from "./Stats"
import { WhyDCC } from "./WhtDCC"

export default function NGLogistics() {
  return (
    <div className="font-sans text-gray-900">
      {/* <Navbar /> */}
      <Hero />
      <Stats />
      <Features />
      <WhyDCC />
      <CTA />
      {/* <Footer /> */}
    </div>
  )
}
