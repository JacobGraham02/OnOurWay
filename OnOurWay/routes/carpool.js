var express = require('express');
var router = express.Router();
const carpoolDAO = require('../persistence/CarpoolDAO');

function isLoggedIn(request, response, next) {
  if (request.isAuthenticated()) {
    return next();
  } else {
    response.redirect('/login');
  }
}

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  const carpool_locations = carpoolDAO.getAllFromCarpool();
  carpool_locations.then((results) => {
    res.render('carpool/index', {title: 'Carpool home', carpool_locations: results, user: req.user});
  });
});

router.get('/detailed_route', isLoggedIn, function(request, response, next) {
  const request_parameter_id = request.query.id;
  const query_where_clause = `id = ${request_parameter_id}`;
  const carpool_result = carpoolDAO.getSpecificCarpool(query_where_clause);
  carpool_result.then((carpool) => {
    console.log(carpool);
    const carpool_results = carpool[0];
    response.render('carpool/view_detailed_route', {title: 'Detailed route', carpool_information: carpool_results, user: request.user});
  });
});

router.get('/detailed_route_without_button', isLoggedIn, function(request, response, next) {
  const request_parameter_id = request.query.id;
  const query_where_clause = `id = ${request_parameter_id}`;
  const carpool_result = carpoolDAO.getSpecificCarpool(query_where_clause);
  carpool_result.then((carpool) => {
    console.log(carpool);
    const carpool_results = carpool[0];
    response.render('carpool/view_detailed_route_without_button', {title: 'Detailed route', carpool_information: carpool_results, user: request.user});
  });
});

router.get('/create_carpool_route', isLoggedIn, function(request, response, next) {
  if (request.user.user_type === 'Passenger') {
    response.render('carpool/index', {title: 'Carpool home'});
  } else {
    response.render('carpool/detailed_routes', {title: 'Create a carpool route', user: request.user});
  }
});

module.exports = router;
