const express = require("express");
const controller = require("./authController");

const router = express.Router();

router.post("/sendotp", controller.sendOtp);
router.post("/verifyotp", controller.verifyOtp);

module.exports = router;