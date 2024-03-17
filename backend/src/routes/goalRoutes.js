// Goal Routes

const express = require('express');
const router = express.Router();
const jwtCheck = require('../middlewares/middleware');
const goalController = require('../controllers/goalController');

router.post('/create', jwtCheck, goalController.createUserGoal); // Create Goal in PostgreSQL

router.get('/view', jwtCheck, goalController.fetchUserGoals); // Fetch Goals from PostgreSQL

//router.put('/update/:id', jwtCheck, transactionController.updateTransaction); // Edit Goal

//router.delete('/delete/:id', jwtCheck, transactionController.deleteTransaction); // Delete Goal


// Define other user routes here

module.exports = router;
