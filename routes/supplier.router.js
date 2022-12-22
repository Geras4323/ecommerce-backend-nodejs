const express = require('express');

const SupplierService = require('../services/supplier.service');
const validationHandler = require('../middlewares/validation.handler');
const {
  getSupplierSchema,
  createSupplierSchema,
  updateSupplierSchema,
  updatePartiallySupplierSchema
} = require('../schemas/supplier.schema');


const router = express.Router();
const service = new SupplierService();

// GET ////////////////////////////////////////////////////
router.get('/', async (req, res) => {
  const customers = await service.find();
  res.status(200).json(customers);
})

router.get('/:id',
  validationHandler(getSupplierSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await service.findOne(id);
      res.status(200).json(customer);
    } catch (err) {
      next(err);
    }
  }
)

// POST ////////////////////////////////////////////////////
router.post('/',
  validationHandler(createSupplierSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newSupplier = await service.create(body);
      res.status(201).json(newSupplier);
    } catch (err) {
      next(err);
    }
  }
)

// PUT ////////////////////////////////////////////////////
router.put('/:id',
  validationHandler(getSupplierSchema, 'params'),
  validationHandler(updateSupplierSchema, 'body'),
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
  validationHandler(getSupplierSchema, 'params'),
  validationHandler(updatePartiallySupplierSchema, 'body'),
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
  validationHandler(getSupplierSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleted = await service.delete(id);
      res.status(200).json(deleted);
    } catch (err) {
      next(err);
    }
  }
)


module.exports = router;