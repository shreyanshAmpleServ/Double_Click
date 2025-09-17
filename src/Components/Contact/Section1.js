import { Home } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import bg2 from "../../Assests/Content/07/breadcrumbs_bg.jpg"
import { useState } from "react"

const Section1 = ({ values }) => {
  const baseURL = process.env.REACT_APP_API_URL
  const navigate = useNavigate()
  const [isMapLoading, setIsMapLoading] = useState(true)

  const handleMapLoad = () => {
    setIsMapLoading(false)
  }
  return (
    <>
      <div className="">
        <div
          className="relative h-[19rem] w-full lg:h-[19rem]"
          // style={{
          //   backgroundImage: `url(${values?.singleMedia?.url ? baseURL + values?.singleMedia?.url : bg2})`,
          //   backgroundSize: "cover",
          //   backgroundPosition: "center",
          //   backgroundRepeat: "no-repeat",
          //   backgroundAttachment: "fixed",
          // }}
        >
          <img
            src={values?.singleMedia?.url ? baseURL + values?.singleMedia?.url : "bg2"}
            alt="Cover"
            className="relative h-[19rem] w-full"
          />
          <div className=" absolute top-0 h-full w-full left-0 flex justify-center items-center "></div>
          <div className="flex flex-col  text-white absolute top-[15%]  justify-between px-[3%] lg:px-[7%] gap-4 ">
            <div className="text-xs lg:text-base whitespace-nowrap text-wrap font-semibold  gap-2  ">
              <Home className="hover:cursor-pointer hover:!text-red-600 mb-2" onClick={() => navigate("/")} /> / Pages /
              CONTACT US
            </div>
            <div className="text-base lg:text-3xl text-wrap my-2 font-semibold "> {values?.label || ""}</div>
            <div className="lg:w-[75%] !text-sm font-thin space border-l-2 p-1 border-red-700 pl-4 ">
              {values?.value || ""}
            </div>
            {/* <CustomButton variant="outlined" className="!text-white border-3 font-bold !border-white !rounded-full" > GET IN TOUCH <ArrowForwardIosIcon className="!text-base" /></CustomButton> */}
          </div>
        </div>
      </div>

      <div className="w-[100vw] h-[30rem] relative">
        {/* Loading Skeleton */}
        {isMapLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-10">
            <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-16 h-16 bg-gray-400 rounded-full mb-4 animate-pulse"></div>
                <div className="w-32 h-4 bg-gray-400 rounded mb-2 animate-pulse"></div>
                <div className="w-24 h-3 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

        {/* Google Maps Iframe */}
        <iframe
          loading="lazy"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15846.582251493955!2d39.289384!3d-6.812894!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x309d84269cf49406!2sDouble+Click+Consulting+Ltd!5e0!3m2!1sen!2sin!4v1539926719351"
          title="5th Floor, Ohio Street/Garden Avenue, Dar es Salaam, Tanzania"
          aria-label="5th Floor, Ohio Street/Garden Avenue, Dar es Salaam, Tanzania"
          className="w-full h-full border-0"
          onLoad={handleMapLoad}
        />
      </div>
    </>
  )
}
export default Section1
