const express = require('express');
const createPaymentIntent = require('../controllers/payment.controller');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-payment-intent', (req, res) => createPaymentIntent(req, res, stripe));

module.exports = router;