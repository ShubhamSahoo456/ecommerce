import React from "react";
import { Card } from "react-bootstrap";
import Rating from "../components/Rating";
import {LinkContainer} from 'react-router-bootstrap';

const ProductScreen = ({product})=>{

    return(
        <>
        <Card className="my-5 rounded product_card mx-4">
            <LinkContainer exact to={`/product/${product._id}`}>
                <Card.Img className="card_img" src={product.image} variant="top"/> 
            </LinkContainer>
            <Card.Body >
                <LinkContainer exact to={`/product/${product._id}`} className="text-decoration-none">
                    <Card.Title as="div" >
                        <strong>{product.name}</strong>
                    </Card.Title>
                </LinkContainer>
                <Card.Text as="div">
                    <Rating value={product.rating} review={`${product.reviews} reviews`}/>
                </Card.Text>
                <Card.Text>
                    <div className="my-3">
                        <strong>Price  :  Rs.{product.price}/-</strong>
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
        </>
    )
}

export default ProductScreen;