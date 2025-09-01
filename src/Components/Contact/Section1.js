import { Home } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import bg2 from "../../Assests/Content/07/breadcrumbs_bg.jpg"

const Section1 = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="">
        <div
          className="relative h-[19rem] lg:h-[19rem]"
          style={{
            backgroundImage: `url(${bg2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="bg-black bg-opacity-50 blur-sm absolute top-0 h-full w-full left-0 flex justify-center items-center "></div>
          <div className="flex flex-col  text-white absolute top-[15%]  justify-between px-[3%] lg:px-[7%] gap-4 ">
            <div className="text-xs lg:text-base whitespace-nowrap text-wrap font-semibold  gap-2  ">
              <Home className="hover:cursor-pointer hover:!text-red-600 mb-2" onClick={() => navigate("/")} /> / Pages /
              CONTACT US
            </div>
            <div className="text-base lg:text-3xl text-wrap my-2 font-semibold ">CONTACT US</div>
            <div className="lg:w-[75%] !text-sm font-thin space border-l-2 p-1 border-red-700 pl-4 ">
              We don’t just manage suppliers, we micro-manage them. We have a consultative, personalized approach
            </div>
            {/* <CustomButton variant="outlined" className="!text-white border-3 font-bold !border-white !rounded-full" > GET IN TOUCH <ArrowForwardIosIcon className="!text-base" /></CustomButton> */}
          </div>
        </div>
      </div>
      <div className="w-[100vw] h-[30rem] ">
        {/* <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15846.582251493955!2d39.289384!3d-6.812894!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x309d84269cf49406!2sDouble+Click+Consulting+Ltd!5e0!3m2!1sen!2sin!4v1539926719351"
          width="600"
          height="450"
          frameborder="0"
          style="border:0"
          allowfullscreen=""
        ></iframe> */}
        <iframe
          loading="lazy"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15846.582251493955!2d39.289384!3d-6.812894!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x309d84269cf49406!2sDouble+Click+Consulting+Ltd!5e0!3m2!1sen!2sin!4v1539926719351"
          // src="https://maps.google.com/maps?q=5th%20Floor%2C%20Ohio%20Street%2FGarden%20Avenue%2C%20Dar%20es%20Salaam%2C%20Tanzania%2C%20P.O.Box%2020419&output=embed&zoom=50"
          title="5th Floor, Ohio Street/Garden Avenue, Dar es Salaam, Tanzania"
          aria-label="5th Floor, Ohio Street/Garden Avenue, Dar es Salaam, Tanzania"
          className="w-full h-full border-0"
        ></iframe>
      </div>
    </>
  )
}
export default Section1
