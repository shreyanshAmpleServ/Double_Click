import ArticleIcon from "@mui/icons-material/Article"
import gsap from "gsap"
import RequestQuoteModal from "Pages/ReqQuote"
import { useEffect, useState } from "react"
import { FaAngleDown, FaAngleRight, FaAngleUp } from "react-icons/fa"
import { useQuery } from "react-query"
import { blogFn, footerServiceFn } from "Services/Home"
import CustomButton from "Shared/CustomButton"
import Loader from "Shared/Loader"
import logo from "../../Assests/Content/logo_footer.png"
import SerachModal from "./SearchModal"
import SAPLogo from "../../Assests/SAPLogo.png"
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone"
import EmailIcon from "@mui/icons-material/Email"

/**
 * Header component
 * @param {Object} props - Component props
 * @param {string} props.navItem - The navigation item
 */
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isSearch, setIsSearch] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [blogData, setBlogData] = useState()
  const [footData, setFootData] = useState([])
  const [blogOpenMap, setBlogOpenMap] = useState({})
  const [subMenuMap, setsubMenuMap] = useState({})
  const [subMenu2Map, setsubMenu2Map] = useState({})
  const [aboutOpen, setAboutOpen] = useState(false)

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    gsap.from(".nav-item-animate", {
      y: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
    })
  }, [])

  const findData = (key) => {
    return footData?.filter((item) => item.key === key)?.[0]
  }

  const { data: footerData } = useQuery(["footerDetails"], () => footerServiceFn())
  useEffect(() => {
    if (footerData) {
      setFootData(footerData?.data?.data)
    }
  }, [footerData])

  const { data: blogDatas, isLoading } = useQuery(["menu"], () => blogFn())
  useEffect(() => {
    if (blogDatas) {
      setBlogData(blogDatas)
    }
  }, [blogDatas])

  return (
    <>
      {isLoading && (
        <div className="fixed family-serif2 h-[100vh] w-[100vw] z-40 bg-black bg-opacity-90 flex justify-center items-center">
          <Loader />
        </div>
      )}
      <header className="w-full family-serif2 hidden lg:block z-30">
        <div className="w-full !bg-[#4b5563]  text-white">
          <div className="flex pl-[5rem] pr-[3rem] max-w-screen-2xl mx-auto justify-between p-2">
            <div className="col">
              <img src={SAPLogo} className="h-8 w-16" alt="SAP Logo" />
            </div>
            <div className="col-md-auto">
              <span className="mr-3">
                <PhoneIphoneIcon className="!text-white !font-thin !text-sm" />
                {findData("company_phone")?.value}
              </span>
              <span className="mr-3">
                <EmailIcon className="!text-white !font-thin mr-1 !text-sm" />
                {findData("company_email")?.value}
              </span>
            </div>
          </div>
        </div>
      </header>
      <nav
        className={`bg-white !sticky !top-0 !left-0 z-40 w-full flex items-center max-w-screen-2xl mx-auto text-black py-4 px-[0%] lg:px-[4%] transition-shadow duration-300 ${
          isScrolled ? "shadow-lg shadow-red-200" : ""
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center w-full">
          <a href="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-14" />
          </a>

          {/* Desktop Menu */}
          <div
            className="hidden !uppercase lg:flex space-x-3 text-sm align-content-end !text-black1"
            style={{ fontWeight: "600", color: "#333" }}
          >
            <div className="nav-item-animate">
              <a href="/" className="nav-link-decorative">
                Home
              </a>
            </div>

            <div className="group nav-item-animate">
              <div className="nav-link-decorative flex items-center">
                ABOUT US
                <svg
                  className="ml-0 w-3 h-3 font-bold group-hover:rotate-180 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="absolute w-auto bg-white border border-gray-200 shadow-xl text-xs whitespace-nowrap font-medium rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform scale-y-0 origin-top group-hover:scale-y-100">
                <a
                  href="/aboutus/company-profile"
                  className="!capitalize whitespace-nowrap border-b border-gray-100 flex px-5 py-2 hover:bg-gray-50 transition-colors duration-300"
                >
                  Company Profile
                </a>
                <a
                  href="/aboutus/management-team"
                  className="!capitalize whitespace-nowrap flex px-5 py-2 hover:bg-gray-50 transition-colors duration-300"
                >
                  Management Team
                </a>
              </div>
            </div>

            {/* Blog Dropdown */}
            {blogData?.data?.map(
              (item) =>
                item?.slug !== "blogs" && (
                  <div key={item.slug} className="group nav-item-animate">
                    <a
                      href={item?.article ? `/${item?.article?.slug}` : "#"}
                      className="nav-link-decorative flex items-center"
                    >
                      {item?.name}
                      {item?.children?.length > 0 && (
                        <svg
                          className="ml-0 w-4 h-4 group-hover:rotate-180 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </a>
                    {item?.children?.length > 0 && (
                      <div className="absolute w-auto bg-white shadow-xl border border-gray-200 text-xs whitespace-nowrap font-medium rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform scale-y-0 origin-top group-hover:scale-y-100">
                        {item?.children
                          ?.slice()
                          .sort((a, b) => a.order - b.order)
                          .map((i) => (
                            <div key={i.slug} className="group/submenu relative">
                              <a
                                href={
                                  i?.children?.length > 0
                                    ? "#"
                                    : i?.article
                                    ? `/${item.slug}/${i.article.slug}`
                                    : "/no-article-found"
                                }
                                className="!capitalize whitespace-nowrap border-b border-gray-100 flex justify-between px-5 py-2 hover:bg-gray-50 transition-colors duration-300"
                              >
                                {i.name}
                                {i?.children?.length > 0 && (
                                  <FaAngleRight className="text-black !font-thin !mt-1 group-hover/submenu:rotate-90 transition-transform duration-300" />
                                )}
                              </a>
                              {i?.children?.length > 0 && (
                                <div className="absolute left-full top-0 w-auto bg-white shadow-xl border border-gray-200 text-xs whitespace-nowrap font-medium rounded opacity-0 invisible group-hover/submenu:opacity-100 group-hover/submenu:visible transition-all duration-300 z-50 transform scale-y-0 origin-left group-hover/submenu:scale-y-100">
                                  {i?.children?.map((j) => (
                                    <div key={j.slug} className="group/sub2menu relative">
                                      <a
                                        href={
                                          j?.children?.length > 0
                                            ? "#"
                                            : j?.article
                                            ? `/${item.slug}/${i.slug}/${j.article.slug}`
                                            : "/no-article-found"
                                        }
                                        className="!capitalize whitespace-nowrap border-b border-gray-100 flex justify-between px-5 py-2 hover:bg-gray-50 transition-colors duration-300"
                                      >
                                        {j.name}
                                        {j?.children?.length > 0 && (
                                          <FaAngleRight className="text-black !font-thin !mt-1 group-hover/sub2menu:rotate-90 transition-transform duration-300" />
                                        )}
                                      </a>
                                      {j?.children?.length > 0 && (
                                        <div className="absolute left-full top-0 w-auto bg-white shadow-xl border border-gray-200 text-xs whitespace-nowrap font-medium rounded opacity-0 invisible group-hover/sub2menu:opacity-100 group-hover/sub2menu:visible transition-all duration-300 z-50 transform scale-y-0 origin-left group-hover/sub2menu:scale-y-100">
                                          {j?.children?.map((k) => (
                                            <a
                                              key={k.slug}
                                              href={
                                                k?.article
                                                  ? `/${item.slug}/${i.slug}/${j.slug}/${k.article.slug}`
                                                  : "/no-article-found"
                                              }
                                              className="!capitalize px-5 flex border-b border-gray-100 py-2 hover:bg-gray-50 transition-colors duration-300"
                                            >
                                              {k.name}
                                            </a>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                )
            )}

            <div className="nav-item-animate">
              <a href="/blogs" className="nav-link-decorative">
                BLOGS
              </a>
            </div>
            <div className="nav-item-animate">
              <a href="/contact" className="nav-link-decorative">
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden fixed top-20 left-0 w-full h-[100vh] bg-white shadow-lg text-sm overflow-y-scroll font-medium z-50 mobile-menu-slide-down">
            <div>
              <a href="/" className="block px-6 py-4 border-b hover:bg-gray-100 font-bold">
                Home
              </a>
            </div>
            <div>
              <button
                onClick={() => setAboutOpen(!aboutOpen)}
                className="w-full text-left px-6 py-4 border-b hover:bg-gray-100 flex justify-between items-center font-bold"
              >
                About Us
                <span className="text-sm">{aboutOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
              </button>
              {aboutOpen && (
                <div className="pl-8 bg-gray-50 mobile-submenu-fade">
                  <a href="/aboutus/company-profile" className="block py-3 px-2 hover:bg-gray-100 text-gray-700">
                    Company Profile
                  </a>
                  <a href="/aboutus/management-team" className="block py-3 px-2 hover:bg-gray-100 text-gray-700">
                    Management Team
                  </a>
                </div>
              )}
            </div>
            {blogData?.data?.map(
              (item, idx) =>
                item?.slug !== "blogs" && (
                  <div key={idx}>
                    {item?.children?.length > 0 ? (
                      <button
                        onClick={() => setBlogOpenMap((prev) => ({ ...prev, [idx]: !prev[idx] }))}
                        className="w-full text-left px-6 py-4 border-b hover:bg-gray-100 flex justify-between items-center font-bold"
                      >
                        {item?.name}
                        <span className="text-sm">{blogOpenMap[idx] ? <FaAngleUp /> : <FaAngleDown />}</span>
                      </button>
                    ) : (
                      <a
                        href={item?.article ? `/${item.article.slug}` : "/no-article-found"}
                        className="w-full text-left px-6 py-4 border-b hover:bg-gray-100 flex justify-between items-center font-bold"
                      >
                        {item?.name}
                      </a>
                    )}
                    {blogOpenMap[idx] && (
                      <div className="bg-gray-50 mobile-submenu-fade">
                        {item?.children
                          ?.slice()
                          .sort((a, b) => a.order - b.order)
                          .map((child, cIdx) => (
                            <div key={cIdx} className="block hover:bg-gray-100">
                              {child?.children?.length > 0 ? (
                                <button
                                  onClick={() => setsubMenuMap((prev) => ({ ...prev, [cIdx]: !prev[cIdx] }))}
                                  className="w-full text-left py-3 pl-8 pr-6 text-sm border-b hover:bg-gray-100 flex justify-between items-center text-gray-700"
                                >
                                  {child.name}
                                  <span>{subMenuMap[cIdx] ? <FaAngleUp /> : <FaAngleDown />}</span>
                                </button>
                              ) : (
                                <a
                                  href={child?.article ? `/${item.slug}/${child.article.slug}` : "/no-article-found"}
                                  className="block py-3 pl-8 text-sm border-b hover:bg-gray-200 text-gray-700"
                                >
                                  {child.name}
                                </a>
                              )}
                              {subMenuMap[cIdx] && child?.children?.length > 0 && (
                                <div className="pl-4 mt-1 mobile-submenu-fade">
                                  {child.children.map((sub, sIdx) => (
                                    <div key={sIdx}>
                                      {sub?.children?.length > 0 ? (
                                        <button
                                          onClick={() => setsubMenu2Map((prev) => ({ ...prev, [sIdx]: !prev[sIdx] }))}
                                          className="w-full text-left px-6 py-2 pl-10 border-b hover:bg-gray-200 text-gray-700 flex justify-between items-center"
                                        >
                                          {sub.name}
                                          <span>{subMenu2Map[sIdx] ? <FaAngleUp /> : <FaAngleDown />}</span>
                                        </button>
                                      ) : (
                                        <a
                                          href={
                                            sub?.article
                                              ? `/${item.slug}/${child.slug}/${sub.article.slug}`
                                              : "/no-article-found"
                                          }
                                          className="block px-6 py-2 pl-10 border-b hover:bg-gray-200 text-gray-700"
                                        >
                                          {sub.name}
                                        </a>
                                      )}
                                      {subMenu2Map[sIdx] && sub?.children?.length > 0 && (
                                        <div className="pl-4 mt-1 mobile-submenu-fade">
                                          {sub.children.map((sub2, s2Idx) => (
                                            <a
                                              key={s2Idx}
                                              href={
                                                sub2?.article
                                                  ? `/${item.slug}/${child.slug}/${sub.slug}/${sub2.article.slug}`
                                                  : "/no-article-found"
                                              }
                                              className="block px-6 py-2 pl-14 border-b hover:bg-gray-200 text-gray-700"
                                            >
                                              {sub2.name}
                                            </a>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                )
            )}
            <div>
              <a href="/blogs" className="block px-6 py-4 border-b hover:bg-gray-100 font-bold">
                BLOGS
              </a>
            </div>
            <div>
              <a href="/contact" className="block px-6 py-4 border-b hover:bg-gray-100 font-bold">
                Contact Us
              </a>
            </div>
          </div>
        )}

        <CustomButton
          id="request-quote"
          onClick={() => setIsModal(true)}
          className="whitespace-nowrap !text-base font-semibold !p-2 lg:!p-2 !min-w-10 lg:!min-w-32 !w-6 lg:!px-0  !bg-[#2f3985] !text-white hover:!bg-[#3f4db8]  hover:shadow-lg transition-all duration-300"
        >
          <ArticleIcon className="!text-lg !font-normal lg:mr-2" />
          <span className="hidden lg:!block">Req Quote</span>
        </CustomButton>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden !ml-2 text-gray-700 focus:outline-none z-50"
        >
          <svg
            className="w-8 h-8 !font-thin !text-gray-500 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeWidth="2"
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </nav>
      <SerachModal isSearch={isSearch} setIsSearch={setIsSearch} />
      <RequestQuoteModal modal={isModal} setModal={setIsModal} />
    </>
  )
}

export default Header

// import ArticleIcon from "@mui/icons-material/Article"
// import gsap from "gsap"
// import RequestQuoteModal from "Pages/ReqQuote"
// import { useEffect, useState } from "react"
// import { FaAngleDown, FaAngleRight, FaAngleUp } from "react-icons/fa"
// import { useQuery } from "react-query"
// import { blogFn, footerServiceFn } from "Services/Home"
// import CustomButton from "Shared/CustomButton"
// import Loader from "Shared/Loader"
// import logo from "../../Assests/Content/logo_footer.png"
// import SerachModal from "./SearchModal"
// import SAPLogo from "../../Assests/SAPLogo.png"
// import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone"
// import EmailIcon from "@mui/icons-material/Email"
// /**
//  * Header component
//  * @param {Object} props - Component props
//  * @param {string} props.navItem - The navigation item
//  */
// const Header = () => {
//   const [menuOpen, setMenuOpen] = useState(false)
//   const [isSearch, setIsSearch] = useState(false)
//   const [isModal, setIsModal] = useState(false)
//   const [blogData, setBlogData] = useState()
//   const [footData, setFootData] = useState([])
//   const [blogOpenMap, setBlogOpenMap] = useState({})
//   const [subMenuMap, setsubMenuMap] = useState({})
//   const [subMenu2Map, setsubMenu2Map] = useState({})
//   const [aboutOpen, setAboutOpen] = useState(false)

//   const [isScrolled, setIsScrolled] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 0) {
//         setIsScrolled(true)
//       } else {
//         setIsScrolled(false)
//       }
//     }

//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   useEffect(() => {
//     gsap.from(".box1", {
//       y: -300,
//       opacity: 0,
//       duration: 1,
//       stagger: 0.2,
//     })
//   }, [])
//   const findData = (key) => {
//     return footData?.filter((item) => item.key === key)?.[0]
//   }
//   const { data: footerData, isLoading: isDetailLoading } = useQuery(["footerDetails"], () => footerServiceFn())
//   useEffect(() => {
//     if (footerData) {
//       setFootData(footerData?.data?.data)
//     }
//   }, [footerData])

//   const { data: blogDatas, isLoading, refetch } = useQuery(["menu"], () => blogFn())
//   useEffect(() => {
//     if (blogDatas) {
//       setBlogData(blogDatas)
//     }
//   }, [blogDatas])
//   return (
//     <>
//       {isLoading && (
//         <div className="fixed family-serif2 h-[100vh] w-[100vw] z-50 bg-black bg-opacity-90 flex justify-center items-center">
//           {" "}
//           <Loader />
//         </div>
//       )}
//       <header class="w-full family-serif2 hidden lg:block z-30">
//         <div class="w-full  !bg-[#4b5563]  text-white">
//           <div class="flex  pl-[5rem] pr-[3rem]  max-w-screen-2xl mx-auto justify-between p-2">
//             <div class="col">
//               <img src={SAPLogo} className="h-8 w-16" />
//             </div>
//             <div class="col-md-auto">
//               <span class="mr-3">
//                 {/* <i class="icofont-ui-touch-phone"></i> */}
//                 <PhoneIphoneIcon className="!text-white !font-thin  !text-sm" />
//                 {findData("company_phone")?.value}
//               </span>
//               <span class="mr-3">
//                 <EmailIcon className="!text-white !font-thin mr-1 !text-sm" />
//                 <i class="icofont-ui-email"></i>
//                 {findData("company_email")?.value}
//               </span>
//             </div>
//           </div>
//         </div>
//       </header>
//       <nav
//         className={` bg-white !sticky !z-40 !top-0 !left-0 ${
//           isScrolled ? "shadow-lg shadow-red-200" : ""
//         } w-full flex items-center max-w-screen-2xl mx-auto text-black   py-4 px-[0%] lg:px-[4%]`}
//       >
//         <div className=" container mx-auto px-4 flex justify-between items-center w-full ">
//           <a href="/" className="flex items-center">
//             <img src={logo} alt="Logo" className="h-14" />
//           </a>

//           {/* Desktop Menu */}
//           <div
//             className="hidden  !uppercase lg:flex space-x-3 text-sm align-content-end  !text-black1 "
//             style={{ fontWeight: "550", color: "#4a4a4a" }}
//           >
//             <div>
//               <a href="/" className="text-black1 hover:text-red-600">
//                 Home
//               </a>
//             </div>

//             <div className=" group">
//               <div className="!uppercase flex whitespace-nowrap items-center  hover:text-red-600">
//                 ABOUT US
//                 <svg className="ml-0 z-50 w-3 h-3 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//               </div>
//               <div className="absolute   w-auto bg-white border shadow-lg text-xs whitespace-nowrap font-medium rounded hidden group-hover:block z-50">
//                 <a
//                   href="/aboutus/company-profile"
//                   className=" !capitalize whitespace-nowrap border-b flex px-4 py-2 hover:bg-gray-100"
//                 >
//                   Company Profile
//                 </a>
//                 <a
//                   href="/aboutus/management-team"
//                   className=" !capitalize whitespace-nowrap flex px-4 py-2  hover:bg-gray-100"
//                 >
//                   Management Team
//                 </a>
//               </div>
//             </div>

//             {/* Blog Dropdown */}
//             {blogData?.data?.map((item) => (
//               <>
//                 {item?.slug != "blogs" && (
//                   <div className=" group">
//                     <a
//                       href={item?.article ? `${window.location.origin}/${item?.article?.slug}` : "#"}
//                       className="!uppercase flex whitespace-nowrap items-center   hover:text-red-600"
//                     >
//                       {item?.name}
//                       {item?.children?.length > 0 && (
//                         <svg className="ml-0 z-50 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                         </svg>
//                       )}
//                     </a>
//                     <div className="absolute   w-auto bg-white shadow-lg border text-xs whitespace-nowrap font-medium rounded hidden group-hover:block z-50">
//                       {item?.children
//                         ?.slice()
//                         .sort((a, b) => a.order - b.order)
//                         .map((i) => (
//                           <>
//                             {i?.children?.length > 0 ? (
//                               <div className=" !capitalize  bg-gray-100 whitespace-nowrap flex justify-between px-4 py-1.5 border-b hover:bg-gray-100">
//                                 {i.name}
//                                 {i?.children?.length > 0 && <FaAngleDown className="text-black !font-thin !mt-1 " />}
//                               </div>
//                             ) : (
//                               <a
//                                 href={i?.article ? `${window.location.origin}/${item.slug}/${i?.article?.slug}` : ""}
//                                 className=" !capitalize whitespace-nowrap flex px-4 border-b py-2 hover:bg-gray-100"
//                               >
//                                 {/* {i?.children?.length > 0 &&  <FaAngleDown className="text-black !font-thin h-3  !mt-0.5 " />} */}
//                                 {i.name}
//                               </a>
//                             )}
//                             {/* {i?.children?.length > 0 && <svg className="mt-1 z-50 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>} */}
//                             {i?.children?.length > 0 &&
//                               i?.children?.map((j) => (
//                                 <>
//                                   {j?.children?.length > 0 ? (
//                                     <div className=" !capitalize bg-gray-200 whitespace-nowrap border-b pl-10 flex justify-between px-4 py-1 hover:bg-gray-100">
//                                       {j.name}
//                                       {j?.children?.length > 0 && (
//                                         <FaAngleDown className="text-black !font-thin   !mt-1 " />
//                                       )}
//                                     </div>
//                                   ) : (
//                                     <a
//                                       href={
//                                         j?.article
//                                           ? `${window.location.origin}/${item.slug}/${i.slug}/${j?.article?.slug}`
//                                           : "/no-article-found"
//                                       }
//                                       className=" !capitalize pl-10 bg-gray-100 whitespace-nowrap border-b flex  px-4 py-1 hover:bg-gray-100"
//                                     >
//                                       {/* {i?.children?.length > 0 &&  <FaAngleRight className="text-black !font-thin h-3  !mt-0.5 " />} */}
//                                       {j.name}
//                                     </a>
//                                   )}

//                                   {j?.children?.length > 0 &&
//                                     j?.children?.map((k) => (
//                                       <a
//                                         href={
//                                           k?.article
//                                             ? `${window.location.origin}/${item.slug}/${i.slug}/${j.slug}/${k?.article?.slug}`
//                                             : `${window.location.origin}/no-article-found`
//                                         }
//                                         className=" !capitalize px-4 flex bg-gray-200 py-1 !pl-16 border-b    hover:bg-gray-200"
//                                       >
//                                         {k.name}
//                                       </a>
//                                     ))}
//                                 </>
//                               ))}
//                           </>
//                         ))}
//                     </div>
//                   </div>
//                 )}
//               </>
//             ))}
//             <div>
//               <a href="/blogs" className="hover:text-red-600">
//                 BLOGS
//               </a>
//             </div>
//             <div>
//               <a href="/contact" className="flex items-center whitespace-nowrap  hover:text-red-600">
//                 Contact Us
//               </a>
//             </div>
//           </div>
//         </div>
//         {/* Mobile Menu */}
//         {menuOpen && (
//           <div className="lg:hidden  absolute top-20 left-0 w-full h-[100vh] bg-white shadow-lg text-sm overflow-y-scroll font-medium z-50">
//             <div>
//               <a href="/" className="block px-6 py-3 border-b hover:bg-gray-100">
//                 Home
//               </a>
//             </div>
//             {/* <div>
//               <a href="/aboutus" className="block px-6 py-3 border-b hover:bg-gray-100">
//                 About Us
//               </a>
//             </div> */}
//             <div>
//               <button
//                 onClick={() => setAboutOpen(!aboutOpen)}
//                 className="w-full text-left px-6 py-3 border-b hover:bg-gray-100 flex justify-between items-center"
//               >
//                 About Us
//                 <span>{aboutOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
//               </button>
//               {aboutOpen && (
//                 <div className="pl-8 bg-gray-50">
//                   <a href="/aboutus/company-profile" className="block py-2 hover:bg-gray-100">
//                     Company Profile
//                   </a>
//                   <a href="/aboutus/management-team" className="block py-2 hover:bg-gray-100">
//                     Management Team
//                   </a>
//                 </div>
//               )}
//             </div>

//             {/* Blog with Submenu */}
//             {blogData?.data?.map((item, idx) => (
//               <>
//                 {item?.slug != "blogs" && (
//                   <div key={idx}>
//                     {item?.children?.length > 0 ? (
//                       <button
//                         onClick={() => setBlogOpenMap((prev) => ({ ...prev, [idx]: !prev[idx] }))}
//                         className="w-full text-left px-6 py-3 border-b hover:bg-gray-100 flex justify-between items-center"
//                       >
//                         {item?.name}
//                         {item?.children?.length > 0 && (
//                           <span>{blogOpenMap[idx] ? <FaAngleUp /> : <FaAngleDown />}</span>
//                         )}
//                       </button>
//                     ) : (
//                       <a
//                         href={
//                           item?.article
//                             ? `${window.location.origin}/${item.article.slug}`
//                             : `${window.location.origin}/no-article-found`
//                         }
//                         className="w-full text-left px-6 py-3 border-b hover:bg-gray-100 flex justify-between items-center"
//                       >
//                         {item?.name}
//                         {item?.children?.length > 0 && (
//                           <span>{blogOpenMap[idx] ? <FaAngleUp /> : <FaAngleDown />}</span>
//                         )}
//                       </a>
//                     )}
//                     {blogOpenMap[idx] && (
//                       <div className=" bg-gray-50">
//                         {item?.children
//                           ?.slice()
//                           .sort((a, b) => a.order - b.order)
//                           .map((child, cIdx) => (
//                             <div key={cIdx} className="block   hover:bg-gray-100">
//                               {child?.children?.length > 0 ? (
//                                 <div
//                                   onClick={() => setsubMenuMap((prev) => ({ ...prev, [cIdx]: !prev[cIdx] }))}
//                                   className=" py-2 pl-8 pr-6 text-sm border-b hover:bg-gray-100 flex justify-between items-center"
//                                 >
//                                   {child.name}{" "}
//                                   {child?.children?.length > 0 && (
//                                     <span>
//                                       {blogOpenMap[idx] && subMenuMap[cIdx] ? <FaAngleUp /> : <FaAngleDown />}
//                                     </span>
//                                   )}
//                                 </div>
//                               ) : (
//                                 <a
//                                   href={
//                                     child?.article
//                                       ? `${window.location.origin}/${item.slug}/${child.article.slug}`
//                                       : `${window.location.origin}/no-article-found`
//                                   }
//                                   className="block py-2 pl-8 text-sm border-b hover:bg-gray-200"
//                                 >
//                                   {child.name}
//                                 </a>
//                               )}
//                               {/* If there are sub-children */}
//                               {child?.children?.length > 0 && blogOpenMap[idx] && subMenuMap[cIdx] && (
//                                 <div className="pl-4 mt-1">
//                                   {child.children.map((sub, sIdx) => (
//                                     <>
//                                       {sub?.children?.length > 0 ? (
//                                         <div
//                                           key={sIdx}
//                                           onClick={() => setsubMenu2Map((prev) => ({ ...prev, [sIdx]: !prev[sIdx] }))}
//                                           className=" px-6 py-2 pl-10 border-b hover:bg-gray-200  text-gray-700 hover:text-red-600 flex justify-between items-center"
//                                         >
//                                           {/* {sub?.children?.length > 0 && <FaAngleRight className="inline-block mr-1 text-red-600" />} */}
//                                           {sub.name}
//                                           {sub?.children?.length > 0 && (
//                                             <span>
//                                               {blogOpenMap[idx] && subMenuMap[cIdx] && subMenu2Map[sIdx] ? (
//                                                 <FaAngleUp />
//                                               ) : (
//                                                 <FaAngleDown />
//                                               )}
//                                             </span>
//                                           )}
//                                         </div>
//                                       ) : (
//                                         <a
//                                           key={sIdx}
//                                           href={
//                                             sub?.article
//                                               ? `${window.location.origin}/${item.slug}/${child.slug}/${sub.article.slug}`
//                                               : `${window.location.origin}/no-article-found`
//                                           }
//                                           className=" px-6 py-2 pl-10 border-b hover:bg-gray-200   hover:text-red-600 flex justify-between items-center"
//                                         >
//                                           {/* {sub?.children?.length > 0 && <FaAngleRight className="inline-block mr-1 text-red-600" />} */}
//                                           {sub.name}{" "}
//                                         </a>
//                                       )}
//                                       {/* If there are sub-children */}
//                                       {sub?.children?.length > 0 &&
//                                         blogOpenMap[idx] &&
//                                         subMenuMap[cIdx] &&
//                                         subMenu2Map[sIdx] && (
//                                           <div className="pl-4 mt-1">
//                                             {sub.children.map((sub2, s2Idx) => (
//                                               <a
//                                                 key={s2Idx}
//                                                 href={
//                                                   sub2?.article
//                                                     ? `${window.location.origin}/${item.slug}/${child.slug}/${sub?.slug}/${sub2.article.slug}`
//                                                     : `${window.location.origin}/no-article-found`
//                                                 }
//                                                 className=" px-6 py-2 pl-14 border-b hover:bg-gray-200   hover:text-red-600 flex justify-between items-center"
//                                               >
//                                                 {/* {sub2?.children?.length > 0 && <FaAngleRight className="inline-block mr-1 text-red-600" />} */}
//                                                 {sub2.name}{" "}
//                                               </a>
//                                             ))}
//                                           </div>
//                                         )}
//                                     </>
//                                   ))}
//                                 </div>
//                               )}
//                             </div>
//                           ))}
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </>
//             ))}
//             <div>
//               <a href="/blogs" className="block px-6 py-3 border-b hover:bg-gray-100">
//                 BLOGS
//               </a>
//             </div>
//             <div>
//               <a href="/contact" className="block px-6 py-3 border-b hover:bg-gray-100">
//                 Contact Us
//               </a>
//             </div>

//             {/* Contact with Submenu */}
//             {/* <div>
//               <button
//                 onClick={() => setContactOpen(!contactOpen)}
//                 className="w-full text-left px-6 py-3 border-b hover:bg-gray-100 flex justify-between items-center"
//               >
//                 Contact
//                 <span>{contactOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
//               </button>
//               {contactOpen && (
//                 <div className="pl-8 bg-gray-50">
//                   <a href="/contact" className="block py-2 hover:bg-gray-100">
//                     Contact Us
//                   </a>
//                   <a href="/contact" className="block py-2 hover:bg-gray-100">
//                     Contact Options
//                   </a>
//                 </div>
//               )}
//             </div> */}
//           </div>
//         )}

//         {/* <IconButton onClick={() => setIsSearch(true)} className="mx-3">
//           <Search className="!text-red-600 lg:!text-3xl" />
//         </IconButton> */}
//         <CustomButton
//           onClick={() => setIsModal(true)}
//           className="whitespace-nowrap !text-base font-semibold !p-2 lg:!p-3  !min-w-10 lg:!min-w-40  !w-6 lg:!px-10 !bg-[#2f3985]"
//         >
//           <ArticleIcon className="!text-lg !font-normal  lg:mr-2" />
//           <span className="hidden lg:!block">Req Quote</span>
//         </CustomButton>
//         {/* Mobile Menu Toggle */}
//         <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden !ml-2  text-gray-700 focus:outline-none">
//           <svg className="w-8 h-8 !font-thin !text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path
//               strokeWidth="2"
//               d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </button>
//       </nav>
//       <SerachModal isSearch={isSearch} setIsSearch={setIsSearch} />
//       <RequestQuoteModal modal={isModal} setModal={setIsModal} />
//     </>
//   )
// }

// export default Header
