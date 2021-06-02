//错误信息抽离
const errorType = require("../constants/error-types");
//调用服务器函数
const service = require("../service/user.service");
//加密函数导入
const md5password = require("../utils/password-handle");

const verifyUser = async (ctx,next) => {
  //1、获取用户名和密码
  const { name, password, iphone } = ctx.request.body;
  //2、判断用户名、密码或者手机不能为空
  if (!name || !password || !iphone) {
    const error = new Error(
      errorType.NAME_OR_PASSWORD_OR_TELEPHONE_IS_NOT_REQUIRED
    );
    return ctx.app.emit("error", error, ctx);
  }
  //3、判断这次注册的电话是否被注册过
  const result = await service.getUserByIphone(iphone);
  if (result.length) {
    const error = new Error(errorType.IPHONE_ISEXIST);
    return ctx.app.emit("error", error, ctx);
  }
  await next();
};

const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  //对密码md5加密
  ctx.request.body.password = md5password(password);
  await next();
};


module.exports = {
  verifyUser,
  handlePassword,
};
