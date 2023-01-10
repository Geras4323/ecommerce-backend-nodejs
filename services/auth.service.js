const { models } = require('../libs/sequelize');


class AuthService {
  constructor() {}

  async findByEmail(email) {
    const user = await models.User.findOne({
      where: {
        email: email,
      }
    });
    return user;
  }
}

module.exports = AuthService;