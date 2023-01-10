require('dotenv').config();
const boom = require('@hapi/boom');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === process.env.API_KEY) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

/*
function checkAdminRole(req, res, next) {
  const role = req.user.role;
  if (role === 'administrator') {
    next()
  } else {
    next(boom.forbidden(`You need administrator priviledges to do that`));
  }
}
*/

function checkRoles(roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next()
    } else {
      next(boom.forbidden(`You do not have the required priviledges`));
    }
  }
}

module.exports = { checkApiKey, checkRoles };