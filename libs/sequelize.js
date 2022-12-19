const { Sequelize } = require('sequelize');

const { URI } = require('../config/config');
const { setupModels } = require('../db/models/index');

// URI changes according to whether the server is running on local or on cloud
const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: false,
})

setupModels(sequelize);

module.exports = sequelize;