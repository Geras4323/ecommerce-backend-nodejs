const Joi = require('joi');

const id        = Joi.number().integer().positive();
const name      = Joi.string().min(5);

const limit       = Joi.number().integer().min(0);
const offset      = Joi.number().integer().min(0);


const getSupplierSchema = Joi.object({
  id: id.required(),
})

const querySupplierSchema = Joi.object({
  limit: limit,
  offset: offset,
})

const createSupplierSchema = Joi.object({
  name: name.required(),
})

const updateSupplierSchema = Joi.object({
  name: name.required(),
})

const updatePartiallySupplierSchema = Joi.object({
  name: name,
})

module.exports = {
  getSupplierSchema,
  querySupplierSchema,
  createSupplierSchema,
  updateSupplierSchema,
  updatePartiallySupplierSchema
}