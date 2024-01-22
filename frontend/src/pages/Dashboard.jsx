//import { useEffect } from 'react';
import Footer from '../components/Footer.jsx';
import Hero from '../components/Hero.jsx'
import Sidebar from '../components/Sidebar.jsx';
import LoginButton from '../components/loginbutton.jsx';
import LogoutButton from '../components/logoutbutton.jsx';
import '../index.css'
// import { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
//import Profile from '../components/profile.jsx';

function Dashboard() {

  const { getAccessTokenSilently } = useAuth0();

  const testBackend = () => {
    fetch('http://localhost:3001/api/test')  // Update with your backend server URL
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  };

  const testAuth = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log(token);
      const response = await fetch('http://localhost:3001/api/authorized', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  // const authTest = async () => {
  //   const token = await getAccessTokenSilently();
  //   fetch('http://localhost:3001/api/authorized', {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
    
  //   console.log(response.json());
  //   console.log()
  // };

  
  return (
    <>
     <div className="flex flex-col h-screen">
        <Hero />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className='flex-1 overflow-y-auto bg-[#F9EFDB]'>
            <h1>Lorem Ipsum</h1>
            <LoginButton /> <br />
            <LogoutButton /> <br />
            <button onClick={testBackend}>Regular User Test</button> <br />
            <button onClick={testAuth}>Auth User Test</button>
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