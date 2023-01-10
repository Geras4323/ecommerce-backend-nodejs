const jwt = require('jsonwebtoken');

function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

module.exports = { signToken };