const mongoose = require('mongoose');

const DBconn = async ()=>{
    try{
        console.log(process.env.MONGO)
        const conn = await mongoose.connect(process.env.MONGO,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })

        console.log('connection successful')
    }catch(error){
        console.error(error.message)
    }
}

module.exports = DBconn;