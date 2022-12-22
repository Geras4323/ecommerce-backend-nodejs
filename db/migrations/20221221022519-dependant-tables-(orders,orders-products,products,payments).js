'use strict';

const { DataTypes } = require('sequelize');
const { ORDERS_TABLE } = require('../models/order.model');
const { PRODUCTS_TABLE } = require('../models/product.model');
const { ORDERS_PRODUCTS_TABLE } = require('../models/order-product.model');
const { PAYMENTS_TABLE } = require('../models/payment.model');

// references
const { USERS_TABLE } = require('../models/user.model');
const { CATEGORIES_TABLE } = require('../models/category.model');
const { SUPPLIERS_TABLE } = require('../models/supplier.model');


module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ORDERS_TABLE, {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      userID: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: USERS_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      total: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      }
    });

    await queryInterface.createTable(PRODUCTS_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      categoryID: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        references: {
          model: CATEGORIES_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      supplierID: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        references: {
          model: SUPPLIERS_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      image: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      price: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      active: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      }
    })

    await queryInterface.createTable(ORDERS_PRODUCTS_TABLE, {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      orderID: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: ORDERS_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      productID: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: PRODUCTS_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      }
    });

    await queryInterface.createTable(PAYMENTS_TABLE, {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      orderID: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: ORDERS_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      amount: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      }
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ORDERS_PRODUCTS_TABLE);
    await queryInterface.dropTable(PRODUCTS_TABLE);
    await queryInterface.dropTable(PAYMENTS_TABLE);
    await queryInterface.dropTable(ORDERS_TABLE);
  }
};
