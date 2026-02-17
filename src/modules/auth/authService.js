require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const repo = require("./authRepository");
const JWT_SECRET = process.env.JWT_SECRET || "asecretkey";
const OTP_EXPIRY_MINUTES = process.env.EXPIRY_MINUTES;

// console.log("OTP_EXPIRY_MINUTES" , OTP_EXPIRY_MINUTES)

const sendOtp = async (phone) => {

    let user = await repo.findUserByPhone(phone);
    if (!user) {
        user = await repo.createUser(phone);
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedOtp = await bcrypt.hash(otp, 10);

    const expiresAt = new Date(Date.now() + parseInt(OTP_EXPIRY_MINUTES) * 60 * 1000);
    console.log("expiresAt" , expiresAt)

    await repo.saveOtp(user.id, hashedOtp, expiresAt);

    // In real app → send SMS
    console.log(`OTP for ${phone}: ${otp}`);

    return { message: "OTP sent" };
};

const verifyOtp = async (phone, otp) => {

    const user = await repo.findUserByPhone(phone);

    console.log("findUserByPhone-user", user)

    if (!user) throw new Error("User not found");

    const validOtp = await repo.findValidOtp(user.id, otp);

      console.log("validOtp" , validOtp)

    if (!validOtp) return {
        message : "token expired or invalid"
    };

    // Mark OTP as used
    await repo.markOtpUsed(validOtp.id);

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });

    return { token };
};

module.exports = {
    sendOtp,
    verifyOtp,
};