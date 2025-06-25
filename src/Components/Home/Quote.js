import { TbTruckDelivery } from "react-icons/tb"
import { ImAirplane } from "react-icons/im"
import { FaShip } from "react-icons/fa"
import image1 from "../../Assests/Content/bg-text.jpg"
import CustomInput from "Shared/CustomInput"
import CustomSelect from "Shared/CustomSelect"
import CustomButton from "Shared/CustomButton"
import { useEffect, useState } from "react"
import { gsap } from "gsap"
import { addQuoteFn, footerServiceFn, mainServiceFn, reqQouteServiceFn } from "Services/Home"
import { useMutation, useQuery } from "react-query"
import toast, { Toaster } from "react-hot-toast"
import ReCAPTCHA from "react-google-recaptcha"

const initialise = {
  email: "",
  name: "",
  message: "",
  service: "",
}

const Quotes = () => {
  const baseURL = process.env.REACT_APP_API_URL
  const [initialData, setInitialData] = useState(initialise)
  const [captchaToken, setCaptchaToken] = useState(null)

  useEffect(() => {
    // Trigger animation when the section comes into view
    gsap.from(".request-quote-container", {
      opacity: 0,
      y: 50,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".request-quote-container",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })

    gsap.from(".image-section", {
      opacity: 0,
      x: 400,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".image-section",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })

    gsap.from(".form-section", {
      opacity: 0,
      x: -400,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".form-section",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })
  }, [])

  const { data: mainServiceData, isLoading, refetch } = useQuery(["main-service"], () => mainServiceFn())

  const { data: quoteLeftData } = useQuery(["QuoteLeftDetails"], () => footerServiceFn())
  const serviceOption = mainServiceData?.data?.data?.[0]?.details.map((i) => ({ label: i?.title, value: i?.title }))
  // const transportTypeOptions = quotationSchemaData?.data?.attributes?.transportType?.enum?.map((i)=>({label:i,value:i}))
  console.log("serviceOption", quoteLeftData)
  const handleChange = (e) => {
    setInitialData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const { mutate: addQuote, isLoading: isAdding } = useMutation(addQuoteFn, {
    onSuccess: ({ data }) => {
      toast.success("Created Successfull !")
      setInitialData(initialise)
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!captchaToken) {
      alert("Please complete the CAPTCHA.")
      return
    }
    addQuoteFn({ data: initialData })
    setInitialData(initialise)
    toast.success("Created Successfull !")
  }
  const findData = (key) => {
    return quoteLeftData?.data?.data?.filter((item) => item.key === key)?.[0]
  }
  const imageUrl = baseURL + findData("quote_form_left_side")?.singleMedia.url

  return (
    <>
      <div className=" p-[6%] !pb-[4%]">
        <div className="text-center pb-14 ">
          <div className="text-base font-semibold text-black">REQUEST A</div>
          <div className="text-3xl lg:text-4xl font-semibold text-primary">Free Quote</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="lg:flex request-quote-container justify-between ">
            <div
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                //   width: '100%',
                //   height: 'full', // Example height
              }}
              className="image-section rounded-lg h-[40vh] lg:h-auto lg:w-[30%] text-xl family-open-sans !font-thin align-self-stretch text-white flex text-center justify-center items-center   leading-10 shadow-md"
            >
              <span className="bg-black px-3 h-full flex justify-center items-center bg-opacity-70">
                {" "}
                {findData("quote_form_left_side")?.value}
              </span>
            </div>

            <div className="form-section lg:w-[65%] pt-5 lg:pt-0 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4 ">
                <CustomInput
                  name="name"
                  value={initialData?.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                ></CustomInput>
                <CustomInput
                  name="email"
                  value={initialData?.email}
                  onChange={handleChange}
                  required
                  placeholder="Email"
                ></CustomInput>
                {/* <CustomSelect name="freightType" value={initialData?.freightType} onChange={handleChange} required placeholder="Type of Freight" options={freightOptions}></CustomSelect> */}
              </div>
              <CustomSelect
                name="service"
                value={initialData?.service}
                onChange={handleChange}
                required
                placeholder="Services"
                options={serviceOption}
              ></CustomSelect>
              <CustomInput
                name="message"
                value={initialData?.message}
                onChange={handleChange}
                required
                multiline={true}
                rows={5}
                label=""
                placeholder="Message"
                className="mt-4"
              ></CustomInput>
              <ReCAPTCHA
                sitekey="6LdFLqgUAAAAABy-iDsiuueFkJOeYgZzR1IKi36C"
                onChange={(token) => setCaptchaToken(token)}
                // size="invisible"
              />
              <CustomButton type="submit" className="bg-primary-red !rounded-full !w-48 !font-semibold">
                REQUEST QUOTE
              </CustomButton>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
export default Quotes
