const Router = require("koa-router");

const authRouter = new Router();

const {
  login,
  success,
  loadingHome,
} = require("../controller/auth.controller");
const { verifyLogin,verifyAuth } = require("../middleware/auth.middleware");

authRouter.get("/", loadingHome);

//用户登陆接口
authRouter.post("/login", verifyLogin, login);

//token令牌获取
authRouter.get("/test", verifyAuth, success);

module.exports = authRouter;
