const Category = require("../models/Category");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const RatingAndReview = require("../models/RatingAndReview");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const User = require("../models/User");
const { deleteFileFromCloudinary } = require("../utils/deleteFile");
const { uploadFilesToCloudinary } = require("../utils/fileUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");
require("dotenv").config();


exports.createCourse = async(req, res) => {
    try{
        let {
            courseName,
            description,
            whatYouWillLearn,
            price,
            tag,
            categoryId,
            status,
            instructions = ""
        } = req.body;

        const thumbnail = req.files.thumbnailImage;
        
        if(!status || status === undefined){
            status = "Draft"
        }

        if(!courseName || !description || !whatYouWillLearn || !price 
            || !tag 
            || !categoryId 
            || !thumbnail
        )
        {
            return res.status(404).json({
                success : false,
                message : "Please fill All the Details Carefully."
            })
        }

        const instructor_id = req.user.id;

        // Validate Category
        const validCategory = await Category.findById(categoryId);
        if(!validCategory){
            return res.status(401).json({
                success : false,
                message : "Such Category does not exists."
            })
        }

        const uploadedImage = await uploadFilesToCloudinary(thumbnail, process.env.FOLDER_NAME);
        // console.log("Image Uploaded to Cloudinary Successfully :",uploadedImage);

        const newCourse = await Course.create({
            courseName,
            description,
            whatYouWillLearn,
            price,
            tag,
            instructor : instructor_id,
            category : validCategory._id,
            thumbnail : uploadedImage.secure_url,
            publicId : uploadedImage.public_id,
            status,
            instructions
        });

        const populatedCourse = await Course.findById(newCourse._id).populate("category").exec();

        const updatedInstructor = await User.findByIdAndUpdate(instructor_id,
            {
                $push : {courses : newCourse._id}
            },
            {new : true}
        )

        
        const updatedCategory = await Category.findByIdAndUpdate({_id : validCategory._id},
            {
                $push : {courses : newCourse._id}
            },
            {new : true}
        )

        res.status(200).json({
            success : true,
            updatedInstructor,
            updatedCategory,
            newCourse : populatedCourse,
            message : "New Course Created Successfully"
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            error : err,
            message : "Facing Issues in Creating new Courses."
        })
    }
}


exports.getAllCourses = async(req, res) => {
    try{
        const allCourses = await Course.find({},
            {
                courseName : true,
                description : true,
                instructor : true,
                whatYouWillLearn : true,
                thumbnail : true,
                price : true,
                tag : true,
                category : true
            }
        )
        .populate({
            path : "instructor",
            select : "fName lName email"
        })
        .populate("category")
        .exec();

        res.status(200).json({
            success : true,
            allCourses,
            message : "All Courses fetched Successfully."
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            error : err,
            message : "Facing Issues in fetching Courses."
        })
    }
}


// getCourseDetails
exports.getCourseDetails = async(req, res) => {
    try{
        // fetch courseId 
        const {courseId} = req.body;
        // get data and populate
        const courseDetails = await Course.findById(courseId)
                                                .populate({
                                                    path : "instructor",
                                                    // select : "fName lName email",
                                                    populate : {
                                                        path : "additionalDetails",
                                                    }
                                                })
                                                .populate("ratingAndReview")
                                                .populate({
                                                    path : "courseContent",
                                                    populate : {
                                                        path : "subSection"
                                                    }
                                                })
                                                // .populate("studentsEnrolled")
                                                .populate("category")
                                                .exec();
        

        if (!courseDetails) {
            return res.status(400).json({
              success: false,
              message: `Could not find course with id: ${courseId}`,
            })
        }
        
        let totalDurationInSeconds = 0;
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration);
                totalDurationInSeconds += timeDurationInSeconds;
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
        
        return res.status(200).json({
            success : true,
            data : {
                courseDetails,
                totalDuration
            },
            message : "Course Details fetched successfully."
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            error : err,
            message : "Failed to get Course Details."
        })
    }
}


exports.editCourse = async(req, res) => {
    try{
        let {
            courseId, 
            courseName, 
            description, 
            whatYouWillLearn, 
            tag,
            price,
            categoryId,
            status,
            instructions = ""
        } = req.body;


        const courseDetails = await Course.findById(courseId);

        if(req.files){
            const thumbnail = req.files.thumbnailImage;

            // How to delete initially uploaded thumbnail from Cloudinary?
            const publicId = courseDetails.publicId;
            // console.log("Inside editCourse function, publicId",publicId);
            await deleteFileFromCloudinary(publicId, "image");
            

            const uploadedImage = await uploadFilesToCloudinary(thumbnail, process.env.FOLDER_NAME);

            courseDetails.thumbnail = uploadedImage.secure_url;
            courseDetails.publicId = uploadedImage.public_id;
        }

        if(courseName){
            courseDetails.courseName = courseName;
        }
        if(description){
            courseDetails.description = description;
        }
        if(whatYouWillLearn){
            courseDetails.whatYouWillLearn = whatYouWillLearn;
        }
        if(tag){
            courseDetails.tag = tag;
        }
        if(price){
            courseDetails.price = price;
        }
        if(categoryId){
            courseDetails.category = categoryId;

            const deleteCourse = await Category.findOneAndUpdate(
                {courses : courseId},
                {
                    $pull : {courses : courseId}
                },
                {
                    new : true
                }
            )
    
            const updateCategory = await Category.findByIdAndUpdate(categoryId,
                {
                    $push : {courses : courseId}
                },
                {
                    new : true
                }
            )
        }

        if(status){
            courseDetails.status = status;
        }

        if(instructions){
            courseDetails.instructions = instructions;
        }

        await courseDetails.save();


        res.status(200).json({
            success : true,
            courseDetails,
            message : "New Course Created Successfully"
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            error : err,
            message : "Facing Issues in Updating Courses."
        })
    }
}


exports.getInstructorCourses = async(req, res) => {
    try{
        const instructorId = req.user.id;

        const instructorCourses = await Course.find({
            instructor : instructorId
        })
        .sort({createdAt : -1})
        .populate({
            path : "courseContent",
            populate : {
                path : "subSection"
            }
        })
        .exec();

        let totalDurationInSeconds = [];
        instructorCourses.forEach((course, index) => {
            course.courseContent.forEach((content) => {
                content.subSection.forEach((subSection) => {
                    const timeDurationInSeconds = parseInt(subSection.timeDuration);
                    // Initialize totalDurationInSeconds[index] as it is undefined
                    if(!totalDurationInSeconds[index]){
                        totalDurationInSeconds[index] = 0;
                    }
                    totalDurationInSeconds[index] += timeDurationInSeconds;
                })
            })
        })

        const totalDuration = [];
        totalDurationInSeconds.forEach((duration, index) => {
            totalDuration[index] = convertSecondsToDuration(duration);
        })

        
        res.status(200).json({
            success : true,
            data : {
                instructorCourses,
                totalDuration
            },
            message : "Courses fetched Successfully."
        })
    }
    catch(err){
        res.status(500).json({
            success : false,
            error : err,
            message : "Failed in Fetching Instructor Courses."
        })
    }
}


exports.deleteCourse = async(req, res) => {
    try{
        const {courseId} = req.body;
        const instructorId = req.user.id;
        
        const course = await Course.findById(courseId);

        if(!course){
            return res.status(404).json({
                success : false,
                message : "Course not Found"
            })
        }

        // Unenroll students from the course
        const studentsEnrolled = course.studentsEnrolled;
        for (const studentId of studentsEnrolled) {
            await User.findByIdAndUpdate(studentId,
                {
                    $pull : {courses : courseId}
                }, 
                {
                    new : true
                }
            )
        }

        // Delete sections and sub-sections
        const courseSections = course.courseContent;
        for (const sectionId of courseSections) {
            const section = await Section.findById(sectionId);

            const subSections = section.subSection;
            for (const subSectionId of subSections) {
                await SubSection.findByIdAndDelete(subSectionId);
            }

            await Section.findByIdAndDelete(sectionId);
        }

        // Delete courseProgress of this course from User.
        const courseProgressArray = await CourseProgress.find({courseId : courseId});
        for(let i = 0; i < courseProgressArray.length; i++){
            await User.findByIdAndUpdate(
                {_id : courseProgressArray[i].userId},
                {
                    $pull : {
                        courseProgress : courseProgressArray[i]._id
                    }
                },
                {new : true}
            )
        }

        // Delete courseProgress for the course
        await CourseProgress.deleteMany({courseId : courseId});

        // Delete Rating and Reviews Corresponding to Course.
        await RatingAndReview.deleteMany({courseId : courseId});

        // Remove course from Category
        const updateCategory = await Category.findByIdAndUpdate({_id : course.category},
            {
                $pull : {courses : courseId}
            },
            {
                new : true
            }
        )

        // Remove course from Instructor courses
        const updateInstructor = await User.findByIdAndUpdate(instructorId,
            {
                $pull : {courses : courseId}
            },
            {
                new : true
            }
        )

        // Delete the course
        await Course.findByIdAndDelete(courseId);

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        })
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message,
        })
    }
}

exports.getFullCourseDetails = async(req, res) => {
    try{
        const {courseId} = req.body;
        const userId = req.user.id;
        // console.log("Printing req", req.body);
        // console.log("Inside Server function", courseId);

        const courseDetails = await Course.findOne({_id : courseId})
                                                    .populate({
                                                        path : "instructor",
                                                        populate : {
                                                            path : "additionalDetails"
                                                        }
                                                    })
                                                    .populate({
                                                        path : "courseContent",
                                                        populate : {
                                                            path : "subSection"
                                                        }
                                                    })
                                                    .populate("category")
                                                    .populate({
                                                        path : "ratingAndReviews",
                                                        options : {strictPopulate : false}
                                                    })
                                                    .exec();

        if(!courseDetails){
            return res.status(404).json({
                success : false,
                message : "Could not find a Course."
            })
        }

        let totalDurationInSeconds = 0;
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration);
                totalDurationInSeconds += timeDurationInSeconds;
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

        // console.log("Printing Course Details", totalDuration);

        const courseProgressCount = await CourseProgress.findOne({
            courseId : courseId,
            userId : userId
        })

        // console.log("courseProgressCount : ", courseProgressCount)


        return res.status(200).json({
            success : true,
            data : {
                courseDetails,
                totalDuration,
                completedVideos : courseProgressCount?.completedVideos ?
                    courseProgressCount?.completedVideos : []
            },
            message : "Course Details fetched Successfully."
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            error : err,
            message : "Internal Server Error"
        })
    }
}