import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const [newUser, setNewUser] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false); // State to track whether terms are accepted
  const [income, setIncome] = useState('');
  const [savingGoal, setSavingGoal] = useState('');

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); 
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      if (isAuthenticated && user) {
        try {
          const accessToken = await getAccessTokenSilently();
          const response = await fetch(`http://localhost:3001/api/users/${user.sub}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          if (response.ok) {
            const userData = await response.json();
            setIncome(userData.monthlyIncome || '');
            setSavingGoal(userData.monthlySavingsGoal || '');
          } else {
            console.error('Failed to fetch user data:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching user profile data:', error);
        }
      }
    };

    fetchProfileData();
  }, [isAuthenticated, user, getAccessTokenSilently]);
  
  useEffect(() => {
    const createUserInDatabase = async () => {
      if (isAuthenticated && user) {
        // If user is present, authenticated, and terms accepted, then create an account for them in local DB, if not already created.
        try {
          const accessToken = await getAccessTokenSilently();
          const response = await fetch('http://localhost:3001/api/users/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              userId: user.sub,
              name: user.name,
              email: user.email,
            }),
          });

          if (response.ok) {
            // Successfully created the user in DB
            const userData = await response.json();
            // Ask for basic account info like, monthly income, savings goals.
            setNewUser(userData);
          } else {
            console.error('Failed to create user in the database:', response.statusText);
          }
        } catch (error) {
          console.error('Error creating user in the database', error.message);
        }
      }
    };

    createUserInDatabase();
  }, [isAuthenticated, user, getAccessTokenSilently, termsAccepted]);

  return (
    <AuthContext.Provider value={{ toggleSidebar, isSidebarOpen, setIsSidebarOpen, newUser, termsAccepted, setTermsAccepted, income, setIncome, savingGoal, setSavingGoal }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
