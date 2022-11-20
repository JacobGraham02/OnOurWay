var express = require('express');
var router = express.Router();
const carpoolDAO = require('../persistence/CarpoolDAO');
const customerDAO = require('../persistence/CustomerDAO');

function isLoggedIn(request, response, next) {
  if (request.isAuthenticated()) {
    return next();
  } else {
    response.redirect('/login');
  }
}

router.get('/account-details', isLoggedIn, function(request, response, next) {
    const request_parameter_id = request.query.id;
    const query_where_clause = `id = ${request_parameter_id}`;
    const customer_data = customerDAO.getSpecificCustomer(query_where_clause);
    customer_data.then((account_data) => {
        const user_account_data = account_data[0];
        response.render(`customer/account_details`, {account_information: user_account_data})
    });
});

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  const carpool_locations = carpoolDAO.getAllFromCarpool();
  carpool_locations.then((results) => {
    res.render('carpool/index', {carpool_locations: results});
  });
});

router.get('/detailed_route', isLoggedIn, function(request, response, next) {
  const request_parameter_id = request.query.id;
  const query_where_clause = `id = ${request_parameter_id}`;
  const carpool_result = carpoolDAO.getSpecificCarpool(query_where_clause);
  carpool_result.then((carpool) => {
    const carpool_information = carpool[0]; 
    response.render('carpool/view_detailed_route', {title: 'Detailed route', carpool_information: carpool_information});
  });
});

router.get('/create_carpool_route', function(request, response, next) {
  response.render('carpool/detailed_routes');
});

module.exports = router;
