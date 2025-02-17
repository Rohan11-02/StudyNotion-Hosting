const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName : {
        type : String,
        required : true,
        trim : true,
    },
    description : {
        type : String,
        required : true,
        trim : true
    },
    ratingAndReview : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "RatingAndReview"
    }],
    instructor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    createdAt : {
        type : Date,
        default : Date.now(),
    },
    whatYouWillLearn : {
        type : String,
        trim : true,
        required : true
    },
    courseContent : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Section"
        }
    ],
    thumbnail : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    studentsEnrolled : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],
    tag : {
        type : String,
        required : true,
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category"
    },
    instructions : {
        type : String,
    },
    status : {
        type : String,
        enum : ["Draft", "Published"]
    },
    publicId : {
        type : String,
        required : true,
    }
})

module.exports = mongoose.model("Course", courseSchema);