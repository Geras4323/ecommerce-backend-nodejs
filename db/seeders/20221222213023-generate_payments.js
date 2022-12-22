'use strict';

const { PAYMENTS_TABLE } = require('../models/payment.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert(PAYMENTS_TABLE, [
      {
        orderID: 1,
        amount: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderID: 1,
        amount: 275.67,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderID: 2,
        amount: 779.36,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderID: 3,
        amount: 394.3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderID: 4,
        amount: 420.58,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderID: 4,
        amount: 850,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderID: 5,
        amount: 1278.44,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderID: 6,
        amount: 600,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderID: 6,
        amount: 373.37,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderID: 7,
        amount: 1328.98,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderID: 8,
        amount: 227.12,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete(PAYMENTS_TABLE, null);
  }
};