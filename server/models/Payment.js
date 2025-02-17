const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
    orderId : {
        type : String,
        required : true,
        unique : true
    },
    paymentId : {
        type : String,
        default : null,
    }, 
    signature : {
        type : String,
        default : null
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    courses : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course",
        required : true,
    }],
    amount : {
        type : Number,
        required : true,
    },
    currency : {
        type : String,
        default : "INR"
    },
    status : {
        type : String,
        enum : ["created", "paid", "failed"],
        default : "created"
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    updatedAt : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("Payment", paymentSchema);