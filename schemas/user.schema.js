const Joi = require('joi');

const id        = Joi.string().uuid();
const email     = Joi.string().email();
const password  = Joi.string().min(8);
const role      = Joi.string();

const getUserSchema = Joi.object({
  id: id.required(),
})

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required(),
})

const updateUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required(),
})

const updatePartiallyUserSchema = Joi.object({
  email: email,
  password: password,
  role: role,
})

module.exports = { getUserSchema, createUserSchema, updateUserSchema, updatePartiallyUserSchema };