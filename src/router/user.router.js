const Router = require('koa-router');

const { verifyUser, handlePassword } = require("../middleware/user.middleware");

const { createUser,avatarInfo } = require("../controller/user.controller");

const userRouter = new Router({ prefix: "/users" });

userRouter.post('/create',verifyUser,handlePassword,createUser);

userRouter.get("/:userId/avatar", avatarInfo);

module.exports = userRouter;