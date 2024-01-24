import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, } from 'react-router-dom';
import './index.css';
import Transactions from "./pages/Transactions";
import BudgetBuddy from "./pages/BudgetBuddy";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";
import Goals from "./pages/Goals";
import MyProfile from "./pages/MyProfile";
import Home from "./pages/Home";


function App() {

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    setIsLoggedIn(token !== null && token !== '');
    async function fetchAndStoreToken() {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          // Store the token in local storage or context
          localStorage.setItem('jwt', token);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Error fetching access token", error);
          setIsLoggedIn(false);
        }
      } else {
        localStorage.removeItem('jwt');
        setIsLoggedIn(false);
      }
    }

    fetchAndStoreToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/assistant" element={<BudgetBuddy />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/profile" element={<MyProfile/>} />
        <Route path="/settings" element={<Settings />} />
        {/* More Routes Here */}
      </Routes>
    </Router>
    </>
  )
}

export default App;
