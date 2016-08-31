var mongoose = require('mongoose');

var tenantSchema = mongoose.Schema({
  name: String,
  serviceId: Number,
  attributes: mongoose.Schema.Types.Mixed
});

var Tenant = mongoose.model('Tenant', tenantSchema);

module.exports = Tenant;
