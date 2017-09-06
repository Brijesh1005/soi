var express = require('express');
var router = express.Router();
var ConnectionD = require('./../models/ConnectionDetails.js');

router.get('/', function (req, res) {
  ConnectionD.find(function (error, doc) {
    res.send(doc);
  })
});

router.post('/', function (req, res) {
  var connectionD = new ConnectionD(req.body);
  connectionD.save(function (err) {
    console.log(err);
    res.status(200).send({});
  });
});

router.get('/connectionType/:connectionType', function (req, res) {
  ConnectionD.find({
    connectionType:req.params.connectionType
  }, function(error, doc) {
    res.status(200).send(doc);
  });

});

router.get('/:id', function (req, res) {
  ConnectionD.findById(req.params.id).populate('connectionType')
  .exec(function (err, connection) {
    if (err) return handleError(err);
    res.status(200).send(connection);
  });
});

router.post('/:id', function (req, res) {
  ConnectionD.findByIdAndUpdate(req.params.id, {
      connectionType: req.body.connectionType,
      frequency: req.body.frequency
    },
    {safe: true, upsert: true},
    function (err, doc) {
      res.status(200).send(doc);
    }
  );
});

router.delete('/:id', function (req, res) {
  ConnectionD.findByIdAndRemove(req.params.id, function (err, doc) {
    res.status(200).send(doc);
  });
});

module.exports = router;
