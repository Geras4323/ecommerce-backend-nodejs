const express = require('express');
const passport = require('passport');

const OrderService = require('../services/order.service');
const UserService = require('../services/user.service');
const validationHandler = require('../middlewares/validation.handler');
const {
  getOrderSchema,
  queryOrderSchema,
  createOrderSchema,
  confirmOrderSchema,
  addProductSchema,
  updateOrderSchema,
  updatePartiallyOrderSchema,
} = require('../schemas/order.schema');
const { checkRoles } = require('../middlewares/auth.handler');


const router = express.Router();
const orderService = new OrderService();
const userService = new UserService();

// GET ////////////////////////////////////////////////////
router.get('/',
  validationHandler(queryOrderSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await orderService.find(req.query);
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
      const order = await orderService.findOne(id);
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
      const newOrder = await orderService.create(body);
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
      const newOrder = await orderService.addProduct(body);
      res.status(201).json(newOrder);
    } catch(err) {
      next(err);
    }
  }
)

router.post('/confirmation',
  validationHandler(confirmOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { userID, orderID } = req.body;
      const user = await userService.findById(userID);
      const order = await orderService.findOne(orderID);
      const userData = `
      <h3>The following user has placed an order:</h3>
        <div style='width: 280px; padding: 0 8px; border-radius: 8px; border-bottom: 1px solid #74c27e; margin-bottom: 4px; display: flex; flex-direction: row'>
          <p style='width: 30%'><b style='text-decoration: underline'>Username</b>:</p>
          <p style='width: 70%; text-align: right'>${user.username}</p>
        </div>
        <div style='width: 280px; padding: 0 8px; border-radius: 8px; border-bottom: 1px solid #74c27e; margin-bottom: 4px; display: flex; flex-direction: row'>
          <p style='width: 30%'><b style='text-decoration: underline'>Email</b>:</p>
          <p style='width: 70%; text-align: right'>${user.email}</p>
        </div>
        <div style='width: 280px; padding: 0 8px; border-radius: 8px; border-bottom: 1px solid #74c27e; margin-bottom: 4px; display: flex; flex-direction: row'>
          <p style='width: 30%'><b style='text-decoration: underline'>First name</b>:</p>
          <p style='width: 70%; text-align: right'>${user.first_name}</p>
        </div>
        <div style='width: 280px; padding: 0 8px; border-radius: 8px; border-bottom: 1px solid #74c27e; margin-bottom: 4px; display: flex; flex-direction: row'>
          <p style='width: 30%'><b style='text-decoration: underline'>Last name</b>:</p>
          <p style='width: 70%; text-align: right'>${user.last_name}</p>
        </div>
        <div style='width: 280px; padding: 0 8px; border-radius: 8px; border-bottom: 1px solid #74c27e; margin-bottom: 4px; display: flex; flex-direction: row'>
          <p style='width: 30%'><b style='text-decoration: underline'>Phone</b>:</p>
          <p style='width: 70%; text-align: right'>${'' || user.phone}</p>
        </div>
      `;

      let orderData = `<h3>Order details:</h3><h4>Products:</h4>`;
      (order.products).forEach(product => {
        const productInfo = `
          <div style='
            width: 250px;
            padding: 0 8px;
            background-color: white;
            display: flex;
            flex-direction: row;
            margin-bottom: 16px;
            border-radius: 10px;
            border: 1px solid #74c27e;
          '>
              <p style='width: 25%; text-align: left; color: #686e79'>ID: ${product.id}</p>
              <p style='width: 50%; text-align: center;'>${product.name}</p>
              <p style='width: 25%; text-align: right;'>$ ${product.price}</p>
          </div>
        `
        orderData += productInfo;
      });
      orderData += `
        <div style='width: 250px; padding: 0 8px; border-bottom: 1px solid #74c27e; border-radius: 8px; display: flex; flex-direction: row'>
          <h4 style='width: 50%'>Total</h4>
          <h4 style='width: 50%; text-align: right'>$ ${order.total}</h4>
        </div>
      `;

      const notificationMessage = await orderService.sendNotificationEmail(userData, orderData);
      const confirmationMessage = await orderService.sendConfirmationEmail(user.email, orderData);
      res.status(200).json({notification: notificationMessage, confirmation: confirmationMessage});
    } catch (err) {
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
      const updated = await orderService.update(id, body);
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
      const updated = await orderService.update(id, body);
      res.status(200).json(updated);
    } catch(err) {
      next(err);
    }
  }
)

// DELETE //////////////////////////////////////////////////////
router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['administrator']),
  validationHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleted = await orderService.delete(id);
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
      const deleted = await orderService.removeProduct(id, productID);
      res.status(200).json(deleted);
    } catch(err) {
      next(err)
    }
  }
)


module.exports = router;