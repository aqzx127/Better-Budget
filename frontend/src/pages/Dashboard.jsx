import { Paper, Button, Group, Badge, Card, Divider } from '@mantine/core';
import '../index.css';
import { useAuth0 } from "@auth0/auth0-react";
import { testAuth, testBackend } from '../utils/api';
import { usePlaidLink } from 'react-plaid-link';
import { useEffect, useState } from 'react';
import { createLinkToken, exchangePublicToken, plaidAuth } from '../utils/api';

function Dashboard() {
  const { getAccessTokenSilently } = useAuth0();

  const [linkToken, setLinkToken] = useState();
  const [accessToken, setAccessToken] = useState();
  const [plaidAccounts, setPlaidAccounts] = useState([]);

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
      const fetchPlaidAccounts = async () => {
        try {
          const accounts = await plaidAuth(accessToken);
          console.log(accounts);
          setPlaidAccounts([accounts]);
        } catch (error) {
          console.error(error.message);
        }
      };
      fetchPlaidAccounts();
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
  
  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      console.log("success", public_token, metadata)
      exchangeTokenAndFetchAccount(public_token);
    },
  });
  
  return (
    <>
      <Paper shadow="sm" radius="md" p="lg" style={{ maxWidth: '768px', margin: 'auto' }}>
        <h1 className='text-center'>Your Dashboard</h1>
        <Button onClick={testBackend}>Regular User Test</Button> <br /> <br />
        <Button onClick={testMyAuth}>Auth User Test</Button> <br /> <br />
        <Button onClick={() => open()} disabled={!ready}>Plaid (Bank Account) API Test</Button> <br /> <br />
        <Divider ml="xl"/> <br />
        {plaidAccounts.map((account, index) => (
  <Card key={index} shadow="sm" style={{ marginBottom: '20px', backgroundColor: 'lightgrey' }}>
    <Group key={index}>
      <Badge color="teal">{account.accountData.map((data) => data.name).join(', ')}</Badge>
      {/* Accessing the names of each account in the accountData array */}
      <p>Account Number: {account.numbers.ach[0].account}</p>
      <p>Account ID: {account.numbers.ach[0].account_id}</p>
      <p>Routing Number: {account.numbers.ach[0].routing}</p>
      <p>Wire Routing Number: {account.numbers.ach[0].wire_routing}</p>
      <p>Current Balance: {account.accountData[0].balances.current}$</p>
    </Group>
  </Card>
))}

      </Paper>
    </>
  )
}

export default Dashboard;