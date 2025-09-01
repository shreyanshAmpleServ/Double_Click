import { Home } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import bg2 from "../../Assests/Content/07/breadcrumbs_bg.jpg"
import CustomButton from "Shared/CustomButton"

const Section1 = ({ data, menu }) => {
  const navigate = useNavigate()
  function formatSlug(slug) {
    return slug
      .split("-")
      .map((word) => (word.toLowerCase() === "whats" ? "WhatsApp" : word.charAt(0).toUpperCase() + word.slice(1)))
      .join(" ")
  }
  return (
    <>
      <div className="">
        <div
          className="relative h-[17rem] object-fit-fill w-full "
          // style={{
          //   backgroundImage: `url(${data?.cover?.url ? process.env.REACT_APP_API_URL + data?.cover?.url : bg2})`,
          //   backgroundSize: "cover",
          //   backgroundPosition: "center",
          //   backgroundRepeat: "no-repeat",
          //   // backgroundAttachment: "fixed",
          // }}
        >
          <img
            src={data?.cover?.url ? process.env.REACT_APP_API_URL + data?.cover?.url : bg2}
            alt="Cover"
            className="relative h-[17rem] object-fit-fill w-full"
          />
          <div className=" absolute top-0 h-full w-full left-0 flex justify-center items-center "></div>
          {/* <div className="bg-black bg-opacity-30 blur-sm absolute top-0 h-full w-full left-0 flex justify-center items-center "></div> */}
          <div
            className={`flex flex-col  ${
              data?.isDarkCover ? "text-white" : "text-black"
            } absolute top-[15%]  justify-between px-[3%] lg:px-[7%] gap-4 `}
          >
            <div
              className={`text-xs ${
                data?.isDarkCover ? "!text-slate-50" : "!text-gray-700"
              } lg:text-base whitespace-nowrap text-wrap font-semibold  gap-2  `}
            >
              {console.log("menu", data)}
              <Home
                className="hover:cursor-pointer hover:!text-red-600 !capitalize mb-2"
                onClick={() => navigate("/")}
              />
              / {formatSlug(menu)}/{data?.title}
            </div>
            <div className={`text-base lg:text-3xl text-wrap my-2 font-semibold `}>{data?.title}</div>
            <div
              className={`lg:w-[75%] ${
                data?.isDarkCover ? "!text-slate-50" : "!text-gray-700"
              } !text-sm font-thin space border-l-2 p-1 border-red-700 pl-4 `}
            >
              {data?.description}
            </div>
            {data?.button_name && (
              <div className="flex justify-start  items-center  gap-4">
                <CustomButton className="!bg-blue-600 !font-normal !text-sm   !px-2  !py-1 whitespace-nowrap w-auto lg:w-[30%]  !rounded">
                  <a
                    href={data?.button_link || "#"}
                    target={`${data?.button_link == "" ? "" : "_blank"}`}
                    rel={`${data?.button_link == "" ? "" : "noopener noreferrer"}`}
                  >
                    {data?.button_name}{" "}
                  </a>
                </CustomButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export default Section1

{
  /* <CustomButton variant="outlined" className="!text-white border-3 font-bold !border-white !rounded-full" > GET IN TOUCH <ArrowForwardIosIcon className="!text-base" /></CustomButton> */
}
