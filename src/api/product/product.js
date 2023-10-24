const express = require("express")
const router = express.Router()
const { createProduct } = require('../../controller/product/product');

router.post("/product", createProduct)

module.exports = router