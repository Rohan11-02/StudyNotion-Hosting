import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { catalogData } from "../apis";

export const getCatalogPageData = async(categoryId) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API,
            {
                categoryId : categoryId
            }
        )
        if(!response?.data?.success)
            throw new Error("Could not Fetch Category page data");

         result = response?.data;
    }
    catch(err){
        console.log("CATALOG PAGE DATA API ERROR....", err);
        toast.error(err.message);
    }
    toast.dismiss(toastId);
    return result;
}