//import { useEffect } from 'react';
import { Paper } from '@mantine/core';
//import { useAuth } from '../context/authContext.jsx';
import '../index.css'
import { SwitchesCard } from '../components/SwitchesCard.jsx';
//import { useEffect } from 'react';
//import Profile from '../components/profile.jsx';

function Settings() {

  // const { toggleSidebar, isSidebarOpen, } = useAuth();
  
  return (
    <>
            <Paper shadow="sm" radius="md" p="lg" style={{ maxWidth: '768px', margin: 'auto' }}>
              <h1 className='text-center'>Settings Page</h1>
              <SwitchesCard />
            </Paper>
          {/* Users here manage all types of settings such as notifcations, bank connections, user acc info, ect. */}
    </>
  )
}

export default Settings;