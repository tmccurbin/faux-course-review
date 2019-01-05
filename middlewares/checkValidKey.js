var keysDb = require('../db/key');

// This function checks if a given API key is valid.
// The callback has type function (err, isValid) where:
// 1. err is some database error if one was thrown during lookup, otherwise null/undefined
// 2. isValid is a boolean indicating whether the key is valid
var isAPIKeyValid = function (apiKey, callback) {
  'use strict';
  keysDb.containsKey(apiKey, callback);
};

/* TODO: Implement the checkValidKey middleware function.
  Check if the API key associated with a request is valid.
  If valid, go on to the next middleware in the chain.
  If invalid, set response status to 403 (forbidden) and pass a new Error('Invalid key') to next().

  Remember: the API key is passed in a query string.
*/

/*
  How does the router know to look for the 'key' tag in the html document?
  The answer is in indexPage.js.
  The value from the input box, $('#key').val(), is used to generate href attributes
*/

var checkValidKey = function (req, res, next) {
  // Use the function provided above
  'use strict';
  isAPIKeyValid(req.query.key, function (err, isValid) {
    if (isValid) {
      next();
    } else if (err) {
      // A database error occurs
      next(err);
    } else {
      // isValid returns false
      res.status(403); // forbidden
      next(new Error('Invalid key'));
    }
  });
};

module.exports = checkValidKey;
