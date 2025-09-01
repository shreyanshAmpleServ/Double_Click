import Connections from "Components/Home/Connect"
import Quotes from "Components/Home/Quote"
import QuotationSliders from "Components/Home/quoteSlider"
import Services from "Components/Home/Services"
import Sliders from "Components/Home/Slider"
import VideoSection from "Components/Home/Videos"
import { Helmet } from "react-helmet-async"
import logo from "../../Assests/Content/logo_footer.png"

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
        <Sliders />
        <Services />
        <VideoSection />
        <Quotes />
        <QuotationSliders />
        {/* <Posts /> */}
        <Connections />
      </div>
    </>
  )
}
export default Home
