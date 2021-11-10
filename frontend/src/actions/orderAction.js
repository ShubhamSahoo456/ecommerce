import axios from "axios"
import {ORDER_DETAILS_FAIL,
        ORDER_DETAILS_REQUSET,
        ORDER_DETAILS_SUCCESS,
        ORDER_FAIL, 
        ORDER_PAY_FAIL, 
        ORDER_PAY_REQUSET, 
        ORDER_PAY_SUCCESS, 
        ORDER_REQUEST, 
        ORDER_SUCCESS } from "../constants/orderContants"


export const orderAction  = (order) => async(dispatch,getState) => {
    try{
        dispatch({
            type:ORDER_REQUEST
        })

        const {userLogin:{userInfo}} = getState()
        const config = {
            headers:{
                authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post("/api/v1/newOrder",order,config)
        dispatch({
            type:ORDER_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:ORDER_FAIL,
            payload:error.message
        })
    }
}

export const orderDetailsAction = (id) => async(dispatch,getState) => {
    try{
        dispatch({
            type:ORDER_DETAILS_REQUSET
        })

        const {userLogin:{userInfo}} = getState()
        const config = {
            headers:{
                authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/v1/getOrderById/${id}`,config)
        dispatch({
            type:ORDER_DETAILS_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({type:ORDER_DETAILS_FAIL,payload:error.message})
    }
}

export const orderPayAction = (id,paymentresult) => async(dispatch,getState) => {
    try{
        dispatch({
            type:ORDER_PAY_REQUSET
        })

        const {userLogin:{userInfo}} = getState()
        const config = {
            headers:{
                authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(`/api/v1/updateOrder/${id}/pay`,paymentresult,config)
        dispatch({
            type:ORDER_PAY_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({type:ORDER_PAY_FAIL,payload:error.message})
    }
}