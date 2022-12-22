const { ValidationError } = require('sequelize');


function errorLogger(err, req, res, next) {
  console.log('this is a log ////////////////////////////')
  console.error(err);
  console.log('this ends the log ////////////////////////////')
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    // handler: 'error',
    message: err.message,
    // stack: err.stack,
  })
}

function boomHandler(err, req, res, next) {
  if (err.isBoom) {
    console.error('///////////////////////////////////////////////////////// BOOM ERROR /////////////////////////////////////////////////////////')
    const { output } = err;
    res.status(output.statusCode).json({
      // handler: 'boom',
      error: output.payload
    })
  }
  next(err);
}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    console.error('///////////////////////////////////////////////////////// ORM ERROR /////////////////////////////////////////////////////////')
    res.status(409).json({
      // handler: 'orm',
      statusCode: 409,  // 409 = conflict
      error: {
        message: err.errors[0].message,
        value: err.errors[0].value,
      }
    })
  } else {
    next(err);
  }
}

module.exports = {
  errorLogger,
  errorHandler,
  boomHandler,
  ormErrorHandler,
}