const express = require("express");
const { authN, isStudent } = require("../middlewares/auth");
const { capturePayment, sendPaymentSuccessEmail, verifyPayment } = require("../controllers/Payment");
const router = express.Router();


router.post("/capturePayment", authN, isStudent, capturePayment);
router.post("/verifyPayment", authN, isStudent, verifyPayment);
router.post("/sendPaymentSuccessEmail", authN, isStudent, sendPaymentSuccessEmail);

module.exports = router;