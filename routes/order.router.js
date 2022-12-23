const express = require('express');

const OrderService = require('../services/order.service');
const validationHandler = require('../middlewares/validation.handler');
const {
  getOrderSchema,
  queryOrderSchema,
  createOrderSchema,
  addProductSchema,
  updateOrderSchema,
  updatePartiallyOrderSchema,
} = require('../schemas/order.schema');


const router = express.Router();
const service = new OrderService();

// GET ////////////////////////////////////////////////////
router.get('/',
  validationHandler(queryOrderSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }
)

router.get('/:id',
  validationHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.status(200).json(order);
    } catch (err) {
      next(err);
    }
  }
)

// POST /////////////////////////////////////////////////////
router.post('/',
  validationHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (err) {
      next(err);
    }
  }
)

router.post('/add-product',
  validationHandler(addProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.addProduct(body);
      res.status(201).json(newOrder);
    } catch(err) {
      next(err);
    }
  }
)

// PUT //////////////////////////////////////////////////////
router.put('/:id',
  validationHandler(getOrderSchema, 'params'),
  validationHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updated = await service.update(id, body);
      res.status(200).json(updated);
    } catch(err) {
      next(err);
    }
  }
)

// PATCH //////////////////////////////////////////////////////
router.patch('/:id',
  validationHandler(getOrderSchema, 'params'),
  validationHandler(updatePartiallyOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updated = await service.update(id, body);
      res.status(200).json(updated);
    } catch(err) {
      next(err);
    }
  }
)

// DELETE //////////////////////////////////////////////////////
router.delete('/:id',
  validationHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleted = await service.delete(id);
      res.status(200).json(deleted);
    } catch(err) {
      next(err)
    }
  }
)

router.delete('/:id/remove-product/:productID',
  validationHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id, productID } = req.params;
      const deleted = await service.removeProduct(id, productID);
      res.status(200).json(deleted);
    } catch(err) {
      next(err)
    }
  }
)


module.exports = router;