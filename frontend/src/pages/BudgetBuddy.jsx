import { useState } from 'react';
import { Paper, TextInput, Button, Box, Text, Stack, Group } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';

function BudgetBuddy() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const theme = useMantineTheme();

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newUserMessage = { role: "user", content: input };
    setMessages(messages => [...messages, newUserMessage]);
    setInput('');

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      if (!response.ok) throw new Error('Failed to fetch from API');
      const data = await response.json();
      setMessages(messages => [...messages, { role: "assistant", content: data.reply }]);
    } catch (error) {
      console.error('API call failed:', error);
      setMessages(messages => [...messages, { role: "assistant", content: "Failed to get response from AI" }]);
    }
  };

  return (
    <Paper shadow="sm" radius="md" p="lg" style={{ maxWidth: '768px', margin: 'auto' }}>
      <Text align="center" size="lg" style={{ marginBottom: '20px' }}>Chat with BudgetBuddy</Text>
      <Box sx={{ maxHeight: '400px', overflowY: 'auto', padding: '10px' }}>
        {messages.map((msg, index) => (
          <Group key={index} position="apart" noWrap>
            <Stack spacing="xs" align={msg.role === 'user' ? 'flex-end' : 'flex-start'} style={{ width: '100%' }}>
              <div style={{
                backgroundColor: msg.role === 'user' ? theme.colors.blue[6] : theme.colors.gray[2],
                color: msg.role === 'user' ? theme.white : theme.black,
                borderRadius: '15px',
                padding: '10px 15px',
                maxWidth: '70%',
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start'
              }}>
                {msg.content}
              </div>
            </Stack>
          </Group>
        ))}
      </Box>
      <TextInput
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Type your message here..."
        rightSection={<Button onClick={sendMessage}>Send</Button>}
        rightSectionWidth={80}
        style={{ marginTop: '10px' }}
      />
    </Paper>
  );
}

export default BudgetBuddy;
