const User = require("../models/User");
const mailSender = require("../utils/nodemailer");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

// resetPasswordToken
exports.resetPasswordToken = async(req, res) => {
    try{
        const {email} = req.body;

        const user = await User.findOne({email : email});
        if(!user){
            return res.status(400).json({
                success : false,
                message : "User is not Registered. Make an Account first."
            })
        }

        // const token = crypto.randomUUID();
        // console.log(token);
		const token = crypto.randomBytes(20).toString("hex");
        // console.log(token);


        const updatedUser = await User.findByIdAndUpdate({_id : user._id},
            {
                resetPasswordToken : token,
                resetTokenExpiry : new Date(Date.now() + 5*60*1000)
            },
            {new : true}
        )
        // console.log("Printing updatedUser for resetPasswordToken :", updatedUser);


        // const resetPasswordUrl = `http://localhost:3000/update-password/${token}`;

        const resetPasswordUrl = `https://studynotion-frontend-3fjpzhjkr-rohans-projects-49308115.vercel.app/update-password/${token}`;
      
        const info = mailSender(email, "Reset Your Password via Link", `Your Link for email verification is ${resetPasswordUrl}. Please click this url to reset your password.`);

        // console.log("Printing Info for resetPasswordToken :", info);


        res.status(200).json({
            success : true,
            message : "Reset Password Mail sent successfully."
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            error : err,
            message : "Facing Issue in sending Reset Password Mail."
        })
    }
}


// resetPassword
exports.resetPassword = async(req, res) => {
    try{
        const {token, password, confirmPassword} = req.body;

        if(password !== confirmPassword){
            return res.status(401).json({
                success : false,
                message : "Password not matching."
            })
        }

        const user = await User.findOne({resetPasswordToken : token});
        if(!user){
            return res.status(400).json({
                success : false,
                message : "Token is Invalid"
            })
        }
        if(user.resetTokenExpiry < Date.now()){
            return res.status(401).json({
                success : false,
                message : "token Expired."
            })
        }
        // Hashing
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err){
            return res.status(400).json({
                success : false,
                message : "Unable to hash Password"
            })
        }
        
        const updatedUser = await User.findByIdAndUpdate({_id : user._id}, {
            password : hashedPassword,
            confirmPassword : hashedPassword,
        },{new : true});

        // console.log("Printing updatedUser for resetPassword :", updatedUser);

        res.status(200).json({
            success : true,
            message : "Password Reset Successful."
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            error : err,
            message : "Facing Issue in sending Reset Password Mail."
        })
    }
}
