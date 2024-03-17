//import { useEffect } from 'react';
import { Paper } from '@mantine/core';
//import { useAuth } from '../context/authContext.jsx';
import '../index.css'
import { ContactFormSimple } from '../components/ContactFormSimple.jsx';
// import { useEffect } from 'react';
//import Profile from '../components/profile.jsx';

function Contact() {

    // const { toggleSidebar, isSidebarOpen } = useAuth();

    return (
        <>
            <Paper shadow="sm" radius="md" p="lg" style={{ maxWidth: '768px', margin: 'auto' }}>
                <h1 className='text-center'>Contact Us Page</h1>
                <ContactFormSimple />
            </Paper>
        </>
    )
    }

    export default Contact;

    // Goals for this page is to just send a POST request to server with the form data as body to be stored in postgreSQL.