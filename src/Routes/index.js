import React, { lazy, Suspense } from "react"
import Layout from "Layout"
import Loader from "Shared/Loader"
import { BrowserRouter, Route, Routes } from "react-router-dom"

const Questionaires = lazy(() => import("Components/Aboutus/Questionaires"))
const SAPGlobalWebsite = lazy(() => import("Components/UKPage"))
const USSAPWebsite = lazy(() => import("Components/USPage"))
const SAPAfricaWebsite = lazy(() => import("Components/africanPage"))
const AboutUs = lazy(() => import("Pages/AboutUs"))
const Blogs = lazy(() => import("Pages/Blogs"))
const Contact = lazy(() => import("Pages/Contact"))
const Home = lazy(() => import("Pages/Home/Home"))
const Menus = lazy(() => import("Pages/Menu"))
const Services = lazy(() => import("Pages/Service"))
const NoDataFound = lazy(() => import("Shared/NoDataFound"))

export const routes = [
  { id: 1, path: "/", component: <Home />, navItem: "Home" },
  { id: 1, path: "/demo-videos.html", component: <Home />, navItem: "Home" },
  { id: 2, path: "/contact", component: <Contact />, navItem: "ContactUs" },
  { id: 2, path: "/contact_us.php", component: <Contact />, navItem: "Contact" },
  { id: 3, path: "/aboutus", component: <AboutUs />, navItem: "AboutUs" },
  { id: 3, path: "/about-us.html", component: <AboutUs />, navItem: "AboutUs" },
  { id: 3, path: "/overview.html", component: <AboutUs />, navItem: "AboutUs" },
  { id: 3, path: "/success_stories", component: <AboutUs />, navItem: "AboutUs" },
  { id: 3, path: "/aboutus/company-profile", component: <AboutUs />, navItem: "Company Profile" },
  { id: 3, path: "/aboutus/management-team", component: <AboutUs />, navItem: "Management Teams" },
  { id: 4, path: "/services", component: <Services />, navItem: "Services" },
  { id: 5, path: "/:menu/:submenu/:id", component: <Menus />, navItem: "Menus" },
  { id: 5, path: "/:menu/:submenu/:sub2menu/:id", component: <Menus />, navItem: "Menus" },
  { id: 5, path: "/:menu/:submenu/:sub2menu/:sub3menu/:id", component: <Menus />, navItem: "Menus" },
  { id: 5, path: "/:menu/:id", component: <Menus />, navItem: "Menus" },
  { id: 5, path: "/:id", component: <Menus />, navItem: "Menus" },
  { id: 5, path: "/post/:id", component: <Menus />, navItem: "Menus" },
  { id: 5, path: "/blogs", component: <Blogs />, navItem: "Blogs" },
  { id: 6, path: "/faq", component: <Questionaires />, navItem: "Questionair" },
  { id: 7, path: "/no-article-found", component: <NoDataFound />, navItem: "None" },
  { id: 7, path: "/sap-africa", component: <SAPAfricaWebsite />, navItem: "None" },
  { id: 7, path: "/en-za/sap-africa", component: <SAPAfricaWebsite />, navItem: "None" },
  { id: 7, path: "/sap-partner-in-africa", component: <SAPAfricaWebsite />, navItem: "None" },
  { id: 7, path: "/sap-usa", component: <USSAPWebsite />, navItem: "None" },
  { id: 7, path: "/en-us/sap-usa", component: <USSAPWebsite />, navItem: "None" },
  { id: 7, path: "/sap-uk", component: <SAPGlobalWebsite />, navItem: "None" },
  { id: 7, path: "/en-gb/sap-uk", component: <SAPGlobalWebsite />, navItem: "None" },
  { id: 7, path: "*", component: <NoDataFound />, navItem: "None" },
]

const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                key={route.id}
                path={route.path}
                element={
                  <Layout id={route.id} navLink={route.path} navItem={route.navItem} component={route.component} />
                }
              />
            )
          })}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default RouterProvider
