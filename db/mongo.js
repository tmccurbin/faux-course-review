var mongoose = require('mongoose');
const dotenv = require('dotenv')

// Configure environment variables
dotenv.config()
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const host = process.env.DB_HOST

// Note that the database is named cis197hw6
mongoose.connect('mongodb://' + user + ':' + password + '@' + host, function (err) {
  if (err && err.message.includes('ECONNREFUSED')) {
    console.log('Error connecting to mongodb database', err.message);
    process.exit(0);
  } else if (err) {
    throw err;
  } else {
    console.log('\n\nDB successfully connected. Adding seed data...\n\n');
  }
});

var db = mongoose.connection;

var keySchema = new mongoose.Schema({
  key: String
});

var reviewSchema = new mongoose.Schema({
  className: String,
  semester: String,
  rating: Number,
  text: String
});

var Key = mongoose.model('Key', keySchema);
var Reviews = mongoose.model('Reviews', reviewSchema);

module.exports = {
  Key: Key,
  Reviews: Reviews,
  mongoose: mongoose,
  db: db.collection('Reviews')
};
