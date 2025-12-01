import React, { useState } from "react"
import { Menu, X, Download, ArrowRight, CheckCircle, BarChart3, TrendingUp, PieChart, BarChart4 } from "lucide-react"

export default function ICDCFS() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  return (
    <div className="!min-h-screen !bg-white">
      <nav className="!fixed !top-0 !w-full !bg-white !shadow-sm !z-50">
        <div className="!max-w-7xl !mx-auto !px-4 sm:!px-6 lg:!px-8">
          <div className="!flex !justify-between !items-center !h-16">
            <div className="!flex !items-center !space-x-2">
              <div className="!w-8 !h-8 !bg-blue-600 !rounded-lg !flex !items-center !justify-center">
                <span className="!text-white !font-bold !text-sm">DCC</span>
              </div>
              <span className="!font-semibold !text-gray-900">DCC Logistics</span>
            </div>

            <div className="!hidden md:!flex !items-center !space-x-8">
              <button
                onClick={() => scrollToSection("features")}
                className="!text-gray-600 hover:!text-gray-900 !text-sm !font-medium"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("benefits")}
                className="!text-gray-600 hover:!text-gray-900 !text-sm !font-medium"
              >
                Benefits
              </button>
              <button
                onClick={() => scrollToSection("kpis")}
                className="!text-gray-600 hover:!text-gray-900 !text-sm !font-medium"
              >
                KPIs
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="!text-gray-600 hover:!text-gray-900 !text-sm !font-medium"
              >
                Contact
              </button>
              <a
                href="/dcc-cfs-landing-react.tar.gz"
                className="!flex !items-center !space-x-2 !text-blue-600 hover:!text-blue-700 !text-sm !font-medium"
              >
                <Download size={16} />
                <span>Download React</span>
              </a>
              <button className="!bg-blue-600 !text-white !px-6 !py-2 !rounded-lg hover:!bg-blue-700 !text-sm !font-medium">
                Book a Demo
              </button>
            </div>

            <div className="md:!hidden !flex !items-center !space-x-4">
              <a href="/dcc-cfs-landing-react.tar.gz" className="!text-blue-600 hover:!text-blue-700">
                <Download size={20} />
              </a>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="!text-gray-600">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:!hidden !pb-4 !space-y-3">
              <button
                onClick={() => scrollToSection("features")}
                className="!block !w-full !text-left !text-gray-600 hover:!text-gray-900 !py-2 !text-sm"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("benefits")}
                className="!block !w-full !text-left !text-gray-600 hover:!text-gray-900 !py-2 !text-sm"
              >
                Benefits
              </button>
              <button
                onClick={() => scrollToSection("kpis")}
                className="!block !w-full !text-left !text-gray-600 hover:!text-gray-900 !py-2 !text-sm"
              >
                KPIs
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="!block !w-full !text-left !text-gray-600 hover:!text-gray-900 !py-2 !text-sm"
              >
                Contact
              </button>
              <button className="!w-full !bg-blue-600 !text-white !px-4 !py-2 !rounded-lg hover:!bg-blue-700 !text-sm !font-medium">
                Book a Demo
              </button>
            </div>
          )}
        </div>
      </nav>

      <section className="!pt-32 !pb-20 !px-4 sm:!px-6 lg:!px-8 !bg-gradient-to-br !from-blue-600 !via-blue-500 !to-blue-700 !text-white !relative !overflow-hidden">
        <div className="!absolute !inset-0 !opacity-10">
          <div className="!absolute !top-0 !right-0 !w-96 !h-96 !bg-white !rounded-full !mix-blend-multiply !filter !blur-3xl"></div>
          <div className="!absolute !bottom-0 !left-0 !w-96 !h-96 !bg-white !rounded-full !mix-blend-multiply !filter !blur-3xl"></div>
        </div>

        <div className="!max-w-6xl !mx-auto !relative !z-10">
          <div className="!inline-block !bg-white !bg-opacity-20 !backdrop-blur-sm !px-4 !py-2 !rounded-full !mb-6">
            <span className="!text-sm !font-medium">Enterprise CFS/ICD Solution</span>
          </div>

          <h1 className="!text-5xl md:!text-6xl !font-bold !mb-6 lg:!max-w-4xl !leading-tight">
            Streamline CFS/ICD Operations
          </h1>

          <p className="!text-xl !text-blue-100 !mb-8 !leading-relaxed lg:!max-w-4xl">
            DCC Logistics Suite NG offers intelligent, automation-driven CFS and ICD Management designed for seamless
            handling of cargo movement, bonded/unbonded warehousing, and gate-to-gate operations across African and MEA
            logistics ecosystems.
          </p>

          <button
            onClick={() => document.getElementById("request-quote")?.click()}
            className="!bg-white !text-blue-600 !px-8 !py-4 !rounded-lg !font-semibold hover:!bg-blue-50 !transition !flex !items-center !space-x-2 !group"
          >
            <span className="!text-blue-600">Book a Demo Now</span>
            <ArrowRight size={20} className="!group-hover:!translate-x-1 !transition" />
          </button>

          <div className="!grid !grid-cols-3 !gap-8 !mt-16">
            <div>
              <div className="!text-4xl !font-bold !mb-2">99%</div>
              <div className="!text-blue-100">Demurrage Reduction</div>
            </div>
            <div>
              <div className="!text-4xl !font-bold !mb-2">60%</div>
              <div className="!text-blue-100">Faster Turnaround</div>
            </div>
            <div>
              <div className="!text-4xl !font-bold !mb-2">100%</div>
              <div className="!text-blue-100">Customs Compliant</div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="!py-20 !px-4 sm:!px-6 lg:!px-8 !bg-gray-50">
        <div className="!max-w-6xl !mx-auto">
          <div className="!text-center !mb-16">
            <div className="!inline-block !bg-blue-100 !text-blue-600 !px-4 !py-2 !rounded-full !mb-4 !text-sm !font-medium">
              Key Features
            </div>
            <h2 className="!text-4xl !font-bold !text-gray-900 !mb-4">Comprehensive CFS/ICD Management</h2>
            <p className="!text-xl !text-gray-600">
              Complete lifecycle management from gate-in to empty container return with integrated scanning and RFID
              support
            </p>
          </div>

          <div className="!grid md:!grid-cols-3 !gap-8 !mb-8">
            {[
              {
                icon: "📋",
                title: "Centralized Order & Booking",
                desc: "Create and manage customer orders with linked bookings, real-time GatePass tracking, and secure gate operations.",
              },
              {
                icon: "📦",
                title: "Smart Cargo Handling",
                desc: "Systematic container receiving, stripping, pre-allocation planning, and stuffing execution with real-time stock validation.",
              },
              {
                icon: "📊",
                title: "Intelligent Stock Management",
                desc: "Handle stock delivery, adjustments, transfers, and pack/re-pack workflows with auto-calculated storage charges.",
              },
              {
                icon: "🔒",
                title: "Container Lifecycle & Maintenance",
                desc: "Track empty container returns, rental containers, maintenance tasks, and container history with automatic allocation.",
              },
              {
                icon: "⚡",
                title: "Real-Time Container Tracking",
                desc: "View container slot allocation, stacking, and yard location in real-time with RFID/Barcode scanning integration.",
              },
              {
                icon: "🌐",
                title: "Integrated Customs & Port Sync",
                desc: "Connect with Port Community Systems, Customs EDI, and Shipping Lines for automated container status updates.",
              },
            ].map((feature, idx) => (
              <div key={idx} className="!bg-white !p-8 !rounded-xl !shadow-sm hover:!shadow-md !transition">
                <div className="!text-4xl !mb-4">{feature.icon}</div>
                <h3 className="!text-xl !font-semibold !text-gray-900 !mb-3">{feature.title}</h3>
                <p className="!text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="!grid md:!grid-cols-2 !gap-8">
            <div className="!bg-white !p-8 !rounded-xl !shadow-sm">
              <h3 className="!text-2xl !font-bold !text-gray-900 !mb-6 !flex !items-center !space-x-3">
                <span className="!text-2xl">📍</span>
                <span>Advanced Yard & Slot Allocation</span>
              </h3>
              <ul className="!space-y-4">
                <li className="!flex !items-start !space-x-3">
                  <CheckCircle size={20} className="!text-blue-600 !mt-1 !flex-shrink-0" />
                  <span className="!text-gray-700">Optimize storage slot usage with configurable yard layout</span>
                </li>
                <li className="!flex !items-start !space-x-3">
                  <CheckCircle size={20} className="!text-blue-600 !mt-1 !flex-shrink-0" />
                  <span className="!text-gray-700">
                    Rule-based allocation for dry, reefer, hazardous, and bonded zones
                  </span>
                </li>
                <li className="!flex !items-start !space-x-3">
                  <CheckCircle size={20} className="!text-blue-600 !mt-1 !flex-shrink-0" />
                  <span className="!text-gray-700">Maximize yard utilization and efficiency</span>
                </li>
              </ul>
            </div>

            <div className="!bg-white !p-8 !rounded-xl !shadow-sm">
              <h3 className="!text-2xl !font-bold !text-gray-900 !mb-6 !flex !items-center !space-x-3">
                <span className="!text-2xl">🚚</span>
                <span>Vehicle Scheduling & Dispatching</span>
              </h3>
              <ul className="!space-y-4">
                <li className="!flex !items-start !space-x-3">
                  <CheckCircle size={20} className="!text-blue-600 !mt-1 !flex-shrink-0" />
                  <span className="!text-gray-700">Allocate trucks based on delivery priority and cargo type</span>
                </li>
                <li className="!flex !items-start !space-x-3">
                  <CheckCircle size={20} className="!text-blue-600 !mt-1 !flex-shrink-0" />
                  <span className="!text-gray-700">Respect customer SLAs with intelligent scheduling</span>
                </li>
                <li className="!flex !items-start !space-x-3">
                  <CheckCircle size={20} className="!text-blue-600 !mt-1 !flex-shrink-0" />
                  <span className="!text-gray-700">Copy planning directly to Trip Orders for execution</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="!py-20 !px-4 sm:!px-6 lg:!px-8">
        <div className="!max-w-6xl !mx-auto">
          <div className="!text-center !mb-16">
            <div className="!inline-block !bg-blue-100 !text-blue-600 !px-4 !py-2 !rounded-full !mb-4 !text-sm !font-medium">
              Why Choose DCC
            </div>
            <h2 className="!text-4xl !font-bold !text-gray-900 !mb-4">Proven Results & Benefits</h2>
            <p className="!text-xl !text-gray-600">
              Transform your terminal or depot operations with automation, visibility, and compliance
            </p>
          </div>

          <div className="!grid md:!grid-cols-2 !gap-8 !mb-12">
            {[
              {
                stat: "99%",
                title: "Reduction in Demurrage Charges",
                desc: "With timely container tracking, alerts, and bonded cargo controls, significantly reduce detention costs and improve profitability.",
              },
              {
                stat: "60%",
                title: "Faster Yard Turnaround Time",
                desc: "Through smart slot allocation and vehicle dispatch optimization, dramatically improve operational efficiency.",
              },
              {
                stat: "100%",
                title: "Full Customs Compliance",
                desc: "Integrated with EDI and bonded warehousing documentation for seamless regulatory compliance and audit readiness.",
              },
              {
                stat: "∞",
                title: "Audit-Ready Operations",
                desc: "Every step from booking to final delivery is traceable and reportable with comprehensive audit trails.",
              },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="!bg-gradient-to-br !from-blue-50 !to-blue-100 !p-8 !rounded-xl !border !border-blue-200"
              >
                <div className="!flex !items-start !space-x-4">
                  <div className="!w-16 !h-16 !bg-blue-600 !rounded-lg !flex !items-center !justify-center !flex-shrink-0">
                    <span className="!text-2xl !font-bold !text-white">{benefit.stat}</span>
                  </div>
                  <div>
                    <h3 className="!text-xl !font-bold !text-gray-900 !mb-2">{benefit.title}</h3>
                    <p className="!text-gray-700">{benefit.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="!bg-white !border-2 !border-blue-200 !rounded-xl !p-8">
            <h3 className="!text-2xl !font-bold !text-gray-900 !mb-6">Seamless ERP Integration</h3>
            <p className="!text-gray-700 !mb-6">
              Specially designed for SAP S4HANA and SAP Business One, but can integrate with any ERP system. Covers
              complete lifecycle from Gate-In to Empty Container Return with integrated scanning and RFID support.
            </p>
            <div className="!flex !flex-wrap !gap-3">
              {[
                "SAP S4HANA",
                "SAP Business One",
                "Any ERP",
                "RFID Support",
                "Barcode Scanning",
                "Analytics & Insights",
              ].map((badge, idx) => (
                <span key={idx} className="!bg-blue-100 !text-blue-700 !px-4 !py-2 !rounded-full !text-sm !font-medium">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="dashboard" className="!py-20 !px-4 sm:!px-6 lg:!px-8 !bg-gray-50">
        <div className="!max-w-6xl !mx-auto">
          <div className="!text-center !mb-16">
            <div className="!inline-block !bg-blue-100 !text-blue-600 !px-4 !py-2 !rounded-full !mb-4 !text-sm !font-medium">
              Real-Time Analytics
            </div>
            <h2 className="!text-4xl !font-bold !text-gray-900 !mb-4">CFS/ICD Dashboard</h2>
            <p className="!text-xl !text-gray-600">
              Comprehensive visibility into your operations with real-time KPIs and analytics
            </p>
          </div>

          <div className="!bg-white !rounded-xl !shadow-lg !overflow-hidden">
            <div className="!bg-gradient-to-r !from-gray-800 !to-gray-900 !text-white !p-6 !flex !justify-between !items-center">
              <h3 className="!text-2xl !font-bold">CFS/ICD Dashboard</h3>
              <button className="!bg-blue-500 !text-white !px-6 !py-2 !rounded-lg hover:!bg-blue-600 !font-medium">
                Book a Demo
              </button>
            </div>

            <div className="!grid !grid-cols-2 md:!grid-cols-4 !gap-4 !p-6 !border-b">
              {[
                { icon: "📊", value: "96%", label: "Used Yard Capacity" },
                { icon: "⏱️", value: "83 min", label: "Avg Stripping Time" },
                { icon: "📡", value: "80%", label: "Utilization of RFID" },
                { icon: "⚠️", value: "12%", label: "Containers in Demurrage" },
              ].map((kpi, idx) => (
                <div key={idx} className="!bg-gray-50 !p-4 !rounded-lg !text-center">
                  <div className="!text-3xl !mb-2">{kpi.icon}</div>
                  <div className="!text-2xl !font-bold !text-gray-900">{kpi.value}</div>
                  <div className="!text-sm !text-gray-600 !mt-1">{kpi.label}</div>
                </div>
              ))}
            </div>

            <div className="!grid md:!grid-cols-2 !gap-6 !p-6">
              <div className="!border !rounded-lg !p-6">
                <h4 className="!font-bold !text-gray-900 !mb-4">Yard Capacity Usage Over Time</h4>
                <div className="!h-48 !bg-gradient-to-b !from-blue-50 !to-white !rounded !flex !items-end !justify-around !px-4 !py-4">
                  {[60, 50, 45, 50, 55, 60, 65, 70].map((height, idx) => (
                    <div key={idx} className="!flex !flex-col !items-center">
                      <div className="!w-6 !bg-teal-500 !rounded-t" style={{ height: `${height}px` }}></div>
                      <span className="!text-xs !text-gray-500 !mt-2">
                        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"][idx]}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="!flex !justify-center !gap-4 !mt-4 !text-sm">
                  <span className="!flex !items-center !gap-2">
                    <span className="!w-3 !h-3 !bg-teal-500 !rounded"></span>Yard Capacity Usage
                  </span>
                  <span className="!flex !items-center !gap-2">
                    <span className="!w-3 !h-3 !bg-gray-300 !rounded"></span>O3%
                  </span>
                </div>
              </div>

              <div className="!border !rounded-lg !p-6">
                <h4 className="!font-bold !text-gray-900 !mb-4">Container Throughput Trends</h4>
                <div className="!h-48 !bg-gradient-to-b !from-blue-50 !to-white !rounded !flex !items-end !justify-around !px-4 !py-4">
                  {[400, 300, 350, 300, 350, 400, 450, 400].map((height, idx) => (
                    <div key={idx} className="!flex !flex-col !items-center !gap-1">
                      <div className="!w-3 !bg-blue-500 !rounded-t" style={{ height: `${height / 10}px` }}></div>
                      <div
                        className="!w-3 !bg-orange-500 !rounded-t"
                        style={{ height: `${(height - 100) / 10}px` }}
                      ></div>
                      <span className="!text-xs !text-gray-500 !mt-2">
                        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"][idx]}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="!flex !justify-center !gap-4 !mt-4 !text-sm">
                  <span className="!flex !items-center !gap-2">
                    <span className="!w-3 !h-3 !bg-blue-500 !rounded"></span>Incoming
                  </span>
                  <span className="!flex !items-center !gap-2">
                    <span className="!w-3 !h-3 !bg-orange-500 !rounded"></span>Outgoing
                  </span>
                </div>
              </div>

              <div className="!border !rounded-lg !p-6">
                <h4 className="!font-bold !text-gray-900 !mb-4">Containers by Status</h4>
                <div className="!h-48 !bg-gradient-to-b !from-blue-50 !to-white !rounded !flex !items-end !justify-around !px-4 !py-4">
                  {[200, 300, 250, 200, 150].map((height, idx) => (
                    <div key={idx} className="!flex !flex-col !items-center">
                      <div className="!w-8 !bg-blue-600 !rounded-t" style={{ height: `${height / 2}px` }}></div>
                      <span className="!text-xs !text-gray-500 !mt-2 !text-center">
                        {["Shipped", "Stuffed", "Bonded", "Unstuffed", "Empty"][idx]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="!border !rounded-lg !p-6">
                <h4 className="!font-bold !text-gray-900 !mb-4">Top Storage Charges</h4>
                <div className="!space-y-3">
                  {[
                    { city: "Nairobi", value: 80 },
                    { city: "Mombasa", value: 60 },
                    { city: "Lusaka", value: 45 },
                    { city: "Harare", value: 35 },
                    { city: "Kampala", value: 25 },
                  ].map((item, idx) => (
                    <div key={idx} className="!flex !items-center !gap-3">
                      <span className="!text-sm !font-medium !text-gray-700 !w-20">{item.city}</span>
                      <div
                        className="!flex-1 !bg-orange-200 !rounded-full !h-6 !relative"
                        style={{ width: `${item.value}px` }}
                      >
                        <div
                          className="!bg-orange-500 !h-full !rounded-full"
                          style={{ width: `${item.value}px` }}
                        ></div>
                      </div>
                      <span className="!text-sm !text-gray-600">0k - ${item.value * 50}k</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="!border !rounded-lg !p-6">
                <h4 className="!font-bold !text-gray-900 !mb-4">Real-Time Container Tracking</h4>
                <div className="!flex !flex-col !items-center">
                  <div
                    className="!relative !w-40 !h-40 !rounded-full !flex !items-center !justify-center"
                    style={{
                      background: "conic-gradient(from 0deg, #2563eb 0deg, #14b8a6 180deg, #2563eb 360deg)",
                    }}
                  >
                    <div className="!w-32 !h-32 !bg-white !rounded-full !flex !items-center !justify-center">
                      <div className="!text-center">
                        <div className="!text-2xl !font-bold !text-blue-600">72%</div>
                        <div className="!text-xs !text-gray-600">Slot Allocation</div>
                      </div>
                    </div>
                  </div>
                  <div className="!mt-6 !space-y-2 !text-sm">
                    <div className="!flex !items-center !gap-2">
                      <span className="!w-3 !h-3 !bg-blue-600 !rounded"></span>
                      <span>Used lott</span>
                    </div>
                    <div className="!flex !items-center !gap-2">
                      <span className="!w-3 !h-3 !bg-teal-500 !rounded"></span>
                      <span>Available</span>
                    </div>
                    <div className="!flex !items-center !gap-2">
                      <span className="!w-3 !h-3 !bg-gray-300 !rounded"></span>
                      <span>Reserved</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="kpis" className="!py-20 !px-4 sm:!px-6 lg:!px-8">
        <div className="!max-w-6xl !mx-auto">
          <div className="!text-center !mb-16">
            <div className="!inline-block !bg-blue-100 !text-blue-600 !px-4 !py-2 !rounded-full !mb-4 !text-sm !font-medium">
              Analytics & Insights
            </div>
            <h2 className="!text-4xl !font-bold !text-gray-900 !mb-4">KPI Dashboards & Analytics</h2>
            <p className="!text-xl !text-gray-600">
              Real-time visibility into your operations with comprehensive reporting and analytics
            </p>
          </div>

          <div className="!grid md:!grid-cols-3 !gap-8">
            {[
              {
                icon: "⏱️",
                title: "Gate-to-Gate Cycle Time",
                items: ["Entry to Exit time per container", "Bottleneck identification by stage"],
              },
              {
                icon: "📦",
                title: "Storage Utilization",
                items: ["Occupancy by yard/block", "Storage revenue vs grace days"],
              },
              {
                icon: "📊",
                title: "Container Status Monitoring",
                items: ["In-Yard, In-Demurrage status", "Stuffed, Ready-to-Load tracking"],
              },
              {
                icon: "⚠️",
                title: "Delay & Exception Alerts",
                items: ["Pending for Stuffing/Delivery", "Delay beyond free days alerts"],
              },
              {
                icon: "🚚",
                title: "Vehicle Scheduling Efficiency",
                items: ["Planned vs Actual dispatch", "Timeline performance metrics"],
              },
              {
                icon: "🔄",
                title: "Container Lifecycle KPI",
                items: ["Empty container return days", "Container idle time tracking"],
              },
            ].map((kpi, idx) => (
              <div
                key={idx}
                className="!bg-white !p-8 !rounded-xl !shadow-sm hover:!shadow-md !transition !border !border-gray-100"
              >
                <div className="!text-4xl !mb-4">{kpi.icon}</div>
                <h3 className="!text-xl !font-bold !text-gray-900 !mb-4">{kpi.title}</h3>
                <ul className="!space-y-3">
                  {kpi.items.map((item, i) => (
                    <li key={i} className="!flex !items-start !space-x-3">
                      <CheckCircle size={16} className="!text-blue-600 !mt-1 !flex-shrink-0" />
                      <span className="!text-gray-600 !text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="!py-20 !px-4 sm:!px-6 lg:!px-8 !bg-gray-50">
        <div className="!max-w-6xl !mx-auto">
          <div className="!text-center !mb-16">
            <div className="!inline-block !bg-blue-100 !text-blue-600 !px-4 !py-2 !rounded-full !mb-4 !text-sm !font-medium">
              Real-World Impact
            </div>
            <h2 className="!text-4xl !font-bold !text-gray-900 !mb-4">Use Case Highlights</h2>
          </div>

          <div className="!grid md:!grid-cols-2 !gap-8">
            {[
              {
                icon: "⚓",
                title: "Port-Based CFS Operations",
                desc: "Manage high-volume container operations at port facilities with real-time tracking, automated gate operations, and seamless integration with port authority systems.",
                features: [
                  "Vessel schedule synchronization",
                  "Automated customs clearance",
                  "Peak capacity management",
                ],
              },
              {
                icon: "🏭",
                title: "Inland Depot Management",
                desc: "Optimize inland container depot operations with efficient cargo handling, bonded warehouse management, and streamlined transport coordination.",
                features: ["Bonded cargo compliance", "Multi-location coordination", "Cost optimization"],
              },
            ].map((useCase, idx) => (
              <div key={idx} className="!bg-white !p-8 !rounded-xl !shadow-sm">
                <div className="!text-5xl !mb-4">{useCase.icon}</div>
                <h3 className="!text-2xl !font-bold !text-gray-900 !mb-3">{useCase.title}</h3>
                <p className="!text-gray-600 !mb-6">{useCase.desc}</p>
                <ul className="!space-y-3">
                  {useCase.features.map((feature, i) => (
                    <li key={i} className="!flex !items-center !space-x-3">
                      <CheckCircle size={18} className="!text-blue-600 !flex-shrink-0" />
                      <span className="!text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="!py-20 !px-4 sm:!px-6 lg:!px-8 !bg-gradient-to-r !from-blue-600 !to-blue-700 !text-white"
      >
        <div className="!max-w-4xl !mx-auto !text-center">
          <h2 className="!text-4xl !font-bold !mb-6">Ready to Transform Your Operations?</h2>
          <p className="!text-xl !text-blue-100 !mb-8">
            Experience the power of automation, visibility, and compliance in your CFS or ICD operation. Let our experts
            walk you through how DCC Logistics Suite NG can transform your terminal or depot management.
          </p>
          <button
            onClick={() => document.getElementById("request-quote")?.click()}
            className="!bg-white !text-blue-600 !px-8 !py-4 !rounded-lg !font-semibold hover:!bg-blue-50 !transition !flex !items-center !space-x-2 !group !mx-auto"
          >
            <span className="!text-blue-600">Book a Demo Now</span>
            <ArrowRight size={20} className="!group-hover:!translate-x-1 !transition" />
          </button>
        </div>
      </section>
    </div>
  )
}
