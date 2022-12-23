const Joi = require('joi');

const id      = Joi.number().integer().positive();
const name    = Joi.string();
const active  = Joi.boolean();

const limit       = Joi.number().integer().min(0);
const offset      = Joi.number().integer().min(0);


const getCategorySchema = Joi.object({
  id:   id.required(),
});

const queryCategorySchema = Joi.object({
  limit:  limit,
  offset: offset,
  active: active,
})

const createCategorySchema = Joi.object({
  name: name.required(),
  active: active,
})

const updateCategorySchema = Joi.object({
  name: name.required(),
  active: active.required(),
})

const updatePartiallyCategorySchema = Joi.object({
  name: name,
  active: active,
})

module.exports = {
  getCategorySchema,
  queryCategorySchema,
  createCategorySchema,
  updateCategorySchema,
  updatePartiallyCategorySchema
}