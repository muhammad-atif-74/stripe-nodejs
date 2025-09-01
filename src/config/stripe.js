const Stripe = require('stripe');
const currency = "usd";
module.exports = {
    stripe: Stripe(process.env.STRIPE_SECRET_KEY),
    currency
}