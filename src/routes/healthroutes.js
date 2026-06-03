const express = require('express')
const pool = require('../database/dbconfig')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        await pool.query("SELECT 1")
        res.status(200).json({
            status: "ok",
            db: "connected"
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router;