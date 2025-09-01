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
import { fontSizeCalc, widthCalculate } from "Shared/widthCalculate"
import NoDataFound from "Shared/NoDataFound"
import logo from "../../Assests/Content/logo_footer.png"
import ImageBundle from "Components/ImageBundles"

const Menus = () => {
  const baseURL = process.env.REACT_APP_API_URL
  const { id, menu = "Post" } = useParams()
  const { data: subBlogData, isLoading, refetch } = useQuery(["article"], () => blogArticleFn({ id }))
  console.log("subBlogData", subBlogData?.data?.data?.[0]?.seo, menu)
  return (
    <>
      <Helmet>
        <title>
          DoubleClick - {subBlogData?.data?.data?.[0]?.seo?.metaTitle || subBlogData?.data?.data?.[0]?.title || menu}
        </title>
        <meta
          name={subBlogData?.data?.data?.[0]?.seo?.metaTitle || subBlogData?.data?.data?.[0]?.title || menu}
          content={`This page is ${
            subBlogData?.data?.data?.[0]?.seo?.metaTitle || subBlogData?.data?.data?.[0]?.title
          } page of Double click cunsulting.`}
        />
        <meta
          name="keywords"
          content={
            subBlogData?.data?.data?.[0]?.seo?.metakeywords ||
            "Contact DoubleClick, IT consulting, digital solutions, support, DoubleClick contact"
          }
        />
        <meta
          property="og:title"
          content={`${
            subBlogData?.data?.data?.[0]?.seo?.metaTitle || subBlogData?.data?.data?.[0]?.title || menu
          } | DoubleClick Consulting`}
        />
        <meta
          property="og:description"
          content={
            subBlogData?.data?.data?.[0]?.seo?.metaDescription ||
            subBlogData?.data?.data?.[0]?.description ||
            "Reach out to DoubleClick Consulting for business solutions and expert advice tailored to your needs."
          }
        />
        <meta
          name="title"
          content={`${
            subBlogData?.data?.data?.[0]?.seo?.metaTitle || subBlogData?.data?.data?.[0]?.title || menu
          } | DoubleClick Consulting`}
        />
        <meta
          name="description"
          content={
            subBlogData?.data?.data?.[0]?.seo?.metaDescription ||
            subBlogData?.data?.data?.[0]?.description ||
            "Reach out to DoubleClick Consulting for business solutions and expert advice tailored to your needs."
          }
        />
        <meta property="og:image" content={baseURL + subBlogData?.data?.data?.[0]?.seo?.shareImage?.url || logo} />
      </Helmet>
      {isLoading && (
        <div className="fixed h-[100vh] w-[100vw] z-50 bg-black bg-opacity-85 flex justify-center items-center">
          {" "}
          <Loader />
        </div>
      )}
      {/* <ImageBundle /> */}
      {subBlogData?.data?.data?.length ? (
        <div className="w-[100vw] min-w-[320px] min-h-[73vh] bg-white max-w-screen-2xl rendor overflow-hidden mx-auto">
          {/* <div className=" w-[100vw] rendor overflow-hidden"> */}
          <Section1 menu={subBlogData?.data?.data?.[0]?.title || menu} data={subBlogData?.data?.data?.[0]} />
          {/* <ContactForm /> */}
          {/* <AboutBanner data={subBlogData?.data?.data} /> */}
          {/* <CoreServices /> */}
          <div className="flex flex-wrap px-[5%] py-[1%] ">
            {/* <div className="flex px-[5%] py-[1%] flex-wrap"> */}
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
                    // className={`flex justify-center my-3 ${
                    //   item?.renderBlock?.value == "Full" ? "w-[100%]" : " w-[100%]  lg:w-[50%]"
                    // }`}
                    style={
                      ({ fontSize: `${item?.renderBlock?.fontSize && fontSizeCalc(item?.renderBlock?.fontSize)}` },
                      item?.renderBlock?.styleCSS)
                    }
                    className={`flex  justify-center my-3 w-[100%] ${widthCalculate(item?.renderBlock?.value)}  ${
                      item?.renderBlock?.padding
                    } ${item?.renderBlock?.margin}  ${item?.renderBlock?.htmlCSSClasses}  `}
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
                    data={{ file: item?.file, thumbnail: item?.thumbnail_image }}
                    type={2}
                  />
                )}
                {item.__component === "shared.stack-images" && (
                  <AboutSection
                    value={item?.renderBlock?.value}
                    customWidth={item.renderBlock}
                    data={item?.files}
                    type={4}
                  />
                )}
              </>
            ))}
          </div>
          <Connections />
        </div>
      ) : (
        !isLoading && <NoDataFound />
      )}
    </>
  )
}
export default Menus
