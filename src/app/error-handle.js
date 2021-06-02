const errorType = require("../constants/error-types");

const errorHandler = (error, ctx) => {
  let status, message;
  switch (error.message) {
    case errorType.NAME_OR_PASSWORD_OR_TELEPHONE_IS_NOT_REQUIRED:
      status = 400;
      message = "用户名、密码、手机号不能为空～";
      break;
    case errorType.IPHONE_ISEXIST:
      status = 409;
      message = "手机已经存在～";
      break;
    case errorType.IPHONE_OR_PASSWORD_IS_NOT_REQUIRED:
      status=400;
      message="密码、手机号不能为空～";
      break;
    case errorType.NOEXISTAUTHORIZATION:
      status=402;
      message="token无上传";
      break;
    case errorType.UNAUTHORIZATION:
      status=401;
      message = "无效token";
      break;
    case errorType.AVATARUPLOAD_IS_NOTSUCCESS:
      status=402;
      message="上传头像失败";
      break;
    default:
      status = 404;
      message = "NOT FOUND";
  }
  ctx.status=status;
  ctx.body=message
};

module.exports = errorHandler; 