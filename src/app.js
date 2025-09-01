require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const paymentRoutes = require('./routes/payment.routes');
const app = express()

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/v1/payments", paymentRoutes);

module.exports = app;