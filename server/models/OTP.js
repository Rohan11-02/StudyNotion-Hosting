const mongoose = require("mongoose");
const mailSender = require("../utils/nodemailer");
const otpTemplate = require("../mail/templates/emailVerificationTemplate");

const otpSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        trim : true,
    },
    createdAt : {
        type : Date,
        default : Date.now,
        expires : 5*60,
    },
    otp : {
        type : String,
        required : true,
    }
})

const sendVerificationMail = async(email, otp) => {
   try{
        const mailResponse = await mailSender(email, "Mail Verification", otpTemplate(otp));
        // console.log("Email sent Successfully:",mailResponse);
   }    
   catch(err){
        console.log("Error Occured inside sendVerficationMail fucntion.");
        console.log(err);
   }
}

otpSchema.pre("save", async function(next){
    // Only send an email when a new document is created
    if(this.isNew){
        await sendVerificationMail(this.email, this.otp);
    }
    next();
})

module.exports = mongoose.model("OTP", otpSchema);