//import { useEffect } from 'react';
import { Paper } from '@mantine/core';
//import { useAuth } from '../context/authContext.jsx';
import '../index.css'
import { FaqSimple } from '../components/FaqSimple.jsx';
// import { useEffect } from 'react';
//import Profile from '../components/profile.jsx';

function FAQ() {

    // const { toggleSidebar, isSidebarOpen, } = useAuth();

    return (
        <>
            <Paper shadow="sm" radius="md" p="lg" style={{ maxWidth: '768px', margin: 'auto' }}>
                <FaqSimple />
            </Paper>
        </>
    )
    }

export default FAQ;