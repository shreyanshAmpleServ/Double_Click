import React from "react"

const Dashboard = () => {
  return (
    <section className="!py-20 !bg-gradient-to-b !from-gray-50 !to-white">
      <div className="!max-w-7xl !mx-auto !px-4 sm:!px-6 lg:!px-8">
        <div className="!text-center !mb-16">
          <h2 className="!text-4xl md:!text-5xl !font-bold !mb-4 !bg-gradient-to-r !from-blue-600 !to-cyan-600 !bg-clip-text !text-transparent">
            S/4HANA Public Cloud Dashboard
          </h2>
          <p className="!text-lg !text-gray-600 !max-w-3xl !mx-auto">
            Experience real-time insights and powerful analytics with SAP S/4HANA's intuitive dashboards. Monitor your
            business performance across all key metrics and make data-driven decisions instantly.
          </p>
        </div>

        <div className="!flex !justify-center !mb-12">
          <div className="!w-full !max-w-5xl">
            <div className="!bg-white !rounded-xl !shadow-2xl !overflow-hidden !border !border-gray-200">
              {/* Browser Chrome */}
              <div className="!bg-gray-800 !px-4 !py-3 !flex !items-center !gap-2">
                <div className="!w-3 !h-3 !rounded-full !bg-red-500"></div>
                <div className="!w-3 !h-3 !rounded-full !bg-yellow-500"></div>
                <div className="!w-3 !h-3 !rounded-full !bg-green-500"></div>
                <div className="!ml-4 !text-white !text-sm !font-medium !flex-1">
                  SAP S/4HANA Cloud - Analytics Dashboard
                </div>
              </div>

              {/* Dashboard Image */}
              <div className="!relative !w-full !bg-gray-100">
                <img src="/images/dashboard-sap-official.png" alt="SAP S/4HANA Dashboard" className="!w-full !h-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* Features Below Dashboard */}
        <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-8">
          <div className="!text-center">
            <div className="!w-12 !h-12 !rounded-lg !bg-blue-100 !flex !items-center !justify-center !mx-auto !mb-4">
              <svg className="!w-6 !h-6 !text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="!text-lg !font-semibold !text-gray-900 !mb-2">Real-Time Analytics</h3>
            <p className="!text-gray-600">
              Monitor KPIs and business metrics with live data updates across all departments
            </p>
          </div>

          <div className="!text-center">
            <div className="!w-12 !h-12 !rounded-lg !bg-green-100 !flex !items-center !justify-center !mx-auto !mb-4">
              <svg className="!w-6 !h-6 !text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="!text-lg !font-semibold !text-gray-900 !mb-2">Instant Insights</h3>
            <p className="!text-gray-600">
              Get actionable intelligence instantly with interactive visualizations and drill-down capabilities
            </p>
          </div>

          <div className="!text-center">
            <div className="!w-12 !h-12 !rounded-lg !bg-purple-100 !flex !items-center !justify-center !mx-auto !mb-4">
              <svg className="!w-6 !h-6 !text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <h3 className="!text-lg !font-semibold !text-gray-900 !mb-2">Fully Customizable</h3>
            <p className="!text-gray-600">
              Tailor dashboards to your specific business needs with flexible configuration options
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="!text-center !mt-12">
          <button
            onClick={() => document.getElementById("request-quote")?.click()}
            className="!bg-blue-600 hover:!bg-blue-700 !text-white !px-8 !py-3 !text-lg !rounded-lg !transition"
          >
            Request a Demo
          </button>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
