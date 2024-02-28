const express = require('express');
require('dotenv').config();
const cors = require('cors');
const sequelize = require('./src/utils/db-config'); // Import sequelize
const jwtCheck = require('./src/middlewares/middleware');
const User = require('./src/models/userModel');
const userRoutes = require('./src/routes/userRoutes');
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
const app = express();

const port = 3001;

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

//-----------------------------PLAID CONFIG--------------------------------------------

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

// Plaid Test Endpoints

app.post('/api/create_link_token', async function (req, res) {
  const plaidRequest = {
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: 'user',
    },
    client_name: 'Plaid Test App',
    products: ['auth'],
    language: 'en',
    redirect_uri: 'http://localhost:5173/',
    country_codes: ['US'],
  };
  try {
    const createTokenResponse = await plaidClient.linkTokenCreate(plaidRequest);
    res.json(createTokenResponse.data);
  } catch (error) {
    res.status(500).send("Failed")
    // handle error
  }
});

app.post('/api/exchange_public_token', async function (request, response, next) {
  const publicToken = request.body.public_token;
  try {
    console.log("Received public token:", publicToken);
    const plaidResponse = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });
    console.log("Plaid response:", plaidResponse);
    // These values should be saved to a persistent database and
    // associated with the currently signed-in user
    const accessToken = plaidResponse.data.access_token;
    console.log("Access Token:", accessToken);
    response.json({ accessToken });
  } catch (error) {
    console.error("Error exchanging public token:", error.message);
    response.status(500).send("Failed to exchange public token");
  }
});

app.post('/api/plaidAuth', async function (req, res) {
  try {
    // Log the request body to see what data is being received
    console.log('Request Body:', req.body);

    // Assuming access token is sent in the request body
    const { accessToken } = req.body;

    // Construct Plaid request object
    const plaidRequest = {
      access_token: accessToken,
    };

    // Make Plaid API call to get authentication data
    const plaidResponse = await plaidClient.authGet(plaidRequest);

    // Extract necessary data from the Plaid response
    const accountData = plaidResponse.data.accounts;
    const numbers = plaidResponse.data.numbers;

    // Send the extracted data back to the client
    res.json({ accountData, numbers });
  } catch (error) {
    console.error("Error fetching authentication data:", error.message);
    // Send a specific error message indicating the failure
    res.status(500).send("Failed to fetch authentication data");
  }
});


//---------------END OF PLAID STUFF-----------------------------------------------------------

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
  console.log('Tables have been created/Synced');
}).catch((error) => {
  console.error('Unable to create tables', error);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});