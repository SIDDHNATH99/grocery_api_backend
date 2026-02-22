const express = require('express')
const app = express()
const auth = require('../../middlewares/authMiddleware')
const controller = require("./orderController")

const router = express.Router()

router.use(auth.auth)

router.get('/getorders' , controller.getordersbyid)
router.post('/addorders' , controller.createorders)

module.exports = router;