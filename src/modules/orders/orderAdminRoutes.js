const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/authMiddleware')
const admin = require('../../middlewares/adminMiddleware')
const controller = require('../orders/orderController')

router.use(auth.auth , admin.adminMiddleware)

router.get("/getallorders" , controller.getallorders);
router.patch("/updateorderstatus/:status/:id" , controller.update_orderstatus)
router.get("/getordersbyid/:id" , controller.getordersbyid)

module.exports = router;