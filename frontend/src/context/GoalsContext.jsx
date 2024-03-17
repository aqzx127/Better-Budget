import { createContext, useContext, useState } from 'react';

// Create the context
const GoalsContext = createContext();

// Custom hook to consume the context
export const useGoals = () => useContext(GoalsContext);

// GoalsProvider component to wrap around the application
export const GoalsProvider = ({ children }) => {
  // State to manage the list of goals
  const [goals, setGoals] = useState([]);

  // Function to add a new goal
  const addGoal = (newGoal) => {
    setGoals([...goals, newGoal]);
  };

  // Function to edit an existing goal
  const editGoal = (editedGoal) => {
    setGoals(goals.map((goal) => (goal.id === editedGoal.id ? editedGoal : goal)));
  };

  // Function to delete a goal
  const deleteGoal = (goalId) => {
    setGoals(goals.filter((goal) => goal.id !== goalId));
  };

  // Provide the context value to children components
  return ( 
    <GoalsContext.Provider value={{ goals, setGoals, addGoal, editGoal, deleteGoal }}>{children}</GoalsContext.Provider>
  )
};
