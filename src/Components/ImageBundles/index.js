import React from "react"
import ImageStack from "./ImageSlider"

const ImageBundle = ({ images, customWidth }) => {
  const baseURL = process.env.REACT_APP_API_URL
  const sampleImages = images?.map((img, index) => ({
    src: img?.file ? baseURL + img?.file?.url : "Image not found",
    alt: img?.name || "Image-" + (index + 1),
  }))
  //   const sampleImages = [
  //     {
  //       src: "https://www.sap.com/dam/application/shared/photos/products-e-i/sap-industry-network-automotive-device-jitovrw.png/_jcr_content/renditions/original.adapt.-1_1268.false.false.false.false.png/1716912337156.png",
  //       alt: "Real Estate Image",
  //     },
  //     {
  //       src: "https://www.sap.com/dam/application/shared/photos/products-e-i/sap-industry-network-automotive-device-emob2.png/_jcr_content/renditions/original.adapt.-1_684.false.false.false.false.png/1716912335320.png",
  //       alt: "Managed Services Image",
  //     },
  //     {
  //       src: "https://www.sap.com/dam/application/shared/photos/products-e-i/sap-industry-network-automotive-device-batman2.png/_jcr_content/renditions/original.adapt.-1_684.false.false.false.false.png/1716912334675.png",
  //       alt: "Battery Manufacturing Image",
  //     },
  //     {
  //       src: "https://www.sap.com/dam/application/shared/photos/products-s-st/sap-s4hana-cloud-private-device-eman.png/_jcr_content/renditions/original.adapt.-1_1268.false.false.false.false.png/1734530814694.png",
  //       alt: "Customer Overview Image",
  //     },
  //   ]
  console.log("images", sampleImages)

  return (
    <ImageStack customWidth={customWidth} images={sampleImages} />
    // <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
    //   <div className="text-center">
    // <h1 className="text-3xl font-bold text-gray-800 mb-8">Stacked Image Slider</h1>
    //   </div>
    // </div>
  )
}

export default ImageBundle
