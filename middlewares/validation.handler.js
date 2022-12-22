const boom = require('@hapi/boom');

function validationHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];

    // if data is Array => validate schema for each object of array
    // if not => validate schema for received object

    if (Array.isArray(data)) {
      for (const element of data) {
        const { error } = schema.validate(element, { abortEarly: false });
        if (error) {
          next(boom.badRequest(error));
        }
      }
      next()
    } else {
      const { error } = schema.validate(data, { abortEarly: false });
      if (error) {
        next(boom.badRequest(error))
      }
      next()
    }
  }
}

module.exports = validationHandler;