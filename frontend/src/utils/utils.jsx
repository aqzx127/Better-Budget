export const calculateTotalTransactions = (transactions) => {
    return transactions.reduce((total, transaction) => total + parseFloat(transaction.amount), 0);
};