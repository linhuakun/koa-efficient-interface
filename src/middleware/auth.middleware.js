const jwt = require("jsonwebtoken");
//错误信息抽离
const errorType = require("../constants/error-types");

const { PUBLIC_KEY } = require("../app/config");

const userservice = require("../service/user.service");
//解密
const md5password = require('../utils/password-handle');


const verifyLogin = async (ctx, next) => {
  //1、获取电话和密码
  const { iphone, password } = ctx.request.body;

  //2、判断电话和密码是否为空
  if (!iphone || !password) {
    const error = new Error(errorType.IPHONE_OR_PASSWORD_IS_NOT_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }
  //3、判断用户是是否存在（用户不存在）
  const result = await userservice.getUserByIphone(iphone);
  const user = result[0];
  if (!user) {
    const error = new Error(errorType.USER_DOES_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }
  //4、判断密码是否和数据库中一致
  if (md5password(password) !== user.password) {
    const error = new Error(errorType.PASSWORD_IS_INCORRECT);
    return ctx.app.emit("error", error, ctx);
  }
  //5、一致则把数据赋值给user
  ctx.user = user;

  await next();
};

const verifyAuth = async (ctx, next) => {
  //1、获取token
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    const error = new Error(errorType.NOEXISTAUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }
  const token = authorization.replace("Bearer ", "");
  //2、验证token(id/name/iat/exp)
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = result;
    await next();
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    ctx.app.emit("error", error, ctx);
  }
};

module.exports = {
  verifyLogin,
  verifyAuth,
};
