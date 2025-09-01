import Footer from "Shared/Footer"
import Header from "Shared/Header"
import React from "react"
import { Toaster } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

/**
 * Layout component
 * @param {Object} props - Component props
 * @param {React.JSX.Element} props.component - The main component to render
 * @param {string} props.navItem - The navigation item
 * @param {string} props.navLink - The navigation link
 * @param {string} props.id - The unique identifier
 */

export const Layout = ({ component, navItem, navLink, id }) => {
  const navigate = useNavigate()

  return (
    <div
      // style={{ backgroundColor: `rgba(${theme.button},0.1)` }}
      className=" flex w-[99.7vw] bg-cover bg-gray-200   gap-x-1"
    >
      <div id="headerId" className="relative flex w-[99vw]  !z-40 flex-col  h-full">
        <Header navItem={navItem} />
        <div className="!z-20  h-full !w-[99vw]">{component}</div>
        <Footer />
      </div>
      <Toaster />
    </div>
  )
}

export default Layout
