import { motion } from "framer-motion"

export function CTA() {
  return (
    <section className="py-24 bg-white">
      <div className="w-[90%] md:w-[90%] lg:w-[85%] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2.5rem] bg-black px-5 py-16 text-center text-white shadow-2xl"
        >
          {/* Glow effect */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_60%)]" />

          {/* Content */}
          <motion.h1
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="!text-4xl md:!text-[3.5rem] !leading-none !px-5 !font-bold !mb-4"
          >
            Ready to lead the next generation of logistics?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="!text-gray-50 !text-xl max-w-3xl mx-auto py-3 mb-8"
          >
            Experience the power of DCC Business Suite Next Gen. Schedule your personalized demo today.
          </motion.p>

          <motion.div
            onClick={() => document.getElementById("request-quote")?.click()}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 }}
          >
            <button className="rounded-full bg-white px-10 py-4 font-semibold text-black transition hover:scale-105">
              Request a Free Demo
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
