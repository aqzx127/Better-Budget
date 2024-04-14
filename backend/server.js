const express = require('express');
const cors = require('cors');
const sequelize = require('./src/utils/db-config');
const userRoutes = require('./src/routes/userRoutes');
const testRoutes = require('./src/routes/testRoutes');
const plaidRoutes = require('./src/routes/plaidRoutes');
const transactionRoutes = require('./src/routes/transactionRoutes');
const goalRoutes = require('./src/routes/goalRoutes');
const axios = require('axios');
const OpenAI = require('openai'); // Import OpenAI

// Initialize OpenAI with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Use Test routes
app.use('/api', testRoutes);

// Use User routes
app.use('/api/users', userRoutes);

// Use Transaction routes
app.use('/api/transactions', transactionRoutes);

// Use Goal routes
app.use('/api/goals', goalRoutes);

// Use Plaid routes
app.use('/api/plaid', plaidRoutes);

// Chat-GPT API Testing
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: message}]
    });
    res.json({ reply: chatCompletion.choices[0].message.content });
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error('API error:', error.status, error.message);
      res.status(500).json({ error: error.message });
    } else {
      console.error('Server error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});


sequelize.sync().then(() => {
  console.log('Tables have been created/Synced');
}).catch((error) => {
  console.error('Unable to create tables', error);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
