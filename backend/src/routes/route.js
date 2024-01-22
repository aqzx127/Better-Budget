// Routes Definitions 

const express = require('express');
const router = express.Router();
const userController = require('../controllers/controller');

router.post('/create', userController.createUser); // Create User Route

// Define other user routes here

module.exports = router;
