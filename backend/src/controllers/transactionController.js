const Transaction = require('../models/transactionModel');

exports.createTransaction = (req, res) => {
    const { name, amount, status, date } = req.body;
    console.log(req.auth);
    const userId = req.auth.payload['https://myapp.example.com/userId']; // Retrieve userId from req.user
    console.log(userId);
    Transaction.create({ userId, name, amount, status, date })
        .then(transaction => res.json(transaction))
        .catch(error => res.status(400).json({ error: error.message }));
}

exports.getUserTransactions = (req, res) => {
    const userId = req.auth.payload['https://myapp.example.com/userId'];
    Transaction.findAll({ where: { userId } })
        .then(transactions => res.json(transactions))
        .catch(error => res.status(400).json({ error: error.message }));
};

exports.updateTransaction = (req, res) => {
    const { userId, name, amount, status, date } = req.body;
    Transaction.update({ userId, name, amount, status, date }, { where: { id } })
        .then(() => res.json({ message: 'Transaction updated successfully' }))
        .catch(error => res.status(400).json({ error: error.message }));
};

exports.deleteTransaction = (req, res) => {
    const userId = req.params.userId;
    Transaction.destroy({ where: { id } })
        .then(() => res.json({ message: 'Transaction deleted successfully' }))
        .catch(error => res.status(400).json({ error: error.message }));
};
