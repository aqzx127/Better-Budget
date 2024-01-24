//import { useEffect } from 'react';
import { Paper } from '@mantine/core';
//import { useAuth } from '../context/authContext.jsx';
import '../index.css'
// import { useEffect } from 'react';
//import Profile from '../components/profile.jsx';

function Goals() {

  // const { toggleSidebar, isSidebarOpen, } = useAuth();
  
  return (
    <>
            <Paper shadow="sm" radius="md" p="lg" style={{ maxWidth: '768px', margin: 'auto' }}>
              <h1 className='text-center'>My Goals Page</h1>
            </Paper>
            {/* Goals Section with in depth view of current goals, user is able to create goals here as well */}
    </>
  )
}

export default Goals;