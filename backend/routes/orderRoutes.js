const express = require('express')
const {createOrder , getOrderbyId , orderUpdateById ,getAllUserOrders} = require('../controllers/orderController')
const {authtoken} = require('../middlewares/auth')
const router = express.Router()


router.post("/api/v1/newOrder",authtoken,createOrder)

router.get("/api/v1/getOrderById/:id",authtoken,getOrderbyId)

router.put("/api/v1/updateOrder/:id/pay",authtoken,orderUpdateById)

router.get("/api/v1/getAllOrders",authtoken,getAllUserOrders)


module.exports = router