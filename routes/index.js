const express = require('express');

const productsRouter = require('./product.router');
const categoriesRouter = require('./category.router');
const usersRouter = require('./user.router');
const customersRouter = require('./customer.router');
const ordersRouter = require('./order.router');

function routerApi (app) {
  const router = express.Router();
  app.use('/api/v1', router)
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
  router.use('/customers', customersRouter);
  router.use('/orders', ordersRouter);
}

module.exports = routerApi;