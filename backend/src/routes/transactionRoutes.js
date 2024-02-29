// Transaction Routes

const express = require('express');
const router = express.Router();
const jwtCheck = require('../middlewares/middleware');
const transactionController = require('../controllers/transactionController');


router.post('/create', jwtCheck, transactionController.createTransaction); // Create Transaction in PostgreSQL

router.get('/view', jwtCheck, transactionController.getUserTransactions); // Fetch Transactions from PostgreSQL

router.put('/edit', jwtCheck, transactionController.updateTransaction); // Edit Transaction

router.delete('/delete', jwtCheck, transactionController.deleteTransaction); // Delete Transaction

// Define other transaction routes here

module.exports = router;