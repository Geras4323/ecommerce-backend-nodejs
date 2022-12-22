const { DataTypes, Model } = require('sequelize');

const CategorySchema = {
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
  active: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}

const CATEGORIES_TABLE = 'categories';

class Category extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORIES_TABLE,
      modelName: 'Category',
    }
  }
}

module.exports = { Category, CategorySchema, CATEGORIES_TABLE };