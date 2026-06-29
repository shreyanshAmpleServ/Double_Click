import { Suspense, lazy } from "react"
import { Helmet } from "react-helmet-async"
import Loader from "Shared/Loader"

const Connections = lazy(() => import("Components/Home/Connect"))
const AboutSection = lazy(() => import("Components/Services/AboutSection"))
const Section1 = lazy(() => import("Components/Services/Section1"))
const CoreServices = lazy(() => import("Components/Services/Services"))

const Services = () => {
  return (
    <>
      <Helmet>
        <title>DoubleClick - Service</title>
        <meta name="Service" content="This page is Home page of Double click cunsulting." />
        <meta
          name="keywords"
          content="Contact DoubleClick, IT consulting, digital solutions, support, DoubleClick contact"
        />
        <meta property="og:title" content="Services | DoubleClick Consulting" />
        <meta
          property="og:description"
          content="Reach out to DoubleClick Consulting for business solutions and expert advice tailored to your needs."
        />
      </Helmet>
      <div className=" w-[100vw] overflow-hidden">
        <Suspense fallback={<Loader />}>
          <Section1 />
          <AboutSection />
          <CoreServices />
          <Connections />
        </Suspense>
      </div>
    </>
  )
}
export default Services
