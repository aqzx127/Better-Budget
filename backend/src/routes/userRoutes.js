// User Routes

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/create', userController.createUser); // Create User Route

// Define other user routes here

module.exports = router;
