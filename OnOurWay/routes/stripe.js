var express = require('express');
var router = express.Router();
require('dotenv').config({path:'\.env'});

const stripe_publishable_key = process.env.stripe_publishable_key;
const stripe_secret_key = process.env.stripe_secret_key;
const stripe = require('stripe')(stripe_secret_key);

router.get('/', function(request, response, next) {
    response.render('stripe/index', {title: 'Test'});
});

/* GET home page. */
router.post('/create-checkout-session', async function(request, response, next) {
    let price_obj = {
      price: 1,
    }
    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: 'price_1M0V3lCZyVvVnAdzmeJl9FOQ',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: '/stripe',
        cancel_url: '/stripe',
      });
    response.redirect(303, session.url);
});

// app.post('/create-checkout-session', async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         price: '{{PRICE_ID}}',
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: `${YOUR_DOMAIN}/success.html`,
//     cancel_url: `${YOUR_DOMAIN}/cancel.html`,
//   });

//   res.redirect(303, session.url);
// });


module.exports = router;
  