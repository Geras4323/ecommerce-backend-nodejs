const { Sequelize, DataTypes, Model } = require('sequelize');

const { CATEGORY_TABLE } = require('./category.model');

const ProductSchema = {
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
}

const PRODUCT_TABLE = 'products';

class Product extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false,
    }
  }
}

module.exports = { Product, ProductSchema, PRODUCT_TABLE };