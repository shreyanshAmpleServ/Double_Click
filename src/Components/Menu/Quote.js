import { useQuery } from "react-query"
import mapImage from "../../Assests/Content/map-bg-orange.jpg"
import { useEffect, useState } from "react"

const QuoteSection = ({ value, data }) => {
  return (
    <>
      <div className={`flex  gap-4 ${value == "Half" ? "w-[100%]  lg:w-[50%]" : " w-[100%]"} p-[6%]`}>
        <div className="flex flex-col justify-center ">
          <div className="text-3xl font-bold mb-4">
            {/* <span className="text-primary2">About </span> */}
            <span className="text-primary">{data?.title}</span>
          </div>
          <div>
            {" "}
            <div dangerouslySetInnerHTML={{ __html: data.body }} />
          </div>
        </div>
        {/* <img src={mapImage} alt="Map" className="w-[90%] h-full object-cover object-center" /> */}
      </div>
    </>
  )
}

export default QuoteSection
