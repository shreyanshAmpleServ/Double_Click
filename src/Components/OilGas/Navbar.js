"use client"

import Image from "../../Assests/Hero-Image.png"
import { Button } from "Shared/Customs"
export default function NavBar() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="DCC Logo" width={40} height={40} />
          <div>
            <h1 className="text-base font-bold text-gray-900">DCC Oil & Gas</h1>
            <p className="text-xs text-gray-600 -mt-0.5">SAP Solutions</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="hover:shadow">
            Schedule Demo
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow">
            Request Quote
          </Button>
        </div>
      </div>
    </nav>
  )
}
