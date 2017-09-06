var mongoose = require('mongoose');
var Profile = require('./Profile');
var Roles = require('./Roles');

// TODO: Add group competancy column in groups where admin will add competancy details.

var GroupSchema = {
  groupName:{type: String},
  groupImage:String,
  groupMembers:[{ role: {type: mongoose.Schema.Types.ObjectId, ref: 'Roles'}, profile: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'}}],
  createdOn: { type: Date, default: Date.now }
};

var GroupItem = mongoose.model('Group',GroupSchema,"groups");

module.exports = GroupItem;
