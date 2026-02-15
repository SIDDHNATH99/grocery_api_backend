const service = require("./authService");

const sendOtp = async (req, res, next) => {
  try {
    const { phone } = req.body;
    const result = await service.sendOtp(phone);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const verifyOtp = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;
    const result = await service.verifyOtp(phone, otp);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  sendOtp,
  verifyOtp,
};