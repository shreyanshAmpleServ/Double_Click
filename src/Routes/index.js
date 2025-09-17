import Questionaires from "Components/Aboutus/Questionaires"
import Layout from "Layout"
import AboutUs from "Pages/AboutUs"
import Blogs from "Pages/Blogs"
import Contact from "Pages/Contact"
import Home from "Pages/Home/Home"
import Menus from "Pages/Menu"
import Services from "Pages/Service"
import NoDataFound from "Shared/NoDataFound"
import { BrowserRouter, Route, Routes } from "react-router-dom"

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
  { id: 7, path: "*", component: <NoDataFound />, navItem: "None" },
]

const RouterProvider = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}

export default RouterProvider
