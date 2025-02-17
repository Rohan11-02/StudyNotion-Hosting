const express = require("express");
const { authN, isAdmin, isInstructor, isStudent } = require("../middlewares/auth");
const { createCategory, showAllCategories, categoryPageDetails } = require("../controllers/CategoryController");
const { createCourse, getAllCourses, getCourseDetails, editCourse, getInstructorCourses, deleteCourse, getFullCourseDetails } = require("../controllers/CourseController");
const { createSection, updateSection, deleteSection } = require("../controllers/SectionController");
const { createSubSection, updateSubSection, deleteSubSection } = require("../controllers/SubSectionController");
const { createRatingAndReview, getAverageRating, getAllRatingAndReview, findRatingAndReview, updateRating_Review } = require("../controllers/Rating&ReviewController");
const { updateCourseProgress } = require("../controllers/CourseProgressController");
const router = express.Router();


// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin

router.post("/createCategory", authN, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);



// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

router.post("/createCourse", authN, isInstructor, createCourse);
router.get("/getAllCourses", getAllCourses);
router.put("/editCourse", authN, isInstructor, editCourse);
router.post("/createSection", authN, isInstructor, createSection);
router.put("/updateSection", authN, isInstructor, updateSection);
router.delete("/deleteSection", authN, isInstructor, deleteSection);
router.post("/createSubSection", authN, isInstructor, createSubSection);
router.put("/updateSubSection", authN, isInstructor, updateSubSection);
router.delete("/deleteSubSection", authN, isInstructor, deleteSubSection);
router.get("/getInstructorCourses", authN, isInstructor, getInstructorCourses);
router.delete("/deleteCourse", authN, isInstructor, deleteCourse);
router.post("/getFullCourseDetails", authN, getFullCourseDetails);
router.post("/getCourseDetails", getCourseDetails);
router.post("/updateCourseProgress", authN, isStudent, updateCourseProgress);


// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRatingAndReview", authN, isStudent, createRatingAndReview);
router.get("/getAverageRating", getAverageRating);
router.get("/getAllRatingAndReview", getAllRatingAndReview);
router.post("/findRatingAndReview", authN, isStudent, findRatingAndReview);
router.post("/updateRating_Review", authN, isStudent, updateRating_Review);

module.exports = router;