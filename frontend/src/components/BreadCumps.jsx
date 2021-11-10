import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";


const BreadCumps = ({step1,step2,step3,step4}) => {

    return(
        <>
        <Nav className="mt-4 justify-content-center">
            <Nav.Item>
                {step1 ? (
                    <LinkContainer className="breadcumps_item mr-5" to="/login">
                        <Nav.Link><h4>Sign in</h4></Nav.Link>
                    </LinkContainer>
                ) : (<Nav.Link disabled><h4>Sign in</h4></Nav.Link>)}
            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <LinkContainer className="breadcumps_item mr-5" to="/shippingaddress">
                        <Nav.Link><h4>Shipping Address</h4></Nav.Link>
                    </LinkContainer>
                ) : (<Nav.Link disabled><h4>Shipping Address</h4></Nav.Link>)}
            </Nav.Item>
            <Nav.Item>
                {step3 ? (
                    <LinkContainer className="breadcumps_item mr-5" to="/payment">
                        <Nav.Link><h4>Payment</h4></Nav.Link>
                    </LinkContainer>
                ) : (<Nav.Link disabled><h4>Payment</h4></Nav.Link>)}
            </Nav.Item>
            <Nav.Item>
                {step4 ? (
                    <LinkContainer className="breadcumps_item mr-5" to="/placeorder">
                        <Nav.Link><h4>Place Order</h4></Nav.Link>
                    </LinkContainer>
                ) : (<Nav.Link disabled><h4>Place Order</h4></Nav.Link>)}
            </Nav.Item>
        </Nav>
        </>
    )
}

export default BreadCumps