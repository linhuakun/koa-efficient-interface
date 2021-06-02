const Multer = require('koa-multer');
const {AVATAR_PATH} = require('../constants/file-path');

const avtarUpload = Multer({
    dest:AVATAR_PATH
})

const avatarHandler = avtarUpload.single('avatar')


module.exports={
    avatarHandler
}