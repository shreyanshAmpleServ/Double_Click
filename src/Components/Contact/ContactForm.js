import { Phone } from "@mui/icons-material";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { useMutation, useQuery } from "react-query";
import { companiesServiceFn, contactUsFn } from "Services/Home";
import CustomButton from "Shared/CustomButton";
import CustomInput from "Shared/CustomInput";

const TransportOptions = [
    { label: "Select Type", value: "" },
    { label: "Air", value: "air" },
    { label: "Sea", value: "sea" },
    { label: "Land", value: "land" },
  ]
  
  const FreightOption = [
    { label: "Select Type of Freight", value: "" },
    { label: "Full Container Load (FCL)", value: "fcl" },
    { label: "Less than Container Load (LCL)", value: "lcl" },
    { label: "Break Bulk", value: "break_bulk" },
  ]         
  
  const initialise = {
    name:"",
    company_name:"",
    email:"",
    phone:"",
    message:""
   }
const ContactForm = ()=>{
       const [initialData,setInitialData] = useState(initialise)
    const {
        data: companiesData,
        isLoading,
        refetch,
      } = useQuery(["companyAddress"], () => companiesServiceFn())

      console.log("Companies : ",companiesData)
      const handleChange=(e)=>{
        setInitialData((prev)=>({...prev,[e.target.name]:e.target.value}))
      }
      const { mutate: contacUs, isLoading:isAdding } = useMutation(contactUsFn, {
        onSuccess: ({ data }) => {
          toast.success("Created Successfull !")
          setInitialData(initialise)
        },
      })
    
    const handleSubmit=(e)=>{
      e.preventDefault();
      console.log(initialData)
      contacUs({data : initialData})
      setInitialData(initialise)
      // toast.success("Created Successfull !")
    }
    return(<>
    <div className="p-[5%]  flex flex-col lg:flex-row  gap-5">
        <div className=" flex flex-col gap-3  lg:w-[30%] w-full">
            <div className="font-semibold text-primary2 text-xl ">Our Address</div>
{companiesData?.data?.data?.map((item)=>(            <div  >
                <div className="font-semibold text-base">{item?.label}</div>
                <div className="text-sm flex flex-col text-slate-600 gap-2 my-3">
                    <div className="flex gap-2">
                        <FaLocationDot className=" !text-red-600 !text-2xl " />
                        <div>{item?.address}</div>
                        {/* <div>Double Click Consulting Limited 5th Floor, Ohio Street/Garden Avenue Dar es Salaam, Tanzania, P.O.Box 20419</div> */}
                    </div>
                    <div className="flex gap-2">
                        <Phone className=" !text-red-600 !text-xl" />
                        <div>{item?.phone}</div>
                        {/* <div>+255-22-2112161</div> */}
                    </div>
                    <div className="flex gap-2">
                        <IoIosMail className=" !text-red-600 !text-xl" />
                        <div>{item?.email}</div>
                        {/* <div>  @sales@doubleclick.co.tz</div> */}
                    </div>
                </div>
            </div>))}
            {/* <div  className="text-sm" >
                <div className="font-semibold text-base">Johannesburg, South Africa</div>
                <div className="flex flex-col gap-2 text-slate-600 my-3">
                    <div className="flex gap-2">
                        <FaLocationDot className=" !text-red-600 text-2xl" />
                        <div>Double Click Consulting Limited 5th Floor, Ohio Street/Garden Avenue Dar es Salaam, Tanzania, P.O.Box 20419</div>
                    </div>
                    <div className="flex gap-2">
                        <Phone className=" !text-red-600  !text-xl" />
                        <div>+255-22-2112161</div>
                    </div>
                    <div className="flex gap-2">
                        <IoIosMail className=" !text-red-600  !text-xl" />
                        <div>
                        @sales@doubleclick.co.tz</div>
                    </div>
                </div>
            </div> */}
        </div>
        <div className=" flex flex-col gap-3  lg:w-[65%] w-full">
        <form onSubmit={handleSubmit} className=" flex flex-col gap-3 ">
            <div className="font-semibold text-primary2 text-xl ">Say Hello! Its Free</div>
            {/* <div className="form-section lg:w-[65%] pt-5 lg:pt-0 flex flex-col gap-4"> */}
            <div className="grid grid-cols-2 gap-4 ">
              <CustomInput name="name" value={initialData?.name} required onChange={handleChange} className="!rounded-full" placeholder="Your Name"></CustomInput>
              <CustomInput name="email" value={initialData?.email} required onChange={handleChange} className="!rounded-full" placeholder="Email"></CustomInput>
              <CustomInput name="company_name" value={initialData?.company_name} required onChange={handleChange} className="!rounded-full" placeholder="Company Name"></CustomInput>
              <CustomInput name="phone" value={initialData?.phone} required onChange={handleChange} className="!rounded-full" placeholder="Phone"></CustomInput>
              {/* <CustomSelect name="icoterms" value={initialData?.icoterms} onChange={handleChange} className="!rounded-full" placeholder="Transport Type" options={TransportOptions}></CustomSelect>
              <CustomSelect name="icoterms" value={initialData?.icoterms} onChange={handleChange} className="!rounded-full" placeholder="Type of Freight" options={FreightOption}></CustomSelect> */}
            </div>
            <CustomInput required multiline={true} rows={5} label="" name="message" isLoading={isAdding} value={initialData?.message} onChange={handleChange} className="!rounded-full mt-4" placeholder="Message"></CustomInput>
            <CustomButton type="submit" className="bg-primary-red !rounded-full !w-48 !font-semibold">REQUEST QUOTE</CustomButton>
          </form>
          </div>
        {/* </div> */}
    </div>

    </>)
}
export default ContactForm;