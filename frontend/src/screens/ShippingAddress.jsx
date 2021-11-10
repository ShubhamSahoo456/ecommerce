import React ,{useState} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import {addShippingAddressAction} from '../actions/addToCartAction'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import BreadCumps from '../components/BreadCumps'


const ShippingAddress = ({history}) => {

    const dispatch = useDispatch()
    const addToCart = useSelector(state => state.addToCart)
    const {address} = addToCart

    const [homeaddress , setHomeAddress] = useState(address.homeaddress)
    const [city , setCity] = useState(address.city)
    const [postalcode , setPostalcode] = useState(address.postalcode)
    const [country , setCountry] = useState(address.country)

    const addShippingAddress =(e) => {
        e.preventDefault()
        dispatch(addShippingAddressAction({homeaddress,postalcode,city,country}))
        history.push("/payment")
    }

    return(
        <>
        <Container>
            <Row>
                <Col md={12}>
                    <BreadCumps step1 step2/>
                </Col>
                <Col md={6} >
                    <h1 className="my-5">Shipping Address</h1>
                    <Form onSubmit={addShippingAddress}>
                        <Form.Group controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control 
                                placeholder="Enter Address"
                                name="address"
                                value={homeaddress}
                                onChange={(e)=>setHomeAddress(e.target.value)} 
                                required/>
                        </Form.Group>
                        <Form.Group controlId="postalcode">
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control 
                                placeholder="Enter Postal Code"
                                name="postalcode"
                                value={postalcode}
                                onChange={(e)=>setPostalcode(e.target.value)}
                                required />
                        </Form.Group>
                        <Form.Group controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control 
                                placeholder="Enter City"
                                name="city"
                                value={city}
                                onChange={(e)=>setCity(e.target.value)}
                                required />
                        </Form.Group>
                        <Form.Group controlId="country">
                            <Form.Label>Country</Form.Label>
                            <Form.Control 
                                placeholder="Enter Country"
                                name="country"
                                value={country}
                                onChange={(e)=>setCountry(e.target.value)}
                                required />
                        </Form.Group>
                        <Button className="btn btn-dark" type="submit">Continue</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
      
        </>
    )
}

export default ShippingAddress