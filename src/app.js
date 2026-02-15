const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const healthroutes = require('../src/routes/healthroutes')
const errormiddleware = require('../src/middlewares/errormiddleware')
const authRoutes = require("./modules/auth/authRoutes");

const app = express()

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/health' , healthroutes)
app.use("/auth", authRoutes);

app.use(errormiddleware);

module.exports = app;