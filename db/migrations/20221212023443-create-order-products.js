'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const { ORDER_PRODUCT_TABLE } = require('../models/order-product.model');
const { ORDER_TABLE } = require('../models/order.model');
const { PRODUCT_TABLE } = require('../models/product.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      OrderId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: ORDER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      ProductId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: PRODUCT_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      amount: {
        allowNull: false,
        type: DataTypes.INTEGER,
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
  }
};
