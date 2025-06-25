import { Close } from "@mui/icons-material";
import CustomInput from "Shared/CustomInput";

const SerachModal = ({isSearch ,setIsSearch})=>{
    return(<>
    {isSearch &&
    <div className="h-[100vh] relative w-[100vw]">
     <div className="bg-primary z-50 !opacity-95   fixed top-0 left-0 !h-[100vh] w-[100vw]  ">
        <Close onClick={()=>setIsSearch(false)} className="!text-white cursor-pointer absolute top-5 right-5" />
    <div className="m-[25%] relative">
    <input
                className="border text-lg w-[100%] border-blue-50 active:border-none rounded-full px-6 py-3 font-normal focus:outline-none focus:border-none"
                type="search"
                placeholder="Search"
              />

            {/* <Close onClick={()=>setIsSearch(false)} className="!text-red-500 cursor-pointer absolute top-[30%] right-5" /> */}
              </div>
    </div>
    
    </div>}

    </>)
}
export default SerachModal;