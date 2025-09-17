// import notFound from "../../Assests/notFound-removebg-preview.png"
import notFound from "../../Assests/notFound.jpg"
const NoDataFound = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[100vw]  min-w-[320px] max-w-screen-2xl mx-auto min-h-[30rem] max-h-[70vh] bg-white gap-3 py-16">
      <img src={notFound} alt="" className="w-2/3" />
      <p className="text-3xl font-semibold">Page not Found</p>
    </div>
  )
}

export default NoDataFound
