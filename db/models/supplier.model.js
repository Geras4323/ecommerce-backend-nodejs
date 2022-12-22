const { DataTypes, Model } = require('sequelize');

const SupplierSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
}

const SUPPLIERS_TABLE = 'suppliers';

class Supplier extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: SUPPLIERS_TABLE,
      modelName: 'Supplier',
    }
  }
}

module.exports = { Supplier, SupplierSchema, SUPPLIERS_TABLE };