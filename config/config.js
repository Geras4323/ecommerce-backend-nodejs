require('dotenv').config();

const config = {
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
}

let URI;
if (process.env.DATABASE_URL) {   // production (cloud)
  URI = process.env.DATABASE_URL;
} else {                          // development (local)
  const encodedDbUser = encodeURIComponent(config.dbUser);
  const encodedDbPassword = encodeURIComponent(config.dbPassword);
  URI = `postgresql://${encodedDbUser}:${encodedDbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
}

module.exports = { URI }