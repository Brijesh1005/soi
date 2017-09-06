var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Connections = require('./../models/Connections.js');
var ConnectionsArchive = require('./../models/ConnectionsArchive.js');
const events = require('events');

var eventEmitter = new events.EventEmitter();
eventEmitter.on('archive-connections', function (list) {
  setImmediate(function () {
    archiveConnections(list);
  });
});

router.get('/', function (req, res) {
  Connections.find(function (error, doc) {
    sendResponse(res, error, doc);
  })
});

router.post('/', function (req, res) {
  var connection = new Connections(req.body);
  connection.save(function (err) {
    sendResponse(res, err);
  });
});

/*router.get('/:id', function (req, res) {
  Connections.findById(req.params.id)
    .populate('giverProfile seekerProfile seekerGroup')
    .exec(function (error, doc) {
      sendResponse(res, error, doc);
    });
});*/

router.get('/:giverProfileId/:seekerProfileId/:seekerGroupId', function(req, res) {
  Connections.find({
    giverProfile: req.params.giverProfileId,
    seekerProfile: req.params.seekerProfileId,
    seekerGroup: req.params.seekerGroupId
  }).exec(function (error, doc) {
      sendResponse(res, error, doc);
  });
});

router.get('/:seekerProfileId', function(req, res) {
  Connections.find({
    seekerProfile: req.params.seekerProfileId
  }).exec(function (error, doc) {
      sendResponse(res, error, doc);
  });
});

router.post('/save-feedback', function (req, res) {
  Connections.update({
    giverProfile: req.body.giverProfile,
    seekerProfile: req.body.seekerProfile,
    seekerGroup: req.body.seekerGroup,
    connectionType: req.body.connectionType
  }, {
      feedback: req.body.feedback,
      lastModifiedDate: Date.now(),
      connectionType: req.body.connectionType
    },
    {safe: true, upsert: true},
    function (err) {
      console.log(err);
      sendResponse(res, err);
    }
  );
});


router.post('/update-feedback/:id', function (req, res) {
  Connections.findByIdAndUpdate(req.params.id, {
      feedback: req.body.feedback,
      lastModifiedDate: Date.now()
    },
    {safe: true, upsert: true},
    function (err) {
      console.log(err);
      sendResponse(res, err);
    }
  );
});

router.post('/close-feedback', function (req, res) {
  var bulk = Connections.collection.initializeUnorderedBulkOp();
  var connectionList = convertToObjectId(req.body.connectionList);
  var currentDate = Date.now();

  bulk.find({_id: {$in: connectionList}})
    .update({$set: {endDate: currentDate, lastModifiedDate: currentDate}});

  bulk.execute(function (err) {
    archiveClosedDocuments(connectionList);
    sendResponse(res, err);
  });
});

router.delete('/:id', function (req, res) {
  Connections.findByIdAndRemove(req.params.id, function (err) {
    sendResponse(res, err);
  });
});

function sendResponse(res, err, doc) {
  if (err) res.send(err);
  if (doc) {
    res.send(doc);
  } else {
    res.status(200).send({});
  }
}

function convertToObjectId(list) {
  var index = 0;
  var updatedList = [];
  for (; index < list.length; index++) {
    updatedList.push(mongoose.Types.ObjectId(list[index]));
  }
  return updatedList;
}

function archiveClosedDocuments(connectionList) {
  eventEmitter.emit('archive-connections', connectionList);
}

function archiveConnections(idList) {
  Connections.find({_id: {$in: idList}}, function (error, doc) {
    if (doc.length) {
      ConnectionsArchive.insertMany(doc, function (err) {
        if (err) {
          console.log('Error occurred while archiving records.');
          console.log(err);
          throw err;
        }
        console.log('Record archived successfully for connection ids: ' + idList);
        console.log('Removing archived records from Connections model.');
        Connections.remove({_id: {$in: idList}}, function (err) {
          if (err) {
            console.log('Error occurred while removing archived records from Connections model.');
            console.log(err);
            throw err;
          }

          console.log('Data purge successful in Connections model for: ' + idList);
        });

      });
    }
  });
}

module.exports = router;
