const { Sequelize, DataTypes, Model } = require('sequelize');

const { CUSTOMER_TABLE } = require('./customer.model');

const OrderSchema = {
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
  // total: {
  //   type: DataTypes.VIRTUAL,
  //   get() {
  //     if (this.Products.length > 0) {
  //       return this.Products.reduce((total, product) => {
  //         return total + (product.price * product.OrderProduct.amount);
  //       }, 0)
  //     } else {
  //       return 0;
  //     }
  //   }
  // }
}

const ORDER_TABLE = 'orders';

class Order extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false,
    }
  }
}

module.exports = { Order, OrderSchema, ORDER_TABLE };