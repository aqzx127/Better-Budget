import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const [newUser, setNewUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const createUserInDatabase = async () => {
      if (isAuthenticated && user) {
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
  }, [isAuthenticated, user, getAccessTokenSilently]);

  return (
    <AuthContext.Provider value={{ toggleSidebar, isSidebarOpen, setIsSidebarOpen, newUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
