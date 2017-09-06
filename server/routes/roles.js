var express = require('express');
var router = express.Router();
var Roles = require('./../models/Roles.js');

function sendResponse(res, err, doc) {
  if (err) throw err;
  if (doc) {
    res.send(doc);
  } else {
    res.status(200).send({});
  }
}

router.get('/', function (req, res) {
  Roles.find(function (error, doc) {
    sendResponse(res, error, doc);
  })
});

router.post('/', function (req, res) {
  var role = new Roles(req.body);
  role.save(function (err) {
    sendResponse(res, err);
  });
});

router.get('/:id', function (req, res) {
  Roles.findById(req.params.id, function (err, doc) {
    sendResponse(res, err, doc);
  });
});

router.post('/:id', function (req, res) {
  Roles.findByIdAndUpdate(req.params.id, {
      roleName: req.body.roleName,
      roleCompetencies: req.body.roleCompetencies
    },
    {safe: true, upsert: true},
    function (err) {
      sendResponse(res, err);
    }
  );
});

router.delete('/:id', function (req, res) {
  Roles.findByIdAndRemove(req.params.id, function (err) {
    sendResponse(res, err);
  });
});

module.exports = router;
