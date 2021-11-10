import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import {PayPalButton} from 'react-paypal-button-v2'
import {useDispatch , useSelector} from 'react-redux'
import {ORDER_PAY_RESET} from '../constants/orderContants'
import { Link } from 'react-router-dom';
import {orderDetailsAction ,orderPayAction} from '../actions/orderAction'
import Error from '../components/shared/Error';
import Loader from '../components/shared/spinner';


const OrderScreen = ({match}) => {
    const orderId = match.params.id
    const [sdkReady , setSdkReady] = useState(false)
    const dispatch = useDispatch()
    const userOrderDetails = useSelector(state => state.userOrderDetails)
    const userOrderPay = useSelector(state => state.userOrderPay)
    const {loading , error ,order} = userOrderDetails
    const {loading:loadingPay,success:successPay} = userOrderPay

    useEffect(()=>{
        const paypalIntegration = async () =>{
                const {data:clientId} = await axios.get("/api/config/paypal")
                console.log(clientId)
                const script = document.createElement('script')
                script.type = "text/javascript"
                script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
                script.async = true

                script.onload=()=>{
                    setSdkReady(true)
                }
                document.body.appendChild(script)
        }
        if(!order || successPay){
            dispatch(orderDetailsAction(orderId,))
            dispatch({type:ORDER_PAY_RESET})
        }else if(!order.isPaid){
            if(!window.paypal){
                paypalIntegration()
            }else{
                setSdkReady(true)
            }
        }
        
    },[dispatch,orderId,order,successPay])

    const amountPaid = (paymentResult) => {
        console.log(paymentResult)
        const body = {
            id:paymentResult.id,
            status:paymentResult.status,
            update_time:paymentResult.update_time,
            email_address:paymentResult.payer.email_address
        }
        dispatch(orderPayAction(orderId,body))
    }

    return loading ? <Loader /> : error ? (<Error variant="danger" message={error}/>) :
            (
                <Row>
                    <Col md={7} className="ml-3 mt-3">
                        <ListGroup>
                            <ListGroup.Item>
                                <h3>SHIPPING DETAILS</h3>
                                <p>Name  : <strong>{order.user.name}</strong></p>
                                <p>Email  : <strong>{order.user.email}</strong></p>
                                <p>Delivery Address :</p>
                                <p>{order.shippingAddress.homeaddress}</p>
                                <p>{order.shippingAddress.city}, {order.shippingAddress.country}</p>
                                <p>Pincode : {order.shippingAddress.postalcode}</p>
                                {order.isDeliver ? (<Error variant="success" message="Product Delivered"/>) : (<Error variant="danger" message="Not Delivered"/>)}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h3>PAYMENT METHOD</h3>
                                <p><strong>{order.payment}</strong></p>
                                {order.isPaid ? (<Error variant="success" message="Payment Successful"/>) : (<Error variant="danger" message="Not paid"/>)}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <ListGroup>
                                {
                                    order.orderDetails.map((item,index)=>(
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={3} className="my-3">
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>
                                                <Col md={3} className="my-3">
                                                    <Link exact to={`/product/${item._id}`} className="link_att">{item.name}</Link>
                                                </Col>
                                                    <Col md={4} className="d-flex align-items-center justify-content-center">
                                                            {item.qty} X Rs.{item.price}/- = Rs.{item.qty*item.price}/-
                                                    </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))
                                }
                                </ListGroup>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={4} className="mr-3 mt-3">
                    <Card>
                        <ListGroup>
                            <ListGroup.Item className="text-center">
                                <h3>ORDER SUMMARY</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row className="my-1">
                                    <Col>Shipping Price</Col>
                                    <Col>Rs.{order.shippingPrice}/-</Col>
                                </Row>
                                <Row className="my-1">
                                    <Col>Tax Price</Col>
                                    <Col>Rs.{order.taxPrice}/-</Col>
                                </Row>
                                <Row className="my-1">
                                    <Col>Total Price</Col>
                                    <Col>Rs.{order.totalPrice}/-</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Error variant="danger" message={error}/>}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                        {
                            !order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? (<Loader />) :
                                    (
                                        <PayPalButton 
                                            amount={order.totalPrice}
                                            onSuccess={amountPaid}/>
                                    )}
                                </ListGroup.Item>
                            )
                        }
                    </Col>
                </Row>
            )
        
    
}

export default OrderScreen