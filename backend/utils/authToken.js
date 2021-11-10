const jwt = require('jsonwebtoken')

const authUser = async (id)=>{
    try{
        const token = await jwt.sign({id},process.env.SECRET_KEY,{
            expiresIn:'15d'
        })
       
        return token
    }catch(error){
        console.log(error)
    }
}

module.exports = authUser