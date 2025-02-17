import toast from "react-hot-toast"
import { courseEndpoints, ratingsEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";

export const fetchCourseCategories = async() => {
    let result = []
    try {
        const response = await apiConnector("GET", courseEndpoints.COURSE_CATEGORIES_API)
        // console.log("COURSE_CATEGORIES_API API RESPONSE............", response)
        if (!response?.data?.success) {
        throw new Error("Could Not Fetch Course Categories")
        }
        result = response?.data?.allCategories;
        // console.log("Result", result);
    } catch (error) {
        console.log("COURSE_CATEGORY_API API ERROR............", error)
        toast.error(error.message)
    }
    return result
}


export const addCourseDetails = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST", courseEndpoints.CREATE_COURSE_API,
            data,
            {
                Authorization : `Bearer ${token}`
            }
        )

        // console.log("CREATE COURSE API RESPONSE............", response)
        if (!response?.data?.success) {
        throw new Error("Could Not Add Course Details")
        }
        toast.success("Course Details Added Successfully")
        result = response?.data?.newCourse
    }
    catch(err){
        console.log("CREATE COURSE API ERROR............", err)
        toast.error(err.message)
    }
    toast.dismiss(toastId);
    return result;
}   

export const editCourseDetails = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("PUT", courseEndpoints.EDIT_COURSE_API,
            data,
            {
                "Content-Type": "multipart/form-data",
                Authorization : `Bearer ${token}`
            }
        )
        // console.log("EDIT COURSE API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Update Course Details")
        }
        toast.success("Course Details Updated Successfully")

        result = response?.data?.courseDetails
    }
    catch(err){
        console.log("EDIT COURSE API ERROR............", err)
        toast.error(err.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const createSection = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");

    try{
        const response = await apiConnector("POST", courseEndpoints.CREATE_SECTION_API,
            data,
            {
                Authorization : `Bearer ${token}`
            }
        );
        // console.log("CREATE SECTION API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Create Section")
        }
        toast.success("Course Section Created")
        result = response?.data?.courseDetails;
    }
    catch(err){
        console.log("CREATE SECTION API ERROR............", err)
        toast.error(err.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const updateSection = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("PUT", courseEndpoints.UPDATE_SECTION_API,
            data,
            {
                Authorization : `Bearer ${token}`
            }
        )

        // console.log("UPDATE SECTION API RESPONSE............", response)
        if (!response?.data?.success) {
        throw new Error("Could Not Update Section")
        }
        toast.success("Course Section Updated")
        result = response?.data?.courseDetails
    }
    catch(err){
        console.log("UPDATE SECTION API ERROR............", err)
        toast.error(err.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const deleteSection = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("DELETE", courseEndpoints.DELETE_SECTION_API,
            data,
            {
                Authorization : `Bearer ${token}`
            }
        )
        // console.log("DELETE SECTION API RESPONSE............", response)
        if (!response?.data?.success) {
        throw new Error("Could Not Delete Section")
        }
        toast.success("Course Section Deleted")
        result = response?.data?.updatedCourse
    }
    catch(err){
        console.log("DELETE SECTION API ERROR............", err)
        toast.error(err.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const createSubSection = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST", courseEndpoints.CREATE_SUBSECTION_API,
            data,
            {
                Authorization : `Bearer ${token}`
            }
        )

        // console.log("CREATE SUB-SECTION API RESPONSE............", response)
        if (!response?.data?.success) {
        throw new Error("Could Not Add Lecture")
        }
        toast.success("Lecture Added")
        result = response?.data?.updatedSection;
    }
    catch(err){
        console.log("CREATE SUB-SECTION API ERROR............", err)
        toast.error(err.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const updateSubSection = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("PUT", courseEndpoints.UPDATE_SUBSECTION_API,
            data,
            {
                Authorization : `Bearer ${token}`
            }
        )
        // console.log("UPDATE SUB-SECTION API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Update Lecture")
        }

        toast.success("Lecture Updated")
        result = response?.data?.sectionDetails
    }
    catch(err){
        console.log("UPDATE SUB-SECTION API ERROR............", err)
        toast.error(err.message)
    }
    toast.dismiss(toastId);
    return result;
}


export const deleteSubSection = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("DELETE", courseEndpoints.DELETE_SUBSECTION_API,
            data,
            {
                Authorization : `Bearer ${token}`
            }
        )
        // console.log("DELETE SUB-SECTION API RESPONSE............", response)
        if (!response?.data?.success) {
        throw new Error("Could Not Delete Lecture")
        }
        toast.success("Lecture Deleted")
        result = response?.data?.updatedSection
    }
    catch(err){
        console.log("DELETE SUB-SECTION API ERROR............", err)
        toast.error(err.message)
    }
    toast.dismiss(toastId);
    return result;
}   

export const fetchInstructorCourses = async(token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("GET", courseEndpoints.GET_ALL_INSTRUCTOR_COURSES_API,
            null,
            {
                Authorization : `Bearer ${token}`
            }
        )
        // console.log("INSTRUCTOR COURSES API RESPONSE............", response)
        if (!response?.data?.success) {
        throw new Error("Could Not Fetch Instructor Courses")
        }
        result = response?.data?.data
    }
    catch(err){
        console.log("INSTRUCTOR COURSES API ERROR............", err)
        toast.error(err.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const deleteCourse = async(data, token) => {
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("DELETE", courseEndpoints.DELETE_COURSE_API,
            data,
            {
                Authorization : `Bearer ${token}`
            }
        )

        // console.log("DELETE COURSE API RESPONSE............", response)
        if (!response?.data?.success) {
        throw new Error("Could Not Delete Course")
        }
        toast.success("Course Deleted")
    }
    catch(err){
        console.log("DELETE COURSE API ERROR............", err)
        toast.error(err.message)
    }
    toast.dismiss(toastId);
}   

export const fetchCourseDetails = async(courseId) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try{
        const response = await apiConnector("POST", courseEndpoints.COURSE_DETAILS_API,
            {
                courseId
            }
        )
        // console.log("COURSE_DETAILS_API API RESPONSE............", response)

        if (!response.data.success) {
        throw new Error(response.data.message)
        }
        
        result = response.data;
    }
    catch(err){
        console.log("COURSE_DETAILS_API API ERROR............", err)
        result = err.response.data
    }
    toast.dismiss(toastId);
    return result;
}


// some functionality is remaining => course Progress
export const getFullDetailsOfCourse = async (courseId, token) => {
    const toastId = toast.loading("Loading...")
    //   dispatch(setLoading(true));
    // console.log("Inside getFullDetailsof Course", courseId)
    let result = null
    try {
      const response = await apiConnector(
        "POST",
        courseEndpoints.GET_FULL_COURSE_DETAILS_AUTHENTICATED,
          courseId,
        {
          Authorization: `Bearer ${token}`,
        }
      )
    //   console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response?.data?.data
    } catch (error) {
      console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
      result = error.response.data
      // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
}

export const createRating = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST", courseEndpoints.CREATE_RATING_API,
            data,
            {
                Authorization : `Bearer ${token}`
            }
        )
        // console.log("CREATE RATING API RESPONSE............", response)
        if (!response?.data?.success) {
        throw new Error("Could Not Create Rating")
        }
        toast.success("Rating Created")
        result = response?.data?.rating_Review
    }
    catch(err){
        console.log("CREATE RATING API ERROR............", err)
        toast.error(err.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const findRatingAndReview = async(courseId, token) => {
    let result = null;
    const toastId = toast.loading("Loading");
    try{
        const response = await apiConnector("POST", courseEndpoints.FIND_RATING_API,
            {courseId},
            {
                Authorization : `Bearer ${token}`
            }
        )

        // console.log("FIND RATING API RESPONSE...", response);
        if(!response?.data?.success){
            throw new Error("Could not Find Api Response");
        }
        // toast.success("Rating Found");
        result = response?.data?.data;
    }
    catch(err){
        console.log("FIND RATING API ERROR............", err)
        toast.error(err.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const updateRating_Review = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST", courseEndpoints.UPDATE_RATING_API,
            data,
            {
                "Content-Type": "multipart/form-data",
                Authorization : `Bearer ${token}`
            }
        )
        // console.log("UPDATE RATING API RESPONSE...", response);
        if(!response?.data?.success){
            throw new Error("Could not Update Api Response");
        }
        toast.success("Rating Found");
        result = response?.data?.data;
    }
    catch(err){
        console.log("UPDATE RATING API ERROR............", err)
        toast.error(err.message)
    }
    toast.dismiss(toastId);
    return result;
}   


export const markLectureAsComplete = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST", courseEndpoints.LECTURE_COMPLETION_API,
            data,
            {
                Authorization : `Bearer ${token}`
            }
        )
        // console.log("MARK_LECTURE_AS_COMPLETE_API API RESPONSE............", response)
      
        if (!response.data.message) {
            throw new Error("Could Not Mark Lecture As Completed.")
        }
        toast.success("Lecture Completed")
        result = true
    }
    catch(err){
        console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", err)
        toast.error(err.message)
        result = false
    }
    toast.dismiss(toastId);
    return result;
}

export const getAllRatings = async() => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API);
        // console.log("REVIEWS_DETAILS_API RESPONSE........", response);
        if(!response.data.success){
            throw new Error("Ratings Not Found");
        }
        // toast.success("Ratings Found");
        result = response?.data?.data;
    }
    catch(err){
        console.log("UPDATE RATING API ERROR............", err)
        // toast.error(err.message)
    }
    toast.dismiss(toastId);
    return result;
}