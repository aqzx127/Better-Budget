import { useEffect, useState } from 'react';
import { Paper, Grid, Card, Text, Progress, Table, Title, Divider } from '@mantine/core';
import { useAuth0 } from "@auth0/auth0-react";
import ProgressCard from '../components/ProgressCard';
import { fetchUserGoals, fetchUserTransactions } from '../utils/api';
import { format, parseISO } from 'date-fns';

function Dashboard() {
  const { getAccessTokenSilently } = useAuth0();
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, 'MMM dd, yyyy');
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessTokenSilently();
      try {
        const fetchedTransactions = await fetchUserTransactions(token);
        const fetchedGoals = await fetchUserGoals(token);
        setTransactions(fetchedTransactions);
        setGoals(fetchedGoals);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [getAccessTokenSilently]);

  return (
    <Paper shadow="sm" radius="md" p="lg" style={{ maxWidth: '1000px', margin: 'auto', marginTop: '20px' }}>
      <Title order={2} align="center" style={{ marginBottom: '20px' }}>Your Dashboard</Title>
      <Grid>
        <Grid.Col span={6}>
          <ProgressCard />
        </Grid.Col>
        <Grid.Col span={6}>
          <Card withBorder shadow="sm" padding="lg">
            <Text size="lg" weight={500} style={{ marginBottom: '10px' }}>Goals Progress</Text>
            {goals.map((goal) => (
              <div key={goal.id}>
                <Text>{goal.title}: ${goal.progress} / ${goal.amount}</Text>
                <Progress value={(goal.progress / goal.amount) * 100} size="sm" color="cyan" style={{ marginBottom: '10px' }} />
              </div>
            ))}
          </Card>
        </Grid.Col>
      </Grid>
      <Divider style={{ margin: '20px 0' }} />
      <Card withBorder shadow="sm" padding="lg">
        <Text size="lg" weight={500} style={{ marginBottom: '10px' }}>Recent Transactions</Text>
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.slice(0, 5).map((transaction, index) => (
              <tr key={index}>
                <td>{formatDate(transaction.date)}</td>
                <td>{transaction.name}</td>
                <td>${transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Paper>
  );
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