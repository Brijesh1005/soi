var mongoose = require('mongoose');

var ConnectionsSchema = {
  connectionType: String,
  giverProfile: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'},
  seekerProfile: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'},
  seekerGroup: {type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
  feedback: [{competancies: String, rating: Number, comment: String}],
  createdDate: {type: Date, default: Date.now},
  lastModifiedDate: {type: Date, default: null},
  endDate: {type: Date, default: null}
};

var ConnectionItem = mongoose.model('Connections', ConnectionsSchema, "connections");

module.exports = ConnectionItem;
