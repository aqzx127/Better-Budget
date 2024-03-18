import { Paper, Button, Group, Badge, Card, Divider, RingProgress, Text, } from '@mantine/core';
import { Container, Grid, SimpleGrid, Skeleton, rem } from '@mantine/core';
import '../index.css';
import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from '../context/authContext';
import { testAuth, testBackend } from '../utils/api';
import { usePlaidLink } from 'react-plaid-link';
import { useEffect, useState } from 'react';
import { createLinkToken, exchangePublicToken, plaidAuth } from '../utils/api';
import ProgressCard from '../components/ProgressCard';

function Dashboard() {
  const { getAccessTokenSilently } = useAuth0();

  const [linkToken, setLinkToken] = useState();
  const [accessToken, setAccessToken] = useState();
  const [plaidAccounts, setPlaidAccounts] = useState([]);

  const { income } = useAuth();

  const PRIMARY_COL_HEIGHT = rem(300);


  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

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
      <Paper shadow="sm" radius="md" p="xl" style={{ maxWidth: '768px', margin: 'auto' }}>
        <h1 className='text-center'>Your Dashboard</h1>
        <br />
        {/* <Button onClick={testBackend}>Regular User Test</Button> <br /> <br />
        <Button onClick={testMyAuth}>Auth User Test</Button> <br /> <br /> */}
      

        <Container my="md">
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
          {/* Recent Transactions Here */}
          <Grid gutter="md">
            <Grid.Col>
              <ProgressCard />
            </Grid.Col>
            <Grid.Col span={6}>
              <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
            </Grid.Col>
            <Grid.Col span={6}>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
            </Grid.Col>
          </Grid>
        </SimpleGrid>
      </Container>
    </Paper>
    </>
  )
}

export default Dashboard;

// Dashboard page displays account info, recent transactions, user data visualized via charts/graphs and goal progress. 
// Monthly Income bar, personal goals, savings goal, recent transactions, transactions categorized

// Keep running balance for the account which updates accordingly

// Plaid API Test Button Code (Not in use)
/*

        <Button onClick={() => open()} disabled={!ready}>Plaid (Bank Account) API Test</Button> <br /> <br />
        <Divider ml="xl"/> <br />
        {plaidAccounts.map((account, index) => (
  <Card key={index} shadow="sm" style={{ marginBottom: '20px', backgroundColor: 'lightgrey' }}>
    <Group key={index}>
      <Badge color="teal">{account.accountData.map((data) => data.name).join(', ')}</Badge>
      <p>Account Number: {account.numbers.ach[0].account}</p>
      <p>Account ID: {account.numbers.ach[0].account_id}</p>
      <p>Routing Number: {account.numbers.ach[0].routing}</p>
      <p>Wire Routing Number: {account.numbers.ach[0].wire_routing}</p>
      <p>Current Balance: {account.accountData[0].balances.current}$</p>
    </Group>
  </Card>
))}

*/