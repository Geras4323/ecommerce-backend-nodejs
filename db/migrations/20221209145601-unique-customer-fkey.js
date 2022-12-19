'use strict';

const { DataTypes } = require('sequelize');
const { CUSTOMER_TABLE } = require('../models/customer.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'UserId', {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'UserId', {
      allowNull: false,
      type: DataTypes.INTEGER,
    })
  }
};