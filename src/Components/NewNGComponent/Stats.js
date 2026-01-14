import { motion } from "framer-motion"
export function Stats() {
  const stats = [
    { value: "99.9%", label: "Uptime Reliability" },
    { value: "24/7", label: "Real-time Tracking" },
    { value: "30%", label: "Fuel Efficiency Gain" },
    { value: "500+", label: "Fleets Managed" },
  ]

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s, i) => (
          <motion.div key={i} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }}>
            <div className="text-3xl font-bold">{s.value}</div>
            <div className="text-sm text-gray-500">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
