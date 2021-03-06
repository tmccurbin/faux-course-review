var seeder = require('seeder');
var mongo = require('./mongo');
var seedData = require('./seedData');

var seedDb = function (done) {
  seeder(seedData, mongo.mongoose, function (err) {
    if (err) {
      console.log(err);
      done(err);
    } else {
      done(null);
    }
  });
};

if (require.main === module) {
  // run directly from cmd line
  seedDb(function () {
    console.log('Your database has been seeded.');
    process.exit();
  });
} else {
  // Seed the remote database
  seedDb(function () {
    console.log('Your REMOTE database has been seeded.')
  });
  module.exports = seedDb;
}
