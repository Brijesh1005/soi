var express = require('express'),
  parser = require('body-parser'),
  db = require('./database.js'),
  profiles    = require('./routes/profile'),
  roles = require('./routes/roles'),
  group    = require('./routes/group'),
  connectionDetails = require('./routes/connectionDetails'),
  connections = require('./routes/connections'),
  login = require('./routes/login');

var app = new express();
var PORT = process.env.OPENSHIFT_NODEJS_PORT || 8098;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.get('/', function (req, res) {
  res.send('hello world');
}).listen(PORT, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + PORT )
});

app.use(parser.json());
app.use('/profile',  profiles);
app.use('/role', roles);
app.use('/group',  group);
app.use('/connectionD', connectionDetails);
app.use('/connection', connections);
app.use('/login', login);
