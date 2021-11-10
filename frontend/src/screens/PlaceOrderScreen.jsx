import React, { useEffect } from "react"; 
import { useDispatch , useSelector } from "react-redux";
import {ListGroup ,Button ,Row ,Col ,Container ,Card, Image} from 'react-bootstrap'
import BreadCumps from "../components/BreadCumps";
import Error from "../components/shared/Error";
import { Link } from "react-router-dom";
import { orderAction } from '../actions/orderAction';


const PlaceOrderScreen = ({history}) => {
    const dispatch = useDispatch()
    const addToCart = useSelector(state => state.addToCart)
    const userOrder = useSelector(state => state.userOrder)
    const {address , paymentMethod ,cartItems} = addToCart
    const {success,orderDetails,error} = userOrder

    cartItems.itemsPrice = Number(cartItems.reduce((acc,item)=> acc + item.price * item.qty,0).toFixed(2))
    cartItems.shippingPrice = cartItems.itemsPrice > 500 ? 50.00 : 0.00
    cartItems.taxPrice = cartItems.itemsPrice < 999 ? 0 : Number((0.07 * cartItems.itemsPrice).toFixed(2))
    cartItems.totalPrice = Number((cartItems.itemsPrice + cartItems.shippingPrice + cartItems.taxPrice))

    const placeOrderHandler = (e) => {
        e.preventDefault()
        dispatch(orderAction({
            cartItems:cartItems,
            address:address, 
            paymentMethod:paymentMethod ,
            shippingPrice:cartItems.shippingPrice ,
            taxPrice:cartItems.taxPrice ,
            totalPrice:cartItems.totalPrice
        }))
    }

    useEffect(()=>{
        if(success){
            history.push(`/myOrders/${orderDetails._id}`)
        }
    },[success,history])

    return(
        <>
       
            <Row>
                <Col md={12}>
                    <BreadCumps step1 step2 step3 step4/>
                </Col>
                <Col md={8}>
                <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>SHIPPING ADDRESS</h3>
                            House : <strong>{address.homeaddress}</strong><br />
                            Postal Code : <strong>{address.postalcode}</strong><br />
                            City : <strong>{address.city}</strong><br/>
                            Country : <strong>{address.country}</strong>
                        </ListGroup.Item>
                      
                        <ListGroup.Item>
                            <h3>PAYMENT METHOD</h3>
                            <p><strong>{paymentMethod}</strong></p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <ListGroup>
                                <h3>ORDER ITEMS</h3>
                                {
                                    cartItems.length === 0 ? (<Error variant="danger" message="Your Cart is Empty"/>) : (
                                        <>
                                            {
                                                cartItems.map((item,index) => (
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={3} className="my-3">
                                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                                        </Col>
                                                        <Col md={3} className="my-3">
                                                            <Link exact to={`/product/${item.product}`} className="link_att">{item.name}</Link>
                                                        </Col>
                                                        <Col md={4} className="d-flex align-items-center justify-content-center">
                                                            {item.qty} X Rs.{item.price}/- = Rs.{item.qty*item.price}/-
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                                ))
                                            }
                                        </>
                                    )
                                }
                            </ListGroup>
                        </ListGroup.Item>
                </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup>
                            <ListGroup.Item className="text-center">
                                <h3>ORDER SUMMARY</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row className="my-1">
                                    <Col>Items Price</Col>
                                    <Col>Rs.{cartItems.itemsPrice}/-</Col>
                                </Row>
                                <Row className="my-1">
                                    <Col>Shipping Price</Col>
                                    <Col>Rs.{cartItems.shippingPrice}/-</Col>
                                </Row>
                                <Row className="my-1">
                                    <Col>Tax Price</Col>
                                    <Col>Rs.{cartItems.taxPrice}/-</Col>
                                </Row>
                                <Row className="my-1">
                                    <Col>Total Price</Col>
                                    <Col>Rs.{cartItems.totalPrice}/-</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Error variant="danger" message={error}/>}
                            </ListGroup.Item>
                            <Button variant="dark" type="submit" onClick={placeOrderHandler}>Place Order</Button>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>           

        </>
    )
}

export default PlaceOrderScreen