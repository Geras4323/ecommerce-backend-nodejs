require('dotenv').config();
const { URI } = require('../config/config');

const productionURI = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`

module.exports = {
  development: {
    url: URI,
    dialect: 'postgres',
    seederStorage: 'sequelize',
  },
  production: {
    url: productionURI,
    dialect: 'postgres',
    seederStorage: 'sequelize',
  }
}