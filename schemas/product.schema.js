const Joi = require('joi');

const id          = Joi.number().integer().positive();
const categoryID  = Joi.number().integer().positive();
const supplierID  = Joi.number().integer().positive();
const name        = Joi.string().min(3);
const description = Joi.string().min(10);
const image       = Joi.string().uri();
const price       = Joi.number().positive();
const active      = Joi.boolean();

const limit       = Joi.number().integer().min(0);
const offset      = Joi.number().integer().min(0);
const price_min   = Joi.number().integer().min(0);
const price_max   = Joi.number().integer().min(0);


const getProductSchema = Joi.object({
  id:   id.required(),
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
  categoryID:   categoryID.required(),
  supplierID:   supplierID.required(),
  name:         name.required(),
  description:  description.required(),
  image:        image.required(),
  price:        price.required(),
  active:       active,
})

const updateProductSchema = Joi.object({
  categoryID:   categoryID.required(),
  supplierID:   supplierID.required(),
  name:         name.required(),
  description:  description.required(),
  image:        image.required(),
  price:        price.required(),
  active:       active.required(),
})

const updatePartiallyProductSchema = Joi.object({
  categoryID:   categoryID,
  supplierID:   supplierID,
  name:         name,
  description:  description,
  image:        image,
  price:        price,
  active:       active,
})

module.exports = {
  getProductSchema,
  queryProductSchema,
  createProductSchema,
  updateProductSchema,
  updatePartiallyProductSchema,
}