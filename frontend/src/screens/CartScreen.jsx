import React, { useEffect } from "react";
import { Button, Card, Col, Form, Image, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import {useDispatch ,useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import {addToCartAction,cartitems,removeCartItemAction} from '../actions/addToCartAction'
import Error from "../components/shared/Error";
import { REMOVE_CART_ITEM } from "../constants/cartconstant";

const CartProduct = ({match,location,history})=>{
    const dispatch = useDispatch()
    const cart = useSelector(state =>  state.addToCart)
    const {cartItems} = cart
    let productId = match.params.id
    let qty = location.search ? Number(location.search.split("=")[1]) : 1
    
    useEffect(()=>{
        if(productId){
            dispatch(addToCartAction(productId,qty))
        }
    },[dispatch,productId,qty])

    const removeCartitem = (id) => {
       dispatch(removeCartItemAction(id))
    }

    const checkOut = ()=>{
        history.push("/shippingaddress")
    }

    return(
        <>
            <Row>
                <Col md={8}>
                <h1>Shopping Cart</h1>
                {
                    cartItems.length === 0 ?
                    <Error variant="primary" message="Your cart is empty" />:(
                    <>
                    <ListGroup variant="flush">
                        {
                            cartItems.map((item)=>(
                                <>
                                <ListGroupItem>
                                    <Row>
                                        <Col md={3}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col md={3}>
                                            <Link exact to={`/product/${item.product}`} className="link_att">{item.name}</Link>
                                        </Col>
                                        <Col md={2}>Rs.{item.price}/-</Col>
                                        <Col md={4}>
                                            <Form.Control as="select" value={item.qty} onChange={(e)=>dispatch(addToCartAction(item.product,Number(e.target.value)))}>
                                                {
                                                    [...Array(item.countInStock).keys()].map((x)=>(
                                                        <option key={x+1} value={x+1}>{x+1}</option>
                                                    ))
                                                }
                                            </Form.Control>
                                            <Button type="button" variant="danger" onClick={()=>removeCartitem(item.product)}>
                                                <i className="fa fa-trash" aria-hidden="true"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                {/* <hr /> */}
                                </>
                            ))
                        }
                    </ListGroup>
                    </>
                    )
                }
                </Col>
                <Col md={4}>
                    <Card className="mt-5 mr-4">
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <h2>SubTotal({cartItems.reduce((acc,item)=>acc+item.qty,0)}) Items</h2>
                                Rs.{cartItems.reduce((acc,item)=>acc + item.qty * item.price,0)}/-
                            </ListGroupItem>
                            <Button className="btn btn-block bg-dark" disabled={cartItems.length===0} onClick={checkOut}>Proceed To Checkout</Button>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default CartProduct