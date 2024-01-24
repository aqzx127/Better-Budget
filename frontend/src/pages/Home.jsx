import { Paper } from '@mantine/core';
import '../index.css';
import { IconPigMoney } from '@tabler/icons-react';
import { FeaturesCards } from '../components/FeaturesCards.jsx';
//import { useAuth } from '../context/authContext.jsx';

function Home() {

    // const { toggleSidebar, isSidebarOpen, } = useAuth();

    return (
        <>
            <Paper shadow="sm" radius="md" p="lg" style={{ maxWidth: '768px', margin: 'auto' }}>
                <div className="flex flex-col items-center justify-center">
                    <IconPigMoney className="cursor-pointer" />
                    <h1 className='text-center font-bold text-xl'>Better Budget</h1>
                </div>
                <FeaturesCards />
            </Paper>
        </>
    );
}

export default Home;
