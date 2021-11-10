import React from "react";
import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/footer";
import './App.css'
import Homescreen from "./screens/Homescreen";
import {BrowserRouter , Route} from 'react-router-dom';
import Productdetails from "./screens/Productdetails";
import CartProduct from "./screens/CartScreen";
import LoginUser from "./screens/LoginScreen";
import RegisterUser from './screens/RegisterScreen';
import UserProfile from './screens/ProfileScreen';
import ShippingAddress from "./screens/ShippingAddress";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";


const App = ()=>{

  return(
    <BrowserRouter>
      <Header />
      <main className="main_div">
        <Route exact path="/" component={Homescreen}/>
        <Route exact path="/product/:id" component={Productdetails}/>
        <Route exact path="/cart/:id?" component={CartProduct} />
        <Route exact path="/login" component={LoginUser}/>
        <Route exact path="/register" component={RegisterUser}/>
        <Route exact path="/profile" component={UserProfile}/>
        <Route exact path="/shippingaddress" component={ShippingAddress}/>
        <Route exact path="/payment" component={PaymentScreen}/>
        <Route exact path="/placeorder" component={PlaceOrderScreen}/>
        <Route exact path="/myOrders/:id" component={OrderScreen}/>
      </main>
      {/* <Footer/> */}
    </BrowserRouter>
  )
}

export default App;