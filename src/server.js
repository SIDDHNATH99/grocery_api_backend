require("dotenv").config();
const app = require('./app')
const pool = require('./config/dbconfig')
const CreateTable = require('./config/dbtables')
const { PORT } = process.env

async function startServer() {
    try {
        await pool.query("SELECT 1");
        console.log("connection was successful")
        await CreateTable();
        app.listen(PORT, () => {
            console.log(`server started on port ${PORT}`)
        })
    } catch (e) {
        console.log("error while starting the server", e)
        process.exit(1);
    }
}

startServer();