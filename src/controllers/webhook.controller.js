const { stripe } = require('../config/stripe');
const sendResponse = require('../utils/sendResponse');

const stripeWebhook = (request, response) => {
    const sig = request.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(request.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        sendResponse(response, 400, false, `Webhook Error: ${err.message}`);
    }
    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('PaymentIntent was successful!');
            // Then define and call a method to handle the successful payment intent.
            // handlePaymentIntentSucceeded(paymentIntent);
            break;
        case 'payment_method.attached':
            const paymentMethod = event.data.object;
            // Then define and call a method to handle the successful attachment of a PaymentMethod.
            // handlePaymentMethodAttached(paymentMethod);
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    // Return a 200 response to acknowledge receipt of the event
    sendResponse(response, 200, true, "Webhook received successfully");
}

module.exports = stripeWebhook;