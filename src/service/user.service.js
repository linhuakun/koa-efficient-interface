const connection = require("../app/database");

class UserService {
  async createUser(user) {
    const { name, password, iphone } = user;
    console.log(user);
    const statement = `INSERT INTO user (name,password,telephone) VALUES (?,?,?)`;
    const result = await connection.execute(statement, [
      name,
      password,
      iphone,
    ]);
    return result[0];
  }
  async getUserByIphone(iphone) {
    const statement = `SELECT * FROM user WHERE telephone = ?;`;
    const result = await connection.execute(statement, [iphone]);
    return result[0];
  }

  async updateAvatarUrlById(avatarUrl, userId) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [avatarUrl, userId]);
    return result;
  }

  async getAvatarByUserId(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id=?;`;
    const [result] = await connection.execute(statement, [userId]);
    return result[0];
  }
}

module.exports = new UserService();
