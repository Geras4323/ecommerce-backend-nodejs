const Joi = require('joi');

const {
  createUserSchema,
  updateUserSchema,
  updatePartiallyUserSchema
} = require('./user.schema');

const id        = Joi.number().integer();
const name      = Joi.string();
const lastName  = Joi.string();
const phone     = Joi.string().min(9);
const UserId    = Joi.number().integer();

const getCustomerSchema = Joi.object({
  id: id.required(),
})

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone,
  User: createUserSchema,
})

const updateCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone,
  User: updateUserSchema,
})

const updatePartiallyCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
  User: updatePartiallyUserSchema,
})

module.exports = {
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema,
  updatePartiallyCustomerSchema
}