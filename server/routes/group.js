var express = require('express');
var router = express.Router();
var Group = require('./../models/Group.js');

router.get('/', function (req, res) {
  Group.find().populate('groupMembers.profile groupMembers.role')
  .exec(function (error, doc) {
    res.send(doc);
  })
});

router.post('/', function (req, res) {
  var group = new Group(req.body);
  group.save(function (err) {
    console.log(err);
    res.status(200).send({});
  });
});

router.get('/groupName/:groupName', function (req, res) {
  Group.find({
    groupName:req.params.groupName
  }, function(error, doc) {
    res.status(200).send(doc);
  });

});

router.get('/:id', function (req, res) {
  Group.findById(req.params.id).populate('groupMembers.profile groupMembers.role')
  .exec(function (err, profile) {
    if (err) return handleError(err);
    res.status(200).send(profile);
  });
});

router.post('/:id', function (req, res) {
  Group.findByIdAndUpdate(req.params.id, {
      groupName: req.body.groupName,
      groupImage: req.body.groupImage
    },
    {safe: true, upsert: true},
    function (err, doc) {
      res.status(200).send(doc);
    }
  );
});

router.delete('/:id', function (req, res) {
  Group.findByIdAndRemove(req.params.id, function (err, doc) {
    res.status(200).send(doc);
  });
});

module.exports = router;
