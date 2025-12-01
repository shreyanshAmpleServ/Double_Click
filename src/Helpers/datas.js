import {
  Truck,
  MapPin,
  BarChart3,
  Users,
  Wrench,
  Fuel,
  AlertCircle,
  TrendingUp,
  Clock,
  Shield,
  Zap,
} from "lucide-react"

export const FEATURES = [
  {
    icon: Truck,
    title: "Vehicle Registration & Allocation",
    description:
      "Digitally register vehicles with detailed specs, documents, and inspection schedules. Allocate based on load, fuel efficiency, and driver history.",
  },
  {
    icon: MapPin,
    title: "Trip Lifecycle Management",
    description:
      "Track each leg from loading to offloading with KPIs on turnaround time, stoppages, and delivery performance.",
  },
  {
    icon: AlertCircle,
    title: "Trip Release & Checklist Compliance",
    description:
      "Ensure no delivery goes unchecked with custom checklists for documents, cargo seal, driver briefing, and route planning.",
  },
  {
    icon: Clock,
    title: "Movement Monitoring & Border KPIs",
    description:
      "Visualize vehicle milestones with real-time alerts highlighting potential delays at loading bays, borders, and customer gates.",
  },
  {
    icon: TrendingUp,
    title: "Return Load & Container Management",
    description:
      "Optimize vehicle utilization with intelligent return load planning and automatic demurrage prevention.",
  },
  {
    icon: Fuel,
    title: "Trip Expenses & Billing Control",
    description:
      "Empower drivers to submit expenses via app with approval workflows, duplicate detection, and auto-linked billables.",
  },
  {
    icon: Users,
    title: "Driver & Performance Management",
    description:
      "Maintain complete driver profiles with license validity, trip assignments, POD uploads, and performance KPIs.",
  },
  {
    icon: Wrench,
    title: "Workshop & Job Card Automation",
    description:
      "Digitally inspect vehicles and raise job cards from the field. Track timesheet vs actual time and monitor mechanic productivity.",
  },
  {
    icon: Shield,
    title: "Spare Part Control & Approval Flow",
    description: "Track spare part requests with intelligent approval workflows that reduce misuse and costs.",
  },
  {
    icon: Zap,
    title: "Tyre Lifecycle Intelligence",
    description: "Track each tyre from purchase to scrap with retread history, lifespan analytics, and safety alerts.",
  },
  {
    icon: BarChart3,
    title: "Visual Dashboards & Analytics",
    description: "Gain clarity across vehicle, route, and trip performance with comprehensive real-time dashboards.",
  },
  {
    icon: TrendingUp,
    title: "Advanced MIS Reports",
    description:
      "Access comprehensive configurable reports for all aspects of fleet operations and performance metrics.",
  },
]

// ==========================================
// src/data/dashboards.js
// ==========================================
export const DASHBOARDS = [
  {
    title: "Trip Analytics Dashboard",
    items: ["Vehicle Running Trends", "Monthly Trips", "Delays Analysis", "Container Load Breakdown"],
  },
  {
    title: "Vehicle Performance",
    items: ["Outward/Inward Status", "Top 10 High Performers", "Top 10 Low Performers", "Utilization Metrics"],
  },
  {
    title: "Workshop Analysis",
    items: ["Breakdown vs Transit Repairs", "Frequent Job Items", "Technician Turnaround KPIs", "Cost Analysis"],
  },
  {
    title: "Tyre Analytics",
    items: ["Inventory by Brand", "Life Span Tracking", "CPK Post Retread", "Safety Alerts"],
  },
]

// ==========================================
// src/data/reports.js
// ==========================================
export const REPORTS = [
  "Revenue Analysis by Route & Customer",
  "Trip Analysis Report",
  "Daily Vehicle Position Report",
  "Monthly Trip Analysis",
  "Top 10 Customer Analysis",
  "Driver Performance Analysis",
  "Trip Movement Summary Report",
  "Job Card History",
  "Trip P&L / Route P&L / Vehicle P&L",
  "Trip Order / Shipment Order Report",
  "Vehicle Analysis by Vehicle",
  "Tire Movement Report",
  "Spare Parts Order History",
]
