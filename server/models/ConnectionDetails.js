var mongoose = require('mongoose');
var Connection = require('./Connections');

var ConnectionDetailsSchema = {
  connectionType: { connection: {type: mongoose.Schema.Types.ObjectId, ref: 'Connection'}},
  frequency:Number,
  createdOn: { type: Date, default: Date.now }
};

var ConnectionDetails = mongoose.model('ConnectionDetails',ConnectionDetailsSchema,"connectionDetails");

module.exports = ConnectionDetails;