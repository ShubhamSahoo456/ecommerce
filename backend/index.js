const express = require('express');
const data = require('./data/data');
const DBconn = require('./config/db');
const {errormiddleware} = require('./middlewares/errorMiddleware')
const dotenv = require('dotenv');
const productRoutes = require("./routes/productRoutes")
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')

const app = express();
app.use(express.json())
//dotenv
dotenv.config({path:'./config.env'})

//database connection
DBconn()

app.use(productRoutes)
app.use(userRoutes)
app.use(orderRoutes)
app.use(errormiddleware)

//paypal
app.get("/api/config/paypal",(req,res)=>{
    res.send(process.env.PAYPAL)
})

app.listen(process.env.PORT,()=>{
    console.log('8000 port is listening')
})