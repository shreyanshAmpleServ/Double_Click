import Questionaires from "Components/Aboutus/Questionaires"
import Section1 from "Components/Aboutus/Section1"
import Teams from "Components/Aboutus/Teams"
import CoreValues from "Components/AboutUsNew/CoreValue"
import CTASection from "Components/AboutUsNew/CTASection"
import Differentiators from "Components/AboutUsNew/Differection"
import PartnershipsSection from "Components/AboutUsNew/PartnershipSection"
import VisionSection from "Components/AboutUsNew/Vision"
import DoubleClickHero from "Components/Home/AboutSection"
import Connections from "Components/Home/Connect"
import Quotes from "Components/Home/Quote"
import { Helmet } from "react-helmet-async"
import { useQuery } from "react-query"
import { useLocation } from "react-router-dom"
import { aboutServiceFn } from "Services/Home"
import Loader from "Shared/Loader"
import logo from "../../Assests/Content/logo_footer.png"
import FuelERPFeatures from "Components/OilGas"

const AboutUs = () => {
  const location = useLocation()

  const isAboutUsTeam = location.pathname.includes("management-team")

  const { data: aboutData, isLoading } = useQuery(["companyAddress"], () => aboutServiceFn())

  // const findData = (key) => {
  //   return aboutData?.data?.data?.blocks?.filter((item) => item.__component === key)?.[0]
  // }
  return (
    <>
      <Helmet>
        <title>DoubleClick - Aboutus</title>
        <meta name="Aboutus" content="This page is Aboutus page of Double click cunsulting." />
        <meta
          name="keywords"
          content="Contact DoubleClick, IT consulting, digital solutions, support, DoubleClick contact"
        />
        <meta property="og:title" content="About Us | DoubleClick Consulting" />
        <meta
          name="title"
          content={`About Us | ${isAboutUsTeam ? "Management Team" : "Company Profile"} | DoubleClick Consulting`}
        />
        <meta
          property="og:description"
          content="Reach out to DoubleClick Consulting for business solutions and expert advice tailored to your needs."
        />
        <meta
          name="description"
          content="Reach out to DoubleClick Consulting for business solutions and expert advice tailored to your needs."
        />
        <meta property="og:image" content={logo} />
      </Helmet>
      {isLoading && (
        <div className="fixed h-[100vh] w-[100vw] z-50 bg-black bg-opacity-85 flex justify-center items-center">
          {" "}
          <Loader />
        </div>
      )}

      <div className=" w-[100vw] min-w-[320px] !bg-white max-w-screen-2xl mx-auto">
        {isAboutUsTeam && <Section1 isTeam={isAboutUsTeam} data={aboutData?.data?.data} />}
        {!isAboutUsTeam ? (
          // <div className="flex px-[5%] py-[1%]  flex-wrap">
          //   {aboutData?.data?.data?.blocks?.map((item) => (
          //     <>
          //       {item.__component === "shared.about" && (
          //         <AboutSection
          //           customWidth={item.renderBlock}
          //           value={item.renderBlock?.value}
          //           data={item?.body}
          //           type={0}
          //         />
          //       )}
          //       {item.__component === "shared.contact-form" && <ContactForm />}
          //       {item.__component === "shared.team" && (
          //         <Teams
          //           value={item.renderBlock?.value}
          //           data={item?.team}
          //           title={item?.title}
          //           description={item?.description}
          //         />
          //       )}
          //       {item.__component === "shared.rich-text" && (
          //         <AboutSection
          //           customWidth={item.renderBlock}
          //           value={item.renderBlock?.value}
          //           data={item?.body}
          //           type={1}
          //         />
          //       )}
          //       {item.__component === "shared.html-markdown-wrapper" && (
          //         <AboutSection
          //           customWidth={item.renderBlock}
          //           value={item.renderBlock?.value}
          //           data={item?.body}
          //           type={3}
          //         />
          //       )}
          //       {item.__component === "shared.carousel-button" && (
          //         <div
          //           style={
          //             ({ fontSize: `${item?.renderBlock?.fontSize && fontSizeCalc(item?.renderBlock?.fontSize)}` },
          //             item?.renderBlock?.styleCSS)
          //           }
          //           className={`flex  justify-center my-3 w-[100%] ${widthCalculate(item?.renderBlock?.value)}  ${
          //             item?.renderBlock?.padding
          //           } ${item?.renderBlock?.margin}  ${item?.renderBlock?.htmlCSSClasses}  `}
          //         >
          //           {" "}
          //           <CustomButton
          //             style={({ width: "90%" }, item?.renderBlock?.innerStyleCSS)}
          //             className={` ${item?.renderBlock?.innerHtmlCSSClasses}!bg-[#2f3985] !font-semibold  !px-10 !py-3 whitespace-nowrap !text-lg w-[75%] lg:w-[30%]  !rounded-full`}
          //           >
          //             <a href={item?.link}> {item.name}</a>
          //           </CustomButton>
          //         </div>
          //       )}
          //       {item.__component === "shared.slider-wrapper" && (
          //         <Sliders customWidth={item.renderBlock} value={item.renderBlock?.value} data={item?.files} />
          //       )}
          //       {item.__component === "shared.quote" && <QuoteSection value={item.renderBlock?.value} data={item} />}
          //       {item.__component === "shared.media" && (
          //         <AboutSection customWidth={item.renderBlock} value={item.renderBlock?.value} data={item} type={2} />
          //       )}
          //       {item.__component === "shared.media-wrapper" && (
          //         <AboutSection
          //           customWidth={item.renderBlock}
          //           value={item.renderBlock?.value}
          //           data={{ file: item?.file, thumbnail: item?.thumbnail_image }}
          //           type={2}
          //         />
          //       )}
          //       {item.__component === "shared.stack-images" && (
          //         <AboutSection
          //           value={item?.renderBlock?.value}
          //           customWidth={item.renderBlock}
          //           data={item?.files}
          //           type={4}
          //         />
          //       )}
          //     </>
          //   ))}
          // </div>
          <div>
            <DoubleClickHero />
            {/* <HeroSection /> */}
            {/* <EnhancedOurStorySection /> */}
            <Differentiators />
            <CoreValues />
            <VisionSection />
            <PartnershipsSection />
            <CTASection />
          </div>
        ) : (
          <>
            <Teams />
            <Quotes />

            <Questionaires />
          </>
        )}
        <Connections />
      </div>
    </>
  )
}
export default AboutUs
