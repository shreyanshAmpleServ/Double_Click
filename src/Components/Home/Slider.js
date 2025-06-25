import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { crousalServiceFn } from "Services/Home"
import CustomButton from "Shared/CustomButton"
import React, { useState } from "react"
import { useQuery } from "react-query"
import Slider from "react-slick"

// Custom Arrow Components
const NextArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 right-2 lg:right-5 transform -translate-y-1/2 p-1 lg:p-5 pb-2 lg:pb-6 text-black  bg-white text-3xl z-10 cursor-pointer  "
      onClick={onClick}
    >
      <ArrowForwardIosIcon className="!text-lg lg:!text-3xl !font-thin" />
    </div>
  )
}

const PrevArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 left-2 lg:left-5 transform -translate-y-1/2 p-1 lg:p-5 pb-2 lg:pb-6 text-black  bg-white text-3xl z-10 cursor-pointer  opacity-100 group-hover:opacity-0 transition-all duration-300"
      onClick={onClick}
    >
      <ArrowBackIosNewIcon className="!text-lg lg:!text-3xl !font-thin" />
    </div>
  )
}

function Sliders() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const baseURL = process.env.REACT_APP_API_URL
  const sliderRef = React.useRef(null)
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    centerMode: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: (index) => setCurrentSlide(index),
    // beforeChange: (oldIndex, newIndex) => {
    //     const images = document.querySelectorAll(".zoom-slide");
    //     images.forEach((img, index) => {
    //       if (index === newIndex) {
    //         img.classList.add("zoom-out");
    //       } else {
    //         img.classList.remove("zoom-out");
    //       }
    //     });
    //   }
  }
  const { data: carouselData, isLoading, refetch } = useQuery(["carousel"], () => crousalServiceFn())

  return (
    <div
      style={{ fontFamily: "Open Sans" }}
      className="slider-container h-[40vh] lg:h-[85vh] w-[100vw] overflow-hidden"
    >
      <Slider {...settings}>
        {carouselData?.data?.data?.map((item, i) => (
          <div className=" relative ">
            <img
              decoding="async"
              src={baseURL + item?.image.url}
              alt=""
              className={`h-[40vh] lg:h-[85vh] !bg-opacity-80 w-full object-cover  transition-transform duration-[3000ms] ease-in-out ${
                currentSlide === i ? "scale-125" : "scale-100"
              }`}
            />
            <div className="absolute pt-[12%] top-0 left-0  px-[8%] h-full  bg-black  bg-opacity-50 w-[100%]   text-center  text-white">
              <div className="text-4xl lg:text-7xl !capitalize  font-bold">{item?.title}</div>
              <div className="text-lg lg:text-3xl family-open-sans mt-1 lg:mt-3 pb-3 lg:mb-7 font-medium">
                {item?.subtitle}
              </div>
              <div className="family-open-sans text-xs lg:text-lg">{item?.description}</div>
              {/* <CustomButton className="bg-primary !rounded-full !py-2 !mt-7" ><span className=" family-open-sans text-base lg:text-lg">Read More</span> <ArrowForwardIosIcon className="!text-base lg:!text-base !ml-2" /></CustomButton> */}
            </div>
          </div>
        ))}
        {/* <div  className="relative">
        <img  decoding="async"  src={slider2}  alt="" className={`h-[85vh] w-full object-cover  transition-transform duration-[3000ms] ease-in-out  ${
                currentSlide === 1 ? "scale-125" : "scale-100"
              }`} />
               <div className="absolute  top-[8%] left-[7%]  w-[50%]   text-white">
            <div className="text-4xl lg:text-7xl  font-bold">Ready For Any <br/>Obstacle</div>
            <div className="text-3xl family-open-sans mt-3 mb-7 font-medium">From Pickup to Destination</div>
            <div className="text-base lg:text-xl mt-2 lg:mt-4 leading-5 lg:leading-8 font-medium lg:font-semibold">Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin,<br /> lorem quis bibendum auctor, nisi elit consequat ipsum, nec <br />sagittis sem nibh id elit.</div>
            <CustomButton className="bg-black1 !rounded-none !py-2 !px-12 !mt-7" ><span className=" family-open-sans text-base lg:text-lg">Read More</span> </CustomButton>
        </div>
       
        </div>
        <div>
         <img decoding="async" src={slider3} className={`zoom-slide h-[85vh] !bg-opacity-80 w-full object-cover  transition-transform duration-[3000ms] ease-in-out  ${
                currentSlide === 2 ? "scale-125" : "scale-100"
              }`}  alt=""  />
       
        </div> */}
      </Slider>
    </div>
  )
}

export default Sliders
