import { Modal, TextInput, Button, NumberInput } from '@mantine/core';
import { useState } from 'react';

function AddGoalModal({ opened, onClose, onSubmit }) {
  const [newGoal, setNewGoal] = useState({ 
    title: '', 
    amount: 0, // Or start with '0' if you prefer a string
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const amountAsNumber = parseFloat(newGoal.amount);
    onSubmit({ ...newGoal, amount: amountAsNumber }); 
  };

  return (
    <Modal title="Add New Goal" opened={opened} onClose={onClose}>
      <form onSubmit={handleFormSubmit}>
        <TextInput
          label="Goal Title"
          value={newGoal.title}
          onChange={(event) => setNewGoal({ ...newGoal, title: event.target.value })}
          required
        />
        <NumberInput
          label="Goal Amount $"
          decimalScale={2}
          fixedDecimalScale
          value={newGoal.amount.toString()} // Convert to string
          onChange={(value) => setNewGoal({ ...newGoal, amount: value })} // Parse float
          required
          // Add more options for precise input control if needed
        />
        <br />
        <Button type="submit" variant="primary">Save Goal</Button>
      </form>
    </Modal>
  );
}

export default AddGoalModal;