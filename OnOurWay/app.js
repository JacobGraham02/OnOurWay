require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql2');
var session = require('express-session');
const passport = require('passport');
const crypto = require('crypto');
const LocalStrategy = require('passport-local').Strategy;
const customerDAO = require('./persistence/CustomerDAO');
const carpoolDAO = require('./persistence/CarpoolDAO');
const encryptAndValidatePassword = require('./modules/EncryptionAndValidation');

var driverRouter = require('./routes/driver');
var indexRouter = require('./routes/index');
var carpoolRouter = require('./routes/carpool');
var customerRouter = require('./routes/customer');
var database_manager = require('./persistence/DatabaseConnectionManager');
var MySQLStore = require('express-mysql-session')(session);

var app = express();

const stripe_publishable_key = process.env.stripe_publishable_key;
const stripe_secret_key = process.env.stripe_secret_key;
const stripe = require('stripe')(stripe_secret_key);

app.listen(3005, function() {
  console.log("This application is listening to port 3005");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({
	key: process.env.express_mysql_session_cookie_name,
	secret: process.env.express_mysql_session_cookie_secret,
	resave: false,
  saveUninitialized: false,
  cookie:{
    maxAge:1000*60*60*24,
  }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/driver', driverRouter);
app.use('/carpool', carpoolRouter);
app.use('/customer', customerRouter);

const usernameAndPasswordFormFields = {
  username_field: 'username',
  password_field: 'password',
};
/*
Test user credentials:
in mysql database: TestUsername
username: test@gmail.com
password: test1234
email: test@gmail.com
*/
const verifyCallback = (username, password, done) => {
  customerDAO.getSpecificCustomer(`email='${username}'`).then((results) => {
    let customer_data = results[0];
    if (results.length === 0) {
      return done(null, false);
    } 
    const is_valid_user = encryptAndValidatePassword.validatePassword(password, customer_data.password, customer_data.salt);
    const user = {
      id: customer_data.id,
      username: customer_data.username,
      password: customer_data.password,
    };
    if (is_valid_user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  }).catch((error) => console.log(error));
};

const strategy=new LocalStrategy(usernameAndPasswordFormFields, verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(function(userId, done) {
  database_manager.initialize_database_connection_pool().getConnection(function(error, connection) {
    connection.query('SELECT * FROM CUSTOMER WHERE id=?', [userId], function(error, results) {
      done(null, results[0]);
    });
  });
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/login-success',
  failureRedirect: '/login-failure'
}));

app.post('/register', (request, response, next) => {
  const failed_register_message = "A user with this account already exists. Please try again using another set of credentials";
  const success_register_message = "You have successfully registered an account. Please log in using your credentials";
  const customer_data = request.body;
  const customer_password_obj = encryptAndValidatePassword.encryptPassword(request.body.password);
  const customer_password = customer_password_obj.password;
  const customer_password_salt = customer_password_obj.salt;
  const customer_information_obj = {
    username: customer_data.username,
    password: customer_password,
    salt: customer_password_salt,
    first_name: customer_data.first_name,
    last_name: customer_data.last_name,
    credit_card_number: customer_data.credit_card_number,
    credit_card_cvc: customer_data.credit_card_cvc,
    credit_card_effective_date: customer_data.credit_card_effective_date,
    credit_card_expiry_date: customer_data.credit_card_expiry_date,
    phone_number: customer_data.phone_number,
    email: customer_data.email,
  };
  if (!userExists(request)) {
    customerDAO.addCustomer(customer_information_obj);
    response.redirect('login?message=' + encodeURIComponent(success_register_message));
  } else {
    response.redirect('register?message=' + encodeURIComponent(failed_register_message));
  }
});

function userExists(request, response, next) {
  const customer = customerDAO.getSpecificCustomer(`username = '${request.body.username}'`);
  customer.then((customer) => {
    if (customer.length >= 1) {
      return true;
    } else {
      return false;
    }
  });
}
app.post('/update-account-info', (request, response) => {
  const account_email = request.body.email;
  const [...object_keys] = Object.keys(request.body);
  const [...object_values] = Object.values(request.body);
  const total_object_columns = object_keys.length;
  const customer_obj = {
    column_names: object_keys,
    column_values: object_values,
    total_columns: total_object_columns,
    where_clause: `email = "${account_email}"`,
  };
  customerDAO.updateCustomer(customer_obj);
  response.render('customer/index', {message: 'You have successfully updated your account information', user: request.user});
});

app.post('/create_carpool_route', (request, response) => {
  const starting_street_name = request.body.address_1;
  const starting_postal_code = request.body.postal_code_1;
  const starting_locality = request.body.locality_1;
  const starting_country = request.body.country_1;

  const ending_street_name = request.body.address_2;
  const ending_postal_code = request.body.postal_code_2;
  const ending_locality = request.body.locality_2;
  const ending_country = request.body.country_2;

  const starting_address = `${starting_street_name}, ${starting_locality}, ${starting_country}, ${starting_postal_code}`;
  const ending_address = `${ending_street_name}, ${ending_locality}, ${ending_country}, ${ending_postal_code}`;

  const maximum_passengers = request.body.maximum_passengers;

  const carpool_obj = {
    start_address: starting_address,
    end_address: ending_address,
    max_passengers: maximum_passengers,
  };
  carpoolDAO.addCarpool(carpool_obj);
});

app.get('/login-success', (request, response, next) => {
  response.render('customer/index', {message: 'You have successfully logged in', user: request.user});
});

app.get('/login-failure', (request, response, next) => {
  response.render('login', {message: 'Invalid login credentials. Please try again with another set of credentials'});
});
/*
Stripe Visa test card
Number: 4242 4242 4242 4242
CVC: Any 3 digits (123)
Date: Any future date (11/24)
Postal code: L2N L2N
*/
app.post('/create-checkout-session', async (request, response) => {
  const user = request.user;
  console.log(user);
  console.log(request.body);
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'cad',
          product_data: {
            name: 'Carpool ticket',
          },
          unit_amount: 32500,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `http://localhost:3005/customer/carpool_list?user_id=${user.id}`,
    cancel_url: 'http://localhost:3005/',
  });
  response.redirect(303, session.url);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
