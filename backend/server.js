const express = require('express');
const cors = require('cors');
const { auth } = require('express-oauth2-jwt-bearer');

const app = express();

const port = 3001;

const jwtCheck = auth({
  audience: 'https://budgetbuddyapi/',
  issuerBaseURL: 'https://dev-qsh22qbc8oa4list.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

//app.use(jwtCheck);

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.get('/api/test', (req, res) => {
    res.json({ message: 'Hello Stranger from the backend!' });
});

app.get('/api/authorized', jwtCheck, (req, res) => {
  const user = req.auth;
  res.json({ message: 'Hello Authorized User: ', user});
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});