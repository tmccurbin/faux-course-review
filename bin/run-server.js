#!/usr/bin/env node
// Seed the database, then start the server
require('../db/seed.js')(function (err) {
  if (err) {
    console.log('we have an error here')
    console.error(err);
    process.exit(1);
  } else {
    var app = require('../app');

    app.set('port', process.env.PORT || 3000);

    var os = require('os');
    var interfaces = os.networkInterfaces();
    var addresses = [];
    for (var k in interfaces) {
        for (var k2 in interfaces[k]) {
            var address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }

    var server = app.listen(app.get('port'), function () {
      console.log('Express server listening at: ' + addresses + ':' + server.address().port);
    });
  }
});
