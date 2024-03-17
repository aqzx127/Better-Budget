const express = require('express');
const cors = require('cors');
const sequelize = require('./src/utils/db-config');
const userRoutes = require('./src/routes/userRoutes');
const testRoutes = require('./src/routes/testRoutes');
const plaidRoutes = require('./src/routes/plaidRoutes');
const transactionRoutes = require('./src/routes/transactionRoutes');
const goalRoutes = require('./src/routes/goalRoutes');

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

sequelize.sync().then(() => {
  console.log('Tables have been created/Synced');
}).catch((error) => {
  console.error('Unable to create tables', error);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
