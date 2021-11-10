const Order = require('../model/OrderSchema')

const createOrder = async(req,res) => {
    try{
        const {cartItems , address , paymentMethod ,shippingPrice ,taxPrice ,totalPrice} = req.body
        console.log(req.body)
        if(cartItems && cartItems.length === 0){
            res.status(400)
            throw new Error('Your cart is empty')
        }else{
            console.log('reached')
            const order = await Order.create({
                user:req.user.id,
                orderDetails:cartItems,
                shippingAddress:address,
                payment:paymentMethod,
                shippingPrice,
                taxPrice,
                totalPrice
            })
            console.log(order)
            const newOrder = await order.save()
            res.json(newOrder)
        }
    }catch(error){
        res.status(403)
        throw new Error('Oreder unable to Proceed')
    }
}

const getOrderbyId = async(req,res) => {
    try{
        const order = await Order.findById(req.params.id).populate("user","name email")
        if(order){
            res.json(order)
        }else{
            res.status(404)
            throw new Error('Order Not Found')
        }
    }catch(error){
        res.status(404)
        throw new Error('order not found')
    }
}

const orderUpdateById = async(req,res) => {
    try{
        const order = await Order.findById(req.params.id)
        if(order){
       
            order.paidAt = Date.now()
            order.isPaid = true
            order.paymentResult ={
                id : req.body.id,
                status : req.body.status,
                update_time : req.body.update_time,
                email_address : req.body.email_address
            }
         
            const updatedorder = await order.save()
            res.json(updatedorder)
        }else{
            res.status(404)
            throw new Error('Order not found')
        }
    }catch(error){
        res.status(404)
        throw new Error('Order not found')
    }
}

const getAllUserOrders = async (req,res) => {
    try{
        const orders = await Order.findById(req.user._id)
        res.json(orders)
    }catch(error){
        res.status(404)
        console.log(error)
    }
}

module.exports = {
    createOrder,
    getOrderbyId,
    orderUpdateById,
    getAllUserOrders
}