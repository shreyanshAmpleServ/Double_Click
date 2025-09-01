import { useQuery } from "react-query"
import { faqServiceFn } from "Services/Home"

const Questionaires = () => {
  const { data: faqData, isLoading, refetch } = useQuery(["faq"], () => faqServiceFn())
  console.log("Ques", faqData?.data?.data)
  return (
    <>
      <div className=" p-[6%] !pt-[3%] !pb-[1%]">
        <div className="text-center pb-0 ">
          <div className="text-base font-semibold text-black">FREQUENTLY ASKED</div>
          <div className="text-4xl font-semibold text-primary">Questions</div>
        </div>
        <div className="flex flex-wrap family-serif2 justify-between gap-5 lg:p-10">
          {faqData?.data?.data?.map((item) => (
            <div className="w-full lg:w-[49%] bg-white relative p-3 pb-1 flex flex-col items-start gap-2 text-black2">
              <div className="text-base font-medium mb-3">
                {" "}
                <div dangerouslySetInnerHTML={{ __html: item.title }} />
              </div>
              {/* <div  className="text-slate-500 leading-5" >{item?.description}</div> */}
              <div className="text-slate-500 leading-5">
                {" "}
                <div>
                  <div dangerouslySetInnerHTML={{ __html: item.description }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
export default Questionaires
