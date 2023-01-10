const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');

const { verifyPassword } = require('../../hashing/verifyPassword');
const AuthService = require('../../../services/auth.service');
const service = new AuthService();


const LocalStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password',
  },
  async (username, password, done) => {
    try {
      const user = await service.findByEmail(username);
      if (!user) {
        done(null, false)
      } else if (! await verifyPassword(password, user.password)) {
        done(boom.unauthorized(), false);
      } else {
        delete user.dataValues.password;  // hide password from answer
        done(null, user)
      }
    } catch (err) {
      done(err, false)
    }
  }
);

module.exports = LocalStrategy;