const connection = require("../app/database");

class fileService {
  async isExistAvatar(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id=?`;
    const [result] = await connection.execute(statement, [userId]);
    return result.length ? true : false;
  }
  async createAvatar(filename, mimetype, size, userId) {
    const statement = `INSERT INTO avatar (filename,mimetype,size,user_id) VALUES(?,?,?,?);`;
    const [result] = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      userId,
    ]);
    return result[0];
  }
  async updateAvatar(filename, mimetype, size, userId) {
    const statement = `UPDATE avatar SET filename=?,mimetype=?,size=? WHERE user_id=? ;`;
    const [result] = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      userId,
    ]);
    return result[0];
  }
}

module.exports = new fileService();
