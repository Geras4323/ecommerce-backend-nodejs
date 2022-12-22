const express = require('express');

const PaymentService = require('../services/payment.service');
const validationHandler = require('../middlewares/validation.handler');
const {
  getPaymentSchema,
  createPaymentSchema,
  updatePaymentSchema,
  updatePartiallyPaymentSchema
} = require('../schemas/payment.schema');


const router = express.Router();
const service = new PaymentService();

// GET ////////////////////////////////////////////////////
router.get('/', async (req, res, next) => {
  try {
    const payments = await service.find();
    res.status(200).json(payments);
  } catch (err) {
    next(err);
  }
})

router.get('/:id',
  validationHandler(getPaymentSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const payments = await service.findOne(id);
      res.status(200).json(payments);
    } catch (err) {
      next(err);
    }
  }
)

// POST ////////////////////////////////////////////////////
router.post('/',
  validationHandler(createPaymentSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newPayment = await service.create(body);
      res.status(201).json(newPayment);
    } catch (err) {
      next(err);
    }
  }
)

// PUT ////////////////////////////////////////////////////
router.put('/:id',
  validationHandler(getPaymentSchema, 'params'),
  validationHandler(updatePaymentSchema, 'body'),
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
  validationHandler(getPaymentSchema, 'params'),
  validationHandler(updatePartiallyPaymentSchema, 'body'),
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
  validationHandler(getPaymentSchema, 'params'),
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