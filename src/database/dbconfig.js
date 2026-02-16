const { Pool } = require('pg')
const { PGHOST, PGPORT, PGUSER, PGPASSWORD, DBNAME } = process.env

// console.log(PGHOST, PGPORT, PGUSER, PGPASSWORD, DBNAME)

const pool = new Pool({
    host: PGHOST,
    port: PGPORT,
    user: PGUSER,
    password: PGPASSWORD,
    database: DBNAME
})

pool.on("connect", () => {
    console.log("PostgreSQL connected!")
})

pool.on("error", (err) => {
    console.log("PostgreSQL connection error!", err)
    process.exit(1);
})

module.exports = pool;