const Joi = require('joi');

const id          = Joi.number().integer();
const name        = Joi.string().min(3);
const image       = Joi.string().uri();
const description = Joi.string().min(10);
const price       = Joi.number().positive();
const isVisible   = Joi.boolean();
const CategoryId  = Joi.number().integer();

const limit       = Joi.number().integer().min(0);
const offset      = Joi.number().integer().min(0);
const price_min   = Joi.number().integer().min(0);
const price_max   = Joi.number().integer().min(0);


const getProductSchema = Joi.object({
  id: id.required(),
})

const queryProductSchema = Joi.object({
  limit: limit,
  offset: offset,
  price: price,
  price_min: price_min,
  price_max: price_max.when('price_min', {
    is: price_min.required(),
    then: Joi.required(),
  })
})

const createProductSchema = Joi.object({
  name: name.required(),
  image: image.required(),
  description: description.required(),
  price: price.required(),
  isVisible: isVisible,
  CategoryId: CategoryId.required(),
})

const updateProductSchema = Joi.object({
  name: name.required(),
  image: image.required(),
  description: description.required(),
  price: price.required(),
  isVisible: isVisible.required(),
  CategoryId: CategoryId.required(),
})

const updatePartiallyProductSchema = Joi.object({
  name: name,
  image: image,
  description: description,
  price: price,
  isVisible: isVisible,
  CategoryId: CategoryId,
})

module.exports = {
  getProductSchema,
  queryProductSchema,
  createProductSchema,
  updateProductSchema,
  updatePartiallyProductSchema,
}