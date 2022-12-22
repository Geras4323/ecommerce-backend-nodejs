const { DataTypes, Model } = require('sequelize');

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  first_name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  last_name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
    unique: true,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer',
  },
  active: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}

const USERS_TABLE = 'users';

class User extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: USERS_TABLE,
      modelName: 'User',
    }
  }
}

module.exports = { User, UserSchema, USERS_TABLE };