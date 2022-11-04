var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql2');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var stripeRouter = require('./routes/stripe');
var database_manager = require('./persistence/DatabaseConnectionManager');

var app = express();

require('dotenv').config({path:'\.env'});

const stripe_publishable_key = process.env.stripe_publishable_key;
const stripe_secret_key = process.env.stripe_secret_key;
const stripe = require('stripe')(stripe_secret_key);

app.get('/', function(request, response) {
  response.send();
});

app.listen(3003, function() {
  console.log("This application is listening to port 3000");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/stripe', stripeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.post('/create_stripe_payment_session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'cad',
          product_data: {
            name: req.body.product,
          },
          unit_amount: req.body.unit_amount,
        },
        quantity: req.body.quantity,
      },
    ],
    mode: 'payment',
    success_url: '/stripe',
    cancel_url: '/stripe',
  });

  res.redirect(303, session.url);
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


database_manager.initialize_database_connection_pool;

module.exports = app;
