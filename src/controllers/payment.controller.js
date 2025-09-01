const {stripe, currency} = require('../config/stripe');
const sendResponse = require('../utils/sendResponse');

const createPaymentIntent = async (request, response, stripe) => {
    const { amount } = request.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // convert dollars to cents
            currency: currency,
            automatic_payment_methods: { enabled: true }
        })
        console.log(paymentIntent);
        sendResponse(response, 200, true, "Payment Intent created successfully", { clientSecret: paymentIntent.client_secret });
    }
    catch (error) {
        sendResponse(response, 500, false, "Failed to create Payment Intent", { error: error.message });
    }
}

module.exports = createPaymentIntent;