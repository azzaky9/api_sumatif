const { Router } = require("express");
const router = Router();
const content = require("./content/content");
const product = require("./product/product");
const feature = require("./product/feature");
const email = require("./email/email");

router.use(content);

router.use(product);

router.use(feature);

router.use(email);

module.exports = router;
