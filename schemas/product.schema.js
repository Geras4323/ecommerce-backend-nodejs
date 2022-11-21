const Joi = require('joi')

const id        = Joi.string().uuid();
const name      = Joi.string().min(3);
const price     = Joi.number().positive();
const image     = Joi.string().uri();
const isVisible = Joi.boolean();

const getProductSchema = Joi.object({
  id: id.required(),
})

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  isVisible: isVisible.required(),
})

const updateProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  isVisible: isVisible.required(),
})

const updatePartiallyProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  isVisible: isVisible,
})

module.exports = { getProductSchema, createProductSchema, updateProductSchema, updatePartiallyProductSchema }