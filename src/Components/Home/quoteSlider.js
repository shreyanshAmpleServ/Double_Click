import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { gsap } from 'gsap'
import React, { useEffect, useState } from "react"
import { FaQuoteLeft } from "react-icons/fa"
import { useQuery } from "react-query"
import Slider from "react-slick"
import { testimonialServiceFn } from "Services/Home"
import bg2 from "../../Assests/Content/bg_2.jpg"

// Custom Arrow Components
const NextArrow = ({ onClick }) => {
  return (
    <div
      className="absolute flex items-center bg-blue-900 bg-opacity-20 overflow-hidden  h-full top-0 right-0 p-5 pb-6 text-white text-3xl z-10 cursor-pointer  "
      onClick={onClick}
    >
      <ArrowForwardIosIcon className="!!font-thin" />
    </div>
  )
}

const PrevArrow = ({ onClick }) => {
  return (
    <div
      className="absolute flex items-center bg-blue-900 bg-opacity-20 overflow-hidden  h-full top-0 left-0 p-5 pb-6 text-white text-3xl z-10 cursor-pointer  opacity-100 group-hover:opacity-0 transition-all duration-300"
      onClick={onClick}
    >
      <ArrowBackIosNewIcon className="!!font-thin" />
    </div>
  )
}

function QuotationSliders() {
  const baseURL = process.env.REACT_APP_API_URL
  const [currentSlide, setCurrentSlide] = useState(0)
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
  }

  useEffect(() => {
    gsap.from('.boxs', {
      y: 300,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      // ease: 'power3.out',
      // scrollTrigger: {
      //   trigger: '.box',
      //   // start: 'top 100%',
      //   toggleActions: 'play none none none',
      // },
    });
  }, []);
      const {
          data: testimonialData,
          isLoading,
          refetch,
        } = useQuery(["testimonial"], () => testimonialServiceFn())
  return (
    <div
      style={{
        backgroundImage: `url(${bg2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
      className="boxs h-[35vh] lg:h-[55vh] w-[90vw] lg:w-[74vw] rounded-lg m-5 lg:mx-[13vw] lg:my-16  overflow-hidden"
    >
      <div className="slider-container  h-[40vh] lg:h-[55vh] w-[90vw] lg:w-[74vw] bg-blue-900 rounded-lg bg-opacity-80  ">
        <Slider {...settings}>
         {testimonialData?.data?.data?.map((item)=>( <div className="relative h-[40vh] lg:h-[55vh] w-[90vw] lg:w-[74vw]">
            <div className="absolute left-[15%] top-10 flex flex-col text-white gap-4 !justify-center w-[70%] !items-center">
             <div className="relative overflow-hidden">
                 <img
                decoding="async"
                // src={slider3}
                src={baseURL+item?.avatar?.url}
                className={`opacity-70 h-24 w-24  rounded-full object-cover `}
                alt=""
              />
              <FaQuoteLeft  className="absolute opacity-95 bottom-0 mb-[-2px] left-[40%] !text-2xl" />
              </div>
              <div className="!font-thin text-sm lg:text-base text-center family-serif2">
                {item?.comment}
              </div>
              <div className="font-semibold">-- {item?.name + " ( "+item?.degination + " )"}</div>
            </div>
          </div>))}
          {/* <div className="relative h-[40vh] lg:h-[55vh] w-[90vw] lg:w-[74vw]">
            <div className="absolute left-[15%] top-10 flex flex-col text-white gap-4 !justify-center w-[70%] !items-center">
             <div className="relative overflow-hidden">
              <img
                decoding="async"
                src={slider2}
                className={`opacity-70 h-24 w-24  rounded-full object-cover `}
                alt=""
              />
                            <FaQuoteLeft  className="absolute opacity-95 bottom-0 mb-[-2px] left-[40%] !text-2xl" />
                            </div>
              <div className="!font-thin text-sm lg:text-base text-center family-serif2">
                Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the
                blind texts. Aliquam gravida, urna quis ornare imperdiet,
              </div>
              <div className="font-semibold">-- John Gerry Design Hunt</div>
            </div>
          </div>
          <div className="relative h-[40vh] lg:h-[55vh] w-[90vw] lg:w-[74vw]">
            <div className="absolute left-[15%] top-10 flex flex-col text-white gap-4 !justify-center w-[70%] !items-center">
             <div className="relative overflow-hidden">
              <img
                decoding="async"
                src={slider1}
                className={`opacity-70 h-24 w-24  rounded-full object-cover `}
                alt=""
              />
                            <FaQuoteLeft  className="absolute opacity-95 bottom-0 mb-[-2px] left-[40%] !text-2xl" />
                            </div>
              <div className="!font-thin text-sm lg:text-base text-center family-serif2">
                Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the
                blind texts. Aliquam gravida, urna quis ornare imperdiet,
              </div>
              <div className="font-semibold">-- John Gerry Design Hunt</div>
            </div>
          </div>
          <div className="relative h-[40vh] lg:h-[55vh] w-[90vw] lg:w-[74vw]">
            <div className="absolute left-[15%] top-10 flex flex-col text-white gap-4 !justify-center w-[70%] !items-center">
             <div className="relative overflow-hidden">
              <img
                decoding="async"
                src={slider4}
                className={`opacity-70 h-24 w-24  rounded-full object-cover `}
                alt=""
              />
                            <FaQuoteLeft  className="absolute opacity-95 bottom-0 mb-[-2px] left-[40%] !text-2xl" />
              </div>
              <div className="!font-thin text-sm lg:text-base text-center family-serif2">
                Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the
                blind texts. Aliquam gravida, urna quis ornare imperdiet,
              </div>
              <div className="font-semibold">-- John Gerry Design Hunt</div>
            </div>
          </div>
          <div className="relative h-[40vh] lg:h-[55vh] w-[90vw] lg:w-[74vw]">
            <div className="absolute left-[15%] top-10 flex flex-col text-white gap-4 !justify-center w-[70%] !items-center">
             <div className="relative overflow-hidden">
              <img
                decoding="async"
                src={slider5}
                className={`opacity-70 h-24 w-24  rounded-full object-cover `}
                alt=""
              />
                            <FaQuoteLeft  className="absolute opacity-95 bottom-0 mb-[-2px] left-[40%] !text-2xl" />
              </div>
              <div className="!font-thin text-sm lg:text-base text-center family-serif2">
                Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the
                blind texts. Aliquam gravida, urna quis ornare imperdiet,
              </div>
              <div className="font-semibold">-- John Gerry Design Hunt</div>
            </div>
          </div>

          <div className="relative h-[40vh] lg:h-[55vh] w-[90vw] lg:w-[74vw]">
            <div className="absolute left-[15%] top-10 flex flex-col text-white gap-4 !justify-center w-[70%] !items-center">
             <div className="relative overflow-hidden">
              <img
                decoding="async"
                src={slider6}
                className={`opacity-70 h-24 w-24  rounded-full object-cover `}
                alt=""
              />
                            <FaQuoteLeft  className="absolute opacity-95 bottom-0 mb-[-2px] left-[40%] !text-2xl" />
              </div>
              <div className="!font-thin text-sm lg:text-base text-center family-serif2">
                Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the
                blind texts. Aliquam gravida, urna quis ornare imperdiet,
              </div>
              <div className="font-semibold">-- John Gerry Design Hunt</div>
            </div>
          </div>

          <div className="relative h-[40vh] lg:h-[55vh] w-[90vw] lg:w-[74vw]">
            <div className="absolute left-[15%] top-10 flex flex-col text-white gap-4 !justify-center w-[70%] !items-center">
             <div className="relative overflow-hidden">
              <img
                decoding="async"
                src={slider7}
                className={`opacity-70 h-24 w-24  rounded-full object-cover `}
                alt=""
              />
                            <FaQuoteLeft  className="absolute opacity-95 bottom-0 mb-[-2px] left-[40%] !text-2xl" />
              </div>
              <div className="!font-thin text-sm lg:text-base text-center family-serif2">
                Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the
                blind texts. Aliquam gravida, urna quis ornare imperdiet,
              </div>
              <div className="font-semibold">-- John Gerry Design Hunt</div>
            </div>
          </div> */}
        </Slider>
      </div>
    </div>
  )
}

export default QuotationSliders
