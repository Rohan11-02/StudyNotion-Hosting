import toast from "react-hot-toast"
import { setToken } from "../../redux/slices/authSlice";
import { apiConnector } from "../apiConnector";
import { auth_api } from "../apis";
import { setUser } from "../../redux/slices/profileSlice";
import { resetCart } from "../../redux/slices/cartSlice";


export function sendOpt(email, navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            const result = await apiConnector("POST", auth_api.SEND_OTP, {email});
            // console.log("result of sendOtp: ",result);
            toast.success("Otp sent Successfully.");
            navigate("/verify-email");
        }
        catch(err){
            console.log(err);
            toast.error("Failed to send Otp.");
        }
        toast.dismiss(toastId);
    }
}

export const signup = (updateUserData, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            const result = await apiConnector("POST", auth_api.SIGNUP_API, updateUserData);
            // console.log("After signup :",result);
            toast.success("Signup Successful.");
            navigate("/login");
        }
        catch(err){
            console.log(err);
            toast.error("Failed to Signup.");
        }
        toast.dismiss(toastId);
    }
}

export const login = (formData, navigate) => {
    
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            const result = await apiConnector("POST", auth_api.LOGIN_API, formData);
            // console.log("Result for login : ",result);
            // console.log(result.data.token);
            // console.log("Url of image is :",result.data.user);
            dispatch(setUser(result.data.user));
            dispatch(setToken(result.data.token));
            toast.success("Login Successful.")
            localStorage.setItem("user", JSON.stringify(result.data.user));
            localStorage.setItem("token", JSON.stringify(result.data.token));
            navigate("/dashboard/my-profile");
        }
        catch(err){
            console.log(err);
            toast.error("Failed to login.");
        }
        toast.dismiss(toastId);
    }
}

export const forgotPasswordToken = (email, isEmailSent) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            const result = await apiConnector("POST", auth_api.FORGOT_PASSWORD_TOKEN, {email});
            // console.log("Result for Password Token : ", result);
            toast.success("Forgot Password Email Sent.");
            isEmailSent(true);
        }
        catch(err){
            console.log(err);
            toast.error("Failed to sent Forgot Password Email.")
        }
        toast.dismiss(toastId);
    }
}

export const resetPassword = (formData, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            const result = await apiConnector("POST", auth_api.RESET_PASSWORD, formData);
            // console.log("Reset Password : ",result);
            toast.success("Password Reset Successfully.");
            navigate("/login");
        }
        catch(err){
            console.log("Printing Error :", err.response.data.message);
            toast.error(err.response.data.message);
        }
        toast.dismiss(toastId);
    }
}


export const logout = (navigate) => {
    return async (dispatch) => {
        dispatch(resetCart());
        dispatch(setToken(null));
        dispatch(setUser(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out");
        navigate("/");
    }
}