var mongoose = require('mongoose');

var RoleSchema = {
  roleName: {type: String},
  roleCompetencies: [{competencies: String}]
};

var Roles = mongoose.model('Roles', RoleSchema, "roles");

module.exports = Roles;
