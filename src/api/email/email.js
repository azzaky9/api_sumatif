const express = require("express");
const router = express.Router();
const { sendEmail } = require("../../controller/mail/email");

router.post("/email", sendEmail);

module.exports = router;
