const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    }
},{timestamps:true})


userSchema.pre("save",async function(next){
    try{
        if(!this.isModified('password')){
            next()
        }
        this.password = await bcrypt.hash(this.password,10)
        next()
    }catch(error){
        resizeBy.status(400).json({"message":"unable to bcrypt password"})
        throw new error("unable to bcryt password")
    }
})


userSchema.methods.passwordVerify = async function(userPassword) {
    try{
        const verifyPassword = await bcrypt.compare(userPassword,this.password)
        
        if(verifyPassword){
            return true
        }else{
            return false
        }
    }catch(error){

    }
}

const User = mongoose.model("User",userSchema);

module.exports = User;