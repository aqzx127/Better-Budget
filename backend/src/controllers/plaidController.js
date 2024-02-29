const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
require('dotenv').config();

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

exports.createLinkToken = async (req, res) => {
  try {
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
    const createTokenResponse = await plaidClient.linkTokenCreate(plaidRequest);
    res.json(createTokenResponse.data);
  } catch (error) {
    console.error("Error creating link token:", error.message);
    res.status(500).send("Failed to create link token");
  }
};

exports.exchangePublicToken = async (req, res) => {
  try {
    const publicToken = req.body.public_token;
    console.log("Received public token:", publicToken);
    const plaidResponse = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });
    console.log("Plaid response:", plaidResponse);
    const accessToken = plaidResponse.data.access_token;
    console.log("Access Token:", accessToken);
    res.json({ accessToken });
  } catch (error) {
    console.error("Error exchanging public token:", error.message);
    res.status(500).send("Failed to exchange public token");
  }
};

exports.plaidAuth = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const { accessToken } = req.body;
    const plaidRequest = {
      access_token: accessToken,
    };
    const plaidResponse = await plaidClient.authGet(plaidRequest);
    const accountData = plaidResponse.data.accounts;
    const numbers = plaidResponse.data.numbers;
    res.json({ accountData, numbers });
  } catch (error) {
    console.error("Error fetching authentication data:", error.message);
    res.status(500).send("Failed to fetch authentication data");
  }
};
