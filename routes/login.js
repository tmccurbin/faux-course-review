var express = require('express');
var router = express.Router();

// Provided - do not modify
var credentalsAreValid = function (username, password) {
  return username === 'admin' && password === 'password';
};

// Implement the routes.
router.get('/loginAdmin', function (req, res, next) {
  res.render('login');
});

// Handle the post request when the user hits he submit button on the login page
// The POST functionality is built into the HTML form element.
// The form automatically puts values into req.body
// The html document even specifies the method attribute as 'post'
router.post('/loginAdmin', function (req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	if (credentalsAreValid(username, password)) {
		req.session.isAuthenticated = true;
		res.render('index');
		return;
	}
	res.redirect('/loginAdmin');
});

module.exports = router;
