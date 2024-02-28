import { Paper, Button } from '@mantine/core';
import '../index.css';
import { useAuth0 } from "@auth0/auth0-react";
import { testAuth, testBackend } from '../utils/api';
import { usePlaidLink } from 'react-plaid-link';
import { useEffect, useState } from 'react';
import { createLinkToken, exchangePublicToken, plaidAuth } from '../utils/api';

function Dashboard() {
  const { getAccessTokenSilently } = useAuth0();

  const [linkToken, setLinkToken] = useState();
  const [publicToken, setPublicToken] = useState();
  const [accessToken, setAccessToken] = useState();
  const [plaidAccount, setPlaidAccount] = useState({});

  const testMyAuth = async () => {
    const token = await getAccessTokenSilently();
    testAuth(token);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const linkToken = await createLinkToken();
        setLinkToken(linkToken);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (accessToken) {
      const fetchPlaidAccount = async () => {
        try {
          const account = await plaidAuth(accessToken);
          console.log(account);
          setPlaidAccount(account)
        } catch (error) {
          console.error(error.message);
        }
      };
      fetchPlaidAccount();
    }
  }, [accessToken]);

  const exchangeTokenAndFetchAccount = async (publicToken) => {
    try {
      const token = await getAccessTokenSilently();
      const accessToken = await exchangePublicToken(publicToken, token);
      setAccessToken(accessToken);
    } catch (error) {
      console.error(error.message);
    }
  };

  // .numbers.ach[0]
  
  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      console.log("success", public_token, metadata)
      setPublicToken(public_token);
      exchangeTokenAndFetchAccount(public_token);
    },
  });
  
  return (
    <>
      <Paper shadow="sm" radius="md" p="lg" style={{ maxWidth: '768px', margin: 'auto' }}>
        <h1 className='text-center'>Your Dashboard</h1>
        <Button onClick={testBackend}>Regular User Test</Button> <br /> <br />
        <Button onClick={testMyAuth}>Auth User Test</Button> <br /> <br />
        <Button onClick={() => open()} disabled={!ready}>Connect a bank account</Button>
        <h1>{publicToken}</h1>
        <h1>{accessToken}</h1>
        {Object.keys(plaidAccount).length > 0 && (
        <div>
          <p>Account: {plaidAccount.numbers.ach[0].account}</p>
          <p>Account ID: {plaidAccount.numbers.ach[0].account_id}</p>
          <p>Routing: {plaidAccount.numbers.ach[0].routing}</p>
          <p>Wire Routing: {plaidAccount.numbers.ach[0].wire_routing}</p>
          <br />
          <p>Balance: {plaidAccount.accountData[0].balances.current}</p>
        </div>
        )}
      </Paper>
    </>
  )
}

export default Dashboard;
