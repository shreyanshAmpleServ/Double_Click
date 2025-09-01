import { coreServiceFn, footerServiceFn, reqQuoteFn } from "Services/Home"
import { useState } from "react"
import toast from "react-hot-toast"
import { useMutation, useQuery } from "react-query"

const initialise2 = {
  email: "",
  name: "",
  phone: "",
  message: "",
  service: "",
}
const RequestQuoteModal = ({ modal, setModal }) => {
  const baseURL = process.env.REACT_APP_API_URL
  const [personalData, setPersonalData] = useState(initialise2)
  const { data: mainServiceData, isLoading, refetch } = useQuery(["main-service"], () => coreServiceFn())
  const { data: globalData } = useQuery(["global-entity"], () => footerServiceFn())

  const handleChange2 = (e) => {
    setPersonalData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const { mutate: addQuote, isLoading: isAdding } = useMutation(reqQuoteFn, {
    onSuccess: ({ data }) => {
      toast.success("Created Successfull !")
      setPersonalData(initialise2)
      setModal(false)
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    addQuote({ data: personalData })
    // toast.success("Created Successfull !")
  }
  const findData = (key) => {
    return globalData?.data?.data?.filter((item) => item.key === key)?.[0]
  }
  console.log("mainServiceData", globalData?.data?.data)
  return (
    <>
      {modal && (
        <div
          className="fixed inset-0 !z-50 flex items-center justify-center bg-black bg-opacity-70"
          role="dialog"
          aria-hidden="true"
          // onClick={() => setModal(false)}
        >
          <div className="bg-white rounded-lg z-50 shadow-lg w-full max-w-5xl overflow-y-auto max-h-[94vh] ">
            <section className="bg-gray-100">
              <div className="flex flex-col lg:flex-row shadow-md">
                <div
                  style={{
                    backgroundImage: `url(${baseURL + findData("quote_form_left_side")?.singleMedia?.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    // backgroundAttachment: "fixed",
                  }}
                  className={`hidden lg:block lg:w-5/12 bg-cover bg-center `}
                ></div>
                <div className="w-full lg:w-7/12 p-6  lg:p-1 lg:mx-10">
                  <div className="flex justify-end ">
                    <button
                      onClick={() => setModal(false)}
                      aria-label="Close"
                      className="text-primary hover:text-black text-3xl"
                    >
                      &times;
                    </button>
                  </div>
                  <h2 className="text-3xl font-semibold m-3 mb-5">Request A Quote</h2>
                  <form onSubmit={handleSubmit} className="space-y-6 mb-4">
                    {/* Select Fields */}
                    <div className="flex flex-col lg:flex-row gap-3">
                      {/* <CustomSelect name="icoterms" value={initialData?.icoterms} onChange={handleChange} required placeholder="Incoterms" options={transportTypeOptions} className="!w-[100%] !bg-white border-gray-300 !rounded-full  pt-2 px-16" ></CustomSelect>
              <CustomSelect name="freightType" value={initialData?.freightType} onChange={handleChange} required placeholder="Type of Freight" options={freightOptions} className="!w-full !bg-white border-gray-300 !rounded-full  pt-2 px-16" ></CustomSelect>
            */}
                      {/* <select name="icoterms" value={initialData?.icoterms} onChange={handleChange}  className="w-full border border-gray-300 rounded-full p-2 px-6" required>
                    <option>Select Freight Type</option>
                    {transportTypeOptions?.map((item)=>(<option value={item.value}>{item.label}</option>))}
              
                  </select>
                  <select name="freightType" value={initialData?.freightType} onChange={handleChange}  className="w-full border border-gray-300 rounded-full p-2 px-6" required>
                    {freightOptions?.map((item)=>(<option value={item.value}>{item.label}</option>))}
                 
                  </select> */}
                    </div>

                    {/* Text Inputs */}
                    {/* <div className="flex flex-col lg:flex-row gap-3">
                  <input
                    type="text"
                    name={"departureCity"}
                    value={initialData?.departureCity}
                     onChange={handleChange}
                    placeholder="City of departure"
                    className="w-full border border-gray-300 rounded-full p-2 px-6"
                    required
                  />
                  <input
                    type="text"
                    name={"deliveryCity"}
                    value={initialData?.deliveryCity}
                     onChange={handleChange}
                    placeholder="Delivery city"
                    className="w-full border border-gray-300 rounded-full p-2 px-6"
                    required
                  />
             
                </div> */}

                    {/* <div className="flex flex-col lg:flex-row gap-3">
                  <input
                    type="text"
                    name={"grossWeight"}
                    value={initialData?.grossWeight}
                     onChange={handleChange}
                    placeholder="Total gross weight (KG)"
                    className="w-full border border-gray-300 rounded-full p-2 px-6"
                    required
                  />
                  <input
                    type="text"
                    name={"dimension"}
                    value={initialData?.dimension}
                    onChange={handleChange}
                    placeholder="Dimension"
                    className="w-full border border-gray-300 rounded-full p-2 px-6"
                    required
                  />
                </div> */}

                    <div>
                      {/* <Divider textAlign="center" className="!text-[#d9145b]">   Your Personal Details</Divider> */}
                      {/* <p className="text-orange-500 bg-blue-100 inline-block px-2 py-1 rounded font-medium">
                    Your Personal Details
                  </p> */}
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="w-full space-y-4">
                        <input
                          type="text"
                          name={"name"}
                          value={personalData?.name}
                          onChange={handleChange2}
                          placeholder="Your Name"
                          className="w-full border border-gray-300 rounded-full p-2 px-6"
                          required
                        />
                        <input
                          type="email"
                          name={"email"}
                          value={personalData?.email}
                          onChange={handleChange2}
                          placeholder="Email"
                          className="w-full border border-gray-300 rounded-full p-2 px-6"
                          required
                        />
                        <input
                          type="text"
                          name={"phone"}
                          value={personalData?.phone}
                          onChange={handleChange2}
                          placeholder="Phone Number"
                          className="w-full border border-gray-300 rounded-full p-2 px-6"
                          required
                        />
                        <select
                          name="service"
                          value={personalData?.service}
                          onChange={handleChange2}
                          className="w-full border border-gray-300 rounded-full p-2 px-6"
                          required
                        >
                          <option value={""}>Select Service</option>
                          {mainServiceData?.data?.data?.[0]?.details?.map((item) => (
                            <option value={item.title}>{item.title}</option>
                          ))}
                          {/* <option>Type 1</option>
                    {/* <option>Type 1</option>
                    <option>Type 3</option>
                    <option>Type 4</option> */}
                        </select>
                      </div>
                      <textarea
                        placeholder="Message"
                        name={"message"}
                        value={personalData?.message}
                        onChange={handleChange2}
                        className="w-full border border-gray-300 rounded-md p-2 px-6 h-full resize-none"
                        rows="6"
                        required
                      ></textarea>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="  bg-primary-red hover:bg-primary-red text-white px-6 py-2 rounded-full"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  )
}
export default RequestQuoteModal
