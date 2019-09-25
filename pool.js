const mysql = require("mysql");
const dbPoolConfig = {
  host: "localhost",
  port: 3306,
  database: "avue",
  user: "root",
  password: "123456",
  connectionLimit: 10
};
const pool  = mysql.createPool(dbPoolConfig);
module.exports = pool;
