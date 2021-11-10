import {PRODUCT_LIST_REQUEST ,
    PRODUCT_LIST_SUCCESS ,
    PRODUCT_LIST_FAIL ,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL} from '../constants/productconstant'
import axios from 'axios'

export const productListAction = () => async(dispatch)=>{
    try{
        dispatch({type:PRODUCT_LIST_REQUEST})
        const {data} = await axios.get("/api/v1/product")
        dispatch({type:PRODUCT_LIST_SUCCESS,payload:data})
    }catch(error){
        console.log(error)
        dispatch({type:PRODUCT_LIST_FAIL,payload:error.message})
    }
}


export const productDetailsAction = (id) => async(dispatch) => {
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST})
        const {data} = await axios.get(`/api/v1/product/${id}`)
        dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:data})
    }catch(error){
        dispatch({type:PRODUCT_DETAILS_FAIL,payload:error.message})
    }
}