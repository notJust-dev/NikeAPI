const express = require('express');
const router = express.Router();
const stripe = require('stripe')(
  'sk_test_51MhWh3KFBbgW0VClXuy06geu6WV84abzUKr4hYANWWILR8ClcVnKDoMtbK17islkfqhVIvgUPxM657H9ybvl8hzp00jN2pCpSm'
);

// router endpoints
router.post('/intents', async (req, res) => {
  try {
    // create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount, // Integer, usd -> pennies, eur -> cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    // Return the secret
    res.json({ paymentIntent: paymentIntent.client_secret });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});

module.exports = router;
