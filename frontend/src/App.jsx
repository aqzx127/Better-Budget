import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import BudgetBuddy from "./pages/BudgetBuddy";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";
import Goals from "./pages/Goals";
import MyProfile from "./pages/MyProfile";
import Home from "./pages/Home";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import MainLayout from "./components/MainLayout";

function App() {

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  // Fetch and Store users JWT in localStorage to persist session upon revisit (assuming token is not expired).
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    setIsLoggedIn(token !== null && token !== '');
    async function fetchAndStoreToken() {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          // Store the token in local storage
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
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/assistant" element={<BudgetBuddy />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/profile" element={<MyProfile/>} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact-us" element={<Contact />} />
            </Routes>
        </MainLayout>
      </Router>
    </>
  )
}

export default App;