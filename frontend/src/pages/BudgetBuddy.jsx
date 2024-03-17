//import { useEffect } from 'react';
import { Paper } from '@mantine/core';
//import { useAuth } from '../context/authContext.jsx';
import '../index.css'
// import { useEffect } from 'react';
//import Profile from '../components/profile.jsx';

function BudgetBuddy() {

  // const { toggleSidebar, isSidebarOpen, } = useAuth();

  return (
    <>
      <Paper shadow="sm" radius="md" p="lg" style={{ maxWidth: '768px', margin: 'auto' }}>
        <h1 className='text-center'>BudgetBuddy AI Assistant Page</h1>
      </Paper>
      {/* Using Mantine comments, create chat system that interacts with Chat-GPT */}
    </>
  )
}

export default BudgetBuddy;

// Should be final page/function to be worked on.