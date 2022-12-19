const { ValidationError } = require('sequelize');


function errorLogger(err, req, res, next) {
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}

function boomHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload)
  } else {
    next(err);
  }
}

function sqlError(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      error: err.errors[0].message,
    })
  } else {
    next(err);
  }
}

module.exports = {
  errorLogger,
  errorHandler,
  boomHandler,
  sqlError,
}