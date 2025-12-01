"use client"

import { Section } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10">
      <Section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-semibold mb-3">DCC Oil & Gas</h4>
              <p className="text-sm">Enterprise SAP solutions for the energy sector</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Contact</h4>
              <p className="text-sm">sales@doubleclick.co.tz</p>
              <p className="text-sm">+255-22-2112161</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-xs">
            <p>© 2025 DCC Oil & Gas Solutions. All rights reserved. | SAP Gold Partner</p>
          </div>
        </div>
      </Section>
    </footer>
  )
}
