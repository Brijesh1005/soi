var mongoose = require('mongoose');

var ProfileSchema = {
  userName:{type: String},
  userImage:String,
  createdOn: { type: Date, default: Date.now }
};

var ProfileItem = mongoose.model('Profile', ProfileSchema, "profile");

module.exports = ProfileItem;