const { query } = require('express');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.post('/create-checkout-session', function(request, response, next) {
//   res.render('index', {title: 'Express'});
// });

router.get('/login', function(request, response, next) {
  console.log(request.query);
  response.render('login', {title: "Login page", success_register_message: request.query.success_register_message});
});

router.get('/register', function(request, response, next) {
  console.log(request.query);
  response.render('register', {title: 'Register page', failed_register_message: request.query.failed_register_message});
});

module.exports = router;
