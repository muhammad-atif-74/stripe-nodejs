const express = require('express')
const { createCheckoutSession, getCheckoutSession, createSubscriptionSession } = require('../controllers/checkout.controller')

const router = express.Router();

router.post('/create-checkout-session', (req, res) => createCheckoutSession(req, res))
router.get('/checkout-session/:sessionId', (req, res) => getCheckoutSession(req, res))

module.exports = router