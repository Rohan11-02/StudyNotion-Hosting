const express = require("express");
const { contactUsController } = require("../controllers/ContactUsController");
const router = express.Router();

router.post("/contact", contactUsController);

module.exports = router;