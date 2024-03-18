import { useState, useEffect } from 'react';
import { Paper, Button, Tooltip, Alert, Center, Group, Progress } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import AddGoalModal from '../components/AddGoalModal'; // Import the AddGoalModal component
import { useAuth0 } from "@auth0/auth0-react";
import { useGoals } from '../context/GoalsContext'; // Import the useGoal hook for managing goals
import { createUserGoal, fetchUserGoals, deleteUserGoal, updateGoalProgress } from '../utils/api'; // Import API functions for managing goals
import { useTransaction } from '../context/TransactionContext';
import '../index.css';

function Goals() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [deleteGoal, setDeleteGoal] = useState(null); 
  //const [goalProgress, setGoalProgress] = useState('');

  const { totalTransactions } = useTransaction();

  const { getAccessTokenSilently } = useAuth0();
  const { goals, setGoals } = useGoals(); // Use the goals context and hook

  useEffect(() => {
    const loadGoals = async () => {
      try {
        const token = await getAccessTokenSilently();
        const data = await fetchUserGoals(token);
        console.log(data);
        // const newData = data[0].amount;
        // console.log(parseInt(newData).toLocaleString());
        setGoals(data || []);
        console.log(goals);
      } catch (error) {
        console.error("Error fetching user goals:", error.message);
      }
    };
    loadGoals();
  }, [getAccessTokenSilently, setGoals]);

  const handleAddGoal = async (newGoal) => {
    try {
      const token = await getAccessTokenSilently();
      createUserGoal(token, newGoal);
      setGoals([...goals, newGoal]);
      setShowAddModal(false);
      setAlertVisible(true);
      setAlertContent('Goal added successfully.');
    } catch (error) {
      console.error("Error adding new goal:", error.message);
    }
  };

  const handleUpdateGoalProgress = async (goalId, progressToAdd) => {
    try {
      const token = await getAccessTokenSilently();
      console.log(progressToAdd);
      //console.log(goalProgress);
      //const updatedProgress = parseInt(goalProgress) + parseInt(progressToAdd); // Add progressToAdd to the current goal progress
      //console.log(updatedProgress);
      await updateGoalProgress(token, goalId, progressToAdd);
      
      // Update the goal locally in the state
      const updatedGoals = goals.map(goal => {
        if (goal.id === goalId) {
          return { ...goal, progress: progressToAdd || 0 };
        } else {
          return goal;
        }
      });
      setGoals(updatedGoals);
    } catch (error) {
      console.error("Error updating goal progress:", error.message);
    }
  }  

  const handleDeleteGoal = async () => {
    try {
      const token = await getAccessTokenSilently();
      await deleteUserGoal(token, deleteGoal.id);
      setGoals(goals.filter(goal => goal.id !== deleteGoal.id));
      setAlertVisible(true);
      setAlertContent('Goal deleted successfully.');
      setShowDeleteAlert(false);
    } catch (error) {
      console.error("Error deleting goal:", error.message);
    }
  };

  const renderGoalRows = () => {
    if (goals && goals.length > 0) {
      return goals.map(goal => (
        <Paper key={goal.id} shadow="sm" radius="md" p="lg" className="mb-4">
          <h2>{goal.title}</h2>
          <p>Saved ${parseInt(goal.progress).toLocaleString()} / ${parseInt(goal.amount).toLocaleString()}</p>
          <Progress value={(goal.progress / goal.amount) * 100} />
          <br />
          <Group>
          <Button onClick={() => {
            const progressToAdd = prompt('Enter the amount to add to goal progress:');
            if (progressToAdd !== null && !isNaN(progressToAdd) && parseInt(progressToAdd) > 0) {
              handleUpdateGoalProgress(goal.id, progressToAdd);
            }
          }}>Add Progress to Goal</Button>
            <Button onClick={() => {
              setShowDeleteAlert(true);
              setDeleteGoal(goal);
            }}>Delete</Button>
          </Group>
        </Paper>
      ));
    }
  };

  return (
    <>
      <Paper shadow="sm" radius="md" p="lg" style={{ maxWidth: '768px', margin: 'auto' }}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-center">My Goals</h1>
          <Button onClick={() => setShowAddModal(true)} variant="light" size="xs">
            <Tooltip label="Add a Goal">
              <IconPlus />
            </Tooltip>
          </Button>
        </div>
        {renderGoalRows()}
      </Paper>

      <AddGoalModal opened={showAddModal} onClose={() => setShowAddModal(false)} onSubmit={handleAddGoal} />
      {/* <EditGoalModal opened={showEditModal} onClose={() => setShowEditModal(false)} onSubmit={handleEditGoal} goal={editGoal} /> */}
      
      {showDeleteAlert && (
        <Center>
          <Alert
            title="Delete Goal"
            color="red"
            withCloseButton
            onClose={() => setShowDeleteAlert(false)}
            style={{ position: 'fixed', bottom: '120px', right: '20px', zIndex: 9999 }}
          >
            Are you sure you want to delete this goal?
            <Button
              onClick={handleDeleteGoal}
              variant="outline"
              color="red"
              style={{ marginLeft: '10px' }}
            >
              Confirm Delete
            </Button>
          </Alert>
        </Center>
      )}

      {alertVisible && (
        <Center>
          <Alert
            title="Success"
            variant="filled"
            color="teal"
            withCloseButton
            onClose={() => setAlertVisible(false)}
            style={{ position: 'fixed', bottom: '120px', right: '20px', zIndex: 9999 }}
          >
            {alertContent}
          </Alert>
        </Center>
      )}
    </>
  );
}

export default Goals;
