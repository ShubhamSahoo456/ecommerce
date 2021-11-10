import {USER_LOGIN_REQUEST,
        USER_LOGIN_SUCCESS,
        USER_LOGIN_FAIL,
        USER_LOGOUT,
        USER_REGISTER_REQUEST,
        USER_REGISTER_SUCCESS,
        USER_REGISTER_FAIL,
        USER_PROFILE_FAIL,
        USER_PROFILE_REQUEST,
        USER_PROFILE_SUCCESS,
        USER_PROFILE_UPDATE_SUCCESS,
        USER_PROFILE_UPDATE_FAIL,
        USER_PROFILE_UPDATE_REQUEST } from '../constants/userconstant'
import axios from 'axios';


export const userLogout = () => (dispatch) => {
    localStorage.removeItem("userInfo")
    dispatch({type:USER_LOGOUT})
}

export const userLoginAction = (email,password) => async (dispatch) => {
    try{
        dispatch({type:USER_LOGIN_REQUEST})
        const {data} = await axios.post("/api/v1/user/login",{email,password})
        
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })
        localStorage.setItem('userInfo',JSON.stringify(data))
    }catch(error){
        dispatch({type:USER_LOGIN_FAIL,payload:error.message})
    }
}

export const userRegisterAction = (name,email,password) => async(dispatch) => {
    try{
        dispatch({type:USER_REGISTER_REQUEST})
        const {data} = await axios.post("/api/v1/register",{name,email,password})

        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({type:USER_REGISTER_FAIL,error:error.message})
    }
}

export const userProfileAction = () => async(dispatch,getState) => {
    try{
        dispatch({
            type:USER_PROFILE_REQUEST
        })

        const {userLogin:{userInfo}} = getState()
        console.log(userInfo)
        const config ={
            headers:{ 
                authorization : `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get("/api/v1/userProfile",config)
        console.log(data)
        dispatch({
            type:USER_PROFILE_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:USER_PROFILE_FAIL,
            error:error.message
        })
    }
}

export const userUpdateProfileAction = (user) => async(dispatch,getState) => {
    try{
        dispatch({
            type:USER_PROFILE_UPDATE_REQUEST
        })
        
        const {userLogin:{userInfo}} = getState()
        const config = {
            headers:{
                authorization : `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put("/api/v1/userProfile",user,config)
        dispatch({
            type:USER_PROFILE_UPDATE_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:USER_PROFILE_UPDATE_FAIL,
            error:error.message
        })
    }
}