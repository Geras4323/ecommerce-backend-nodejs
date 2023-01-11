const express = require('express');
const passport = require('passport');

const OrderService = require('../services/order.service');


const router = express.Router();
const service = new OrderService();

router.get('/my-orders',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const userId = req.user.sub;
      const orders = await service.findByUser(userId);
      res.status(200).json(orders);
    } catch (err) {
      next(err)
    }
  }
)

router.get('/my-info',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const userId = req.user.sub;
      // const orders = await service.findByUser(userId);
      // res.status(200).json(orders);
      res.status(200).send('tu info');
    } catch (err) {
      next(err)
    }
  }
)


module.exports = router;