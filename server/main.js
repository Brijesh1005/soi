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

app.get('/', function (req, res) {
  res.send('hello world');
})

app.use(parser.json());
app.use('/profile',  profiles);
app.use('/role', roles);
app.use('/group',  group);
app.use('/connectionD', connectionDetails);
app.use('/connection', connections);
app.use('/login', login);
