import { Modal, TextInput, Button } from '@mantine/core';
import { useState } from 'react';

function AddTransactionModal({ opened, onClose, onSubmit }) {
  const [newTransaction, setNewTransaction] = useState({ name: '', amount: '', status: '', date: '' });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit(newTransaction);
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
        <TextInput
          type="number"
          label="Amount $"
          value={newTransaction.amount}
          onChange={(event) => setNewTransaction({ ...newTransaction, amount: event.target.value })}
          required
        />
        <TextInput
          label="Status"
          value={newTransaction.status}
          onChange={(event) => setNewTransaction({ ...newTransaction, status: event.target.value })}
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
