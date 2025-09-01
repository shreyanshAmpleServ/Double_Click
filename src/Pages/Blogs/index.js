import Section1 from "Components/Blogs/Section1"
import Connections from "Components/Home/Connect"
import moment from "moment"
import { Helmet } from "react-helmet-async"
import { useQuery } from "react-query"
import { postBlogServiceFn } from "Services/Home"
import Loader from "Shared/Loader"
import DefaultImage from "../../Assests/default_image-1.jpg"
import logo from "../../Assests/Content/logo_footer.png"

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
        <meta property="title" content="Blogs | DoubleClick Consulting" />
        <meta
          name="og:description"
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

      <div className="  w-[100vw] min-w-[320px] !bg-white max-w-screen-2xl mx-auto rendor overflow-hidden">
        <Section1 data={blogData?.data?.data} />
        <div className="p-[6%] !pt-[3%] !pb-[1%]">
          <div className="text-center lg:pb-0 ">
            <div className="text-4xl font-semibold text-primary">Recent Blogs</div>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2   text-center lg:gap-4 p-1">
            {blogData?.data?.data?.[0]?.articles?.map((item) => (
              <a
                href={`${window.location.origin}/post/${item.slug}`}
                className="  bg-white relative px-4 py-4 lg:py-10 flex flex-col items-center gap-1 text-black2 w-[60%] lg:w-[100%] md:w-[100%]   "
              >
                {item?.cover?.url ? (
                  <img
                    src={baseURL + item?.cover?.url}
                    alt=""
                    className="w-full h-64 object-cover border hover:-translate-y-2 hover:opacity-60    transition-all duration-300 rounded-lg"
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
              </a>
            ))}
          </div>
        </div>
        <Connections />
      </div>
    </>
  )
}
export default Blogs
