const express = require('express');
const ProductsService = require('../services/products.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getProductSchema,
  createProductSchema,
  updateProductSchema,
  updatePartiallyProductSchema
} = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

// GET
router.get('/', async (req, res) => {
  const products = await service.find();
  res.status(200).json(products)
})

router.get('/:id', validatorHandler(getProductSchema, 'params'), (req, res, next) => {
  try {
    const { id } = req.params;
    const product = service.findOne(id);
    res.status(200).json(product);
  } catch (error) {
    next(error)
  }
})

// POST
router.post('/', validatorHandler(createProductSchema, 'body'), (req, res) => {
  const body = req.body;
  const newProduct = service.create(body)
  res.status(201).json(newProduct)
})

// PUT
router.put('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updated = service.update(id, body)
      res.status(200).json(updated)
    } catch (error) {
      next(error)
    }
  }
)

// PATCH
router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updatePartiallyProductSchema, 'body'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updated = service.updatePartially(id, body)
      res.status(200).json(updated)
    } catch (error) {
      next(error)
    }
  }
)

// DELETE
router.delete('/:id',
  validatorHandler(getProductSchema, 'params'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const deleted = service.delete(id)
      res.status(200).json(deleted)
    } catch (error) {
      next(error)
    }
  }
)



module.exports = router;