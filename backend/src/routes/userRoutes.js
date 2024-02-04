// User Routes

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/create', userController.createUser); // Create User in PostgreSQL

router.get('/:userId', userController.getUser); // Fetch User from PostgreSQL

router.put('/:userId', userController.updateUser); // Update User info into PostgreSQL

//router.get('/check-profile/:userId', userController.checkProfileCompletion); // Check Profile Completion from PostgreSQL


// Define other user routes here

module.exports = router;
