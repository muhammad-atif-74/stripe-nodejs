require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const paymentRoutes = require('./routes/payment.routes');
const webhookRoutes = require('./routes/webhook.routes');
const checkoutRoutes = require('./routes/checkout.routes');

const app = express()

app.use(helmet());
app.use(cors());

app.use("/api/v1/webhook",
    express.raw({ type: 'application/json' }),
    webhookRoutes);


app.use(express.json());
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/checkout", checkoutRoutes);

module.exports = app;