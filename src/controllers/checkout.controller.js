const { stripe, currency } = require('../config/stripe');
const sendResponse = require('../utils/sendResponse');


const createCheckoutSession = async (req, res) => {
    try {
        const { items } = req.body;
        if (items.length <= 0) return sendResponse(res, 200, false, "No items found.", null)


        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items.map(item => ({
                price_data: {
                    currency: currency,
                    product_data: { name: item.name },
                    unit_amount: item.amount
                },
                quantity: item.quantity
            })),
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        })
        return sendResponse(res, 200, true, "Checkout session created successfully.", {
            id: session.id,
            url: session.url
        })
    }
    catch (err) {
        console.log(err)
        sendResponse(res, 500, false, "Error creating stripe checkout.", null)
    }
}

const getCheckoutSession = async (req, res) => {
    try {
        const { sessionId } = req.params;
        if (!sessionId) return sendResponse(res, 400, false, "Session ID is required.", null)

        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (!session) return sendResponse(res, 404, false, "No session found.", null)

        return sendResponse(res, 200, true, "Checkout session retrieved successfully.", session)
    }
    catch (err) {
        console.log(err)
        sendResponse(res, 500, false, "Error retrieving stripe checkout.", null)
    }
}
module.exports = { createCheckoutSession, getCheckoutSession };