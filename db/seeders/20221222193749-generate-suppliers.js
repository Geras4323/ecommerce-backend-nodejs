'use strict';

const { SUPPLIERS_TABLE } = require('../models/supplier.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert(SUPPLIERS_TABLE, [
      {
        name: "Eget Dictum Limited",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Vitae Mauris Limited",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ut Semper LLC",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Nunc LLP",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Egestas Duis Incorporated",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete(SUPPLIERS_TABLE, null);
  }
};