const express = require('express')
const router = express.Router();
const controller = require('./cartController')
const auth = require('../../middlewares/authMiddleware')

router.use(auth.auth);

router.get('/getcartitems' , controller.getcartitems)
router.post("/addtocart" , controller.addcartitems)
router.patch("/updatetocart/:productid" , controller.updatecart)
router.delete("/deletecartitem/:productid" , controller.deletecartitems)

module.exports = router;