import { useState, useEffect } from 'react';
import { Divider, Paper, Table, Button, Tooltip, Pagination, Alert, Center } from '@mantine/core'; // Import Center component for positioning
import { IconPlus } from '@tabler/icons-react';
import { useAuth0 } from "@auth0/auth0-react";
import AddTransactionModal from "../components/AddTransactionModal";
import { fetchUserTransactions, createUserTransaction } from '../utils/api';
import '../index.css';
import { format, parseISO } from 'date-fns'; // Import date-fns for formatting

function Transactions() {
  const [showModal, setShowModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [perPage] = useState(10); // Number of transactions per page

  const { getAccessTokenSilently } = useAuth0();
  
  const [alertVisible, setAlertVisible] = useState(false); // State variable for alert visibility
  const [alertContent, setAlertContent] = useState(''); // State variable for alert content

  const formatDate = (dateString) => {
    const date = parseISO(dateString); // Parse the date
    return format(date, 'yyyy-MM-dd'); // Format as desired
  };

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const token = await getAccessTokenSilently();
        const data = await fetchUserTransactions(token);
        console.log(data); // This will log the fetched data
        setTransactions(data); // Set the transactions state
      } catch (error) {
        console.error("Error fetching user transactions:", error.message);
      }
    };
  
    loadTransactions();
  }, [getAccessTokenSilently]);

  // Calculate the start and end indexes of the transactions for the current page
  const startIndex = (activePage - 1) * perPage;
  const endIndex = startIndex + perPage;

  let rows = null;
  if (transactions && transactions.length > 0) {
    // Filter transactions based on the current page
    const currentPageTransactions = transactions.slice(startIndex, endIndex);

    const emptyRows = perPage - currentPageTransactions.length;

    rows = (
      <>
        {currentPageTransactions.map((transaction, index) => (
          <Table.Tr key={index}>
            <Table.Td>{transaction.name}</Table.Td>
            <Table.Td>{transaction.amount}$</Table.Td>
            <Table.Td>
              <span style={{ color: transaction.status === 'Completed' ? 'green' : 'orange' }}>
                {transaction.status}
              </span>
            </Table.Td>
            <Table.Td>{formatDate(transaction.date)}</Table.Td>
          </Table.Tr>
        ))}
        {emptyRows > 0 &&
          Array.from({ length: emptyRows }).map((_, index) => (
            <Table.Tr key={currentPageTransactions.length + index} className='empty-row'>
              {/* Render empty cells as placeholders */}
              <Table.Td></Table.Td>
              <Table.Td></Table.Td>
              <Table.Td></Table.Td>
              <Table.Td></Table.Td>
            </Table.Tr>
          ))}
      </>
    );
  }

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleAddTransaction = async (newTransaction) => {
    try {
      const token = await getAccessTokenSilently();
      // Call backend API to save new transaction data
      console.log('New Transaction:', newTransaction);
  
      // Convert the amount to a number before adding to transactions
      newTransaction.amount = parseFloat(newTransaction.amount);
  
      createUserTransaction(token, newTransaction);
      // Update the UI with the newly created transaction
      setTransactions([...transactions, newTransaction]);
      setShowModal(false);
      setAlertVisible(true); // Show the alert
      setAlertContent('Transaction added successfully.'); // Set the alert content

    } catch (error) {
      console.error("Error adding new transaction:", error.message);
    }
  };

  const handlePageChange = (newPage) => {
    setActivePage(newPage);
  };

  return (
    <>
      <Paper shadow="sm" radius="md" p="lg" style={{ maxWidth: '768px', margin: 'auto' }}>
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
              <Table.Th>Item</Table.Th>
              <Table.Th>Amount $</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Date</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
  
        <br />
        <br />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination total={Math.ceil(transactions.length / perPage)} value={activePage} onChange={handlePageChange} />
        </div>
      </Paper>
  
      {/* Alert for transaction success */}
      {alertVisible && (
        <Center>
          <Alert
            title="Success"
            variant='filled'
            color="teal"
            withCloseButton
            onClose={() => setAlertVisible(false)}
            style={{ position: 'fixed', bottom: '120px', right: '20px', zIndex: 9999 }} // Position fixed and z-index to overlay everything
          >
            {alertContent}
          </Alert>
        </Center>
      )}

      {/* Modal for adding new transaction */}
      <AddTransactionModal opened={showModal} onClose={handleModalClose} onSubmit={handleAddTransaction} />
    </>
  );
}

export default Transactions;






// Show income transactions in green, expenses in red.
// Show status of completed in green, and pending in orange
// Get better font and styling for the table