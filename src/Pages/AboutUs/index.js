import AboutSection from "Components/Aboutus/About"
import Questionaires from "Components/Aboutus/Questionaires"
import Section1 from "Components/Aboutus/Section1"
import Teams from "Components/Aboutus/Teams"
import QuoteSection from "Components/Menu/Quote"
import { Sliders } from "Components/Menu/Slider"
import ContactForm from "Components/Contact/ContactForm"
import Connections from "Components/Home/Connect"
import Quotes from "Components/Home/Quote"
import { Helmet } from "react-helmet-async"
import { useQuery } from "react-query"
import { useLocation } from "react-router-dom"
import { aboutServiceFn, footerServiceFn } from "Services/Home"
import CustomButton from "Shared/CustomButton"
import Loader from "Shared/Loader"

const AboutUs = () => {
  const location = useLocation()

  const isAboutUsTeam = location.pathname.includes("aboutus-management-team")

  const { data: aboutData, isLoading, refetch } = useQuery(["companyAddress"], () => aboutServiceFn())

  const findData = (key) => {
    return aboutData?.data?.data?.blocks?.filter((item) => item.__component === key)?.[0]
  }
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
          property="og:description"
          content="Reach out to DoubleClick Consulting for business solutions and expert advice tailored to your needs."
        />
      </Helmet>
      {isLoading && (
        <div className="fixed h-[100vh] w-[100vw] z-50 bg-black bg-opacity-85 flex justify-center items-center">
          {" "}
          <Loader />
        </div>
      )}

      <div className=" w-[100vw]  overflow-hidden">
        <Section1 isTeam={isAboutUsTeam} data={aboutData?.data?.data} />
        {!isAboutUsTeam ? (
          <div className="flex px-[5%] py-[1%]  flex-wrap">
            {aboutData?.data?.data?.blocks?.map((item) => (
              <>
                {item.__component === "shared.about" && (
                  <AboutSection
                    customWidth={item.renderBlock}
                    value={item.renderBlock?.value}
                    data={item?.body}
                    type={0}
                  />
                )}
                {item.__component === "shared.contact-form" && <ContactForm />}
                {item.__component === "shared.team" && (
                  <Teams
                    value={item.renderBlock?.value}
                    data={item?.team}
                    title={item?.title}
                    description={item?.description}
                  />
                )}
                {item.__component === "shared.rich-text" && (
                  <AboutSection
                    customWidth={item.renderBlock}
                    value={item.renderBlock?.value}
                    data={item?.body}
                    type={1}
                  />
                )}
                {item.__component === "shared.html-markdown-wrapper" && (
                  <AboutSection
                    customWidth={item.renderBlock}
                    value={item.renderBlock?.value}
                    data={item?.body}
                    type={3}
                  />
                )}
                {item.__component === "shared.carousel-button" && (
                  <div
                    className={`flex justify-center my-3 ${
                      item?.renderBlock?.value == "Full" ? "w-[100%]" : " w-[100%]  lg:w-[50%]"
                    }`}
                  >
                    {" "}
                    <CustomButton
                      style={{ width: "90%" }}
                      className="!bg-[#2f3985] !font-semibold  !px-10 !py-3 whitespace-nowrap !text-lg w-[75%] lg:w-[30%]  !rounded-full"
                    >
                      <a href={item?.link}> {item.name}</a>
                    </CustomButton>
                  </div>
                )}
                {item.__component === "shared.slider-wrapper" && (
                  <Sliders customWidth={item.renderBlock} value={item.renderBlock?.value} data={item?.files} />
                )}
                {item.__component === "shared.quote" && <QuoteSection value={item.renderBlock?.value} data={item} />}
                {item.__component === "shared.media" && (
                  <AboutSection
                    customWidth={item.renderBlock}
                    value={item.renderBlock?.value}
                    data={item?.file}
                    type={2}
                  />
                )}
                {item.__component === "shared.media-wrapper" && (
                  <AboutSection
                    customWidth={item.renderBlock}
                    value={item.renderBlock?.value}
                    data={item?.file}
                    type={2}
                  />
                )}
              </>
            ))}
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
