//import { useEffect } from 'react';
import { Group, Paper } from '@mantine/core';
import Footer from '../components/Footer.jsx';
import Hero from '../components/Hero.jsx'
import Sidebar from '../components/Sidebar.jsx';
import '../index.css'
import { IconPigMoney } from '@tabler/icons-react';
import { FeaturesCards } from '../components/FeaturesCards.jsx';
import { useState } from 'react';
// import { useEffect } from 'react';
//import Profile from '../components/profile.jsx';

function Home() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };



    return (
        <>
        <div className="flex flex-col h-screen">
            <Hero onToggleSidebar={toggleSidebar}/>
            <div className="flex flex-1 overflow-hidden">
            {isSidebarOpen && <Sidebar />}
            <div className='flex-1 overflow-y-auto bg-[#F9EFDB] p-4'>
                <Paper shadow="sm" radius="md" p="lg" style={{ maxWidth: '768px', margin: 'auto' }}>
                    <div className="flex flex-col items-center justify-center">
                        <IconPigMoney className="cursor-pointer" />
                        <h1 className='text-center font-bold text-xl'>Better Budget</h1>
                    </div>
                    <FeaturesCards />
                </Paper>
            </div>
            </div>
            <Footer />
        </div>
        </>
    )
    }

export default Home;