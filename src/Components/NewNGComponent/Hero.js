import { motion } from "framer-motion"
import dashbordImg from "Assests/dashboard-preview.png"
import { ArrowForward } from "@mui/icons-material"
export function Hero() {
  return (
    <section className="pt-10 pb-20 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="!text-4xl md:!text-[5rem] !leading-tight !font-bold !mx-auto lg:!w-[75%] mb-4"
      >
        DCC Business Suite Next Gen
      </motion.h1>
      <p className="max-w-3xl !text-base mx-auto text-gray-600 mb-8">
        The ultimate AI-driven logistics ecosystem. Automate operations, gain predictive insights, and scale your supply
        chain with unprecedented efficiency.
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => document.getElementById("request-quote")?.click()}
          className="bg-black text-white px-6 py-3 rounded-full"
        >
          Get Started <ArrowForward className="!text-base " />
        </button>
        <a href="/contact" className="border px-6 py-3 rounded-full">
          Contact Us
        </a>
      </div>
      <img
        src={dashbordImg}
        alt="Dashboard Preview"
        className="mt-12 mx-auto w-[90%] md:w-[90%] lg:w-[85%] shadow-2xl !rounded-3xl"
      />
    </section>
  )
}
