var express = require('express');
var router = express.Router();
const customerDAO = require('../persistence/CarpoolDAO');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user:req.user });
});

router.get('/login', function(request, response, next) {
  if (request.user) {
    response.render('/login');
  } else {
    response.render('login', {title: "Login page", success_register_message: request.query.success_register_message, user:request.user});
  }
});

router.get('/logout', function(request, response, next) {
  request.logout(function(error) {
    if (error) {
      return next(error);
    }
    response.redirect('/login');
  });
});

router.get('/register', function(request, response, next) {
  if (request.user) {
    response.redirect('/');
  } else {
    response.render('register', {title: 'Register page', failed_register_message: request.query.failed_register_message, user:request.user});
  }
});

module.exports = router;
