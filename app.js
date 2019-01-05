var express = require('express');
var app = express();
var uuid = require('node-uuid');

// Handlebars is used for sending and formatting review data on the front end
var exphbs = require('express-handlebars');

// TODO: Figure out where req.session comes from in isAuthenticated.js

// My middlewares
var checkValidKey = require('./middlewares/checkValidKey');
var handleError = require('./middlewares/handleError');
var pageNotFound = require('./middlewares/pageNotFound');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var isAuthenticated = require('./middlewares/isAuthenticated');

// My Routers
var keysRouter = require('./routes/keys');
var apiRouter = require('./routes/api');
var loginRouter = require('./routes/login');
var reviewsRouter = require('./routes/reviews');

// Serve static pages
app.engine('html', exphbs());
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  'use strict';
  res.render('index');
});

// Generate a random cookie secret for this app
var generateCookieSecret = function () {
  'use strict';
  return 'iamasecret' + uuid.v4();
};

// TODO (Part 3) - Use the cookieSession middleware. The above function
// can be used to generate a secret key. Make sure that you're not accidentally
// passing the function itself - you need to call it to get a string.
app.use(cookieSession({secret: generateCookieSecret()}));

// Parse the body of the request
app.use(bodyParser.urlencoded({extended: false}));

// Mount your routers. Please use good style here: mount a single router per use() call,
// preceded only by necessary middleware functions.
// DO NOT mount an 'authenticating' middleware function in a separate call to use().
// For instance, the API routes require a valid key, so mount checkValidKey and apiRouter in the same call.

app.use('/', keysRouter);
app.use('/api', checkValidKey, apiRouter);
app.use('/', loginRouter);
app.use('/reviews', isAuthenticated, reviewsRouter);

// Mount your error-handling middleware.
// Please mount each middleware function with a separate use() call.

app.use(handleError);
app.use(pageNotFound);
module.exports = app;
