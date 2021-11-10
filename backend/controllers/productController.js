const Product = require('../model/productSchema')

const getAllProducts = async (req,res)=>{
    try{
        const products = await Product.find({})
        if(products){
            res.status(200).json(products)
        }else{
            res.status(404).json({message:"product not found"})
        }
    }catch(error){
        console.log(error)
        res.status(400).json({message:"error found"})
    }
}


const getProductById = async (req,res)=>{
    try{
        const id = req.params.id;
        const product = await Product.findById({_id:id});
        if(product){
            res.status(200).json(product)
        }else{
            res.status(404).json({message:"product not found"})
        }
    }catch(error){
        console.log(error)   
    }
}

module.exports = {
    getAllProducts,
    getProductById
}