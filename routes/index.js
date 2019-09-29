const express = require("express");
let product = require("./product/goods");
let upload = require("./upload/index");

const router = express();

router.use("/product", product);
router.use("/upload", upload);
module.exports = router;