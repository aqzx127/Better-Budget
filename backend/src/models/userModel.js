// Sequelize Data models for PostgreSQL to be used in Controllers to Query, Insert, Update, or Delete Data.
const { Sequelize } = require('sequelize');
const sequelize = require('../utils/db-config');


// Define User Model

const User = sequelize.define('users', {
  // Model attributes
  userId: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull:false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
  // add more attributes as needed
});

module.exports = User;


// Possible Future Data Models (Ensure Encryption)

// Transactions Table (Optional, if you plan to store transaction data)
  // transactionId (Primary Key): Unique identifier for the transaction.
  // accountId (Foreign Key): Links to the accountId in the BankAccounts table.
  // amount: Transaction amount.
  // transactionType: Type of transaction (e.g., deposit, withdrawal).
  // description: Brief description of the transaction.
  // date: Date of the transaction.