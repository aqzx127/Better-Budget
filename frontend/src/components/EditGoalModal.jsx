import { Modal, TextInput, Button, NumberInput } from '@mantine/core';
import { useState } from 'react';

function EditGoalModal({ opened, onClose, onSubmit, goal }) {
    // Initialize state with default values or values from goal if available
    const [editedGoal, setEditedGoal] = useState(() => {
      if (goal) {
        return {
          title: goal.title || '', 
          amount: (goal.amount || '').toString(), 
        };
      } else {
        return {
          title: '', 
          amount: '', 
        };
      }
    });
  
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const amountAsNumber = parseFloat(editedGoal.amount);
        onSubmit({ ...editedGoal, id: goal.id, amount: amountAsNumber }); // Include goal ID
    };      

  return (
    <Modal title="Edit Goal" opened={opened} onClose={onClose}>
      <form onSubmit={handleFormSubmit}>
        <TextInput
          label="Goal Title"
          value={editedGoal.title}
          onChange={(event) => setEditedGoal({ ...editedGoal, title: event.target.value })}
          required
        />
        <NumberInput
          label="Goal Amount $"
          decimalScale={2}
          fixedDecimalScale
          value={editedGoal.amount} 
          onChange={(value) => setEditedGoal({ ...editedGoal, amount: value })}
          required
        />
        <br />
        <Button type="submit" variant="primary">Save Changes</Button>
      </form>
    </Modal>
  );
}

export default EditGoalModal;