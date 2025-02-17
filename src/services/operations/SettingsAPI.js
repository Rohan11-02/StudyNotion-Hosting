import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { settingsEndpoints } from "../apis";
import { setUser } from "../../redux/slices/profileSlice";
import { logout } from "./Thunks";




export function updateDisplayPicture (token, formData) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector(
                "PUT", 
                settingsEndpoints.UPDATE_DISPLAY_PICTURE_API, 
                formData,
                {
                    "Content-Type" : "multipart/form-data",
                    Authorization : `Bearer ${token}`
                }
            )
            // console.log(
            //     "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
            //     response
            // )

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Display Picture Updated Successfully.");
            dispatch(setUser(response.data.updateUser));
            localStorage.setItem("user", JSON.stringify(response.data.updateUser));
        }
        catch(err){
            console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", err);
            toast.error("Could Not Update Display Picture");
        }
        toast.dismiss(toastId);
    }
}


export function updateProfile (token, formData, user) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("PUT", 
                settingsEndpoints.UPDATE_PROFILE_API, 
                formData,
                {
                    Authorization : `Bearer ${token}`
                }
            )

            // console.log("UPDATE_PROFILE_API API RESPONSE............", response);
            // console.log("UPDATE_PROFILE_API API RESPONSE............", response.data);


            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            // console.log("user inside settingsAPI", user);
            const updatedUser = {
                ...user,
                additionalDetails : response.data.profileDetails
            }
            dispatch(setUser(updatedUser)); 

            // console.log("updatedUser inside settingsAPI", updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));

            toast.success("Profile Updated Successfully")
        }
        catch(err){
            console.log("UPDATE_PROFILE_API API ERROR............", err)
            toast.error("Could Not Update Profile")
        }
        toast.dismiss(toastId);
    }
}

export function changePassword (token, formData) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("PUT", settingsEndpoints.CHANGE_PASSWORD_API, 
                formData,
                {
                    Authorization : `Bearer ${token}`
                }
            )
            // console.log("CHANGE_PASSWORD_API API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Password Changed Successfully")
        }
        catch(err){
            console.log("CHANGE_PASSWORD_API API ERROR............", err)
            toast.error(err.response.data.message)
        }
        toast.dismiss(toastId);
    }
}

export function deleteProfile (token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("DELETE", settingsEndpoints.DELETE_PROFILE_API,
                null,
                {
                    Authorization : `Bearer ${token}`
                }
            )
            // console.log("DELETE_PROFILE_API API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Profile Deleted Successfully")
            dispatch(logout(navigate));
        }
        catch(err){
            console.log("DELETE_PROFILE_API API ERROR............", err)
            toast.error("Could Not Delete Profile")
        }
        toast.dismiss(toastId);
    }
}