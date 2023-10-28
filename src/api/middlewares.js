const { Router } = require("express")
const router = Router()
const content = require("./content/content")
const product = require('./product/product');
const feature = require('./product/feature');

router.use(content)

router.use(product)

router.use(feature)

module.exports = router