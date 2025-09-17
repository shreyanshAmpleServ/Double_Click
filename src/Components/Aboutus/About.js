import { marked } from "marked"
import { IoPlayOutline } from "react-icons/io5"
import { fontSizeCalc, widthCalculate } from "Shared/widthCalculate"
import mapImage from "../../Assests/Content/map-bg-orange.jpg"
import bg2 from "../../Assests/Content/popup_bg.jpg"
import ImageBundle from "Components/ImageBundles"

const AboutSection = ({ data, customWidth, value, type, isMarked }) => {
  const baseURL = process.env.REACT_APP_API_URL
  return (
    <>
      {type == 1 ? (
        <div
          style={
            ({ fontSize: `${customWidth?.fontSize && fontSizeCalc(customWidth?.fontSize)}` }, customWidth?.styleCSS)
          }
          className={`flex  w-[100%]  ${widthCalculate(value)} ${
            customWidth?.padding ? customWidth?.padding : "p-[10px]  pb-0"
          } ${customWidth?.margin}  ${customWidth?.htmlCSSClasses}  `}
        >
          <div className="flex flex-col items-start ">
            <div className="text-3xl font-bold mb-4">
              {/* <span className="text-primary2">About </span> */}
              {/* <span className="text-primary">{data?.title}</span> */}
            </div>
            <div>
              {" "}
              <div
                dangerouslySetInnerHTML={{
                  __html: customWidth?.fontSize ? marked(data.replace("font-size:", "")) : marked(data),
                }}
              />
            </div>
            {/* <div className="text-base text-slate-600 mb-4">
            Energistically utilize team driven niche markets rather than leveraged platforms. Monotonectally restore
            tactical "outside the box" thinking and technically sound deliverables.
          </div>
          <div  className="text-base text-slate-600" >
            Compellingly develop fully researched process improvements through innovative opportunities. Credibly
            productize highly efficient potentialities for vertical core competencies. Quickly maintain pandemic
            experiences rather than low-risk high-yield processes.
          </div> */}
          </div>
        </div>
      ) : type == 3 ? (
        <div
          style={
            ({ fontSize: `${customWidth?.fontSize && fontSizeCalc(customWidth?.fontSize)}` }, customWidth?.styleCSS)
          }
          className={`flex w-[100%]  ${widthCalculate(value)}  ${
            customWidth?.padding ? customWidth?.padding : "p-[10px] pb-0"
          } ${customWidth?.margin}  ${customWidth?.htmlCSSClasses}  `}
        >
          {/* <div className=" w-full"> */}
          {/* <div className="text-3xl font-bold mb-4">
           <span className="text-primary2">About </span> 
              <span className="text-primary">{data?.title}</span> 
            </div> */}
          <div
            className=" w-full"
            dangerouslySetInnerHTML={{ __html: customWidth?.fontSize ? data.replace("font-size:", "") : data }}
          />
          {/* <div className="text-base text-slate-600 mb-4">
            Energistically utilize team driven niche markets rather than leveraged platforms. Monotonectally restore
            tactical "outside the box" thinking and technically sound deliverables.
          </div>
          <div  className="text-base text-slate-600" >
            Compellingly develop fully researched process improvements through innovative opportunities. Credibly
            productize highly efficient potentialities for vertical core competencies. Quickly maintain pandemic
            experiences rather than low-risk high-yield processes.
          </div> */}
          {/* </div> */}
        </div>
      ) : type == 4 ? (
        <div
          style={customWidth?.styleCSS}
          className={`flex flex-col px-[2rem] w-[100%] ${widthCalculate(value)} ${
            customWidth?.padding ? customWidth?.padding : "p-[10px]  pb-0"
          }  justify-start   ${customWidth?.margin}  ${customWidth?.htmlCSSClasses}  `}
        >
          {/* {data?.mime?.includes("image") ? (
            <img
              src={data?.url ? baseURL + data?.url : mapImage}
              alt="Map"
              style={customWidth?.innerStyleCSS}
              className={` ${customWidth?.innerHtmlCSSClasses}  mx-auto  object-fill object-center`}
            />
          ) : (
            // <
            // className={`flex w-[100%] ${widthCalculate(value)}  ${
            //   customWidth?.padding ? customWidth?.padding : "p-[8%] !pb-[3%]"
            // } ${customWidth?.margin} ${customWidth?.styleCSS} ${customWidth?.htmlCSSClasses}  `}
            // >
            <div
              className="relative mx-auto w-[90%] rounded-2xl  lg:h-[50vh]  h-[30vh]"
              style={{
                backgroundImage: `url(${bg2})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className=" bg-black1 rounded-2xl !opacity-60 absolute top-0 h-full w-full left-0 flex justify-center items-center "></div>
              <div className="flex flex-col lg:flex-row text-white absolute top-[40%] left-[45%] gap-4 ">
                <div class="zindex-fixed relativ">
                  <a href={baseURL + data?.url} class="play-video">
                    <IoPlayOutline className="!text-7xl " />
                  </a>
                </div>
              </div>
            </div>
            // </>
          )} */}
          <ImageBundle images={data} customWidth={customWidth} />
        </div>
      ) : (
        <div
          style={customWidth?.styleCSS}
          className={`flex flex-col px-[2rem] w-[100%] ${widthCalculate(value)} ${
            customWidth?.padding ? customWidth?.padding : "p-[10px]  pb-0"
          }  justify-start   ${customWidth?.margin}  ${customWidth?.htmlCSSClasses}  `}
        >
          {data?.file?.mime?.includes("image") ? (
            <img
              src={data?.file?.url ? baseURL + data?.file?.url : mapImage}
              alt="Map"
              style={customWidth?.innerStyleCSS}
              className={` mx-auto  object-fill object-center ${customWidth?.innerHtmlCSSClasses} `}
            />
          ) : (
            // <
            // className={`flex w-[100%] ${widthCalculate(value)}  ${
            //   customWidth?.padding ? customWidth?.padding : "p-[8%] !pb-[3%]"
            // } ${customWidth?.margin} ${customWidth?.styleCSS} ${customWidth?.htmlCSSClasses}  `}
            // >
            <div
              className="relative mx-auto w-[90%] rounded-2xl  lg:h-[50vh]  h-[30vh]"
              style={{
                backgroundImage: `url(${data?.thumbnail?.url ? baseURL + data?.thumbnail?.url : bg2})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className=" bg-black1 rounded-2xl !opacity-60 absolute top-0 h-full w-full left-0 flex justify-center items-center "></div>
              <div className="flex flex-col lg:flex-row text-white absolute top-[40%] left-[45%] gap-4 ">
                <div class="zindex-fixed relativ">
                  <a href={baseURL + data?.file?.url} class="play-video">
                    <IoPlayOutline className="!text-7xl " />
                  </a>
                </div>
              </div>
            </div>
            // </>
          )}
        </div>
      )}
    </>
  )
}

export default AboutSection
