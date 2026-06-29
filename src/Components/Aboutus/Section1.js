import { useState, useEffect } from "react"
import { Home, KeyboardArrowRight, PlayArrow } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import bg2 from "../../Assests/Content/07/breadcrumbs_bg.jpg"

const Section1 = ({ data, isTeam }) => {
  const baseURL = process.env.REACT_APP_API_URL
  const navigate = useNavigate()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="relative w-full min-h-[380px] sm:min-h-[420px] md:min-h-[500px] lg:h-[550px] overflow-hidden bg-slate-900">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={data?.featuredMedia?.url ? baseURL + data?.featuredMedia?.url : bg2}
          alt="Banner Background"
          className={`w-full h-full object-cover transition-transform duration-[10s] ease-out ${
            isLoaded ? "scale-110" : "scale-100"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 md:px-10 lg:px-20 py-10">
        {/* Breadcrumb */}
        <nav
          className={`flex flex-wrap items-center gap-2 text-[10px] sm:text-xs md:text-sm mb-2 transition-all duration-1000 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <button onClick={() => navigate("/")} className="flex items-center gap-1 text-white/70 hover:text-white">
            <Home className="text-xs sm:text-sm" />
            <span>Home</span>
          </button>

          <KeyboardArrowRight className="text-white/30 text-xs" />
          <span className="text-white/70">About Us</span>
          <KeyboardArrowRight className="text-white/30 text-xs" />

          <span className="text-red-500 font-medium uppercase tracking-wider">
            {isTeam ? "Management Team" : "Company Profile"}
          </span>
        </nav>

        {/* Heading */}
        <div
          className={`max-w-3xl transition-all duration-1000 delay-300 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3">
            {isTeam ? (
              <>
                <span className="block">Meet Our</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-red-500">
                  Management Team
                </span>
              </>
            ) : (
              <>
                <span className="block text-slate-300 text-xl sm:text-2xl md:text-3xl font-light mb-2">
                  Our Journey
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-red-500">
                  {data?.title || "Company Profile"}
                </span>
              </>
            )}
          </h1>

          {/* Decorative line */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1 w-14 sm:w-20 bg-red-600 rounded-full" />
            <div className="h-1 w-4 bg-red-600/40 rounded-full" />
            <div className="h-1 w-2 bg-red-600/20 rounded-full" />
          </div>

          {/* Description */}
          <p
            className={`text-white text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mb-4 transition-all duration-1000 delay-500 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            {data?.description ||
              "Leading the way in digital transformation and strategic consulting with global expertise and local precision."}
          </p>

          {/* Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 transition-all duration-1000 delay-700 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <a
              href="/contact"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition-all hover:shadow-lg hover:shadow-red-600/30 flex items-center justify-center gap-2"
            >
              Get In Touch <PlayArrow className="text-sm" />
            </a>

            <button
              onClick={() => document.getElementById("request-quote")?.click()}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 border border-white/30 text-white font-medium rounded-md hover:bg-white hover:!text-slate-900 transition-all backdrop-blur-sm flex items-center justify-center gap-2"
            >
              Request a Demo <PlayArrow className="text-sm" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div
          className={`mt-6 grid grid-cols-2 sm:flex sm:flex-wrap items-start sm:items-center gap-4 sm:gap-8 transition-all duration-1000 delay-1000 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {[
            { label: "Years Experience", value: "15+", icon: "🏆" },
            { label: "Countries Served", value: "20+", icon: "🌍" },
            { label: "Enterprise Clients", value: "50+", icon: "👥" },
            { label: "Projects Delivered", value: "450+", icon: "🗂️" },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-lg border border-white/10">
                {stat.icon}
              </div>
              <div>
                <p className="text-white font-bold text-base sm:text-lg md:text-xl">{stat.value}</p>
                <p className="text-white text-[10px] sm:text-xs uppercase tracking-wider">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Icons */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3">
        {["FB", "TW", "IN"].map((soc) => (
          <div
            key={soc}
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all cursor-pointer text-xs font-bold"
          >
            {soc}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Section1

// import { Home } from "@mui/icons-material"
// import { useNavigate } from "react-router-dom"
// import bg2 from "../../Assests/Content/07/breadcrumbs_bg.jpg"

// const Section1 = ({ data, isTeam }) => {
//   const baseURL = process.env.REACT_APP_API_URL
//   const navigate = useNavigate()
//   return (
//     <>
//       <div className="">
//         <div
//           className="relative h-[19rem] !object-fit-fill  lg:h-[19rem]"
//           // style={{
//           //   backgroundImage: `url(${data?.featuredMedia?.url ? baseURL + data?.featuredMedia?.url : bg2})`,
//           //   backgroundSize: "cover",
//           //   backgroundPosition: "center",
//           //   backgroundRepeat: "no-repeat",
//           //   backgroundAttachment: "fixed",
//           // }}
//         >
//           <img
//             src={data?.featuredMedia?.url ? process.env.REACT_APP_API_URL + data?.featuredMedia?.url : bg2}
//             alt="Cover"
//             className="relative h-[19rem] w-full"
//           />
//           <div className="bg-black bg-opacity-50 blur-sm absolute top-0 h-full w-full left-0 flex justify-center items-center "></div>
//           <div
//             className={`flex flex-col   ${
//               !data?.IsDarkCover ? "text-white" : "text-black"
//             } absolute top-[15%]  justify-between px-[3%] lg:px-[7%] gap-4 `}
//           >
//             <div className="text-xs lg:text-base whitespace-nowrap text-wrap font-semibold  gap-2  ">
//               <Home className="hover:cursor-pointer hover:!text-red-600 mb-2" onClick={() => navigate("/")} /> / ABOUT
//               US / {isTeam ? "Management Team" : "Company Profile"}
//             </div>
//             <div className="text-base lg:text-3xl text-wrap my-2 font-semibold ">
//               {isTeam ? "Management Team" : data?.title || "Company Profile"}
//             </div>
//             <div className="lg:w-[75%] !text-sm font-thin space border-l-2 p-1 border-red-700 pl-4 ">
//               {data?.description || ""}
//             </div>

//           </div>
//         </div>
//       </div>
//       <div className="w-[100vw] h-[65vh] ">
//       <iframe loading="lazy"
// 					src="https://maps.google.com/maps?q=London%20Eye%2C%20London%2C%20United%20Kingdom&amp;t=m&amp;z=10&amp;output=embed&amp;iwloc=near"
// 					title="London Eye, London, United Kingdom"
// 					aria-label="London Eye, London, United Kingdom"
//                     className="w-full h-full"
// 			></iframe>
//             </div>
//     </>
//   )
// }
// export default Section1
