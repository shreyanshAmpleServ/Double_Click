import CustomButton from "Shared/CustomButton"
import bg2 from "../../Assests/Content/07/breadcrumbs_bg.jpg"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { Home } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

const Section1 = ({ data, isTeam }) => {
  const baseURL = process.env.REACT_APP_API_URL
  const navigate = useNavigate()
  return (
    <>
      <div className="">
        <div
          className="relative h-[35vh] !object-fit-fill  lg:h-[35vh]"
          style={{
            backgroundImage: `url(${data?.featuredMedia?.url ? baseURL + data?.featuredMedia?.url : bg2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="bg-black bg-opacity-50 blur-sm absolute top-0 h-full w-full left-0 flex justify-center items-center "></div>
          <div className="flex flex-col  text-white absolute top-[15%]  justify-between px-[3%] lg:px-[7%] gap-4 ">
            <div className="text-xs lg:text-base whitespace-nowrap text-wrap font-semibold  gap-2  ">
              <Home className="hover:cursor-pointer hover:!text-red-600 mb-2" onClick={() => navigate("/")} /> / ABOUT
              US / {isTeam ? "Management Team" : "Company Profile"}
            </div>
            <div className="text-base lg:text-3xl text-wrap my-2 font-semibold ">
              {isTeam ? "Management Team" : "Company Profile"}
            </div>
            <div className="lg:w-[75%] !text-sm font-thin space border-l-2 p-1 border-red-700 pl-4 ">
              {data?.description || ""}
            </div>
            {/* <CustomButton variant="outlined" className="!text-white border-3 font-bold !border-white !rounded-full" > GET IN TOUCH <ArrowForwardIosIcon className="!text-base" /></CustomButton> */}
          </div>
        </div>
      </div>
      {/* <div className="w-[100vw] h-[65vh] ">
      <iframe loading="lazy"
					src="https://maps.google.com/maps?q=London%20Eye%2C%20London%2C%20United%20Kingdom&amp;t=m&amp;z=10&amp;output=embed&amp;iwloc=near"
					title="London Eye, London, United Kingdom"
					aria-label="London Eye, London, United Kingdom"
                    className="w-full h-full"
			></iframe>
            </div> */}
    </>
  )
}
export default Section1
