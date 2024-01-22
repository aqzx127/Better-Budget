// Business Logic is Applied to Requests
// Interact with Sequelize models to perform DB operations
// Send back a response (JSON, Status Codes)

const User = require('../models/model');

// Function to handle creating a new user
exports.createUser = (req, res) => {
    const { username, email } = req.body;
    User.create({ username, email })
        .then(user => res.json(user))
        .catch(error => res.status(400).json({ error: error.message }));
};

// Add other controller functions as needed