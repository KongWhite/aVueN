const express = require("express");
let product = require("./product/goods");

const router = express();

router.use("/product", product);
module.exports = router;