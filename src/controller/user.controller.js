const UserService = require("../service/user.service");
const fs = require('fs');
const { AVATAR_PATH } = require("../constants/file-path");

class UserController {
  async createUser(ctx, next) {
    const user = ctx.request.body;
    await UserService.createUser(user);
    ctx.body = "注册成功";
  }
  async avatarInfo(ctx, next) {
    //1、用户的头像是哪一个文件
    const { userId } = ctx.params;

    const avatarInfo = await UserService.getAvatarByUserId(userId);
    //1、提供图像信息
    ctx.response.set("content-type", avatarInfo.mimetype);

    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);
  }
}

module.exports = new UserController();
