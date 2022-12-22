const { DataTypes, Model } = require('sequelize');

const { CATEGORIES_TABLE } = require('./category.model');
const { SUPPLIERS_TABLE } = require('./supplier.model');

const ProductSchema = {
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
}

const PRODUCTS_TABLE = 'products';

class Product extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCTS_TABLE,
      modelName: 'Product',
    }
  }
}

module.exports = { Product, ProductSchema, PRODUCTS_TABLE };