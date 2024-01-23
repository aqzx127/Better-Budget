//import { useEffect } from 'react';
import { Paper } from '@mantine/core';
import Footer from '../components/Footer.jsx';
import Hero from '../components/Hero.jsx'
import Sidebar from '../components/Sidebar.jsx';
import '../index.css'
// import { useEffect } from 'react';
//import Profile from '../components/profile.jsx';

function MyProfile() {

  
  return (
    <>
      <div className="flex flex-col h-screen">
        <Hero />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className='flex-1 overflow-y-auto bg-[#F9EFDB] p-4'>
            <Paper shadow="sm" radius="md" p="lg" style={{ maxWidth: '768px', margin: 'auto' }}>
              <h1 className='text-center'>My Profile Page</h1>
            </Paper>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default MyProfile;