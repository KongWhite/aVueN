var express=require("express");
var router = express.Router();
var pool = require("../../pool");
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));
 
router.get("/list",function(req, res) {
  let obj = req.query,
  pageNum = obj.pageNum,
  pageSize = obj.pageSize,
  prod_id = obj.prod_id,
  prod_name = obj.prod_name,
  category_id = obj.category_id,
  status = obj.status,
  pageIndex = 0,
  keyWord = [];
  var sqlList = "SELECT * FROM avue_prod WHERE 1=1";
  var sqlTotal = "SELECT COUNT(*) AS total FROM avue_prod WHERE 1=1"
  if(prod_id != undefined) {
    sqlList += " AND prod_id like ?";
    sqlTotal += " AND prod_id like ?";
    keyWord.push(prod_id+"%");
  }
  if(prod_name != undefined) {
    sqlList += " AND prod_name like ?";
    sqlTotal += " AND prod_name like ?";
    keyWord.push(prod_name+"%");
  }
  if(category_id != undefined) {
    sqlList += " AND category_id like ?";
    sqlTotal += " AND category_id like ?";
    keyWord.push(brief+"%");
  }
  if(status != undefined) {
    sqlList += " AND status = ?"
    sqlTotal += " AND status = ?";
    keyWord.push(status+"%");
  }
  if(pageSize == undefined) {
    pageSize = 20;
  }
  if(pageNum == undefined) {
    pageNum = 1;
  }
  pageIndex = (pageNum-1) * pageSize
  let data = {
    list:[],
    pageSize: pageSize,
    pageNum: pageNum,
  }
  sqlList += " limit " + pageIndex + "," + pageSize;
  new Promise((open) => {
    pool.query(sqlList,keyWord,(err, result) => {
      if(err){
        throw err;
      }
      if(result.length >= 0){
        data.list = result;
        open();
      }
    })
  }).then(() => {
    pool.query(sqlTotal,keyWord,(err, result) => {
      if (err) {
        throw err;
      }
      if (result.length >= 0) {
        data.total = result[0].total;
        res.send({code: "0", msg: "操作成功!", data: data});
      }
    })
  })
});
router.get("/findByProd",function(req, res) {
  let obj = req.query,
  prod_id = obj.prod_id;
  var sqlList = "SELECT * FROM avue_prod WHERE 1=1";
  sqlList += " AND prod_id = ?";
  pool.query(sqlList,prod_id,(err, result) => {
    if(err){
      throw err;
    }
    if(result.length >= 0){
      res.send({code: "0", msg: "操作成功!", data: result[0]}) 
    }
  })
});

router.post("/saveByProduct",function(req,res) {
  let obj = req.body,
  prod_id = obj.prod_id,
  prod_name = obj.prod_name,
  category_id = obj.category_id,
  status = obj.status,
  pic = obj.pic,
  ori_price = obj.ori_price,
  price = obj.price,
  create_time = obj.create_time,
  sql = "INSERT INTO avue_prod (prod_id, prod_name, category_id, status, pic, ori_price, price, create_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  pool.query(sql,[prod_id, prod_name, category_id, status, pic, ori_price, price, create_time], (err ,result) => {
    if (err) {
      throw err;
    }
    if (result.affectedRows > 0) {
      res.send({code: "0", msg: "添加成功!"});
    } else {
      res.send({code: "1", msg: "添加失败!"});
    }
  })
});
 
router.post("/updateByproduct",function(req,res){
  let obj = req.body,
  prod_id = obj.prod_id,
  prod_name = obj.prod_name,
  category_id = obj.category_id,
  status = obj.status,
  pic = obj.pic,
  ori_price = obj.ori_price,
  price = obj.price,
  sql = "UPDATE avue_prod SET prod_name = ?, category_id = ?, status = ?, pic = ?, ori_price = ?, price = ? WHERE prod_id = ?";
  pool.query(sql,[prod_name, category_id, status, pic, ori_price, price, prod_id], (err ,result) => {
    if (err) {
      throw err;
    }
    console.log(result)
    if (result.affectedRows > 0) {
      res.send({code: "0", msg: "修改成功!"});
    } else {
      res.send({code: "1", msg: "修改失败!"});
    }
  })
});

router.post('/deleteByProduct',function(req,res){
  let obj = req.body;
  let prod_id = obj.prodIds;
  let sql = "DELETE FROM avue_prod WHERE prod_id in (";
  for (let i =0; i<prod_id.length; i++) {
    if (i<prod_id.length-1){
      sql += prod_id[i] + ",";
    } else {
      sql += prod_id[i];
    }
  }
  sql += ")";
  console.log(sql);
  pool.query(sql,[],(err, result) => {
    if (err) {
      throw err;
    }
    if (result.affectedRows > 0) {
      res.send({code: "0", msg: "删除成功!"});
    } else {
      res.send({code: "1", msg: "删除失败!"});
    }
  })
});
 
module.exports = router;   //暴露这个 router模块