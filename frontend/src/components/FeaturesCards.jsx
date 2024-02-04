// FeaturesCards.jsx
import {
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { IconCash, IconUser, IconClock } from '@tabler/icons-react';
import classes from '../css-modules/FeaturesCards.module.css';

const mockdata = [
  {
    title: 'Improved Savings Rate',
    description:
      'Our technology solution aims to increase users\' savings rate by providing personalized recommendations and insights. We anticipate achieving a quantifiable improvement of at least a 15% increase in users\' monthly savings compared to their previous savings habits.',
    icon: IconCash,
  },
  {
    title: 'Enhanced Financial Literacy',
    description:
      'Through the app\'s educational resources and content, we aim to boost users\' financial literacy. Our goal is to increase users\' financial knowledge as measured by a 20% improvement after six months of app usage.',
    icon: IconUser,
  },
  {
    title: 'Time Savings',
    description:
      'Our AI-driven expense tracking and budget management features will save users’ time. We anticipate users will spend at least 30% less time on manual expense tracking and financial planning compared to traditional methods.',
    icon: IconClock,
  },
];

export function FeaturesCards() {
  const theme = useMantineTheme();
  const features = mockdata.map((feature) => (
    <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
      <feature.icon
        style={{ width: rem(50), height: rem(50) }}
        stroke={2}
        color={theme.colors.blue[6]}
      />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl">
      <Group justify="center">
        <Badge variant="filled" size="lg">
          What We Offer
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        Empowering Financial Control with Better Budget
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Our company, Better Budget, is dedicated to empowering individuals and families to take control of their finances. With the right tools and insights, people can make more informed financial decisions, achieve their financial goals, and secure their financial future.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}
