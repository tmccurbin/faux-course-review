var express = require('express');
var router = express.Router();
var reviewsDb = require('../db/reviews');

// Implement the routes.
router.get('/all', function (req, res, next) {
  reviewsDb.getAllReviews(function (err, reviews) {
    if (!err) {
      res.render('allreviews', {reviews: reviews});
      return;
    }
    next(err);
  })
});

router.get('/search/:className', function (req, res, next) {
  
  // Extract the class name
  var className = req.params.className;
  // Get all reviews
  reviewsDb.getReviewsByClassName(className, function (err, reviews) {
    if (!err) {
      res.send(reviews);
      return;
    }
    next(err);
  });
});

module.exports = router;
