const express = require('express')
let authMiddleware = require('../../middlewares/authMiddleware')
let adminMiddleware = require('../../middlewares/adminMiddleware')
let controller = require('../products/productController')

const router = express.Router()

router.use(authMiddleware.auth , adminMiddleware.adminMiddleware)

router.post("/addproducts" , controller.createProduct)

module.exports = router