const User = require('../model/UserSchema')
const Token = require('../utils/authToken')


const userRegister = async(req,res) =>{
    try{ 
        const {name,email,password} = req.body
        const user = await User.findOne({email})
        if(user){
            res.status(201).json({message:"email already exists"})
        }else{
            const registerUser = await User.create({name,email,password})
            if(registerUser){
                res.json({
                    _id:registerUser._id,
                    name:registerUser.name,
                    email:registerUser.email,
                    isAdmin:registerUser.isAdmin,
                    token: await Token(registerUser._id)
                })
            }else{
                res.status(404).json({message:"unable to create user"})
            }
        }
    }catch(error){
        res.status(404)
        throw new Error('not a valid user')
    }
}

const userLogin = async(req,res) => {
    try{
        const {email , password} = req.body
    
        const user = await User.findOne({email})
       
        if(user && (await user.passwordVerify(password))){
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                token: await Token(user._id)
            })
        }else{
            res.status(401).json({
                message:"invalid details"
            })
        }
    }catch(error){
        console.log(error)
    }
}

const userProfile = async(req,res) => {
    try{
        const user = await User.findById(req.user._id)
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        })
    }catch(error){
        res.status(404)
        throw new Error('User not found,no token found')
    }
}

const updateProfile = async(req,res) => {
    try{
        const user = await User.findById(req.user.id)
        if(user){
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            if(req.body.password){
                user.password = req.body.password
            }
            const updatedUser = await user.save()
            if(updatedUser){
                res.json({
                    _id:updatedUser._id,
                    name:updatedUser.name,
                    email:updatedUser.email,
                    isAdmin:updatedUser.isAdmin,
                    token: await Token(updatedUser._id)
                })
            }
        }else{
            res.status(404)
            throw new Error('user not found')
        }

    }catch(error){
        res.status(404)
        throw new Error('User Profile Not Updated')
    }
}

module.exports = {
    userLogin,
    userProfile,
    userRegister,
    updateProfile
}
