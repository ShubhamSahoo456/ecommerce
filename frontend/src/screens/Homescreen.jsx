import React, { useEffect, useState } from "react";
import ProductScreen from "./ProductScreen";
import {useDispatch , useSelector} from 'react-redux'
import {productListAction} from '../actions/productAction'
import Loader from '../components/shared/spinner'
import Error from "../components/shared/Error";


const Homescreen = ()=>{

    const dispatch = useDispatch();
    const productList = useSelector(state => state.productsList)
    const {loading , product , error} = productList

    useEffect(()=>{
        dispatch(productListAction())
    },[dispatch])
    
    return(
        <>
        <h1 className="my-4">ECOMMERCE APP</h1>
            {loading ? <Loader /> : error ? <Error variant="danger" message={error}/>:
                product.map((product)=>(
                    <>
                        <ProductScreen product={product}/> 
                    </>
                ))
            }
        </>
    )
}

export default Homescreen;