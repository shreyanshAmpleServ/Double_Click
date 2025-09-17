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

const Home = () => {
  return (
    <>
      <Helmet>
        <title>DoubleClick - Home</title>
        <meta name="DoubleClick" content="This page is Home page of Double click cunsulting." />
        <meta
          name="keywords"
          content="Contact DoubleClick, IT consulting, digital solutions, support, DoubleClick contact"
        />
        <meta property="og:title" content="Home | DoubleClick Consulting" />
        <meta
          property="og:description"
          content="Reach out to DoubleClick Consulting for business solutions and expert advice tailored to your needs."
        />
        <meta property="title" content="Home | DoubleClick Consulting" />
        <meta
          property="description"
          content="Reach out to DoubleClick Consulting for business solutions and expert advice tailored to your needs."
        />
        <meta property="og:image" content={logo} />
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
