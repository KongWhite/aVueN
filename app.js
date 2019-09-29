const express = require("express");
let routes = require("./routes/index");
const app = express();
app.use('/static',express.static('static'));
app.use('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080'); //这个表示任意域名都可以访问，这样写不能携带cookie了。
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');//设置方法
  res.header('Access-Control-Allow-Credentials', true);
  if (req.method == 'OPTIONS') {
    res.send(201); // 意思是，在正常的请求之前，会发送一个验证，是否可以请求。
  }
  else {
    next();
  }
});
app.use("/", routes);
app.listen(3000);

