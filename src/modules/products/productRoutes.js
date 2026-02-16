const express = require('express')
const controller = require('./productController')
const router = express.Router();

router.get("/productbyId/:id" , controller.getproductsbyId)
router.get("/allproducts" , controller.getallproducts)

module.exports = router