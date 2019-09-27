var express=require("express");
var router = express.Router();
var pool = require("../../pool")
 
router.get('/list',function(req, res){
  let obj = req.query,
  pageNum = obj.pageNum,
  pageSize = obj.pageSize,
  prod_id = obj.prod_id,
  prod_name = obj.prod_name,
  brief = obj.brief,
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
    sqlTotal += " AND prod_id like ?";
    keyWord.push(prod_name+"%");
  }
  if(brief != undefined) {
    sqlList += " AND brief like ?";
    sqlTotal += " AND prod_id like ?";
    keyWord.push(brief+"%");
  }
  if(status != undefined) {
    sqlList += " AND status like ?"
    sqlTotal += " AND prod_id like ?";
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
      if(err){
        throw err;
      }
      if(result.length >= 0){
        data.total = result[0].total;
        res.send({code: "0", msg: "操作成功", data: data})
      }
    })
  })
});
 
// http://localhost:3001/admin/goods/add
router.get('/add',function(req,res){
    res.send('显示商品 增加');
});
 
router.get('/edit',function(req,res){
    res.send('显示商品 修改');
});

router.get('/delete',function(req,res){
    res.send('显示商品 删除');
});
 
module.exports = router;   //暴露这个 router模块