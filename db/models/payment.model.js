const { DataTypes, Model } = require('sequelize');

const { ORDERS_TABLE } = require('./order.model');

const PaymentSchema = {
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
  }
}

const PAYMENTS_TABLE = 'payments';

class Payment extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: PAYMENTS_TABLE,
      modelName: 'Payment',
    }
  }
}

module.exports = { Payment, PaymentSchema, PAYMENTS_TABLE }