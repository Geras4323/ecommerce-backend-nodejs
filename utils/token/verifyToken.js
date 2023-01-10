const jwt = require('jsonwebtoken');

const secret = 'youShouldntKnowThis';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY3MzI3NDg3M30.yog_8MDU51raemae10FbIZ6-70U6IW2ieTD1dnqybV4';

function verifyToken(token, secret) {
  return jwt.verify(token, secret)
}

const payload = verifyToken(token, secret);
console.log(payload);
// la verificación del token nos devuelve el payload que habiamos guardado