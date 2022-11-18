var express = require('express');
var router = express.Router();
const carpoolDAO = require('../persistence/CarpoolDAO');

/* GET home page. */
router.get('/', function(req, res, next) {
  const carpool_locations = carpoolDAO.getAllFromCarpool();
  carpool_locations.then((results) => {
    console.log(results);
    res.render('carpool/index', {carpool_locations: results, message: 'hello'});
  });
});

router.get('/detailed_route', function(request, response, next) {
  response.render('carpool/detailed_routes', {title: 'Detailed routes page'});
});

module.exports = router;
