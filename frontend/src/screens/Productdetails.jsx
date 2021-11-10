import React, {useState , useEffect } from "react";
import { Row ,Col ,ListGroup ,ListGroupItem ,Button ,Image, Form} from "react-bootstrap";
import Rating from "../components/Rating";
import {productDetailsAction} from '../actions/productAction'
import {useDispatch , useSelector} from 'react-redux'
import Loader from "../components/shared/spinner";
import Error from "../components/shared/Error";


const Productdetails = ({match,history})=>{
    const [qty , setQty] = useState(1)
    const dispatch = useDispatch();
    const productDet = useSelector(state => state.productDetails)
    const {loading,error,product} = productDet
    

    useEffect(()=>{
        dispatch(productDetailsAction(match.params.id))
    },[dispatch,match])

    const addProductToCart = ()=>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return(
        <>
        {loading ? <Loader /> : error ? <Error variant="danger" message={error}/> :

        <div className=" product_id">
        
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid className="product_img"/>
                </Col>
                <Col md={3} className="p-5">
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h3>{product.name}</h3>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Rating value={product.rating} review={`${product.reviews} Reviews`}/>
                        </ListGroupItem>
                        <ListGroupItem>
                            <p>Price :Rs. {product.price}/-</p>
                        </ListGroupItem>
                        <ListGroupItem>
                            <p>{product.description}</p>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={3} className="p-5">
                    <ListGroupItem>
                        <Row>
                            <Col>Status : </Col>
                            <Col>{product.countinstock > 0 ? "In Stock" : "Out Of Stock"}</Col>
                        </Row>
                    </ListGroupItem>
                    {product.countinstock > 0 && (
                        <ListGroupItem>
                            <Col>Qty</Col>
                            <Form.Control as="select" value={qty} onChange={(e)=>setQty(e.target.value)}>
                                {
                                    [...Array(product.countinstock).keys()].map((x)=>(
                                        <option key={x+1} value={x+1}>{x+1}</option>
                                    ))
                                }
                            </Form.Control>
                        </ListGroupItem>
                    )
                    }
                    <ListGroupItem>
                        <Button className="btn-block btn-dark" type="button" onClick={addProductToCart}>Add To Cart</Button>
                    </ListGroupItem>
                </Col>
            </Row>
        </div>
        }
        </>
    )
}

export default Productdetails;