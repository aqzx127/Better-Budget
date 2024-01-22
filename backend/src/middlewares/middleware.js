// Custom Middleware (Authentication, JWT Check, Body Parsing)
const { auth } = require('express-oauth2-jwt-bearer');

const jwtCheck = auth({
    audience: 'https://budgetbuddyapi/',
    issuerBaseURL: 'https://dev-qsh22qbc8oa4list.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });

module.exports = jwtCheck;