const express = require("express");
let product = require("./product/goods");
let upload = require("./upload/index");
let category = require("./product/category");

const router = express();

router.use("/prod", product);
router.use("/upload", upload);
router.use("/category", category);
module.exports = router;