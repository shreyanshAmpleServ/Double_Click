import { motion } from "framer-motion"

export function WhyDCC() {
  return (
    <section className="py-28 bg-gray-50">
      <div className="w-[90%] md:w-[90%] lg:w-[85%] mx-auto  text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block mb-6"
        >
          <span className="px-4 py-1 text-xs font-semibold rounded-full bg-black text-white">Why DCC Next Gen?</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="!text-4xl md:!text-5xl !font-bold mb-6"
        >
          Transform your supply chain into <br className="hidden md:block" />
          an intelligent network.
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="!text-gray-600 !max-w-3xl !mx-auto !text-lg mb-16"
        >
          DCC Business Suite Next Gen is an AI-driven logistics platform built to automate operations, deliver
          predictive insights, and enable smarter decision-making. By integrating advanced analytics and machine
          learning, the suite helps logistics providers stay agile, efficient, and customer-focused.
        </motion.p>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {[
            {
              title: "Automate",
              desc: "Eliminate manual errors by automating routine operational tasks and complex workflows.",
            },
            {
              title: "Forecast",
              desc: "Stay ahead of the curve with AI-driven demand forecasting and personalized service delivery.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border bg-white p-10 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-4">{card.title}</h3>
              <p className="text-gray-600">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
