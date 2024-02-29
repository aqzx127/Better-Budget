// Test Routes

const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');
const jwtCheck = require('../middlewares/middleware');

router.get('/test', testController.test); // Unauthorized endpoint test

router.get('/authorized', jwtCheck, testController.authTest); // Authorized endpoint test


// Define other user routes here

module.exports = router;