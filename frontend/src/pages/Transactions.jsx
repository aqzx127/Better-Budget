import { useState, useEffect } from 'react';
import { Paper, Table, Button, Tooltip, Pagination, Alert, Center, Group } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useAuth0 } from "@auth0/auth0-react";
import AddTransactionModal from "../components/AddTransactionModal";
import { useTransaction } from '../context/TransactionContext';
import { fetchUserTransactions, createUserTransaction, editUserTransaction, deleteUserTransaction } from '../utils/api';
import '../index.css';
import { format, parseISO } from 'date-fns';
import EditTransactionModal from '../components/EditTransactionModal'; // Import the edit modal component

function Transactions() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  //const [transactions, setTransactions] = useState([]);
  const { transactions, setTransactions, totalTransactions} = useTransaction();
  
  const [activePage, setActivePage] = useState(1);
  const [perPage] = useState(10);

  const { getAccessTokenSilently } = useAuth0();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertContent, setAlertContent] = useState('');

  const [editTransaction, setEditTransaction] = useState(null); // State to hold transaction data for editing
  const [deleteTransaction, setDeleteTransaction] = useState(null); 

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const token = await getAccessTokenSilently();
        const data = await fetchUserTransactions(token);

        //sort transactions by date
        data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setTransactions(data);
        console.log(totalTransactions);
      } catch (error) {
        console.error("Error fetching user transactions:", error.message);
      }
    };
    loadTransactions();
  }, [getAccessTokenSilently, setTransactions]);

  const startIndex = (activePage - 1) * perPage;
  const endIndex = startIndex + perPage;

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, 'MMM dd, yyyy');
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleAddTransaction = async (newTransaction) => {
    try {
      const token = await getAccessTokenSilently();
      newTransaction.amount = parseFloat(newTransaction.amount);
      createUserTransaction(token, newTransaction);
      setTransactions([...transactions, newTransaction]);
      setShowModal(false);
      setAlertVisible(true);
      setAlertContent('Transaction added successfully.');
    } catch (error) {
      console.error("Error adding new transaction:", error.message);
    }
  };

  const handleEditTransaction = async (editedTransaction) => {
    try {
      const token = await getAccessTokenSilently();
      const { id, ...transactionData } = editedTransaction; // Extract id and other transaction data
      await editUserTransaction(token, id, transactionData); // Pass id and transaction data to the API call
      // After editing the transaction, you might want to update the transactions list or show a success message
      setAlertVisible(true);
      setAlertContent('Transaction updated successfully.');
      // Close the edit modal
      setShowEditModal(false);
    } catch (error) {
      console.error("Error editing transaction:", error.message);
    }
  };

  const handleDeleteTransaction = async (deletedTransaction) => {
    try {
      const token = await getAccessTokenSilently();
      await deleteUserTransaction(token, deletedTransaction.id); // Pass the id of the transaction to be deleted
      // After deleting the transaction, update the transactions list by filtering out the deleted transaction
      setTransactions(transactions.filter(transaction => transaction.id !== deletedTransaction.id));
      setAlertVisible(true);
      setAlertContent('Transaction deleted successfully.');
      setShowDeleteAlert(false);
    } catch (error) {
      console.error("Error deleting transaction: ", error.message)
    }
  }  

  const handlePageChange = (newPage) => {
    setActivePage(newPage);
  };

  const renderTransactionRows = () => {
    if (transactions && transactions.length > 0) {
      const currentPageTransactions = transactions.slice(startIndex, endIndex);
      const emptyRows = perPage - currentPageTransactions.length;

      return (
        <>
          {currentPageTransactions.map((transaction, index) => (
            <Table.Tr key={index}>
              <Table.Td>{formatDate(transaction.date)}</Table.Td>
              <Table.Td>{transaction.name}</Table.Td>
              <Table.Td>{transaction.transactionType}</Table.Td>
              <Table.Td>{(transaction.amount)}$</Table.Td>
              <Table.Td>
                <span style={{ color: transaction.status === 'Completed' ? 'green' : 'orange' }}>
                  {transaction.status}
                </span>
              </Table.Td>
              <Group>
                {/* Pass transaction data to edit modal when button is clicked */}
                  <Tooltip label="Click to edit a Transaction" openDelay={100}>
                      <Button variant='outline' onClick={() => {
                        setShowEditModal(true);
                        setEditTransaction(transaction); 
                      }}>Edit</Button>
                  </Tooltip>
                  <Tooltip label="Click to delete a Transaction" openDelay={100}>
                      <Button variant='outline' onClick={() => {
                        setShowDeleteAlert(true);
                        setDeleteTransaction(transaction);
                      }}>Delete</Button>
                  </Tooltip>
              </Group>
            </Table.Tr>
          ))}
          {emptyRows > 0 &&
            Array.from({ length: emptyRows }).map((_, index) => (
              <Table.Tr key={currentPageTransactions.length + index} className='empty-row'>
                <Table.Td></Table.Td>
                <Table.Td></Table.Td>
                <Table.Td></Table.Td>
                <Table.Td></Table.Td>
              </Table.Tr>
            ))}
        </>
      );
    }
  };

  return (
    <>
      <Paper shadow="sm" radius="md" p="lg" style={{ maxWidth: '1268px', margin: 'auto' }}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-center">My Transactions</h1>
          <Button onClick={() => setShowModal(true)} variant="light" size="xs">
            <Tooltip label="Click to add a Transaction" openDelay={100}>
              <IconPlus />
            </Tooltip>
          </Button>
        </div>
        <br />
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Date</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{renderTransactionRows()}</Table.Tbody>
        </Table>
  
        <br />
        <br />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination total={Math.ceil(transactions.length / perPage)} value={activePage} onChange={handlePageChange} />
        </div>
      </Paper>
  
      {alertVisible && (
        <Center>
          <Alert
            title="Success"
            variant='filled'
            color="teal"
            withCloseButton
            onClose={() => setAlertVisible(false)}
            style={{ position: 'fixed', bottom: '120px', right: '20px', zIndex: 9999 }}
          >
            {alertContent}
          </Alert>
        </Center>
      )}

      {showDeleteAlert && (
        <Center>
          <Alert
            title="Delete Transaction"
            color="red"
            withCloseButton
            onClose={() => setShowDeleteAlert(false)}
            style={{ position: 'fixed', bottom: '120px', right: '20px', zIndex: 9999 }}
          >
            Are you sure you want to delete this transaction?
            <Button
              onClick={() => handleDeleteTransaction(deleteTransaction)}
              variant="outline"
              color="red"
              style={{ marginLeft: '10px' }}
            >
              Confirm Delete
            </Button>
          </Alert>
        </Center>
      )}

      <AddTransactionModal opened={showModal} onClose={handleModalClose} onSubmit={handleAddTransaction} />
      {/* Pass transaction data and modal state to edit modal */}
      <EditTransactionModal opened={showEditModal} onClose={handleEditModalClose} onSubmit={handleEditTransaction} transaction={editTransaction} />
    </>
  );
}

export default Transactions;







// Show income transactions in green, expenses in red.
// Show status of completed in green, and pending in orange
// Get better font and styling for the table