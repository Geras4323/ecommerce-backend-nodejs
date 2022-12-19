'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const { ORDER_TABLE } = require('../models/order.model');
const { CUSTOMER_TABLE } = require('../models/customer.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ORDER_TABLE, {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      payed: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      CustomerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: CUSTOMER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ORDER_TABLE);
  }
};