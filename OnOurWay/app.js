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
const encryptAndValidatePassword = require('./modules/EncryptionAndValidation');

console.log(process.env.database_host);
var driverRouter = require('./routes/driver');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var stripeRouter = require('./routes/stripe');
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
	// store: new MySQLStore({
  //       host:process.env.database_host,
  //       user:process.env.database_user,
  //       port:process.env.database_port,
  //       password:process.env.database_password,
  //       database:process.env.database_name,
  //       multipleStatements: true,
  //   }),
	  resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge:1000*60*60*24,
    }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/stripe', stripeRouter);
app.use('/driver', driverRouter);
app.use('/customer', customerRouter);

const usernameAndPasswordFormFields = {
  username_field: 'username',
  password_field: 'password',
};

/*
Test user credentials:
username: Jacob
password: test1234
*/
const verifyCallback = (username, password, done) => {
  customerDAO.getSpecificCustomer(`first_name='${username}'`).then((results) => {
    let customer_data = results[0];
    if (results.length === 0) {
      return done(null, false);
    } 
    const is_valid_user = encryptAndValidatePassword.validatePassword(password, customer_data['password'], customer_data['salt']);
    const user = {
      id: customer_data['id'],
      username: customer_data['username'],
      password: customer_data['password'],
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

app.get('/login-success', (request, response, next) => {
  response.render('customer/index');
});

app.get('/login-failure', (request, response, next) => {
  response.render('login');
})

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
