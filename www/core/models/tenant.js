var mongoose = require('mongoose');
var emitter = require('../config/emitter.js');

var tenantSchema = mongoose.Schema({
  name: String,
  serviceId: mongoose.Schema.Types.ObjectId,
  attributes: mongoose.Schema.Types.Mixed
});

tenantSchema.post('save', function(){
  emitter.emit('tenant.save', this);
})

var Tenant = mongoose.model('Tenant', tenantSchema);

module.exports = Tenant;
