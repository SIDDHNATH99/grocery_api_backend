const express = require('express')
const router = express.Router();
const controller = require('./cartController')
const auth = require('../../middlewares/authMiddleware')

router.use(auth.auth);

router.get('/getcartitems/:id' , controller.getcartitems)
router.post("/addtocart" , controller.addcartitems)

module.exports = router;