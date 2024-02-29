// Plaid Routes

const express = require('express');
const router = express.Router();
const plaidController = require('../controllers/plaidController');
const jwtCheck = require('../middlewares/middleware');
//const jwtCheck = require('../middlewares/middleware');

router.post('/create_link_token', plaidController.createLinkToken);

router.post('/exchange_public_token', plaidController.exchangePublicToken);

router.post('/plaidAuth', plaidController.plaidAuth);

module.exports = router;
