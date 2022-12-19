const express = require('express');

const CustomerService = require('../services/customer.service');
const validationHandler = require('../middlewares/validation.handler');
const {
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema,
  updatePartiallyCustomerSchema
} = require('../schemas/customer.schema');


const router = express.Router();
const service = new CustomerService();

// GET
router.get('/', async (req, res) => {
  const customers = await service.find();
  res.status(200).json(customers);
})

router.get('/:id',
  validationHandler(getCustomerSchema, 'params'),
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

// POST
router.post('/',
  validationHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCustomer = await service.create(body);
      res.status(201).json(newCustomer);
    } catch (err) {
      next(err);
    }
  }
)

// PUT
router.put('/:id',
  validationHandler(getCustomerSchema, 'params'),
  validationHandler(updateCustomerSchema, 'body'),
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

// PATCH
router.patch('/:id',
  validationHandler(getCustomerSchema, 'params'),
  validationHandler(updatePartiallyCustomerSchema, 'body'),
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

// DELETE
router.delete('/:id',
  validationHandler(getCustomerSchema, 'params'),
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