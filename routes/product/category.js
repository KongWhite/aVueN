var express=require("express");
var router = express.Router();
var pool = require("../../pool");
var moment = require("moment");
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.get("/parertList",function(req, res) {
  var sql = "SELECT * FROM avue_category WHERE category_level = 1";
  pool.query(sql,[],(err, result) => {
    if (err) {
      throw err;
    }
    if (result.length >= 0) {
      res.send({code: "0", msg: "操作成功!", data: result});
    } else {
      res.send({code: "1", msg: "获取失败!", data: result});
    }
  })
});
router.post("/saveByCategory",function(req, res) {
  let obj = req.body,
  category_id = moment(new Date()).format('YYYYMMDDHHmmss'),
  category_name = obj.category_name,
  category_level = 1,
  category_parentId = obj.category_parentId,
  create_time = new Date(),
  category_num = 0,
  update_time = new Date();
  if(category_parentId != "") {
    category_level = 2;
  }
  if(category_level == 1) {
    let sql = "INSERT INTO avue_category (category_num, category_id, category_name, category_level, create_time, update_time) VALUES (?, ?, ?, ?, ?, ?)";
    let sqlTotal = "SELECT COUNT(id) AS total FROM avue_category";
    new Promise((open) => {
      pool.query(sqlTotal,(err, result) => {
        if(err){
          throw err;
        }
        if(result.length >= 0){
          category_num = Number(result[0].total) + 1;
          if(category_num.toString().length <= 1){
            category_num = "0" + category_num;
          }
          open();
        }
      })
    }).then(() => {
      pool.query(sql,[category_num, category_id, category_name, category_level, create_time, update_time],(err, result) => {
        if(err){
          throw err;
        }
        res.send({code: "0", msg: "添加成功!"})
      })
    })
  } else if (category_level == 2) {
    let sql = "INSERT INTO avue_category (category_num, category_id, category_name, category_level, create_time, update_time) VALUES (?, ?, ?, ?, ?, ?)";
  }
});
module.exports = router;