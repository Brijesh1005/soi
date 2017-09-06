var express = require('express');
var router = express.Router();
var Profile = require('./../models/Profile.js');

router.get('/', function (req, res) {
  Profile.find(function (error, doc) {
    res.send(doc);
  })
});

router.post('/', function (req, res) {
  var profile = new Profile(req.body);
  profile.save(function (err) {
    res.status(200).send({});
  })

});

router.get('/userName', function (req, res) {
  Profile.find({
    userName:req.query.userName
  }, function(error, doc) {
    res.status(200).send(doc);
  });

});

router.get('/userName1/:userName', function (req, res) {
  Profile.findOne({
    userName:req.params.userName
  }, function(error, doc) {
    res.status(200).send(doc);
  });

});

router.get('/:id', function (req, res) {
  Profile.findById(req.params.id, function (err, doc) {
    res.status(200).send(doc);
  });
});

router.post('/:id', function (req, res) {
  Profile.findByIdAndUpdate(req.params.id, {
      userName: req.body.userName,
      userImage: req.body.userImage
    },
    {safe: true, upsert: true},
    function (err, doc) {
      res.status(200).send(doc);
    }
  );
});

router.delete('/:id', function (req, res) {
  Profile.findByIdAndRemove(req.params.id, function (err, doc) {
    res.status(200).send(doc);
  });
});

module.exports = router;
