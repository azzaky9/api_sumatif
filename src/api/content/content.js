const express = require("express")
const router = express.Router()

router.get("/content", (req, res) => {
  return res.send({ message: "test" })
})

module.exports = router