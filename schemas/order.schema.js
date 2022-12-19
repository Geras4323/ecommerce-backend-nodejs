const Joi = require('joi');

const id          = Joi.number().integer();
const payed       = Joi.boolean();
const CustomerId  = Joi.number().integer();
const OrderId     = Joi.number().integer();
const ProductId   = Joi.number().integer();
const amount      = Joi.number().integer().min(1);

const getOrderSchema = Joi.object({
  id: id.required()
})

const createOrderSchema = Joi.object({
  payed: payed,
  CustomerId: CustomerId.required(),
})

const addProductSchema = Joi.object({
  OrderId: OrderId.required(),
  ProductId: ProductId.required(),
  amount: amount.required(),
})

const updateOrderSchema = Joi.object({
  payed: payed.required(),
  CustomerId: CustomerId.required(),
})

const updatePartiallyOrderSchema = Joi.object({
  payed: payed,
  CustomerId: CustomerId,
})

module.exports = {
  getOrderSchema,
  createOrderSchema,
  addProductSchema,
  updateOrderSchema,
  updatePartiallyOrderSchema,
}