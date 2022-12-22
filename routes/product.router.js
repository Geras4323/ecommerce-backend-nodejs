const express = require('express');

const ProductsService = require('../services/product.service');
const validationHandler = require('../middlewares/validation.handler');
const {
  getProductSchema,
  queryProductSchema,
  createProductSchema,
  updateProductSchema,
  updatePartiallyProductSchema
} = require('../schemas/product.schema');


const router = express.Router();
const service = new ProductsService();

// GET ////////////////////////////////////////////////////
router.get('/',
  validationHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      // const { limit, offset, price } = req.query;
      const products = await service.find(req.query);
      res.status(200).json(products)
    } catch (err) {
      next(err);
    }
  }
)

router.get('/:id',
  validationHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.status(200).json(product);
    } catch (error) {
      next(error)
    }
  }
)

// POST ////////////////////////////////////////////////////
router.post('/',
  validationHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body)
      res.status(201).json(newProduct)
    } catch (err) {
      next(err);
    }
  }
)

// PUT ////////////////////////////////////////////////////
router.put('/:id',
  validationHandler(getProductSchema, 'params'),
  validationHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updated = await service.update(id, body)
      res.status(200).json(updated)
    } catch (error) {
      next(error)
    }
  }
)

// PATCH ////////////////////////////////////////////////////
router.patch('/:id',
  validationHandler(getProductSchema, 'params'),
  validationHandler(updatePartiallyProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updated = await service.updatePartially(id, body)
      res.status(200).json(updated)
    } catch (error) {
      next(error)
    }
  }
)

// DELETE ////////////////////////////////////////////////////
router.delete('/:id',
  validationHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleted = await service.delete(id)
      res.status(200).json(deleted)
    } catch (error) {
      next(error)
    }
  }
)


module.exports = router;