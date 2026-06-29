import { Suspense, lazy, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { useQuery } from "react-query"
import { useLocation } from "react-router-dom"
import { aboutServiceFn, contactSEOFn } from "Services/Home"
import Loader from "Shared/Loader"
import logo from "../../Assests/Content/logo_footer.png"

const Questionaires = lazy(() => import("Components/Aboutus/Questionaires"))
const Section1 = lazy(() => import("Components/Aboutus/Section1"))
const Teams = lazy(() => import("Components/Aboutus/Teams"))
const CoreValues = lazy(() => import("Components/AboutUsNew/CoreValue"))
const CTASection = lazy(() => import("Components/AboutUsNew/CTASection"))
const Differentiators = lazy(() => import("Components/AboutUsNew/Differection"))
const PartnershipsSection = lazy(() => import("Components/AboutUsNew/PartnershipSection"))
const VisionSection = lazy(() => import("Components/AboutUsNew/Vision"))
const DoubleClickHero = lazy(() => import("Components/Home/AboutSection"))
const Connections = lazy(() => import("Components/Home/Connect"))
const Quotes = lazy(() => import("Components/Home/Quote"))
const FuelERPFeatures = lazy(() => import("Components/OilGas"))

const AboutUs = () => {
  const location = useLocation()

  const isAboutUsTeam = location.pathname.includes("management-team")
  const { data: aboutSeoData } = useQuery(["aboutus-seo"], () =>
    contactSEOFn(isAboutUsTeam ? "management-team-seo" : "company-profile-seo")
  )

  const { data: aboutData, isLoading } = useQuery(["companyAddress"], () => aboutServiceFn())

  // const findData = (key) => {
  //   return aboutData?.data?.data?.blocks?.filter((item) => item.__component === key)?.[0]
  // }
  const seoData = aboutSeoData?.data?.data?.[0]?.seo

  return (
    <>
      <Helmet>
        <title>{seoData?.metaTitle ? seoData?.metaTitle : "DoubleClick - Aboutus"}</title>
        <meta name="Aboutus" content="This page is Aboutus page of Double click cunsulting." />
        <meta
          name="keywords"
          content={
            seoData?.metakeywords
              ? seoData?.metakeywords
              : "Contact DoubleClick, IT consulting, digital solutions, support, DoubleClick contact"
          }
        />
        <meta
          property="og:title"
          content={seoData?.metaTitle ? seoData?.metaTitle : "About Us | DoubleClick Consulting"}
        />
        <meta
          name="title"
          content={
            seoData?.metaTitle
              ? seoData?.metaTitle
              : `About Us | ${isAboutUsTeam ? "Management Team" : "Company Profile"} | DoubleClick Consulting`
          }
        />
        <meta
          property="og:description"
          content={
            seoData?.metaDescription
              ? seoData?.metaDescription
              : "Reach out to DoubleClick Consulting for business solutions and expert advice tailored to your needs."
          }
        />
        <meta
          name="description"
          content={
            seoData?.metaDescription
              ? seoData?.metaDescription
              : "Reach out to DoubleClick Consulting for business solutions and expert advice tailored to your needs."
          }
        />
        <meta property="og:image" content={seoData?.shareImage ? seoData?.shareImage : logo} />
      </Helmet>
      {/* {isLoading && (
        <div className="fixed h-[100vh] w-[100vw] z-50 bg-black bg-opacity-85 flex justify-center items-center">
          {" "}
          <Loader />
        </div>
      )} */}

      <div className=" w-[100vw] min-w-[320px] !bg-white max-w-screen-2xl mx-auto">
        <Suspense fallback={<Loader />}>
          {isAboutUsTeam && <Section1 isTeam={isAboutUsTeam} data={aboutData?.data?.data} />}
          {!isAboutUsTeam ? (
            <div>
              <DoubleClickHero />
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
              <Questionaires isAboutUsTeam={true} />
            </>
          )}
        </Suspense>
        <Connections />
      </div>
    </>
  )
}
export default AboutUs
