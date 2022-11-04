var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/stripe-checkout-success', function(request, response, next) {
    response.render('stripe_checkout_session_success', { title: 'Success' });
});

router.get('/stripe-checkout-failure', function(request, response, next) {
    response.render('stripe_checkout_session_error', {title: 'Error'});
});

module.exports = router;
  