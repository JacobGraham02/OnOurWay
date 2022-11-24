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
        response.render(`customer/account_details`, {title: 'View or edit your account details', account_information: user_account_data, user: request.user})
    });
});

router.get('/carpool_list', isLoggedIn, function(request, response, next) {
  if ( request.query.carpool_id === undefined) {
    const user_id = request.query.id;
    carpoolDAO.getCustomerCarpools(user_id).then((user_carpools) => {
      const user_specific_carpools = user_carpools;
      response.render('customer/carpool_list', {user: request.user, title: "Your carpool routes", user_carpool_information: user_specific_carpools});
    });
  } else {
  const user_id = request.query.user_id;
  const carpool_id = request.query.carpool_id;
  carpoolDAO.getCustomerCarpoolWithJoin(user_id, carpool_id).then((user_carpools) => {
    const user_specific_carpools = user_carpools;
    console.log("User specific fields yes carpool id: " + user_specific_carpools);
     response.render('customer/carpool_list', {user: request.user, title: "Your carpool routes", user_carpool_information: user_specific_carpools});
  });
  }
});

router.get('/', isLoggedIn, function(req, res, next) {
  const carpool_locations = carpoolDAO.getAllFromCarpool();
  carpool_locations.then((results) => {
    res.render('carpool/index', {title: 'Welcome to OnOurWay!', carpool_locations: results, user: req.user});
  });
});

router.get('/detailed_route', isLoggedIn, function(request, response, next) {
  const request_parameter_id = request.query.id;
  const query_where_clause = `id = ${request_parameter_id}`;
  const carpool_result = carpoolDAO.getSpecificCarpool(query_where_clause);
  carpool_result.then((carpool) => {
    const carpool_info = carpool[0]; 
    response.render('carpool/view_detailed_route', {title: 'Detailed route', carpool_information: carpool_info, user:request.user});
  });
});

router.get('/create_carpool_route', isLoggedIn, function(request, response, next) {
  response.render('carpool/detailed_routes', {title: 'Create a carpool route', user: request.user});
});

module.exports = router;
