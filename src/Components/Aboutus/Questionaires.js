import { useQuery } from "react-query";
import { faqServiceFn } from "Services/Home";

const Questionaires = ()=>{
      const { data: faqData, isLoading, refetch } = useQuery(["faq"], () => faqServiceFn())
      console.log("Ques",faqData?.data?.data)
    return(<>
    <div className=" p-[4%] !pb-[4%]">
        <div className="text-center pb-14 ">
            <div className="text-base font-semibold text-black">FREQUENTLY ASKED</div>
            <div className="text-4xl font-semibold text-primary">Questions</div>
        </div>
        <div className="grid lg:grid-cols-2 family-serif2 gap-10 lg:p-10">
          {faqData?.data?.data?.map((item)=>(  <div>
                <div className="text-base font-medium mb-3">{item?.title}</div>
                <div  className="text-slate-500 leading-5" >{item?.description}</div>
            </div>))}
            
        </div>
    </div>
    </>)
}
export default Questionaires;