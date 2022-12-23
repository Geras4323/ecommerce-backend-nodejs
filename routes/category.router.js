const express = require('express');

const CategoryService = require('../services/category.service');
const validationHandler = require('../middlewares/validation.handler');
const {
  getCategorySchema,
  queryCategorySchema,
  createCategorySchema,
  updateCategorySchema,
  updatePartiallyCategorySchema
} = require('../schemas/category.schema');


const router = express.Router();
const service = new CategoryService();

// GET ////////////////////////////////////////////////////
router.get('/',
  validationHandler(queryCategorySchema, 'query'),
  async (req, res, next) => {
    try {
      const categories = await service.find(req.query);
      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }
)

router.get('/:id',
  validationHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id)
      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }
)

// POST ////////////////////////////////////////////////////
router.post('/',
  validationHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (err) {
      next(err);
    }
  }
)

// PUT ////////////////////////////////////////////////////
router.put('/:id',
  validationHandler(getCategorySchema, 'params'),
  validationHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updated = await service.update(id, body);
      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  }
)

// PATCH ////////////////////////////////////////////////////
router.patch('/:id',
  validationHandler(getCategorySchema, 'params'),
  validationHandler(updatePartiallyCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updated = await service.updatePartially(id, body);
      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  }
)

// DELETE ////////////////////////////////////////////////////
router.delete('/:id',
  validationHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleted = await service.delete(id);
      res.status(200).json(deleted)
    } catch (err) {
      next(err);
    }
  }
)


module.exports = router;