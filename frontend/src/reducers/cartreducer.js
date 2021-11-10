import {ADD_CART_ITEM , ADD_PAYMENT_METHOD, ADD_SHIPPING_ADDRESS, REMOVE_CART_ITEM} from '../constants/cartconstant'

export const cartReducer = (state={cartItems:[]},action) => {
    //ebugger;
    switch(action.type){
        case ADD_CART_ITEM :
            let item = action.payload
            let existItem = state.cartItems.find((x)=>x.product==item.product)
            if(existItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map((x)=>(
                        x.product == existItem.product ? item :x
                    ))
                }
            }else{
                return {
                    ...state,
                    cartItems:[...state.cartItems,item]
                }
            }

        case REMOVE_CART_ITEM : 
                return {
                    ...state,
                    cartItems:state.cartItems.filter((x)=>x.product !== action.payload)
                }

        case ADD_SHIPPING_ADDRESS :
            return {
                ...state,address:action.payload
            }

        case ADD_PAYMENT_METHOD : 
            return {
                ...state,paymentMethod:action.payload
            }

        default : return state
    }

}