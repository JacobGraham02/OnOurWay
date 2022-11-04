var express = require('express');
var router = express.Router();

router.get('/', function(request, response, next) {
    response.render('stripe/index', {title: 'Test'});
});

/* GET home page. */
router.get('/create-checkout-session', function(request, response, next) {
    response.render('stripe/index', { title: 'Success' });
});


module.exports = router;
  