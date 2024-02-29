import { useState, useEffect } from 'react';
import { Divider, Paper, Table, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useAuth0 } from "@auth0/auth0-react";
import AddTransactionModal from "../components/AddTransactionModal";
import { fetchUserTransactions, createUserTransaction } from '../utils/api';
import '../index.css';

function Transactions() {
  const [showModal, setShowModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const token = await getAccessTokenSilently();
        const data = await fetchUserTransactions(token);
        console.log(data); // This will log the fetched data
        setTransactions(data); // Uncomment this line if you want to set the transactions state
      } catch (error) {
        console.error("Error fetching user transactions:", error.message);
      }
    };
  
    loadTransactions();
  }, [getAccessTokenSilently]);
  

  let rows = null;
  if (transactions && transactions.length > 0) {
    rows = transactions.map((transaction, index) => (
      <Table.Tr key={index}>
        <Table.Td>{transaction.name}</Table.Td>
        <Table.Td>${transaction.amount}</Table.Td>
        <Table.Td>{transaction.status}</Table.Td>
        <Table.Td>{transaction.date}</Table.Td>
      </Table.Tr>
    ));
  }

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleAddTransaction = async (newTransaction) => {
    try {
      const token = await getAccessTokenSilently();
      console.log(token);
      // Call backend API to save new transaction data
      console.log('New Transaction:', newTransaction);
      createUserTransaction(token, newTransaction)
      // Update the UI with the newly created transaction
      setTransactions([...transactions, newTransaction]);
      setShowModal(false);
    } catch (error) {
      console.error("Error adding new transaction:", error.message);
    }
  };

  return (
    <>
      <Paper shadow="sm" radius="md" p="lg" style={{ maxWidth: '768px', margin: 'auto' }}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-center">Transaction Page</h1>
          <Button onClick={() => setShowModal(true)} variant="light" size="xs">
            <IconPlus />
          </Button>
        </div>
        <Divider ml="sm" />
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Amount $</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Date</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>

      {/* Modal for adding new transaction */}
      <AddTransactionModal opened={showModal} onClose={handleModalClose} onSubmit={handleAddTransaction} />
    </>
  );
}

export default Transactions;





// Show income transactions in green, expenses in red.
// Show status of completed in green, and pending in orange
// Get better font and styling for the table