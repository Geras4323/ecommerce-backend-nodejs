const { DataTypes, Model } = require('sequelize');

const { ORDERS_TABLE } = require('./order.model');
const { PRODUCTS_TABLE } = require('./product.model');

const OrderProductSchema = {
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
}

const ORDERS_PRODUCTS_TABLE = 'orders-products'

class OrderProduct extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDERS_PRODUCTS_TABLE,
      modelName: 'OrderProduct',
      timestamps: false,
    }
  }
}

module.exports = { OrderProduct, OrderProductSchema, ORDERS_PRODUCTS_TABLE };