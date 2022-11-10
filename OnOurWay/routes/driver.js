var express = require('express');
var router = express.Router();

// router.post('/create-checkout-session', function(request, response, next) {
//   res.render('index', {title: 'Express'});
// });

router.get('/', function(request, response, next) {
  response.render('driver/index', {title: "Set your travel locations"});
});

// router.get('/register', function(request, response, next) {
//   response.render('register', {title: 'Register page'});
// });

module.exports = router;
