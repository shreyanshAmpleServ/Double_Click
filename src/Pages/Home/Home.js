import Connections from "Components/Home/Connect"
import Posts from "Components/Home/Posts"
import Quotes from "Components/Home/Quote"
import QuotationSliders from "Components/Home/quoteSlider"
import Services from "Components/Home/Services"
import Sliders from "Components/Home/Slider"
import VideoSection from "Components/Home/Videos"
import { Helmet } from "react-helmet-async"

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
          </Helmet>
      <div className=" w-[100vw] overflow-hidden">
        <Sliders />
        <Services />
        <VideoSection />
        <Quotes />
        <QuotationSliders />
        <Posts />
        <Connections />
      </div>
    </>
  )
}
export default Home
