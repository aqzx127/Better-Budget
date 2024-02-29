const { DataTypes, UUIDV4 } = require('sequelize');
const User = require('../models/userModel');
const sequelize = require('../utils/db-config');

// Define Transaction Model
const Transaction = sequelize.define('transactions', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4, // Use UUIDV4 as the default
    allowNull: false
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  }, 
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2), // Adjust precision and scale as needed
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Pending', // Default status
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Default to current timestamp
  },
});

// Define associations
Transaction.belongsTo(User, { foreignKey: 'userId' }); // Assuming you have a User model defined

module.exports = Transaction;



/*

In this model:

# Each transaction has an id as a primary key, which auto-increments for each new transaction.
    - userId represents the user who initiated the transaction.
    - name is a descriptive name for the transaction.
    - amount stores the transaction amount.
    - status represents the status of the transaction (e.g., Pending, Completed, Failed).
    - date records the timestamp when the transaction occurred.

*/