const User = require("../models/User");
const otpGenerate = require("otp-generator");
const Profile = require("../models/Profile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/nodemailer");
require("dotenv").config();
const OTP = require("../models/OTP");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");

// sendOtp
exports.sendOTP = async(req, res) => {
    try{
        const {email} = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success : false,
                message : "User Already Exists."
            })
        }

        let otp = otpGenerate.generate(6, {
            upperCaseAlphabets : false,
            lowerCaseAlphabets : false,
            specialChars : false,
        })

        // console.log("OTP generated: ", otp );

        let checkotp = await OTP.findOne({otp : otp});
        while(checkotp){
            otp = otpGenerate.generate(6, {
                upperCaseAlphabets : false,
                lowerCaseAlphabets : false,
                specialChars : false,
            })
        
            checkotp = await OTP.findOne({otp : otp});
        }

        const creatingOtp = await OTP.create({email, otp});

        // console.log("Created Otp :", creatingOtp);

        res.status(200).json({
            success : true,
            message : "OTP send Successfully.",
            otp
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            error : err,
            message : "Facing Issues in sending OTP."
        })
    }
}

// signUp
exports.signUp = async(req, res) => {
    try{
        const {
            fName, 
            lName, 
            email,
            phone,
            password,
            confirmPassword,  
            otp,
            accountType,      
        } = req.body;

        if(!fName || !lName || !email || !phone || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success : false,
                message : "Fill all details Carefully."
            })
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                success : false,
                message : "Passwords are not matching."
            })
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success : false,
                message : "User Already Exists."
            })
        }


        const storedOtp = await OTP.find({email}).sort({createdAt : -1}).limit(1);
        // console.log('Otp stored in db :', storedOtp);

        if(storedOtp.length === 0){
            return res.status(404).json({
                success : false,
                message : "OTP not Found."
            })
        }
        else if(storedOtp[0].otp !== otp){
            return res.status(401).json({
                success : false,
                message : "Incorrect OTP."
            })
        }

        // console.log("reached successfully");
        //hashing
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err){
            return res.status(502).json({
                success : false,
                message : "Not able to hash Password."
            })
        }

        const payload = await Profile.create({
            fName : fName,
            lName : lName,
            dateOfBirth : null,
            gender : null,
            about : null,
            contactNumber : phone,
        });
        
        let approved;
        accountType === "Instructor" ? (approved = false) : (approved = true)

        const user = await User.create({
            fName,
            lName,
            email,
            phone,
            password : hashedPassword,
            confirmPassword : hashedPassword,
            accountType,
            additionalDetails : payload._id,
            approved : approved,
            image : `https://api.dicebear.com/9.x/initials/svg?seed=${fName} ${lName}`,
        })

        // console.log("Printing User for signUp :",user);

        res.status(200).json({
            success : true,
            message : "Entry created in DataBase Successfully.",
            user
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            error : err,
            message : "Facing Issue in Signing Up."
        })
    }
}


// logIn 

exports.login = async(req, res) =>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(403).json({
                success : false,
                message : "Fill all details Carefully."
            })
        }

        let user = await User.findOne({email})
                            .populate("additionalDetails").exec();
        if(!user){
            return res.status(401).json({
                success : false,
                message : "Sign Up first."
            })
        }
        const payload = {
            id : user._id,
            email : user.email,
            accountType : user.accountType,
        }
        if(await bcrypt.compare(password, user.password)){
            const token = jwt.sign(payload, process.env.JWT_SECRET,{
                expiresIn : '24h'
            })

            user = user.toObject();
            user.token = token;
            user.password = undefined;

            res.cookie("token", token, {
                expires : new Date(Date.now() + 2*24*60*60*1000),
                httpOnly : true
            }).status(200).json({
                success : true,
                token,
                user,
                message : "Logged In Successfully."
            })
        }
        else{
            return res.status(400).json({
                success : false,
                message : "Incorrect Password."
            })
        }
    }
    catch(err){
        return res.status(500).json({
            success : false,
            error : err,
            message : "Facing Issue in Login."
        })
    }
}

// changePassword 
exports.changePassword = async(req, res) => {
    try{    
        const userDetails = await User.findById(req.user.id);
        
        const {oldPassword, newPassword, confirmNewPassword} = req.body;

        // console.log(oldPassword);
        // console.log(newPassword);
        // console.log(confirmNewPassword);


        if(await bcrypt.compare(oldPassword, userDetails.password)){
            if(newPassword === confirmNewPassword){

                const hashedPassword = await bcrypt.hash(newPassword, 10);
                
                // const user = await User.findByIdAndUpdate(req.user.id,
                //     {
                //         password : hashedPassword,
                //         confirmPassword : hashedPassword,
                //     },
                //     {new : true},
                // )
                const user = await User.findByIdAndUpdate(userDetails._id,
                    {
                        password : hashedPassword,
                        confirmPassword : hashedPassword,
                    },
                    {new : true},
                )

                // console.log("Printing User for changePassword :", user);
                // send Email pending 
                let info = await mailSender(user.email, 
                    "Password for your account has been updated", 
                    passwordUpdated(user.email, user.fName)
                );
                // console.log(info); 
                return res.status(200).json({
                    success : true,
                    message : "Password Updated Successfully."
                })
            }
            else{
                return res.status(400).json({
                    success : false,
                    message : "Passwords do not match."
                })
            }
        }
        else{
            return res.status(400).json({
                success : false,
                message : "Incorrect Password",
            })
        }
    }
    catch(err){
        return res.status(500).json({
            success : false,
            error : err,
            message : "Facing Issue in Changing Password."
        })
    }
}