import React from "react"

// -----------------------------
// Dynamic data (edit this array)
// -----------------------------
const FEATURES = [
  {
    title: "Fuel Import Process Automation",
    points: [
      "Manages full fuel import lifecycle",
      "Integration with port customs and shipping data",
      "Tracks vessel discharge, customs clearing, and depot allocation",
    ],
  },
  {
    title: "Post Import Loan & LC Tracking",
    points: [
      "Monitor Post Import Loans (PiL) with maturity, interest & bank-wise reports",
      "Manage Letter of Credit (LC) lifecycle from issuance to closure",
      "Auto-link with GRNs and supplier bills",
    ],
  },
  {
    title: "Bank Guarantee Management",
    points: [
      "Track and manage all types of bank guarantees",
      "Auto-alerts on expiry and renewal dates",
      "Role-based access to financial guarantees",
    ],
  },
  {
    title: "Observed Quantity & Quantity at 20°C Tracking",
    points: [
      "Daily fuel measurement entries include temperature, density, DP",
      "Real‑time dashboards to observe Quantity and Normalized Quantity at 20°C",
      "Reconcile measurement stocks with system inventory",
    ],
  },
  {
    title: "Multi‑Depot & Loading Point Price List",
    points: [
      "Price lists defined by loading depot or geography",
      "Supports both local currency and foreign currency rate",
      "Depot‑wise discounts or surcharges based on region",
    ],
  },
  {
    title: "Open Tender Procurement (OTP)",
    points: [
      "Complete tender float‑to‑award workflow",
      "Supports multi‑supplier bidding, evaluation & approval",
      "Fully auditable for procurement transparency",
    ],
  },
  {
    title: "Service Station Management",
    points: [
      "Track sales & costs of each service station",
      "Integrated with fuel station automation & POS",
      "Consolidated dashboard of profitability & returns",
    ],
  },
  {
    title: "3rd Party Tank Inventory Management",
    points: [
      "Tank‑wise virtual inventory monitored",
      "Real‑time reconciliation of hosted vs physical stock",
      "Tank anomalies and loss/leak alerts",
    ],
  },
  {
    title: "Hospitality Stock & Rental Invoicing",
    points: [
      "Manage stocks consumed for hospitality usage (hotels/residences)",
      "Supports fixed‑term billing & breakage loss handling",
      "Consolidated statements for partners",
    ],
  },
  {
    title: "Cash & Credit Sale Management with Approvals",
    points: [
      "Separate workflows for cash vs credit sales",
      "Sale value approval for large discrepancies",
      "Auto‑generated invoices for collections & delivery",
    ],
  },
  {
    title: "Inventory Transfer Request (ITR) with Approval",
    points: [
      "Initiate ITR from any depot or plant",
      "Multi‑level approval configurable",
      "Tracks movement end‑to‑end until receipt",
    ],
  },
  {
    title: "Goods Issue / Receipt with In‑Transit Loss Handling",
    points: [
      "Manual or auto‑entry of fuel losses in transit",
      "Close against Reconciled Quantity vs Received Quantity",
      "Configurable thresholds for acceptable loss",
    ],
  },
]

// -----------------------------
// UI Components
// -----------------------------
const Badge = ({ index }) => {
  const label = String(index + 1).padStart(2, "0")
  return (
    // <div className=" ml-4 mb-1 w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center shadow-lg">
    <div className="relative w-24 h-24 rounded-full bg-transparent overflow-hidden flex items-center justify-center  group">
      {/* Right half filled */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gray-700"></div>

      <div
        aria-hidden
        className="absolute  w-16 h-16 rounded-full bg-gradient-to-br from-slate-400 to-slate-500  flex items-center justify-center group-hover:scale-110 transition-transform duration-300 text-white  place-items-center shadow-inner border border-gray-300"
      >
        <span className="text-3xl font-bold tracking-wider">{label}</span>
      </div>
    </div>
  )
}

const FeatureCard = ({ title, points, index }) => {
  return (
    <li
      style={{ borderRadius: "50px" }}
      className="group   h-full border relative overflow-hidden  !rounded-r-full  bg-gradient-to-r from-gray-50 to-gray-200 backdrop-blur-sm shadow-sm  ring-gray-200 hover:shadow-md transition-shadow"
    >
      <div className="flex items-stretch pl-4 ">
        {/* Left: content */}
        <div className="flex-1 pr-4">
          <h5 className="text-black  sm:text-xl font-semibold !my-0 leading-tight">{title}</h5>
          <ul className="my-0 space-y-0 !pl-0 text-sm sm:text-base text-gray-700">
            {points.map((p, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-gray-400" />
                <span className="text-xs">{p}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Right: circular number */}
        <div className="flex items-center">
          <Badge index={index} />
        </div>
      </div>
    </li>
  )
}

// -----------------------------
// Page
// -----------------------------
export default function FuelERPFeatures() {
  return (
    <main className="min-h-screen w-full bg-gray-50">
      <div className="mx-auto max-w-6xl   sm:px-6 lg:px-4 py-10 sm:py-14">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Fuel ERP Capabilities</h1>
          <p className="mt-2 text-gray-600">
            All sections below are rendered dynamically from a single array. Edit the <code>FEATURES</code> object to
            change content.
          </p>
        </header>

        <ul className="space-y-4  list-none !pl-0">
          {FEATURES.map((f, idx) => (
            <FeatureCard key={idx} index={idx} title={f.title} points={f.points} />
          ))}
        </ul>
      </div>
    </main>
  )
}
