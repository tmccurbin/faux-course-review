var mongoose = require('mongoose');
const user = 'adminuser'
const password = 'r15qdYlQPP3vE1Vx'
// Note that the database is named cis197hw6
mongoose.connect('mongodb://' + user + ':' + password + '@' +
'cluster0-shard-00-00-j30jb.mongodb.net:27017,' +
'cluster0-shard-00-01-j30jb.mongodb.net:27017,' +
'cluster0-shard-00-02-j30jb.mongodb.net:27017/cis197hw6' +
'?ssl=true' +
'&replicaSet=Cluster0-shard-0' +
'&authSource=admin' +
'&retryWrites=true', function (err) {
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
