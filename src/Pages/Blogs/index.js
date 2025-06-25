import AboutSection from "Components/Aboutus/About"
import Questionaires from "Components/Aboutus/Questionaires"
import Section1 from "Components/Blogs/Section1"
import Teams from "Components/Aboutus/Teams"
import QuoteSection from "Components/Menu/Quote"
import { Sliders } from "Components/Menu/Slider"
import ContactForm from "Components/Contact/ContactForm"
import Connections from "Components/Home/Connect"
import Quotes from "Components/Home/Quote"
import { Helmet } from "react-helmet-async"
import { useQuery } from "react-query"
import { useLocation } from "react-router-dom"
import { aboutServiceFn, postBlogServiceFn } from "Services/Home"
import CustomButton from "Shared/CustomButton"
import Loader from "Shared/Loader"
import moment from "moment"
import { FaImage } from "react-icons/fa"
import DefaultImage from "../../Assests/default_image-1.jpg"

const Blogs = () => {
  const baseURL = process.env.REACT_APP_API_URL
  const { data: blogData, isLoading, refetch } = useQuery(["blogs"], () => postBlogServiceFn())

  return (
    <>
      <Helmet>
        <title>DoubleClick - Blogs</title>
        <meta name="Blogs" content="This page is Blogs page of Double click cunsulting." />
        <meta
          name="keywords"
          content="Contact DoubleClick, IT consulting, digital solutions, support, DoubleClick contact"
        />
        <meta property="og:title" content="Blogs | DoubleClick Consulting" />
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
        <Section1 data={blogData?.data?.data} />
        <div className="p-[6%] !pb-[2%]">
          <div className="text-center lg:pb-14 ">
            <div className="text-4xl font-semibold text-primary">Recent Blogs</div>
          </div>
          <div className="grid lg:grid-cols-3  text-center lg:gap-10 p-1">
            {blogData?.data?.data?.[0]?.articles?.map((item) => (
              <div className="  bg-white relative px-4 py-4 lg:py-10 flex flex-col items-center gap-1 text-black2 w-[60%] lg:w-[100%]   ">
                {item?.cover?.url ? (
                  <img
                    src={baseURL + item?.cover?.url}
                    alt=""
                    className="w-full h-64 object-cover hover:-translate-y-2 hover:opacity-60    transition-all duration-300 rounded-lg"
                  />
                ) : (
                  <img
                    src={DefaultImage}
                    alt=""
                    className="w-full h-64 object-cover hover:-translate-y-2 hover:opacity-60    transition-all duration-300 rounded-lg"
                  />
                  // <FaImage className="!w-full !opacity-20 object-cover !h-[100%]  hover:-translate-y-2 hover:opacity-60    transition-all duration-300 rounded-lg" />
                )}
                <div className="text-base font-semibold">{moment(item?.createdAt).format("ll")}</div>
                <div className="text-lg font-semibold hover:text-red-700 text-nowrap overflow-hidden w-[80%] text-ellipsis">
                  <a href={`${window.location.origin}/post/${item.slug}`}>{item?.title}</a>
                </div>
                <div className="text-sm font-extralight famiy-serif2 leading-6 text-nowrap overflow-hidden w-[80%] text-ellipsis text-gray-500">
                  {item?.description}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Connections />
      </div>
    </>
  )
}
export default Blogs
