'use strict';

const { CATEGORIES_TABLE } = require('../models/category.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert(CATEGORIES_TABLE, [
      {
        name: "Electronics",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Clothes",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bath",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Lighting",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Furniture",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete(CATEGORIES_TABLE, null);
  }
};