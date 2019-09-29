
var express = require('express');
var bodyParse = require('body-parser');
var multer = require("multer");
var router = express.Router();


// 设置图片存储路径
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './static/uploads');
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})


// 添加配置文件到muler对象。
var upload = multer({ storage: storage });
var imgBaseUrl = '../'
 
// bodyParse 用来解析post数据
router.use(bodyParse.urlencoded({extended:false}));
router.use(express.static('public'));

router.post('/imgUpload',upload.single('file'),function(req, res){
  var files = req.file;
  // 设置返回结果
  var result = {};
  if(!files) {
    result.code = 1;
    result.msg = '上传失败';
  } else {
    result.code = 0;
    result.data = {
      url: files.path
    }
    result.msg = '上传成功';
  }
  res.send(JSON.stringify(result));
})
 
module.exports = router;