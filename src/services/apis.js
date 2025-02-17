const BASE_URL = process.env.REACT_APP_BASE_URL
// console.log("Base url is : ",BASE_URL);

// Auth Api
export const auth_api = {
    SEND_OTP : BASE_URL + "/auth/sendotp",
    SIGNUP_API : BASE_URL + "/auth/signup",
    LOGIN_API : BASE_URL + "/auth/login",
    FORGOT_PASSWORD_TOKEN : BASE_URL + "/auth/reset-password-token",
    RESET_PASSWORD : BASE_URL + "/auth/reset-password",
}

// Profile Endpoints
export const profileEndpoints = {
    GET_USER_ENROLLED_COURSES_API : BASE_URL + '/profile/getEnrolledCourses',
    GET_INSTRUCTOR_DATA_API : BASE_URL + '/profile/instructorDashboard'
}

// Students Endpoints
export const studentEndPoints = {
    COURSE_PAYMENT_API : BASE_URL + '/payment/capturePayment',
    COURSE_VERIFY_API : BASE_URL + '/payment/verifyPayment',
    SEND_PAYMENT_SUCCESS_EMAIL_API : BASE_URL + '/payment/sendPaymentSuccessEmail'
}

// Course Endpoints
export const courseEndpoints = {
    COURSE_DETAILS_API : BASE_URL + '/course/getCourseDetails',
    COURSE_CATEGORIES_API : BASE_URL + '/course/showAllCategories',
    CREATE_COURSE_API : BASE_URL + '/course/createCourse',
    EDIT_COURSE_API : BASE_URL + '/course/editCourse',
    CREATE_SECTION_API : BASE_URL + '/course/createSection',
    DELETE_SECTION_API : BASE_URL + '/course/deleteSection',
    UPDATE_SECTION_API : BASE_URL + '/course/updateSection',
    CREATE_SUBSECTION_API : BASE_URL + '/course/createSubSection',
    UPDATE_SUBSECTION_API : BASE_URL + '/course/updateSubSection',
    DELETE_SUBSECTION_API : BASE_URL + '/course/deleteSubSection',
    GET_ALL_INSTRUCTOR_COURSES_API : BASE_URL + '/course/getInstructorCourses',
    DELETE_COURSE_API : BASE_URL + '/course/deleteCourse',
    GET_FULL_COURSE_DETAILS_AUTHENTICATED : BASE_URL + '/course/getFullCourseDetails',
    CREATE_RATING_API : BASE_URL + '/course/createRatingAndReview',
    FIND_RATING_API : BASE_URL + '/course/findRatingAndReview',
    UPDATE_RATING_API : BASE_URL + '/course/updateRating_Review',
    LECTURE_COMPLETION_API : BASE_URL + '/course/updateCourseProgress'
}

// Rating and Reviews
export const ratingsEndpoints = {
    REVIEWS_DETAILS_API : BASE_URL + '/course/getAllRatingAndReview'
}


// Category Api
export const categories = {
    CATEGORIES_API : BASE_URL + "/course/showAllCategories"
}


// Catalog Page Data
export const catalogData = {
    CATALOGPAGEDATA_API : BASE_URL + "/course/getCategoryPageDetails"
}

// Contact us API
export const contactUsEndpoint = {
    CONTACT_US_API : BASE_URL + "/reach/contact"
}

// Settings page Api
export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API : BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API : BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API : BASE_URL + "/auth/changePassword",
    DELETE_PROFILE_API : BASE_URL + "/profile/deleteAccount"
}