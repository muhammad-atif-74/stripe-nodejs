const { stripe } = require('../config/stripe');
const sendResponse = require("../utils/sendResponse");

const createSubscriptionSession = async (req, res) => {
    try {
        const { price_id, quantity } = req.body;

        if (!price_id) return sendResponse(res, 404, false, "Price id not found.");

        const subscriptionSession = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ['card'],
            line_items: [
                {
                    price: price_id,
                    quantity: quantity
                }
            ],
            success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        });

        return sendResponse(res, 200, true, "Subscription session created. ", subscriptionSession)
    }
    catch (err) {
        console.log(err);
        return sendResponse(res, 500, false, "Error creating subscription session.", null);
    }
}

module.exports = createSubscriptionSession;