const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users');
const products = require('./data/data');
const User = require('./model/UserSchema');
const Product = require('./model/productSchema');
const Order = require('./model/OrderSchema');
const DBconn = require('./config/db');
const { deleteMany } = require('./model/UserSchema');

dotenv.config({path:'./config.env'})

DBconn();

const importData = async ()=>{
    try{
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        const createUser = await User.insertMany(users);
        const adminUser = createUser[0]._id;
        const sampledata = products.map((product)=>{
            return{...product,user:adminUser}
        })
        await Product.insertMany(sampledata);
        console.log('inserted sucessfully');
        process.exit();

    }catch(error){
        console.log(error.message)
        process.exit(1)
    }
}

const destroyData = async()=>{
    try{
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();
        process.exit()
    }catch(error){
        console.log(error)
    }
}

if(process.argv[2]=== "-d"){
    destroyData()
}else{
    importData()
}
