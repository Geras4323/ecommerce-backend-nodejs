const { Pool } = require('pg');
const { config } = require('../config');

const DB_USER = encodeURIComponent(config.dbUser);
const DB_PASSWORD = encodeURIComponent(config.dbPassword);

const URI = `postgres://${DB_USER}:${DB_PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const pool = new Pool({ connectionString: URI });


module.exports = pool;