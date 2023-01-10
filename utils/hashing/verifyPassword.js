const bcrypt = require('bcrypt');

async function verifyPassword(password, hash) {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
}

module.exports = { verifyPassword };