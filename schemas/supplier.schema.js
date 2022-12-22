const Joi = require('joi');

const id        = Joi.number().integer().positive();
const name      = Joi.string().min(5);


const getSupplierSchema = Joi.object({
  id: id.required(),
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
  createSupplierSchema,
  updateSupplierSchema,
  updatePartiallySupplierSchema
}