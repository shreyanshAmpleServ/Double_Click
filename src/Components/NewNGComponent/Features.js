import { CheckBoxOutlined, CheckBoxRounded, CheckCircleOutline } from "@mui/icons-material"
import { motion } from "framer-motion"
import { Truck, Globe, Activity, Warehouse, CreditCard, Zap, Check } from "lucide-react"

const featureData = [
  {
    icon: Truck,
    title: "Fleet Management",
    desc: "Real-time tracking and optimization for your entire fleet.",
    items: [
      "Route Management",
      "Tyre & Fuel Management",
      "Maintenance & Workshop",
      "Driver Management",
      "Insurance Management",
    ],
  },
  {
    icon: Globe,
    title: "Clearing & Forwarding",
    desc: "Streamlined customs and freight forwarding operations.",
    items: ["Customs Declaration", "Clearing Management", "Port & Vessel Tracking", "Vehicle Planning & Allocation"],
  },
  {
    icon: Activity,
    title: "CFS & ICD Solution",
    desc: "Integrated container station and inland depot handling.",
    items: ["Yard Capacity Management", "Gate Pass Control", "Truck & Cargo In/Out", "Stripping & Stuffing"],
  },
  {
    icon: Warehouse,
    title: "Warehouse Management",
    desc: "Advanced inventory tracking and storage optimization.",
    items: [
      "Multi-Warehouse Control",
      "Bin Location Management",
      "Stock Counting & Adjustments",
      "Storage & Rent Billing",
    ],
  },
  {
    icon: CreditCard,
    title: "Financial Integration",
    desc: "Seamless data flow with SAP and other ERP solutions.",
    items: [
      "SAP Business One Sync",
      "Real-time Financial Tracking",
      "Automated Reconciliation",
      "GL Accounting Integration",
    ],
  },
  {
    icon: Zap,
    title: "AI-Powered Insights",
    desc: "Predictive intelligence for proactive decision making.",
    items: ["Predictive Maintenance", "Demand Forecasting", "Risk Assessment Heatmaps", "Automated Workflows"],
  },
]
export function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="w-[90%] md:w-[90%] lg:w-[85%] mx-auto ">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Comprehensive Logistics Ecosystem</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            A unified platform designed to handle every aspect of modern logistics and supply chain management.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featureData.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border bg-white p-8 shadow-sm hover:shadow-md transition"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                <card.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{card.desc}</p>
              <ul className="space-y-2 text-sm !pl-0 text-gray-700">
                {card.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircleOutline className="!h-4 !w-4" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
