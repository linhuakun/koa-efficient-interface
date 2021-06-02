const koa = require("koa");

const app = new koa();

//解析json、urlencode数据
const  bodyParser = require('koa-bodyparser')
//中间件路由部分
const useRoutes=require('../router');
//错误信息返回
const errorHandler=require('./error-handle');

//加载静态文件
// const koastatic = require("koa-static");


app.use(bodyParser());


useRoutes(app);

app.on("error", errorHandler);

module.exports=app;