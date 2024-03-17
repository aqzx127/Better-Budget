import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { fetchUserTransactions } from '../utils/api';
import { calculateTotalTransactions } from '../utils/utils';

const TransactionContext = createContext();

export const useTransaction = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const [transactions, setTransactions] = useState([]);
  const [totalTransactions, setTotalTransactions] = useState(0);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        if (isAuthenticated && user) {
          const token = await getAccessTokenSilently();
          const data = await fetchUserTransactions(token);
          setTransactions(data);
        }
      } catch (error) {
        console.error('Error fetching user transactions:', error.message);
      }
    };

    loadTransactions();
  }, [getAccessTokenSilently, isAuthenticated, user]);

  useEffect(() => {
    setTotalTransactions(calculateTotalTransactions(transactions));
  }, [transactions]);

  return (
    <TransactionContext.Provider value={{ transactions, setTransactions, totalTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
};