const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fName : {
        type : String,
        required : true,
        trim : true
    },
    lName : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true
    },
    phone : {
        type : String,
        required : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
    },
    confirmPassword : {
        type : String,
        required : true,
    },
    accountType : {
        type : String,
        enum : ["Admin", "Student", "Instructor"],
        required : true,
    },
    additionalDetails : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Profile",
        required : true,
    },
    image : {
        type : String,
        required : true,
    },
    courses : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course",
    }],
    courseProgress : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "CourseProgress"
    }],
    resetPasswordToken : {
        type : String
    },
    resetTokenExpiry : {
        type : Date,
    },
    active : {
        type : Boolean,
        default : true,
    },
    approved : {
        type : Boolean,
        default : true,
    }
})

module.exports = mongoose.model("User", userSchema);