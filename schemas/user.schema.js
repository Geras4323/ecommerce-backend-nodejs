const Joi = require('joi');
const customJoi = Joi.extend(require('joi-phone-number'));

const id         = Joi.number().integer().positive();
const username   = Joi.string().min(4);
const email      = Joi.string().email();
const password   = Joi.string().min(8);
const first_name = Joi.string().min(4);
const last_name  = Joi.string().min(4);
const phone      = customJoi.string().phoneNumber();
const role       = Joi.string().valid('administrator', 'customer');
const active     = Joi.boolean();

const limit       = Joi.number().integer().min(0);
const offset      = Joi.number().integer().min(0);

const token       = Joi.string();


const getUserSchema = Joi.object({
  id:   id.required(),
})

const queryUserSchema = Joi.object({
  limit:      limit,
  offset:     offset,
  active:     active,
  role:       role,
})

const createUserSchema = Joi.object({
  username:   username.required(),
  email:      email.required(),
  password:   password.required(),
  first_name: first_name.required(),
  last_name:  last_name.required(),
  phone:      phone,
  role:       role,
  active:     active,
})

const updateUserSchema = Joi.object({
  username:   username.required(),
  email:      email.required(),
  password:   password.required(),
  first_name: first_name.required(),
  last_name:  last_name.required(),
  phone:      phone.required(),
  role:       role.required(),
  active:     active.required(),
})

const updatePartiallyUserSchema = Joi.object({
  username:   username,
  email:      email,
  password:   password,
  first_name: first_name,
  last_name:  last_name,
  phone:      phone,
  role:       role,
  active:     active,
})

const changePassword = Joi.object({
  token:       token.required(),
  newPassword: password.required(),
})

module.exports = {
  getUserSchema,
  queryUserSchema,
  createUserSchema,
  updateUserSchema,
  updatePartiallyUserSchema,
  changePassword
};