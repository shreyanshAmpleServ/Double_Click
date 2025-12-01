import React from "react"
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Globe,
  Lock,
  Mail,
  Package,
  Phone,
  Smartphone,
  Users,
  Zap,
} from "lucide-react"
import { Button, Card } from "Shared/Customs"

export default function Warehousing() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="!min-h-screen !bg-white">
      <nav className="!fixed !top-0 !w-full !bg-white !bg-opacity-95 !backdrop-blur-sm !z-50 !border-b !border-gray-200">
        <div className="!max-w-7xl !mx-auto !px-4 sm:!px-6 lg:!px-8 !py-4 !flex !items-center !justify-between">
          <div className="!flex !items-center !gap-3">
            <img src="/images/logo.png" alt="DoubleClick WMS" width={40} height={40} className="!w-10 !h-10" />
            <span className="!font-semibold !text-lg !text-gray-900">DoubleClick WMS</span>
          </div>

          <div className="!hidden md:!flex !items-center !gap-8">
            <button
              onClick={() => scrollToSection("features")}
              className="!text-gray-600 hover:!text-gray-900 !transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("benefits")}
              className="!text-gray-600 hover:!text-gray-900 !transition-colors"
            >
              Benefits
            </button>
            <button
              onClick={() => scrollToSection("dashboards")}
              className="!text-gray-600 hover:!text-gray-900 !transition-colors"
            >
              Dashboards
            </button>
            <button
              onClick={() => scrollToSection("kpis")}
              className="!text-gray-600 hover:!text-gray-900 !transition-colors"
            >
              KPIs
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="!text-gray-600 hover:!text-gray-900 !transition-colors"
            >
              Contact
            </button>
          </div>

          <Button onClick={() => scrollToSection("contact")} className="!bg-blue-600 hover:!bg-blue-700 !text-white">
            Book a Demo
          </Button>
        </div>
      </nav>

      <section className="!pt-12 !pb-20 !px-4 sm:!px-6 lg:!px-8 !relative !overflow-hidden">
        <div className="!absolute !inset-0 !-z-10">
          <img src="/images/hero-bg.png" alt="Hero Background" className="!w-full !h-full !object-cover" />
          <div className="!absolute !inset-0 !bg-gradient-to-r !from-white !opacity-80 !to-white"></div>
        </div>

        <div className="!max-w-7xl !mx-auto">
          <div className="!grid md:!grid-cols-2 !gap-12 !items-center">
            <div className="!space-y-6">
              <span className="!inline-flex !items-center !gap-2 !rounded-full !bg-blue-100 !text-blue-700 !px-1.5 !py-1 !text-xs !font-semibold !w-fit">
                Next-Generation WMS
              </span>

              <h1 className="!text-5xl md:!text-6xl !font-bold !text-gray-900 !leading-tight">
                Transform Your Warehouse Into a Competitive Advantage
              </h1>

              <p className="!text-xl !text-gray-600 !leading-relaxed">
                Complete visibility, precision control, and real-time data for cost-effective and agile warehouse
                operations across bonded and unbonded facilities.
              </p>

              <div className="!flex !flex-col sm:!flex-row !gap-4 !pt-4">
                <button
                  onClick={() => document.getElementById("request-quote")?.click()}
                  className="!bg-blue-600 !flex !items-center hover:!bg-blue-700 !rounded-lg !px-6 !py-2 !text-white !font-semibold !text-lg"
                >
                  Book a Demo <ArrowRight className="!ml-2 !w-5 !h-5" />
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="!border-2 !rounded-lg !px-6 !py-2 !text-black !font-semibold !text-lg"
                >
                  Learn More
                </button>
              </div>

              <div className="!grid !grid-cols-3 !gap-4 !pt-8">
                <div>
                  <p className="!text-3xl !font-bold !text-blue-600">99%</p>
                  <p className="!text-sm !text-gray-600">Inventory Accuracy</p>
                </div>
                <div>
                  <p className="!text-3xl !font-bold !text-blue-600">60%</p>
                  <p className="!text-sm !text-gray-600">Faster Dispatch</p>
                </div>
                <div>
                  <p className="!text-3xl !font-bold !text-blue-600">30%</p>
                  <p className="!text-sm !text-gray-600">Space Savings</p>
                </div>
              </div>
            </div>

            <div className="!hidden md:!flex !justify-center">
              <div className="!relative !w-full !h-96">
                <img
                  src="/images/logo.png"
                  alt="WMS System"
                  width={300}
                  height={300}
                  className="!w-full !h-full !object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="!py-20 !px-4 sm:!px-6 lg:!px-8 !bg-gray-50">
        <div className="!max-w-7xl !mx-auto">
          <div className="!text-center !mb-16">
            <h2 className="!text-4xl !mt-2 md:!text-5xl !font-bold !text-gray-900 !mb-4">
              Powerful Features for Modern Warehousing
            </h2>
            <p className="!text-xl !text-gray-600 !max-w-2xl !mx-auto">
              Everything you need to manage complex warehouse operations with precision and efficiency
            </p>
          </div>

          <div className="!grid md:!grid-cols-2 lg:!grid-cols-3 !gap-8">
            <Card className="!p-6 hover:!shadow-lg !transition-shadow">
              <div className="!w-12 !h-12 !bg-blue-100 !rounded-lg !flex !items-center !justify-center !mb-4">
                <Package className="!w-6 !h-6 !text-blue-600" />
              </div>
              <h3 className="!text-xl !my-0 !font-semibold !text-gray-900 !mb-2">Inbound & Outbound Management</h3>
              <p className="!text-gray-600">
                Capture, validate, and manage sales/purchase-linked warehouse orders with complete traceability
              </p>
            </Card>

            <Card className="!p-6 hover:!shadow-lg !transition-shadow">
              <div className="!w-12 !h-12 !bg-blue-100 !rounded-lg !flex !items-center !justify-center !mb-4">
                <Zap className="!w-6 !h-6 !text-blue-600" />
              </div>
              <h3 className="!text-xl !my-0 !font-semibold !text-gray-900 !mb-2">Real-Time Bin-Level Inventory</h3>
              <p className="!text-gray-600">
                Track goods at bin, rack, and zone level in real-time with RFID and barcode scanning
              </p>
            </Card>

            <Card className="!p-6 hover:!shadow-lg !transition-shadow">
              <div className="!w-12 !h-12 !bg-blue-100 !rounded-lg !flex !items-center !justify-center !mb-4">
                <BarChart3 className="!w-6 !h-6 !text-blue-600" />
              </div>
              <h3 className="!text-xl !my-0 !font-semibold !text-gray-900 !mb-2">Yard Planning & Slot Allocation</h3>
              <p className="!text-gray-600">
                Assign optimal slots for inbound and outbound shipments with intelligent algorithms
              </p>
            </Card>

            <Card className="!p-6 hover:!shadow-lg !transition-shadow">
              <div className="!w-12 !h-12 !bg-blue-100 !rounded-lg !flex !items-center !justify-center !mb-4">
                <Lock className="!w-6 !h-6 !text-blue-600" />
              </div>
              <h3 className="!text-xl !my-0 !font-semibold !text-gray-900 !mb-2">Bonded & Unbonded Storage</h3>
              <p className="!text-gray-600">
                Manage customs-bonded inventory with complete audit trail and compliance tracking
              </p>
            </Card>

            <Card className="!p-6 hover:!shadow-lg !transition-shadow">
              <div className="!w-12 !h-12 !bg-blue-100 !rounded-lg !flex !items-center !justify-center !mb-4">
                <Smartphone className="!w-6 !h-6 !text-blue-600" />
              </div>
              <h3 className="!text-xl !my-0 !font-semibold !text-gray-900 !mb-2">Vehicle Scheduling & Dispatch</h3>
              <p className="!text-gray-600">
                Real-time visibility for dispatch readiness and intelligent route assignments
              </p>
            </Card>

            <Card className="!p-6 hover:!shadow-lg !transition-shadow">
              <div className="!w-12 !h-12 !bg-blue-100 !rounded-lg !flex !items-center !justify-center !mb-4">
                <Users className="!w-6 !h-6 !text-blue-600" />
              </div>
              <h3 className="!text-xl !my-0 !font-semibold !text-gray-900 !mb-2">Repacking & Value-Add Services</h3>
              <p className="!text-gray-600">
                Convert bulk to retail units, perform bundling, labeling, and kitting operations
              </p>
            </Card>
          </div>

          <div className="!mt-12 !grid md:!grid-cols-2 !gap-6">
            <div className="!space-y-4">
              <h3 className="!text-2xl !font-bold !text-gray-900">More Capabilities</h3>
              <ul className="!space-y-3 !p-0">
                <li className="!flex !items-start !gap-3">
                  <CheckCircle2 className="!w-5 !h-5 !text-blue-600 !mt-0.5 !flex-shrink-0" />
                  <span className="!text-gray-700">Gate Entry & Exit Control with seamless workflows</span>
                </li>
                <li className="!flex !items-start !gap-3">
                  <CheckCircle2 className="!w-5 !h-5 !text-blue-600 !mt-0.5 !flex-shrink-0" />
                  <span className="!text-gray-700">Configurable putaway and FIFO/LIFO/FEFO picking</span>
                </li>
                <li className="!flex !items-start !gap-3">
                  <CheckCircle2 className="!w-5 !h-5 !text-blue-600 !mt-0.5 !flex-shrink-0" />
                  <span className="!text-gray-700">Automated storage charge calculation</span>
                </li>
                <li className="!flex !items-start !gap-3">
                  <CheckCircle2 className="!w-5 !h-5 !text-blue-600 !mt-0.5 !flex-shrink-0" />
                  <span className="!text-gray-700">Multi-container cargo handling support</span>
                </li>
              </ul>
            </div>
            <div className="!space-y-4">
              <h3 className="!text-2xl !font-bold !text-gray-900">System Integrations</h3>
              <ul className="!space-y-3 !p-0">
                <li className="!flex !items-start !gap-3">
                  <CheckCircle2 className="!w-5 !h-5 !text-blue-600 !mt-0.5 !flex-shrink-0" />
                  <span className="!text-gray-700">Port systems and customs integration</span>
                </li>
                <li className="!flex !items-start !gap-3">
                  <CheckCircle2 className="!w-5 !h-5 !text-blue-600 !mt-0.5 !flex-shrink-0" />
                  <span className="!text-gray-700">ERP system connectivity</span>
                </li>
                <li className="!flex !items-start !gap-3">
                  <CheckCircle2 className="!w-5 !h-5 !text-blue-600 !mt-0.5 !flex-shrink-0" />
                  <span className="!text-gray-700">GPS and real-time tracking</span>
                </li>
                <li className="!flex !items-start !gap-3">
                  <CheckCircle2 className="!w-5 !h-5 !text-blue-600 !mt-0.5 !flex-shrink-0" />
                  <span className="!text-gray-700">Automated data exchange protocols</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="!py-20 !px-4 sm:!px-6 lg:!px-8">
        <div className="!max-w-7xl !mx-auto">
          <div className="!text-center !mb-16">
            <h2 className="!text-4xl !mt-2 md:!text-5xl !font-bold !text-gray-900 !mb-4">Why Choose Our WMS?</h2>
            <p className="!text-xl !text-gray-600 !max-w-2xl !mx-auto">
              Proven results that transform warehouse operations and drive competitive advantage
            </p>
          </div>

          <div className="!grid md:!grid-cols-2 !gap-12">
            <div className="!space-y-4">
              <div className="!flex !items-start !gap-4">
                <div className="!w-12 !h-12 !bg-blue-600 !rounded-lg !flex !items-center !justify-center !flex-shrink-0">
                  <span className="!text-white !font-bold !text-lg">99%</span>
                </div>
                <div>
                  <h3 className="!text-xl !my-0 !font-semibold !text-gray-900">Inventory Accuracy</h3>
                  <p className="!text-gray-600 !mt-2">
                    RFID and real-time bin tracking ensure near-perfect inventory accuracy, eliminating costly
                    discrepancies
                  </p>
                </div>
              </div>
            </div>

            <div className="!space-y-4">
              <div className="!flex !items-start !gap-4">
                <div className="!w-12 !h-12 !bg-blue-600 !rounded-lg !flex !items-center !justify-center !flex-shrink-0">
                  <span className="!text-white !font-bold !text-lg">60%</span>
                </div>
                <div>
                  <h3 className="!text-xl !my-0 !font-semibold !text-gray-900">Faster Dispatch</h3>
                  <p className="!text-gray-600 !mt-2">
                    Intelligent scheduling reduces dispatch delays by up to 60%, improving customer satisfaction
                  </p>
                </div>
              </div>
            </div>

            <div className="!space-y-4">
              <div className="!flex !items-start !gap-4">
                <div className="!w-12 !h-12 !bg-blue-600 !rounded-lg !flex !items-center !justify-center !flex-shrink-0">
                  <span className="!text-white !font-bold !text-lg">30%</span>
                </div>
                <div>
                  <h3 className="!text-xl !my-0 !font-semibold !text-gray-900">Space Optimization</h3>
                  <p className="!text-gray-600 !mt-2">
                    Optimized storage planning leads to 30% space savings, reducing operational costs
                  </p>
                </div>
              </div>
            </div>

            <div className="!space-y-4">
              <div className="!flex !items-start !gap-4">
                <div className="!w-12 !h-12 !bg-blue-600 !rounded-lg !flex !items-center !justify-center !flex-shrink-0">
                  <Globe className="!w-6 !h-6 !text-white" />
                </div>
                <div>
                  <h3 className="!text-xl !my-0 !font-semibold !text-gray-900">Compliance Ready</h3>
                  <p className="!text-gray-600 !mt-2">
                    Integrated bonded cargo compliance with complete audit trails for regulatory requirements
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="!mt-16 !bg-blue-50 !rounded-xl !p-8 !border !border-blue-200">
            <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4">Flexible Deployment</h3>
            <p className="!text-gray-700 !mb-6">
              Modular architecture supports single warehouse or multi-location setups, scaling with your business needs
            </p>
            <div className="!grid md:!grid-cols-3 !gap-6">
              <div className="!bg-white !rounded-lg !p-4">
                <p className="!font-semibold !text-gray-900">Single Warehouse</p>
                <p className="!text-sm !text-gray-600 !mt-2">Perfect for standalone operations</p>
              </div>
              <div className="!bg-white !rounded-lg !p-4">
                <p className="!font-semibold !text-gray-900">Integrated Supply Chain</p>
                <p className="!text-sm !text-gray-600 !mt-2">Multi-facility coordination</p>
              </div>
              <div className="!bg-white !rounded-lg !p-4">
                <p className="!font-semibold !text-gray-900">Client-Dedicated Hub</p>
                <p className="!text-sm !text-gray-600 !mt-2">Specialized storage solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="dashboards" className="!py-20 !px-4 sm:!px-6 lg:!px-8 !bg-gray-50">
        <div className="!max-w-7xl !mx-auto">
          <div className="!text-center !mb-16">
            <h2 className="!text-4xl !mt-2 md:!text-5xl !font-bold !text-gray-900 !mb-4">
              Real-Time Dashboard & Analytics
            </h2>
            <p className="!text-xl !text-gray-600 !max-w-2xl !mx-auto">
              Comprehensive visualization of your warehouse operations with live metrics and actionable insights
            </p>
          </div>

          <div className="!mb-12 !rounded-xl shadow !overflow-hidden">
            <img src="/images/dashboard2.png" alt="WMS Dashboard" className="!w-full !h-auto" />
          </div>

          <div className="!grid md:!grid-cols-4 !gap-6 !mb-12">
            <Card className="!p-6 !bg-gradient-to-br !from-green-50 !to-green-100 !border-green-200">
              <div className="!flex !items-center !justify-between">
                <div>
                  <p className="!text-sm !font-medium !text-green-700">Orders to Pick</p>
                  <p className="!text-4xl !font-bold !text-green-600 !mt-2">322</p>
                </div>
                <Package className="!w-12 !h-12 !text-green-400 !opacity-50" />
              </div>
            </Card>

            <Card className="!p-6 !bg-gradient-to-br !from-red-50 !to-red-100 !border-red-200">
              <div className="!flex !items-center !justify-between">
                <div>
                  <p className="!text-sm !font-medium !text-red-700">Orders Delayed</p>
                  <p className="!text-4xl !font-bold !text-red-600 !mt-2">32</p>
                </div>
                <AlertCircle className="!w-12 !h-12 !text-red-400 !opacity-50" />
              </div>
            </Card>

            <Card className="!p-6 !bg-gradient-to-br !from-blue-50 !to-blue-100 !border-blue-200">
              <div className="!flex !items-center !justify-between">
                <div>
                  <p className="!text-sm !font-medium !text-blue-700">Inventory Accuracy</p>
                  <p className="!text-4xl !font-bold !text-blue-600 !mt-2">99.9%</p>
                </div>
                <CheckCircle2 className="!w-12 !h-12 !text-blue-400 !opacity-50" />
              </div>
            </Card>

            <Card className="!p-6 !bg-gradient-to-br !from-emerald-50 !to-emerald-100 !border-emerald-200">
              <div className="!flex !items-center !justify-between">
                <div>
                  <p className="!text-sm !font-medium !text-emerald-700">Urgency Rate</p>
                  <p className="!text-4xl !font-bold !text-emerald-600 !mt-2">99.8%</p>
                </div>
                <Zap className="!w-12 !h-12 !text-emerald-400 !opacity-50" />
              </div>
            </Card>
          </div>

          <div className="!grid md:!grid-cols-2 !gap-8">
            <div className="!space-y-4">
              <h3 className="!text-2xl !font-bold !text-gray-900">Dashboard Capabilities</h3>
              <ul className="!space-y-3 !p-0">
                <li className="!flex !items-start !gap-3">
                  <CheckCircle2 className="!w-5 !h-5 !text-blue-600 !mt-0.5 !flex-shrink-0" />
                  <span className="!text-gray-700">
                    <strong>Inbound & Outbound Activity</strong> - Real-time order tracking and trends
                  </span>
                </li>
                <li className="!flex !items-start !gap-3">
                  <CheckCircle2 className="!w-5 !h-5 !text-blue-600 !mt-0.5 !flex-shrink-0" />
                  <span className="!text-gray-700">
                    <strong>Inventory by Category</strong> - Pie charts showing stock distribution
                  </span>
                </li>
                <li className="!flex !items-start !gap-3">
                  <CheckCircle2 className="!w-5 !h-5 !text-blue-600 !mt-0.5 !flex-shrink-0" />
                  <span className="!text-gray-700">
                    <strong>Receiving & Putaway Productivity</strong> - Monthly performance metrics
                  </span>
                </li>
                <li className="!flex !items-start !gap-3">
                  <CheckCircle2 className="!w-5 !h-5 !text-blue-600 !mt-0.5 !flex-shrink-0" />
                  <span className="!text-gray-700">
                    <strong>Picking Heatmap</strong> - Visual representation of picking patterns
                  </span>
                </li>
              </ul>
            </div>
            <div className="!space-y-4">
              <h3 className="!text-2xl !font-bold !text-gray-900">Advanced Analytics</h3>
              <ul className="!space-y-3 !p-0">
                <li className="!flex !items-start !gap-3">
                  <CheckCircle2 className="!w-5 !h-5 !text-blue-600 !mt-0.5 !flex-shrink-0" />
                  <span className="!text-gray-700">
                    <strong>Stock Levels</strong> - Real-time inventory by SKU and location
                  </span>
                </li>
                <li className="!flex !items-start !gap-3">
                  <CheckCircle2 className="!w-5 !h-5 !text-blue-600 !mt-0.5 !flex-shrink-0" />
                  <span className="!text-gray-700">
                    <strong>Shipments by Carrier</strong> - Performance tracking by logistics partner
                  </span>
                </li>
                <li className="!flex !items-start !gap-3">
                  <CheckCircle2 className="!w-5 !h-5 !text-blue-600 !mt-0.5 !flex-shrink-0" />
                  <span className="!text-gray-700">
                    <strong>Return Rate Analysis</strong> - Identify issues by reason code
                  </span>
                </li>
                <li className="!flex !items-start !gap-3">
                  <CheckCircle2 className="!w-5 !h-5 !text-blue-600 !mt-0.5 !flex-shrink-0" />
                  <span className="!text-gray-700">
                    <strong>Custom Reports</strong> - Build your own metrics and KPIs
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="kpis" className="!py-20 !px-4 sm:!px-6 lg:!px-8">
        <div className="!max-w-7xl !mx-auto">
          <div className="!text-center !mb-16">
            <h2 className="!text-4xl !mt-2 md:!text-5xl !font-bold !text-gray-900 !mb-4">
              Comprehensive KPIs & Metrics
            </h2>
            <p className="!text-xl !text-gray-600 !max-w-2xl !mx-auto">
              Real-time insights to drive data-informed decisions
            </p>
          </div>

          <div className="!grid md:!grid-cols-2 lg:!grid-cols-3 !gap-6">
            {[
              "Real-time inventory accuracy by item/bin/zone",
              "Inbound & outbound order turnaround time",
              "Daily/Weekly receipts and dispatch heatmap",
              "Aging stock report by expiry/project/SKU",
              "Top customers by volume, revenue, and space",
              "Storage charge revenue vs cost heatmap",
              "Bonded vs Unbonded cargo dashboard",
              "Task completion metrics for warehouse team",
              "Vehicle wait time at gate vs dock",
            ].map((kpi, index) => (
              <Card key={index} className="!p-6">
                <div className="!flex !items-start !gap-3">
                  <BarChart3 className="!w-5 !h-5 !text-blue-600 !mt-1 !flex-shrink-0" />
                  <p className="!text-gray-700 !font-medium">{kpi}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="!py-20 !px-4 sm:!px-6 lg:!px-8 !bg-gray-50">
        <div className="!max-w-4xl !mx-auto">
          <div className="!text-center !mb-12">
            <h2 className="!text-4xl !mt-2 md:!text-5xl !font-bold !text-gray-900 !mb-4">
              Ready to Transform Your Warehouse?
            </h2>
            <p className="!text-xl !text-gray-600">
              Experience next-generation warehouse intelligence with our fully integrated WMS module
            </p>
          </div>

          <div className="!grid md:!grid-cols-3 !gap-8 !mb-12">
            <Card className="!p-8 !text-center hover:!shadow-lg !transition-shadow">
              <div className="!w-12 !h-12 !bg-blue-100 !rounded-lg !flex !items-center !justify-center !mx-auto !mb-4">
                <Smartphone className="!w-6 !h-6 !text-blue-600" />
              </div>
              <h3 className="!text-xl !my-0 !font-semibold !text-gray-900 !mb-2">Book a Demo</h3>
              <p className="!text-gray-600 !mb-4">See our WMS in action with a personalized demonstration</p>
              <button
                onClick={() => document.getElementById("request-quote")?.click()}
                className="!w-full text-white rounded-lg !bg-blue-600 hover:!bg-blue-700 !px-8 !py-2 !font-semibold"
              >
                Schedule Demo
              </button>
            </Card>

            <Card className="!p-8 !text-center hover:!shadow-lg !transition-shadow">
              <div className="!w-12 !h-12 !bg-blue-100 !rounded-lg !flex !items-center !justify-center !mx-auto !mb-4">
                <Mail className="!w-6 !h-6 !text-blue-600" />
              </div>
              <h3 className="!text-xl !my-0 !font-semibold !text-gray-900 !mb-2">Email Us</h3>
              <p className="!text-gray-600 !mb-4">Get in touch with our sales team</p>
              <a href="mailto:sales@doubleclick.co.tz" className="!text-blue-600 hover:!text-blue-700 !font-semibold">
                sales@doubleclick.co.tz
              </a>
            </Card>

            <Card className="!p-8 !text-center hover:!shadow-lg !transition-shadow">
              <div className="!w-12 !h-12 !bg-blue-100 !rounded-lg !flex !items-center !justify-center !mx-auto !mb-4">
                <Phone className="!w-6 !h-6 !text-blue-600" />
              </div>
              <h3 className="!text-xl !my-0 !font-semibold !text-gray-900 !mb-2">Call Us</h3>
              <p className="!text-gray-600 !mb-4">Speak directly with our team</p>
              <a href="tel:+255" className="!text-blue-600 hover:!text-blue-700 !font-semibold">
                Contact Sales
              </a>
            </Card>
          </div>

          <div className="!bg-gradient-to-r !from-blue-600 !to-blue-700 !rounded-xl !p-12 !text-center !text-white">
            <h3 className="!text-3xl !font-bold !mb-4">Transform Your Warehouse Today</h3>
            <p className="!text-lg !mb-8 !text-white !opacity-90">
              Join leading logistics companies using our WMS for competitive advantage
            </p>
            <button
              onClick={() => document.getElementById("request-quote")?.click()}
              className="!bg-white rounded-lg !text-blue-600 hover:!bg-gray-100 !px-8 !py-2 !text-lg !font-semibold"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
