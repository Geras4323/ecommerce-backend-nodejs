const jwt = require('jsonwebtoken');

function verifyToken(token, secret) {
  return jwt.verify(token, secret)
}
// la verificación del token nos devuelve el payload que habiamos guardado

module.exports = { verifyToken };