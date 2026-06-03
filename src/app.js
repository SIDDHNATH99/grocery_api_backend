const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const healthroutes = require('../src/routes/healthroutes')
const errormiddleware = require('../src/middlewares/errormiddleware')
const authRoutes = require("./modules/auth/authRoutes")
const productRoutes = require("./modules/products/productRoutes")
const productadminRoutes = require("./modules/products/productadminRoutes")
const cartRoutes = require("./modules/cart/cartRoutes")
const orderRoutes = require("./modules/orders/orderRoutes")
const orderadminRoutes = require("./modules/orders/orderAdminRoutes")

const app = express()

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/health' , healthroutes)
app.use("/auth", authRoutes)
app.use("/product" , productRoutes)
app.use("/productadmin" , productadminRoutes)
app.use("/cart" , cartRoutes)
app.use("/orders" , orderRoutes)
app.use("/orderadmin" , orderadminRoutes)
app.use(errormiddleware);

module.exports = app;