const { contactUsEmail } = require("../mail/templates/contactFormRes");
const { responseToAdmin } = require("../mail/templates/resToAdmin");
const mailSender = require("../utils/nodemailer");
require("dotenv").config();

exports.contactUsController = async(req, res) => {
    const {
        email,
        firstName,
        lastName,
        message,
        phone,
        countryCode
    } = req.body;

    try{
        const emailRes = await mailSender(email, "Your Data Sent Successfully",
            contactUsEmail(email, firstName, lastName, message, phone, countryCode)
        )
        // console.log("Email Res ", emailRes)

        const emailToAdmin = await mailSender(process.env.MAIL_USER, `StudyNotion user ${firstName} tried to Contact You.`,
            responseToAdmin(email, firstName, lastName, message, phone, countryCode)
        )
        // console.log("Email to Admin", emailToAdmin);
        return res.status(200).json({
            success : true,
            message : "Email Sent Successfully"
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "Something went wrong..."
        })
    }
}