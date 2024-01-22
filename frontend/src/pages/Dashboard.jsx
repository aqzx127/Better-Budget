import { useEffect } from 'react';
import Footer from '../components/Footer.jsx';
import Hero from '../components/Hero.jsx'
import Sidebar from '../components/Sidebar.jsx';
import '../index.css'

function Dashboard() {

  const testBackend = () => {
    fetch('http://localhost:3001/api/test')  // Update with your backend server URL
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  };  

  useEffect(() => {
    testBackend();
  }, []);
  
  return (
    <>
     <div className="flex flex-col h-screen">
        <Hero />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className='flex-1 overflow-y-auto bg-[#F9EFDB]'>
            <h1>Lorem Ipsum</h1>
             (Main Content Here)
            </div>
          </div>
          <Footer />
        </div>
    </>
  )
}

export default Dashboard;

/* UI using Tailwind
<div className="flex flex-col h-screen">
        <Hero />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className='flex-1 overflow-y-auto bg-[#F9EFDB]'>
            <h1>Lorem Ipsum</h1>
             (Main Content Here)
            </div>
          </div>
          <Footer />
        </div>
*/