import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../apis";

export async function getUserEnrolledCourses (token) {
    const toastId = toast.loading("Loading...");
    let result = null;
    try{
        // console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
        const response = await apiConnector("GET", profileEndpoints.GET_USER_ENROLLED_COURSES_API,
            null,
            {
                Authorization : `Bearer ${token}`
            }
        )
        // console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES", response);
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response.data.data
    }
    catch(err){
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", err)
        toast.error("Could Not Get Enrolled Courses")
    }
    toast.dismiss(toastId)
    return result
}


export async function enrolledCoursesForLogin (token) {
    const toastId = toast.loading("Loading...");
    let result = false;
    let response = null;
    try{
        // console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
        response = await apiConnector("GET", profileEndpoints.GET_USER_ENROLLED_COURSES_API,
            null,
            {
                Authorization : `Bearer ${token}`
            }
        )
        console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES", response);
        if (!response?.data?.success) {
            throw new Error(response?.data?.message)
        }
        result = response?.data?.success
    }
    catch(err){
        result = response?.data?.success;
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", err)
        toast.error("Could Not Get Enrolled Courses")
    }
    toast.dismiss(toastId)
    return result
}

export const getInstructorData = async(token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("GET", profileEndpoints.GET_INSTRUCTOR_DATA_API,
            null,
            {
                Authorization : `Bearer ${token}`
            }
        )
        // console.log("GET_INSTRUCTOR_DATA_API API RESPONSE............", response)
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response?.data?.data
    }
    catch(err){
        console.log("GET_INSTRUCTOR_DATA_API API ERROR............", err)
        toast.error("Could Not Get Instructor Data")
    }
    toast.dismiss(toastId);
    return result;
} 
