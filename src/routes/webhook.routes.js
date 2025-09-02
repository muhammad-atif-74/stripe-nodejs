const express = require('express');
const stripeWebhook = require('../controllers/webhook.controller');
const router = express.Router();


router.post('/', (req, res) => stripeWebhook(req, res));

module.exports = router;
