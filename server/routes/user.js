const express = require("express");
const { signUp, sendOTP, login, changePassword } = require("../controllers/Auth");
const { authN } = require("../middlewares/auth");
const { resetPassword, resetPasswordToken } = require("../controllers/ResetPassword");
const router = express.Router();

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

router.post("/signup", signUp);
router.post("/sendotp", sendOTP);
router.post("/login", login);
router.put("/changePassword", authN, changePassword);


// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

module.exports = router;