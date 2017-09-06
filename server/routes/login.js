var express = require('express');
var router = express.Router();
var Login = require('./../models/Login.js');
var Profile = require('./../models/Profile.js');

router.post('/auth', function (req, res) {
  Login.findOne({
    userName:req.body.userName,
    password:req.body.password
  }, function(error, doc) {
    if (doc) {
      // If any doc found matching username and password, make another mongo query to get profile details.
      Profile.find({ 'userName': new RegExp(`^${req.body.userName}$`, 'i') }, function (err, doc) {
        // If any user found with the userName, send details of the user otherwise
        // send an error message.
        if (doc.length) {
          res.status(200).send({ authenticated: true, result: doc[0] });
        } else {
          res.status(200).send({ authenticated: false, result: "Sorry user record not found." });
        }
      });
    } else {
      res.status(200).send({ authenticated:false });
    }
  });
});

router.get('/', function (req, res) {
  Login.find(function (error, doc) {
    res.send(doc);
  })
});

router.post('/', function (req, res) {
  var login = new Login(req.body);
  login.save(function (err) {
    res.status(200).send({});
  })
});

module.exports = router;
