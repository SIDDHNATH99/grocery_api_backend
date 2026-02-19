require("dotenv").config();
const app = require('./app')
const pool = require('./database/dbconfig')
const CreateTable = require('./database/dbtables');
const { findUserByPhone } = require("./modules/auth/authRepository");
const { PORT, DEFAULT_PHONE } = process.env

async function adminuser() {

    const adduser = await pool.query(`INSERT into users (phone , role) VALUES ($1 , $2) RETURNING *`, [DEFAULT_PHONE, 'admin'])
    console.log("adduser", adduser.rowCount)
}
async function startServer() {
    try {
        await pool.query("SELECT 1");
        console.log("connection was successful")
        await CreateTable();

        let adminexists = await findUserByPhone(DEFAULT_PHONE)
        if (!adminexists) {
            await adminuser();
        }

        app.listen(PORT, () => {
            console.log(`server started on port ${PORT}`)
        })

    } catch (e) {
        console.log("error while starting the server", e)
        process.exit(1);
    }
}

startServer();