const mongoose = require("mongoose");

const ratingAndReviewSchema = new mongoose.Schema({
    rating : {
        type : Number,
        required : true,
    },
    review : {
        type : String,
        required : true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    courseId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course",
        require : true,
        index: true,
    }
})


module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema);