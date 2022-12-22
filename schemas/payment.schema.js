const Joi = require('joi');

const id      = Joi.number().integer().positive();
const orderID = Joi.number().integer().positive();
const amount  = Joi.number().positive();


const getPaymentSchema = Joi.object({
  id:   id.required(),
})

const createPaymentSchema = Joi.object({
  orderID: orderID.required(),
  amount: amount.required(),
})

const updatePaymentSchema = Joi.object({
  orderID: orderID.required(),
  amount: amount.required(),
})

const updatePartiallyPaymentSchema = Joi.object({
  orderID: orderID,
  amount: amount,
})

module.exports = {
  getPaymentSchema,
  createPaymentSchema,
  updatePaymentSchema,
  updatePartiallyPaymentSchema
}