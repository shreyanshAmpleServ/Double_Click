import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { crousalServiceFn } from "Services/Home"
import CustomButton from "Shared/CustomButton"
import React, { useState } from "react"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import Slider from "react-slick"

// Custom Arrow Components
const NextArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 right-2 lg:right-5 transform -translate-y-1/2 p-1 lg:p-2 pb-2 lg:pb-4 text-black  bg-white text-3xl z-10 cursor-pointer  "
      onClick={onClick}
    >
      <ArrowForwardIosIcon className="!text-lg lg:!text-2xl !font-thin" />
    </div>
  )
}

const PrevArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 left-2 lg:left-5 transform -translate-y-1/2 p-1 lg:p-2 pb-2 lg:pb-4 text-black  bg-white text-3xl z-10 cursor-pointer  opacity-100 group-hover:opacity-0 transition-all duration-300"
      onClick={onClick}
    >
      <ArrowBackIosNewIcon className="!text-lg lg:!text-2xl !font-thin" />
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
    <div style={{ fontFamily: "Open Sans" }} className="slider-container h-[40vh] lg:h-[23rem] w-full overflow-hidden">
      <Slider {...settings}>
        {carouselData?.data?.data?.map((item, i) => (
          <div className=" relative ">
            <img
              decoding="async"
              src={baseURL + item?.image.url}
              alt=""
              className={`h-[40vh] lg:h-[23rem] !bg-opacity-80 w-full object-cover  transition-transform duration-[3000ms] ease-in-out ${
                currentSlide === i ? "scale-125" : "scale-100"
              }`}
            />
            <div className="absolute pt-[6%] lg:pt-[5rem] top-0 left-0  lg:px-[10rem] px-[8.5%] h-full  bg-black  bg-opacity-50 w-[100%]   text-center  text-white">
              <div className="text-2xl lg:text-5xl !capitalize !leading-8 lg:!leading-none  font-bold">
                <div dangerouslySetInnerHTML={{ __html: item?.title }} />
              </div>
              {/* <div className="text-2xl lg:text-5xl !capitalize !leading-8 lg:!leading-none  font-bold">
                {item?.title}
              </div> */}
              <div className="text-base lg:text-xl !leading-4 lg:!leading-6 family-open-sans mt-1 lg:mt-2 pb-2 lg:mb-3 font-medium">
                <div dangerouslySetInnerHTML={{ __html: item?.subtitle }} />
              </div>
              {/* <div className="text-base lg:text-xl !leading-4 lg:!leading-6 family-open-sans mt-1 lg:mt-2 pb-2 lg:mb-3 font-medium">
                {item?.subtitle}
              </div> */}
              <div className="family-open-sans leading-3 lg:leading-5 text-[11px] lg:text-base">
                <div dangerouslySetInnerHTML={{ __html: item?.description }} />
              </div>
              {/* <div className="family-open-sans leading-3 lg:leading-5 text-[11px] lg:text-base">
                {item?.description}
              </div> */}
              {item?.action && (
                <CustomButton className="bg-primary !rounded-full !py-1.5 lg:!py-2 !mt-3 lg:!mt-7">
                  <Link to={item?.action?.link} target="_blank" className=" family-open-sans text-sm lg:text-lg">
                    {item?.action?.name}
                  </Link>{" "}
                  <ArrowForwardIosIcon className="!text-xs lg:!text-base !ml-2" />
                </CustomButton>
              )}
            </div>
          </div>
        ))}
        {/* <div  className="relative">
        <img  decoding="async"  src={slider2}  alt="" className={`h-[23rem] w-full object-cover  transition-transform duration-[3000ms] ease-in-out  ${
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
         <img decoding="async" src={slider3} className={`zoom-slide h-[23rem] !bg-opacity-80 w-full object-cover  transition-transform duration-[3000ms] ease-in-out  ${
                currentSlide === 2 ? "scale-125" : "scale-100"
              }`}  alt=""  />
       
        </div> */}
      </Slider>
    </div>
  )
}

export default Sliders
