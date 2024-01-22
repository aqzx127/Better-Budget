const express = require('express');
const cors = require('cors');
const sequelize = require('./src/utils/db-config'); // Import sequelize
const jwtCheck = require('./src/middlewares/middleware');
const User = require('./src/models/model');
const userRoutes = require('./src/routes/route');
const app = express();

const port = 3001;

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use('/api/users', userRoutes);

app.get('/api/test', (req, res) => {
    res.json({ message: 'Hello Stranger from the backend!' });
});

app.get('/api/authorized', jwtCheck, (req, res) => {
  const user = req.auth;
  res.json({ message: 'Hello Authorized User: ', user});
});

app.post('/api/users', (req, res) => {
    // Extract data from request
    const { username, email } = req.body;
    console.log(username, email)
  
    // Use User model to create a new user
    User.create({ username, email })
      .then(user => res.json(user))
      .catch(error => res.status(400).json({ error: error.message }));
  });


sequelize.sync().then(() => {
  console.log('Tables have been created');
}).catch((error) => {
  console.error('Unable to create tables', error);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});