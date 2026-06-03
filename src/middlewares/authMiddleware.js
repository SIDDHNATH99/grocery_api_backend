const jwt = require("jsonwebtoken");
const pool = require("../database/dbconfig");
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

module.exports = {

  auth: async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];

    try {

      // console.log(token, JWT_SECRET)

      const decoded = jwt.verify(token, JWT_SECRET);
      
      // console.log("decoded" , decoded)

      let adminuser = await pool.query(`SELECT * FROM users where id=$1`, [decoded.userId])

      // console.log("adminuser", adminuser.rows)

      if (adminuser.rows.length === 0) {
        return res.status(401).json({ error: "User not found" });
      }
      req.user = adminuser.rows[0];
      next();

    } catch (e) {
      next(e);
      return res.status(401).json({ error: "Invalid token" });
    }
  }
}
