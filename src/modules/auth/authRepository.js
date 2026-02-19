const bcrypt = require("bcryptjs");
const pool = require("../../database/dbconfig");

const findUserByPhone = async (phone) => {
  const res = await pool.query("SELECT * FROM users WHERE phone = $1", [phone]);
  return res.rows[0];
};

const createUser = async (phone) => {
  const res = await pool.query(
    "INSERT INTO users(phone , role) VALUES($1 , $2) RETURNING *",
    [phone , 'user']
  );
  return res.rows[0];
};

const saveOtp = async (userId, otp, expiresAt) => {

  console.log(userId , otp , expiresAt)

  const res = await pool.query(
    `INSERT INTO otp(user_id, otp, expires_at) VALUES($1, $2, $3) RETURNING *`,
    [userId, otp, expiresAt]
  );

  return res.rows[0];
};

const findValidOtp = async (userId, otp) => {

  // console.log(userId , otp)

  const res = await pool.query(`select * from otp 
    where user_id = $1 and used = false and expires_at > NOW()
    order by expires_at desc 
    limit 1`, [userId]);

  // console.log("findvalidotp" , res.rows[res.rows.length - 1])
  console.log("findvalidotp", res.rows)

  if (res.rows.length == 0) {
    return false
  } else {
    let otpcheck = await bcrypt.compare(otp, res.rows[0].otp)
    console.log("otpcheck", otpcheck)
    if (otpcheck) {
      return res.rows[0]
    }
  };
};

const markOtpUsed = async (otpId) => {
  await pool.query(`UPDATE otp SET used = true WHERE id = $1`, [otpId]);
};

module.exports = {
  findUserByPhone,
  createUser,
  saveOtp,
  findValidOtp,
  markOtpUsed,
};
