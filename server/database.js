var mongoose = require('mongoose');
var db_name = 'soi';
//provide a sensible default for local development
var mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + db_name;
//take advantage of openshift env vars when available:
if(process.env.MONGODB_URI){
  mongodb_connection_string = process.env.MONGODB_URI;
}

mongoose.connect(mongodb_connection_string, {
  useMongoClient: true
}).then(function () {
  console.log("Connected to the awesome SOI db");
});
require('./models/Login.js')
require('./models/Profile.js');
require('./models/Roles.js');
require('./models/Group.js');
require('./models/Connections.js');
require('./models/ConnectionDetails.js');

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + mongodb_connection_string);
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
