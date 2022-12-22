'use strict';

const { ORDERS_TABLE } = require('../models/order.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert(ORDERS_TABLE, [
      {
        userID: 1,
        total: 475.67,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userID: 1,
        total: 779.36,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userID: 2,
        total: 394.3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userID: 2,
        total: 1270.58,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userID: 3,
        total: 1278.44,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userID: 3,
        total: 973.37,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userID: 4,
        total: 1328.98,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userID: 4,
        total: 227.12,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete(ORDERS_TABLE, null);
  }
};