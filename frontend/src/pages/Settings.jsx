// Settings.jsx
import { Paper, } from '@mantine/core';
import '../index.css';

function Settings() {

  return (
    <>
      <Paper shadow="sm" radius="md" p="lg" style={{ maxWidth: '768px', margin: 'auto' }}>
        <h1 className="text-center">Configure Settings</h1>
      </Paper>
      {/* Users here manage all types of settings such as notifications, bank connections, user acc info, etc. */}
    </>
  );
}

export default Settings;
