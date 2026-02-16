import Connections from "Components/Home/Connect"
import Quotes from "Components/Home/Quote"
import QuotationSliders from "Components/Home/quoteSlider"
import Services from "Components/Home/Services"
import Sliders from "Components/Home/Slider"
import VideoSection from "Components/Home/Videos"
import { Helmet } from "react-helmet-async"
import logo from "../../Assests/Content/logo_footer.png"
import Posts from "Components/Home/Posts"
import UponSliderService from "Components/Home/UponSlider"
import NewsletterSignup from "Components/Home/NewSletter"
import DoubleClickHero from "Components/Home/AboutSection"
import DoubleClickWebsite from "Components/Home/HeroSection"
import { useQuery } from "react-query"
import { contactSEOFn } from "Services/Home"

const Home = () => {
  const { data: contactData } = useQuery(["home-page-seo"], () => contactSEOFn("home-page-seo"))
  const seoData = contactData?.data?.data?.[0]?.seo

  return (
    <>
      <Helmet>
        <title>{seoData?.metaTitle ? seoData?.metaTitle : "DoubleClick - Home Page"}</title>
        <meta name="DoubleClick" content="This page is Home page of Double click cunsulting." />
        <meta
          name="keywords"
          content={
            seoData?.metakeywords
              ? seoData?.metakeywords
              : "Contact DoubleClick, IT consulting, digital solutions, support, DoubleClick contact ,SAP Business One & Cloud Solutions , Best SAP Consulting , Double Click"
          }
        />
        <meta
          property="og:title"
          content={
            seoData?.metaTitle
              ? seoData?.metaTitle
              : "SAP Business One & Cloud Solutions | Best SAP Consulting | Double Click"
          }
        />
        <meta
          property="og:description"
          content={
            seoData?.metaDescription
              ? seoData?.metaDescription
              : "Expert SAP consulting services, SAP Business One, payroll and HR solutions, business automation tools, and DCC cloud services are all provided by DCC. reliable SAP support company."
          }
        />
        <meta property="title" content={seoData?.metaTitle ? seoData?.metaTitle : "Home | DoubleClick Consulting"} />
        <meta
          name="description"
          content={
            seoData?.metaDescription
              ? seoData?.metaDescription
              : "Expert SAP consulting services, SAP Business One, payroll and HR solutions, business automation tools, and DCC cloud services are all provided by DCC. reliable SAP support company."
          }
        />
        <meta property="og:image" content={seoData?.shareImage ? seoData?.shareImage : logo} />
      </Helmet>
      <div className=" w-[100vw] min-h-[73vh] min-w-[320px] !bg-white max-w-screen-2xl mx-auto !overflow-hidden">
        {/* <Sliders />
        <UponSliderService /> */}
        {/* <DoubleClickHero /> */}
        <DoubleClickWebsite />
        <Services />
        <VideoSection />
        <NewsletterSignup />
        {/* <Quotes /> */}
        {/* <QuotationSliders /> */}
        <Posts />
        <Connections />
      </div>
    </>
  )
}
export default Home
