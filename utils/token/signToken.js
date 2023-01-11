const jwt = require('jsonwebtoken');

function signToken(payload, secret, options = {}) {
  return jwt.sign(payload, secret, options);
}

module.exports = { signToken };