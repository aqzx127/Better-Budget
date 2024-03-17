import { Text, Progress, Card } from '@mantine/core';
import { useAuth } from '../context/authContext';
import { useTransaction } from '../context/TransactionContext';

function ProgressCard() {
  const { income } = useAuth();
  const { totalTransactions } = useTransaction();

  // Calculate the percentage of income spent
  const percentageSpent = (totalTransactions / income) * 100;

  return (
    <Card withBorder radius="md" padding="xl" bg="var(--mantine-color-body)">
      <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
        Monthly Income
      </Text>
      <Text fz="lg" fw={500}>
        ${totalTransactions} Spent / ${income} Available 
      </Text>
      <Progress value={percentageSpent} mt="md" size="lg" radius="xl" />
    </Card>
  ); 
}

export default ProgressCard;