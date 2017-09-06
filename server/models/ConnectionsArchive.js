var mongoose = require('mongoose');

var ConnectionsArchiveSchema = {
  connectionType: String,
  giverProfile: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'},
  seekerProfile: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'},
  seekerGroup: {type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
  feedback: {rating: Number, comment: String},
  createdDate: {type: Date, default: Date.now},
  lastModifiedDate: {type: Date, default: null},
  endDate: {type: Date, default: null}
};

var ConnectionArchiveItem = mongoose.model('ConnectionsArchive', ConnectionsArchiveSchema, "connectionsArchive");

module.exports = ConnectionArchiveItem;