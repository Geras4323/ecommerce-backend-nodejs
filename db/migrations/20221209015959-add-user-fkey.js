'use strict';

const { DataTypes } = require('sequelize');
const { CUSTOMER_TABLE } = require('../models/customer.model');
const { USER_TABLE } = require('../models/user.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(CUSTOMER_TABLE, 'UserId', {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: USER_TABLE,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(CUSTOMER_TABLE, 'UserId');
  }
};
