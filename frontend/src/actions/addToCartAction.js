import {ADD_CART_ITEM ,ADD_PAYMENT_METHOD,ADD_SHIPPING_ADDRESS,REMOVE_CART_ITEM} from '../constants/cartconstant'
import axios from 'axios'

export const addToCartAction = (id,qty) => async(dispatch,getState)=>{
    try{
        const {data} = await axios.get(`/api/v1/product/${id}`)
        dispatch({
            type:ADD_CART_ITEM,
            payload:{
                product:data._id,
                name:data.name,
                image:data.image,
                price:data.price,
                countInStock:data.countinstock,
                qty:qty
            }
        })
        localStorage.setItem('cartitems',JSON.stringify(getState().addToCart.cartItems))
    }catch(error){
        console.log(error)
    }
}

export const removeCartItemAction = (id) => (dispatch,getState) => {
    dispatch({type:REMOVE_CART_ITEM,payload:id})
    localStorage.setItem("cartitems",JSON.stringify(getState().addToCart.cartItems))
}

export const addShippingAddressAction = (address) => (dispatch) => {
    console.log(address)
    dispatch({
        type:ADD_SHIPPING_ADDRESS,
        payload:address
    })
    localStorage.setItem("shippingaddress",JSON.stringify(address))
}

export const addPaymentMethodAction = (data) => (dispatch) => {
    dispatch({
        type:ADD_PAYMENT_METHOD,
        payload:data
    })
}