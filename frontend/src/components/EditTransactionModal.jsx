import { Modal, TextInput, Button, Select, NumberInput } from '@mantine/core';
import { useState } from 'react';

function EditTransactionModal({ opened, onClose, onSubmit, transaction }) {
    // Initialize state with default values or values from transaction if available
    const [editedTransaction, setEditedTransaction] = useState(() => {
      if (transaction) {
        return {
          name: transaction.name || '', 
          amount: (transaction.amount || '').toString(), 
          status: transaction.status || '', 
          date: transaction.date || '',
          transactionType: transaction.transactionType || '', // Add transactionType
        };
      } else {
        return {
          name: '', 
          amount: '', 
          status: '',  
          date: '',
          transactionType: '', // Add transactionType
        };
      }
    });
  
    const handleFormSubmit = (event) => {
        event.preventDefault();

        const amountAsNumber = parseFloat(editedTransaction.amount);
        onSubmit({ ...editedTransaction, id: transaction.id, amount: amountAsNumber }); // Include transaction ID
    };      

  return (
    <Modal title="Edit Transaction" opened={opened} onClose={onClose}>
      <form onSubmit={handleFormSubmit}>
        <TextInput
          label="Name"
          placeholder={"Name"}
          value={editedTransaction.name}
          onChange={(event) => setEditedTransaction({ ...editedTransaction, name: event.target.value })}
          required
        />
        <NumberInput
          label="Amount $"
          placeholder="Amount"
          decimalScale={2}
          fixedDecimalScale
          value={editedTransaction.amount} 
          onChange={(value) => setEditedTransaction({ ...editedTransaction, amount: value })}
          required
        />
        <Select
          label="Transaction Type"
          placeholder="Select a transaction type"
          data={[
            { value: 'Cash', label: 'Cash' },
            { value: 'Card', label: 'Card' },
            { value: 'Other', label: 'Other' },
            // Add more options as needed
          ]}
          value={editedTransaction.transactionType}
          onChange={(value) => setEditedTransaction({ ...editedTransaction, transactionType: value })} 
          required
        />
        <Select
          label="Status"
          placeholder="Status"
          data={[
            { value: 'Completed', label: 'Completed' },
            { value: 'Pending', label: 'Pending' },
            // Add more options as needed
          ]}
          value={editedTransaction.status}
          onChange={(value) => setEditedTransaction({ ...editedTransaction, status: value })} 
          required
        />
        <TextInput
          type="date"
          label="Date"
          placeholder="Date"
          value={editedTransaction.date}
          onChange={(event) => setEditedTransaction({ ...editedTransaction, date: event.target.value })}
          required
        />
        <br />
        <Button type="submit" variant="primary">Save Changes</Button>
      </form>
    </Modal>
  );
}

export default EditTransactionModal;

