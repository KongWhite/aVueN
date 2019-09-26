var express=require("express");
var router = express.Router();
var pool = require("../../pool")
 
router.get('/list',function(req,res){
  var sql = "SELECT * FROM avue_prod";
  pool.query(sql,(err, result) => {
    if(err){
      throw err;
    }
    let data = {
      list:[],
      pageSize: 20,
      pageNum: 1,
      total: 50
    }
    if(result.length >= 0){
      data.list = result
      res.send({code: "0", msg: "操作成功", data: data})
    }
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