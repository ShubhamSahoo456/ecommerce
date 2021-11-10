import React, {useState} from "react";
import { useDispatch , useSelector } from "react-redux";
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import BreadCumps from "../components/BreadCumps";
import {addPaymentMethodAction} from '../actions/addToCartAction'


const PaymentScreen = ({history}) => {
    const dispatch = useDispatch()
    const [paymentmethod , setPaymentMethod] = useState("paypal")
    const addToCart = useSelector(state => state.addToCart)
    const {address} = addToCart

    if(!address){
        history.push("/shippingaddress")
    }

    const paymentHandler = (e)=>{
        e.preventDefault()
        dispatch(addPaymentMethodAction(paymentmethod))
        history.push("/placeorder")
    }

    return (
        <>
        <Container>
            <Row>
                <Col md={12}>
                    <BreadCumps step1 step2 step3/>
                </Col>
                <Col md={6} className="mt-5">
                    <h1>PAYMENT METHOD</h1>
                    <Form onSubmit={paymentHandler}>
                        <Form.Label className="mt-2" as="legend">Select Payment Method</Form.Label>
                        <Col>
                            <Form.Check
                                className="mt-2"
                                type="radio"
                                label="Paypal or Credit Card"
                                value={paymentmethod}
                                id="paymentmethod"
                                name="paymentmethod"
                                onChange={(e)=>setPaymentMethod(e.target.value)}
                                checked />
                        </Col>
                        <Col>
                            <Button type="submit" className="mt-2" variant="dark">Continue</Button>
                        </Col>
                    </Form>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default PaymentScreen