import {createStore , combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {productList , productDetails ,} from './reducers/productreducer';
import {cartReducer} from './reducers/cartreducer'
import {userLoginReducer , userRegisterReducer , userProfileReducer , userProfileUpdateReducer} from './reducers/userReducer'
import {orderReducer ,orderDetailsReducer ,orderPayReducer} from './reducers/orderReducer'


const cartItemStorage = localStorage.getItem('cartitems') ? JSON.parse(localStorage.getItem('cartitems')) : []
const userLoginStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressStorage = localStorage.getItem('shippingaddress') ? JSON.parse(localStorage.getItem('shippingaddress')) : {}

const reducer = combineReducers({
    productsList : productList,
    productDetails:productDetails,
    addToCart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userProfile:userProfileReducer,
    userUpdate:userProfileUpdateReducer,
    userOrder:orderReducer,
    userOrderDetails:orderDetailsReducer,
    userOrderPay:orderPayReducer
})

const initialState = {
    addToCart:{cartItems:cartItemStorage,address:shippingAddressStorage},
    userLogin:{userInfo:userLoginStorage}
}

const middleware = [thunk];


const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;