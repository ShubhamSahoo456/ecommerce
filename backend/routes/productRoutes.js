const express = require('express');
const {getAllProducts , getProductById} = require('../controllers/productController')
const router = express.Router();

router.get("/api/v1/product",getAllProducts)
router.get("/api/v1/product/:id",getProductById)

module.exports = router