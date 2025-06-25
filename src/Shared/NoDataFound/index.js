import notFound from "../../Assests/notFound.jpg"
const NoDataFound = () => {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-3 py-16">
        <img src={notFound} alt="" className="w-1/2" />
        <p className="text-3xl font-semibold">Page not Found</p>
      </div>
    )
}

export default NoDataFound
