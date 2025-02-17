const { default: mongoose } = require("mongoose");
const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");

exports.updateCourseProgress = async(req, res) => {
    const {courseId, subSectionId} = req.body;
    const userId = req.user.id;

    try{
        const subSection = await SubSection.findById(subSectionId);
        if(!subSection){
            return res.status(404).json({
                success : false,
                message : "Invalid SubSection"
            })
        }

        let courseProgress = await CourseProgress.findOne({
            courseId : courseId,
            userId : userId
        })

        if(!courseProgress){
            return res.status(404).json({
                success : false,
                message : "Course Progress Doesn't Exist"
            })
        }
        else{
            // console.log("I am Here", subSectionId);
            const videoDocumentId = new mongoose.ObjectId(subSectionId);
            // console.log("I am DocumentId", videoDocumentId);

            // Want to check whether below line will execute or not?
            if(courseProgress.completedVideos.includes(videoDocumentId)){
                return res.status(400).json({
                    success : false,
                    message : "SubSection Already completed."
                })
            }

            courseProgress.completedVideos.push(subSectionId);
        }
        await courseProgress.save();
        return res.status(200).json({
            success : true,
            message : "Course Progress Updated"
        })
    }   
    catch(err){
        
        return res.status(500).json({
            success : false,
            message : "Internal server Error"
        })
    }
}