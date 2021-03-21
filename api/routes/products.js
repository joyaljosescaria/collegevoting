const express = require("express");
const router = express.Router();

const products = require('../controllers/products.js')

router.get("/" , products.getProducts) //Get all products
router.post("/" , products.createProduct) //Create a new product
router.put("/:productId" , products.editProduct ) //Update a product
router.delete("/:productId" , products.deleteProduct ) //Delete a product
router.get("/:productId" , products.getProduct) //Get a product

module.exports = router;