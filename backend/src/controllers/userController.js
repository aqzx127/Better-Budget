// User Controller (Main Business Logic)

const User = require('../models/userModel'); // Import Data Model

// Function to handle creating a new user
exports.createUser = (req, res) => {
    const { userId, email, name } = req.body;
    User.create({ userId, email, name })
        .then(user => res.json(user))
        .catch(error => res.status(400).json({ error: error.message }));
};

// Add other controller functions as needed

