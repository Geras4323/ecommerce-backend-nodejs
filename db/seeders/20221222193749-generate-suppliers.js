'use strict';

const { SUPPLIERS_TABLE } = require('../models/supplier.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert(SUPPLIERS_TABLE, [
      {
        name: "Electric Dictum Limited",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Clothes Mauris Limited",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bath Semper LLC",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Lights LLP",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Furniture Duis Incorporated",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete(SUPPLIERS_TABLE, null);
  }
};