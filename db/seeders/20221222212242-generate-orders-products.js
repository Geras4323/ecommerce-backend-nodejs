'use strict';

const { ORDERS_PRODUCTS_TABLE } = require('../models/order-product.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert(ORDERS_PRODUCTS_TABLE, [
      {
        orderID: 4,
        productID: 12,
        quantity: 3,
      },
      {
        orderID: 4,
        productID: 5,
        quantity: 5,
      },
      {
        orderID: 1,
        productID: 21,
        quantity: 3,
      },
      {
        orderID: 7,
        productID: 1,
        quantity: 5,
      },
      {
        orderID: 7,
        productID: 3,
        quantity: 5,
      },
      {
        orderID: 5,
        productID: 15,
        quantity: 1,
      },
      {
        orderID: 7,
        productID: 21,
        quantity: 2,
      },
      {
        orderID: 5,
        productID: 28,
        quantity: 4,
      },
      {
        orderID: 8,
        productID: 15,
        quantity: 1,
      },
      {
        orderID: 7,
        productID: 37,
        quantity: 2,
      },
      {
        orderID: 2,
        productID: 4,
        quantity: 2,
      },
      {
        orderID: 4,
        productID: 19,
        quantity: 2,
      },
      {
        orderID: 5,
        productID: 32,
        quantity: 4,
      },
      {
        orderID: 7,
        productID: 4,
        quantity: 4,
      },
      {
        orderID: 5,
        productID: 34,
        quantity: 4,
      },
      {
        orderID: 4,
        productID: 2,
        quantity: 1,
      },
      {
        orderID: 6,
        productID: 37,
        quantity: 2,
      },
      {
        orderID: 5,
        productID: 18,
        quantity: 3,
      },
      {
        orderID: 7,
        productID: 13,
        quantity: 4,
      },
      {
        orderID: 6,
        productID: 27,
        quantity: 3,
      },
      {
        orderID: 5,
        productID: 12,
        quantity: 2,
      },
      {
        orderID: 8,
        productID: 16,
        quantity: 5,
      },
      {
        orderID: 2,
        productID: 19,
        quantity: 5,
      },
      {
        orderID: 4,
        productID: 35,
        quantity: 3,
      },
      {
        orderID: 6,
        productID: 24,
        quantity: 4,
      },
      {
        orderID: 6,
        productID: 38,
        quantity: 4,
      },
      {
        orderID: 4,
        productID: 11,
        quantity: 5,
      },
      {
        orderID: 4,
        productID: 27,
        quantity: 4,
      },
      {
        orderID: 6,
        productID: 14,
        quantity: 4,
      },
      {
        orderID: 3,
        productID: 21,
        quantity: 4,
      },
      {
        orderID: 5,
        productID: 8,
        quantity: 1,
      },
      {
        orderID: 3,
        productID: 32,
        quantity: 3,
      },
      {
        orderID: 1,
        productID: 22,
        quantity: 4,
      },
      {
        orderID: 2,
        productID: 36,
        quantity: 5,
      },
      {
        orderID: 5,
        productID: 31,
        quantity: 1,
      },
      {
        orderID: 6,
        productID: 16,
        quantity: 2,
      },
      {
        orderID: 2,
        productID: 40,
        quantity: 3,
      },
      {
        orderID: 1,
        productID: 20,
        quantity: 3,
      },
      {
        orderID: 7,
        productID: 10,
        quantity: 2,
      },
      {
        orderID: 5,
        productID: 2,
        quantity: 3,
      }
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete(ORDERS_PRODUCTS_TABLE, null);
  }
};