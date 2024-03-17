// Sequelize Data models for PostgreSQL to be used in Controllers to Query, Insert, Update, or Delete Data.
const { Sequelize } = require('sequelize');
const sequelize = require('../utils/db-config');


// Define Goal Model

const Goal = sequelize.define('goals', {
  // Model attributes
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4, // Use UUIDV4 as the default
    allowNull: false
  },
  userId: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },  
  amount: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  }
  // add more attributes as needed
});

module.exports = Goal;