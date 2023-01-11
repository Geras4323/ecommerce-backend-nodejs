const express = require('express');

const authRouter = require('./auth.router');
const profileRouter = require('./profile.router');
const usersRouter = require('./user.router');
const ordersRouter = require('./order.router');
const productsRouter = require('./product.router');
const categoriesRouter = require('./category.router');
const paymentsRouter = require('./payment.router');
const suppliersRouter = require('./supplier.router');

function routerApi (app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/auth', authRouter);
  router.use('/profile', profileRouter);
  router.use('/users', usersRouter);
  router.use('/orders', ordersRouter);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/payments', paymentsRouter);
  router.use('/suppliers', suppliersRouter);
}

module.exports = routerApi;