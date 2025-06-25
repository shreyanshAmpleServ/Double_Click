import AboutSection from "Components/Aboutus/About"
import AboutBanner from "Components/Menu/AboutSection"
import QuoteSection from "Components/Menu/Quote"
import Section1 from "Components/Menu/Section1"
import { Sliders } from "Components/Menu/Slider"
import Connections from "Components/Home/Connect"
import { Helmet } from "react-helmet-async"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { blogArticleFn } from "Services/Home"
import CustomButton from "Shared/CustomButton"
import Loader from "Shared/Loader"

const Menus = () => {
  const { id, menu = "Post" } = useParams()
  const { data: subBlogData, isLoading, refetch } = useQuery(["article"], () => blogArticleFn({ id }))
  return (
    <>
      <Helmet>
        <title>DoubleClick - {menu}</title>
        <meta name={menu} content={`This page is ${menu} page of Double click cunsulting.`} />
        <meta
          name="keywords"
          content="Contact DoubleClick, IT consulting, digital solutions, support, DoubleClick contact"
        />
        <meta property="og:title" content={`${menu} | DoubleClick Consulting`} />
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

      <div className=" w-[100vw] overflow-hidden">
        <Section1 menu={menu} data={subBlogData?.data?.data?.[0]} />
        {/* <ContactForm /> */}
        {/* <AboutBanner data={subBlogData?.data?.data} /> */}
        {/* <CoreServices /> */}
        <div className="flex px-[5%] py-[1%] flex-wrap">
          {subBlogData?.data?.data?.[0]?.blocks?.map((item) => (
            <>
              {item.__component === "shared.rich-text-markdown-wrapper" && (
                <AboutSection
                  customWidth={item.renderBlock}
                  data={item?.body}
                  value={item?.renderBlock?.value}
                  type={1}
                  isMarked={true}
                />
              )}
              {item.__component === "shared.html-markdown-wrapper" && (
                <AboutSection
                  customWidth={item.renderBlock}
                  data={item?.body}
                  value={item?.renderBlock?.value}
                  type={3}
                  isMarked={true}
                />
              )}
              {item.__component === "shared.action-btn-wrapper" && (
                <div
                  className={`flex justify-center my-3 ${
                    item?.renderBlock?.value == "Full" ? "w-[100%]" : " w-[100%]  lg:w-[50%]"
                  }`}
                >
                  {" "}
                  <CustomButton className="!bg-[#2f3985] !font-semibold  !px-10 !py-3 whitespace-nowrap !text-lg w-[75%] lg:w-[30%]  !rounded-full">
                    <a href={item?.link}> {item.name}</a>
                  </CustomButton>
                </div>
              )}
              {item.__component === "shared.slider-wrapper" && (
                <Sliders value={item?.renderBlock?.value} customWidth={item.renderBlock} data={item?.files} />
              )}
              {item.__component === "shared.quote-wrapper" && (
                <QuoteSection value={item?.renderBlock?.value} customWidth={item.renderBlock} data={item} />
              )}
              {item.__component === "shared.media-wrapper" && (
                <AboutSection
                  value={item?.renderBlock?.value}
                  customWidth={item.renderBlock}
                  data={item?.file}
                  type={2}
                />
              )}
            </>
          ))}
        </div>
        <Connections />
      </div>
    </>
  )
}
export default Menus
