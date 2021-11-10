const User = require('../model/UserSchema')
const jwt = require('jsonwebtoken')


const authtoken = async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]
            let decoded = jwt.verify(token,process.env.SECRET_KEY)
            req.user = await User.findById(decoded.id).select("-password")
            next()
        }catch(error){
            res.status(401)
            throw new Error('token not valid')
        }
    }else{
        res.status(404)
        throw new Error('not authorized,no token')
    }
}

module.exports = {authtoken}