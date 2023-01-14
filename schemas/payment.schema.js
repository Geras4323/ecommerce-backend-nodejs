const Joi = require('joi');

const id      = Joi.number().integer().positive();
const orderID = Joi.number().integer().positive();
const amount  = Joi.number().min(0);

const limit       = Joi.number().integer().min(0);
const offset      = Joi.number().integer().min(0);
const amount_min   = Joi.number().min(0);
const amount_max   = Joi.number().min(0);


const getPaymentSchema = Joi.object({
  id:   id.required(),
})

const queryPaymentSchema = Joi.object({
  limit:      limit,
  offset:     offset,
  amount:     amount,
  amount_min: amount_min,
  amount_max: amount_max,
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
  queryPaymentSchema,
  createPaymentSchema,
  updatePaymentSchema,
  updatePartiallyPaymentSchema
}