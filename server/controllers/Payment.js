const { default: mongoose } = require("mongoose");
const Course = require("../models/Course");
const { instance } = require("../config/razorpay");
const User = require("../models/User");
const mailSender = require("../utils/nodemailer");
const Payment = require("../models/Payment");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
require("dotenv").config();
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");



exports.capturePayment = async(req, res) => {
    const {courses} = req.body;
    const userId = req.user.id;

    if(courses.length === 0) {
        return res.json({
            success : false,
            message : "Please Provide course Id"
        })
    }

    let totalAmount = 0;

    for(const course_id of courses){
        let course;
        try{
            course = await Course.findById(course_id);
            if(!course){
                return res.status(200).json({
                    success : false,
                    message : "Could not find the course"
                })
            }
            // const uid = new mongoose.Types.ObjectId(userId);
            // console.log("Printing userId", userId);
            const uid = new mongoose.ObjectId(userId);
            // console.log("Printing uid", uid);
            if(course.studentsEnrolled.includes(uid)){
                return res.status(200).json({
                    success : false,
                    message : "Student is already Enrolled."
                })
            }

            totalAmount += course.price;

        }
        catch(err){
            console.log(err);
            return res.status(500).json({
                success : false, 
                message : err.message
            });
        }
    }

    const currency = "INR";
    const options = {
        amount : totalAmount*100,
        currency,
        // Math.random() function doesn't take any argument, so here Date.now() will be 
        // completely ignored.
        receipt : Math.random(Date.now()).toString()
    }

    try{
        const paymentResponse = await instance.orders.create(options);
        // console.log("Printing paymentResponse", paymentResponse);

        const paymentCall = await Payment.create({
            orderId : paymentResponse.id,
            userId,
            courses,
            amount : paymentResponse.amount,
            currency : paymentResponse.currency,
            status : "created"
        })

        // console.log("Printing payment Call in db", paymentCall);

        res.json({
            success : true,
            message : paymentResponse
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success : false, 
            mesage : "Could not Initiate Order"
        });
    }
}

exports.sendPaymentSuccessEmail = async(req, res) => {
    const {orderId, paymentId, amount} = req.body;
    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({
            success : false, 
            message : "Please provide all the fields"
        });
    }

    try{
        const enrolledStudent = await User.findById(userId);
        await mailSender(enrolledStudent.email, "Payment Recieved",
            paymentSuccessEmail(`${enrolledStudent.fName} ${enrolledStudent.lName}`,
                amount/100, orderId, paymentId
            )
        )
    }
    catch(err){
        console.log("error in sending mail", err)
        return res.status(500).json({
            success : false, 
            message : "Could not send email"
        })
    }
}

exports.verifyPayment = async(req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature || !courses || !userId) {
            return res.status(200).json({
                success : false, 
                message : "Payment Failed"
            });
    }
    try{
        const paymentOrderDetails = await Payment.findOne({orderId : razorpay_order_id});
        if(!paymentOrderDetails){
            return res.status(400).json({
                success : false,
                message : "Payment Failed, Order Id distorted."
            })
        }

        let body = paymentOrderDetails.orderId + "|" + razorpay_payment_id;
        const generated_signature = crypto
                                    .createHmac("sha256", process.env.RAZORPAY_SECRET)
                                    .update(body.toString())
                                    .digest("hex");


        if(generated_signature === razorpay_signature){
            await enrollStudent(courses, userId, res);
        }
        paymentOrderDetails.paymentId = razorpay_payment_id;
        paymentOrderDetails.signature = razorpay_signature;
        paymentOrderDetails.status = "paid";

        await paymentOrderDetails.save();
        return res.status(200).json({
            success : true, 
            message : "Payment Verified"
        });
    }
    catch(err){
        if (razorpay_order_id) {
            const paymentOrderDetails = await Payment.findOne({ orderId: razorpay_order_id });
            if (paymentOrderDetails) {
                paymentOrderDetails.status = "failed";
                await paymentOrderDetails.save();
            }
        }

        return res.status(500).json({
            success : false, 
            message : "Payment Failed due to internal server Error",
            error : err.message
        });
    }
}

const enrollStudent = async(courses, userId, res) => {
    if(!courses || !userId){
        return res.status(400).json({
            success : false,
            message : "Please Provide data for Courses or UserId"
        });
    }

    for(const courseId of courses){
        try{
            const enrolledCourse = await Course.findByIdAndUpdate(courseId,
                {
                    $push : {studentsEnrolled : userId}
                },
                {new : true}
            )
            if(!enrolledCourse) {
                return res.status(500).json({
                    success : false,
                    message : "Course not Found"
                });
            }

            const courseProgress = await CourseProgress.create({
                courseId : courseId,
                userId : userId,
                completedVideos : []
            })

            const enrolledStudent = await User.findByIdAndUpdate(userId,
                {
                    $push : {
                        courses : courseId,
                        courseProgress : courseProgress._id
                    }
                },
                {new : true}
            )

            const emailResponse = await mailSender(enrolledStudent.email, 
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName,
                    `${enrolledStudent.fName} ${enrolledStudent.lName}`
                )
            )
            // console.log("Email Sent Successfully", emailResponse);
        }
        catch(err){
            console.log(err);
            return res.status(500).json({
                success : false, 
                message : err.message
            });
        }
    }

    // This replaces the entire courses array in the database with the new courses 
    // array. If the user already has enrolled in other courses, those will be overwritten 
    // and lost. This is a potential issue, as it does not preserve previous data.

    // const enrolledStudent = await User.findByIdAndUpdate(userId,
    //     {courses : courses},
    //     {new : true}
    // )
}
















// exports.capturePayment = async(req, res) => {

//     // data fetch
//     const courseId = req.body;
//     const userId = req.user.id;
//     // Validate
//     if(!courseId)
//     {
//         return res.status(404).json({
//             success : false,
//             message : "Course Id not Found."
//         })
//     }

//     let courseDetails;
//     try{
//         // Data find corresponding to given course Id
//         courseDetails = await Course.findById(courseId);
//         if(!courseDetails){
//             return res.status(404).json({
//                 success : false,
//                 message : "Course doesn't for given Id."
//             })
//         }
//         // Is user already registered in given course?
//         const uId = new mongoose.ObjectId(userId);
//         if(courseDetails.studentsEnrolled.includes(uId)){
//             return res.status(400).json({
//                 success : false,
//                 message : "User already registered in Given Course."
//             })
//         }
//     }
//     catch(err){
//         return res.status(500).json({
//             success : false,
//             error : err,
//             message : "Failed to interact with DataBase."
//         })
//     }

//     const amount = courseDetails.price;
//     const currency = "INR";

//     const options = {
//         amount : amount*100,
//         currency,
//         receipt : Math.random(Date.now()).toString(),
//         notes : {
//             courseId,
//             userId
//         }
//     }
    
//     try{
//         const paymentResponse = await instance.orders.create(options);
//         console.log(paymentResponse);

//         return res.status(200).json({
//             success : true,
//             orderId : paymentResponse.id,
//             currency : paymentResponse.currency,
//             amount : paymentResponse.amount,
//             courseName : courseDetails.courseName,
//             courseDescription : courseDetails.description,
//             thumbnail : courseDetails.thumbnail,
//             message : "Order Created Successfully."
//         })
//     }
//     catch(err){
//         res.json({
//             success:false,
//             error : err,
//             message:"Could not initiate order",
//         });
//     }
// }


// exports.verifySignature = async(req, res) => {
//     const webHook = process.env.RAZORPAY_HOOK;

//     const signature = req.header["x-razorpay-signature"];

//     const shasum = crypto.createHmac("sha256", webHook);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if(digest === signature)
//     {
//         console.log("Your Payment is authorized");
//         // fulfill action after payment authorization.
//         try{
//             const {courseId, userId} = req.body.payload.payment.entity.notes;
//             const updateCourse = await Course.findByIdAndUpdate({courseId},
//                 {
//                     $push : {studentsEnrolled : userId}
//                 },
//                 {new : true}
//             )

//             if(!updateCourse){
//                 return res.status(500).json({
//                     success : false,
//                     message : "Course Details not found."
//                 })
//             }

//             const updateUser = await User.findByIdAndUpdate({userId},
//                 {
//                     $push : {courses : courseId}
//                 },
//                 {
//                     new : true
//                 }
//             )

//             const mailResponse = await mailSender(updateUser.email,  "Congratulations from studyNotion",
//                 "Congratulations, you are onboarded into new studyNotion Course",);

//             console.log(mailResponse);
            
//             res.status(200).json({
//                 success : true,
//                 updateCourse,
//                 updateUser,
//                 message : "Signature verified and course added."
//             })
//         }
//         catch(err){
//             return res.status(400).json({
//                 success:false,
//                 error : err,
//                 message:'Invalid request',
//             });
//         }
//     }
// }