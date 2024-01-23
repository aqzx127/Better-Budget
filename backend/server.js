const express = require('express');
const cors = require('cors');
const sequelize = require('./src/utils/db-config'); // Import sequelize
const jwtCheck = require('./src/middlewares/middleware');
const User = require('./src/models/userModel');
const userRoutes = require('./src/routes/userRoutes');
const app = express();

const port = 3001;

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Users Endpoint
app.use('/api/users', userRoutes);

// Test Endpoints 

app.get('/api/test', (req, res) => {
    res.json({ message: 'Hello Stranger from the backend!' });
});

app.get('/api/authorized', jwtCheck, (req, res) => {
  console.log(req.auth);

  const email = req.auth.payload['https://myapp.example.com/email']; // Access Custom Claims
  const userId = req.auth.payload['https://myapp.example.com/userId'];

  console.log(email);
  console.log(userId);

  const user = req.auth;
  res.json({ message: 'Hello Authorized User: ', user});
});

sequelize.sync().then(() => {
  console.log('Tables have been created');
}).catch((error) => {
  console.error('Unable to create tables', error);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});