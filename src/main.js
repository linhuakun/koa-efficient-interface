//1、接口入口、入口文件拆分
const app = require('./app');
//建立数据库连接池
require("./app/database");
//引入环境参数
const {APP_PORT} = require('./app/config');

app.listen(APP_PORT, () => {
  console.log("http://localhost:8000");
});
