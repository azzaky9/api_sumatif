const { Router } = require("express")
const router = Router()
const content = require("./content/content")
const product = require('./product/product');

router.use(content)

router.use(product)

module.exports = router