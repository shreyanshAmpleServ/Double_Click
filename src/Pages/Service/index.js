import Connections from "Components/Home/Connect"
import AboutSection from "Components/Services/AboutSection"
import Section1 from "Components/Services/Section1"
import CoreServices from "Components/Services/Services"
import { Helmet } from "react-helmet-async"

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
        <Section1 />
        {/* <ContactForm /> */}
        <AboutSection />
        <CoreServices />
        <Connections />
      </div>
    </>
  )
}
export default Services
