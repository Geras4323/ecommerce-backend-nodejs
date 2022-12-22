const Joi = require('joi');

const id         = Joi.number().integer().positive();
const userID     = Joi.number().integer().positive();
const total      = Joi.number().positive();
const orderID    = Joi.number().integer().positive();
const productID  = Joi.number().integer().positive();
const quantity   = Joi.number().integer().min(1).positive();


const getOrderSchema = Joi.object({
  id:        id.required(),
  productID: productID,
})

const createOrderSchema = Joi.object({
  userID:    userID.required(),
  total:     total.required(),
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
  createOrderSchema,
  addProductSchema,
  updateOrderSchema,
  updatePartiallyOrderSchema,
}