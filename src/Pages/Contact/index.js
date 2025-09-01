import ContactForm from "Components/Contact/ContactForm"
import Section1 from "Components/Contact/Section1"
import { useEffect } from "react"
import { Helmet } from "react-helmet-async"
import Loader from "Shared/Loader"
import logo from "../../Assests/Content/logo_footer.png"

const Contact = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])
  return (
    <>
      <Helmet>
        <title>DoubleClick - ContactUs</title>
        <meta name="ContactUs" content="This page is Contact us page of Double click cunsulting." />
        <meta
          name="keywords"
          content="Contact DoubleClick, IT consulting, digital solutions, support, DoubleClick contact"
        />
        <meta property="og:title" content="Contact Us | DoubleClick Consulting" />
        <meta
          property="og:description"
          content="Reach out to DoubleClick Consulting for business solutions and expert advice tailored to your needs."
        />
        <meta name="title" content="Contact Us | DoubleClick Consulting" />
        <meta
          name="description"
          content="Reach out to DoubleClick Consulting for business solutions and expert advice tailored to your needs."
        />
        <meta property="og:image" content={logo} />
      </Helmet>
      {/* {isLoading && <div className="fixed h-[100vh] w-[100vw] z-50 bg-black bg-opacity-85 flex justify-center items-center"> <Loader /></div>} */}

      <div className="w-[100vw] min-h-[73vh] min-w-[320px] !bg-white max-w-screen-2xl mx-auto overflow-hidden">
        <Section1 />
        <ContactForm />
      </div>
    </>
  )
}
export default Contact
