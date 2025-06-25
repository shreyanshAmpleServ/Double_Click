import CustomButton from "Shared/CustomButton"
import bg2 from "../../Assests/Content/bg_6.jpg"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import RequestQuoteModal from "Pages/ReqQuote"
import { useState } from "react"
import { Link } from "react-router-dom"

const Connections = () => {
  const [isModal,setIsModal] = useState(false)

  return (
    <>
      <div className=" py-[6%] !pb-[0%]">
        <div
          className="relative h-[35vh] lg:h-[37vh]"
          style={{
            backgroundImage: `url(${bg2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
        >
          <div className=" bg-primary !opacity-60 absolute top-0 h-full w-full left-0 flex justify-center items-center ">
        </div>
            <div className="flex flex-col lg:flex-row text-white absolute top-[15%] lg:top-[35%] justify-between px-[6%] lg:px-[12%] gap-4 items-center">
            <div className="text-xl text-wrap  lg:w-[30%]">Interested in working with Doubleclick?</div>
            <div className="lg:w-[37%] !text-sm">We don’t just manage suppliers, we micro-manage them. We have a consultative, personalized approach</div>
            <CustomButton   
            //  onClick={() => setIsModal(true)}
              variant="outlined" className="!text-white border-3 font-bold !border-white !rounded-full" ><Link to="/contact" > GET IN TOUCH <ArrowForwardIosIcon className="!text-base" /></Link></CustomButton>
            </div>
        </div>
      </div>
      {/* <RequestQuoteModal modal={isModal} setModal={setIsModal} /> */}
    </>
  )
}
export default Connections
