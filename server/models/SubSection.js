const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true,
    },
    description : {
        type : String,
        required : true,
    },
    timeDuration : {
        type : String,
        required : true,
    },
    videoUrl : {
        type : String,
        required : true,
    },
    publicId : {
        type : String,
        required : true,
    }
})

module.exports = mongoose.model("SubSection", subSectionSchema);