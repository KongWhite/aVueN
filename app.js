const express = require("express");
let routes = require("./routes/index");
const app = express();
app.use('/', routes);
app.listen(3000);
