var express = require('express');
var router = express.Router();
var reviewsDb = require('../db/reviews');

// Implement the routes.
// Note: the rating will be passed as a string (req.body.rating).
// Use Number() to transform it to a number before adding it to the database.

router.get('/new', function (req, res, next) {
	res.render('addreview');
});

router.post('/new', function (req, res, next) {
	if (req.body.className && req.body.semester && req.body.rating && req.body.text) {
		reviewsDb.addReview ({className: req.body.className, semester: req.body.semester, rating: Number(req.body.rating), text: req.body.text}, function (err) {
			if (err) {
				res.redirect('/reviews/new');
			} else {
				res.render('index');
			}
		});
	} else {
		res.send('Make sure that you fill in all the fields');
	}
});


module.exports = router;
