const fileService = require("../service/file.service");
const userService = require("../service/user.service");
const { APP_HOST, APP_PORT } = require("../app/config");
const errorType = require("../constants/error-types");

class FileController {
  async saveAvatarInfo(ctx, next) {
    const { mimetype, filename, size } = ctx.req.file;

    const { userId } = ctx.params;
    const id = userId;
    //判断当前用户是否已经存在头像
    const result = await fileService.isExistAvatar(id);

    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
    try {
      result
        ? await fileService.updateAvatar(filename, mimetype, size, id) 
        : await fileService.createAvatar(filename, mimetype, size, id);
      await userService.updateAvatarUrlById(avatarUrl, id);
      ctx.body = {
        message: "上传成功",
        url: avatarUrl,
      };
    } catch (err) {
      const error = new Error(errorType.AVATARUPLOAD_IS_NOTSUCCESS);
      return ctx.app.emit("error", error, ctx);
    }
  }
}

module.exports = new FileController();
