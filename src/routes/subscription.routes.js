const express = require('express');
const createSubscriptionSession = require('../controllers/subscription.controller');

const router = express.Router();

router.post('/create-subscription-session', (req, res) => createSubscriptionSession(req, res))

module.exports = router