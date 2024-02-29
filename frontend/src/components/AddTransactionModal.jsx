import { Modal, TextInput, Button, Select, NumberInput } from '@mantine/core';
import { useState } from 'react';

function AddTransactionModal({ opened, onClose, onSubmit }) {
  const [newTransaction, setNewTransaction] = useState({ 
    name: '', 
    amount: 0, // Or start with '0' if you prefer a string
    status: '',  
    date: '' 
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const amountAsNumber = parseFloat(newTransaction.amount);
    onSubmit({ ...newTransaction, amount: amountAsNumber }); 
};

  return (
    <Modal title="Add New Transaction" opened={opened} onClose={onClose}>
      <form onSubmit={handleFormSubmit}>
        <TextInput
          label="Name"
          value={newTransaction.name}
          onChange={(event) => setNewTransaction({ ...newTransaction, name: event.target.value })}
          required
        />
        <NumberInput
          label="Amount $"
          decimalScale={2}
          fixedDecimalScale
          value={newTransaction.amount.toString()} // Convert to string
          onChange={(event) => setNewTransaction({ ...newTransaction, amount: parseFloat(event) })} // Parse float
          required
          // Add more options for precise input control if needed
        />
        <Select
          label="Status"
          placeholder="Select a status"
          data={[
            { value: 'Completed', label: 'Completed' },
            { value: 'Pending', label: 'Pending' },
            // Add more options as needed
          ]}
          value={newTransaction.status}
          onChange={(value) => setNewTransaction({ ...newTransaction, status: value })} 
          required
        />
        <TextInput
          type="date"
          label="Date"
          value={newTransaction.date}
          onChange={(event) => setNewTransaction({ ...newTransaction, date: event.target.value })}
          required
        />
        <br />
        <Button type="submit" variant="primary">Save Transaction</Button>
      </form>
    </Modal>
  );
}

export default AddTransactionModal;

