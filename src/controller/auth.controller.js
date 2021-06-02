const { PRIVATE_KEY } = require("../app/config");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

class AuthController {
  async login(ctx, next) {
    let status;
    const { id, name, telephone } = ctx.user;
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24 * 30,
      algorithm: "RS256",
    });
    status = 200;
    ctx.body = { id, name, telephone, token };
  }
  async success(ctx, next) {
    ctx.body = "授权成功~";
  }
  async loadingHome(ctx, next) {
    ctx.response.type = "html";
    ctx.response.body = fs.createReadStream(
      path.resolve(__dirname, "../build/index.html")
    );
  }
}

module.exports = new AuthController();
