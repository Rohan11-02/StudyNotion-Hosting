const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const Profile = require("../models/Profile");
const RatingAndReview = require("../models/RatingAndReview");
const User = require("../models/User");
const { uploadFilesToCloudinary } = require("../utils/fileUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");
require("dotenv").config();

// Update Profile
exports.updateProfile = async(req, res) => {
    try{
        // default parameter
        const {
            fName, 
            lName = "", 
            dateOfBirth = "", 
            gender, 
            about = "", 
            contactNumber
        } = req.body;

        if(!fName || !gender || !contactNumber){
            return res.status(404).json({
                success : true,
                message : "Some Fields are Mandatory."
            })
        }

        const userId = req.user.id;
        const userDetails = await User.findById(userId);

        if(!userDetails){
            return res.status(404).json({
                success : false,
                message : "User Details not Found."
            })
        }
        const profileId = userDetails.additionalDetails;
        // const updatedProfile = await Profile.findByIdAndUpdate({profileId},
        //     {
        //         displayName, 
        //         profession, 
        //         dateOfBirth, 
        //         gender, 
        //         about, 
        //         contactNumber
        //     }, 
        //     {
        //         new : true
        //     }
        // )


        const profileDetails = await Profile.findById(profileId);
        // update profile
        profileDetails.fName = fName;
        profileDetails.lName = lName;
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.gender = gender;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;

        await profileDetails.save();

        res.status(200).json({
            success : true,
            // updatedProfile,
            profileDetails,
            message : "Profile Updated Successfully."
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            error : err,
            message : "Facing Issue in Updating Profile."
        })
    }
}


// Delete Account
exports.deleteAccount = async(req, res) => {
    try{
        const userId = req.user.id;
        const userAccountType = req.user.accountType;

        const userDetails = await User.findById(userId);
        if(!userDetails){
            return res.status(404).json({
                success : false,
                message : "User doesnot Exists"
            })
        }
        const profileId = userDetails.additionalDetails;
        await Profile.findByIdAndDelete(profileId);
        if(userAccountType === "Student"){
            await Course.updateMany(
                {
                    studentsEnrolled : userId
                },
                {
                    $pull : {
                        studentsEnrolled : userId
                    }
                },
                {new : true}
            )

            const rating_Review = await RatingAndReview.find({user : userId});
            const ratingIdsArr = rating_Review.map((item) => item._id);
            // console.log("Printing ratingIdsArr", ratingIdsArr);
            for(let i = 0; i < ratingIdsArr.length; i++){
                await Course.updateOne(
                    {ratingAndReview : ratingIdsArr[i]},
                    {
                        $pull : {
                            ratingAndReview : ratingIdsArr[i]
                        }
                    },
                    {new : true}
                )
            }

            await RatingAndReview.deleteMany({user : userId});
        
            await CourseProgress.deleteMany({userId : userId});
        }
        else if(userAccountType === "Instructor"){
            await Course.updateMany(
                {
                    instructor : userId
                },
                {
                    $unset : {
                        instructor : ""
                    }
                },
                {
                    new : true
                }
            )
        }

        const deletedUser = await User.findByIdAndDelete(userId);
        res.status(200).json({
            success : true,
            deletedUser,
            message : "User Account deleted Successfully."
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            error : err,
            message : "Failed to delete User Account."
        })
    }
}


// get User
exports.getUser = async(req, res) => {
    try{
        const userId = req.user.id;
        const userDetails = await User.findById(userId).populate("additionalDetails").exec();

        res.status(200).json({
            success : true,
            userDetails,
            message : "User Details fetched Successfully."
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            error : err,
            message : "Failed to fetch User Details."
        })
    }
}


// updateDisplayPicture
exports.updateDisplayPicture = async(req, res) => {
    try{
        const userId = req.user.id;
        const image = req.files.imageFile;

        if(!image){
            return res.status(404).json({
                success : false,
                message : "Please send image first to change profile picture."
            })
        }

        const uploadImage = await uploadFilesToCloudinary(image, process.env.FOLDER_NAME);
        // console.log(uploadImage);

        const updateUser = await User.findByIdAndUpdate(userId,
            {
                image : uploadImage.secure_url,
            },
            {new : true}
        )

        res.status(200).json({
            success : true,
            updateUser,
            message : "User Display Picture Updated Successfully."
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            error : err,
            message : "Failed to update display picture."
        })
    }
}

// getEnrolledCourses
exports.getEnrolledCourses = async(req, res) => {
    try{
        const userId = req.user.id;
        
        const userDetails = await User.findById(userId)
                                        .populate({
                                            path : "courses",
                                            populate : {
                                                path : "courseContent",
                                                populate : {
                                                    path : "subSection"
                                                }
                                            }
                                        })
                                        .exec();
        
        let NewUserDetails = userDetails.toObject();

        var subSectionLength = 0;
        for(var i = 0; i < NewUserDetails.courses.length; i++){
            let totalDurationInSeconds = 0;
            subSectionLength = 0;
            for(var j = 0; j < NewUserDetails.courses[i].courseContent.length; j++){
                totalDurationInSeconds += NewUserDetails.courses[i].courseContent[j]
                                            .subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0);
                NewUserDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds);

                subSectionLength += NewUserDetails.courses[i].courseContent[j].subSection.length;
            }

            let courseProgressCount = await CourseProgress.findOne({
                courseId : NewUserDetails.courses[i]._id,
                userId : userId
            })

            courseProgressCount = courseProgressCount?.completedVideos.length;
            if(subSectionLength === 0){
                NewUserDetails.courses[i].progressPercentage = 100;
            }
            else{
                const multiplier = Math.pow(10, 2);
                NewUserDetails.courses[i].progressPercentage = Math.round(
                    (courseProgressCount / subSectionLength) * 100 * multiplier
                ) / multiplier;
            }
        }
        
        if (!NewUserDetails) {
            return res.status(400).json({
              success: false,
              message: `Could not find user with id: ${NewUserDetails}`,
            })
        }                                
        
        res.status(200).json({
            success : true,
            data : NewUserDetails.courses,
            message : "User is Enrolled in Above Courses."
        })                                
    }
    catch(err){
        return res.status(500).json({
            success : false,
            error : err,
            message : "Failed to get enrolled list for User."
        })
    }
}


exports.instructorDashboard = async(req, res) => {
    try{
        const userId = req.user.id;

        const courseDetails = await Course.find({
            instructor : userId
        })

        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentsEnrolled.length;
            const totalAmountGenerated = totalStudentsEnrolled * course.price;

            const courseDataWithStats = {
                _id : course._id,
                courseName : course.courseName,
                description : course.description,
                totalStudentsEnrolled,
                totalAmountGenerated
            }
            return courseDataWithStats
        })

        // console.log("Printing courseData", courseData);

        return res.status(200).json({
            success : true,
            data : courseData
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