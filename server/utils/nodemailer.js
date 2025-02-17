const nodemailer = require("nodemailer");

const mailSender = async(email, title, body) => {
    try{
        const transporter = nodemailer.createTransport({
            host : process.env.MAIL_HOST,
            auth : {
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASS,
            }
        })

        const info = await transporter.sendMail({
            from : `StudyNotion Ed-tech Platform`,
            to : `${email}`,
            subject : `${title}`,
            html : `${body}`,
        })
        console.log("info", info);
        return info;
    }
    catch(err){
        console.log("Error occured in mailSender function.");
        console.log(err);
    }
}

module.exports = mailSender;