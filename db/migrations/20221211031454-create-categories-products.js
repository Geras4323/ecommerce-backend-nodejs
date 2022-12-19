'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const { CATEGORY_TABLE } = require('../models/category.model');
const { PRODUCT_TABLE } = require('../models/product.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CATEGORY_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      image: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      }
    });

    await queryInterface.createTable(PRODUCT_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      price: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      isVisible: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
      CategoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        references: {
          model: CATEGORY_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable(CATEGORY_TABLE)
    await queryInterface.dropTable(PRODUCT_TABLE)
  }
};
