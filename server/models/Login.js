var mongoose = require('mongoose');

var LoginSchema = {
  userName:{type: String},
  password:{type:String},
  createdOn: { type: Date, default: Date.now }
};

var LoginDetails = mongoose.model('Login', LoginSchema, "login");

module.exports = LoginDetails;
