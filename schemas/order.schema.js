const Joi = require('joi');

const id         = Joi.number().integer().positive();
const userID     = Joi.number().integer().positive();
const total      = Joi.number().positive();
const orderID    = Joi.number().integer().positive();
const productID  = Joi.number().integer().positive();
const quantity   = Joi.number().integer().min(1).positive();

const limit       = Joi.number().integer().min(0);
const offset      = Joi.number().integer().min(0);
const total_min   = Joi.number().min(0);
const total_max   = Joi.number().min(0);


const getOrderSchema = Joi.object({
  id:        id.required(),
  productID: productID,
})

const queryOrderSchema = Joi.object({
  limit:     limit,
  offset:    offset,
  total:     total,
  total_min: total_min,
  total_max: total_max,
})

const createOrderSchema = Joi.object({
  userID:    userID.required(),
  total:     total.required(),
})

const confirmOrderSchema = Joi.object({
  userID:    userID.required(),
  orderID:   orderID.required(),
})

const addProductSchema = Joi.object({
  orderID:   orderID.required(),
  productID: productID.required(),
  quantity:  quantity.required(),
})

const updateOrderSchema = Joi.object({
  userID:    userID.required(),
  total:     total.required(),
})

const updatePartiallyOrderSchema = Joi.object({
  userID:    userID,
  total:     total,
})

module.exports = {
  getOrderSchema,
  queryOrderSchema,
  createOrderSchema,
  confirmOrderSchema,
  addProductSchema,
  updateOrderSchema,
  updatePartiallyOrderSchema,
}