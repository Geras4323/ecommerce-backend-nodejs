const Joi = require('joi');

const id      = Joi.number().integer().positive();
const name    = Joi.string();
const active  = Joi.boolean();


const getCategorySchema = Joi.object({
  id:   id.required(),
});

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
  createCategorySchema,
  updateCategorySchema,
  updatePartiallyCategorySchema
}