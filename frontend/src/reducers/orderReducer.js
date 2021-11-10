import {ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUSET, ORDER_DETAILS_SUCCESS, ORDER_FAIL, ORDER_PAY_FAIL, ORDER_PAY_REQUSET, ORDER_PAY_RESET, ORDER_PAY_SUCCESS, ORDER_REQUEST, ORDER_SUCCESS} from '../constants/orderContants'

export const orderReducer = (state={},action) => {
    switch(action.type){
        case ORDER_REQUEST :
            return {loading:true}

        case ORDER_SUCCESS :
            return {loading:false,success:true,orderDetails:action.payload}

        case ORDER_FAIL :
            return {loading:false,error:action.payload}

        default : return state
    }
}

export const orderDetailsReducer = (state={orderDetails:[],shippingAddress:{},loading:true},action) =>{
    switch(action.type){
        case ORDER_DETAILS_REQUSET : 
            return {...state,loading:true}

        case ORDER_DETAILS_SUCCESS : 
            return {loading:false,order:action.payload}

        case ORDER_DETAILS_FAIL : 
            return {loading:false,error:action.payload}

        default : return state
    }
}

export const orderPayReducer = (state={},action) => {
    switch(action.type){
        case ORDER_PAY_REQUSET :
            return {loading:true}

        case ORDER_PAY_SUCCESS :
            return {loading:false,success:true,order:action.payload}

        case ORDER_PAY_FAIL :
            return {loading:false,error:action.payload}

        case ORDER_PAY_RESET :
            return {}

        default : return state
    }
}