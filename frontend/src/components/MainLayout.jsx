import { motion } from 'framer-motion';
import { useAuth } from '../context/authContext';
import Hero from './Hero';
import Sidebar from './Sidebar';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  const { isSidebarOpen, toggleSidebar } = useAuth();

  const sidebarVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring', stiffness: 70, damping: 20
      },
    },
    closed: {
      x: '-100%', // Update as needed
      opacity: 0,
      transition: { 
        type: 'spring', stiffness: 70, damping: 20 
      },
    },
  };

  return (
    <div className="flex flex-col h-screen">
      <Hero onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="flex flex-1 overflow-hidden">
        <motion.div
          className="flex flex-col h-screen"
          variants={sidebarVariants}
          initial="closed"
          animate={isSidebarOpen ? "open" : "closed"}
        >
          {isSidebarOpen && <Sidebar />}
        </motion.div>
        <div className="flex-1 overflow-y-auto bg-[#F9EFDB] p-4">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
