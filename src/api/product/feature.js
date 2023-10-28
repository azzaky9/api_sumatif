const express = require("express");
const router = express.Router();
const { createFeature, getAllFeature } = require("../../controller/feature");

router.post("/feature", createFeature);

router.get("/feature", getAllFeature)


module.exports = router;
