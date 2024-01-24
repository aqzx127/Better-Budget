//import { useEffect } from 'react';
import { Paper } from '@mantine/core';
//import { useAuth } from '../context/authContext.jsx';
import '../index.css'
// import { useEffect } from 'react';
//import Profile from '../components/profile.jsx';

function Privacy() {

    // const { toggleSidebar, isSidebarOpen, } = useAuth();

    return (
        <>
                <Paper shadow="sm" radius="md" p="lg" style={{ maxWidth: '768px', margin: 'auto' }}>
                <h1 className='text-center'>Privacy Page</h1>
                </Paper>
        </>
    )
    }

    export default Privacy;