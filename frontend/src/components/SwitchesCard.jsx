// SwitchesCard.jsx
import { Group, Switch, Text } from '@mantine/core';
import classes from '../css-modules/SwitchesCard.module.css';

const SwitchItem = ({ title, description, checked, onChange }) => (
  <Group justify="space-between" className={classes.item} wrap="nowrap" gap="xl">
    <div>
      <Text>{title}</Text>
      <Text size="xs" c="dimmed">
        {description}
      </Text>
    </div>
    <Switch onLabel="ON" offLabel="OFF" className={classes.switch} size="lg" checked={checked} onChange={onChange} />
  </Group>
);

const SwitchesCard = ({ settings, onToggle }) => {
  const data = [
    { title: 'Notify Me', description: 'Receive Notifications' },
    { title: 'Enable AI Recommendations', description: 'AI will look at your finances and provide recommendations' },
    { title: 'Enable Bank Linking', description: 'Connect your Bank Accounts using Plaid API' },
    {
      title: 'Dark Mode',
      description: 'Toggle a dark theme',
    },
  ];

  return (
    <>
      {data.map((item) => (
        <SwitchItem
          key={item.title}
          title={item.title}
          description={item.description}
          checked={settings[item.title.toLowerCase()]}
          onChange={() => onToggle(item.title.toLowerCase())}
        />
      ))}
    </>
  );
};

export default SwitchesCard;
