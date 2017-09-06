var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/soi';

mongoose.connect('mongodb://localhost/soi', function () {
  console.log("Connected to the awesome SOI db");
});
require('./models/Login.js')
require('./models/Profile.js');
require('./models/Roles.js');
require('./models/Group.js');
require('./models/Connections.js');
require('./models/ConnectionDetails.js');

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});