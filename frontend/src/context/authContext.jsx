import { useContext, useState } from "react";
import { createContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const { getAccessTokenSilently } = useAuth0();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const setToken = async () => {
        try {
            const token = await getAccessTokenSilently();
            localStorage.setItem('jwt', token);
        } catch (error) {
            console.error('Error getting token:', error);
        }
    };    
    
        // Function to get the JWT from local storage
        const getToken = () => {
            return localStorage.getItem('jwt');
        };
    

    return (
        <AuthContext.Provider value={{setToken, getToken, toggleSidebar, isSidebarOpen, setIsSidebarOpen, }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}