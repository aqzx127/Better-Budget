const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT,
  // additional settings like pool configuration
  pool: {
    max: 5, // maximum number of connections in pool
    min: 0, // minimum number of connections in pool
    acquire: 30000, // maximum time, in milliseconds, that a connection can be idle before being released
    idle: 10000 // maximum time, in milliseconds, that pool will try to get connection before throwing error
  }
//   dialectOptions: {
//     ssl: {
//       require: false,
//       rejectUnauthorized: false // for self-signed certificates
//     }
//   }
});

module.exports = sequelize;
