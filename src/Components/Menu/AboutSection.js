import MarkdownRenderer from "Shared/MarkedContent";
import mapImage from "../../Assests/Content/map-bg-orange.jpg"
import bg2 from "../../Assests/Content/what_we_offer.jpg"
import { marked } from 'marked';

const AboutSection = ({data}) => {
  return (
    <>
      <div   style={{
            backgroundImage: `url(${bg2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            // backgroundAttachment: "fixed",
          }} className="grid grid-cols-2  gap-4 p-[6%]">
        <div className="flex flex-col justify-center " >
        <div className="text-4xl  font-bold mb-4">
          <span className="text-primary">{data?.[0]?.title} </span>
          </div>
          {/* <div className="text-4xl  font-bold mb-4">
            <span className="text-primary2">Quality </span>
            <span className="text-primary mx-1">and</span>
            <span className="text-primary2">Doubleclick</span>
            <span className="text-primary ml-1">at the right price </span>
          </div>
          <div className="text-base text-slate-600 mb-4">
            Energistically utilize team driven niche markets rather than leveraged platforms. Monotonectally restore
            tactical "outside the box" thinking and technically sound deliverables.
          </div>
          <div  className="text-base text-slate-600" >
            Compellingly develop fully researched process improvements through innovative opportunities. Credibly
            productize highly efficient potentialities for vertical core competencies. Quickly maintain pandemic
            experiences rather than low-risk high-yield processes.
          </div> */}
          <div className="text-base text-slate-600 mb-4">
          {data?.[0]?.blocks?.[0]?.body && <MarkdownRenderer content={marked.parse(data?.[0]?.blocks?.[0]?.body)} /> }
          </div>
        </div>
       <div></div>
      </div>
    </>
  )
}

export default AboutSection
