import { useEffect, useState } from "react"
import Slider from "react-slick"

const NextArrow = (props) => {
  const { onClick } = props
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-primary bg-opacity-70 text-white p-3 text-xl z-10 rounded-sm hover:bg-opacity-80"
    >
      ›
    </button>
  )
}

const PrevArrow = (props) => {
  const { onClick } = props
  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-primary bg-opacity-70 text-white p-3 text-xl z-10 rounded-sm hover:bg-opacity-80"
    >
      ‹
    </button>
  )
}

export const Sliders = ({ customWidth, value, data }) => {
  const baseURL = process.env.REACT_APP_API_URL
  const [images, setImages] = useState([])
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 slides at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }
  useEffect(() => {
    data?.map((i) => setImages((prev) => [...prev, baseURL + i?.url]))
  }, [data])
  return (
    <>
      <div
        className={`max-w-6xl ${
          customWidth ? "w-[100%]" : value == "Half" ? "w-[100%]  lg:w-[50%]" : " w-[100%]"
        } mx-auto p-4`}
      >
        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={index} className="px-2">
              <img src={img} alt={`Slide ${index + 1}`} className="rounded-xl h-[45vh] shadow-md w-full " />
            </div>
          ))}
        </Slider>
      </div>
    </>
  )
}
