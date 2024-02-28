// Settings.jsx
import { Paper, Divider } from '@mantine/core';
import '../index.css';
import SwitchesCard from '../components/SwitchesCard';
import { useState, useEffect } from 'react';

function Settings() {
  const [settings, setSettings] = useState(() => {
    // Load settings from local storage on component mount
    const savedSettings = localStorage.getItem('userSettings');
    return savedSettings ? JSON.parse(savedSettings) : getDefaultSettings();
  });

  useEffect(() => {
    // Save settings to local storage whenever settings change
    localStorage.setItem('userSettings', JSON.stringify(settings));
  }, [settings]);

  const handleToggle = (key) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: !prevSettings[key],
    }));
  };

  const getDefaultSettings = () => ({
    'notify me': false,
    'enable ai recommendations': false,
    'enable bank linking': false,
    'dark mode': false,
  });

  return (
    <>
      <Paper shadow="sm" radius="md" p="lg" style={{ maxWidth: '768px', margin: 'auto' }}>
        <h1 className="text-center">Configure Settings</h1>
        <br />
        <SwitchesCard settings={settings} onToggle={handleToggle} />
        <Divider my="sm"/>
      </Paper>
      {/* Users here manage all types of settings such as notifications, bank connections, user acc info, etc. */}
    </>
  );
}

export default Settings;
