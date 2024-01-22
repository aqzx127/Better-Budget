// Sequelize Data models for PostgreSQL to be used in Controllers to Query, Insert, Update, or Delete Data.
const { Sequelize } = require('sequelize');
const sequelize = require('../utils/db-config');


// Model Example

const User = sequelize.define('user', {
  // Model attributes
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  // add more attributes as needed
});

module.exports = User;
