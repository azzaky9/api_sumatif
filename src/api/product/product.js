const express = require("express")
const router = express.Router()
const { createProduct, getProduct, getDiscoverHomepage, searchProduct, getRuangGuruBrainAcademy,  } = require('../../controller/product/product');

router.post("/product", createProduct)

router.get("/product", getProduct)

router.get("/product/ruang-guru/brain-acedemy", getRuangGuruBrainAcademy)

router.get("/product/discover", getDiscoverHomepage)

router.get("/product/search", searchProduct)

module.exports = router