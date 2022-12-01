const express = require("express");
const app = express()
require('dotenv').config()
var cors = require('cors')
const dbConfig = require("./config/dbConfig")
const userRoute = require('./routes/userRoutes')

app.use(cors())

app.use(express.json())
const port = process.env.PORT || 5000
app.use('/api/user', userRoute);

app.listen(port, () => console.log("Node Server started at point ${port}"))
